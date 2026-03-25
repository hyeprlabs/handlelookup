import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL("https://handlelookup.com"),
  title: {
    default: "Handle Lookup — Check Username Availability Across 65+ Platforms",
    template: "%s | Handle Lookup",
  },
  description:
    "Instantly check if a username is available across GitHub, Twitter, Instagram, TikTok, and 60+ more platforms with a single API call.",
  openGraph: {
    type: "website",
    siteName: "Handle Lookup",
    title: "Handle Lookup — Check Username Availability Across 65+ Platforms",
    description:
      "One API call, 65+ platforms. Check username availability instantly.",
    url: "https://handlelookup.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Handle Lookup — Username Availability Across 65+ Platforms",
    description:
      "One API call, 65+ platforms. Check username availability instantly.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/app/profile"
      signUpFallbackRedirectUrl="/app/profile"
    >
      <html lang="en" className={cn("font-sans")}>
        <body className="antialiased">
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
          <NuqsAdapter>{children}</NuqsAdapter>
        </body>
      </html>
    </ClerkProvider>
  );
}
