"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="flex items-center -space-x-1">
            <div className="w-3 h-3 bg-black rounded-sm" />
            <div className="w-3 h-3 bg-gray-400 rounded-full" />
          </div>
          <span>Stacks®</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          <Link href="/templates">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-colors">
              Templates
            </button>
          </Link>
          <Link href="#pricing">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-colors">
              Pricing
            </button>
          </Link>
          <Link href="#contribute">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-colors">
              Contribute
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="p-2">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-4 space-y-2">
              <Link href="/templates">
                <button className="text-left px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg w-full">
                  Templates
                </button>
              </Link>
              <Link href="#pricing">
                <button className="text-left px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg w-full">
                  Pricing
                </button>
              </Link>
              <Link href="#contribute">
                <button className="text-left px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg w-full">
                  Contribute
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;