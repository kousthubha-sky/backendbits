import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { getAuthDatabaseSync } from "./mongodb";

// Validate required environment variables
if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error('Missing required environment variable: BETTER_AUTH_SECRET');
}

export const auth = betterAuth({
  database: mongodbAdapter(getAuthDatabaseSync()),
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
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "user",
        required: false,
      },
      reputationScore: {
        type: "number",
        defaultValue: 0,
        required: false,
      },
      githubUsername: {
        type: "string",
        required: false,
      },
      avatarUrl: {
        type: "string",
        required: false,
      },
      bio: {
        type: "string",
        required: false,
      },
      website: {
        type: "string",
        required: false,
      },
      location: {
        type: "string",
        required: false,
      },
      skills: {
        type: "string[]",
        required: false,
      },
      isVerified: {
        type: "boolean",
        defaultValue: false,
        required: false,
      },
      verificationBadge: {
        type: "string",
        required: false,
      },
      joinedDate: {
        type: "date",
        defaultValue: () => new Date(),
        required: false,
      },
      lastActive: {
        type: "date",
        defaultValue: () => new Date(),
        required: false,
      },
    },
  },
});