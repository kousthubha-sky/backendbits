import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Templates - Production-Ready Backend Code",
  description: "Browse and discover production-ready backend templates for authentication, databases, APIs, and more. Clone, customize, and deploy in minutes.",
  keywords: [
    "backend templates",
    "production ready",
    "authentication templates",
    "database templates",
    "API templates",
    "Next.js templates",
    "Node.js templates",
    "boilerplate",
    "starter kits",
    "open source templates"
  ],
  openGraph: {
    title: "Templates - Production-Ready Backend Code",
    description: "Browse and discover production-ready backend templates for authentication, databases, APIs, and more.",
    url: "/templates",
    type: "website",
    images: [
      {
        url: "/og-templates.png",
        width: 1200,
        height: 630,
        alt: "Backend Templates Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Templates - Production-Ready Backend Code",
    description: "Browse and discover production-ready backend templates.",
    images: ["/og-templates.png"],
  },
}