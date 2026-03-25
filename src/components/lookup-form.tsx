"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useQueryState } from "nuqs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface LimitInfo {
  authenticated: boolean;
  plan?: "pro" | "free" | null;
  unlimited?: boolean;
  remaining?: number;
  limit?: number;
}

export function LookupForm() {
  const [q, setQ] = useQueryState("q", { defaultValue: "" });
  const [input, setInput] = useState(q ?? "");
  const [limitInfo, setLimitInfo] = useState<LimitInfo | null>(null);

  useEffect(() => {
    fetch("/api/lookup/status")
      .then((r) => r.json())
      .then(setLimitInfo)
      .catch(() => {});
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim().replace(/^@/, "");
    if (trimmed) setQ(trimmed);
  };

  const showStatus = limitInfo !== null && !limitInfo.unlimited;
  const isLimitReached = showStatus && (limitInfo?.remaining ?? 0) === 0;

  return (
    <div className="flex flex-col items-center gap-2">
      <form
        onSubmit={handleSubmit}
        className="fade-in slide-in-from-bottom-6 flex w-full max-w-sm animate-in items-center gap-2 fill-mode-backwards pt-2 delay-300 duration-500 ease-out"
      >
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-muted-foreground select-none">
            @
          </span>
          <Input
            aria-label="handle"
            className="h-9 pl-7"
            placeholder="yourhandle"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </div>
        <Button type="submit" size="sm" className="shrink-0">
          <Search className="size-3.5" />
          Check
        </Button>
      </form>

      {showStatus && (
        <p className="text-xs text-muted-foreground">
          {isLimitReached ? (
            limitInfo?.authenticated ? (
              <>
                Daily limit reached ·{" "}
                <Link
                  href="/pricing"
                  className="underline underline-offset-2"
                >
                  Upgrade to Pro
                </Link>
              </>
            ) : (
              <>
                Free limit reached ·{" "}
                <Link
                  href="/sign-in?redirect_url=%2F"
                  className="underline underline-offset-2"
                >
                  Sign in for more
                </Link>
                {" "}or{" "}
                <Link
                  href="/pricing"
                  className="underline underline-offset-2"
                >
                  go Pro
                </Link>
              </>
            )
          ) : (
            `${limitInfo?.remaining}/${limitInfo?.limit ?? 5} free lookups remaining today`
          )}
        </p>
      )}
    </div>
  );
}
