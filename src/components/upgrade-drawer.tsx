"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Zap } from "lucide-react";
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
} from "@/components/ui/drawer";
import { DAILY_LIMIT } from "@/lib/constants";

function getResetString(): string {
  const now = new Date();
  const tomorrow = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1),
  );
  const diff = tomorrow.getTime() - now.getTime();
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

interface UpgradeDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  limitReached?: boolean;
}

export function UpgradeDrawer({
  open,
  onOpenChange,
  limitReached = false,
}: UpgradeDrawerProps) {
  const isMobile = useIsMobile();
  const [resetIn, setResetIn] = useState(getResetString);

  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => setResetIn(getResetString()), 30_000);
    return () => clearInterval(id);
  }, [open]);

  const title = limitReached ? "Daily limit reached" : "Upgrade to Pro";
  const subtitle = limitReached
    ? `${DAILY_LIMIT}/${DAILY_LIMIT} free lookups used · resets in ${resetIn}`
    : "Unlimited lookups across all platforms";

  // Close our overlay the moment the user clicks Clerk's subscribe button,
  // so Clerk's checkout sheet isn't obscured by our drawer/dialog.
  const handlePricingAreaClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) {
      onOpenChange(false);
    }
  };

  const headerContent = (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-muted/50">
        {limitReached ? (
          <Clock className="size-4 text-amber-500" />
        ) : (
          <Zap className="size-4 text-muted-foreground" />
        )}
      </div>
      <div>
        <p className="text-sm font-semibold leading-snug">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );

  const bodyContent = (
    <div className="flex flex-col gap-5">
      {/* PricingTable — click listener closes our overlay before Clerk opens checkout */}
      <div onClick={handlePricingAreaClick}>
        <PricingTable />
      </div>
      <p className="text-center text-xs text-muted-foreground">
        <Link
          href="/pricing"
          className="underline-offset-2 hover:underline"
          onClick={() => onOpenChange(false)}
        >
          View full pricing page
        </Link>
        {" · "}Cancel anytime · No hidden fees
      </p>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[92svh]">
          <DrawerHeader className="pb-4 text-left">
            <DrawerTitle asChild>
              <div>{headerContent}</div>
            </DrawerTitle>
            <DrawerDescription className="sr-only">{subtitle}</DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 pb-8">{bodyContent}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90svh] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg">
        <DialogHeader className="border-b px-6 py-5">
          <DialogTitle asChild>
            <div>{headerContent}</div>
          </DialogTitle>
          <DialogDescription className="sr-only">{subtitle}</DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6 py-6">{bodyContent}</div>
      </DialogContent>
    </Dialog>
  );
}
