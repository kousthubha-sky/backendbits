"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

interface Template {
  id: string;
  name: string;
  description: string;
  tech: string[];
  preview: string;
  github: string;
  demo: string;
  stars: number;
  category: string;
}

const Templates: React.FC = () => {
  const templates: Template[] = [
    {
      id: "1",
      name: "Modern Portfolio",
      description: "Clean, minimal portfolio template with smooth animations and responsive design.",
      tech: ["React", "Next.js", "Framer Motion"],
      preview: "/api/placeholder/400/300",
      github: "https://github.com",
      demo: "https://demo.com",
      stars: 245,
      category: "Portfolio"
    },
    {
      id: "2",
      name: "Developer Blog",
      description: "Technical blog template with syntax highlighting and dark mode support.",
      tech: ["React", "MDX", "Tailwind"],
      preview: "/api/placeholder/400/300",
      github: "https://github.com",
      demo: "https://demo.com",
      stars: 189,
      category: "Blog"
    },
    {
      id: "3",
      name: "E-commerce Store",
      description: "Full-featured online store with cart, checkout, and admin dashboard.",
      tech: ["React", "Stripe", "Prisma"],
      preview: "/api/placeholder/400/300",
      github: "https://github.com",
      demo: "https://demo.com",
      stars: 312,
      category: "E-commerce"
    },
    {
      id: "4",
      name: "SaaS Dashboard",
      description: "Admin dashboard template with charts, tables, and user management.",
      tech: ["React", "Chart.js", "Supabase"],
      preview: "/api/placeholder/400/300",
      github: "https://github.com",
      demo: "https://demo.com",
      stars: 156,
      category: "Dashboard"
    },
    {
      id: "5",
      name: "Landing Page",
      description: "High-converting landing page with hero sections and testimonials.",
      tech: ["React", "Framer Motion", "Tailwind"],
      preview: "/api/placeholder/400/300",
      github: "https://github.com",
      demo: "https://demo.com",
      stars: 278,
      category: "Landing"
    },
    {
      id: "6",
      name: "Documentation Site",
      description: "Documentation template with search, navigation, and code examples.",
      tech: ["Next.js", "Algolia", "MDX"],
      preview: "/api/placeholder/400/300",
      github: "https://github.com",
      demo: "https://demo.com",
      stars: 134,
      category: "Documentation"
    }
  ];

  const categories = ["All", "Portfolio", "Blog", "E-commerce", "Dashboard", "Landing", "Documentation"];

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Navbar />

      <main className="pt-32">
        {/* Hero Section */}
        <section className="px-6 pb-20 text-center max-w-4xl mx-auto">
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
            className="text-xl text-gray-500 mb-12"
          >
            Discover beautiful, production-ready templates for your next project.
          </motion.p>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-16"
          >
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
              >
                {category}
              </button>
            ))}
          </motion.div>
        </section>

        {/* Templates Grid */}
        <section className="px-6 pb-32">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  {/* Preview Image */}
                  <div className="aspect-video bg-gray-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <div className="text-gray-400 text-sm">Preview</div>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-600">
                      {template.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-black group-hover:text-gray-800 transition-colors">
                        {template.name}
                      </h3>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Star size={14} fill="currentColor" />
                        <span className="text-sm">{template.stars}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {template.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {template.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-xl font-medium text-sm hover:bg-gray-800 transition-colors">
                        <ExternalLink size={14} />
                        Demo
                      </button>
                      <button className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium text-sm hover:bg-gray-200 transition-colors">
                        <Github size={14} />
                        Code
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Templates;