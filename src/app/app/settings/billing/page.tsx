import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckIcon, ExternalLinkIcon, ZapIcon } from "lucide-react";

const proFeatures = [
  "50,000 API credits / month",
  "240 requests / minute",
  "65+ platforms",
  "No ads",
  "Priority support",
  "Custom credit top-ups",
];

const freeFeatures = [
  "250 API credits / month",
  "15 requests / minute",
  "15 core platforms",
  "Community support",
];

function formatDate(iso: string | null | undefined) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BillingPage() {
  const user = await currentUser();
  if (!user) return null;

  const meta = user.publicMetadata as {
    plan?: string;
    subscriptionStatus?: string;
    currentPeriodEnd?: string;
    polarSubscriptionId?: string;
  };

  const isPro = meta.plan === "pro";
  const isActive =
    meta.subscriptionStatus === "active" ||
    meta.subscriptionStatus === "trialing";
  const renewalDate = formatDate(meta.currentPeriodEnd);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Billing</h1>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and payment details
        </p>
      </div>

      {/* Current plan */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Current plan</CardTitle>
              <CardDescription className="mt-1">
                {isPro && isActive && renewalDate
                  ? `Renews on ${renewalDate}`
                  : isPro && !isActive
                    ? "Your subscription is no longer active"
                    : "Free plan — resets on the 1st of each month"}
              </CardDescription>
            </div>
            <Badge variant={isPro && isActive ? "default" : "secondary"}>
              {isPro && isActive ? "Pro" : "Free"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2.5">
          {(isPro ? proFeatures : freeFeatures).map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-sm">
              <CheckIcon className="size-4 shrink-0 text-muted-foreground" />
              {feature}
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex flex-wrap items-center gap-2 border-t pt-4">
          {isPro ? (
            <>
              <Button asChild size="sm" variant="outline">
                <a href="/api/portal">
                  Manage subscription
                  <ExternalLinkIcon className="size-3.5" />
                </a>
              </Button>
            </>
          ) : (
            <Button asChild size="sm">
              <Link href="/pricing">
                <ZapIcon className="size-3.5" />
                Upgrade to Pro
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Pro plan upsell (only shown on Free) */}
      {!isPro && (
        <Card>
          <CardHeader>
            <CardTitle>Pro plan</CardTitle>
            <CardDescription>Everything you need to scale</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2.5">
            {proFeatures.map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-sm">
                <CheckIcon className="size-4 shrink-0" />
                {feature}
              </div>
            ))}
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-between gap-4 border-t pt-4">
            <div>
              <p className="text-sm font-medium">$29 / month</p>
              <p className="text-xs text-muted-foreground">
                or $278 / year (save 20%)
              </p>
            </div>
            <Button asChild size="sm">
              <Link href="/pricing">Get Pro</Link>
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Usage this month</CardTitle>
          <CardDescription>API credits consumed</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-sm">
            <span>Credits used</span>
            <span className="font-medium tabular-nums">
              0 / {isPro ? "50,000" : "250"}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-0 rounded-full bg-primary transition-all" />
          </div>
          <p className="text-xs text-muted-foreground">
            {isPro
              ? "240 requests / minute · No ads"
              : "15 requests / minute · Resets on the 1st of each month"}
          </p>
        </CardContent>
      </Card>

      {/* Invoices / portal link */}
      <Card>
        <CardHeader>
          <CardTitle>Invoices & receipts</CardTitle>
          <CardDescription>
            Access your full billing history and invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4" />
          <p className="text-sm text-muted-foreground">
            All invoices and payment receipts are available in the Polar
            customer portal.
          </p>
        </CardContent>
        <CardFooter className="border-t pt-4">
          <Button asChild size="sm" variant="outline">
            <a href="/api/portal">
              Open billing portal
              <ExternalLinkIcon className="size-3.5" />
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
