"use client";

import { useState } from "react";
import { useQueryState } from "nuqs";
import { Show } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AtSignIcon, Search } from "lucide-react";
import Link from "next/link";

export function LookupForm() {
  const [q, setQ] = useQueryState("q", { defaultValue: "" });
  const [input, setInput] = useState(q ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim().replace(/^@/, "");
    if (trimmed) setQ(trimmed);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fade-in slide-in-from-bottom-6 flex w-full max-w-sm animate-in items-center gap-2 fill-mode-backwards pt-2 delay-300 duration-500 ease-out"
    >
      <div className="relative flex-1">
        <Input
          aria-label="handle"
          className="peer ps-9"
          placeholder="yourhandle"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <AtSignIcon aria-hidden="true" size={16} />
        </div>
      </div>
      <Show
        when="signed-in"
        fallback={
          <Button asChild>
            <Link href="/sign-in">
              <Search/>
              Check
            </Link>
          </Button>
        }
      >
        <Button type="submit">
          <Search/>
          Check
        </Button>
      </Show>
    </form>
  );
}
