import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { ClientLayout } from "@/components/client-layout";

import "@/lib/env"; // Validate environment variables on startup
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Stack-End - Production-Ready Backend Templates & Boilerplates",
    template: "%s | Stack-End"
  },
  description: "Discover production-ready backend templates for authentication, databases, APIs, and more. Built with Next.js, Supabase, Better Auth. Deploy in minutes with open-source boilerplates.",
  keywords: [
    "backend templates",
    "production ready",
    "authentication",
    "database",
    "API",
    "Next.js",
    "Supabase",
    "PostgreSQL",
    "Better Auth",
    "boilerplates",
    "starter kits",
    "full-stack",
    "open source",
    "developer tools",
    "React",
    "TypeScript",
    "deployment"
  ],
  authors: [{ name: "Stack-End Team" }],
  creator: "Stack-End",
  publisher: "Stack-End",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NODE_ENV === 'production'
    ? 'https://stack-end.com'
    : 'http://localhost:3000'),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stack-end.com",
    title: "Stack-End - Production-Ready Backend Templates & Boilerplates",
    description: "Discover production-ready backend templates for authentication, databases, APIs, and more. Built with Next.js, Supabase, Better Auth. Deploy in minutes.",
    siteName: "Stack-End",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Stack-End - Production-Ready Backend Templates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stack-End - Production-Ready Backend Templates & Boilerplates",
    description: "Discover production-ready backend templates for authentication, databases, APIs, and more. Built with Next.js, Supabase, Better Auth.",
    images: ["/og-image.png"],
    creator: "@stackend",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || "",
    yandex: process.env.YANDEX_VERIFICATION || "",
    other: {
      "msvalidate.01": process.env.BING_VERIFICATION || "",
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  category: "technology",
  classification: "web development tools",
  other: {
    "google-site-verification": process.env.GOOGLE_SITE_VERIFICATION || "",
    "theme-color": "#000000",
    "color-scheme": "light dark",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientLayout>
          {children}
        </ClientLayout>
        <Toaster />
      </body>
    </html>
  );
}