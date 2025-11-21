"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import TemplatesShowcase from '../../components/TemplatesShowcase';

const Templates: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar />

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
        </section>

        <TemplatesShowcase showDetails={true} className="pb-32" />
      </main>

      <Footer />
    </div>
  );
};

export default Templates;