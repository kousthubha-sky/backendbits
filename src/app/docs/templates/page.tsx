import Link from 'next/link';
import { FileText, Code, Database, Globe, Smartphone, Cpu, ArrowRight } from 'lucide-react';

export default function TemplatesPage() {
  return (
    <div className="pb-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Templates
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Learn about our template structure, customization options, and best practices for development.
        </p>
      </div>

      {/* Template Structure */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Template Structure
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          All templates follow a consistent structure designed for maintainability and scalability.
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg font-mono text-sm">
          <pre className="text-gray-800 dark:text-gray-200">
{`template/
├── README.md              # Comprehensive documentation
├── package.json           # Dependencies and scripts
├── .env.example           # Environment variables template
├── .gitignore            # Git ignore rules
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── src/
│   ├── app/              # Next.js app router
│   │   ├── api/          # API routes
│   │   ├── (auth)/       # Authentication pages
│   │   ├── dashboard/    # Protected pages
│   │   └── layout.tsx    # Root layout
│   ├── components/       # Reusable components
│   ├── lib/              # Utility functions
│   │   ├── auth.ts       # Authentication logic
│   │   ├── db.ts         # Database connection
│   │   └── utils.ts      # Helper functions
│   └── middleware.ts     # Next.js middleware
├── public/               # Static assets
└── tests/                # Test files`}
          </pre>
        </div>
      </section>

      {/* Template Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Template Categories
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Choose from various template categories based on your project needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Globe className="h-8 w-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Web Applications</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Full-stack web applications with authentication, databases, and modern UI.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• User authentication</li>
              <li>• Database integration</li>
              <li>• Responsive design</li>
              <li>• API endpoints</li>
            </ul>
          </div>

          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Smartphone className="h-8 w-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Mobile-First</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Templates optimized for mobile devices with touch-friendly interfaces.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Mobile-responsive design</li>
              <li>• Touch gestures</li>
              <li>• Progressive Web App (PWA)</li>
              <li>• Offline support</li>
            </ul>
          </div>

          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Database className="h-8 w-8 text-purple-600 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">API-Only</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Backend-only templates focused on API development and data management.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• RESTful API design</li>
              <li>• Database schemas</li>
              <li>• Authentication middleware</li>
              <li>• API documentation</li>
            </ul>
          </div>

          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Cpu className="h-8 w-8 text-orange-600 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Microservices</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Modular templates designed for microservice architectures.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Service separation</li>
              <li>• Message queues</li>
              <li>• Container support</li>
              <li>• Service discovery</li>
            </ul>
          </div>

          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Code className="h-8 w-8 text-red-600 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Developer Tools</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Templates for development tools, CLIs, and developer productivity.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• CLI applications</li>
              <li>• Code generators</li>
              <li>• Development servers</li>
              <li>• Testing frameworks</li>
            </ul>
          </div>

          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <FileText className="h-8 w-8 text-indigo-600 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Documentation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Templates for creating documentation sites and knowledge bases.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Markdown support</li>
              <li>• Search functionality</li>
              <li>• Version control</li>
              <li>• Multi-language support</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Customization */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Customization Guide
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Learn how to customize templates to fit your specific requirements.
        </p>

        <div className="space-y-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Configuration Files</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Modify configuration files to change database connections, API endpoints, and application settings.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Key Files to Modify:</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li><code>src/lib/db.ts</code> - Database connection settings</li>
                <li><code>src/lib/auth.ts</code> - Authentication configuration</li>
                <li><code>.env</code> - Environment variables</li>
                <li><code>tailwind.config.js</code> - Styling configuration</li>
              </ul>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Component Customization</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Modify existing components or create new ones to match your design requirements.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Component Structure:</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li><code>src/components/ui/</code> - Reusable UI components</li>
                <li><code>src/components/</code> - Application-specific components</li>
                <li><code>src/app/</code> - Page components and layouts</li>
              </ul>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Database Schema</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Modify database schemas to add new fields, tables, or relationships.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Database Files:</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li><code>src/lib/db/schema.ts</code> - Database schema definitions</li>
                <li><code>src/lib/db/migrations/</code> - Database migration files</li>
                <li><code>src/lib/db/seed.ts</code> - Database seeding scripts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Development Best Practices
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Follow these guidelines to maintain code quality and ensure your template remains maintainable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Code Organization</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• Keep components small and focused</li>
              <li>• Use TypeScript for type safety</li>
              <li>• Follow consistent naming conventions</li>
              <li>• Separate business logic from UI components</li>
              <li>• Use environment variables for configuration</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Performance</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• Optimize images and assets</li>
              <li>• Implement proper caching strategies</li>
              <li>• Use lazy loading for components</li>
              <li>• Minimize bundle size</li>
              <li>• Implement proper error boundaries</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Security</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• Validate all user inputs</li>
              <li>• Use HTTPS in production</li>
              <li>• Implement proper authentication</li>
              <li>• Sanitize database queries</li>
              <li>• Keep dependencies updated</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Testing</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• Write unit tests for components</li>
              <li>• Test API endpoints thoroughly</li>
              <li>• Include integration tests</li>
              <li>• Test authentication flows</li>
              <li>• Validate form inputs</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contributing */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Contributing Templates
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Help grow our template collection by contributing your own templates.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Ready to Contribute?
          </h3>
          <p className="text-blue-800 dark:text-blue-200 mb-4">
            Share your templates with the community and help other developers get started faster.
          </p>
          <Link
            href="/contribute"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Submit Your Template
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}