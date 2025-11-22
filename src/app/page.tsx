"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from "next/link";
import Hero from '../components/Hero';
import StickyScroll from '../components/StickyScroll';
import MobileScroll from '../components/MobileScroll';
import Newsletter from '../components/Newsletter';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

// Utility function for className merging
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
        className="cursor-pointer text-black hover:opacity-[0.9] dark:text-white"
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
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active"
                className="bg-white dark:bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-black/[0.2] dark:border-white/[0.2] shadow-xl"
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

const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative rounded-full border border-transparent dark:bg-black dark:border-white/[0.2] bg-white shadow-input flex justify-center space-x-4 px-8 py-6"
    >
      {children}
    </nav>
  );
};

const HoveredLink = ({ children, ...rest }: React.ComponentProps<typeof Link>) => {
  return (
    <Link
      {...rest}
      className="text-neutral-700 dark:text-neutral-200 hover:text-black"
    >
      {children}
    </Link>
  );
};

const ProductItem = ({
  title,
  description,
  href,
  gradient,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  gradient: string;
  icon: string;
}) => {
  return (
    <Link href={href} className="flex space-x-2">
      <div
        className={`flex-shrink-0 rounded-md shadow-2xl w-[140px] h-[70px] flex items-center justify-center ${gradient}`}
      >
        <span className="text-3xl">{icon}</span>
      </div>
      <div>
        <h4 className="text-xl font-bold mb-1 text-black dark:text-white">
          {title}
        </h4>
        <p className="text-neutral-700 text-sm max-w-[10rem] dark:text-neutral-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

const App: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-gray-200">
      {/* Navbar */}
      <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50")}>
        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="Templates">
            <div className="text-sm grid grid-cols-2 gap-10 p-4">
              <ProductItem
                title="Better Auth + MongoDB"
                href="/templates"
                gradient="bg-gradient-to-br from-blue-400 to-blue-600"
                icon="🔐"
                description="Backend starter with Better Auth and MongoDB for secure apps."
              />
              <ProductItem
                title="Auth0 + Razorpay"
                href="/templates"
                gradient="bg-gradient-to-br from-purple-400 to-pink-600"
                icon="💳"
                description="Full-stack SAAS template with payments and auth integration."
              />
              <ProductItem
                title="AI Resume Analyzer"
                href="/templates"
                gradient="bg-gradient-to-br from-green-400 to-emerald-600"
                icon="📄"
                description="AI-powered resume analyzer with ATS scoring and feedback."
              />
              <ProductItem
                title="Portfolio + AI Chatbot"
                href="/templates"
                gradient="bg-gradient-to-br from-orange-400 to-red-600"
                icon="💼"
                description="Modern portfolio with integrated AI chatbot assistant."
              />
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
              <HoveredLink href="#contribute">Submit Template</HoveredLink>
              <HoveredLink href="#contribute">Guidelines</HoveredLink>
              <HoveredLink href="#contribute">Community</HoveredLink>
            </div>
          </MenuItem>
        </Menu>
      </div>

      <main>
        <Hero />
        <StickyScroll />
        <MobileScroll />
        <Newsletter />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default App;