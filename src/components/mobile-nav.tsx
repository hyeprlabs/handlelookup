"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/components/header";
import { MenuIcon } from "lucide-react";
import { Show } from "@clerk/nextjs";
import Link from "next/link";

export function MobileNav() {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            aria-label="Toggle menu"
            className="md:hidden"
            size="icon"
            variant="outline"
          >
            <MenuIcon className="size-4.5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 pt-12">
          <div className="grid gap-y-1 px-2">
            {navLinks.map((link) => (
              <Button
                asChild
                className="justify-start"
                key={link.label}
                variant="ghost"
              >
                <a href={link.href}>{link.label}</a>
              </Button>
            ))}
          </div>
          <div className="mt-12 flex flex-col gap-2 px-2">
            <Show
              when="signed-out"
              fallback={
                <>
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/app/profile">Profile</Link>
                  </Button>
                  <Button asChild className="w-full">
                    <Link href="/pricing">Upgrade</Link>
                  </Button>
                </>
              }
            >
              <Button asChild className="w-full" variant="outline">
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </Show>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
