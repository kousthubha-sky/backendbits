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
  const [selectedFilters, setSelectedFilters] = useState<{
    auth: string[];
    frontend: string[];
    database: string[];
  }>({
    auth: [],
    frontend: [],
    database: []
  });
  const [filterDropdowns, setFilterDropdowns] = useState<{
    auth: boolean;
    frontend: boolean;
    database: boolean;
  }>({
    auth: false,
    frontend: false,
    database: false
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [githubSearchQuery, setGithubSearchQuery] = useState('');
  const [githubRepos, setGithubRepos] = useState<TemplateDefinition[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<'user' | 'org' | 'search'>('user');

  // Dynamic filter options based on available data
  const getFilterOptions = () => {
    const allTech = data.flatMap(template => template.techStack);
    const uniqueTech = Array.from(new Set(allTech));

    return {
      auth: uniqueTech.filter(tech => ['Better Auth', 'Auth0', 'Supabase', 'Firebase', 'Passport.js', 'OAuth', 'Social Login', 'bcrypt'].includes(tech)),
      frontend: uniqueTech.filter(tech => ['Next.js', 'React', 'Vue.js', 'Vue', 'Svelte', 'SvelteKit', 'Angular'].includes(tech)),
      database: uniqueTech.filter(tech => ['MongoDB', 'MySQL', 'Supabase', 'PostgreSQL', 'Redis', 'SQLite'].includes(tech))
    };
  };

  const filterOptions = getFilterOptions();

  const techYTransforms = [
    useTransform(scrollYProgress, [0, 1], [0, -10]),
    useTransform(scrollYProgress, [0, 1], [0, -20]),
    useTransform(scrollYProgress, [0, 1], [0, -30])
  ];
  const extraY = useTransform(scrollYProgress, [0, 1], [0, -40]);



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
      // AI and Agent Framework mappings
      'Python': 'devicon-python-plain',
      'JavaScript': 'devicon-javascript-plain',
      'Node.js': 'devicon-nodejs-plain',
      'Docker': 'devicon-docker-plain',
      'Jupyter': 'devicon-jupyter-plain',
      'GitHub': 'devicon-github-original',
      'LLMs': 'devicon-python-plain',
      'Vector Databases': 'devicon-mongodb-plain',
      'Agent Orchestration': 'devicon-nodejs-plain',
      'Multi-Agent Systems': 'devicon-nodejs-plain',
      'Memory Systems': 'devicon-redis-plain',
      'Tool Integration': 'devicon-nodejs-plain',
      'Function Calling': 'devicon-nodejs-plain',
      'RAG': 'devicon-elasticsearch-plain',
      'MCP': 'devicon-nodejs-plain',
      'Code Execution': 'devicon-terminal-plain',
      'Sandboxed Environments': 'devicon-docker-plain',
      'Web Search': 'devicon-chrome-plain',
      'Research Tools': 'devicon-jupyter-plain',
      'LLM Control': 'devicon-nodejs-plain',
      'Agent Alignment': 'devicon-nodejs-plain',
      'Safety Measures': 'devicon-nodejs-plain',
      'Google AI': 'devicon-google-plain',
      'Agent Framework': 'devicon-nodejs-plain',
      'Production Patterns': 'devicon-nodejs-plain',
      'MLOps': 'devicon-python-plain',
      'Industry Applications': 'devicon-nodejs-plain',
      'Open Source': 'devicon-github-original',
      'Use Cases': 'devicon-nodejs-plain',
      'LangChain': 'devicon-nodejs-plain',
      'Hugging Face': 'devicon-python-plain',
      'Lightweight Framework': 'devicon-nodejs-plain',
      'Communication Protocols': 'devicon-nodejs-plain',
      'Agent Coordination': 'devicon-nodejs-plain',
      'Role-Based Agents': 'devicon-nodejs-plain',
      'Software Development': 'devicon-git-plain',
      'Web Scraping': 'devicon-chrome-plain',
      'Data Extraction': 'devicon-nodejs-plain',
      'AI Training': 'devicon-python-plain',
      'Agent Management': 'devicon-nodejs-plain',
      'Deployment Tools': 'devicon-docker-plain',
      'Workflow Automation': 'devicon-nodejs-plain',
      'CrewAI': 'devicon-python-plain',
      'AutoGen': 'devicon-python-plain',
      'Playwright': 'devicon-nodejs-plain',
      'State Management': 'devicon-redux-plain',
      'API Integrations': 'devicon-nodejs-plain',
      'Composio': 'devicon-nodejs-plain',
      'AnythingLLM': 'devicon-nodejs-plain',
      'Daytona': 'devicon-docker-plain',
      'Deer Flow': 'devicon-python-plain',
      'Parlant': 'devicon-python-plain',
      'ADK Python': 'devicon-python-plain',
      'Agents Towards Production': 'devicon-jupyter-plain',
      '500 AI Agents Projects': 'devicon-github-original',
      'LangGraph': 'devicon-nodejs-plain',
      'SmolAgents': 'devicon-python-plain',
      'AgentVerse': 'devicon-python-plain',
      'MetaGPT': 'devicon-python-plain',
      'Firecrawl': 'devicon-nodejs-plain',
      'AI Agents for Beginners': 'devicon-jupyter-plain',
      'Suna': 'devicon-nodejs-plain',
      'ActivePieces': 'devicon-nodejs-plain',
      // New Auth and API mappings
      'Passport.js': 'devicon-nodejs-plain',
      'OAuth': 'devicon-nodejs-plain',
      'Social Login': 'devicon-nodejs-plain',
      'bcrypt': 'devicon-nodejs-plain',
      'EJS': 'devicon-nodejs-plain',
      'REST API': 'devicon-nodejs-plain',
      'Validation': 'devicon-nodejs-plain',
      'ES6': 'devicon-nodejs-plain',
      'Testing': 'devicon-nodejs-plain',
      // Chat App mappings
      'Socket.io': 'devicon-nodejs-plain',
      'Real-time': 'devicon-nodejs-plain',
      'WebSocket': 'devicon-nodejs-plain',
      'Styled Components': 'devicon-react-original',
      'Chat Rooms': 'devicon-nodejs-plain',
      'Private Messaging': 'devicon-nodejs-plain',
      // Blogging Platform mappings
      'PostgreSQL': 'devicon-postgresql-plain',
      'Role-based Access': 'devicon-nodejs-plain',
      'Caching': 'devicon-redis-plain',
      'Content Management': 'devicon-nodejs-plain',
      'SSR': 'devicon-nextjs-original',
      'Multi-user': 'devicon-nodejs-plain',
      'SEO': 'devicon-nodejs-plain',
    };
    return techMap[tech] || 'devicon-code-plain';
  };



  const handleGitHubSearch = useCallback(async () => {
    const query = githubSearchQuery.trim();

    if (!query) {
      setGithubRepos([]);
      setSearchError(null);
      return;
    }

    // Basic validation for GitHub usernames/organization names
    if (searchType === 'user' || searchType === 'org') {
      if (query.length < 1 || query.length > 39) {
        setSearchError('Username/organization name must be between 1 and 39 characters');
        setGithubRepos([]);
        return;
      }
      if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/.test(query)) {
        setSearchError('Invalid format. Use only letters, numbers, and hyphens (cannot start or end with hyphen)');
        setGithubRepos([]);
        return;
      }
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      let repos: TemplateDefinition[] = [];

      if (searchType === 'user') {
        repos = await githubService.getUserReposAsTemplates(query);
      } else if (searchType === 'org') {
        repos = await githubService.getOrgReposAsTemplates(query);
      } else {
        repos = await githubService.searchReposAsTemplates(query);
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

  const getCommand = (template: TemplateDefinition) => {
    return template.codeUrl.includes('backend-bits') ? `npx @kousthubha/stack-end ${template.slug}` : `git clone ${template.codeUrl}`;
  };

  const handleCopy = (template: TemplateDefinition) => {
    const command = getCommand(template);
    navigator.clipboard.writeText(command);
    setCopiedSlug(template.slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const openModal = (template: TemplateDefinition) => {
    setSelectedTemplate(template);
  };

  const closeModal = () => {
    setSelectedTemplate(null);
  };

  const filteredData = data.filter(template => {
    // Text search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchesName = template.name.toLowerCase().includes(query);
      const matchesDescription = template.description.toLowerCase().includes(query);
      const matchesTechStack = template.techStack.some(tech => tech.toLowerCase().includes(query));
      if (!matchesName && !matchesDescription && !matchesTechStack) return false;
    }

    // Filter by auth systems
    if (selectedFilters.auth.length > 0 && !selectedFilters.auth.some(auth => template.techStack.includes(auth))) return false;

    // Filter by frontend frameworks
    if (selectedFilters.frontend.length > 0 && !selectedFilters.frontend.some(front => template.techStack.includes(front))) return false;

    // Filter by databases
    if (selectedFilters.database.length > 0 && !selectedFilters.database.some(db => template.techStack.includes(db))) return false;

    return true;
  });

  const hasActiveFilters = Object.values(selectedFilters).some(arr => arr.length > 0) || searchQuery.trim();

  const clearAllFilters = () => {
    setSelectedFilters({
      auth: [],
      frontend: [],
      database: []
    });
    setSearchQuery('');
  };

  const toggleFilter = (category: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

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
              <div className="max-w-3xl mx-auto mb-8 px-4 sm:px-0">
                {/* Mobile: Stack vertically, Desktop: Horizontal layout */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 mb-4">
                  {/* Search type buttons - responsive grid on mobile */}
                  <div className="flex gap-2 sm:gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setSearchType('user')}
                      className={`flex-1 sm:flex-none px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        searchType === 'user'
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      User
                    </button>
                    <button
                      onClick={() => setSearchType('org')}
                      className={`flex-1 sm:flex-none px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        searchType === 'org'
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Organization
                    </button>
                    <button
                      onClick={() => setSearchType('search')}
                      className={`flex-1 sm:flex-none px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        searchType === 'search'
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Repo Search
                    </button>
                  </div>

                  {/* Search input - full width on mobile */}
                  <div className="flex-1 relative w-full sm:w-auto">
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
                      className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-base sm:text-sm"
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

            {/* Enhanced Filters */}
            {showFilters && (
              <div className="max-w-6xl mx-auto mb-8">
                {/* Search Bar */}
                <div className="mb-6">
                  <div className="relative max-w-md mx-auto">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search templates, technologies..."
                      className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-base"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Filter Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-4">
                  {/* Clear All Filters */}
                  {hasActiveFilters && (
                    <button
                      onClick={clearAllFilters}
                      className="px-4 py-2 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                    >
                      Clear All Filters
                    </button>
                  )}

                  {/* Auth System Filter */}
                  <div className="relative">
                    <button
                      onClick={() => setFilterDropdowns(prev => ({ ...prev, auth: !prev.auth }))}
                      className={`px-4 py-2 bg-white border rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2 transition-colors ${
                        selectedFilters.auth.length > 0
                          ? 'border-black text-black bg-black text-white hover:bg-gray-800'
                          : 'border-gray-300 text-gray-700'
                      }`}
                    >
                      Auth Systems {selectedFilters.auth.length > 0 && `(${selectedFilters.auth.length})`}
                      <svg className={`w-4 h-4 transition-transform ${filterDropdowns.auth ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {filterDropdowns.auth && (
                      <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-10 w-56 max-h-64 overflow-y-auto">
                        {filterOptions.auth.map(option => (
                          <label key={option} className="flex items-center gap-2 py-2 cursor-pointer hover:bg-gray-50 px-2 rounded">
                            <input
                              type="checkbox"
                              checked={selectedFilters.auth.includes(option)}
                              onChange={() => toggleFilter('auth', option)}
                              className="rounded border-gray-300 text-black focus:ring-black"
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
                      onClick={() => setFilterDropdowns(prev => ({ ...prev, frontend: !prev.frontend }))}
                      className={`px-4 py-2 bg-white border rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2 transition-colors ${
                        selectedFilters.frontend.length > 0
                          ? 'border-black text-black bg-black text-white hover:bg-gray-800'
                          : 'border-gray-300 text-gray-700'
                      }`}
                    >
                      Frontend {selectedFilters.frontend.length > 0 && `(${selectedFilters.frontend.length})`}
                      <svg className={`w-4 h-4 transition-transform ${filterDropdowns.frontend ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {filterDropdowns.frontend && (
                      <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-10 w-56 max-h-64 overflow-y-auto">
                        {filterOptions.frontend.map(option => (
                          <label key={option} className="flex items-center gap-2 py-2 cursor-pointer hover:bg-gray-50 px-2 rounded">
                            <input
                              type="checkbox"
                              checked={selectedFilters.frontend.includes(option)}
                              onChange={() => toggleFilter('frontend', option)}
                              className="rounded border-gray-300 text-black focus:ring-black"
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
                      onClick={() => setFilterDropdowns(prev => ({ ...prev, database: !prev.database }))}
                      className={`px-4 py-2 bg-white border rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2 transition-colors ${
                        selectedFilters.database.length > 0
                          ? 'border-black text-black bg-black text-white hover:bg-gray-800'
                          : 'border-gray-300 text-gray-700'
                      }`}
                    >
                      Database {selectedFilters.database.length > 0 && `(${selectedFilters.database.length})`}
                      <svg className={`w-4 h-4 transition-transform ${filterDropdowns.database ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {filterDropdowns.database && (
                      <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-3 z-10 w-56 max-h-64 overflow-y-auto">
                        {filterOptions.database.map(option => (
                          <label key={option} className="flex items-center gap-2 py-2 cursor-pointer hover:bg-gray-50 px-2 rounded">
                            <input
                              type="checkbox"
                              checked={selectedFilters.database.includes(option)}
                              onChange={() => toggleFilter('database', option)}
                              className="rounded border-gray-300 text-black focus:ring-black"
                            />
                            <span className="text-sm">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>


                </div>

                {/* Active Filters Display */}
                {hasActiveFilters && (
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {selectedFilters.auth.map(filter => (
                      <span key={`auth-${filter}`} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        Auth: {filter}
                        <button onClick={() => toggleFilter('auth', filter)} className="hover:text-blue-600">
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    {selectedFilters.frontend.map(filter => (
                      <span key={`frontend-${filter}`} className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Frontend: {filter}
                        <button onClick={() => toggleFilter('frontend', filter)} className="hover:text-green-600">
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                    {selectedFilters.database.map(filter => (
                      <span key={`database-${filter}`} className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        Database: {filter}
                        <button onClick={() => toggleFilter('database', filter)} className="hover:text-purple-600">
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Results Count */}
                <div className="text-center text-sm text-gray-600">
                  Showing {displayData.length} of {enableGitHubSearch && githubRepos.length > 0 ? githubRepos.length : data.length} templates
                  {hasActiveFilters && ' (filtered)'}
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
                       {Array.from(new Set(template.techStack)).slice(0, 3).map((tech) => (
                         <i
                           key={tech}
                           className={`${getDeviconClass(tech)} colored text-lg md:text-2xl`}
                           title={tech}
                         />
                       ))}
                       {Array.from(new Set(template.techStack)).length > 3 && (
                         <span className="text-xs text-gray-500">+{Array.from(new Set(template.techStack)).length - 3}</span>
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
                      {Array.from(new Set(template.techStack)).slice(0, 3).map((tech, idx) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium inline-block truncate max-w-[120px]"
                        >
                          {tech}
                        </span>
                      ))}
                      {Array.from(new Set(template.techStack)).length > 3 && (
                        <span
                          className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md inline-block"
                        >
                          +{Array.from(new Set(template.techStack)).length - 3}
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
                       onClick={() => handleCopy(selectedTemplate)}
                       className="w-full flex items-center justify-between bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 transition-colors"
                     >
                       <code className="text-sm text-gray-700 font-mono">
                         {getCommand(selectedTemplate)}
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