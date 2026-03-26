import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";
import { PricingTable } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { JsonLd } from "@/app/json-ld";
import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
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

        <section id="pricing" className="relative mx-auto w-full max-w-5xl">
          <DecorIcon className="size-4" position="top-left" />
          <DecorIcon className="size-4" position="top-right" />
          <DecorIcon className="size-4" position="bottom-left" />
          <DecorIcon className="size-4" position="bottom-right" />

          <FullWidthDivider className="-top-px" />

          <div className="border-b bg-linear-to-b from-secondary/35 via-secondary/10 to-transparent px-3 py-10 md:px-4">
            <p className="mb-2 text-center font-mono text-[11px] text-muted-foreground uppercase tracking-[0.18em]">
              pricing
            </p>
            <h2 className="text-center font-semibold text-xl md:text-3xl">
              Choose your plan
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-balance text-center text-muted-foreground text-sm md:text-base">
              Start your 7-day free trial!
            </p>
          </div>

          <div className="px-4 py-10 md:px-8">
            <PricingTable
              fallback={
                <div className="flex flex-col gap-4 md:flex-row">
                  <Skeleton className="h-[200px] w-full rounded-xl" />
                  <Skeleton className="h-[200px] w-full rounded-xl" />
                </div>
              }
            />
          </div>

          <FullWidthDivider className="-bottom-px" />
        </section>

        <Footer />
      </main>
    </div>
  );
}
