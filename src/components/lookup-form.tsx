"use client";

import { useState } from "react";
import { useQueryState } from "nuqs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

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
  );
}
