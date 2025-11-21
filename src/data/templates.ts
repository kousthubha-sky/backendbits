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
  }
];
