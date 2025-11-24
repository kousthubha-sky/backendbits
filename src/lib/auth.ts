import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getAuthDatabaseSync } from "@/lib/mongodb";

// Validate required environment variables
if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error('Missing required environment variable: BETTER_AUTH_SECRET');
}

const authDatabase = getAuthDatabaseSync();

export const auth = betterAuth({
  database: mongodbAdapter(authDatabase),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET ? {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  } : undefined,
  secret: process.env.BETTER_AUTH_SECRET,
});