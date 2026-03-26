export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function RootLayoutJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            "@id": "https://handlelookup.com/#website",
            url: "https://handlelookup.com",
            name: "Handle Lookup",
            description:
              "Check username availability across 65+ platforms with a single API call.",
          },
          {
            "@type": "Organization",
            "@id": "https://handlelookup.com/#organization",
            name: "Hyepr Labs UG",
            url: "https://handlelookup.com",
            logo: {
              "@type": "ImageObject",
              url: "https://handlelookup.com/opengraph-image",
            },
            sameAs: [
              "https://x.com/hyeprlabs",
              "https://www.instagram.com/hyeprlabs",
              "https://www.linkedin.com/company/hyeprlabs",
            ],
          },
        ],
      }}
    />
  );
}
