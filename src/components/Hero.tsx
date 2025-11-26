"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Square, Circle, Triangle } from 'lucide-react';
import { CpuArchitecture } from './ui/cpu-architecture';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 md:px-6 text-center w-full overflow-hidden bg-white">
      {/* CPU Architecture Background */}
<div className="absolute bottom-20 lg:bottom-0 left-0 right-0 flex items-end justify-center opacity-80 pointer-events-none pb-8 md:pb-12">
  <div className="w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-3xl">
    <CpuArchitecture />
  </div>
</div>

      {/* Content (above CPU) */}
      <div className="relative z-10 w-full max-w-4xl mx-auto -mt-16 md:-mt-20 lg:-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="flex gap-1">
            <Square fill="currentColor" className="w-6 h-6 text-black" />
            <Circle fill="currentColor" className="w-6 h-6 text-gray-400" />
            <Triangle fill="currentColor" className="w-6 h-6 text-gray-300" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-black mb-6"
        >
          Find your stack.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-gray-400 font-medium tracking-tight mb-8 md:mb-10"
        >
          Choose tech, unlock design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
        >
          <Link href="/templates">
            <button className="w-full sm:w-auto bg-black text-white px-6 sm:px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-transform hover:scale-105 active:scale-95 text-sm sm:text-base">
              View Templates
            </button>
          </Link>
          <Link href="/templates">
            <button className="w-full sm:w-auto bg-gray-100 text-gray-600 px-6 sm:px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-transform hover:scale-105 active:scale-95 text-sm sm:text-base">
              Browse details
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;