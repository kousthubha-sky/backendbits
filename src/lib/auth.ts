import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient, Db } from "mongodb";

// Validate required environment variables
if (!process.env.BETTER_AUTH_SECRET) {
  throw new Error('Missing required environment variable: BETTER_AUTH_SECRET');
}

if (!process.env.MONGODB_URI) {
  throw new Error('Missing required environment variable: MONGODB_URI');
}

let cachedDb: Db | null = null;

function getDatabase(): Db {
  if (cachedDb) {
    return cachedDb;
  }

  const client = new MongoClient(process.env.MONGODB_URI!, {
    appName: "backend-bits-auth",
  });

  cachedDb = client.db(process.env.MONGODB_DB || "backend-bits-auth");
  return cachedDb;
}

export const auth = betterAuth({
  database: mongodbAdapter(getDatabase()),
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