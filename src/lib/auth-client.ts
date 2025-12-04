import { createAuthClient } from "better-auth/react";
import type { Session } from "better-auth";

export const authClient = createAuthClient({
  baseURL: typeof window !== 'undefined'
    ? window.location.origin
    : process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3000'
});

export const { useSession, signIn, signOut, signUp } = authClient;
export type { Session };