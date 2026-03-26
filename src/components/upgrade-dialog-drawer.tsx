"use client";

import * as React from "react";
import { PricingTable } from "@clerk/nextjs";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface UpgradeDialogDrawerProps {
  children: React.ReactNode;
}

export function UpgradeDialogDrawer({ children }: UpgradeDialogDrawerProps) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) {
      setOpen(false);
    }
  };

  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Upgrade your Plan</DialogTitle>
            <DialogDescription>
              Unlimited lookups across 400+ platforms.
            </DialogDescription>
          </DialogHeader>
          <div
            className="overflow-y-auto px-4 pt-4 pb-12"
            onClick={handleClick}
          >
            <PricingTable
              collapseFeatures={isMobile}
              fallback={
                <div className="flex justify-center pt-4">
                  <Spinner />
                </div>
              }
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Upgrade your Plan</DrawerTitle>
          <DrawerDescription>
            Unlimited lookups across 400+ platforms.
          </DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto px-4 pt-4 pb-12" onClick={handleClick}>
          <PricingTable
            collapseFeatures={isMobile}
            fallback={
              <div className="flex justify-center pt-4">
                <Spinner />
              </div>
            }
          />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
