import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { CreditsSection } from "@/components/pricing/credits-section";
import { PricingSection } from "@/components/pricing/pricing-section";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Pricing — Free & Pro Plans",
  description:
    "Handle Lookup is free to start. Upgrade to Pro for higher API volume, broader platform coverage, and ad-free usage.",
  alternates: { canonical: "https://handlelookup.com/pricing" },
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
                  name: "Pricing",
                  item: "https://handlelookup.com/pricing",
                },
              ],
            },
            {
              "@type": "Product",
              name: "Handle Lookup Pro",
              description:
                "Pro plan for Handle Lookup — higher API volume, broader platform coverage, and ad-free usage.",
              url: "https://handlelookup.com/pricing",
              brand: { "@id": "https://handlelookup.com/#organization" },
              offers: {
                "@type": "Offer",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
                url: "https://handlelookup.com/pricing",
              },
            },
          ],
        }}
      />
      <Header />

      <main
        className={cn(
          "relative mx-auto w-full max-w-4xl grow",
          "before:absolute before:-inset-y-14 before:-left-px before:w-px before:bg-border",
          "after:absolute after:-inset-y-14 after:-right-px after:w-px after:bg-border",
        )}
      >
        <HeroSection
          title="Simple Pricing for Handle Search and API"
          description="Choose Free for lightweight checks or Pro for ad-free usage, broader platform coverage, and production-grade API volume."
          actions={
            <>
              <Button asChild>
                <Link href="#pricing">
                  See plans
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/features/api">View API Docs</Link>
              </Button>
            </>
          }
        />

        <Suspense
          fallback={
            <div className="flex flex-col gap-4 py-8">
              <Skeleton className="h-80 rounded-2xl" />
              <Skeleton className="h-48 rounded-2xl" />
            </div>
          }
        >
          <PricingSection />
          <CreditsSection />
        </Suspense>

        <Footer />
      </main>
    </div>
  );
}
