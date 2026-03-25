"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Zap, Check, Clock, ArrowRight } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DAILY_LIMIT } from "@/lib/rate-limit";

// ── Helpers ───────────────────────────────────────────────────────────────

function getResetString(): string {
  const now = new Date();
  const tomorrow = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1,
  ));
  const diff = tomorrow.getTime() - now.getTime();
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

const PRO_FEATURES = [
  "Unlimited lookups every day",
  "All 459 platforms checked instantly",
  "No daily resets, ever",
  "Priority API access",
] as const;

// ── Component ─────────────────────────────────────────────────────────────

interface UpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The handle that triggered the limit, for personalisation */
  handle?: string;
}

export function UpgradeDialog({ open, onOpenChange, handle }: UpgradeDialogProps) {
  const { isSignedIn } = useAuth();
  const [resetIn, setResetIn] = useState(getResetString);

  // Keep reset time live while dialog is open
  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => setResetIn(getResetString()), 30_000);
    return () => clearInterval(id);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-sm">

        {/* ── Header ── */}
        <div className="p-6 pb-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-amber-500/25 bg-amber-500/10">
            <Zap className="size-5 text-amber-500" />
          </div>

          <DialogTitle className="text-base font-semibold leading-snug">
            You&apos;ve used all {DAILY_LIMIT} free lookups today
          </DialogTitle>
          <DialogDescription className="mt-1.5 text-sm text-muted-foreground">
            {handle && (
              <>Checking <span className="font-mono font-medium text-foreground">@{handle}</span> uses 1 lookup. </>
            )}
            Free limit resets in{" "}
            <span className="inline-flex items-center gap-1 font-mono font-medium text-foreground">
              <Clock className="size-3" />
              {resetIn}
            </span>
            {" "}— or go unlimited now.
          </DialogDescription>
        </div>

        <Separator />

        {/* ── Pro card ── */}
        <div className="p-6">
          <div className="relative overflow-hidden rounded-xl border bg-gradient-to-b from-muted/60 to-muted/20 p-5">
            {/* Popular badge */}
            <Badge
              variant="secondary"
              className="absolute right-4 top-4 text-[11px] font-semibold"
            >
              Most popular
            </Badge>

            {/* Plan header */}
            <div className="pr-20">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Pro Plan
              </p>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-2xl font-bold">$9</span>
                <span className="text-sm text-muted-foreground">/month</span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                or $79/year · save 26%
              </p>
            </div>

            <Separator className="my-4" />

            {/* Features */}
            <ul className="space-y-2.5">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                    <Check className="size-2.5 text-emerald-600 dark:text-emerald-400" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-4 space-y-2">
            {isSignedIn ? (
              <Button asChild className="w-full" size="sm">
                <Link href="/pricing">
                  <Zap className="size-3.5" />
                  Upgrade to Pro
                  <ArrowRight className="ml-auto size-3.5 opacity-70" />
                </Link>
              </Button>
            ) : (
              <>
                <Button asChild className="w-full" size="sm">
                  <Link href="/sign-up">
                    Create free account &amp; upgrade
                    <ArrowRight className="ml-auto size-3.5 opacity-70" />
                  </Link>
                </Button>
                <Button asChild variant="ghost" className="w-full" size="sm">
                  <Link href="/sign-in">Sign in</Link>
                </Button>
              </>
            )}
          </div>

          <p className={cn(
            "mt-3 text-center text-[11px] text-muted-foreground",
          )}>
            Cancel anytime · No hidden fees · Billed via Stripe
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
