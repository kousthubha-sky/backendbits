"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User as UserIcon } from "lucide-react";
import { Skiper58 } from "@/components/ui/downbar";
import { UserProfile } from "@/components/auth/user-profile";
import { MenuToggleIcon } from "@/components/ui/menu-toggle-icon";
import { useSession } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(" ");
};

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
        className="cursor-pointer text-black hover:opacity-[0.9]"
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
            <div className="absolute top-[calc(100%_+_0.5rem)] left-1/2 transform -translate-x-1/2">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] shadow-2xl z-50"
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
      className="relative rounded-full border border-transparent shadow-input flex justify-center space-x-4 px-8 py-6"
    >
      {children}
    </nav>
  );
};

const HoveredLink = ({ children, ...rest }: React.ComponentProps<typeof Link>) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 hover:text-black"
    >
      {children}
    </Link>
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
    <Link href={href} className="block">
      <div className="group bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 p-4 w-72 shadow-md">
        <div className="mb-2">
          <h4 className="text-sm font-bold text-black group-hover:text-gray-800 transition-colors mb-1">
            {name}
          </h4>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block px-2 py-0.5 bg-black text-white text-xs font-medium rounded-full">
              {status}
            </span>
            <span className="text-xs text-gray-500 capitalize">
              {category}
            </span>
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
    </Link>
  );
};

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [active, setActive] = useState<string | null>(null);
  const [showDownbar, setShowDownbar] = useState<boolean>(false);
  const [showAccount, setShowAccount] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string>('user');
  const { data: session, isPending } = useSession();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showAccount && !(event.target as Element).closest('.account-dropdown')) {
        setShowAccount(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showAccount]);

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 items-center">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="flex items-center -space-x-1">
            <div className="w-3 h-3 bg-black rounded-sm" />
            <div className="w-3 h-3 bg-gray-400 rounded-full" />
          </div>
          <span>Stacks®</span>
        </Link>

        {/* Center: Desktop Navigation */}
        <div className="hidden lg:flex justify-center">
          <button
            onClick={() => setShowDownbar(!showDownbar)}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MenuToggleIcon open={showDownbar} className="size-10" duration={500} />
          </button>
        </div>

        {/* Right: Desktop Navigation with Auth */}
        <div className="hidden lg:flex justify-end items-center gap-4">
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
                  <HoveredLink href="/templates" className="text-sm font-medium">
                    View All Templates →
                  </HoveredLink>
                </div>
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item="Pricing">
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="#pricing">View Plans</HoveredLink>
                <HoveredLink href="#pricing">Free Tier</HoveredLink>
                <HoveredLink href="#pricing">Pro</HoveredLink>
                <HoveredLink href="#pricing">Enterprise</HoveredLink>
              </div>
            </MenuItem>

             <MenuItem setActive={setActive} active={active} item="Contribute">
               <div className="flex flex-col space-y-4 text-sm">
                 <HoveredLink href="/contribute">Submit Template</HoveredLink>
                 <HoveredLink href="/contribute">My Submissions</HoveredLink>
                 <HoveredLink href="/guidelines">Guidelines</HoveredLink>
               </div>
             </MenuItem>

             {/* Admin Menu - Only show for admins */}
             {userRole === 'admin' && (
               <MenuItem setActive={setActive} active={active} item="Admin">
                 <div className="flex flex-col space-y-4 text-sm">
                   <HoveredLink href="/admin">Dashboard</HoveredLink>
                   <HoveredLink href="/admin">User Management</HoveredLink>
                 </div>
               </MenuItem>
             )}
          </NavMenu>

          {/* Auth Section */}
          {!isPending && (
            <div className="flex items-center gap-2">
              {session ? (
                <div className="relative account-dropdown">
                  <button
                    onClick={() => setShowAccount(!showAccount)}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white">
                      <UserIcon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium">{session.user.name || "Account"}</span>
                  </button>
                  <AnimatePresence>
                    {showAccount && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64 z-50"
                      >
                     <UserProfile />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm">Sign In</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>

        {/* Mobile: Hamburger Menu and Downbar Button */}
        <div className="flex lg:hidden items-center justify-end gap-2">
          {/* Downbar Button - Visible on mobile */}
          <button
            onClick={() => setShowDownbar(!showDownbar)}
            className=" hover:bg-gray-100 rounded-lg transition-colors"
          >
            <MenuToggleIcon open={showDownbar} className="size-6" duration={500} />
          </button>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-0">
              {/* Main Navigation Links - Full Width */}
              <Link href="/templates" onClick={() => setIsOpen(false)}>
                <div className="w-full px-4 py-4 text-left text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100 last:border-b-0">
                  Templates
                </div>
              </Link>
              
              <Link href="#pricing" onClick={() => setIsOpen(false)}>
                <div className="w-full px-4 py-4 text-left text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100 last:border-b-0">
                  Pricing
                </div>
              </Link>
              
               <Link href="/contribute" onClick={() => setIsOpen(false)}>
                 <div className="w-full px-4 py-4 text-left text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100 last:border-b-0">
                   Contribute
                 </div>
               </Link>

                <Link href="/guidelines" onClick={() => setIsOpen(false)}>
                  <div className="w-full px-4 py-4 text-left text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100 last:border-b-0">
                    Guidelines
                  </div>
                </Link>

                {/* Admin Menu - Mobile */}
               {userRole === 'admin' && (
                 <Link href="/admin" onClick={() => setIsOpen(false)}>
                   <div className="w-full px-4 py-4 text-left text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100 last:border-b-0">
                     Admin Dashboard
                   </div>
                 </Link>
               )}

               {/* Auth Section */}
              {!session ? (
                <>
                  <div className="border-t border-gray-200 my-2 pt-2">
                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                      <div className="w-full px-4 py-4 text-left text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border-b border-gray-100 last:border-b-0">
                        Sign In
                      </div>
                    </Link>
                    
                    <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                      <div className="w-full px-4 py-4 text-left text-base font-medium bg-black text-white hover:bg-gray-800 rounded-lg transition-colors">
                        Sign Up
                      </div>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="border-t border-gray-200 my-2 pt-2">
                    <div className="w-full px-4 py-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                          <UserIcon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
                          <p className="text-sm text-gray-500">{session.user.email}</p>
                        </div>
                      </div>
                       <UserProfile />
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Downbar Overlay */}
      <AnimatePresence>
        {showDownbar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed top-100 left-0 right-0 bottom-0 bg-white/50 backdrop-blur-3xl z-60 flex items-center justify-center"
            onClick={() => setShowDownbar(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="rounded-2xl shadow-2xl w-full max-w-4xl h-[500px] mx-4 bg-white/70 backdrop-blur-3xl border border-white/30"
              onClick={(e) => e.stopPropagation()}
            >
              <Skiper58 />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;