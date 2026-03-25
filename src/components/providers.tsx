"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { UpgradeDrawer } from "@/components/upgrade-drawer";

interface UpgradeDrawerCtx {
  openUpgrade: () => void;
}

const UpgradeDrawerContext = createContext<UpgradeDrawerCtx>({ openUpgrade: () => {} });

export const useUpgradeDrawer = () => useContext(UpgradeDrawerContext);

export function Providers({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <UpgradeDrawerContext.Provider value={{ openUpgrade: () => setOpen(true) }}>
      <NuqsAdapter>
        {children}
        <UpgradeDrawer open={open} onOpenChange={setOpen} />
      </NuqsAdapter>
    </UpgradeDrawerContext.Provider>
  );
}
