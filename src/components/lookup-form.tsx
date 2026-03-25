"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function LookupForm() {
  const [handle, setHandle] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = handle.trim().replace(/^@/, "");
    if (trimmed) {
      router.push(`/lookup/${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fade-in slide-in-from-bottom-10 flex w-fit animate-in items-center justify-center gap-2 fill-mode-backwards pt-2 delay-300 duration-500 ease-out"
    >
      <Input
        aria-label="handle"
        className="h-9"
        placeholder="Try a handle (e.g. alex)"
        type="text"
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
      />
      <Button type="submit">Check Availability</Button>
    </form>
  );
}
