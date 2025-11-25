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
          "Clone the repository: git clone https://github.com/kousthubha-sky/AI-resume-analyzer",
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
      demoUrl: "https://gitrepo-analyzer-bhatiyani.vercel.app",
      codeUrl: "https://github.com/kousthubha-sky/gitrepo-analyzer",
      deployment: {
        headline: "Deploy frontend on Vercel, backend on Render",
        providers: ["Vercel", "Render", "Supabase"],
        env: ["DATABASE_URL", "SUPABASE_URL", "SUPABASE_KEY", "GITHUB_TOKEN"],
        notes: [
          "Clone the repository: git clone https://github.com/kousthubha-sky/gitrepo-analyzer",
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
       },
       {
       slug: "next-supabase-shadcn-auth",
       name: "Next.js Supabase Shadcn Auth",
       status: "Production-ready",
       category: "auth",
       summary: "Modern authentication starter with Next.js 15, Supabase, and Shadcn UI for secure apps.",
       description: "Built with Next.js 15 App Router, Supabase for authentication, Shadcn UI for beautiful components, session management via middleware, responsive design, and ready-to-use auth components including login, signup, reset password, and update password.",
       techStack: ["Next.js 15", "Supabase", "Shadcn UI", "Tailwind CSS", "TypeScript"],
       features: [
         "Supabase Authentication with email, password & OAuth providers",
         "Next.js 15 App Router + Turbopack",
         "Beautiful UI with Shadcn components (Radix + Tailwind)",
         "Session management via Supabase middleware",
         "Responsive design out of the box",
         "Ready-to-use auth components: Login, Signup, Reset, Update Password"
       ],
       demoUrl: null,
       codeUrl: "https://github.com/guillaumeduhan/next-supabase-shadcn-auth",
       deployment: {
         headline: "Deploy easily to Vercel, Netlify, or any Node.js host",
         providers: ["Vercel", "Netlify", "Render"],
         env: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"],
         notes: [
           "Requires Supabase project setup",
           "Includes environment configuration guide"
         ]
       },
       useCases: [
         {
           name: "Secure Web Application",
           description: "Build any web app with production-ready authentication using Supabase and modern UI components."
         }
       ]
     },
     {
       slug: "clerk-supabase",
       name: "Clerk + Supabase Todo App",
       status: "Production-ready",
       category: "auth",
       summary: "Demo todo app with Next.js, Supabase database, and Clerk for multifactor authentication.",
       description: "Full-stack todo application demonstrating Clerk's multifactor authentication integrated with Supabase database. Features secure user authentication, todo management, and real-time data synchronization.",
       techStack: ["Next.js", "Supabase", "Clerk", "Tailwind CSS", "TypeScript"],
       features: [
         "Clerk multifactor authentication",
         "Supabase database integration",
         "Todo CRUD operations",
         "Real-time data synchronization",
         "Secure user sessions",
         "Responsive UI with Tailwind CSS"
       ],
       demoUrl: "https://supabase.clerk.app",
       codeUrl: "https://github.com/clerk/clerk-supabase",
       deployment: {
         headline: "Deploy to Vercel, Netlify, or any Node.js platform",
         providers: ["Vercel", "Netlify", "Railway"],
         env: ["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", "CLERK_SECRET_KEY", "SUPABASE_URL", "SUPABASE_ANON_KEY"],
         notes: [
           "Requires Clerk and Supabase accounts",
           "Includes setup guide for both services"
         ]
       },
       useCases: [
         {
           name: "Task Management App",
           description: "Build secure task management applications with multifactor authentication and real-time collaboration."
         }
       ]
     },
     {
       slug: "clerk-nextjs-pages-router",
       name: "Clerk Next.js Pages Router Demo",
       status: "Production-ready",
       category: "auth",
       summary: "Official Next.js demo with Clerk authentication using the pages directory.",
       description: "Comprehensive demonstration of Clerk's authentication features in Next.js Pages Router. Includes sign-in/sign-up flows, protected pages, customized components, user data hooks, and organization management for multi-tenant applications.",
       techStack: ["Next.js", "Clerk", "Tailwind CSS", "TypeScript"],
       features: [
         "Fully functional auth flow with sign-in, sign-up, and protected pages",
         "Customized Clerk components with Tailwind CSS",
         "Hooks for accessing user data and authentication state",
         "Organizations for multi-tenant applications",
         "Responsive design and modern UI",
         "Easy integration into existing Next.js apps"
       ],
       demoUrl: "https://clerk-nextjs-demo-pages-router.clerkpreview.com",
       codeUrl: "https://github.com/clerk/clerk-nextjs-demo-pages-router",
       deployment: {
         headline: "Deploy to Vercel with one click",
         providers: ["Vercel", "Netlify", "Railway"],
         env: ["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", "CLERK_SECRET_KEY"],
         notes: [
           "Requires Clerk account setup",
           "One-click Vercel deployment available"
         ]
       },
        useCases: [
          {
            name: "Authentication Starter",
            description: "Quickly add secure authentication to any Next.js application with pre-built components and flows."
          }
         ]
       },
       {
         slug: "nextjs-postgres-auth-starter",
         name: "Next.js PostgreSQL Auth Starter",
         status: "Production-ready",
         category: "auth",
         summary:
           "Next.js starter template with PostgreSQL, Drizzle ORM, NextAuth.js, and Tailwind CSS for modern authentication.",
         description:
           "A comprehensive Next.js starter template featuring PostgreSQL database, Drizzle ORM for type-safe queries, NextAuth.js for authentication, and Tailwind CSS for styling. Includes user management, session handling, and modern development practices.",
         techStack: ["Next.js", "PostgreSQL", "Drizzle ORM", "NextAuth.js", "Tailwind CSS", "TypeScript"],
         features: [
           "NextAuth.js authentication with multiple providers",
           "PostgreSQL database with Drizzle ORM",
           "Type-safe database queries",
           "Session management and user profiles",
           "Responsive UI with Tailwind CSS",
           "TypeScript for type safety",
           "Modern Next.js App Router",
           "Environment configuration"
         ],
         demoUrl: null,
         codeUrl: "https://github.com/vercel/nextjs-postgres-auth-starter",
         deployment: {
           headline: "Deploy to Vercel, Railway, or any Node.js platform",
           providers: ["Vercel", "Railway", "Render"],
           env: ["DATABASE_URL", "NEXTAUTH_SECRET", "NEXTAUTH_URL"],
           notes: [
             "Requires PostgreSQL database",
             "Configure NextAuth providers as needed",
             "Includes setup documentation"
           ]
         },
         useCases: [
           {
             name: "Full-Stack Auth Application",
             description: "Build modern web applications with robust authentication and database integration."
           }
         ]
       },
       {
         slug: "clerk-nextjs-app-router-starter",
         name: "Clerk Next.js App Router Starter",
         status: "Production-ready",
         category: "auth",
         summary:
           "Modern authentication starter template built for Next.js App Router with Clerk's comprehensive auth solution.",
         description:
           "A production-ready Next.js starter template powered by Clerk for authentication and user management. Features App Router support, modern UI components, and seamless integration with Clerk's authentication system.",
         techStack: ["Next.js", "Clerk", "TypeScript", "Tailwind CSS"],
         features: [
           "Clerk authentication with App Router",
           "User management and profiles",
           "Protected routes and middleware",
           "Modern UI components",
           "TypeScript support",
           "Responsive design",
           "Social login providers",
           "Organization management"
         ],
          demoUrl: "https://nextjs-auth-starter-template-kit.vercel.app",
          codeUrl: "https://github.com/clerk/nextjs-auth-starter-template",
         deployment: {
           headline: "Deploy to Vercel, Netlify, or any Node.js host",
           providers: ["Vercel", "Netlify", "Railway"],
           env: ["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", "CLERK_SECRET_KEY"],
           notes: [
             "Requires Clerk account setup",
             "Configure authentication providers",
             "Includes comprehensive documentation"
           ]
         },
         useCases: [
           {
             name: "Modern Web App Authentication",
             description: "Add enterprise-grade authentication to Next.js applications with minimal setup."
           }
         ]
       },
       {
         slug: "cookiecutter-flask",
         name: "Cookiecutter Flask",
         status: "Production-ready",
         category: "auth",
         summary:
           "A Flask template with Bootstrap, webpack bundling, starter templates, and user authentication.",
         description:
           "A comprehensive Flask cookiecutter template featuring Bootstrap UI, webpack asset bundling, user authentication system, and modern development practices. Perfect for building web applications with Python backend.",
         techStack: ["Flask", "Python", "Bootstrap", "webpack", "PostgreSQL"],
         features: [
           "Flask web framework with authentication",
           "Bootstrap responsive UI",
           "webpack asset bundling and minification",
           "User registration and login system",
           "Database integration ready",
           "Modern Python development practices",
           "Starter templates and structure",
           "Development and production configurations"
         ],
         demoUrl: null,
         codeUrl: "https://github.com/cookiecutter-flask/cookiecutter-flask",
         deployment: {
           headline: "Deploy to Heroku, Railway, or any Python host",
           providers: ["Heroku", "Railway", "Render"],
           env: ["SECRET_KEY", "DATABASE_URL", "FLASK_ENV"],
           notes: [
             "Requires Python environment",
             "PostgreSQL recommended for production",
             "Includes Docker configuration"
           ]
         },
         useCases: [
           {
             name: "Python Web Application",
             description: "Build scalable web applications with Flask and modern authentication."
           }
         ]
       },
       {
         slug: "nestjs-prisma-starter",
         name: "NestJS Prisma Starter",
         status: "Production-ready",
         category: "auth",
         summary:
           "NestJS starter with GraphQL, Prisma Client, Passport-JWT authentication, Swagger API, and Docker.",
         description:
           "A comprehensive NestJS starter template featuring GraphQL API, Prisma ORM, JWT authentication with Passport, automatic Swagger documentation, and Docker support. Built for scalable backend applications.",
         techStack: ["NestJS", "GraphQL", "Prisma", "PostgreSQL", "Passport-JWT", "TypeScript"],
         features: [
           "GraphQL API with code-first approach",
           "Prisma ORM with PostgreSQL",
           "JWT authentication with Passport",
           "Automatic Swagger/OpenAPI documentation",
           "TypeScript for type safety",
           "Docker containerization",
           "Repository pattern implementation",
           "Testing setup with Jest"
         ],
         demoUrl: null,
         codeUrl: "https://github.com/notiz-dev/nestjs-prisma-starter",
         deployment: {
           headline: "Deploy to Railway, Render, or any Node.js platform",
           providers: ["Railway", "Render", "Vercel"],
           env: ["DATABASE_URL", "JWT_SECRET", "NODE_ENV"],
           notes: [
             "Requires PostgreSQL database",
             "GraphQL playground available in development",
             "Includes comprehensive API documentation"
           ]
         },
         useCases: [
           {
             name: "GraphQL Backend API",
             description: "Build modern APIs with GraphQL, authentication, and database integration."
           }
         ]
       },
       {
         slug: "django-allauth-ui",
         name: "Django AllAuth UI",
         status: "Production-ready",
         category: "auth",
         summary:
           "Beautiful, modern templates for Django AllAuth authentication system.",
         description:
           "A collection of beautiful, modern HTML templates for Django AllAuth, providing a polished user experience for authentication flows including login, signup, password reset, and social authentication.",
         techStack: ["Django", "HTML", "CSS", "JavaScript", "django-allauth"],
         features: [
           "Beautiful, modern UI templates",
           "Complete django-allauth integration",
           "Social authentication support",
           "Responsive design",
           "Email verification templates",
           "Password reset flows",
           "User profile management",
           "Customizable styling"
         ],
         demoUrl: null,
         codeUrl: "https://github.com/danihodovic/django-allauth-ui",
         deployment: {
           headline: "Deploy with any Django hosting service",
           providers: ["Heroku", "Railway", "Render", "DigitalOcean"],
           env: ["SECRET_KEY", "DATABASE_URL", "DJANGO_SETTINGS_MODULE"],
           notes: [
             "Requires Django project with django-allauth",
             "Copy templates to your project",
             "Customize styling as needed"
           ]
         },
         useCases: [
           {
             name: "Django Authentication UI",
             description: "Enhance Django applications with beautiful, modern authentication interfaces."
           }
         ]
       },
       {
         slug: "react-resume-template",
        name: "React Resume Template",
        status: "Production-ready",
        category: "Portfolio",
        summary: "A personal resume website template built with React.js, Typescript, Next.js, and styled with Tailwind css",
        description: "React based template for software developer-focused resume websites. Features full typescript support, Next.js for SSR and optimization, Tailwind CSS styling, customizable data file, and modern site sections.",
        techStack: ["React.js", "TypeScript", "Next.js", "Tailwind CSS"],
        features: [
          "Completely rebuilt with React and full typescript support",
          "Built on Next.js for SSR, image optimization, API routes, and deployment",
          "Styled with TailwindCss",
          "Re-organized data population file for customizing site",
          "Significant improvement/modernization of all site sections",
          "Mobile-optimized and server-side rendered"
        ],
        demoUrl: "https://reactresume.com",
        codeUrl: "https://github.com/tbakerx/react-resume-template",
        deployment: {
          headline: "Deploy to Vercel for easy hosting",
          providers: ["Vercel"],
          env: [],
          notes: ["Contact form requires email provider setup like Sendgrid"]
        },
        useCases: [
          {
            name: "Developer Resume Site",
            description: "Create a professional online resume to showcase skills and experience."
          }
        ]
      },
      {
        slug: "soumyajit-portfolio",
        name: "Soumyajit Portfolio",
        status: "Production-ready",
        category: "Portfolio",
        summary: "Self-coded personal website built with React.js, featuring modern design and easy customization.",
        description: "A personal portfolio website showcasing React.js development skills with a clean, modern interface. Includes sections for projects, skills, and contact information, built with create-react-app for simplicity.",
        techStack: ["React.js", "JavaScript", "CSS", "HTML"],
        features: [
          "Modern React.js architecture",
          "Responsive design for all devices",
          "Easy-to-customize components",
          "Project showcase sections",
          "Contact and social media integration"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/soumyajit4419/Portfolio",
        deployment: {
          headline: "Deploy easily on Vercel, Netlify, or GitHub Pages",
          providers: ["Vercel", "Netlify", "GitHub Pages"],
          env: [],
          notes: [
            "Clone the repository: git clone https://github.com/soumyajit4419/Portfolio",
            "Built with Create React App",
            "Static deployment ready"
          ]
        },
        useCases: [
          {
            name: "Developer Portfolio",
            description: "Perfect for developers to showcase their projects and skills with a clean, professional layout."
          }
        ]
      },
      {
        slug: "simplefolio",
        name: "Simplefolio",
        status: "Production-ready",
        category: "Portfolio",
        summary: "Minimal portfolio template for developers, built with HTML, CSS, and JavaScript.",
        description: "A lightweight, minimal portfolio template designed specifically for developers. Features a clean design, responsive layout, and easy customization for showcasing projects and skills.",
        techStack: ["HTML", "CSS", "SCSS", "JavaScript"],
        features: [
          "Minimal and clean design",
          "Fully responsive layout",
          "Easy customization",
          "Project showcase grid",
          "Contact form integration",
          "Social media links"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/cobiwave/simplefolio",
        deployment: {
          headline: "Deploy on any static hosting service",
          providers: ["GitHub Pages", "Netlify", "Vercel"],
          env: [],
          notes: [
            "Clone the repository: git clone https://github.com/cobiwave/simplefolio",
            "No build process required",
            "Pure HTML/CSS/JS template"
          ]
        },
        useCases: [
          {
            name: "Minimal Developer Portfolio",
            description: "Ideal for developers seeking a simple, fast-loading portfolio without complex frameworks."
          }
        ]
      },
      {
        slug: "adrianhajdin-portfolio",
        name: "Adrian Hajdin Portfolio",
        status: "Production-ready",
        category: "Portfolio",
        summary: "Modern and minimal portfolio built with Next.js, featuring Aceternity UI components.",
        description: "A sophisticated portfolio website showcasing modern web development with Next.js and Aceternity UI. Includes smooth animations, responsive design, and professional project presentations.",
        techStack: ["Next.js", "TypeScript", "Aceternity UI"],
        features: [
          "Next.js framework for performance",
          "Modern UI with Aceternity components",
          "Responsive design",
          "Smooth animations and transitions",
          "Professional project showcase",
          "TypeScript for type safety"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/adrianhajdin/portfolio",
        deployment: {
          headline: "Deploy on Vercel or Netlify",
          providers: ["Vercel", "Netlify"],
          env: [],
          notes: [
            "Clone the repository: git clone https://github.com/adrianhajdin/portfolio",
            "Next.js optimized deployment",
            "Static generation possible"
          ]
        },
        useCases: [
          {
            name: "Modern Developer Portfolio",
            description: "Advanced portfolio template for developers wanting cutting-edge design and performance."
          }
        ]
      },
      {
        slug: "vcard-personal-portfolio",
        name: "vCard Personal Portfolio",
        status: "Production-ready",
        category: "Portfolio",
        summary: "Fully responsive personal portfolio website template, optimized for all devices.",
        description: "A comprehensive portfolio template with multiple sections including about, services, portfolio showcase, testimonials, and contact. Built with modern web standards for optimal performance across all devices.",
        techStack: ["HTML", "CSS", "JavaScript"],
        features: [
          "Fully responsive design",
          "Multiple portfolio sections",
          "Service offerings display",
          "Client testimonials",
          "Contact form",
          "Social media integration",
          "Modern animations"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/codewithsadee/vcard-personal-portfolio",
        deployment: {
          headline: "Deploy on any web hosting service",
          providers: ["GitHub Pages", "Netlify", "Vercel", "Hostinger"],
          env: [],
          notes: [
            "Clone the repository: git clone https://github.com/codewithsadee/vcard-personal-portfolio",
            "No framework dependencies",
            "Ready-to-use HTML template"
          ]
        },
        useCases: [
          {
            name: "Comprehensive Personal Portfolio",
            description: "Complete portfolio solution for professionals needing multiple sections to showcase their work and services."
          }
         ]
       },
      {
        slug: "chess-game-app",
        name: "Chess Game App",
        status: "Production-ready",
        category: "personal",
        summary: "A two-player chess game application built with JavaScript for practicing game logic and UI development.",
        description: "An interactive chess game that allows two players to compete on the same device. Features move validation, check/checkmate detection, and a clean game board interface. Perfect for learning game algorithms and DOM manipulation.",
        techStack: ["JavaScript", "HTML", "CSS"],
        features: [
          "Two-player local gameplay",
          "Move validation and game rules",
          "Check and checkmate detection",
          "Clean, responsive game board",
          "Game state management",
          "Move history tracking"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/the-cool-coders/project-ideas-and-resources",
        deployment: {
          headline: "Deploy as static website",
          providers: ["GitHub Pages", "Netlify", "Vercel"],
          env: [],
          notes: [
            "Clone the repository: git clone https://github.com/the-cool-coders/project-ideas-and-resources",
            "No backend required",
            "Pure client-side implementation"
          ]
        },
        useCases: [
          {
            name: "Game Development Practice",
            description: "Build algorithmic thinking and UI skills through game development."
          }
        ]
      },
      {
        slug: "pdf-to-audio-book",
        name: "PDF to Audio Book Converter",
        status: "Production-ready",
        category: "personal",
        summary: "Convert PDF documents to audio books using Python text-to-speech technology.",
        description: "A Python application that extracts text from PDF files and converts it to audio using text-to-speech engines. Features PDF parsing, audio generation, and playback controls for an accessible reading experience.",
        techStack: ["Python", "PyPDF2", "pyttsx3", "tkinter"],
        features: [
          "PDF text extraction",
          "Text-to-speech conversion",
          "Audio playback controls",
          "Progress tracking",
          "Multiple voice options",
          "Save audio files"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/the-cool-coders/project-ideas-and-resources",
        deployment: {
          headline: "Run locally or package as executable",
          providers: ["Local Python environment"],
          env: [],
          notes: [
            "Clone the repository: git clone https://github.com/the-cool-coders/project-ideas-and-resources",
            "Requires Python environment",
            "Can be packaged with PyInstaller"
          ]
        },
        useCases: [
          {
            name: "Accessibility Tool",
            description: "Help visually impaired users access written content through audio."
          }
        ]
      },
      {
        slug: "tmdb-movie-app",
        name: "TMDB Movie Database App",
        status: "Production-ready",
        category: "personal",
        summary: "An interactive movie database application using React and The Movie Database API.",
        description: "A React application that fetches and displays movie information from TMDB API. Features search functionality, movie details, ratings, and responsive design for browsing movies and TV shows.",
        techStack: ["React", "JavaScript", "TMDB API", "CSS"],
        features: [
          "Movie search and discovery",
          "Detailed movie information",
          "Popular and trending movies",
          "Responsive grid layout",
          "Movie ratings and reviews",
          "Genre filtering"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/the-cool-coders/project-ideas-and-resources",
        deployment: {
          headline: "Deploy to static hosting",
          providers: ["Vercel", "Netlify", "GitHub Pages"],
          env: ["TMDB_API_KEY"],
          notes: [
            "Clone the repository: git clone https://github.com/the-cool-coders/project-ideas-and-resources",
            "Requires TMDB API key",
            "Static React build"
          ]
        },
        useCases: [
          {
            name: "Entertainment App",
            description: "Create a personalized movie discovery and tracking platform."
          }
        ]
      },
      {
        slug: "weather-app-react",
        name: "Weather App with React",
        status: "Production-ready",
        category: "personal",
        summary: "A weather application built with React that displays current weather and forecasts using OpenWeatherMap API.",
        description: "A React-based weather app that provides current weather conditions, 5-day forecasts, and location-based weather data. Features geolocation support, weather icons, and responsive design for mobile and desktop.",
        techStack: ["React", "JavaScript", "OpenWeatherMap API", "CSS"],
        features: [
          "Current weather display",
          "5-day weather forecast",
          "Geolocation support",
          "Weather icons and animations",
          "Temperature unit conversion",
          "Responsive design"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/the-cool-coders/project-ideas-and-resources",
        deployment: {
          headline: "Deploy to static hosting platforms",
          providers: ["Vercel", "Netlify"],
          env: ["OPENWEATHER_API_KEY"],
          notes: [
            "Clone the repository: git clone https://github.com/the-cool-coders/project-ideas-and-resources",
            "Requires OpenWeatherMap API key",
            "Geolocation permissions needed"
          ]
        },
        useCases: [
          {
            name: "Weather Information Service",
            description: "Provide users with accurate weather information and forecasts."
          }
        ]
      },

      {
        slug: "relivator-nextjs-template",
        name: "Relivator - Next.js Ecommerce Template",
        status: "Production-ready",
        category: "payment",
        summary:
          "Modern ecommerce template with Polar payments, Better Auth, and comprehensive features for building online stores.",
        description:
          "A full-featured ecommerce starter built with Next.js 15, React 19, and modern technologies. Features Polar payment integration, Better Auth for authentication, Drizzle ORM with PostgreSQL, Shadcn/UI components, and comprehensive testing setup.",
        techStack: ["Next.js 15", "React 19", "Polar", "Better Auth", "Drizzle ORM", "PostgreSQL", "Shadcn/UI", "Tailwind CSS"],
        features: [
          "Polar payment processing with subscription management",
          "Better Auth for secure authentication",
          "Drizzle ORM with PostgreSQL database",
          "Shadcn/UI components with Radix primitives",
          "Comprehensive testing with Vitest and Playwright",
          "Dark mode support",
          "Internationalization ready",
          "Uploadthing for file storage",
          "Analytics integration"
        ],
        demoUrl: "https://relivator.com",
        codeUrl: "https://github.com/blefnk/relivator-nextjs-template",
        deployment: {
          headline: "Deploy on Vercel, Railway, or any Node.js platform",
          providers: ["Vercel", "Railway", "Render"],
          env: ["POLAR_ACCESS_TOKEN", "DATABASE_URL", "NEXTAUTH_SECRET"],
          notes: [
            "Requires Polar account for payments",
            "PostgreSQL database (Neon recommended)",
            "Includes comprehensive setup documentation"
          ]
        },
        useCases: [
          {
            name: "Ecommerce Store Development",
            description: "Build modern online stores with subscription payments and user management."
          }
        ]
      },
      {
        slug: "saas-kit-prisma",
        name: "SaaS Kit Prisma - Next.js + Stripe",
        status: "Production-ready",
        category: "payment",
        summary:
          "Open-source SaaS starter with Next.js, Prisma, Stripe payments, and OpenAI integration for building subscription apps.",
        description:
          "A comprehensive SaaS boilerplate featuring Next.js, Prisma ORM, Stripe payment processing, OpenAI integration, and modern authentication. Includes user management, subscription handling, and a clean, responsive UI.",
        techStack: ["Next.js", "Prisma", "Stripe", "OpenAI", "TypeScript", "Tailwind CSS"],
        features: [
          "Stripe subscription management and payment processing",
          "Prisma ORM with database migrations",
          "OpenAI API integration for AI features",
          "Modern authentication system",
          "Responsive UI with Tailwind CSS",
          "TypeScript for type safety",
          "API routes for backend functionality",
          "Environment configuration management"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/Saas-Starter-Kit/Saas-Kit-prisma",
        deployment: {
          headline: "Deploy on Vercel, Railway, or any Node.js host",
          providers: ["Vercel", "Railway", "Render"],
          env: ["DATABASE_URL", "STRIPE_SECRET_KEY", "OPENAI_API_KEY"],
          notes: [
            "Requires Stripe and OpenAI accounts",
            "PostgreSQL database recommended",
            "Includes setup guides and documentation"
          ]
        },
        useCases: [
          {
            name: "AI-Powered SaaS Applications",
            description: "Build subscription-based apps with AI features and payment processing."
          }
        ]
      },
      {
        slug: "stripe-fastapi-template",
        name: "Stripe FastAPI Template",
        status: "Production-ready",
        category: "payment",
        summary:
          "FastAPI backend template with Stripe payment integration for building scalable payment APIs.",
        description:
          "A Python FastAPI template specifically designed for integrating Stripe payments into your applications. Features comprehensive payment processing, webhook handling, and modern Python development practices.",
        techStack: ["FastAPI", "Python", "Stripe", "Pydantic", "Uvicorn"],
        features: [
          "Stripe payment processing and webhooks",
          "FastAPI with automatic OpenAPI documentation",
          "Pydantic models for type validation",
          "SEPA payment support",
          "Modern Python async/await patterns",
          "Comprehensive error handling",
          "Environment-based configuration"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/yezz123/stripe-template",
        deployment: {
          headline: "Deploy on Railway, Render, or any Python host",
          providers: ["Railway", "Render", "Heroku"],
          env: ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET"],
          notes: [
            "Requires Stripe account",
            "Python 3.8+ required",
            "Includes Docker configuration"
          ]
        },
        useCases: [
          {
            name: "Payment API Backend",
            description: "Build robust payment processing backends for web and mobile applications."
          }
        ]
      },
      {
        slug: "nexpay-nextjs",
        name: "NexPay - Next.js Multi-Payment Gateway",
        status: "Production-ready",
        category: "payment",
        summary:
          "Next.js application demonstrating integration with multiple payment gateways including Razorpay, PayPal, and PhonePe.",
        description:
          "A comprehensive Next.js template showcasing payment gateway integrations with Razorpay, PayPal, PhonePe, and Cashfree. Features modern UI, TypeScript support, and best practices for handling multiple payment providers.",
        techStack: ["Next.js", "TypeScript", "Razorpay", "PayPal", "PhonePe", "Cashfree"],
        features: [
          "Multiple payment gateway integrations",
          "Razorpay payment processing",
          "PayPal and PhonePe support",
          "Cashfree payment gateway",
          "TypeScript for type safety",
          "Modern responsive UI",
          "Payment status tracking",
          "Webhook handling"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/Adnan-The-Coder/nexpay",
        deployment: {
          headline: "Deploy on Vercel, Netlify, or any Node.js platform",
          providers: ["Vercel", "Netlify", "Railway"],
          env: ["RAZORPAY_KEY_ID", "PAYPAL_CLIENT_ID", "PHONEPE_MERCHANT_ID"],
          notes: [
            "Requires accounts with multiple payment providers",
            "Configure webhook endpoints for each gateway",
            "Includes setup documentation"
          ]
        },
        useCases: [
          {
            name: "Multi-Gateway Payment Solutions",
            description: "Build applications supporting multiple payment methods for global users."
          }
        ]
      },
      {
        slug: "langchain",
        name: "LangChain",
        status: "Production-ready",
        category: "AI projects",
        summary: "The platform for reliable AI agents and LLM applications.",
        description: "LangChain is a framework for developing applications powered by language models. It provides a standard interface for chains, agents, and retrieval strategies, enabling developers to build sophisticated AI applications with ease.",
        techStack: ["Python", "TypeScript", "LangChain", "LLMs", "Vector Databases"],
        features: [
          "Standard interface for chains and agents",
          "Integration with major LLM providers",
          "Vector stores and retrieval systems",
          "Memory management for conversational AI",
          "Tool integration and function calling",
          "Production-ready deployment patterns"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/langchain-ai/langchain",
        deployment: {
          headline: "Deploy on any platform supporting Python/Node.js",
          providers: ["Vercel", "Railway", "AWS", "GCP"],
          env: ["OPENAI_API_KEY", "LANGCHAIN_API_KEY"],
          notes: [
            "Supports multiple LLM providers",
            "Built-in monitoring and tracing",
            "Scalable for production use"
          ]
        },
        useCases: [
          {
            name: "Conversational AI Applications",
            description: "Build chatbots and virtual assistants with memory and tool integration."
          },
          {
            name: "Document Analysis Systems",
            description: "Create RAG applications for document Q&A and analysis."
          }
        ]
      },
      {
        slug: "crewai",
        name: "CrewAI",
        status: "Production-ready",
        category: "AI projects",
        summary: "Framework for orchestrating role-playing, autonomous AI agents.",
        description: "CrewAI empowers agents to work together seamlessly, tackling complex tasks through collaborative intelligence. It provides a framework for creating multi-agent systems where agents can delegate tasks, share knowledge, and work towards common goals.",
        techStack: ["Python", "CrewAI", "LLMs", "Agent Orchestration"],
        features: [
          "Role-based agent creation",
          "Task delegation and collaboration",
          "Memory sharing between agents",
          "Tool integration and execution",
          "Process flow management",
          "Scalable multi-agent systems"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/crewAIInc/crewAI",
        deployment: {
          headline: "Deploy on Python-compatible platforms",
          providers: ["Railway", "Render", "AWS Lambda"],
          env: ["OPENAI_API_KEY", "CREWAI_API_KEY"],
          notes: [
            "Requires Python 3.8+",
            "Supports multiple LLM providers",
            "Built-in agent monitoring"
          ]
        },
        useCases: [
          {
            name: "Collaborative AI Workflows",
            description: "Build teams of AI agents that work together on complex tasks."
          },
          {
            name: "Automated Business Processes",
            description: "Create AI-powered automation for research, analysis, and decision-making."
          }
        ]
      },
      {
        slug: "autogen",
        name: "AutoGen",
        status: "Production-ready",
        category: "AI projects",
        summary: "Microsoft's framework for building multi-agent AI systems.",
        description: "AutoGen is a framework that enables the development of Large Language Model (LLM) applications using multiple agents that can converse with each other to solve tasks. It simplifies the orchestration, automation and optimization of a complex LLM workflow.",
        techStack: ["Python", "AutoGen", "LLMs", "Multi-Agent Systems"],
        features: [
          "Conversational multi-agent systems",
          "Automatic agent coordination",
          "Tool integration and function calling",
          "Human-in-the-loop capabilities",
          "Customizable agent behaviors",
          "Built-in optimization strategies"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/microsoft/autogen",
        deployment: {
          headline: "Deploy on Python-compatible cloud platforms",
          providers: ["Azure", "AWS", "GCP"],
          env: ["OPENAI_API_KEY", "AZURE_OPENAI_KEY"],
          notes: [
            "Optimized for Azure OpenAI",
            "Supports multiple LLM providers",
            "Built-in conversation management"
          ]
        },
        useCases: [
          {
            name: "Multi-Agent Conversations",
            description: "Build systems where multiple AI agents collaborate on tasks."
          },
          {
            name: "Automated Problem Solving",
            description: "Create AI systems that can break down and solve complex problems."
          }
        ]
      },
      {
        slug: "browser-use",
        name: "Browser Use",
        status: "Production-ready",
        category: "AI projects",
        summary: "Make websites accessible for AI agents with browser automation.",
        description: "Browser Use enables AI agents to interact with websites through natural language commands. It provides a simple API for controlling web browsers, allowing agents to navigate, click, type, and extract information from web pages.",
        techStack: ["Python", "Playwright", "LLMs", "Browser Automation"],
        features: [
          "Natural language browser control",
          "Screenshot and element detection",
          "Form filling and submission",
          "Data extraction from web pages",
          "Multi-tab and window management",
          "Headless browser support"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/browser-use/browser-use",
        deployment: {
          headline: "Deploy on platforms with browser support",
          providers: ["Railway", "Render", "AWS EC2"],
          env: ["OPENAI_API_KEY", "BROWSER_USE_API_KEY"],
          notes: [
            "Requires browser dependencies",
            "Supports headless mode",
            "Optimized for agent workflows"
          ]
        },
        useCases: [
          {
            name: "Web Automation Agents",
            description: "Build AI agents that can perform web-based tasks autonomously."
          },
          {
            name: "Data Collection Systems",
            description: "Create automated web scraping and data extraction agents."
          }
        ]
      },
      {
        slug: "mem0",
        name: "Mem0",
        status: "Production-ready",
        category: "AI projects",
        summary: "Universal memory layer for AI agents with long-term memory.",
        description: "Mem0 provides a universal memory layer that enables AI agents to remember, learn, and adapt over time. It offers persistent memory capabilities that go beyond single conversation contexts, allowing agents to build long-term relationships and learn from interactions.",
        techStack: ["Python", "Memory Systems", "Vector Databases", "LLMs"],
        features: [
          "Long-term memory persistence",
          "Context-aware memory retrieval",
          "Multi-user memory management",
          "Memory optimization and pruning",
          "Integration with major LLMs",
          "Custom memory adapters"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/mem0ai/mem0",
        deployment: {
          headline: "Deploy on Python-compatible platforms",
          providers: ["Railway", "Render", "AWS"],
          env: ["OPENAI_API_KEY", "MEM0_API_KEY"],
          notes: [
            "Supports multiple vector stores",
            "Built-in memory optimization",
            "Scalable for multi-user applications"
          ]
        },
        useCases: [
          {
            name: "Personal AI Assistants",
            description: "Build AI assistants that remember user preferences and history."
          },
          {
            name: "Adaptive Learning Systems",
            description: "Create AI systems that learn and improve over time."
          }
        ]
      },
      {
        slug: "letta",
        name: "Letta",
        status: "Production-ready",
        category: "AI projects",
        summary: "Platform for building stateful AI agents with advanced memory.",
        description: "Letta is a platform for creating AI agents that maintain state and memory across interactions. It provides a framework for building agents that can learn, remember, and self-improve over time, with advanced memory management and state persistence.",
        techStack: ["Python", "State Management", "Memory Systems", "LLMs"],
        features: [
          "Stateful agent conversations",
          "Advanced memory management",
          "Self-improving agents",
          "Multi-agent coordination",
          "Persistent agent state",
          "Custom memory architectures"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/letta-ai/letta",
        deployment: {
          headline: "Deploy on Python-compatible platforms",
          providers: ["Railway", "Render", "AWS"],
          env: ["OPENAI_API_KEY", "LETTA_API_KEY"],
          notes: [
            "Requires persistent storage",
            "Supports multiple LLM providers",
            "Built-in agent monitoring"
          ]
        },
        useCases: [
          {
            name: "Long-Term AI Interactions",
            description: "Build agents that maintain context across extended conversations."
          },
          {
            name: "Self-Learning AI Systems",
            description: "Create AI agents that improve through experience."
          }
        ]
      },
      {
        slug: "agno",
        name: "Agno",
        status: "Production-ready",
        category: "AI projects",
        summary: "Multi-agent framework built for speed, privacy, and scale.",
        description: "Agno is a multi-agent framework designed for building fast, private, and scalable AI agent systems. It provides a runtime and control plane for orchestrating multiple agents, with built-in support for various tools and integrations.",
        techStack: ["Python", "Multi-Agent Systems", "Tool Integration", "LLMs"],
        features: [
          "High-performance agent runtime",
          "Privacy-focused architecture",
          "Scalable agent orchestration",
          "Built-in tool integrations",
          "Custom agent development",
          "Real-time agent coordination"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/agno-agi/agno",
        deployment: {
          headline: "Deploy on high-performance platforms",
          providers: ["Railway", "AWS", "GCP"],
          env: ["OPENAI_API_KEY", "AGNO_API_KEY"],
          notes: [
            "Optimized for performance",
            "Supports distributed deployment",
            "Built-in monitoring and logging"
          ]
        },
        useCases: [
          {
            name: "High-Performance AI Systems",
            description: "Build fast and scalable multi-agent applications."
          },
          {
            name: "Privacy-First AI Solutions",
            description: "Create AI systems with strong privacy guarantees."
          }
        ]
      },
      {
        slug: "composio",
        name: "Composio",
        status: "Production-ready",
        category: "AI projects",
        summary: "Equips AI agents with 100+ integrations via function calling.",
        description: "Composio provides AI agents and LLMs with access to over 100 high-quality integrations through function calling. It enables agents to interact with external services, APIs, and tools seamlessly, expanding their capabilities significantly.",
        techStack: ["Python", "TypeScript", "API Integrations", "Function Calling"],
        features: [
          "100+ pre-built integrations",
          "Function calling for LLMs",
          "Seamless API interactions",
          "Custom integration development",
          "Multi-platform support",
          "Real-time data access"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/ComposioHQ/composio",
        deployment: {
          headline: "Deploy on platforms supporting integrations",
          providers: ["Vercel", "Railway", "AWS"],
          env: ["COMPOSIO_API_KEY", "OPENAI_API_KEY"],
          notes: [
            "Requires API keys for integrations",
            "Supports multiple LLM providers",
            "Built-in integration management"
          ]
        },
        useCases: [
          {
            name: "Integrated AI Assistants",
            description: "Build AI agents that can access and control external services."
          },
          {
            name: "Automated Workflow Systems",
            description: "Create agents that orchestrate multiple tools and services."
          }
        ]
      },
      {
        slug: "anything-llm",
        name: "AnythingLLM",
        status: "Production-ready",
        category: "AI projects",
        summary: "All-in-one AI application with RAG, agents, and MCP support.",
        description: "AnythingLLM is a full-stack application that brings together LLMs, vector databases, and RAG capabilities. It includes built-in AI agents, MCP compatibility, and supports multiple document types for creating comprehensive AI-powered applications.",
        techStack: ["JavaScript", "Node.js", "Vector Databases", "RAG", "MCP"],
        features: [
          "Built-in RAG pipeline",
          "AI agent creation",
          "MCP server support",
          "Multiple document formats",
          "Vector database integration",
          "Custom AI workflows"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/Mintplex-Labs/anything-llm",
        deployment: {
          headline: "Deploy on Node.js compatible platforms",
          providers: ["Railway", "Render", "AWS"],
          env: ["OPENAI_API_KEY", "ANYTHING_LLM_API_KEY"],
          notes: [
            "Requires vector database setup",
            "Supports multiple LLM providers",
            "Docker deployment available"
          ]
        },
        useCases: [
          {
            name: "Document Intelligence Systems",
            description: "Build AI systems for document analysis and Q&A."
          },
          {
            name: "Custom AI Assistants",
            description: "Create specialized AI assistants with custom knowledge bases."
          }
        ]
      },
      {
        slug: "daytona",
        name: "Daytona",
        status: "Production-ready",
        category: "AI projects",
        summary: "Secure infrastructure for running AI-generated code.",
        description: "Daytona provides secure and elastic infrastructure specifically designed for executing AI-generated code. It offers sandboxed environments where AI agents can safely run and test code, with built-in security measures and resource management.",
        techStack: ["TypeScript", "Docker", "Code Execution", "Sandboxed Environments"],
        features: [
          "Secure code execution",
          "Elastic resource scaling",
          "Multi-language support",
          "Isolated execution environments",
          "Real-time code evaluation",
          "Built-in security measures"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/daytonaio/daytona",
        deployment: {
          headline: "Deploy on container-compatible platforms",
          providers: ["AWS", "GCP", "Azure"],
          env: ["DAYTONA_API_KEY", "DOCKER_HOST"],
          notes: [
            "Requires Docker runtime",
            "Supports multiple programming languages",
            "Built-in resource limits"
          ]
        },
        useCases: [
          {
            name: "AI Code Generation Platforms",
            description: "Build platforms for safe execution of AI-generated code."
          },
          {
            name: "Automated Testing Environments",
            description: "Create secure testing environments for AI-generated applications."
          }
        ]
      },
      {
        slug: "deer-flow",
        name: "Deer Flow",
        status: "Production-ready",
        category: "AI projects",
        summary: "Community-driven deep research framework combining LLMs with tools.",
        description: "Deer Flow is a comprehensive framework for deep research that combines language models with various tools including web search, crawling, and code execution. It enables AI agents to perform thorough research and analysis tasks.",
        techStack: ["Python", "LLMs", "Web Search", "Code Execution", "Research Tools"],
        features: [
          "Multi-tool integration",
          "Web search and crawling",
          "Code execution capabilities",
          "Research workflow automation",
          "Data analysis tools",
          "Collaborative research features"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/bytedance/deer-flow",
        deployment: {
          headline: "Deploy on Python-compatible platforms",
          providers: ["Railway", "AWS", "GCP"],
          env: ["OPENAI_API_KEY", "DEER_FLOW_API_KEY"],
          notes: [
            "Requires multiple API integrations",
            "Supports distributed research tasks",
            "Built-in result aggregation"
          ]
        },
        useCases: [
          {
            name: "Automated Research Systems",
            description: "Build AI agents for comprehensive research and analysis."
          },
          {
            name: "Data Investigation Platforms",
            description: "Create systems for deep data analysis and investigation."
          }
        ]
      },
      {
        slug: "parlant",
        name: "Parlant",
        status: "Production-ready",
        category: "AI projects",
        summary: "LLM agents built for control and real-world deployment.",
        description: "Parlant provides a framework for building controllable LLM agents designed for real-world applications. It focuses on reliability, safety, and practical deployment, with features for agent alignment and controlled behavior.",
        techStack: ["Python", "LLM Control", "Agent Alignment", "Safety Measures"],
        features: [
          "Controllable agent behavior",
          "Safety and alignment features",
          "Real-world deployment ready",
          "Multi-agent coordination",
          "Custom safety constraints",
          "Production monitoring"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/emcie-co/parlant",
        deployment: {
          headline: "Deploy on enterprise-grade platforms",
          providers: ["AWS", "Azure", "GCP"],
          env: ["PARLANT_API_KEY", "OPENAI_API_KEY"],
          notes: [
            "Built for production reliability",
            "Includes safety monitoring",
            "Supports enterprise integrations"
          ]
        },
        useCases: [
          {
            name: "Safe AI Deployment",
            description: "Build AI agents with strong safety and control measures."
          },
          {
            name: "Enterprise AI Solutions",
            description: "Create reliable AI systems for business applications."
          }
        ]
      },
      {
        slug: "adk-python",
        name: "ADK Python",
        status: "Production-ready",
        category: "AI projects",
        summary: "Google's open-source toolkit for building sophisticated AI agents.",
        description: "ADK (Agent Development Kit) Python is Google's comprehensive toolkit for developing, evaluating, and deploying AI agents. It provides a code-first approach with flexibility and control for building complex multi-agent systems.",
        techStack: ["Python", "Multi-Agent Systems", "Google AI", "Agent Framework"],
        features: [
          "Code-first agent development",
          "Multi-agent orchestration",
          "Built-in evaluation tools",
          "Flexible agent architectures",
          "Production deployment support",
          "Integration with Google AI"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/google/adk-python",
        deployment: {
          headline: "Deploy on Google Cloud or compatible platforms",
          providers: ["Google Cloud", "AWS", "Azure"],
          env: ["GOOGLE_AI_API_KEY", "ADK_API_KEY"],
          notes: [
            "Optimized for Google AI services",
            "Supports multiple agent patterns",
            "Built-in performance monitoring"
          ]
        },
        useCases: [
          {
            name: "Complex AI Systems",
            description: "Build sophisticated multi-agent applications with Google AI."
          },
          {
            name: "Enterprise Agent Solutions",
            description: "Create scalable AI agent systems for large organizations."
          }
        ]
      },
      {
        slug: "agents-towards-production",
        name: "Agents Towards Production",
        status: "Production-ready",
        category: "AI projects",
        summary: "End-to-end tutorials for production-grade GenAI agents.",
        description: "This repository provides comprehensive tutorials and blueprints for building production-ready Generative AI agents. It covers every layer from development to deployment, with proven patterns and reusable components.",
        techStack: ["Python", "Jupyter", "LLMs", "Production Patterns", "MLOps"],
        features: [
          "End-to-end agent tutorials",
          "Production deployment patterns",
          "MLOps best practices",
          "Reusable agent blueprints",
          "Performance optimization",
          "Monitoring and logging"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/NirDiamant/agents-towards-production",
        deployment: {
          headline: "Deploy using provided production patterns",
          providers: ["AWS", "GCP", "Azure"],
          env: ["OPENAI_API_KEY", "MLFLOW_TRACKING_URI"],
          notes: [
            "Includes deployment templates",
            "Built-in monitoring setup",
            "Scalable architecture patterns"
          ]
        },
        useCases: [
          {
            name: "Production AI Development",
            description: "Learn to build and deploy production-ready AI agents."
          },
          {
            name: "MLOps for AI Agents",
            description: "Implement best practices for AI agent operations."
          }
        ]
      },
      {
        slug: "500-ai-agents-projects",
        name: "500 AI Agents Projects",
        status: "Production-ready",
        category: "AI projects",
        summary: "Curated collection of 500 AI agent use cases across industries.",
        description: "A comprehensive collection of AI agent projects showcasing practical applications across healthcare, finance, education, retail, and more. It provides links to open-source implementations and demonstrates how AI agents are transforming various sectors.",
        techStack: ["AI Agents", "Industry Applications", "Open Source", "Use Cases"],
        features: [
          "500+ agent use cases",
          "Industry-specific applications",
          "Open-source implementations",
          "Practical deployment examples",
          "Cross-sector transformation",
          "Implementation guides"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/ashishpatel26/500-AI-Agents-Projects",
        deployment: {
          headline: "Deploy using provided implementation guides",
          providers: ["Varies by project"],
          env: ["Varies by implementation"],
          notes: [
            "Multiple deployment options",
            "Industry-specific configurations",
            "Open-source implementations"
          ]
        },
        useCases: [
          {
            name: "Industry AI Solutions",
            description: "Find AI agent solutions for specific industry needs."
          },
          {
            name: "Implementation Inspiration",
            description: "Get ideas and examples for AI agent development."
          }
        ]
      },
      {
        slug: "langgraph",
        name: "LangGraph",
        status: "Production-ready",
        category: "AI projects",
        summary: "Build stateful, multi-actor applications with LLMs.",
        description: "LangGraph is a library for building stateful, multi-actor applications with LLMs. It extends LangChain to provide first-class support for agent networks, enabling complex workflows and interactions between multiple agents.",
        techStack: ["Python", "LangChain", "State Management", "Multi-Agent Systems"],
        features: [
          "Stateful agent workflows",
          "Multi-agent coordination",
          "Complex interaction patterns",
          "Built-in state persistence",
          "Workflow visualization",
          "Production deployment support"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/langchain-ai/langgraph",
        deployment: {
          headline: "Deploy on Python-compatible platforms",
          providers: ["Railway", "Render", "AWS"],
          env: ["OPENAI_API_KEY", "LANGCHAIN_API_KEY"],
          notes: [
            "Requires LangChain setup",
            "Supports complex agent networks",
            "Built-in workflow management"
          ]
        },
        useCases: [
          {
            name: "Complex Agent Workflows",
            description: "Build applications with multiple interacting AI agents."
          },
          {
            name: "Stateful AI Applications",
            description: "Create AI systems that maintain complex state across interactions."
          }
        ]
      },
      {
        slug: "smolagents",
        name: "SmolAgents",
        status: "Production-ready",
        category: "AI projects",
        summary: "Lightweight agent library for easy AI agent development.",
        description: "SmolAgents is a lightweight library for building AI agents with minimal code. It provides simple, powerful abstractions for creating agents that can use tools, maintain memory, and perform complex tasks.",
        techStack: ["Python", "Hugging Face", "Tool Integration", "Lightweight Framework"],
        features: [
          "Simple agent creation",
          "Tool integration",
          "Memory management",
          "Code execution",
          "Multi-step reasoning",
          "Easy deployment"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/huggingface/smolagents",
        deployment: {
          headline: "Deploy on lightweight platforms",
          providers: ["Railway", "Render", "Hugging Face Spaces"],
          env: ["OPENAI_API_KEY", "HF_TOKEN"],
          notes: [
            "Minimal resource requirements",
            "Easy to get started",
            "Hugging Face integration"
          ]
        },
        useCases: [
          {
            name: "Quick AI Prototypes",
            description: "Build and test AI agent ideas quickly."
          },
          {
            name: "Lightweight AI Applications",
            description: "Create efficient AI agents for resource-constrained environments."
          }
        ]
      },
      {
        slug: "agentverse",
        name: "AgentVerse",
        status: "Beta",
        category: "AI projects",
        summary: "Multi-agent platform for collaborative AI systems.",
        description: "AgentVerse is a platform for building and deploying multi-agent systems where AI agents can collaborate, communicate, and work together on complex tasks. It provides tools for agent management, communication protocols, and coordination.",
        techStack: ["Python", "Multi-Agent Systems", "Communication Protocols", "Agent Coordination"],
        features: [
          "Multi-agent collaboration",
          "Communication protocols",
          "Agent lifecycle management",
          "Task coordination",
          "Scalable agent networks",
          "Built-in agent marketplace"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/huawei-noah/agentverse",
        deployment: {
          headline: "Deploy on distributed platforms",
          providers: ["AWS", "Kubernetes", "Huawei Cloud"],
          env: ["AGENTVERSE_API_KEY", "OPENAI_API_KEY"],
          notes: [
            "Supports distributed deployment",
            "Built-in agent discovery",
            "Scalable communication layer"
          ]
        },
        useCases: [
          {
            name: "Collaborative AI Systems",
            description: "Build teams of AI agents that work together."
          },
          {
            name: "Distributed AI Applications",
            description: "Create AI systems that scale across multiple nodes."
          }
        ]
      },
      {
        slug: "metagpt",
        name: "MetaGPT",
        status: "Production-ready",
        category: "AI projects",
        summary: "Multi-agent framework inspired by human software development.",
        description: "MetaGPT is a multi-agent framework that simulates a software company, with agents taking on roles like Product Manager, Architect, Engineer, etc. It provides a structured approach to complex task completion through specialized agent roles.",
        techStack: ["Python", "Multi-Agent Systems", "Role-Based Agents", "Software Development"],
        features: [
          "Role-based agent system",
          "Software development simulation",
          "Task decomposition",
          "Quality assurance agents",
          "Project management agents",
          "Collaborative development"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/geekan/MetaGPT",
        deployment: {
          headline: "Deploy on Python-compatible platforms",
          providers: ["Railway", "AWS", "GCP"],
          env: ["OPENAI_API_KEY", "METAGPT_API_KEY"],
          notes: [
            "Requires multiple API calls",
            "Built-in project structure",
            "Supports complex workflows"
          ]
        },
        useCases: [
          {
            name: "Automated Software Development",
            description: "Build AI systems that can develop software autonomously."
          },
          {
            name: "Complex Project Management",
            description: "Create AI teams that manage and execute complex projects."
          }
        ]
      },
      {
        slug: "firecrawl",
        name: "Firecrawl",
        status: "Production-ready",
        category: "AI projects",
        summary: "Web data API for AI - turn websites into LLM-ready data.",
        description: "Firecrawl provides APIs to convert entire websites into clean, LLM-ready markdown or structured data. It enables AI agents to access and process web content efficiently, with features for crawling, scraping, and data extraction.",
        techStack: ["TypeScript", "Web Scraping", "Data Extraction", "LLM Integration"],
        features: [
          "Website-to-markdown conversion",
          "Structured data extraction",
          "AI-powered scraping",
          "Multi-format support",
          "Real-time crawling",
          "API-first design"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/firecrawl/firecrawl",
        deployment: {
          headline: "Deploy on cloud platforms with scraping capabilities",
          providers: ["Railway", "Render", "AWS"],
          env: ["FIRECRAWL_API_KEY", "OPENAI_API_KEY"],
          notes: [
            "Requires proxy rotation for large-scale scraping",
            "Built-in rate limiting",
            "Supports multiple output formats"
          ]
        },
        useCases: [
          {
            name: "Web Data for AI",
            description: "Convert websites into structured data for AI processing."
          },
          {
            name: "Automated Research Tools",
            description: "Build AI agents that can gather and analyze web information."
          }
        ]
      },
      {
        slug: "ai-agents-for-beginners",
        name: "AI Agents for Beginners",
        status: "Production-ready",
        category: "AI projects",
        summary: "12 lessons to get started building AI agents.",
        description: "Microsoft's comprehensive course covering AI agent development fundamentals. It provides 12 structured lessons that guide developers from basic concepts to advanced agent building techniques using modern frameworks and tools.",
        techStack: ["Python", "Jupyter", "AutoGen", "Semantic Kernel", "LLMs"],
        features: [
          "12 structured lessons",
          "Hands-on agent building",
          "Framework comparisons",
          "Best practices guide",
          "Code examples",
          "Progressive learning path"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/microsoft/ai-agents-for-beginners",
        deployment: {
          headline: "Deploy using learned patterns",
          providers: ["Azure", "AWS", "Local"],
          env: ["OPENAI_API_KEY", "AZURE_OPENAI_KEY"],
          notes: [
            "Educational focus",
            "Multiple framework examples",
            "Production-ready patterns"
          ]
        },
        useCases: [
          {
            name: "AI Agent Education",
            description: "Learn to build AI agents from fundamentals to advanced concepts."
          },
          {
            name: "Framework Comparison",
            description: "Compare different AI agent development frameworks."
          }
        ]
      },
      {
        slug: "suna",
        name: "Suna",
        status: "Production-ready",
        category: "AI projects",
        summary: "Build, manage and train AI agents - fully open source.",
        description: "Suna is a comprehensive platform for building, managing, and training AI agents. It provides tools for agent development, training pipelines, deployment, and monitoring, all in a fully open-source package.",
        techStack: ["TypeScript", "AI Training", "Agent Management", "Deployment Tools"],
        features: [
          "Agent development platform",
          "Training pipeline management",
          "Model deployment tools",
          "Agent monitoring",
          "Performance analytics",
          "Scalable architecture"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/kortix-ai/suna",
        deployment: {
          headline: "Deploy on modern cloud platforms",
          providers: ["Railway", "AWS", "GCP"],
          env: ["SUNAI_API_KEY", "OPENAI_API_KEY"],
          notes: [
            "Full open-source stack",
            "Built-in training tools",
            "Production monitoring included"
          ]
        },
        useCases: [
          {
            name: "AI Agent Development",
            description: "Build and train custom AI agents from scratch."
          },
          {
            name: "Agent Lifecycle Management",
            description: "Manage the complete lifecycle of AI agent development and deployment."
          }
        ]
      },
      {
        slug: "activepieces",
        name: "ActivePieces",
        status: "Production-ready",
        category: "AI projects",
        summary: "AI agents & workflows automation with 400+ MCP servers.",
        description: "ActivePieces combines AI agents with workflow automation, providing access to over 400 MCP servers. It enables building complex automated workflows with AI capabilities, integrating various tools and services.",
        techStack: ["TypeScript", "Workflow Automation", "MCP", "AI Agents"],
        features: [
          "400+ MCP server integrations",
          "AI-powered workflows",
          "Visual workflow builder",
          "Agent orchestration",
          "API integrations",
          "Real-time automation"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/activepieces/activepieces",
        deployment: {
          headline: "Deploy on Node.js compatible platforms",
          providers: ["Railway", "AWS", "GCP"],
          env: ["ACTIVEPIECES_API_KEY", "OPENAI_API_KEY"],
          notes: [
            "Requires database setup",
            "Extensive integration library",
            "Built-in workflow templates"
          ]
        },
        useCases: [
          {
            name: "Automated Business Processes",
            description: "Build AI-powered automation for complex business workflows."
          },
          {
            name: "Integrated AI Systems",
            description: "Create systems that combine AI agents with external services."
          }
        ]
      },
      {
        slug: "generative-ai-for-beginners",
        name: "Generative AI for Beginners",
        status: "Production-ready",
        category: "AI projects",
        summary: "21 comprehensive lessons to get started building with Generative AI from Microsoft.",
        description: "A complete course covering Generative AI fundamentals with 21 lessons that guide developers from basic concepts to advanced implementations. Includes hands-on exercises with Azure OpenAI, prompt engineering, and practical applications.",
        techStack: ["Jupyter Notebook", "Azure", "OpenAI", "Python", "Transformers"],
        features: [
          "21 structured lessons",
          "Hands-on Azure OpenAI integration",
          "Prompt engineering techniques",
          "DALL-E image generation",
          "Semantic search implementation",
          "GPT model interactions",
          "Real-world application examples"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/microsoft/generative-ai-for-beginners",
        deployment: {
          headline: "Run locally or deploy to Azure",
          providers: ["Azure", "Local Jupyter", "GitHub Codespaces"],
          env: ["AZURE_OPENAI_KEY", "AZURE_OPENAI_ENDPOINT"],
          notes: [
            "Educational course format",
            "Requires Azure OpenAI access",
            "Includes comprehensive documentation"
          ]
        },
        useCases: [
          {
            name: "AI Learning Path",
            description: "Structured learning journey for Generative AI development."
          },
          {
            name: "Azure AI Integration",
            description: "Learn to build applications with Azure AI services."
          }
        ]
      },
      {
        slug: "llms-from-scratch",
        name: "LLMs from Scratch",
        status: "Production-ready",
        category: "AI projects",
        summary: "Implement a ChatGPT-like LLM in PyTorch from scratch, step by step.",
        description: "A comprehensive guide to building Large Language Models from the ground up using PyTorch. Learn the fundamental concepts behind modern LLMs through hands-on implementation, from basic neural networks to advanced transformer architectures.",
        techStack: ["Python", "PyTorch", "Jupyter Notebook", "Transformers", "Deep Learning"],
        features: [
          "Complete LLM implementation",
          "Step-by-step PyTorch code",
          "Transformer architecture",
          "Attention mechanisms",
          "Training pipelines",
          "Model evaluation techniques",
          "From-scratch implementation"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/rasbt/LLMs-from-scratch",
        deployment: {
          headline: "Run locally with Python environment",
          providers: ["Local Python", "Google Colab", "Jupyter"],
          env: ["Python 3.8+", "PyTorch", "Jupyter"],
          notes: [
            "Educational implementation",
            "Requires GPU for training",
            "Comprehensive code walkthrough"
          ]
        },
        useCases: [
          {
            name: "LLM Development",
            description: "Learn the internals of Large Language Models."
          },
          {
            name: "Deep Learning Education",
            description: "Understand transformer architectures from scratch."
          }
        ]
      },
      {
        slug: "system-prompts-leaks",
        name: "System Prompts Leaks",
        status: "Production-ready",
        category: "AI projects",
        summary: "Collection of extracted system prompts from popular AI chatbots.",
        description: "A curated collection of system prompts extracted from major AI chatbots including ChatGPT, Claude, and Gemini. Learn how different AI models are prompted and understand their behavioral patterns and capabilities.",
        techStack: ["JavaScript", "AI Prompts", "Chatbots", "Reverse Engineering"],
        features: [
          "ChatGPT system prompts",
          "Claude AI prompts",
          "Gemini AI prompts",
          "Prompt analysis tools",
          "Behavioral pattern insights",
          "AI model comparisons",
          "Prompt engineering examples"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/asgeirtj/system_prompts_leaks",
        deployment: {
          headline: "Access via GitHub repository",
          providers: ["GitHub"],
          env: [],
          notes: [
            "Educational research resource",
            "No deployment required",
            "Regular updates with new prompts"
          ]
        },
        useCases: [
          {
            name: "Prompt Engineering Research",
            description: "Study how different AI models are prompted."
          },
          {
            name: "AI Behavior Analysis",
            description: "Understand AI model capabilities and limitations."
          }
        ]
      },
      {
        slug: "openui",
        name: "OpenUI",
        status: "Production-ready",
        category: "AI projects",
        summary: "Describe UI using your imagination, see it rendered live with AI.",
        description: "OpenUI lets you describe user interfaces using natural language and see them rendered in real-time. Powered by AI, it converts your imaginative descriptions into actual HTML/CSS interfaces instantly.",
        techStack: ["TypeScript", "AI", "HTML/CSS", "UI Generation", "Natural Language"],
        features: [
          "Natural language UI description",
          "Real-time rendering",
          "AI-powered interface generation",
          "Tailwind CSS integration",
          "Live preview",
          "Imagination-to-code conversion",
          "Rapid prototyping"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/wandb/openui",
        deployment: {
          headline: "Deploy as web application",
          providers: ["Vercel", "Netlify", "GitHub Pages"],
          env: ["OPENAI_API_KEY"],
          notes: [
            "Requires OpenAI API access",
            "Web-based interface",
            "No backend required"
          ]
        },
        useCases: [
          {
            name: "Rapid UI Prototyping",
            description: "Create UI mockups instantly with natural language."
          },
          {
            name: "AI-Assisted Design",
            description: "Generate interface ideas using AI imagination."
          }
        ]
      },
      {
        slug: "jina-ai-serve",
        name: "Jina AI Serve",
        status: "Production-ready",
        category: "AI projects",
        summary: "Build multimodal AI applications with cloud-native stack.",
        description: "Jina AI Serve is a cloud-native framework for building multimodal AI applications. It provides scalable infrastructure for deploying AI models with support for text, images, video, and other modalities.",
        techStack: ["Python", "Docker", "Kubernetes", "FastAPI", "Multimodal AI"],
        features: [
          "Multimodal AI support",
          "Cloud-native architecture",
          "Kubernetes deployment",
          "Microservice orchestration",
          "gRPC communication",
          "Monitoring and tracing",
          "Scalable model serving"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/jina-ai/serve",
        deployment: {
          headline: "Deploy on Kubernetes or cloud platforms",
          providers: ["Kubernetes", "AWS EKS", "GCP GKE"],
          env: ["JINA_HUB_ROOT", "JINA_LOG_LEVEL"],
          notes: [
            "Requires Kubernetes cluster",
            "Supports multimodal models",
            "Production-ready scaling"
          ]
        },
        useCases: [
          {
            name: "Multimodal AI Applications",
            description: "Build applications handling text, images, and video."
          },
          {
            name: "Scalable AI Deployment",
            description: "Deploy AI models at scale with cloud-native tools."
          }
        ]
      },
      {
        slug: "awesome-generative-ai-guide",
        name: "Awesome Generative AI Guide",
        status: "Production-ready",
        category: "AI projects",
        summary: "One-stop repository for Generative AI research updates and resources.",
        description: "A comprehensive curated collection of Generative AI resources including research papers, interview questions, notebooks, and practical guides. Stay updated with the latest developments in the field.",
        techStack: ["Research Papers", "Jupyter Notebooks", "Interview Prep", "Resources"],
        features: [
          "Latest research updates",
          "Interview question collections",
          "Practical Jupyter notebooks",
          "Vision and language resources",
          "LLM implementation guides",
          "Industry applications",
          "Learning resources"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/aishwaryanr/awesome-generative-ai-guide",
        deployment: {
          headline: "Access via GitHub repository",
          providers: ["GitHub"],
          env: [],
          notes: [
            "Curated resource collection",
            "Regular updates",
            "Community contributions"
          ]
        },
        useCases: [
          {
            name: "AI Research",
            description: "Stay updated with latest Generative AI developments."
          },
          {
            name: "Interview Preparation",
            description: "Prepare for AI/ML engineering interviews."
          }
        ]
      },
      {
        slug: "repomix",
        name: "Repomix",
        status: "Production-ready",
        category: "AI projects",
        summary: "Pack your entire repository into a single AI-friendly file.",
        description: "Repomix is a powerful tool that packs your entire codebase into a single, AI-friendly file. Perfect for feeding your code to Large Language Models like Claude, ChatGPT, DeepSeek, and other AI tools for analysis, documentation, or code understanding.",
        techStack: ["TypeScript", "Node.js", "AI Tools", "Code Analysis"],
        features: [
          "Repository packaging",
          "AI-friendly file format",
          "Multiple LLM support",
          "Code structure preservation",
          "File filtering options",
          "Command-line interface",
          "Git integration"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/yamadashy/repomix",
        deployment: {
          headline: "Install globally via npm",
          providers: ["npm", "Node.js"],
          env: [],
          notes: [
            "Command-line tool",
            "No server deployment needed",
            "Works with any codebase"
          ]
        },
        useCases: [
          {
            name: "Code Analysis with AI",
            description: "Feed entire codebases to AI models for analysis."
          },
          {
            name: "AI-Assisted Development",
            description: "Use AI to understand and work with large codebases."
          }
        ]
      },
      {
        slug: "vercel-ai",
        name: "Vercel AI",
        status: "Production-ready",
        category: "AI projects",
        summary: "The AI Toolkit for TypeScript from the creators of Next.js.",
        description: "The AI SDK is a free open-source library for building AI-powered applications and agents. Built by the creators of Next.js, it provides a comprehensive toolkit for integrating AI capabilities into TypeScript applications.",
        techStack: ["TypeScript", "React", "Next.js", "AI SDK", "LLMs"],
        features: [
          "TypeScript-first AI development",
          "React/Next.js integration",
          "Multiple LLM provider support",
          "Streaming responses",
          "Tool calling",
          "Agent building utilities",
          "Production-ready patterns"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/vercel/ai",
        deployment: {
          headline: "Deploy on Vercel or any Node.js platform",
          providers: ["Vercel", "Netlify", "Railway"],
          env: ["OPENAI_API_KEY", "ANTHROPIC_API_KEY"],
          notes: [
            "Optimized for Vercel deployment",
            "TypeScript native",
            "Framework agnostic"
          ]
        },
        useCases: [
          {
            name: "AI-Powered Web Applications",
            description: "Build modern web apps with integrated AI capabilities."
          },
          {
            name: "TypeScript AI Development",
            description: "Develop AI applications with full type safety."
          }
        ]
      },
      {
        slug: "nvidia-nemo",
        name: "NVIDIA NeMo",
        status: "Production-ready",
        category: "AI projects",
        summary: "Scalable generative AI framework for LLMs, multimodal, and speech AI.",
        description: "NVIDIA NeMo is a scalable generative AI framework built for researchers and developers working on Large Language Models, Multimodal AI, and Speech AI. It provides tools for training, fine-tuning, and deploying AI models at scale.",
        techStack: ["Python", "PyTorch", "CUDA", "LLMs", "Speech AI", "Multimodal"],
        features: [
          "Large Language Model training",
          "Multimodal AI support",
          "Automatic Speech Recognition",
          "Text-to-Speech synthesis",
          "Neural machine translation",
          "Speaker recognition",
          "Scalable training pipelines"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/NVIDIA-NeMo/NeMo",
        deployment: {
          headline: "Deploy on NVIDIA GPUs or cloud platforms",
          providers: ["NVIDIA DGX", "AWS", "Azure"],
          env: ["CUDA_VISIBLE_DEVICES", "NEMO_HOME"],
          notes: [
            "Requires NVIDIA GPUs",
            "Supports distributed training",
            "Production deployment tools"
          ]
        },
        useCases: [
          {
            name: "LLM Training and Fine-tuning",
            description: "Train and customize Large Language Models."
          },
          {
            name: "Multimodal AI Applications",
            description: "Build applications combining text, speech, and vision."
          }
        ]
      },
      {
        slug: "chatall",
        name: "ChatALL",
        status: "Production-ready",
        category: "AI projects",
        summary: "Concurrently chat with multiple AI chatbots and find the best answers.",
        description: "ChatALL is an Electron-based desktop application that allows you to chat with multiple AI chatbots simultaneously. Compare responses from ChatGPT, Bing Chat, Bard, Claude, ChatGLM, and more to discover the best answers for your questions.",
        techStack: ["JavaScript", "Electron", "Vue.js", "AI APIs"],
        features: [
          "Multi-chatbot interface",
          "Simultaneous conversations",
          "Response comparison",
          "Desktop application",
          "Cross-platform support",
          "API integration",
          "Response history"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/ai-shifu/ChatALL",
        deployment: {
          headline: "Download and run as desktop application",
          providers: ["Windows", "macOS", "Linux"],
          env: [],
          notes: [
            "Desktop application",
            "Requires API keys for chatbots",
            "No server deployment needed"
          ]
        },
        useCases: [
          {
            name: "AI Response Comparison",
            description: "Compare answers from different AI models."
          },
          {
            name: "Multi-Model Research",
            description: "Test and analyze various AI chatbot capabilities."
          }
        ]
      },
      {
        slug: "dyad",
        name: "Dyad",
        status: "Production-ready",
        category: "AI projects",
        summary: "Free, local, open-source AI app builder - alternative to v0/lovable.",
        description: "Dyad is a free, local, open-source AI app builder that lets you create applications using natural language. It serves as an alternative to tools like v0 and lovable, providing local development with AI assistance.",
        techStack: ["TypeScript", "Next.js", "React", "AI Models", "Local Development"],
        features: [
          "Natural language app building",
          "Local AI processing",
          "Open-source architecture",
          "Next.js/React foundation",
          "Multiple AI model support",
          "Offline capability",
          "Rapid prototyping"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/dyad-sh/dyad",
        deployment: {
          headline: "Run locally or deploy to Vercel",
          providers: ["Local", "Vercel", "Railway"],
          env: ["OPENAI_API_KEY", "ANTHROPIC_API_KEY"],
          notes: [
            "Local-first approach",
            "Supports multiple AI providers",
            "Open-source alternative"
          ]
        },
        useCases: [
          {
            name: "Local AI Development",
            description: "Build AI applications without cloud dependencies."
          },
          {
            name: "Rapid App Prototyping",
            description: "Create apps quickly with AI assistance."
          }
        ]
      },
      {
        slug: "coze-studio",
        name: "Coze Studio",
        status: "Production-ready",
        category: "AI projects",
        summary: "AI agent development platform with all-in-one visual tools.",
        description: "Coze Studio is a comprehensive AI agent development platform featuring visual tools for building, debugging, and deploying AI agents. It provides a no-code/low-code environment for creating sophisticated AI applications.",
        techStack: ["TypeScript", "Go", "AI Agents", "Visual Development", "No-Code"],
        features: [
          "Visual agent builder",
          "Drag-and-drop interface",
          "Multi-modal AI support",
          "Workflow automation",
          "Agent debugging tools",
          "Plugin ecosystem",
          "Deployment management"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/coze-dev/coze-studio",
        deployment: {
          headline: "Deploy on cloud platforms",
          providers: ["AWS", "Azure", "GCP"],
          env: ["COZE_API_KEY", "OPENAI_API_KEY"],
          notes: [
            "Visual development platform",
            "Supports complex agent workflows",
            "Enterprise-ready features"
          ]
        },
        useCases: [
          {
            name: "Visual AI Development",
            description: "Build AI agents without extensive coding."
          },
          {
            name: "Complex Workflow Automation",
            description: "Create sophisticated AI-powered business processes."
          }
        ]
      },
      {
        slug: "a2a-protocol",
        name: "A2A Protocol",
        status: "Production-ready",
        category: "AI projects",
        summary: "Open protocol enabling communication between opaque agentic applications.",
        description: "A2A (Agent-to-Agent) is an open protocol that enables secure communication and interoperability between different AI agent applications. It provides standardized interfaces for agent interactions across different platforms and implementations.",
        techStack: ["Protocol", "Interoperability", "Agent Communication", "Standards"],
        features: [
          "Agent-to-agent communication",
          "Interoperability standards",
          "Secure message passing",
          "Protocol specifications",
          "Cross-platform compatibility",
          "Open-source implementation",
          "Linux Foundation backing"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/a2aproject/A2A",
        deployment: {
          headline: "Implement in any programming language",
          providers: ["Any Platform"],
          env: [],
          notes: [
            "Protocol specification",
            "Implementation guides",
            "Cross-platform compatibility"
          ]
        },
        useCases: [
          {
            name: "Agent Interoperability",
            description: "Enable different AI agents to communicate seamlessly."
          },
          {
            name: "Multi-Agent Systems",
            description: "Build complex systems with interoperable agents."
          }
        ]
      },
      {
        slug: "passport-examples",
        name: "Passport Examples",
        status: "Production-ready",
        category: "auth",
        summary: "Social authentication examples for Node.js applications using Passport.js",
        description: "A comprehensive collection of examples demonstrating how to implement social authentication in Node.js applications using Passport.js. Includes examples for various OAuth providers and authentication strategies.",
        techStack: ["Node.js", "Passport.js", "Express", "OAuth", "Social Login"],
        features: [
          "Multiple OAuth provider examples",
          "Social authentication flows",
          "Session management",
          "User authentication middleware",
          "Strategy implementations",
          "Security best practices"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/mjhea0/passport-examples",
        deployment: {
          headline: "Deploy on any Node.js hosting platform",
          providers: ["Heroku", "Railway", "Vercel", "AWS"],
          env: ["CLIENT_ID", "CLIENT_SECRET", "SESSION_SECRET"],
          notes: [
            "Configure OAuth apps for each provider",
            "Set up environment variables",
            "Customize authentication flows as needed"
          ]
        },
        useCases: [
          {
            name: "Social Authentication",
            description: "Add social login capabilities to web applications."
          },
          {
            name: "OAuth Integration",
            description: "Implement OAuth 2.0 authentication flows."
          }
        ]
      },
      {
        slug: "nodejs-express-mongoose-passport-jwt-rest-api-auth",
        name: "Node.js Express Mongoose Passport JWT REST API Auth",
        status: "Production-ready",
        category: "auth",
        summary: "Complete authentication system with Node.js, Express, Mongoose, Passport, and JWT",
        description: "A full-featured REST API authentication system built with Node.js, Express, Mongoose, Passport.js, and JWT. Includes user registration, login, password reset, and secure API endpoints with proper authentication middleware.",
        techStack: ["Node.js", "Express", "Mongoose", "Passport.js", "JWT", "MongoDB"],
        features: [
          "User registration and authentication",
          "JWT token-based authorization",
          "Passport.js strategy integration",
          "MongoDB user data storage",
          "Password hashing and security",
          "API endpoint protection",
          "Session management"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/didinj/node-express-mongoose-passport-jwt-rest-api-auth",
        deployment: {
          headline: "Deploy on Node.js compatible platforms",
          providers: ["Heroku", "Railway", "DigitalOcean", "AWS"],
          env: ["MONGODB_URI", "JWT_SECRET", "SESSION_SECRET"],
          notes: [
            "Requires MongoDB database",
            "Configure JWT secret securely",
            "Set up environment variables"
          ]
        },
        useCases: [
          {
            name: "Secure API Development",
            description: "Build authenticated REST APIs with proper security."
          },
          {
            name: "User Management Systems",
            description: "Implement complete user authentication and authorization."
          }
        ]
      },
      {
        slug: "nodejs-auth",
        name: "Node.js Authentication App",
        status: "Production-ready",
        category: "auth",
        summary: "Complete NodeJS authentication system with Express, PassportJS, and JWT",
        description: "A comprehensive Node.js authentication application featuring user registration, login, password encryption with bcrypt, JWT tokens, and session management. Includes both local authentication and social login capabilities.",
        techStack: ["Node.js", "Express", "Passport.js", "JWT", "bcrypt", "EJS"],
        features: [
          "Local user authentication",
          "JWT token implementation",
          "Password encryption with bcrypt",
          "Session management",
          "User registration and login",
          "Protected routes",
          "EJS templating"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/bit-rahul/nodejs-auth",
        deployment: {
          headline: "Deploy on Node.js hosting platforms",
          providers: ["Heroku", "Railway", "Vercel", "AWS"],
          env: ["JWT_SECRET", "SESSION_SECRET", "DATABASE_URL"],
          notes: [
            "Configure database connection",
            "Set secure JWT secret",
            "Customize authentication flows"
          ]
        },
        useCases: [
          {
            name: "Web Application Security",
            description: "Implement secure user authentication for web apps."
          },
          {
            name: "API Authentication",
            description: "Secure API endpoints with JWT authentication."
          }
        ]
      },
      {
        slug: "passport-next-auth-tutorial",
        name: "Passport Next.js Auth Tutorial",
        status: "Production-ready",
        category: "auth",
        summary: "Build an authentication system using Node.js, Express, and Passport.js",
        description: "A complete tutorial and implementation for building authentication systems using Node.js, Express, Passport.js, and MongoDB. Includes user registration, login, session management, and integration with Next.js frontend.",
        techStack: ["Node.js", "Express", "Passport.js", "MongoDB", "Mongoose", "Next.js"],
        features: [
          "Complete authentication flow",
          "Passport.js strategy implementation",
          "MongoDB user storage",
          "Session handling",
          "Next.js frontend integration",
          "User registration and login",
          "Protected routes"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/jpreecedev/passport-next-auth-tutorial",
        deployment: {
          headline: "Deploy backend and frontend separately",
          providers: ["Vercel", "Railway", "Heroku"],
          env: ["MONGODB_URI", "SESSION_SECRET", "NEXTAUTH_SECRET"],
          notes: [
            "Deploy backend API separately",
            "Configure MongoDB connection",
            "Set up Next.js authentication"
          ]
        },
        useCases: [
          {
            name: "Full-Stack Authentication",
            description: "Build complete authentication systems for web applications."
          },
          {
            name: "User Management",
            description: "Implement user registration and login functionality."
          }
        ]
      },
      {
        slug: "express-rest-boilerplate",
        name: "Express REST Boilerplate",
        status: "Production-ready",
        category: "auth",
        summary: "Express starter for building RESTful APIs with authentication",
        description: "A comprehensive Express.js boilerplate for building RESTful APIs with built-in authentication, validation, error handling, and best practices. Includes JWT authentication, input validation, and production-ready structure.",
        techStack: ["Node.js", "Express", "REST API", "JWT", "Validation", "Docker"],
        features: [
          "RESTful API structure",
          "JWT authentication",
          "Input validation and sanitization",
          "Error handling middleware",
          "CORS configuration",
          "Docker support",
          "Environment configuration",
          "API documentation setup"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/danielfsousa/express-rest-boilerplate",
        deployment: {
          headline: "Deploy on any Node.js platform",
          providers: ["Railway", "Render", "Heroku", "AWS"],
          env: ["JWT_SECRET", "DATABASE_URL", "NODE_ENV"],
          notes: [
            "Configure database connection",
            "Set up JWT secret securely",
            "Customize API endpoints"
          ]
        },
        useCases: [
          {
            name: "API Development",
            description: "Build scalable REST APIs with authentication."
          },
          {
            name: "Backend Services",
            description: "Create secure backend services for web applications."
          }
        ]
      },
      {
        slug: "express-mongoose-es6-rest-api",
        name: "Express Mongoose ES6 REST API",
        status: "Production-ready",
        category: "auth",
        summary: "Boilerplate for building RESTful APIs with Express and Mongoose in ES6",
        description: "A production-ready boilerplate for building scalable REST APIs using Express.js, Mongoose, and ES6 features. Includes authentication, validation, testing, code coverage, and modern JavaScript practices.",
        techStack: ["Node.js", "Express", "Mongoose", "ES6", "JWT", "Testing"],
        features: [
          "ES6/ES7 JavaScript features",
          "Mongoose ODM integration",
          "JWT authentication",
          "Input validation",
          "Unit and integration testing",
          "Code coverage reporting",
          "Docker containerization",
          "API documentation"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/kunalkapadia/express-mongoose-es6-rest-api",
        deployment: {
          headline: "Deploy on Node.js compatible platforms",
          providers: ["Railway", "Render", "AWS", "DigitalOcean"],
          env: ["MONGODB_URI", "JWT_SECRET", "NODE_ENV"],
          notes: [
            "Requires MongoDB database",
            "Run tests before deployment",
            "Configure environment variables"
          ]
        },
        useCases: [
          {
            name: "Scalable API Development",
            description: "Build production-ready APIs with modern JavaScript."
          },
          {
            name: "Microservices Architecture",
            description: "Create microservice APIs with authentication."
          }
        ]
      },
      {
        slug: "chat-app-react-nodejs",
        name: "Chat App with React and Node.js",
        status: "Production-ready",
        category: "personal",
        summary: "Real-time chat application using React, Node.js, and Socket.io with MongoDB",
        description: "A full-stack real-time chat application built with React frontend, Node.js backend, Socket.io for real-time communication, and MongoDB for data storage. Features user authentication, chat rooms, and instant messaging.",
        techStack: ["React", "Node.js", "Socket.io", "MongoDB", "Express", "Real-time"],
        features: [
          "Real-time messaging",
          "User authentication",
          "Chat rooms and private messaging",
          "MongoDB data storage",
          "Responsive React UI",
          "Socket.io integration",
          "Message history",
          "Online user status"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/koolkishan/chat-app-react-nodejs",
        deployment: {
          headline: "Deploy frontend and backend separately",
          providers: ["Vercel", "Railway", "Heroku"],
          env: ["MONGODB_URI", "JWT_SECRET", "PORT"],
          notes: [
            "Deploy backend to server with persistent connection",
            "Frontend can be deployed to static hosting",
            "Configure MongoDB database"
          ]
        },
        useCases: [
          {
            name: "Real-time Communication",
            description: "Build chat applications with instant messaging."
          },
          {
            name: "Social Platforms",
            description: "Create social features for web applications."
          }
        ]
      },
      {
        slug: "chat.io",
        name: "Chat.io Real-time Chat Application",
        status: "Production-ready",
        category: "personal",
        summary: "Real Time Chat Application with Node.js, Express, Socket.io, Passport, and Redis",
        description: "A comprehensive real-time chat application featuring user authentication with Passport.js, real-time messaging with Socket.io, Redis for session storage, and MongoDB for data persistence. Includes private messaging and group chat functionality.",
        techStack: ["Node.js", "Express", "Socket.io", "Passport.js", "Redis", "MongoDB"],
        features: [
          "Real-time chat functionality",
          "User authentication with Passport",
          "Private and group messaging",
          "Redis session storage",
          "MongoDB data persistence",
          "Online user tracking",
          "Message encryption",
          "Responsive web interface"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/OmarElgabry/chat.io",
        deployment: {
          headline: "Deploy on Node.js hosting platforms",
          providers: ["Railway", "Render", "AWS", "DigitalOcean"],
          env: ["MONGODB_URI", "REDIS_URL", "SESSION_SECRET"],
          notes: [
            "Requires Redis for session storage",
            "Configure MongoDB connection",
            "Set up Passport authentication"
          ]
        },
        useCases: [
          {
            name: "Social Chat Platforms",
            description: "Build social networking applications with chat features."
          },
          {
            name: "Team Communication",
            description: "Create internal communication tools for teams."
          }
        ]
      },
      {
        slug: "websocket-chat",
        name: "WebSocket Group Chat App",
        status: "Production-ready",
        category: "personal",
        summary: "Websocket based group chat app built with Socket.io and React",
        description: "A modern group chat application using WebSocket technology with Socket.io for real-time communication and React for the frontend. Features styled components, group chat rooms, and real-time user interactions.",
        techStack: ["React", "Node.js", "Socket.io", "Styled Components", "WebSocket"],
        features: [
          "Real-time group chat",
          "WebSocket communication",
          "React frontend with hooks",
          "Styled Components UI",
          "User join/leave notifications",
          "Message timestamps",
          "Responsive design",
          "Modern UI/UX"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/justadudewhohacks/websocket-chat",
        deployment: {
          headline: "Deploy on platforms supporting WebSocket",
          providers: ["Railway", "Render", "Vercel"],
          env: ["PORT", "NODE_ENV"],
          notes: [
            "Requires WebSocket support",
            "Deploy backend to persistent server",
            "Frontend can use static hosting"
          ]
        },
        useCases: [
          {
            name: "Group Communication",
            description: "Build group chat applications for communities."
          },
          {
            name: "Live Collaboration",
            description: "Create collaborative tools with real-time features."
          }
        ]
      },
      {
        slug: "nodejs-backend-architecture-typescript",
        name: "Node.js Backend Architecture TypeScript",
        status: "Production-ready",
        category: "personal",
        summary: "Production-ready blogging platform backend with Node.js, TypeScript, and modern architecture",
        description: "A comprehensive Node.js backend architecture for building production-ready blogging platforms like Medium. Features TypeScript, Redis caching, JWT authentication, role-based access control, and scalable database design.",
        techStack: ["Node.js", "TypeScript", "Express", "Redis", "JWT", "PostgreSQL"],
        features: [
          "TypeScript implementation",
          "JWT authentication",
          "Role-based access control",
          "Redis caching layer",
          "Database optimization",
          "API rate limiting",
          "Error handling and logging",
          "Scalable architecture"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/fifocode/nodejs-backend-architecture-typescript",
        deployment: {
          headline: "Deploy on Node.js compatible platforms",
          providers: ["Railway", "Render", "AWS", "DigitalOcean"],
          env: ["DATABASE_URL", "REDIS_URL", "JWT_SECRET"],
          notes: [
            "Requires PostgreSQL database",
            "Configure Redis for caching",
            "Set up environment variables"
          ]
        },
        useCases: [
          {
            name: "Blogging Platforms",
            description: "Build scalable blogging platforms like Medium."
          },
          {
            name: "Content Management Systems",
            description: "Create CMS backends for content-driven applications."
          }
        ]
      },
      {
        slug: "blogging-website",
        name: "Complete Blogging Website",
        status: "Production-ready",
        category: "personal",
        summary: "A complete blogging platform built using Node.js, Express, and MongoDB",
        description: "A full-featured blogging website with user authentication, post creation and management, comments system, and admin dashboard. Built with Node.js, Express, MongoDB, and EJS templating for a complete blogging experience.",
        techStack: ["Node.js", "Express", "MongoDB", "EJS", "CSS", "JavaScript"],
        features: [
          "User authentication and registration",
          "Blog post creation and editing",
          "Comment system",
          "Admin dashboard",
          "Responsive design",
          "User profiles",
          "Post categories and tags",
          "Search functionality"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/arjuncvinod/Blogging-Website",
        deployment: {
          headline: "Deploy on Node.js hosting platforms",
          providers: ["Heroku", "Railway", "Vercel", "AWS"],
          env: ["MONGODB_URI", "SESSION_SECRET", "PORT"],
          notes: [
            "Requires MongoDB database",
            "Configure session secret",
            "Set up file upload if needed"
          ]
        },
        useCases: [
          {
            name: "Personal Blogging",
            description: "Create personal blogs with full content management."
          },
          {
            name: "Content Publishing",
            description: "Build platforms for content creators and publishers."
          }
        ]
      },
      {
        slug: "blogger-fullstack",
        name: "Blogger Full-Stack Application",
        status: "Production-ready",
        category: "personal",
        summary: "Multi-User Blogging Platform with React, Node.js, Next.js, Express, and MongoDB",
        description: "A complete full-stack blogging platform supporting multiple users with React frontend, Node.js/Express backend, Next.js for SSR, and MongoDB for data storage. Features user management, blog posts, comments, and modern UI components.",
        techStack: ["React", "Node.js", "Next.js", "Express", "MongoDB", "Bootstrap"],
        features: [
          "Multi-user support",
          "Blog post management",
          "User authentication",
          "Comment system",
          "Responsive Bootstrap UI",
          "Next.js server-side rendering",
          "MongoDB data storage",
          "Admin features"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/alexticovschi/blogger",
        deployment: {
          headline: "Deploy frontend and backend separately",
          providers: ["Vercel", "Railway", "Netlify"],
          env: ["MONGODB_URI", "JWT_SECRET", "NEXTAUTH_SECRET"],
          notes: [
            "Deploy Next.js frontend to Vercel/Netlify",
            "Deploy Express backend to Railway/Render",
            "Configure MongoDB connection"
          ]
        },
        useCases: [
          {
            name: "Multi-User Blogging",
            description: "Build community blogging platforms with multiple authors."
          },
          {
            name: "Content Management",
            description: "Create advanced content management systems."
          }
        ]
      },
      // Real Svelte Templates from GitHub
      {
        slug: "svelte-stripe",
        name: "Svelte Stripe Elements",
        status: "Production-ready",
        category: "payment",
        summary: "Everything you need to add Stripe Elements to your Svelte project",
        description: "A comprehensive Stripe Elements integration for Svelte applications. Includes support for Apple Pay, Google Pay, SEPA, iDEAL, and all major credit cards. Features TypeScript support, SvelteKit integration, and modern payment processing.",
        techStack: ["Svelte", "Stripe", "TypeScript", "SvelteKit"],
        features: [
          "Stripe Elements integration",
          "Apple Pay support",
          "Google Pay support",
          "SEPA payments",
          "iDEAL payments",
          "Credit card processing",
          "TypeScript support",
          "SvelteKit compatible",
          "Modern payment UI"
        ],
        demoUrl: "https://sveltestripe.com",
        codeUrl: "https://github.com/joshnuss/svelte-stripe",
        deployment: {
          headline: "Deploy with Stripe configuration",
          providers: ["Vercel", "Netlify", "Railway"],
          env: ["STRIPE_PUBLISHABLE_KEY", "STRIPE_SECRET_KEY"],
          notes: [
            "Configure Stripe account",
            "Set up webhook endpoints",
            "Test with Stripe test keys"
          ]
        },
        useCases: [
          {
            name: "E-commerce Applications",
            description: "Build modern e-commerce platforms with Stripe payments."
          },
          {
            name: "SaaS Subscriptions",
            description: "Create subscription-based services with recurring payments."
          },
          {
            name: "Marketplaces",
            description: "Develop multi-vendor marketplaces with payment processing."
          }
        ]
      },
      {
        slug: "launch-mvp-stripe-nextjs-supabase",
        name: "Launch MVP - Stripe + Next.js + Supabase",
        status: "Production-ready",
        category: "payment",
        summary: "Production-Ready NextJS+Stripe+Supabase App Boilerplate Template",
        description: "Welcome to Sean's Open Source MVP Boilerplate Template for Production-Ready NextJS+Stripe+Supabase App. Features complete authentication, subscription management, user dashboards, and modern UI components.",
        techStack: ["Next.js", "Stripe", "Supabase", "TypeScript", "Tailwind CSS"],
        features: [
          "Stripe subscription payments",
          "Supabase authentication",
          "User dashboard",
          "Subscription management",
          "Modern UI components",
          "TypeScript support",
          "Responsive design",
          "Production-ready",
          "Complete authentication flow"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/ShenSeanChen/launch-mvp-stripe-nextjs-supabase",
        deployment: {
          headline: "Deploy to Vercel with full configuration",
          providers: ["Vercel", "Railway"],
          env: ["STRIPE_SECRET_KEY", "SUPABASE_URL", "SUPABASE_ANON_KEY"],
          notes: [
            "Configure Stripe webhooks",
            "Set up Supabase project",
            "Deploy to Vercel",
            "Configure environment variables"
          ]
        },
        useCases: [
          {
            name: "SaaS Applications",
            description: "Launch subscription-based SaaS products quickly."
          },
          {
            name: "Membership Platforms",
            description: "Build exclusive member-only platforms."
          },
          {
            name: "Digital Products",
            description: "Sell digital products and services online."
          }
        ]
      },
      {
        slug: "react-firebase-auth",
        name: "React Firebase Auth v9",
        status: "Production-ready",
        category: "auth",
        summary: "Firebase authentication v9 (new API) with React and ChakraUI template",
        description: "Complete Firebase authentication implementation using the latest v9 API with React and ChakraUI. Features dark mode, modern UI components, and comprehensive authentication flows including email/password, social login, and user management.",
        techStack: ["React", "Firebase", "Chakra UI", "JavaScript"],
        features: [
          "Firebase Auth v9 API",
          "Email/password authentication",
          "Social login integration",
          "Dark mode support",
          "Modern ChakraUI components",
          "User profile management",
          "Password reset functionality",
          "Authentication state management",
          "Responsive design"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/trulymittal/react-firebase-auth",
        deployment: {
          headline: "Deploy with Firebase configuration",
          providers: ["Vercel", "Netlify", "Firebase Hosting"],
          env: ["FIREBASE_API_KEY", "FIREBASE_AUTH_DOMAIN", "FIREBASE_PROJECT_ID"],
          notes: [
            "Set up Firebase project",
            "Configure authentication providers",
            "Deploy to preferred platform",
            "Configure Firebase security rules"
          ]
        },
        useCases: [
          {
            name: "Web Applications",
            description: "Add authentication to React web applications."
          },
          {
            name: "User Management Systems",
            description: "Build comprehensive user management platforms."
          },
          {
            name: "Social Platforms",
            description: "Create platforms requiring user authentication."
          }
        ]
      },
      {
        slug: "react-vite-tailwind-typescript-firebase-auth-template",
        name: "React + Vite + Firebase Auth Template",
        status: "Production-ready",
        category: "auth",
        summary: "Good starting point for your next application with React, TypeScript, TailwindCSS, Firebase Auth and Vite",
        description: "A modern React application template with Vite, TypeScript, TailwindCSS, and Firebase authentication. Features fast development setup, type safety, modern styling, and complete authentication system with user management.",
        techStack: ["React", "Vite", "TypeScript", "Tailwind CSS", "Firebase"],
        features: [
          "Vite for fast development",
          "TypeScript for type safety",
          "TailwindCSS for styling",
          "Firebase authentication",
          "User dashboard",
          "Authentication guards",
          "Modern React patterns",
          "Responsive design",
          "Production-ready setup"
        ],
        demoUrl: null,
        codeUrl: "https://github.com/IgorBayerl/react-vite-tailwind-typescript-firebase-auth-template",
        deployment: {
          headline: "Deploy with Firebase hosting",
          providers: ["Vercel", "Netlify", "Firebase Hosting"],
          env: ["FIREBASE_API_KEY", "FIREBASE_AUTH_DOMAIN"],
          notes: [
            "Set up Firebase project",
            "Configure authentication",
            "Deploy to Firebase hosting",
            "Configure security rules"
          ]
        },
        useCases: [
          {
            name: "Modern Web Apps",
            description: "Build fast, modern web applications with authentication."
          },
          {
            name: "Dashboard Applications",
            description: "Create user dashboard applications with auth."
          },
          {
            name: "Product MVPs",
            description: "Quickly prototype and launch authenticated web apps."
          }
        ]
      },
      {
        slug: "deep-chat",
        name: "Deep Chat - AI Chatbot Component",
        status: "Production-ready",
        category: "AI projects",
        summary: "Fully customizable AI chatbot component for web applications",
        description: "A highly customizable AI chatbot component that supports multiple AI providers including OpenAI, Claude, Gemini, HuggingFace, and more. Features real-time streaming, file uploads, speech recognition, and extensive customization options.",
        techStack: ["TypeScript", "AI APIs", "Web Components"],
        features: [
          "Multi-provider AI support",
          "Real-time streaming",
          "File upload capabilities",
          "Speech recognition",
          "Voice synthesis",
          "Customizable UI",
          "Multiple AI models",
          "Streaming responses",
          "Cross-framework support",
          "Extensive API"
        ],
        demoUrl: "https://deepchat.dev",
        codeUrl: "https://github.com/OvidijusParsiunas/deep-chat",
        deployment: {
          headline: "Deploy with AI API configuration",
          providers: ["Vercel", "Netlify", "Railway"],
          env: ["OPENAI_API_KEY", "ANTHROPIC_API_KEY", "GOOGLE_API_KEY"],
          notes: [
            "Configure AI provider APIs",
            "Set up API keys",
            "Customize chatbot appearance",
            "Test with different AI models"
          ]
        },
        useCases: [
          {
            name: "Customer Support",
            description: "Build AI-powered customer support chatbots."
          },
          {
            name: "Virtual Assistants",
            description: "Create intelligent virtual assistants."
          },
          {
            name: "Educational Tools",
            description: "Develop AI-powered learning companions."
          }
        ]
      },
      {
        slug: "sveltekit-ai-chatbot",
        name: "SvelteKit AI Chatbot",
        status: "Production-ready",
        category: "AI projects",
        summary: "Full-featured AI chatbot built with SvelteKit and OpenAI",
        description: "A comprehensive AI chatbot application built with SvelteKit, featuring conversation history, customizable prompts, streaming responses, and modern UI. Includes user authentication, chat management, and deployment-ready architecture.",
        techStack: ["Svelte", "SvelteKit", "OpenAI", "TypeScript", "Tailwind CSS"],
        features: [
          "OpenAI GPT integration",
          "Conversation history",
          "Streaming responses",
          "Customizable prompts",
          "User authentication",
          "Chat management",
          "Modern UI design",
          "Responsive layout",
          "TypeScript support",
          "Production-ready"
        ],
        demoUrl: "https://sveltekit-ai-chatbot.vercel.app",
        codeUrl: "https://github.com/jianyuan/sveltekit-ai-chatbot",
        deployment: {
          headline: "Deploy to Vercel with OpenAI",
          providers: ["Vercel", "Netlify"],
          env: ["OPENAI_API_KEY", "AUTH_SECRET"],
          notes: [
            "Configure OpenAI API key",
            "Set up authentication",
            "Deploy to Vercel",
            "Configure custom prompts"
          ]
        },
        useCases: [
          {
            name: "AI Assistants",
            description: "Build intelligent AI assistant applications."
          },
          {
            name: "Chat Applications",
            description: "Create modern chat applications with AI capabilities."
          },
          {
            name: "Productivity Tools",
            description: "Develop AI-powered productivity and workflow tools."
          }
        ]
      },
      {
        slug: "ai-fusion-kit",
        name: "AI Fusion Kit - Next.js AI Template",
        status: "Production-ready",
        category: "AI projects",
        summary: "A feature-rich, highly customizable AI Web App Template, empowered by Next.js",
        description: "A comprehensive AI web application template built with Next.js, featuring multiple AI integrations, modern UI components, and production-ready architecture. Supports various AI providers and includes advanced features like conversation management and customizable interfaces.",
        techStack: ["Next.js", "OpenAI", "Vercel AI SDK", "Tailwind CSS", "TypeScript"],
        features: [
          "Multiple AI provider support",
          "Vercel AI SDK integration",
          "Conversation management",
          "Customizable UI components",
          "Streaming responses",
          "Modern design system",
          "TypeScript support",
          "Responsive layout",
          "Production-ready",
          "Advanced AI features"
        ],
        demoUrl: "https://ai-fusion-kit.vercel.app",
        codeUrl: "https://github.com/nphivu414/ai-fusion-kit",
        deployment: {
          headline: "Deploy to Vercel with AI configuration",
          providers: ["Vercel", "Railway"],
          env: ["OPENAI_API_KEY", "ANTHROPIC_API_KEY"],
          notes: [
            "Configure AI provider APIs",
            "Set up Vercel AI SDK",
            "Deploy to Vercel",
            "Configure conversation settings"
          ]
        },
        useCases: [
          {
            name: "AI Applications",
            description: "Build comprehensive AI-powered web applications."
          },
          {
            name: "Conversational AI",
            description: "Create advanced conversational AI interfaces."
          },
          {
            name: "AI Toolkits",
            description: "Develop AI toolkits and platforms."
          }
        ]
      }
     ];
