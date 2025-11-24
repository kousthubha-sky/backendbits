"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import TemplatesShowcase from '../../components/TemplatesShowcase';
import { templates } from '../../data/templates';

const Templates: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('auth');

  const categories = [
    { key: 'auth', label: 'Auth Templates' },
    { key: 'payment', label: 'Payment' },
    { key: 'AI projects', label: 'AI Projects' },
    { key: 'personal', label: 'Personal Projects' },
    { key: 'Portfolio', label: 'Portfolio' },
    { key: 'github', label: 'GitHub Projects' },
  ];

  const filteredTemplates = templates.filter(template => template.category === selectedCategory);
  const showFilters = !['personal', 'Portfolio', 'github', 'AI projects'].includes(selectedCategory);
  const enableGitHubSearch = selectedCategory === 'github';

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

           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="flex flex-wrap justify-center gap-4 mb-12"
           >
             {categories.map((category) => (
               <button
                 key={category.key}
                 onClick={() => setSelectedCategory(category.key)}
                 className={`px-6 py-3 rounded-full font-medium text-sm transition-colors ${
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
            data={filteredTemplates}
            showFilters={showFilters}
            enableGitHubSearch={enableGitHubSearch}
             title={selectedCategory === 'github' ? 'GitHub Projects Search' : selectedCategory === 'AI projects' ? 'AI Agent Frameworks' : 'Production-ready templates'}
             description={selectedCategory === 'github'
               ? 'Search for GitHub repositories by user, organization, or keyword to discover personal projects and portfolio items.'
               : selectedCategory === 'AI projects'
               ? 'Discover powerful AI agent frameworks and platforms for building intelligent, autonomous systems.'
               : 'Discover backend starters that let you ship faster with pre-configured auth, databases, and deployment scripts.'
             }
            className="pb-32"
          />
         </main>

      <Footer />
    </div>
  );
};

export default Templates;