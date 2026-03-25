"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { UpgradeDrawer } from "@/components/upgrade-drawer";

// ── Context ────────────────────────────────────────────────────────────────

interface UpgradeDrawerCtx {
  openUpgrade: (opts?: { handle?: string; limitReached?: boolean }) => void;
}

const UpgradeDrawerContext = createContext<UpgradeDrawerCtx>({
  openUpgrade: () => {},
});

export const useUpgradeDrawer = () => useContext(UpgradeDrawerContext);

// ── Provider ───────────────────────────────────────────────────────────────

export function Providers({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [limitReached, setLimitReached] = useState(false);

  const openUpgrade = (opts?: { handle?: string; limitReached?: boolean }) => {
    setLimitReached(opts?.limitReached ?? false);
    setOpen(true);
  };

  return (
    <UpgradeDrawerContext.Provider value={{ openUpgrade }}>
      <NuqsAdapter>
        {children}
        <UpgradeDrawer
          open={open}
          onOpenChange={setOpen}
          limitReached={limitReached}
        />
      </NuqsAdapter>
    </UpgradeDrawerContext.Provider>
  );
}
