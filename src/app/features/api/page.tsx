import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { GettingStarted } from "@/components/features/api/getting-started";
import { FeaturesSection } from "@/components/features/api/features-section";
import { RequestFormatSection } from "@/components/features/api/request-format-section";
import { ResponseFieldsSection } from "@/components/features/api/response-fields-section";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "API Reference — Username Availability API",
  description:
    "Integrate username availability checking into your app. Single endpoint, clean JSON responses, 65+ platforms supported. Get started in minutes.",
  alternates: { canonical: "https://handlelookup.com/features/api" },
};

export default function Page() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden px-4 supports-[overflow:clip]:overflow-clip">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://handlelookup.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Features",
                  item: "https://handlelookup.com/features",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "API Reference",
                  item: "https://handlelookup.com/features/api",
                },
              ],
            },
            {
              "@type": "TechArticle",
              headline: "Handle Lookup API Reference",
              description:
                "Integrate username availability checking into your app. Single endpoint, clean JSON responses, 65+ platforms supported.",
              url: "https://handlelookup.com/features/api",
              publisher: { "@id": "https://handlelookup.com/#organization" },
              about: {
                "@id": "https://handlelookup.com/#app",
              },
            },
          ],
        }}
      />
      <Header />

      <main
        className={cn(
          "relative mx-auto w-full max-w-4xl grow",
          // X Borders
          "before:absolute before:-inset-y-14 before:-left-px before:w-px before:bg-border",
          "after:absolute after:-inset-y-14 after:-right-px after:w-px after:bg-border",
        )}
      >
        <HeroSection
          title="Handle Lookup API"
          description="Check username availability across multiple social platforms with one request and return clean, predictable results for your app."
          actions={
            <>
              <Button asChild>
                <Link href="/pricing">
                  Get API Access
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/">Back to Home</Link>
              </Button>
            </>
          }
        />
        <GettingStarted />
        <FeaturesSection />
        <RequestFormatSection />
        <ResponseFieldsSection />

        <Footer />
      </main>
    </div>
  );
}
