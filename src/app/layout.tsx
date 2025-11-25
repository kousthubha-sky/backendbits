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
    default: "Backend Templates - Production-Ready Code to Ship Faster",
    template: "%s | Backend Templates"
  },
  description: "Discover production-ready backend templates for authentication, databases, APIs, and more. Clone, customize, and deploy in minutes. Open-source templates for developers.",
  keywords: [
    "backend templates",
    "production ready",
    "authentication",
    "database",
    "API",
    "Next.js",
    "Node.js",
    "MongoDB",
    "PostgreSQL",
    "templates",
    "boilerplate",
    "starter kit",
    "open source",
    "developer tools"
  ],
  authors: [{ name: "Backend Templates Team" }],
  creator: "Backend Templates",
  publisher: "Backend Templates",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_AUTH_URL || 'http://localhost:3000'),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Backend Templates - Production-Ready Code to Ship Faster",
    description: "Discover production-ready backend templates for authentication, databases, APIs, and more. Clone, customize, and deploy in minutes.",
    siteName: "Backend Templates",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Backend Templates - Production-Ready Code",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Backend Templates - Production-Ready Code to Ship Faster",
    description: "Discover production-ready backend templates for authentication, databases, APIs, and more.",
    images: ["/og-image.png"],
    creator: "@backendtemplates",
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
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  other: {
    "google-site-verification": "your-google-site-verification-code",
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