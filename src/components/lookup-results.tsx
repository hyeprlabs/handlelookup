"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import {
  ExternalLink,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Loader2,
} from "lucide-react";
import { useQueryState } from "nuqs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CATEGORIES, PLATFORMS, type Category } from "@/lib/platforms";
import type { PlatformResult } from "@/lib/lookup";

const STATUS = {
  available: {
    label: "Available",
    icon: CheckCircle2,
    badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  taken: {
    label: "Taken",
    icon: XCircle,
    badge: "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
  },
  unknown: {
    label: "Unknown",
    icon: HelpCircle,
    badge: "text-muted-foreground",
  },
} as const;

function CategoryFilter({
  active,
  counts,
  onChange,
}: {
  active: string;
  counts: Record<string, number>;
  onChange: (cat: string) => void;
}) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
      {CATEGORIES.map((cat) => {
        const count = counts[cat.id] ?? 0;
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all duration-200",
              isActive
                ? "border-foreground/20 bg-foreground text-background"
                : "border-border bg-background text-muted-foreground hover:border-foreground/20 hover:text-foreground"
            )}
          >
            {cat.label}
            {count > 0 && (
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums leading-none",
                  isActive ? "bg-background/20 text-background" : "bg-muted text-muted-foreground"
                )}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function ResultCard({ result, index }: { result: PlatformResult; index: number }) {
  const cfg = STATUS[result.status];
  const Icon = cfg.icon;
  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-3 fill-mode-backwards duration-300 ease-out"
      style={{ animationDelay: `${Math.min(index * 20, 300)}ms` }}
    >
      <Card className="gap-0 p-0 transition-shadow duration-200 hover:shadow-md">
        <CardHeader className="flex items-center justify-between px-4 py-2.5">
          <CardTitle className="text-sm font-medium">{result.platform}</CardTitle>
          <CardAction>
            <Badge variant="outline" className={cn("gap-1 text-[11px]", cfg.badge)}>
              <Icon className="size-3" />
              {cfg.label}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="border-y px-4 py-3">
          <p className="truncate text-sm text-muted-foreground">{result.url}</p>
        </CardContent>
        <CardFooter className="border-none px-4 py-2.5">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href={result.url} target="_blank" rel="noopener noreferrer">
              View on {result.platform}
              <ExternalLink className="size-3" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

function SkeletonCard({ index }: { index: number }) {
  return (
    <div
      className="animate-in fade-in fill-mode-backwards duration-500"
      style={{ animationDelay: `${index * 15}ms` }}
    >
      <Card className="gap-0 p-0">
        <CardHeader className="flex items-center justify-between px-4 py-2.5">
          <div className="h-4 w-28 animate-pulse rounded bg-muted" />
          <div className="h-5 w-16 animate-pulse rounded-full bg-muted" />
        </CardHeader>
        <CardContent className="border-y px-4 py-3">
          <div className="h-4 w-40 animate-pulse rounded bg-muted" />
        </CardContent>
        <CardFooter className="border-none px-4 py-2.5">
          <div className="h-8 w-full animate-pulse rounded bg-muted" />
        </CardFooter>
      </Card>
    </div>
  );
}

function StatsBar({ results, total, done }: { results: PlatformResult[]; total: number; done: boolean }) {
  const available = results.filter((r) => r.status === "available").length;
  const taken = results.filter((r) => r.status === "taken").length;
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
      {!done ? (
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Loader2 className="size-3.5 animate-spin" />
          Checking {results.length}&thinsp;/&thinsp;{total} platforms
        </span>
      ) : (
        <span className="text-muted-foreground">{results.length} platforms checked</span>
      )}
      {available > 0 && (
        <span className="font-medium text-emerald-600 dark:text-emerald-400">{available} available</span>
      )}
      {taken > 0 && (
        <span className="font-medium text-red-600 dark:text-red-400">{taken} taken</span>
      )}
    </div>
  );
}

function DefaultGrid() {
  const featured = PLATFORMS.filter((p) => p.category === "featured");
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {featured.map((p, i) => (
        <div
          key={p.name}
          className="animate-in fade-in fill-mode-backwards duration-500"
          style={{ animationDelay: `${i * 30}ms` }}
        >
          <Card className="gap-0 p-0 opacity-50">
            <CardHeader className="px-4 py-2.5">
              <CardTitle className="text-sm font-medium">{p.name}</CardTitle>
            </CardHeader>
            <CardContent className="border-y px-4 py-3">
              <p className="truncate text-xs text-muted-foreground">{p.urlMain}</p>
            </CardContent>
            <CardFooter className="border-none px-4 py-2.5">
              <div className="h-8 w-full rounded border border-dashed border-border" />
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}

export function LookupResults() {
  const [q] = useQueryState("q", { defaultValue: "" });
  const [category, setCategory] = useQueryState("category", { defaultValue: "featured" });
  const [results, setResults] = useState<PlatformResult[]>([]);
  const [done, setDone] = useState(false);
  const esRef = useRef<EventSource | null>(null);

  const startLookup = useCallback((handle: string) => {
    esRef.current?.close();
    setResults([]);
    setDone(false);
    const es = new EventSource(`/api/lookup?handle=${encodeURIComponent(handle)}`);
    esRef.current = es;
    es.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as PlatformResult & { done?: boolean };
        if (data.done) { setDone(true); es.close(); return; }
        setResults((prev) => [...prev, data]);
      } catch { /* ignore */ }
    };
    es.onerror = () => { setDone(true); es.close(); };
  }, []);

  useEffect(() => {
    if (!q) { esRef.current?.close(); setResults([]); setDone(false); return; }
    startLookup(q);
    return () => esRef.current?.close();
  }, [q, startLookup]);

  const counts = results.reduce<Record<string, number>>((acc, r) => {
    acc.all = (acc.all ?? 0) + 1;
    acc[r.category] = (acc[r.category] ?? 0) + 1;
    return acc;
  }, {});

  const activeCat = (category ?? "featured") as Category | "all";
  const filtered = activeCat === "all" ? results : results.filter((r) => r.category === activeCat);
  const totalPlatforms = PLATFORMS.length;
  const categoryTotal = activeCat === "all" ? totalPlatforms : PLATFORMS.filter((p) => p.category === activeCat).length;
  const skeletonCount = !done ? Math.max(0, categoryTotal - filtered.length) : 0;

  if (!q) {
    return (
      <div className="relative mx-auto w-full max-w-5xl px-4 py-8 md:px-8 md:py-10">
        <p className="mb-6 text-sm text-muted-foreground">
          Enter a handle above — we&apos;ll check availability across {totalPlatforms} platforms instantly.
        </p>
        <DefaultGrid />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6 md:px-8">
      <div className="mb-4">
        <h2 className="text-xl font-semibold"><span className="font-mono">@{q}</span></h2>
        <div className="mt-1"><StatsBar results={results} total={totalPlatforms} done={done} /></div>
      </div>
      {!done && (
        <div className="mb-4 h-px w-full overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-foreground transition-all duration-500 ease-out"
            style={{ width: `${(results.length / totalPlatforms) * 100}%` }}
          />
        </div>
      )}
      <div className="mb-5">
        <CategoryFilter active={activeCat} counts={counts} onChange={(cat) => setCategory(cat)} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((result, i) => (
          <ResultCard key={result.platform} result={result} index={i} />
        ))}
        {Array.from({ length: skeletonCount }, (_, i) => (
          <SkeletonCard key={`sk-${i}`} index={filtered.length + i} />
        ))}
      </div>
    </div>
  );
}
