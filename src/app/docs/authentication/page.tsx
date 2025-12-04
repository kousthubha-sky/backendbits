import Link from 'next/link';
import { Shield, Key, User, Lock, Eye } from 'lucide-react';

export default function AuthenticationPage() {
  return (
    <div className="pb-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Authentication
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Learn about user authentication, session management, and security features in our templates.
        </p>
      </div>

      {/* Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Authentication Overview
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Our templates include comprehensive authentication systems built with modern security practices.
          All templates support user registration, login, password reset, and session management.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Shield className="h-8 w-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Secure by Default</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Password hashing, CSRF protection, and secure session handling.
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Key className="h-8 w-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Multiple Providers</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Support for email/password and OAuth providers like Google, GitHub.
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <User className="h-8 w-8 text-purple-600 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">User Management</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              User profiles, roles, and permissions built-in.
            </p>
          </div>
        </div>
      </section>

      {/* Authentication Flow */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Authentication Flow
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Understanding how authentication works in our templates.
        </p>

        <div className="space-y-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">1. User Registration</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Users can create accounts with email and password. The system validates input,
              hashes passwords securely, and sends verification emails.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <pre className="text-sm text-gray-800 dark:text-gray-200">
{`POST /api/auth/register
{
  "email": "user@example.com",
  "password": "securepassword123",
  "name": "John Doe"
}`}
              </pre>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">2. User Login</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Authenticates users and creates secure sessions. Returns JWT tokens or session cookies.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <pre className="text-sm text-gray-800 dark:text-gray-200">
{`POST /api/auth/login
{
  "email": "user@example.com",
  "password": "securepassword123"
}`}
              </pre>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">3. Session Management</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Sessions are managed securely with automatic expiration and refresh capabilities.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <pre className="text-sm text-gray-800 dark:text-gray-200">
{`GET /api/auth/session
Authorization: Bearer <token>

Response:
{
  "user": { "id": 1, "email": "user@example.com" },
  "expires": "2024-12-31T23:59:59Z"
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Security Features
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Built-in security measures to protect your application and users.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Password Security
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• Bcrypt password hashing with salt rounds</li>
              <li>• Minimum password requirements</li>
              <li>• Password reset functionality</li>
              <li>• Account lockout after failed attempts</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Session Security
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• Secure HTTP-only cookies</li>
              <li>• CSRF protection tokens</li>
              <li>• Session expiration and renewal</li>
              <li>• Secure headers (HSTS, CSP, etc.)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Input Validation
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• Email format validation</li>
              <li>• SQL injection prevention</li>
              <li>• XSS protection</li>
              <li>• Rate limiting on auth endpoints</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Key className="h-5 w-5" />
              API Security
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• JWT token authentication</li>
              <li>• API key management</li>
              <li>• Request signing for sensitive operations</li>
              <li>• Audit logging for security events</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Configuration */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Configuration
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Configure authentication settings for your environment.
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Environment Variables</h3>
          <div className="space-y-3">
            <div>
              <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">NEXTAUTH_SECRET</code>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Secret key for JWT token signing. Generate a random string.
              </p>
            </div>
            <div>
              <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">NEXTAUTH_URL</code>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Your application&apos;s base URL for authentication callbacks.
              </p>
            </div>
            <div>
              <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">DATABASE_URL</code>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Database connection string for user data storage.
              </p>
            </div>
            <div>
              <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">EMAIL_SERVER</code>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                SMTP server configuration for email verification.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OAuth Providers */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          OAuth Providers
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Configure social login with popular OAuth providers.
        </p>

        <div className="space-y-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Google OAuth</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Allow users to sign in with their Google accounts.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
              <p className="text-sm font-medium mb-2">Required Environment Variables:</p>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li><code>GOOGLE_CLIENT_ID</code> - From Google Cloud Console</li>
                <li><code>GOOGLE_CLIENT_SECRET</code> - From Google Cloud Console</li>
              </ul>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">GitHub OAuth</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Allow users to sign in with their GitHub accounts.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded">
              <p className="text-sm font-medium mb-2">Required Environment Variables:</p>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li><code>GITHUB_CLIENT_ID</code> - From GitHub OAuth Apps</li>
                <li><code>GITHUB_CLIENT_SECRET</code> - From GitHub OAuth Apps</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Next Steps
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Learn more about authentication and related features.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/docs/api"
            className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">API Reference</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Complete API documentation for authentication endpoints.
            </p>
          </Link>

          <Link
            href="/docs/best-practices"
            className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Security Best Practices</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Advanced security configurations and recommendations.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}