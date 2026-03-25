"use client";

import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { DecorIcon } from "@/components/ui/decor-icon";
import { PricingTable } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Zap } from "lucide-react";

const highlights = [
  "5 free lookups / day — no credit card needed",
  "Upgrade to Pro for unlimited lookups",
  "65+ platforms, real-time streaming results",
  "Cancel anytime — no lock-in",
];

export function PricingSection() {
  return (
    <section className="mx-auto max-w-5xl" id="pricing">
      <div className="relative">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />

        <FullWidthDivider position="top" />
        <FullWidthDivider position="bottom" />

        <div className="flex flex-col gap-0 bg-background">
          {/* Header row */}
          <div className="border-b px-4 py-6 sm:px-8">
            <p className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
              PRICING
            </p>
            <h2 className="mb-4 text-2xl font-bold leading-tight">
              Simple pricing for handle search
            </h2>

            {/* Trust highlights */}
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Clerk Pricing Table */}
          <div className="px-4 py-8 sm:px-8">
            <PricingTable
              newSubscriptionRedirectUrl="/app/settings/billing?upgraded=true"
              appearance={{
                elements: {
                  pricingTableContainer: "!shadow-none !border-0",
                },
              }}
            />
          </div>

          {/* Bottom CTA for unauthenticated or on-the-fence visitors */}
          <div className="border-t bg-muted/30 px-4 py-6 text-center sm:px-8">
            <p className="mb-3 text-sm text-muted-foreground">
              Not ready to upgrade yet?{" "}
              <strong className="text-foreground">
                Try 5 free lookups per day
              </strong>{" "}
              — no sign-up required.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <Button asChild size="sm" variant="outline">
                <Link href="/">Try it free</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/sign-up">
                  <Zap className="size-3.5" />
                  Create account
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
