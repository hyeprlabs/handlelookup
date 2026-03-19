"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AtSign } from "lucide-react";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import { useAuth } from "@clerk/nextjs";
import { UserDropdown } from "@/components/user-dropdown";
import { Skeleton } from "@/components/ui/skeleton";

export const navLinks = [
  {
    label: "Features",
    href: "/features",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
];

export function Header() {
  const scrolled = useScroll(10);
  const { isLoaded, isSignedIn } = useAuth();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 mx-auto w-full max-w-4xl border-transparent border-b md:rounded-md md:border md:transition-all md:ease-out",
        {
          "border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:top-2 md:max-w-3xl md:shadow":
            scrolled,
        },
      )}
    >
      <nav
        className={cn(
          "flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
          {
            "md:px-2": scrolled,
          },
        )}
      >
        <Link
          className="rounded-md p-2 hover:bg-muted dark:hover:bg-muted/50"
          href="/"
        >
          <div className="flex items-center gap-2">
            <AtSign className="size-4" />
            <span className="text-sm font-semibold">Handle Lookup</span>
          </div>
        </Link>
        <div className="hidden items-center gap-2 md:flex">
          <div>
            {navLinks.map((link) => (
              <Button asChild key={link.label} size="sm" variant="ghost">
                <a href={link.href}>{link.label}</a>
              </Button>
            ))}
          </div>
          {!isLoaded ? (
            <div className="flex items-center gap-2">
              <Skeleton className="h-7 w-16 rounded-full" />
              <Skeleton className="size-7 rounded-full" />
            </div>
          ) : isSignedIn ? (
            <>
              <Button asChild size="sm">
                <Link href="/pricing">Upgrade</Link>
              </Button>
              <UserDropdown />
            </>
          ) : (
            <>
              <Button asChild size="sm" variant="outline">
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </>
          )}
        </div>
        <MobileNav />
      </nav>
    </header>
  );
}
