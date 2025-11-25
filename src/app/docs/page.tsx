import Link from 'next/link';
import { ArrowRight, Code, Github, Users, Star, Zap, Shield, BookOpen } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="pb-16">
      {/* Hero Section */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Backend Templates Documentation
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Learn how to use our production-ready backend templates to ship faster and build better applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/docs/quick-start"
                className="inline-flex items-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-medium"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/templates"
                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
              >
                Browse Templates
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-16">
        <div className="max-w-3xl">
          {/* What is this platform */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              What is Backend Templates?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Backend Templates is a curated collection of production-ready backend templates built with modern technologies.
              Each template includes everything you need to get started quickly: authentication, database setup, API endpoints,
              and deployment configurations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <Code className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Production Ready</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Templates are built with best practices and are ready for production deployment.
                </p>
              </div>
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <Shield className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Secure by Default</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Includes authentication, input validation, and security best practices.
                </p>
              </div>
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <Zap className="h-8 w-8 text-yellow-600 mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quick Setup</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Get up and running in minutes with comprehensive documentation.
                </p>
              </div>
              <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                <Users className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Community Driven</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Contribute your own templates and help grow the community.
                </p>
              </div>
            </div>
          </section>

          {/* Quick Links */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Popular Topics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href="/docs/quick-start"
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    Quick Start Guide
                  </h3>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Get your first template running in under 5 minutes.
                </p>
              </Link>

              <Link
                href="/docs/authentication"
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    Authentication
                  </h3>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Learn about user authentication and session management.
                </p>
              </Link>

              <Link
                href="/docs/contributing"
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    Contributing
                  </h3>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Share your templates with the community.
                </p>
              </Link>

              <Link
                href="/docs/user-profile"
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors group"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    User Profile
                  </h3>
                  <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Manage your profile and account settings.
                </p>
              </Link>
            </div>
          </section>

          {/* Getting Help */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Need Help?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Documentation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Browse our comprehensive guides and tutorials.
                </p>
                <Link
                  href="/docs"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                >
                  Read Docs →
                </Link>
              </div>

              <div className="text-center">
                <Github className="h-12 w-12 text-gray-900 dark:text-white mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">GitHub Issues</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Report bugs or request features on GitHub.
                </p>
                <a
                  href="https://github.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Issue →
                </a>
              </div>

              <div className="text-center">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Community</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Join our community for discussions and support.
                </p>
                <Link
                  href="/contribute"
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
                >
                  Join Community →
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}