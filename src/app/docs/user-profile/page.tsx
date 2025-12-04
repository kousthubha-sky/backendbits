import Link from 'next/link';
import { User, Settings, Shield, Github, Eye, Lock } from 'lucide-react';

export default function UserProfilePage() {
  return (
    <div className="pb-16">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          User Profile
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Learn about user profile management, customization options, and privacy settings.
        </p>
      </div>

      {/* Profile Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Profile Overview
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Every user has a profile that contains their personal information, preferences, and activity history.
          Profiles help personalize the experience and track contributions to the platform.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <User className="h-8 w-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Personal Information</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Name, email, bio, and profile picture management.
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Settings className="h-8 w-8 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Preferences</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Notification settings, theme preferences, and display options.
            </p>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
            <Shield className="h-8 w-8 text-purple-600 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Privacy & Security</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Account security settings and privacy controls.
            </p>
          </div>
        </div>
      </section>

      {/* Accessing Your Profile */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Accessing Your Profile
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          You can access and manage your profile through several ways on the platform.
        </p>

        <div className="space-y-4">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">From the Navigation</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Click on your profile picture or name in the top navigation bar to access your profile menu.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Navigation → Profile Picture → &ldquo;View Profile&rdquo; or &ldquo;Settings&rdquo;
              </p>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Direct URL</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You can also access your profile directly using the profile URL.
            </p>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <code className="text-sm text-gray-800 dark:text-gray-200">
                /profile
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Information */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Profile Information
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your profile contains various information that you can customize and manage.
        </p>

        <div className="space-y-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <User className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Basic Information</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  Essential information that identifies you on the platform.
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li><strong>Display Name:</strong> Your public name shown to other users</li>
                  <li><strong>Email:</strong> Your account email (used for notifications)</li>
                  <li><strong>Username:</strong> Unique identifier for your profile</li>
                  <li><strong>Bio:</strong> Short description about yourself</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <Github className="h-6 w-6 text-gray-900 dark:text-white mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Social Links</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  Connect your social profiles and professional accounts.
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li><strong>GitHub:</strong> Link to your GitHub profile</li>
                  <li><strong>LinkedIn:</strong> Professional networking profile</li>
                  <li><strong>Website:</strong> Personal or professional website</li>
                  <li><strong>Twitter:</strong> Social media presence</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <Settings className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Account Settings</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  Manage your account preferences and behavior.
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li><strong>Theme:</strong> Light, dark, or system preference</li>
                  <li><strong>Language:</strong> Interface language preference</li>
                  <li><strong>Timezone:</strong> Your local timezone for dates</li>
                  <li><strong>Email Notifications:</strong> Control what emails you receive</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Visibility */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Profile Visibility
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Control what information is visible to other users and how your profile appears.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <Eye className="h-8 w-8 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Public Information</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Display name and username</li>
              <li>• Profile picture and bio</li>
              <li>• Social media links</li>
              <li>• Public contributions and templates</li>
              <li>• Join date and activity status</li>
            </ul>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <Lock className="h-8 w-8 text-red-600 mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Private Information</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Email address</li>
              <li>• Password and security settings</li>
              <li>• Private API keys</li>
              <li>• Account verification status</li>
              <li>• Administrative permissions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Managing Your Profile */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Managing Your Profile
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Learn how to update and maintain your profile information.
        </p>

        <div className="space-y-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Editing Profile Information</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Update your profile details through the profile settings page.
            </p>
            <ol className="list-decimal list-inside text-sm text-gray-600 dark:text-gray-300 space-y-2">
              <li>Navigate to your profile page</li>
              <li>Click the &ldquo;Edit Profile&rdquo; button</li>
              <li>Update your information in the form</li>
              <li>Save your changes</li>
            </ol>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Changing Your Password</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Maintain account security by regularly updating your password.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Go to Settings → Security → Change Password
              </p>
            </div>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Profile Picture Guidelines</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Choose a clear, professional profile picture that represents you well.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Use a clear, high-quality image</li>
              <li>• Face should be clearly visible</li>
              <li>• Avoid offensive or inappropriate content</li>
              <li>• File size limit: 5MB</li>
              <li>• Supported formats: JPG, PNG, GIF</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Privacy & Security
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your privacy and security are important to us. Learn about the measures we take to protect your data.
        </p>

        <div className="space-y-6">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Data Protection</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We implement industry-standard security measures to protect your personal information.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• End-to-end encryption for sensitive data</li>
              <li>• Regular security audits and updates</li>
              <li>• Secure password hashing (bcrypt)</li>
              <li>• HTTPS encryption for all connections</li>
            </ul>
          </div>

          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Your Privacy Rights</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You have control over your data and how it&apos;s used on our platform.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Right to access your personal data</li>
              <li>• Right to correct inaccurate information</li>
              <li>• Right to delete your account and data</li>
              <li>• Right to data portability</li>
            </ul>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Need Help?</h3>
            <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-4">
              If you have questions about your profile or need assistance, contact our support team.
            </p>
            <Link
              href="/docs"
              className="text-yellow-800 dark:text-yellow-200 hover:underline text-sm font-medium"
            >
              Visit our documentation →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}