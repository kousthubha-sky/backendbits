"use client";

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  BookOpen,
  ChevronRight,
  Home,
  User,
  Code,
  Settings,
  Shield,
  Zap,
  Github,
  FileText,
  Users,
  Star,
  HelpCircle
} from 'lucide-react';

const docsNavigation = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction', href: '/docs', icon: Home },
      { title: 'Quick Start', href: '/docs/quick-start', icon: Zap },
    ],
  },
  {
    title: 'Core Features',
    items: [
      { title: 'Templates', href: '/docs/templates', icon: FileText },
      { title: 'Authentication', href: '/docs/authentication', icon: Shield },
      { title: 'User Profile', href: '/docs/user-profile', icon: User },
      { title: 'Contributing', href: '/docs/contributing', icon: Users },
    ],
  },
];

interface DocsLayoutProps {
  children: ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />

      <div className="pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex">
            {/* Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-32 h-[calc(100vh-8rem)] overflow-y-auto">
                <nav className="space-y-8">
                  {docsNavigation.map((section) => (
                    <div key={section.title}>
                      <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {section.title}
                      </h3>
                      <div className="mt-2 space-y-1">
                        {section.items.map((item) => {
                          const Icon = item.icon;
                          const isActive = pathname === item.href;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                                isActive
                                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                              )}
                            >
                              <Icon className="mr-3 h-4 w-4 flex-shrink-0" />
                              {item.title}
                              {isActive && (
                                <ChevronRight className="ml-auto h-4 w-4" />
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </nav>

                {/* GitHub Link */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    href="https://github.com"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white rounded-md transition-colors"
                  >
                    <Github className="mr-3 h-4 w-4" />
                    View on GitHub
                  </Link>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0 lg:pl-8">
              <div className="max-w-3xl">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}