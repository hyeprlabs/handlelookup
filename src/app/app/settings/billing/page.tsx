import { auth } from "@clerk/nextjs/server";
import { PricingTable } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckIcon, ZapIcon, Infinity } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { getRateLimitInfo, DAILY_LIMIT } from "@/lib/rate-limit";

const proFeatures = [
  "Unlimited lookups per day",
  "65+ platforms",
  "No daily cap, ever",
  "Priority support",
];

const freeFeatures = [
  `${DAILY_LIMIT} free lookups / day`,
  "Featured platforms",
  "Community support",
];

export default async function BillingPage() {
  const { userId, has } = await auth();
  if (!userId) redirect("/sign-in");

  const isPro = has({ plan: "user:pro" });
  const { remaining, limit } = getRateLimitInfo(userId);
  const usedToday = limit - remaining;
  const usagePct = limit > 0 ? Math.round((usedToday / limit) * 100) : 0;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold">Billing</h1>
        <p className="text-sm text-muted-foreground">
          Manage your subscription and usage
        </p>
      </div>

      {/* Current plan */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>Current plan</CardTitle>
              <CardDescription className="mt-1">
                {isPro
                  ? "Pro — unlimited lookups across all platforms"
                  : `Free — ${DAILY_LIMIT} lookups per day`}
              </CardDescription>
            </div>
            <Badge variant={isPro ? "default" : "secondary"}>
              {isPro ? (
                <span className="flex items-center gap-1">
                  <ZapIcon className="size-3 fill-current" /> Pro
                </span>
              ) : (
                "Free"
              )}
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
      </Card>

      {/* Usage today (only for free users) */}
      {!isPro && (
        <Card>
          <CardHeader>
            <CardTitle>Usage today</CardTitle>
            <CardDescription>Resets at midnight UTC</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span>Lookups used</span>
              <span className="font-medium tabular-nums">
                {usedToday} / {limit}
              </span>
            </div>
            <Progress value={usagePct} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {remaining} lookups remaining today
            </p>
          </CardContent>
        </Card>
      )}

      {/* Pro usage indicator */}
      {isPro && (
        <Card>
          <CardHeader>
            <CardTitle>Usage</CardTitle>
            <CardDescription>Unlimited on Pro</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-3 text-sm">
            <Infinity className="size-5 text-violet-500" />
            <span>No daily limits on your plan</span>
          </CardContent>
        </Card>
      )}

      {/* Upgrade section — shown for free users */}
      {!isPro && (
        <Card className="overflow-hidden border-violet-500/20">
          <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500" />
          <CardHeader>
            <CardTitle>Upgrade to Pro</CardTitle>
            <CardDescription>
              Unlock unlimited lookups and all 65+ platforms
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Separator className="mb-4" />
            {/* Clerk PricingTable handles the full checkout flow */}
            <PricingTable
              newSubscriptionRedirectUrl="/app/settings/billing?upgraded=true"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
