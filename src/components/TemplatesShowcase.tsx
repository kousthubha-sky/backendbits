"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Github, Copy, Check, X, Search } from 'lucide-react';
import { templates as defaultTemplates, TemplateDefinition } from '../data/templates';
import { githubService } from '../lib/github';

interface TemplatesShowcaseProps {
  data?: TemplateDefinition[];
  sectionId?: string;
  className?: string;
  title?: string;
  description?: string;
  showFilters?: boolean;
  enableGitHubSearch?: boolean;
}

const TemplatesShowcase = ({
  data = defaultTemplates,
  sectionId = "",
  className = "",
  title = "Production-ready templates",
  description = "Clone, customize, and ship secure stacks in minutes—not days.",
  showFilters = true,
  enableGitHubSearch = false,
}) => {
  const { scrollYProgress } = useScroll();
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateDefinition | null>(null);
  const [selectedAuth, setSelectedAuth] = useState<string[]>([]);
  const [selectedFrontend, setSelectedFrontend] = useState<string[]>([]);
  const [selectedDatabase, setSelectedDatabase] = useState<string[]>([]);
  const [showAuth, setShowAuth] = useState(false);
  const [showFrontend, setShowFrontend] = useState(false);
  const [showDatabase, setShowDatabase] = useState(false);
  const [githubSearchQuery, setGithubSearchQuery] = useState('');
  const [githubRepos, setGithubRepos] = useState<TemplateDefinition[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<'user' | 'org' | 'search'>('user');

  const authOptions = ['Better Auth', 'Auth0'];
  const frontendOptions = ['Next.js', 'React', 'Vue.js'];
  const databaseOptions = ['MongoDB', 'MySQL', 'Supabase'];

  const techYTransforms = [
    useTransform(scrollYProgress, [0, 1], [0, -10]),
    useTransform(scrollYProgress, [0, 1], [0, -20]),
    useTransform(scrollYProgress, [0, 1], [0, -30])
  ];
  const extraY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const getDeviconClass = (tech: string) => {
    const techMap: { [key: string]: string } = {
      'Next.js': 'devicon-nextjs-original',
      'TypeScript': 'devicon-typescript-original',
      'Tailwind CSS': 'devicon-tailwindcss-plain',
      'React Router': 'devicon-react-original',
      'Auth0': 'devicon-auth0-plain',
      'TanStack Query': 'devicon-react-original',
      'Vite': 'devicon-vitejs-plain',
      'Better Auth': 'devicon-nodejs-plain',
      'MongoDB Atlas': 'devicon-mongodb-plain',
      'MongoDB': 'devicon-mongodb-plain',
      'MySQL': 'devicon-mysql-plain',
      'Vue.js': 'devicon-vuejs-plain',
      'Vue': 'devicon-vuejs-plain',
      'Zod': 'devicon-nodejs-plain',
      'Resend': 'devicon-nodejs-plain',
      'Google Gemini API': 'devicon-google-plain',
      'Lucide React': 'devicon-react-original',
      'shadcn/ui': 'devicon-react-original',
      'Framer Motion': 'devicon-react-original',
      'Geist': 'devicon-fontawesome-plain',
      'FastAPI': 'devicon-python-plain',
      'React': 'devicon-react-original',
      'Supabase': 'devicon-postgresql-plain',
      'Redis': 'devicon-redis-plain',
      'Razorpay': 'devicon-nodejs-plain',
    };
    return techMap[tech] || 'devicon-code-plain';
  };



  const handleGitHubSearch = useCallback(async () => {
    if (!githubSearchQuery.trim()) {
      setGithubRepos([]);
      setSearchError(null);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      let repos: TemplateDefinition[] = [];

      if (searchType === 'user') {
        repos = await githubService.getUserReposAsTemplates(githubSearchQuery.trim());
      } else if (searchType === 'org') {
        repos = await githubService.getOrgReposAsTemplates(githubSearchQuery.trim());
      } else {
        repos = await githubService.searchReposAsTemplates(githubSearchQuery.trim());
      }

      setGithubRepos(repos);
    } catch (error) {
      console.error('GitHub search error:', error);
      setSearchError(error instanceof Error ? error.message : 'Failed to fetch GitHub repositories');
      setGithubRepos([]);
    } finally {
      setIsSearching(false);
    }
  }, [githubSearchQuery, searchType]);

  useEffect(() => {
    if (enableGitHubSearch && githubSearchQuery.trim()) {
      const debounceTimer = setTimeout(() => {
        handleGitHubSearch();
      }, 500);

      return () => clearTimeout(debounceTimer);
    } else if (!githubSearchQuery.trim()) {
      setGithubRepos([]);
      setSearchError(null);
    }
  }, [githubSearchQuery, searchType, enableGitHubSearch, handleGitHubSearch]);

  const handleCopy = (slug: string) => {
    const command = `npx @kousthubha/stack-end ${slug}`;
    navigator.clipboard.writeText(command);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const openModal = (template: TemplateDefinition) => {
    setSelectedTemplate(template);
  };

  const closeModal = () => {
    setSelectedTemplate(null);
  };

  const filteredData = data.filter(template => {
    if (selectedAuth.length > 0 && !selectedAuth.some(auth => template.techStack.includes(auth))) return false;
    if (selectedFrontend.length > 0 && !selectedFrontend.some(front => template.techStack.includes(front))) return false;
    if (selectedDatabase.length > 0 && !selectedDatabase.some(db => template.techStack.includes(db))) return false;
    return true;
  });

  const displayData = enableGitHubSearch && githubRepos.length > 0 ? githubRepos : filteredData;

  return (
    <section id={sectionId} className={`px-6 ${className}`}>
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
           <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">{description}</p>

           {/* GitHub Search */}
           {enableGitHubSearch && (
             <div className="max-w-3xl mx-auto mb-8">
               <div className="flex gap-2 mb-4">
                 <div className="flex gap-2">
                   <button
                     onClick={() => setSearchType('user')}
                     className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                       searchType === 'user'
                         ? 'bg-black text-white'
                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                     }`}
                   >
                     User
                   </button>
                   <button
                     onClick={() => setSearchType('org')}
                     className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                       searchType === 'org'
                         ? 'bg-black text-white'
                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                     }`}
                   >
                     Organization
                   </button>
                   <button
                     onClick={() => setSearchType('search')}
                     className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                       searchType === 'search'
                         ? 'bg-black text-white'
                         : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                     }`}
                   >
                     Search
                   </button>
                 </div>
                 <div className="flex-1 relative">
                   <input
                     type="text"
                     value={githubSearchQuery}
                     onChange={(e) => setGithubSearchQuery(e.target.value)}
                     placeholder={
                       searchType === 'user'
                         ? 'Enter GitHub username...'
                         : searchType === 'org'
                         ? 'Enter organization name...'
                         : 'Search repositories...'
                     }
                     className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                   />
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                   {isSearching && (
                     <div className="absolute right-3 top-1/2 -translate-y-1/2">
                       <div className="w-4 h-4 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
                     </div>
                   )}
                 </div>
               </div>
               {searchError && (
                 <div className="text-sm text-red-600 text-center mb-4">
                   {searchError}
                 </div>
               )}
               {githubRepos.length > 0 && (
                 <div className="text-sm text-gray-600 text-center">
                   Found {githubRepos.length} repositories
                 </div>
               )}
             </div>
           )}

           {/* Filters */}
           {showFilters && (
             <div className="flex flex-wrap justify-center gap-4 mb-8">
             {/* Auth System Filter */}
             <div className="relative">
               <button
                 onClick={() => setShowAuth(!showAuth)}
                 className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
               >
                 Auth System {selectedAuth.length > 0 && `(${selectedAuth.length})`}
                 <svg className={`w-4 h-4 transition-transform ${showAuth ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                 </svg>
               </button>
               {showAuth && (
                 <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-10 w-48">
                   {authOptions.map(option => (
                     <label key={option} className="flex items-center gap-2 py-1 cursor-pointer">
                       <input
                         type="checkbox"
                         checked={selectedAuth.includes(option)}
                         onChange={e => {
                           if (e.target.checked) {
                             setSelectedAuth([...selectedAuth, option]);
                           } else {
                             setSelectedAuth(selectedAuth.filter(a => a !== option));
                           }
                         }}
                         className="rounded"
                       />
                       <span className="text-sm">{option}</span>
                     </label>
                   ))}
                 </div>
               )}
             </div>

             {/* Frontend Filter */}
             <div className="relative">
               <button
                 onClick={() => setShowFrontend(!showFrontend)}
                 className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
               >
                 Frontend {selectedFrontend.length > 0 && `(${selectedFrontend.length})`}
                 <svg className={`w-4 h-4 transition-transform ${showFrontend ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                 </svg>
               </button>
               {showFrontend && (
                 <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-10 w-48">
                   {frontendOptions.map(option => (
                     <label key={option} className="flex items-center gap-2 py-1 cursor-pointer">
                       <input
                         type="checkbox"
                         checked={selectedFrontend.includes(option)}
                         onChange={e => {
                           if (e.target.checked) {
                             setSelectedFrontend([...selectedFrontend, option]);
                           } else {
                             setSelectedFrontend(selectedFrontend.filter(f => f !== option));
                           }
                         }}
                         className="rounded"
                       />
                       <span className="text-sm">{option}</span>
                     </label>
                   ))}
                 </div>
               )}
             </div>

             {/* Database Filter */}
             <div className="relative">
               <button
                 onClick={() => setShowDatabase(!showDatabase)}
                 className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
               >
                 Database {selectedDatabase.length > 0 && `(${selectedDatabase.length})`}
                 <svg className={`w-4 h-4 transition-transform ${showDatabase ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                 </svg>
               </button>
               {showDatabase && (
                 <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-10 w-48">
                   {databaseOptions.map(option => (
                     <label key={option} className="flex items-center gap-2 py-1 cursor-pointer">
                       <input
                         type="checkbox"
                         checked={selectedDatabase.includes(option)}
                         onChange={e => {
                           if (e.target.checked) {
                             setSelectedDatabase([...selectedDatabase, option]);
                           } else {
                             setSelectedDatabase(selectedDatabase.filter(d => d !== option));
                           }
                         }}
                         className="rounded"
                       />
                       <span className="text-sm">{option}</span>
                     </label>
                   ))}
                 </div>
               )}
             </div>
           </div>
           )}
         </motion.div>



        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {displayData.map((template, index) => (
            <motion.div
              key={template.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => openModal(template)}
            >
              <div className="p-3 md:p-6">
                {/* Image/Icon Section */}
                <div className="mb-2 md:mb-4">
                  {template.category === 'personal' || template.category === 'Portfolio' ? (
                    <div className="w-full h-20 md:h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <div className="text-2xl md:text-4xl">📸</div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
                      {template.techStack.slice(0, 3).map((tech) => (
                        <i
                          key={tech}
                          className={`${getDeviconClass(tech)} colored text-lg md:text-2xl`}
                          title={tech}
                        />
                      ))}
                      {template.techStack.length > 3 && (
                        <span className="text-xs text-gray-500">+{template.techStack.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Name and Status */}
                <div className="mb-2 md:mb-3">
                  <h3 className="text-base md:text-lg font-bold text-black group-hover:text-gray-800 transition-colors mb-1">
                    {template.name}
                  </h3>
                  <span className="inline-block px-2 py-1 bg-black text-white text-xs font-medium rounded-full">
                    {template.status}
                  </span>
                </div>

               
                {/* Tech Stack */}
                <div className="mb-2 md:mb-3">
                  <div className="flex flex-wrap gap-1">
                     {template.techStack.slice(0, 3).map((tech, idx) => (
                       <span
                         key={tech}
                         className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium inline-block truncate max-w-[120px]"
                       >
                         {tech}
                       </span>
                     ))}
                     {template.techStack.length > 3 && (
                       <span
                         className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md inline-block"
                       >
                         +{template.techStack.length - 3}
                       </span>
                     )}
                  </div>
                </div>

                {/* Truncated Description */}
                <p className="hidden md:block text-gray-600 text-sm leading-relaxed">
                  {template.summary.length > 60 ? `${template.summary.substring(0, 60)}...` : template.summary}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedTemplate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <style jsx>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                <div className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-black mb-2">{selectedTemplate.name}</h2>
                      <span className="inline-block px-3 py-1 bg-black text-white text-sm font-medium rounded-full">
                        {selectedTemplate.status}
                      </span>
                    </div>
                    <button
                      onClick={closeModal}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6">{selectedTemplate.description}</p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-black uppercase tracking-wider mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTemplate.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-black uppercase tracking-wider mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {selectedTemplate.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-gray-600">
                          <span className="block w-2 h-2 bg-black rounded-full mt-2 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <button
                      onClick={() => handleCopy(selectedTemplate.slug)}
                      className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 transition-colors"
                    >
                      <code className="text-sm text-gray-700 font-mono">
                        npx @kousthubha/stack-end {selectedTemplate.slug}
                      </code>
                      <div className="flex shrink-0 ml-2">
                        {copiedSlug === selectedTemplate.slug ? (
                          <Check size={18} className="text-emerald-600" />
                        ) : (
                          <Copy size={18} className="text-gray-400 hover:text-gray-600 transition-colors" />
                        )}
                      </div>
                    </button>
                  </div>

                  <div className="flex gap-3 mb-6">
                    {selectedTemplate.demoUrl && selectedTemplate.demoUrl !== "TODO" ? (
                      <a
                        href={selectedTemplate.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-4 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
                      >
                        <ExternalLink size={16} />
                        View Demo
                      </a>
                    ) : (
                      <div className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-400 px-4 py-3 rounded-xl font-medium cursor-not-allowed">
                        <ExternalLink size={16} />
                        Demo Coming Soon
                      </div>
                    )}
                    <a
                      href={selectedTemplate.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                    >
                      <Github size={16} />
                      View Code
                    </a>
                  </div>

                  <div className="border-t border-gray-200 pt-6 space-y-6">
                    <div>
                      <h5 className="text-lg font-semibold text-black uppercase tracking-wider mb-3">Deployment</h5>
                      <p className="text-gray-600 mb-3">{selectedTemplate.deployment.headline}</p>
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Providers</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {selectedTemplate.deployment.providers.map((provider) => (
                              <span
                                key={provider}
                                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                              >
                                {provider}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Environment Variables</span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {selectedTemplate.deployment.env.map((env) => (
                              <code
                                key={env}
                                className="px-3 py-1 bg-gray-50 text-gray-700 text-sm font-mono rounded border border-gray-200"
                              >
                                {env}
                              </code>
                            ))}
                          </div>
                        </div>
                        {selectedTemplate.deployment.notes && (
                          <ul className="space-y-1">
                            {selectedTemplate.deployment.notes.map((note) => (
                              <li key={note} className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="block w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 shrink-0" />
                                <span>{note}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                    <div>
                      <h5 className="text-lg font-semibold text-black uppercase tracking-wider mb-3">Example Use Cases</h5>
                      <div className="space-y-3">
                        {selectedTemplate.useCases.map((useCase) => (
                          <div key={useCase.name} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <h6 className="text-lg font-semibold text-black mb-1">{useCase.name}</h6>
                                <p className="text-gray-600">{useCase.description}</p>
                              </div>
                              {useCase.url && (
                                <a
                                  href={useCase.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="shrink-0 text-gray-400 hover:text-black transition-colors"
                                >
                                  <ExternalLink size={16} />
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TemplatesShowcase;