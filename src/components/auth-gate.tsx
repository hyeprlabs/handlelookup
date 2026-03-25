"use client";

import Link from "next/link";
import { Lock, Check, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DAILY_LIMIT } from "@/lib/constants";
import { PLATFORMS } from "@/lib/platforms";

const EASE = [0.4, 0, 0.2, 1] as const;

const FREE_FEATURES = [
  `${DAILY_LIMIT} free lookups per day`,
  `${PLATFORMS.length} platforms checked`,
  "No credit card needed",
] as const;

interface AuthGateProps {
  handle: string;
}

export function AuthGate({ handle }: AuthGateProps) {
  return (
    <motion.div
      key="auth-gate"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.2, ease: EASE }}
      className="flex w-full flex-col items-center px-4 py-16 text-center md:px-8"
    >
      {/* Icon */}
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border bg-muted/50">
        <Lock className="size-5 text-muted-foreground" />
      </div>

      {/* Heading */}
      <h2 className="text-base font-semibold">
        Sign in to check{" "}
        <span className="font-mono text-foreground">@{handle}</span>
      </h2>
      <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
        Create a free account and instantly check availability across{" "}
        {PLATFORMS.length} platforms.
      </p>

      {/* Free plan preview */}
      <div className="mt-6 w-full max-w-xs rounded-xl border bg-muted/30 px-5 py-4 text-left">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Free plan includes
        </p>
        <ul className="space-y-2">
          {FREE_FEATURES.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm">
              <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                <Check className="size-2.5 text-emerald-600 dark:text-emerald-400" />
              </span>
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* CTAs */}
      <div className="mt-5 flex w-full max-w-xs flex-col gap-2">
        <Button asChild size="sm" className="w-full">
          <Link href={`/sign-up?redirect_url=${encodeURIComponent("/")}`}>
            Start free
            <ArrowRight className="ml-auto size-3.5 opacity-70" />
          </Link>
        </Button>
        <Separator className="my-1" />
        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <Link
            href={`/sign-in?redirect_url=${encodeURIComponent("/")}`}
            className="font-medium text-foreground underline-offset-2 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
