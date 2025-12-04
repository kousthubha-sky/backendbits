import Link from 'next/link';
import { Users, Github, CheckCircle, Star, MessageSquare, FileText, Code, Zap } from 'lucide-react';

export default function ContributingPage() {
  return (
    <div className="pb-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Contributing
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Learn how to contribute to our platform, submit templates, and help grow the community.
        </p>
      </div>

      {/* Why Contribute */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Why Contribute?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Contributing to our platform helps developers worldwide build better applications faster.
          Your contributions make a real difference in the developer community.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Users className="h-8 w-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Help Others</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Share your knowledge and help other developers solve problems faster.
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Star className="h-8 w-8 text-yellow-600 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Build Reputation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Gain recognition in the developer community and showcase your expertise.
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Zap className="h-8 w-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Improve Skills</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Learn from code reviews and collaborate with experienced developers.
            </p>
          </div>
        </div>
      </section>

      {/* Ways to Contribute */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Ways to Contribute
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          There are many ways to contribute to our platform, from submitting templates to improving documentation.
        </p>

        <div className="space-y-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <FileText className="h-8 w-8 text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Submit Templates</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Share your production-ready backend templates with the community. Templates should be well-documented,
                  tested, and follow our quality standards.
                </p>
                <Link
                  href="/contribute"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Submit a Template
                  <CheckCircle className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <Code className="h-8 w-8 text-green-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Improve Code Quality</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Help improve existing templates by fixing bugs, optimizing performance, or adding new features.
                  All contributions go through our review process.
                </p>
                <a
                  href="https://github.com"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                  <Github className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <MessageSquare className="h-8 w-8 text-purple-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Improve Documentation</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Help make our documentation better by fixing errors, adding examples, or translating to other languages.
                  Good documentation is crucial for developer experience.
                </p>
                <Link
                  href="/docs"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  View Documentation
                  <FileText className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <Users className="h-8 w-8 text-orange-600 mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Community Support</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Help other developers by answering questions, providing feedback on templates, and participating
                  in community discussions.
                </p>
                <Link
                  href="/docs"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Join Community
                  <Users className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contribution Guidelines */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Contribution Guidelines
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Follow these guidelines to ensure your contributions are accepted and valuable to the community.
        </p>

        <div className="space-y-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">For Template Submissions</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Production Ready:</strong> Templates must be complete, working, and ready for production use.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Well Documented:</strong> Include comprehensive README with setup instructions and usage examples.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Secure:</strong> Follow security best practices and avoid hardcoded secrets.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Tested:</strong> Include tests and ensure the template works as expected.
                </p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Code Contribution Guidelines</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Follow Code Style:</strong> Maintain consistent code style and formatting.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Write Tests:</strong> Add tests for new features and ensure existing tests pass.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Update Documentation:</strong> Keep documentation in sync with code changes.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Use Clear Commit Messages:</strong> Write descriptive commit messages explaining changes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Review Process */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Review Process
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          All contributions go through a review process to ensure quality and consistency.
        </p>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 font-semibold text-sm">
              1
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Submission</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                You submit your contribution through our platform or GitHub.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 font-semibold text-sm">
              2
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Initial Review</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Our team reviews your submission for basic requirements and quality standards.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 font-semibold text-sm">
              3
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Community Feedback</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Community members may provide feedback and suggestions for improvement.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 font-semibold text-sm">
              4
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Approval & Publication</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Approved contributions are published and made available to the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Getting Started
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Ready to start contributing? Here&apos;s how to get started with your first contribution.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-4">
            Start Contributing Today
          </h3>
          <div className="space-y-3">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              1. <Link href="/contribute" className="underline">Submit your first template</Link> to get familiar with the process
            </p>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              2. <a href="https://github.com" className="underline" target="_blank" rel="noopener noreferrer">Browse our GitHub</a> for issues to work on
            </p>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              3. <Link href="/docs" className="underline">Read our documentation</Link> to understand our standards
            </p>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              4. Join our community and ask questions when you need help
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Have questions about contributing? <Link href="/docs" className="text-blue-600 dark:text-blue-400 hover:underline">Check our documentation</Link> or contact our team.
          </p>
        </div>
      </section>
    </div>
  );
}