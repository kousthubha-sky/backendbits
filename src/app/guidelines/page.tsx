"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Code, Github, Users, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-black mb-2">Contribution Guidelines</h1>
            <p className="text-gray-600">Learn how to contribute high-quality templates to our platform</p>
          </div>

          <div className="space-y-8">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Getting Started
                </CardTitle>
                <CardDescription>
                  Anyone can contribute templates to our platform. All submissions are reviewed by admins before being published.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <Code className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-semibold mb-1">1. Create Template</h3>
                    <p className="text-sm text-gray-600">Build your template following our standards</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Github className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <h3 className="font-semibold mb-1">2. Submit</h3>
                    <p className="text-sm text-gray-600">Upload to GitHub and submit via our platform</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <Star className="h-8 w-8 mx-auto mb-2 text-yellow-600" />
                    <h3 className="font-semibold mb-1">3. Get Reviewed</h3>
                    <p className="text-sm text-gray-600">Admins review and publish approved templates</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Template Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Template Requirements</CardTitle>
                <CardDescription>
                  Your template must meet these criteria to be considered for publication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Must-Have Requirements
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Complete, working code that can be cloned and run</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Clear, comprehensive README with setup instructions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Proper project structure and organization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Valid GitHub repository URL</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>No duplicate submissions of existing templates</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-600" />
                    Quality Standards
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>Clean, well-documented code</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>Proper error handling and validation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>Security best practices implemented</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>Responsive design (if applicable)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>Production-ready configuration</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* What Gets Accepted */}
            <Card>
              <CardHeader>
                <CardTitle>What We Accept</CardTitle>
                <CardDescription>
                  Types of templates that are welcome on our platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2 text-green-700">✅ Accepted</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Authentication systems</li>
                      <li>• Payment integrations</li>
                      <li>• API boilerplates</li>
                      <li>• Admin dashboards</li>
                      <li>• E-commerce solutions</li>
                      <li>• Blog platforms</li>
                      <li>• Chat applications</li>
                      <li>• AI/ML integrations</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2 text-red-700">❌ Not Accepted</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Malicious or harmful code</li>
                      <li>• Copyright violations</li>
                      <li>• Non-functional code</li>
                      <li>• Personal projects without value</li>
                      <li>• Templates with hardcoded secrets</li>
                      <li>• Unmaintained repositories</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Review Process */}
            <Card>
              <CardHeader>
                <CardTitle>Review Process</CardTitle>
                <CardDescription>
                  What happens after you submit your template
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold text-sm">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold">Submission Received</h4>
                      <p className="text-sm text-gray-600">Your template is submitted and enters the review queue.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 font-semibold text-sm">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold">Initial Review</h4>
                      <p className="text-sm text-gray-600">Admins check basic requirements and repository validity.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 font-semibold text-sm">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold">Quality Assessment</h4>
                      <p className="text-sm text-gray-600">Code quality, documentation, and functionality are evaluated.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 font-semibold text-sm">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold">Decision</h4>
                      <p className="text-sm text-gray-600">Template is approved and published, or feedback is provided for improvements.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Review Timeline</h4>
                  <p className="text-sm text-blue-800">
                    Most submissions are reviewed within 1-3 business days. Complex templates may take longer.
                    You will receive notifications about your submission status.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Code Standards */}
            <Card>
              <CardHeader>
                <CardTitle>Code Standards</CardTitle>
                <CardDescription>
                  Follow these standards to ensure your template meets our quality requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Repository Structure</h4>
                  <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                    <pre>{`your-template/
├── README.md          # Comprehensive documentation
├── package.json       # Dependencies and scripts
├── .gitignore         # Git ignore rules
├── src/               # Source code
│   ├── app.js         # Main application file
│   ├── routes/        # API routes
│   ├── models/        # Data models
│   └── middleware/    # Custom middleware
├── public/            # Static assets
├── config/            # Configuration files
└── tests/             # Test files`}</pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">README Requirements</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Project description and features</li>
                    <li>• Installation and setup instructions</li>
                    <li>• Usage examples</li>
                    <li>• API documentation (if applicable)</li>
                    <li>• Environment variables required</li>
                    <li>• Deployment instructions</li>
                    <li>• Contributing guidelines</li>
                    <li>• License information</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Security Checklist</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• No hardcoded secrets or credentials</li>
                    <li>• Input validation and sanitization</li>
                    <li>• HTTPS enforcement</li>
                    <li>• Secure session management</li>
                    <li>• SQL injection prevention</li>
                    <li>• XSS protection</li>
                    <li>• CSRF protection</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Getting Help */}
            <Card>
              <CardHeader>
                <CardTitle>Getting Help</CardTitle>
                <CardDescription>
                  Need assistance with your template submission?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Before Submitting</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Check existing templates</li>
                      <li>• Test your template thoroughly</li>
                      <li>• Follow our code standards</li>
                      <li>• Write comprehensive documentation</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">After Submitting</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Monitor your submission status</li>
                      <li>• Respond to review feedback</li>
                      <li>• Update your template if needed</li>
                      <li>• Contact admins for questions</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Ready to Contribute?</h4>
                  <p className="text-sm text-green-800 mb-3">
                    Follow these guidelines and submit your template. We are excited to see what you build!
                  </p>
                  <a
                    href="/contribute"
                    className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    Submit Your Template
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}