"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Square, Circle, Triangle } from 'lucide-react';
import { CpuArchitecture } from './ui/cpu-architecture';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-52 pb-100 md:pt-48 md:pb-105 px-6 text-center max-w-8xl mx-auto overflow-hidden bg-white">
      {/* CPU Architecture Background */}
<div className="absolute top-80 left-0 md:top-44 md:left-0 inset-0 flex items-center justify-center opacity-90 pointer-events-none">
  <div className="w-full h-full max-w-sm md:max-w-3xl">
    <CpuArchitecture />
  </div>
</div>

      {/* Content (on top of CPU) */}
      <div className="relative z-10">
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
          className="text-5xl md:text-7xl font-bold tracking-tighter text-black mb-6"
        >
          Find your stack.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-2xl md:text-4xl text-gray-400 font-medium tracking-tight mb-10"
        >
          Choose tech, unlock design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link href="/templates">
            <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-transform hover:scale-105 active:scale-95">
              View Templates
            </button>
          </Link>
          <Link href="/templates">
            <button className="bg-gray-100 text-gray-600 px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-transform hover:scale-105 active:scale-95">
              Browse details
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;