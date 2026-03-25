"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  ExternalLink,
  Search,
  CheckCircle,
  XCircle,
  HelpCircle,
  Loader2,
} from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import type { PlatformResult } from "@/lib/lookup";

type ResultWithDone = PlatformResult & { done?: boolean };

const STATUS_CONFIG = {
  available: {
    label: "Available",
    variant: "default" as const,
    icon: CheckCircle,
    className:
      "bg-green-500/10 text-green-600 border-green-500/20 dark:text-green-400",
  },
  taken: {
    label: "Taken",
    variant: "destructive" as const,
    icon: XCircle,
    className:
      "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400",
  },
  unknown: {
    label: "Unknown",
    variant: "outline" as const,
    icon: HelpCircle,
    className: "text-muted-foreground",
  },
};

function ResultCard({
  result,
  handle,
}: {
  result: PlatformResult;
  handle: string;
}) {
  const config = STATUS_CONFIG[result.status];
  const Icon = config.icon;
  const displayUrl = result.url.replace(/\{\}/g, handle);

  return (
    <Card className="gap-0 p-0">
      <CardHeader className="flex items-center justify-between px-4 py-2">
        <CardTitle className="text-sm font-medium">{result.platform}</CardTitle>
        <CardAction>
          <Badge
            variant="outline"
            className={cn("gap-1", config.className)}
          >
            <Icon className="size-3" />
            {config.label}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="border-y px-4 py-3">
        <p className="text-sm">
          Handle: <span className="text-muted-foreground">@{handle}</span>
        </p>
        {result.responseTime > 0 && (
          <p className="mt-1 text-xs text-muted-foreground">
            {result.responseTime}ms
          </p>
        )}
      </CardContent>
      <CardFooter className="border-none px-4 py-3">
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href={displayUrl} target="_blank" rel="noopener noreferrer">
            Open {result.platform}
            <ExternalLink className="size-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function SkeletonCard() {
  return (
    <Card className="animate-pulse gap-0 p-0">
      <CardHeader className="flex items-center justify-between px-4 py-2">
        <div className="h-4 w-24 rounded bg-muted" />
        <div className="h-5 w-16 rounded bg-muted" />
      </CardHeader>
      <CardContent className="border-y px-4 py-3">
        <div className="h-4 w-32 rounded bg-muted" />
      </CardContent>
      <CardFooter className="border-none px-4 py-3">
        <div className="h-8 w-full rounded bg-muted" />
      </CardFooter>
    </Card>
  );
}

export function LookupResults({ handle }: { handle: string }) {
  const router = useRouter();
  const [results, setResults] = useState<PlatformResult[]>([]);
  const [done, setDone] = useState(false);
  const [searchInput, setSearchInput] = useState(handle);
  const [totalPlatforms, setTotalPlatforms] = useState(0);

  const fetchResults = useCallback(() => {
    setResults([]);
    setDone(false);

    const eventSource = new EventSource(
      `/api/lookup?handle=${encodeURIComponent(handle)}`
    );

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data as string) as ResultWithDone;
        if (data.done) {
          setDone(true);
          eventSource.close();
          return;
        }
        setResults((prev) => [...prev, data as PlatformResult]);
      } catch {
        // ignore parse errors
      }
    };

    eventSource.onerror = () => {
      setDone(true);
      eventSource.close();
    };

    return () => eventSource.close();
  }, [handle]);

  useEffect(() => {
    // Fetch total platforms count
    import("@/lib/lookup").then(({ PLATFORMS }) => {
      setTotalPlatforms(PLATFORMS.length);
    });
    return fetchResults();
  }, [fetchResults]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchInput.trim().replace(/^@/, "");
    if (trimmed && trimmed !== handle) {
      router.push(`/lookup/${encodeURIComponent(trimmed)}`);
    }
  };

  const available = results.filter((r) => r.status === "available").length;
  const taken = results.filter((r) => r.status === "taken").length;

  return (
    <div className="px-4 py-8 md:px-8">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="mb-8 flex gap-2">
        <Input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Try another handle…"
          className="h-9 max-w-xs"
        />
        <Button type="submit" size="sm">
          <Search className="mr-1 size-4" />
          Check
        </Button>
      </form>

      {/* Header */}
      <div className="mb-6">
        <h1 className="mb-1 text-2xl font-semibold">
          Results for <span className="font-mono">@{handle}</span>
        </h1>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          {!done ? (
            <>
              <Loader2 className="size-3.5 animate-spin" />
              <span>
                Checking {results.length} /{" "}
                {totalPlatforms || "…"} platforms…
              </span>
            </>
          ) : (
            <span>
              Checked {results.length} platforms —{" "}
              <span className="font-medium text-green-600 dark:text-green-400">
                {available} available
              </span>
              {", "}
              <span className="font-medium text-red-600 dark:text-red-400">
                {taken} taken
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Results grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((result) => (
          <ResultCard key={result.platform} result={result} handle={handle} />
        ))}
        {/* Skeleton placeholders while loading */}
        {!done &&
          Array.from({
            length: Math.max(0, (totalPlatforms || 6) - results.length),
          }).map((_, i) => <SkeletonCard key={`skeleton-${i}`} />)}
      </div>
    </div>
  );
}
