export type TemplateStatus = "Production-ready" | "Beta" | "Preview";

export interface TemplateUseCase {
  name: string;
  description: string;
  url?: string;
}

export interface TemplateDeployment {
  headline: string;
  providers: string[];
  env: string[];
  notes?: string[];
}

export interface TemplateDefinition {
  slug: string;
  name: string;
  status: TemplateStatus;
  category: string;
  summary: string;
  description: string;
  techStack: string[];
  features: string[];
  demoUrl: string | null;
  codeUrl: string;
  deployment: TemplateDeployment;
  useCases: TemplateUseCase[];
}

export const templates: TemplateDefinition[] = [
  {
    slug: "better-auth-mongodb",
    name: "Better Auth + MongoDB",
    status: "Production-ready",
    category: "auth",
    summary:
      "Backend starter that marries Better Auth with MongoDB so you can launch secure apps without hand-rolling auth.",
    description:
      "Next.js API routes, Better Auth, and MongoDB Atlas wired together with server actions, role-aware middleware, and ergonomic developer tooling.",
    techStack: ["Next.js API Routes", "Better Auth", "MongoDB Atlas", "Zod", "Tailwind CSS"],
    features: [
      "Email + OAuth flows pre-configured with Better Auth adapters",
      "MongoDB models for users, sessions, and activity logs",
      "Server action helpers with strict runtime validation via Zod",
      "Env-safe scaffolding with typed secrets and DX scripts"
    ],
    demoUrl: "TODO",
    codeUrl: "https://github.com/backend-bits/better-auth-mongodb",
    deployment: {
      headline: "Ship securely on Vercel, Railway, or any Node-friendly host",
      providers: ["Vercel Functions", "Railway", "Fly.io"],
      env: ["BETTER_AUTH_SECRET", "MONGODB_URI", "RESEND_API_KEY"],
      notes: [
        "Includes health-check endpoint and smoke tests for CI",
        "Dockerfile + Procfile samples make container deploys straightforward"
      ]
    },
    useCases: [
      {
        name: "Git Repo Analyzer",
        description: "Student project that scores GitHub repos using the Better Auth starter as its API backbone.",
        url: "https://github.com/kousthubha-sky/gitrepo-analyzer"
      }
    ]
  },
  {
    slug: "auth0-react-router",
    name: "Auth0 + React Router",
    status: "Production-ready",
    category: "auth",
    summary:
      "Front-end and gateway template for teams that want Auth0-powered auth, protected routes, and lightning-fast React Router DX.",
    description:
      "Vite + React Router stack with Auth0 SDK, TanStack Query data layer, and battle-tested routing guards wired for SPA deployments.",
    techStack: ["React Router", "Auth0", "Vite", "TanStack Query", "Tailwind CSS"],
    features: [
      "Auth0 universal login + role-based client guards",
      "Route loaders + TanStack Query for data hydration",
      "Streaming-friendly skeleton states and optimistic UI",
      "Utility scripts for seeding Auth0 tenants in CI"
    ],
    demoUrl: "https://github.com/kousthubha-sky/AI-resume-analyzer",
    codeUrl: "https://github.com/backend-bits/react-router-auth0/",
    deployment: {
      headline: "Optimized for Netlify, Cloudflare Pages, and static Vite targets",
      providers: ["Netlify", "Vercel", "Cloudflare Pages"],
      env: ["VITE_AUTH0_DOMAIN", "VITE_AUTH0_CLIENT_ID", "API_BASE_URL"],
      notes: [
        "Includes Netlify config with proper SPA fallbacks",
        "Example GitHub Actions workflow for lint + build"
      ]
    },
    useCases: [
      {
        name: "AI Résumé Analyzer",
        description: "Student-built dashboard that layers AI summarization on top of the Auth0 + React Router template.",
        url: "https://github.com/kousthubha-sky/AI-resume-analyzer"
      }
    ]
  },
  {
    slug: "personal-project-demo",
    name: "Personal Project Demo",
    status: "Preview",
    category: "personal",
    summary: "A demo template for personal projects to showcase your work.",
    description: "Basic setup for personal projects with demo functionality.",
    techStack: ["Next.js", "React", "Tailwind CSS"],
    features: [
      "Basic project structure",
      "Demo components",
      "Responsive design"
    ],
    demoUrl: "https://example.com/demo",
    codeUrl: "https://github.com/example/personal-project-demo",
    deployment: {
      headline: "Deploy easily on Vercel or Netlify",
      providers: ["Vercel", "Netlify"],
      env: [],
      notes: []
    },
     useCases: [
       {
         name: "Portfolio Showcase",
         description: "Display your personal projects with this demo template."
       }
     ]
   },
   {
     slug: "ai-resume-analyzer",
     name: "AI Resume Analyzer",
     status: "Production-ready",
     category: "personal",
     summary:
       "AI-powered resume analyzer built with React and Puter.js for seamless auth, resume storage, and intelligent ATS scoring with custom feedback.",
     description:
       "A comprehensive resume analysis tool featuring browser-based authentication, secure file storage, AI-driven job matching with ATS scores, and a modern UI built with React Router, Tailwind CSS, and TypeScript. Leverages Puter.js for serverless backend functionality including AI evaluations and data persistence.",
     techStack: ["React", "React Router v7", "Puter.js", "Tailwind CSS", "TypeScript", "Vite", "Zustand"],
     features: [
       "Browser-based authentication with Puter.js",
       "Secure resume upload and storage",
       "AI-powered ATS scoring and job matching",
       "Custom feedback tailored to job listings",
       "Reusable modern UI components",
       "Fully responsive cross-device design",
       "Clean architecture with code reusability"
     ],
     demoUrl: "https://www.youtube.com/watch?v=iYOz165wGkQ",
     codeUrl: "https://github.com/kousthubha-sky/AI-resume-analyzer",
     deployment: {
       headline: "Deploy easily on Vercel or Netlify",
       providers: ["Vercel", "Netlify"],
       env: [],
       notes: [
         "Uses Puter.js for serverless functionality",
         "No backend setup required"
       ]
     },
     useCases: [
       {
         name: "Resume Optimization Tool",
         description: "Help job seekers improve their resumes with AI-powered analysis and ATS scoring."
       }
     ]
   },
   {
     slug: "gitrepo-analyzer",
     name: "GitHub Repository Analyzer",
     status: "Production-ready",
     category: "personal",
     summary:
       "Comprehensive GitHub repository analysis tool with interactive visualizations, commit tracking, and contributor insights using Next.js and FastAPI.",
     description:
       "A full-stack application for analyzing GitHub repositories featuring real-time data visualization, commit history tracking, language distribution charts, contributor statistics, and interactive UI. Built with Next.js frontend, FastAPI backend, and Supabase for data persistence, providing detailed insights into repository metrics and team dynamics.",
     techStack: ["Next.js 15.2.4", "React 19", "TypeScript", "Tailwind CSS", "FastAPI", "PostgreSQL", "Supabase", "Recharts", "Framer Motion"],
     features: [
       "Real-time GitHub repository analysis",
       "Interactive commit history visualizations",
       "Language distribution and code metrics",
       "Contributor activity tracking",
       "File type distribution analysis",
       "Dark/Light theme support",
       "Responsive design for all devices",
       "Analysis history and data persistence"
     ],
     demoUrl: null,
     codeUrl: "https://github.com/kousthubha-sky/gitrepo-analyzer",
     deployment: {
       headline: "Deploy frontend on Vercel, backend on Render",
       providers: ["Vercel", "Render", "Supabase"],
       env: ["DATABASE_URL", "SUPABASE_URL", "SUPABASE_KEY", "GITHUB_TOKEN"],
       notes: [
         "Requires Supabase setup for database",
         "GitHub API token needed for analysis"
       ]
     },
     useCases: [
       {
         name: "Repository Insights Dashboard",
         description: "Provide developers and teams with detailed analytics and visualizations of their GitHub repositories."
       }
     ]
   },
   {
     slug: "portfolio-1",
     name: "Portfolio with AI Chatbot",
     status: "Production-ready",
     category: "Portfolio",
     summary:
       "A modern, responsive portfolio website with integrated AI chatbot for visitor interactions, perfect for showcasing creative work.",
     description:
       "Next.js portfolio template featuring responsive design, modern UI with smooth animations, AI-powered chatbot using Google Gemini, portfolio showcase grid, contact forms, FAQ section, testimonials, and services highlighting.",
     techStack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Lucide React", "Google Gemini API"],
     features: [
       "Fully responsive layout for all devices",
       "Clean, professional design with animations",
       "Integrated Gemini AI assistant for visitors",
       "Grid layout for project showcase",
       "Functional contact form with validation",
       "Expandable FAQ component",
       "Client testimonial display",
       "Services section for expertise",
       "Ready for dark/light mode theming"
     ],
     demoUrl: null,
     codeUrl: "https://github.com/backend-bits/portfolio-1",
     deployment: {
       headline: "Deploy easily on Vercel or Netlify",
       providers: ["Vercel", "Netlify"],
       env: ["GEMINI_API_KEY"],
       notes: [
         "Optional AI features require Google Gemini API key",
         "Static deployment with SPA fallbacks"
       ]
     },
     useCases: [
       {
         name: "Creative Professional Portfolio",
         description: "Ideal for designers and developers to showcase their work with interactive AI assistance."
       }
     ]
   },
   {
     slug: "portfolio-2",
     name: "Creative Portfolio with AI Insights",
     status: "Production-ready",
     category: "Portfolio",
     summary:
       "Sophisticated portfolio template featuring AI-powered design analysis, interactive chatbot, and dynamic project showcases with hover effects.",
     description:
       "Advanced Next.js portfolio with custom typography, AI insights on projects via Google Gemini, interactive chatbot, expandable project details, services highlights, client testimonials, visual gallery, smooth animations including ticker text and circular rotation, and SEO optimization.",
     techStack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Lucide React", "Google Gemini API"],
     features: [
       "Fully responsive design for all devices",
       "Modern UI with custom typography and animations",
       "AI-powered insights for project analysis",
       "Integrated interactive Gemini AI assistant",
       "Dynamic project grid with hover effects",
       "Expandable AI insights on projects",
       "Services section with animated reveals",
       "Elegant testimonial display",
       "Visual portfolio gallery cards",
       "Smooth custom animations and transitions",
       "SEO optimized with Next.js"
     ],
     demoUrl: null,
     codeUrl: "https://github.com/backend-bits/portfolio-2",
     deployment: {
       headline: "Deploy easily on Vercel or Netlify",
       providers: ["Vercel", "Netlify"],
       env: ["GEMINI_API_KEY"],
       notes: [
         "Optional AI features require Google Gemini API key",
         "Static deployment with SPA fallbacks"
       ]
     },
     useCases: [
       {
         name: "Designer Portfolio Showcase",
         description: "Perfect for creative professionals to present their work with AI-enhanced insights and professional aesthetics."
       }
     ]
   },
   {
     slug: "portfolio-3",
     name: "Comprehensive Portfolio Website",
     status: "Production-ready",
     category: "Portfolio",
     summary:
       "Full-featured portfolio website with multiple dedicated pages for projects, skills, education, and contact, featuring smooth animations and dark theme.",
     description:
       "Complete Next.js portfolio with separate pages for about, contact, education, projects, and skills. Includes smooth animations, dark theme support, clean design, project showcases with screenshots, skills categorization, education and certifications display, and functional contact form.",
     techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "shadcn/ui", "Framer Motion", "Lucide React", "Geist"],
     features: [
       "Fully responsive layout across devices",
       "Smooth animations with Framer Motion",
       "Dark theme with clean design",
       "Dedicated projects showcase page",
       "Skills and resume section",
       "Education and certifications page",
       "Functional contact form",
       "Professional navigation and layout",
       "Optimized images and performance"
     ],
     demoUrl: null,
     codeUrl: "https://github.com/backend-bits/portfolio-3",
     deployment: {
       headline: "Deploy easily on Vercel or Netlify",
       providers: ["Vercel", "Netlify"],
       env: [],
       notes: [
         "Static deployment optimized for performance",
         "Contact form requires email service configuration"
       ]
     },
     useCases: [
       {
         name: "Developer Portfolio Hub",
         description: "Comprehensive platform for developers to display their full range of skills, projects, and professional background."
       }
      ]
    },
    {
      slug: "better-auth-vue-mongodb-vite",
      name: "Better Auth + Vue + MongoDB + Vite",
      status: "Production-ready",
      category: "auth",
      summary:
        "Vue.js frontend with Better Auth authentication and MongoDB database, built with Vite for rapid development and deployment.",
      description:
        "A full-stack Vue.js application with Better Auth for secure authentication, MongoDB for data persistence, and Vite for fast build times. Includes user management, session handling, and role-based access control.",
      techStack: ["Vue.js", "Better Auth", "MongoDB", "Vite", "TypeScript", "Tailwind CSS"],
      features: [
        "Vue.js components with Better Auth integration",
        "MongoDB database models for users and sessions",
        "Vite-powered fast development and build process",
        "TypeScript for type safety",
        "Tailwind CSS for responsive styling",
        "Role-based middleware and guards"
      ],
      demoUrl: null,
      codeUrl: "https://github.com/backend-bits/better-auth-vue-mongodb-vite",
      deployment: {
        headline: "Deploy on Vercel, Netlify, or any Node.js-compatible host",
        providers: ["Vercel", "Netlify", "Railway"],
        env: ["BETTER_AUTH_SECRET", "MONGODB_URI"],
        notes: [
          "Vite build optimized for static deployment",
          "Includes Docker configuration for containerized deployments"
        ]
      },
      useCases: []
    },
    {
      slug: "better-auth-vue-mongodb",
      name: "Better Auth + Vue + MongoDB",
      status: "Production-ready",
      category: "auth",
      summary:
        "Vue.js application with Better Auth for authentication and MongoDB for data storage, providing a solid foundation for secure web apps.",
      description:
        "Vue.js frontend integrated with Better Auth for comprehensive authentication flows and MongoDB for scalable data management. Features user registration, login, session management, and protected routes.",
      techStack: ["Vue.js", "Better Auth", "MongoDB", "TypeScript", "Tailwind CSS"],
      features: [
        "Vue.js reactive components with auth state management",
        "Better Auth adapters for email and OAuth providers",
        "MongoDB collections for users, sessions, and app data",
        "TypeScript interfaces for type-safe development",
        "Tailwind CSS for modern, responsive UI",
        "Middleware for route protection and role checking"
      ],
      demoUrl: null,
      codeUrl: "https://github.com/backend-bits/better-auth-vue-mongodb",
      deployment: {
        headline: "Deploy on Vercel, Railway, or any Node.js host",
        providers: ["Vercel", "Railway", "Fly.io"],
        env: ["BETTER_AUTH_SECRET", "MONGODB_URI"],
        notes: [
          "Optimized for SPA deployments",
          "Includes build scripts and deployment configs"
        ]
      },
      useCases: []
    },
    {
      slug: "better-auth-vue-mysql",
      name: "Better Auth + Vue + MySQL",
      status: "Production-ready",
      category: "auth",
      summary:
        "Vue.js app with Better Auth authentication and MySQL database, ideal for applications requiring relational data management.",
      description:
        "Full-stack Vue.js application featuring Better Auth for secure user authentication and MySQL for structured data storage. Includes user management, database migrations, and API integration.",
      techStack: ["Vue.js", "Better Auth", "MySQL", "TypeScript", "Tailwind CSS"],
      features: [
        "Vue.js frontend with Better Auth SDK",
        "MySQL database schema for users and authentication",
        "TypeScript for robust development",
        "Tailwind CSS for consistent styling",
        "Database migrations and seeding scripts",
        "API routes with authentication middleware"
      ],
      demoUrl: null,
      codeUrl: "https://github.com/backend-bits/better-auth-vue-mysql",
      deployment: {
        headline: "Deploy on Vercel, Railway, or MySQL-compatible hosts",
        providers: ["Vercel", "Railway", "PlanetScale"],
        env: ["BETTER_AUTH_SECRET", "MYSQL_URL"],
        notes: [
          "Includes MySQL migration scripts",
          "Optimized for serverless and container deployments"
        ]
      },
      useCases: []
    },
    {
      slug: "auth0-razorpay-fastapi-react-router",
      name: "Auth0 + Razorpay + FastAPI + React Router",
      status: "Production-ready",
      category: "payment",
      summary:
        "Fullstack SAAS template integrating Auth0 authentication, Razorpay payments, FastAPI backend, and React Router frontend for modern web applications.",
      description:
        "A complete fullstack SAAS application template with authentication, payments, and modern frontend/backend architecture. Features Auth0 for secure user authentication, Razorpay for payment processing and subscriptions, FastAPI for high-performance backend API, and React Router for client-side routing. Includes database integration with Supabase, Redis caching, comprehensive security measures, and auto-generated API documentation.",
      techStack: ["FastAPI", "React", "React Router", "Auth0", "Razorpay", "Supabase", "Redis", "TypeScript", "Tailwind CSS"],
      features: [
        "Auth0 Authentication with JWT verification and user management",
        "Razorpay Payments with subscription management and webhook handling",
        "Database Integration with Supabase and Redis caching",
        "Security features including rate limiting, CORS, and input validation",
        "Auto-generated Swagger/OpenAPI API documentation",
        "Modern React frontend with TypeScript and hooks",
        "Client-side routing with protected routes",
        "Responsive UI components with Tailwind CSS",
        "State management with React Context and custom hooks"
      ],
      demoUrl: null,
      codeUrl: "https://github.com/backend-bits/auth0-razorpay-fastapi-react-router",
      deployment: {
        headline: "Deploy backend on Vercel/Railway/Render, frontend on Vercel/Netlify",
        providers: ["Vercel", "Railway", "Render", "Netlify"],
        env: ["AUTH0_DOMAIN", "AUTH0_CLIENT_ID", "AUTH0_CLIENT_SECRET", "RAZORPAY_KEY_ID", "RAZORPAY_KEY_SECRET", "SUPABASE_URL", "REDIS_URL"],
        notes: [
          "Requires Auth0 and Razorpay accounts for authentication and payments",
          "Supabase for database and Redis for caching are optional but recommended",
          "Includes detailed setup guides for all integrations"
        ]
      },
      useCases: [
        {
          name: "SAAS Subscription Platform",
          description: "Build subscription-based applications with secure payments and user management."
        }
      ]
    }
  ];
