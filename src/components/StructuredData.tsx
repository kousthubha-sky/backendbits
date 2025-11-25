import Script from 'next/script'

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Backend Templates",
    "description": "Production-ready backend templates to help you ship faster",
    "url": process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3000",
    "sameAs": [
      "https://github.com/backend-templates"
    ],
    "publisher": {
      "@type": "Organization",
      "name": "Backend Templates",
      "url": process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3000"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3000"}/templates?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Backend Templates",
      "description": "Collection of production-ready backend templates",
      "numberOfItems": 50,
      "itemListElement": [
        {
          "@type": "SoftwareApplication",
          "name": "Better Auth + MongoDB",
          "description": "Backend starter that marries Better Auth with MongoDB",
          "applicationCategory": "DeveloperApplication",
          "operatingSystem": "Web",
          "url": `${process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3000"}/templates`
        }
      ]
    }
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