"use client";

import { useState } from "react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, ArrowRight } from "lucide-react";
import { PricingTable } from "@clerk/nextjs";

interface UpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  authenticated: boolean;
}

const proFeatures = [
  "Unlimited lookups per day",
  "All 65+ platforms",
  "Real-time streaming results",
  "No daily resets",
];

function UpgradeContent({
  authenticated,
  showPricing,
  onShowPricing,
  onBack,
  onClose,
}: {
  authenticated: boolean;
  showPricing: boolean;
  onShowPricing: () => void;
  onBack: () => void;
  onClose: () => void;
}) {
  if (showPricing) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="-ml-2">
          ← Back
        </Button>
        <PricingTable newSubscriptionRedirectUrl="/app/settings/billing?upgraded=true" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ul className="space-y-2">
        {proFeatures.map((f) => (
          <li key={f} className="flex items-center gap-2 text-sm">
            <Check className="size-4 shrink-0 text-muted-foreground" />
            {f}
          </li>
        ))}
      </ul>

      <Separator />

      {authenticated ? (
        <div className="flex flex-col gap-2">
          <Button className="w-full gap-2" onClick={onShowPricing}>
            Upgrade to Pro
            <ArrowRight className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-muted-foreground"
            onClick={onClose}
          >
            Maybe later
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <Button asChild className="w-full gap-2">
            <Link href="/sign-up?redirect_url=%2F">
              Create free account
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/sign-in?redirect_url=%2F">Sign in</Link>
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Or{" "}
            <Link href="/pricing" className="underline underline-offset-2">
              view Pro plans
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export function UpgradeDialog({
  open,
  onOpenChange,
  authenticated,
}: UpgradeDialogProps) {
  const isMobile = useIsMobile();
  const [showPricing, setShowPricing] = useState(false);

  const title = showPricing ? "Choose a plan" : "Daily limit reached";
  const description = showPricing
    ? undefined
    : authenticated
      ? "You've used all 5 free lookups for today. Upgrade to Pro for unlimited access."
      : "You've used all 5 free lookups today. Sign in for 5 more per day, or upgrade to Pro.";

  const sharedContent = (
    <UpgradeContent
      authenticated={authenticated}
      showPricing={showPricing}
      onShowPricing={() => setShowPricing(true)}
      onBack={() => setShowPricing(false)}
      onClose={() => onOpenChange(false)}
    />
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            {description && (
              <DrawerDescription>{description}</DrawerDescription>
            )}
          </DrawerHeader>
          <div className="overflow-y-auto px-4">{sharedContent}</div>
          <DrawerFooter />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={showPricing ? "max-w-3xl" : "max-w-md"}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>
        {sharedContent}
      </DialogContent>
    </Dialog>
  );
}
