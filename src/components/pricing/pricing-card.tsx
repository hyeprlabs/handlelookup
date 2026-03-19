"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { CheckIcon, ExternalLinkIcon } from "lucide-react";
import { TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";

export type Interval = "monthly" | "yearly";

type Limits = {
  credits: string;
  requests: string;
  rateLimit: string;
};

export type Product = {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  description: string;
  featuresTitle: string;
  isPopular?: boolean;
  usage: {
    monthly: Limits;
    yearly: Limits;
  };
  features: {
    monthly: string[];
    yearly: string[];
  };
};

type Props = {
  product: Product;
  interval: Interval;
  checkoutUrl?: string;
};

export function PricingCard({
  product,
  interval,
  checkoutUrl,
}: Props) {
  const { user, isLoaded } = useUser();
  const userPlan = (user?.publicMetadata as { plan?: string } | undefined)
    ?.plan;
  const isUserPro = userPlan === "pro";

  const isYearly = interval === "yearly";
  const displayedPrice = isYearly ? product.yearlyPrice : product.monthlyPrice;
  const periodLabel =
    displayedPrice === "Free" ? "" : isYearly ? "/ year" : "/ month";
  const features = product.features[interval];
  const usage = product.usage[interval];
  const usageRows: Array<[string, string]> = [
    ["Credits", usage.credits],
    ["Requests", usage.requests],
    ["Rate limit", usage.rateLimit],
  ];

  // Determine the CTA label, href, and variant based on auth + plan state
  let ctaHref: string;
  let ctaLabel: string;
  let ctaIcon: React.ReactNode = null;
  let ctaVariant: "default" | "outline" = product.isPopular
    ? "default"
    : "outline";
  const ctaAsChild = true;

  if (product.isPopular) {
    if (!isLoaded) {
      ctaHref = "/pricing";
      ctaLabel = "Get started";
    } else if (isUserPro) {
      ctaHref = "/api/portal";
      ctaLabel = "Manage subscription";
      ctaVariant = "outline";
      ctaIcon = <ExternalLinkIcon className="size-3.5" />;
    } else if (user) {
      ctaHref = checkoutUrl ?? "/pricing";
      ctaLabel = "Upgrade to Pro";
    } else {
      // Sign in first, then come straight back to checkout
      ctaHref = checkoutUrl
        ? `/sign-in?redirect_url=${encodeURIComponent(checkoutUrl)}`
        : "/sign-in?redirect_url=%2Fpricing";
      ctaLabel = "Get started";
    }
  } else {
    // Free plan
    if (user) {
      ctaHref = "/app/profile";
      ctaLabel = "Go to dashboard";
    } else {
      ctaHref = "/sign-up";
      ctaLabel = "Get started free";
    }
  }

  return (
    <div className="flex flex-col bg-background">
      <div className="border-b px-4 py-6">
        <p className="mb-4 text-xs uppercase tracking-wider text-muted-foreground">
          {product.name}
        </p>
        <div className="mb-2 flex items-baseline gap-2">
          <h2 className="text-3xl font-bold sm:text-4xl">{displayedPrice}</h2>
          <span className="text-xs text-muted-foreground">{periodLabel}</span>
        </div>
        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <Button
          asChild={ctaAsChild}
          className="w-full gap-1.5"
          variant={ctaVariant}
        >
          <a href={ctaHref}>
            {ctaLabel}
            {ctaIcon}
          </a>
        </Button>
      </div>

      <div className="text-sm text-muted-foreground">
        <div className="px-4 py-6">
          <p className="mb-4 text-xs uppercase">{product.featuresTitle}</p>
          <ul className="space-y-3">
            {features.map((feature) => (
              <li
                className="flex items-center gap-2 text-foreground/80"
                key={feature}
              >
                <CheckIcon className="size-4 flex-shrink-0 text-emerald-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t px-4 py-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Usage limits
          </p>
        </div>

        <div className="border-t">
          <table className="w-full text-sm">
            <TableBody>
              {usageRows.map(([label, value]) => (
                <TableRow key={label} className="hover:bg-transparent">
                  <TableHead className="border-r bg-muted/20 py-3 font-medium text-foreground/70">
                    {label}
                  </TableHead>
                  <TableCell className="bg-secondary/45 py-3">
                    {value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </table>
        </div>
      </div>
    </div>
  );
}
