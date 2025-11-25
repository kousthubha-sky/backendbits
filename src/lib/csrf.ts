import { randomBytes } from 'crypto';

/**
 * CSRF Protection Utilities
 * Provides basic CSRF token generation and validation
 */

const CSRF_TOKEN_LENGTH = 32;
const CSRF_TOKEN_EXPIRY = 60 * 60 * 1000; // 1 hour

interface CSRFToken {
  token: string;
  expires: number;
}

// In production, use Redis or database to store tokens
// For now, we'll use a simple in-memory store (not suitable for production)
const tokenStore = new Map<string, CSRFToken>();

/**
 * Generate a new CSRF token for a session
 */
export function generateCSRFToken(sessionId: string): string {
  const token = randomBytes(CSRF_TOKEN_LENGTH).toString('hex');
  const expires = Date.now() + CSRF_TOKEN_EXPIRY;

  tokenStore.set(sessionId, { token, expires });

  // Clean up expired tokens
  cleanupExpiredTokens();

  return token;
}

/**
 * Validate a CSRF token
 */
export function validateCSRFToken(sessionId: string, token: string): boolean {
  const storedToken = tokenStore.get(sessionId);

  if (!storedToken) {
    return false;
  }

  // Check if token is expired
  if (Date.now() > storedToken.expires) {
    tokenStore.delete(sessionId);
    return false;
  }

  // Check if token matches
  if (storedToken.token !== token) {
    return false;
  }

  // Token is valid, remove it (one-time use)
  tokenStore.delete(sessionId);
  return true;
}

/**
 * Clean up expired tokens
 */
function cleanupExpiredTokens(): void {
  const now = Date.now();
  for (const [sessionId, tokenData] of tokenStore.entries()) {
    if (now > tokenData.expires) {
      tokenStore.delete(sessionId);
    }
  }
}

// Clean up expired tokens every 10 minutes
setInterval(cleanupExpiredTokens, 10 * 60 * 1000);

/**
 * Middleware to check CSRF tokens for state-changing requests
 */
export function requireCSRFToken(request: Request, sessionId: string): boolean {
  // Only require CSRF for state-changing methods
  const stateChangingMethods = ['POST', 'PUT', 'DELETE', 'PATCH'];
  if (!stateChangingMethods.includes(request.method)) {
    return true; // Allow GET, HEAD, OPTIONS
  }

  // Skip CSRF for API routes that handle file uploads or special cases
  const url = new URL(request.url);
  if (url.pathname.startsWith('/api/auth/') ||
      url.pathname.includes('/upload') ||
      url.pathname.includes('/webhook')) {
    return true;
  }

  // Check for CSRF token in headers
  const csrfToken = request.headers.get('x-csrf-token') ||
                   request.headers.get('csrf-token');

  if (!csrfToken) {
    return false;
  }

  return validateCSRFToken(sessionId, csrfToken);
}