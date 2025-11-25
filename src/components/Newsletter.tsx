"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const Newsletter: React.FC = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic
  };

  const handleclick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/');
  }
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-lg mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-2"
        >
          Get started.
        </motion.h2>
        <motion.p
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: 0.1 }}
           className="text-xl text-gray-500 mb-8"
        >
          Build your next portfolio.
        </motion.p>

        <motion.form
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.2 }}
           className="space-y-3"
           onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="name@Gmail.com"
            className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl text-center text-lg focus:outline-none focus:ring-2 focus:ring-black/5 transition-shadow"
          />
          <button onClick={handleclick} className="w-full py-4 bg-black text-white rounded-xl font-medium text-lg hover:bg-gray-800 transition-transform active:scale-95">
            Email
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default Newsletter;