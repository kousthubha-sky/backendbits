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
  const { pathname } = request.nextUrl;

  // Protected routes that require authentication
  const protectedRoutes = [
    '/admin',
    '/profile',
    '/contribute'
  ];

  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    // Check for Better Auth session cookie
    const sessionCookie = request.cookies.get('better-auth.session_token');

    if (!sessionCookie) {
      // Redirect to login for protected routes
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Rate limiting for API routes
  if (pathname.startsWith('/api/')) {


    // Rate limiting: In production, implement with Redis or similar
    // For now, rely on API validation

    // Add security headers
    const response = NextResponse.next();

    // Prevent clickjacking
    response.headers.set('X-Frame-Options', 'DENY');

    // Prevent MIME type sniffing
    response.headers.set('X-Content-Type-Options', 'nosniff');

    // Enable XSS protection
    response.headers.set('X-XSS-Protection', '1; mode=block');

    // Referrer policy
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.).*)',
  ]
};