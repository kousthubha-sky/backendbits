"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { templates as defaultTemplates, TemplateDefinition } from '../data/templates';

interface TemplatesShowcaseProps {
  data?: TemplateDefinition[];
  showDetails?: boolean;
  sectionId?: string;
  className?: string;
  title?: string;
  description?: string;
}

const TemplatesShowcase: React.FC<TemplatesShowcaseProps> = ({
  data = defaultTemplates,
  showDetails = false,
  sectionId,
  className = "",
  title = "Production-ready templates",
  description = "Clone, customize, and ship secure stacks in minutes—not days.",
}) => {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [expandedTemplate, setExpandedTemplate] = useState<string | null>(null);

  const handleCopy = (slug: string) => {
    const command = `npx create-backend-template ${slug}`;
    navigator.clipboard.writeText(command);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const toggleExpanded = (slug: string) => {
    setExpandedTemplate((prev) => (prev === slug ? null : slug));
  };

  return (
    <section id={sectionId} className={`px-6 py-20 md:py-32 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-black mb-6">
            {title}
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">{description}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {data.map((template, index) => (
            <motion.div
              key={template.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-black group-hover:text-gray-800 transition-colors mb-2">
                      {template.name}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-black text-white text-xs font-medium rounded-full">
                      {template.status}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">{template.summary}</p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-black uppercase tracking-wider mb-3">Tech stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {template.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-black uppercase tracking-wider mb-3">Key features</h4>
                  <ul className="space-y-2">
                    {template.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="block w-1.5 h-1.5 bg-black rounded-full mt-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <button
                    onClick={() => handleCopy(template.slug)}
                    className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 transition-colors group/copy"
                  >
                    <code className="text-sm text-gray-700 font-mono">
                      npx create-backend-template {template.slug}
                    </code>
                    <div className="flex-shrink-0 ml-2">
                      {copiedSlug === template.slug ? (
                        <Check size={18} className="text-emerald-600" />
                      ) : (
                        <Copy size={18} className="text-gray-400 group-hover/copy:text-gray-600 transition-colors" />
                      )}
                    </div>
                  </button>
                </div>

                <div className="flex gap-3 mb-6">
                  {template.demoUrl && template.demoUrl !== "TODO" ? (
                    <a
                      href={template.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-4 py-3 rounded-xl font-medium text-sm hover:bg-gray-800 transition-colors"
                    >
                      <ExternalLink size={16} />
                      View demo
                    </a>
                  ) : (
                    <div className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-400 px-4 py-3 rounded-xl font-medium text-sm cursor-not-allowed">
                      <ExternalLink size={16} />
                      Demo coming soon
                    </div>
                  )}
                  <a
                    href={template.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl font-medium text-sm hover:bg-gray-200 transition-colors"
                  >
                    <Github size={16} />
                    View code
                  </a>
                </div>

                {showDetails && (
                  <div className="border-t border-gray-200 pt-6">
                    <button
                      onClick={() => toggleExpanded(template.slug)}
                      className="w-full flex items-center justify-between text-sm font-semibold text-black hover:text-gray-700 transition-colors"
                    >
                      <span className="uppercase tracking-wider">Deployment & use cases</span>
                      {expandedTemplate === template.slug ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>

                    <AnimatePresence initial={false}>
                      {expandedTemplate === template.slug && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6 space-y-6">
                            <div>
                              <h5 className="text-sm font-semibold text-black uppercase tracking-wider mb-3">Deployment</h5>
                              <p className="text-sm text-gray-600 mb-3">{template.deployment.headline}</p>
                              <div className="space-y-3">
                                <div>
                                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Providers</span>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {template.deployment.providers.map((provider) => (
                                      <span
                                        key={provider}
                                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                                      >
                                        {provider}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Environment variables</span>
                                  <div className="flex flex-wrap gap-2 mt-1">
                                    {template.deployment.env.map((env) => (
                                      <code
                                        key={env}
                                        className="px-2 py-1 bg-gray-50 text-gray-700 text-xs font-mono rounded border border-gray-200"
                                      >
                                        {env}
                                      </code>
                                    ))}
                                  </div>
                                </div>
                                {template.deployment.notes && (
                                  <ul className="space-y-1">
                                    {template.deployment.notes.map((note) => (
                                      <li key={note} className="flex items-start gap-2 text-xs text-gray-600">
                                        <span className="block w-1 h-1 bg-gray-400 rounded-full mt-1.5 flex-shrink-0" />
                                        <span>{note}</span>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>

                            <div>
                              <h5 className="text-sm font-semibold text-black uppercase tracking-wider mb-3">Example use cases</h5>
                              <div className="space-y-3">
                                {template.useCases.map((useCase) => (
                                  <div key={useCase.name} className="p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-start justify-between gap-2">
                                      <div className="flex-1">
                                        <h6 className="text-sm font-semibold text-black mb-1">{useCase.name}</h6>
                                        <p className="text-xs text-gray-600">{useCase.description}</p>
                                      </div>
                                      {useCase.url && (
                                        <a
                                          href={useCase.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex-shrink-0 text-gray-400 hover:text-black transition-colors"
                                        >
                                          <ExternalLink size={14} />
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplatesShowcase;
