import { NextRequest, NextResponse } from "next/server";

/**
 * Edge-compatible middleware for route protection
 * 
 * SECURITY NOTE: This middleware provides basic route protection by checking
 * for the presence of Better Auth session cookies. Better Auth cookies are:
 * - Signed and encrypted by Better Auth
 * - Validated server-side in pages for actual authorization
 * - This is a performance optimization to avoid database calls in Edge Runtime
 * 
 * The security model is:
 * 1. Middleware: Basic cookie presence check (Edge Runtime compatible)
 * 2. Server Components: Full session validation with database (Node.js runtime)
 */
export async function middleware(request: NextRequest) {
  // Add protected routes here as needed
  // Example: if (request.nextUrl.pathname.startsWith('/dashboard')) { ... }
  
  // For now, no routes are protected by default
  // Authentication state is handled by the navbar and individual pages
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply middleware to specific protected routes only
    // Currently no routes protected - auth is optional
    // Add routes here as needed: '/dashboard/:path*'
  ]
};