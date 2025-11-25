import Link from 'next/link';
import { CheckCircle, ArrowRight, Github, Code, Settings } from 'lucide-react';

export default function QuickStartPage() {
  return (
    <div className="pb-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Quick Start Guide
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Get your first backend template running in under 5 minutes.
        </p>
      </div>

      {/* Prerequisites */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Prerequisites
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Before you begin, make sure you have the following installed:
        </p>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Node.js 18+</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Download from <a href="https://nodejs.org" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">nodejs.org</a>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Git</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Version control system for cloning repositories
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Code Editor</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                VS Code, WebStorm, or any editor of your choice
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Step by Step */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Step-by-Step Setup
        </h2>

        <div className="space-y-8">
          {/* Step 1 */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                1
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Choose a Template
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Browse our collection of templates and select one that fits your needs.
                </p>
                <Link
                  href="/templates"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Browse Templates
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                2
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Clone the Repository
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Copy the template to your local machine using Git.
                </p>
                <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4">
                  <code className="text-green-400 text-sm">
                    git clone https://github.com/username/template-repo.git<br />
                    cd template-repo
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                3
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Install Dependencies
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Install all required packages using npm or yarn.
                </p>
                <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4">
                  <code className="text-green-400 text-sm">
                    npm install
                  </code>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Or if you prefer yarn: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs">yarn install</code>
                </p>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                4
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Set Up Environment Variables
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Copy the environment file and configure your settings.
                </p>
                <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4 mb-4">
                  <code className="text-green-400 text-sm">
                    cp .env.example .env
                  </code>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Edit the <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">.env</code> file with your database credentials,
                  API keys, and other configuration values.
                </p>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                5
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Start the Development Server
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Run the application in development mode.
                </p>
                <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-4">
                  <code className="text-green-400 text-sm">
                    npm run dev
                  </code>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  The application will start on <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded text-xs">http://localhost:3000</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Next Steps
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Once your template is running, here are some things you can do next:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Code className="h-8 w-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Customize the Code
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Modify the template to fit your specific requirements.
            </p>
            <Link
              href="/docs/templates"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
            >
              Learn about customization →
            </Link>
          </div>

          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Settings className="h-8 w-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Configure for Production
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Set up databases, environment variables, and deployment.
            </p>
            <Link
              href="/docs/best-practices"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
            >
              Production best practices →
            </Link>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Having Issues?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          If you encounter problems during setup, check our troubleshooting guide or get help from the community.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/docs/troubleshooting"
            className="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            Troubleshooting Guide
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <a
            href="https://github.com"
            className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="mr-2 h-4 w-4" />
            Report Issue
          </a>
        </div>
      </section>
    </div>
  );
}