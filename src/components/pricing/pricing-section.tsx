"use client";

import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { DecorIcon } from "@/components/ui/decor-icon";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { IntervalTabs } from "@/components/pricing/interval-tabs";
import { PricingCard, type Product } from "@/components/pricing/pricing-card";

const MONTHLY_PRODUCT_ID =
  process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID_MONTHLY ?? "";
const YEARLY_PRODUCT_ID = process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID_YEARLY ?? "";

const products: Product[] = [
  {
    name: "FREE",
    monthlyPrice: "Free",
    yearlyPrice: "Free",
    description: "For creators validating username availability",
    featuresTitle: "INCLUDES:",
    usage: {
      monthly: {
        credits: "250 API credits / month",
        requests: "250 API requests / month",
        rateLimit: "15 requests / minute",
      },
      yearly: {
        credits: "3,000 API credits / year",
        requests: "3,000 API requests / year",
        rateLimit: "15 requests / minute",
      },
    },
    features: {
      monthly: ["Ads enabled", "15 core platforms", "Community support"],
      yearly: ["Ads enabled", "15 core platforms", "Community support"],
    },
  },
  {
    name: "PRO",
    isPopular: true,
    monthlyPrice: "$29",
    yearlyPrice: "$278",
    description: "For teams shipping username-first products",
    featuresTitle: "EVERYTHING YOU NEED:",
    usage: {
      monthly: {
        credits: "50,000 API credits / month",
        requests: "50,000 API requests / month",
        rateLimit: "240 requests / minute",
      },
      yearly: {
        credits: "600,000 API credits / year",
        requests: "600,000 API requests / year",
        rateLimit: "240 requests / minute",
      },
    },
    features: {
      monthly: ["No ads", "65+ platforms", "Priority support"],
      yearly: ["No ads", "65+ platforms", "Priority support"],
    },
  },
];

export function PricingSection() {
  const [interval] = useQueryState(
    "interval",
    parseAsStringLiteral(["monthly", "yearly"]).withDefault("monthly"),
  );

  const checkoutProductId =
    interval === "yearly" ? YEARLY_PRODUCT_ID : MONTHLY_PRODUCT_ID;

  return (
    <section className="mx-auto max-w-5xl">
      <div className="relative">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />

        <FullWidthDivider position="top" />
        <FullWidthDivider position="bottom" />

        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col bg-background px-4 py-6 sm:col-span-2 lg:col-span-1">
            <p className="mb-4 text-xs uppercase tracking-wider text-muted-foreground">
              PRICING
            </p>
            <h2 className="text-lg font-bold leading-tight sm:text-xl md:text-2xl">
              Simple pricing for handle search and API
            </h2>
            <div className="mt-6">
              <IntervalTabs />
            </div>
          </div>

          {products.map((product) => (
            <PricingCard
              key={product.name}
              product={product}
              interval={interval}
              checkoutUrl={
                product.isPopular && checkoutProductId
                  ? `/api/checkout?productId=${checkoutProductId}`
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
