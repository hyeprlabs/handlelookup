import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { ArrowRightIcon, Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { PricingTable } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/json-ld";
import { DAILY_LIMIT } from "@/lib/constants";
import { PLATFORMS } from "@/lib/platforms";

export const metadata: Metadata = {
  title: "Pricing — Free & Pro Plans",
  description:
    "Start free with 5 lookups/day. Upgrade to Pro for unlimited handle checks across 459 platforms.",
  alternates: { canonical: "https://handlelookup.com/pricing" },
};

const FREE_FEATURES = [
  `${DAILY_LIMIT} lookups per day`,
  `${PLATFORMS.length} platforms`,
  "Email support",
];

const PRO_FEATURES = [
  "Unlimited lookups per day",
  `All ${PLATFORMS.length} platforms`,
  "API access",
  "Priority support",
  "No daily resets",
];

function PlanComparison() {
  return (
    <div className="px-4 pb-2 md:px-8" id="pricing">
      {/* Section label */}
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Pricing
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight">
          Simple, transparent pricing
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Start free — no credit card needed. Upgrade when you need more.
        </p>
      </div>

      {/* Plan cards */}
      <div className="mb-10 grid gap-4 sm:grid-cols-2">
        {/* Free plan */}
        <div className="rounded-xl border bg-muted/20 p-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Free
          </p>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-3xl font-bold">$0</span>
            <span className="text-sm text-muted-foreground">/month</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">Forever free</p>
          <Separator className="my-5" />
          <ul className="space-y-3">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-muted">
                  <Check className="size-2.5 text-muted-foreground" />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <Button asChild variant="outline" size="sm" className="mt-6 w-full">
            <Link href="/sign-up">Get started free</Link>
          </Button>
        </div>

        {/* Pro plan */}
        <div className="relative overflow-hidden rounded-xl border border-foreground/15 bg-gradient-to-b from-foreground/[0.04] to-transparent p-6">
          <Badge
            variant="secondary"
            className="absolute right-5 top-5 text-[11px] font-semibold"
          >
            Most popular
          </Badge>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Pro
          </p>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-3xl font-bold">$9</span>
            <span className="text-sm text-muted-foreground">/month</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            or $79/year · save 26%
          </p>
          <Separator className="my-5" />
          <ul className="space-y-3">
            {PRO_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm">
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                  <Check className="size-2.5 text-emerald-600 dark:text-emerald-400" />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <Button asChild size="sm" className="mt-6 w-full">
            <Link href="/sign-up">
              <Zap className="size-3.5" />
              Start with Pro
            </Link>
          </Button>
          <p className="mt-3 text-center text-[11px] text-muted-foreground">
            Cancel anytime · No hidden fees
          </p>
        </div>
      </div>

      {/* Clerk PricingTable — handles subscription checkout */}
      <Suspense
        fallback={
          <div className="flex flex-col gap-3">
            <Skeleton className="h-72 rounded-xl" />
          </div>
        }
      >
        <div className="rounded-xl border bg-muted/10 p-6">
          <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Subscribe with one click
          </p>
          <PricingTable />
        </div>
      </Suspense>
    </div>
  );
}

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
                "Pro plan — unlimited handle checks across 459 platforms.",
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
          description="Start free with 5 lookups/day. Upgrade to Pro for unlimited access across all 459 platforms."
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

        <PlanComparison />
        <Footer />
      </main>
    </div>
  );
}
