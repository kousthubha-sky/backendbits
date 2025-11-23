import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { toNextJsHandler } from "better-auth/next-js";
import clientPromise from "@/lib/mongodb";

const db = (await clientPromise).db(process.env.MONGODB_DB || "backend-bits-auth");

const auth = betterAuth({
    database: mongodbAdapter(db),
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

export const { POST, GET } = toNextJsHandler(auth);