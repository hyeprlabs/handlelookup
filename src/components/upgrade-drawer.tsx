"use client";

import Link from "next/link";
import { Zap } from "lucide-react";
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

interface UpgradeDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpgradeDrawer({ open, onOpenChange }: UpgradeDrawerProps) {
  const isMobile = useIsMobile();

  // Close our overlay the moment the user clicks Clerk's subscribe button,
  // so Clerk's checkout sheet isn't obscured.
  const handlePricingClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) {
      onOpenChange(false);
    }
  };

  const header = (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-muted/50">
        <Zap className="size-4 text-muted-foreground" />
      </div>
      <div>
        <p className="text-sm font-semibold leading-snug">Upgrade to Pro</p>
        <p className="text-xs text-muted-foreground">Unlimited lookups across all platforms</p>
      </div>
    </div>
  );

  const body = (
    <div className="flex flex-col gap-5">
      <div onClick={handlePricingClick}>
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
              <div>{header}</div>
            </DrawerTitle>
            <DrawerDescription className="sr-only">
              Upgrade to Pro for unlimited lookups
            </DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto px-4 pb-8">{body}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[90svh] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg">
        <DialogHeader className="border-b px-6 py-5">
          <DialogTitle asChild>
            <div>{header}</div>
          </DialogTitle>
          <DialogDescription className="sr-only">
            Upgrade to Pro for unlimited lookups
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto px-6 py-6">{body}</div>
      </DialogContent>
    </Dialog>
  );
}
