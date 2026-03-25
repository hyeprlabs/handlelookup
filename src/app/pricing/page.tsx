import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { PricingTable } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { SectionShell } from "@/components/pricing/section-shell";
import { JsonLd } from "@/components/json-ld";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing — Free & Pro Plans",
  description:
    "Start free with 5 lookups/day. Upgrade to Pro for unlimited handle checks across all platforms.",
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
                { "@type": "ListItem", position: 1, name: "Home", item: "https://handlelookup.com" },
                { "@type": "ListItem", position: 2, name: "Pricing", item: "https://handlelookup.com/pricing" },
              ],
            },
            {
              "@type": "Product",
              name: "Handle Lookup Pro",
              description: "Pro plan — unlimited handle checks across all platforms.",
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
          title="Simple Pricing"
          description="Start free with 5 lookups/day. Upgrade to Pro for unlimited access across all platforms."
          actions={
            <Button asChild>
              <Link href="#pricing">
                See plans
                <ArrowRightIcon />
              </Link>
            </Button>
          }
        />

        <div id="pricing">
          <SectionShell
            title="Choose your plan"
            description="Start free — no credit card needed. Upgrade when you need more."
            sectionId="pricing"
          >
            <div className="px-4 py-10 md:px-8">
              <Suspense fallback={<Skeleton className="h-72 w-full rounded-xl" />}>
                <PricingTable />
              </Suspense>
            </div>
          </SectionShell>
        </div>

        <Footer />
      </main>
    </div>
  );
}
