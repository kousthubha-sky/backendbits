import Script from 'next/script'

export default function StructuredData() {
  const baseUrl = process.env.NODE_ENV === 'production'
    ? 'https://stack-end.com'
    : 'http://localhost:3000'

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Stack-End",
    "alternateName": "Stack-End Backend Templates",
    "description": "Production-ready backend templates with authentication, databases, APIs. Built with Next.js, Supabase, Better Auth. Deploy in minutes.",
    "url": baseUrl,
    "sameAs": [
      "https://github.com/stack-end"
    ],
    "publisher": {
      "@type": "Organization",
      "name": "Stack-End",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/favicon.ico`
      }
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/templates?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Stack-End Templates",
      "description": "Collection of production-ready backend templates with modern tech stack",
      "numberOfItems": 10,
      "itemListElement": [
        {
          "@type": "SoftwareApplication",
          "name": "Better Auth + Supabase",
          "description": "Backend starter with Better Auth and Supabase PostgreSQL",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Web",
          "programmingLanguage": ["TypeScript", "JavaScript"],
          "url": `${baseUrl}/templates`,
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        },
        {
          "@type": "SoftwareApplication",
          "name": "Next.js Full-Stack Template",
          "description": "Complete full-stack application with authentication and database",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Web",
          "programmingLanguage": ["TypeScript", "JavaScript"],
          "url": `${baseUrl}/templates`
        }
      ]
    },
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web",
    "softwareVersion": "1.0.0",
    "author": {
      "@type": "Organization",
      "name": "Stack-End Team"
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}