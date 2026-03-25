"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  Zap,
  Infinity,
  Search,
  Globe,
  ArrowRight,
  Lock,
} from "lucide-react";
import { PricingTable } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

interface UpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  authenticated: boolean;
}

const proFeatures = [
  {
    icon: Infinity,
    label: "Unlimited lookups",
    sub: "No daily cap, ever",
  },
  {
    icon: Globe,
    label: "65+ platforms",
    sub: "The full network sweep",
  },
  {
    icon: Search,
    label: "Instant results",
    sub: "Streaming API, zero wait",
  },
];

const socialProofStats = [
  { value: "65+", label: "Platforms checked" },
  { value: "∞", label: "Lookups per day" },
  { value: "< 10s", label: "Full scan time" },
];

export function UpgradeDialog({
  open,
  onOpenChange,
  authenticated,
}: UpgradeDialogProps) {
  const [showPricingTable, setShowPricingTable] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "gap-0 overflow-hidden p-0",
          showPricingTable
            ? "max-w-3xl"
            : "max-w-md"
        )}
      >
        {!showPricingTable ? (
          <>
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500" />

            <div className="p-6">
              <DialogHeader className="mb-5 space-y-2">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="gap-1 border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  >
                    <Zap className="size-3 fill-current" />
                    Daily limit reached
                  </Badge>
                </div>
                <DialogTitle className="text-xl font-bold leading-tight">
                  {authenticated
                    ? "Don't lose your username idea"
                    : "Sign in to keep searching"}
                </DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  {authenticated
                    ? "You've used all 5 free lookups for today. Upgrade to Pro for unlimited searches — no daily cap, all 65+ platforms."
                    : "You've used all 5 free lookups today. Sign in for 5 more free lookups per day, or go Pro for unlimited access."}
                </DialogDescription>
              </DialogHeader>

              {/* Stats row */}
              <div className="mb-5 grid grid-cols-3 gap-2 rounded-lg border bg-muted/30 p-3">
                {socialProofStats.map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center gap-0.5 text-center">
                    <span className="text-lg font-bold tabular-nums leading-none">
                      {stat.value}
                    </span>
                    <span className="text-[11px] text-muted-foreground">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pro feature bullets */}
              <ul className="mb-6 space-y-2.5">
                {proFeatures.map(({ icon: Icon, label, sub }) => (
                  <li key={label} className="flex items-start gap-3">
                    <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-violet-500/20 bg-violet-500/10">
                      <Icon className="size-3.5 text-violet-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {label}
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {sub}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              {authenticated ? (
                <div className="flex flex-col gap-2">
                  <Button
                    className="w-full gap-2 bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-700 hover:to-blue-700"
                    onClick={() => setShowPricingTable(true)}
                  >
                    <Zap className="size-4 fill-current" />
                    Upgrade to Pro
                    <ArrowRight className="size-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-muted-foreground"
                    onClick={() => onOpenChange(false)}
                  >
                    I&apos;ll come back tomorrow
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button
                    asChild
                    className="w-full gap-2"
                  >
                    <Link href="/sign-up">
                      Get 5 free lookups / day
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full gap-2"
                  >
                    <Link href="/pricing">
                      <Zap className="size-4" />
                      See Pro plans
                    </Link>
                  </Button>
                  <p className="text-center text-xs text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/sign-in" className="underline underline-offset-2">
                      Sign in
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500" />

            <div className="p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">Choose your plan</h2>
                  <p className="text-sm text-muted-foreground">
                    Unlock unlimited lookups across 65+ platforms
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPricingTable(false)}
                  className="text-muted-foreground"
                >
                  ← Back
                </Button>
              </div>

              {/* Clerk PricingTable handles checkout natively */}
              <PricingTable
                newSubscriptionRedirectUrl="/app/settings/billing?upgraded=true"
                appearance={{
                  elements: {
                    pricingTableContainer: "!shadow-none",
                  },
                }}
              />

              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <Lock className="size-3" />
                <span>Secure checkout powered by Clerk</span>
                <CheckCircle2 className="size-3 text-emerald-500" />
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
