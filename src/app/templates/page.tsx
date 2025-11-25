// File: app/templates/page.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User } from 'lucide-react';
import TemplatesShowcase from '../../components/TemplatesShowcase';
import Footer from '../../components/Footer';
import { templates } from '../../data/templates';
import { useSession } from '@/lib/auth-client';
import { UserProfile } from '@/components/auth/user-profile';

// Utility function
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(" ");
};

const categories = [
  { key: 'all', label: 'All Templates' },
  { key: 'auth', label: 'Auth Templates' },
  { key: 'payment', label: 'Payment' },
  { key: 'AI projects', label: 'AI Projects' },
  { key: 'personal', label: 'Personal Projects' },
  { key: 'Portfolio', label: 'Portfolio' },
  { key: 'github', label: 'GitHub Projects' },
];

const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-black hover:opacity-[0.9] text-sm font-medium"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_0.5rem)] left-1/2 transform -translate-x-1/2 z-50">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] shadow-2xl"
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

const NavMenu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative flex justify-center space-x-6 px-4"
    >
      {children}
    </nav>
  );
};

const HoveredLink = ({ children, href, ...rest }: any) => {
  return (
    <a
      href={href}
      {...rest}
      className="text-neutral-700 hover:text-black transition-colors"
    >
      {children}
    </a>
  );
};

const TemplatePreviewCard = ({
  name,
  summary,
  category,
  status,
  techStack,
  href,
}: {
  name: string;
  summary: string;
  category: string;
  status: string;
  techStack: string[];
  href: string;
}) => {
  return (
    <a href={href} className="block">
      <div className="group bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 p-4 w-72 shadow-md">
        <div className="mb-2">
          <h4 className="text-sm font-bold text-black group-hover:text-gray-800 transition-colors mb-1">
            {name}
          </h4>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block px-2 py-0.5 bg-black text-white text-xs font-medium rounded-full">
              {status}
            </span>
            <span className="text-xs text-gray-500 capitalize">{category}</span>
          </div>
        </div>
        <div className="mb-2">
          <div className="flex flex-wrap gap-1">
            {techStack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded-md font-medium"
              >
                {tech}
              </span>
            ))}
            {techStack.length > 3 && (
              <span className="px-2 py-0.5 bg-gray-200 text-gray-500 text-xs rounded-md">
                +{techStack.length - 3}
              </span>
            )}
          </div>
        </div>
        <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
          {summary}
        </p>
      </div>
    </a>
  );
};

