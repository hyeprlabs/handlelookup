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
      className="fade-in slide-in-from-bottom-10 flex w-fit animate-in items-center justify-center gap-2 fill-mode-backwards pt-2 delay-300 duration-500 ease-out"
    >
      <Input
        aria-label="handle"
        className="h-9 min-w-56"
        placeholder="Try a handle (e.g. alex)"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button type="submit">
        <Search className="size-4" />
        Check
      </Button>
    </form>
  );
}
