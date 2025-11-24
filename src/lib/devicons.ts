const DEFAULT_ICON = "devicon-code-plain";

const DEVICON_MAP: Record<string, string> = {
  "next.js": "devicon-nextjs-original",
  "next.js api routes": "devicon-nextjs-original",
  "next.js 14": "devicon-nextjs-original",
  "next.js 15": "devicon-nextjs-original",
  "next.js 16": "devicon-nextjs-original",
  "react": "devicon-react-original",
  "react router": "devicon-react-original",
  "react router v7": "devicon-react-original",
  "vue": "devicon-vuejs-plain",
  "vue.js": "devicon-vuejs-plain",
  "tailwind css": "devicon-tailwindcss-plain",
  "typescript": "devicon-typescript-original",
  "javascript": "devicon-javascript-plain",
  "tanstack query": "devicon-react-original",
  "vite": "devicon-vitejs-plain",
  "better auth": "devicon-nodejs-plain",
  "mongodb": "devicon-mongodb-plain",
  "mongodb atlas": "devicon-mongodb-plain",
  "mysql": "devicon-mysql-plain",
  "postgresql": "devicon-postgresql-plain",
  "supabase": "devicon-postgresql-plain",
  "redis": "devicon-redis-plain",
  "auth0": "devicon-auth0-plain",
  "zod": "devicon-nodejs-plain",
  "resend": "devicon-nodejs-plain",
  "google gemini api": "devicon-google-plain",
  "lucide react": "devicon-react-original",
  "shadcn/ui": "devicon-react-original",
  "framer motion": "devicon-react-original",
  "geist": "devicon-css3-plain",
  "fastapi": "devicon-python-plain",
  "razorpay": "devicon-nodejs-plain",
  "python": "devicon-python-plain",
  "go": "devicon-go-plain",
  "golang": "devicon-go-plain",
  "rust": "devicon-rust-plain",
  "java": "devicon-java-plain",
  "kotlin": "devicon-kotlin-plain",
  "swift": "devicon-swift-plain",
  "c#": "devicon-csharp-plain",
  "c++": "devicon-cplusplus-plain",
  "php": "devicon-php-plain",
  "ruby": "devicon-ruby-plain",
  "dart": "devicon-dart-plain",
  "svelte": "devicon-svelte-plain",
  "astro": "devicon-astro-plain",
  "graphql": "devicon-graphql-plain",
  "prisma": "devicon-prisma-original",
  "docker": "devicon-docker-plain",
  "node.js": "devicon-nodejs-plain",
  "express": "devicon-express-original",
  "bun": "devicon-bun-line",
  "html": "devicon-html5-plain",
  "css": "devicon-css3-plain",
  "puter.js": "devicon-javascript-plain",
  "shadcn ui": "devicon-react-original",
  "lucia": "devicon-nodejs-plain",
};

const KEYWORD_ICON_MAP: Array<{ regex: RegExp; icon: string }> = [
  { regex: /next\.js/, icon: "devicon-nextjs-original" },
  { regex: /react/, icon: "devicon-react-original" },
  { regex: /tailwind/, icon: "devicon-tailwindcss-plain" },
  { regex: /typescript/, icon: "devicon-typescript-original" },
  { regex: /javascript/, icon: "devicon-javascript-plain" },
  { regex: /python/, icon: "devicon-python-plain" },
  { regex: /golang|\bgo\b/, icon: "devicon-go-plain" },
  { regex: /rust/, icon: "devicon-rust-plain" },
  { regex: /mongo/, icon: "devicon-mongodb-plain" },
  { regex: /sql/, icon: "devicon-postgresql-plain" },
  { regex: /node/, icon: "devicon-nodejs-plain" },
  { regex: /vue/, icon: "devicon-vuejs-plain" },
  { regex: /svelte/, icon: "devicon-svelte-plain" },
  { regex: /astro/, icon: "devicon-astro-plain" },
  { regex: /graphql/, icon: "devicon-graphql-plain" },
  { regex: /docker/, icon: "devicon-docker-plain" },
  { regex: /kotlin/, icon: "devicon-kotlin-plain" },
  { regex: /swift/, icon: "devicon-swift-plain" },
  { regex: /ruby/, icon: "devicon-ruby-plain" },
  { regex: /php/, icon: "devicon-php-plain" },
  { regex: /dart/, icon: "devicon-dart-plain" },
  { regex: /html/, icon: "devicon-html5-plain" },
  { regex: /css/, icon: "devicon-css3-plain" },
];

export function getDeviconClass(tech: string | undefined | null): string {
  if (!tech) {
    return DEFAULT_ICON;
  }

  const normalized = tech.trim().toLowerCase();

  if (!normalized) {
    return DEFAULT_ICON;
  }

  if (DEVICON_MAP[normalized]) {
    return DEVICON_MAP[normalized];
  }

  const keywordMatch = KEYWORD_ICON_MAP.find(({ regex }) => regex.test(normalized));
  if (keywordMatch) {
    return keywordMatch.icon;
  }

  return DEFAULT_ICON;
}
