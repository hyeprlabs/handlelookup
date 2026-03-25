"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, ArrowRight, Zap } from "lucide-react";
import { PricingTable } from "@clerk/nextjs";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { DAILY_LIMIT } from "@/lib/constants";

// ── Helpers ────────────────────────────────────────────────────────────────

function getResetString(): string {
  const now = new Date();
  const tomorrow = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
  );
  const diff = tomorrow.getTime() - now.getTime();
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

// ── Shared inner content ───────────────────────────────────────────────────

function DrawerBanner({
  limitReached,
  resetIn,
}: {
  limitReached: boolean;
  resetIn: string;
}) {
  if (!limitReached) return null;
  return (
    <div className="mb-5 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/8 px-4 py-3">
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-amber-500/25 bg-amber-500/15">
        <Clock className="size-3.5 text-amber-500" />
      </div>
      <div>
        <p className="text-sm font-medium">
          You&apos;ve used all {DAILY_LIMIT} free lookups today
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Free limit resets in{" "}
          <span className="font-mono font-medium text-foreground">{resetIn}</span>
          {" "}— or unlock unlimited access below.
        </p>
      </div>
    </div>
  );
}

function PricingContent({
  limitReached,
  resetIn,
  onClose,
}: {
  limitReached: boolean;
  resetIn: string;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col">
      <DrawerBanner limitReached={limitReached} resetIn={resetIn} />

      {/* Clerk PricingTable — renders plans from dashboard, handles checkout */}
      <div className="min-h-0 flex-1">
        <PricingTable />
      </div>

      <Separator className="my-5" />

      <div className="flex flex-col gap-0.5">
        <p className="text-xs text-muted-foreground">
          Questions about pricing?{" "}
          <Link
            href="/pricing"
            className="font-medium text-foreground underline-offset-2 hover:underline"
            onClick={onClose}
          >
            View full pricing page
            <ArrowRight className="ml-0.5 inline size-3" />
          </Link>
        </p>
        <p className="text-[11px] text-muted-foreground">
          Cancel anytime · No hidden fees · Powered by Stripe
        </p>
      </div>
    </div>
  );
}

// ── Props ──────────────────────────────────────────────────────────────────

interface UpgradeDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handle?: string;
  limitReached?: boolean;
}

// ── Component ──────────────────────────────────────────────────────────────

export function UpgradeDrawer({
  open,
  onOpenChange,
  limitReached = false,
}: UpgradeDrawerProps) {
  const isMobile = useIsMobile();
  const [resetIn, setResetIn] = useState(getResetString);

  // Keep reset time live while open
  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => setResetIn(getResetString()), 30_000);
    return () => clearInterval(id);
  }, [open]);

  const title = limitReached ? "Daily limit reached" : "Upgrade to Pro";
  const description = limitReached
    ? `${DAILY_LIMIT}/${DAILY_LIMIT} free lookups used today`
    : "Unlimited lookups across all 459 platforms";

  const headerIcon = (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/10">
      <Zap className="size-4 text-amber-500" />
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[92svh]">
          <DrawerHeader className="pb-4 text-left">
            <div className="flex items-center gap-2.5">
              {headerIcon}
              <div>
                <DrawerTitle className="text-sm font-semibold leading-tight">
                  {title}
                </DrawerTitle>
                <DrawerDescription className="text-xs">{description}</DrawerDescription>
              </div>
            </div>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 pb-2">
            <PricingContent
              limitReached={limitReached}
              resetIn={resetIn}
              onClose={() => onOpenChange(false)}
            />
          </div>
          <DrawerFooter className="pt-0" />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90svh] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg">
        <DialogHeader className="border-b px-6 py-5">
          <div className="flex items-center gap-2.5">
            {headerIcon}
            <div>
              <DialogTitle className="text-sm font-semibold leading-tight">
                {title}
              </DialogTitle>
              <DialogDescription className="text-xs">{description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <PricingContent
            limitReached={limitReached}
            resetIn={resetIn}
            onClose={() => onOpenChange(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