const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}: {
  children: React.ReactNode;
  variant?: "default" | "ghost";
  size?: "default" | "sm";
  className?: string;
  [key: string]: any;
}) => {
  const baseStyles = "rounded-lg font-medium transition-colors inline-flex items-center justify-center";
  const variants = {
    default: "bg-black text-white hover:bg-gray-800",
    ghost: "bg-transparent text-gray-700 hover:bg-gray-100",
  };
  const sizes = {
    default: "px-4 py-2 text-sm",
    sm: "px-3 py-1.5 text-sm",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const AnimatedNavbar = ({
  activeCategory,
  setActiveCategory,
  session,
  userRole
}: {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  session: any;
  userRole: string;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [showAccount, setShowAccount] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const featuredTemplates = [
    {
      name: "Better Auth + MongoDB",
      summary: "Backend starter that marries Better Auth with MongoDB so you can launch secure apps without hand-rolling auth.",
      category: "auth",
      status: "Production-ready",
      techStack: ["Next.js API Routes", "Better Auth", "MongoDB Atlas", "Zod", "Tailwind CSS"],
      href: "/templates"
    },
    {
      name: "Auth0 + Razorpay + FastAPI",
      summary: "Fullstack SAAS template integrating Auth0 authentication, Razorpay payments, FastAPI backend, and React Router frontend.",
      category: "payment",
      status: "Production-ready",
      techStack: ["FastAPI", "React", "Auth0", "Razorpay", "Supabase"],
      href: "/templates"
    },
    {
      name: "AI Resume Analyzer",
      summary: "AI-powered resume analyzer built with React and Puter.js for seamless auth, resume storage, and intelligent ATS scoring.",
      category: "personal",
      status: "Production-ready",
      techStack: ["React", "React Router v7", "Puter.js", "Tailwind CSS", "TypeScript"],
      href: "/templates"
    },
    {
      name: "Portfolio with AI Chatbot",
      summary: "A modern, responsive portfolio website with integrated AI chatbot for visitor interactions, perfect for showcasing creative work.",
      category: "Portfolio",
      status: "Production-ready",
      techStack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Google Gemini API"],
      href: "/templates"
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          className="relative"
          animate={{ height: isScrolled ? 56 : 112 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Logo - Always stays in place */}
          <a
            href="/"
            className="absolute top-0 left-0 h-14 flex items-center gap-2 font-bold text-xl tracking-tight z-20"
          >
            <div className="flex items-center -space-x-1">
              <div className="w-3 h-3 bg-black rounded-sm" />
              <div className="w-3 h-3 bg-gray-400 rounded-full" />
            </div>
            <span>stack-end®</span>
          </a>

          {/* Top navbar content - moves UP and fades on scroll */}
          <AnimatePresence>
            {!isScrolled && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="absolute top-0 left-0 right-0 h-14 flex items-center justify-end"
              >
                {/* Desktop Navigation Menu with Dropdowns */}
                <div className="hidden lg:flex items-center justify-end flex-1">
                  <NavMenu setActive={setActive}>
                    <MenuItem setActive={setActive} active={active} item="Templates">
                      <div className="grid grid-cols-2 gap-4 max-w-4xl">
                        {featuredTemplates.map((template) => (
                          <TemplatePreviewCard
                            key={template.name}
                            name={template.name}
                            summary={template.summary}
                            category={template.category}
                            status={template.status}
                            techStack={template.techStack}
                            href={template.href}
                          />
                        ))}
                        <div className="col-span-2 pt-2 border-t border-gray-200">
                          <HoveredLink href="/templates">
                            View All Templates →
                          </HoveredLink>
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem setActive={setActive} active={active} item="Pricing">
                      <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/#pricing">View Plans</HoveredLink>
                        <HoveredLink href="/#pricing">Free Tier</HoveredLink>
                        <HoveredLink href="/#pricing">Pro</HoveredLink>
                        <HoveredLink href="/#pricing">Enterprise</HoveredLink>
                      </div>
                    </MenuItem>

                    <MenuItem setActive={setActive} active={active} item="Contribute">
                      <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/contribute">Submit Template</HoveredLink>
                        <HoveredLink href="/contribute">My Submissions</HoveredLink>
                        <HoveredLink href="/guidelines">Guidelines</HoveredLink>
                      </div>
                    </MenuItem>

                    {userRole === 'admin' && (
                      <MenuItem setActive={setActive} active={active} item="Admin">
                        <div className="flex flex-col space-y-4 text-sm">
                          <HoveredLink href="/admin">Dashboard</HoveredLink>
                          <HoveredLink href="/admin">User Management</HoveredLink>
                        </div>
                      </MenuItem>
                    )}
                  </NavMenu>
                </div>

                {/* Auth Section - Desktop */}
                <div className="hidden lg:flex items-center gap-2">
                  {session ? (
                    <div className="relative">
                      <button
                        onClick={() => setShowAccount(!showAccount)}
                        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                          <User className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium">{session.user?.name || "Account"}</span>
                      </button>
                      <AnimatePresence>
                        {showAccount && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64"
                          >
                            <UserProfile />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <>
                      <a href="/auth/login">
                        <Button variant="ghost" size="sm">Sign In</Button>
                      </a>
                      <a href="/auth/signup">
                        <Button size="sm">Sign Up</Button>
                      </a>
                    </>
                  )}
                </div>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Categories tabs - responsive design */}
          <motion.nav
            className="hidden sm:block absolute overflow-x-auto pl-10 scrollbar-hide"
            animate={{
              top: isScrolled ? 0 : 56,
              left: isScrolled ? 100 : 0,
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="flex h-14 items-center min-w-max px-4 sm:px-0">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={cn(
                    "relative px-2 sm:px-3 md:px-4 h-14 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap outline-none",
                    activeCategory === category.key ? "text-black" : "text-gray-500 hover:text-black"
                  )}
                >
                  {category.label}
                  {activeCategory === category.key && (
                    <motion.div
                      layoutId="category-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.nav>


        </motion.div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && !isScrolled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-0">
              <a href="/templates" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="w-full px-4 py-4 text-left text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100">
                  Templates
                </div>
              </a>
              <a href="/#pricing" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="w-full px-4 py-4 text-left text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100">
                  Pricing
                </div>
              </a>
              <a href="/contribute" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="w-full px-4 py-4 text-left text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100">
                  Contribute
                </div>
              </a>
              <a href="/guidelines" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="w-full px-4 py-4 text-left text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100">
                  Guidelines
                </div>
              </a>

              {userRole === 'admin' && (
                <a href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="w-full px-4 py-4 text-left text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100">
                    Admin Dashboard
                  </div>
                </a>
              )}

              {/* Mobile Auth Section */}
              <div className="border-t border-gray-200 my-2 pt-2">
                {session ? (
                  <>
                    <div className="px-4 py-3 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                        <User className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{session.user?.name}</p>
                        <p className="text-xs text-gray-500">{session.user?.email}</p>
                      </div>
                    </div>
                    <UserProfile />
                  </>
                ) : (
                  <>
                    <a href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="w-full px-4 py-4 text-left text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100">
                        Sign In
                      </div>
                    </a>
                    <a href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <div className="w-full px-4 py-4 text-left text-base font-medium bg-black text-white hover:bg-gray-800 rounded-lg transition-colors">
                        Sign Up
                      </div>
                    </a>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </header>
  );
};

const Templates: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('auth');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: session, isPending } = useSession();
  const [userRole, setUserRole] = useState<string>('user');

  // Fetch user role
  useEffect(() => {
    const fetchUserRole = async () => {
      if (session) {
        try {
          const response = await fetch('/api/users/profile');
          if (response.ok) {
            const userData = await response.json();
            setUserRole(userData.role || 'user');
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      }
    };

    fetchUserRole();
  }, [session]);

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const filteredTemplates = selectedCategory === 'all' ? templates : templates.filter(template => template.category === selectedCategory);
  const showFilters = selectedCategory !== 'github'; // Show filters for all categories except GitHub search
  const enableGitHubSearch = selectedCategory === 'github';

  // Pagination logic
  const templatesPerPage = 9;
  const totalPages = Math.ceil(filteredTemplates.length / templatesPerPage);
  const startIndex = (currentPage - 1) * templatesPerPage;
  const endIndex = startIndex + templatesPerPage;
  const currentTemplates = filteredTemplates.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of templates section
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-white text-black font-sans">
        <div className="pt-32 flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <AnimatedNavbar
        activeCategory={selectedCategory}
        setActiveCategory={setSelectedCategory}
        session={session}
        userRole={userRole}
      />

      <main className="pt-32">
        <section className="px-6 pb-12 text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter text-black mb-6"
          >
            Templates
          </motion.h1>

           <motion.p
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.1 }}
             className="text-xl text-gray-500 mb-8"
           >
             Discover backend starters that let you ship faster with pre-configured auth, databases, and deployment scripts.
           </motion.p>

           {/* Mobile Category Selector */}
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="flex flex-wrap justify-center gap-3 sm:hidden mb-8"
           >
             {categories.map((category) => (
               <button
                 key={category.key}
                 onClick={() => setSelectedCategory(category.key)}
                 className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
                   selectedCategory === category.key
                     ? 'bg-black text-white'
                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                 }`}
               >
                 {category.label}
               </button>
             ))}
           </motion.div>
        </section>

        <TemplatesShowcase
          data={currentTemplates}
          showFilters={showFilters}
          enableGitHubSearch={enableGitHubSearch}
          totalCount={filteredTemplates.length}
          currentPage={currentPage}
          totalPages={totalPages}
          title={selectedCategory === 'github' ? 'GitHub Projects Search' : selectedCategory === 'AI projects' ? 'AI Agent Frameworks' : selectedCategory === 'all' ? 'All Templates' : 'Production-ready templates'}
          description={selectedCategory === 'github'
            ? 'Search for GitHub repositories by user, organization, or keyword to discover personal projects and portfolio items.'
            : selectedCategory === 'AI projects'
            ? 'Discover powerful AI agent frameworks and platforms for building intelligent, autonomous systems.'
            : selectedCategory === 'all'
            ? 'Browse all available templates across different categories.'
            : 'Discover backend starters that let you ship faster with pre-configured auth, databases, and deployment scripts.'
          }
          className="pb-32"
        />

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 mt-8 mb-16">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    currentPage === page
                      ? 'text-white bg-black border border-black'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}


      </main>

      <Footer />
    </div>
  );
};

export default Templates;