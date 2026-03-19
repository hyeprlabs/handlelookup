"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { UserIcon, SettingsIcon, CreditCardIcon, KeyIcon } from "lucide-react";

const navItems = [
  { label: "Profile", href: "/app/profile", icon: UserIcon },
  { label: "Settings", href: "/app/settings", icon: SettingsIcon },
  { label: "Billing", href: "/app/settings/billing", icon: CreditCardIcon },
  { label: "API Keys", href: "/app/settings/api", icon: KeyIcon },
];

export function AppSidebarNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile: horizontal scrollable tab bar — same pill style as desktop */}
      <nav className="flex gap-1 overflow-x-auto pb-2 sm:hidden">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2 text-sm whitespace-nowrap transition-colors",
              pathname === href
                ? "bg-muted font-medium text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Desktop: vertical sidebar */}
      <aside className="hidden w-44 shrink-0 sm:block">
        <nav className="flex flex-col gap-0.5">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm transition-colors",
                pathname === href
                  ? "bg-muted font-medium text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
