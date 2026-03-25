"use client";

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ExternalLink,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Search,
  SlidersHorizontal,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useQueryState, parseAsInteger } from "nuqs";
import { useAuth } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import { DAILY_LIMIT } from "@/lib/constants";
import { useUpgradeDrawer } from "@/components/providers";

// ── Constants ─────────────────────────────────────────────────────────────

const PAGE_SIZE = 12;
const EASE = [0.4, 0, 0.2, 1] as const;

const STATUS_CFG = {
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
    badge: "border-border text-muted-foreground",
  },
} as const;

// ── Types ─────────────────────────────────────────────────────────────────

interface LimitInfo {
  authenticated: boolean;
  isPro?: boolean;
  unlimited?: boolean;
  remaining?: number;
  limit?: number;
  allowed?: boolean;
}

// ── Helpers ────────────────────────────────────────────────────────────────

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "ellipsis")[] = [1];
  if (current > 3) pages.push("ellipsis");
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    pages.push(i);
  }
  if (current < total - 2) pages.push("ellipsis");
  pages.push(total);
  return pages;
}

// ── Sub-components ────────────────────────────────────────────────────────

function LimitBadge({
  info,
  onUpgrade,
}: {
  info: LimitInfo | null;
  onUpgrade: () => void;
}) {
  if (!info || !info.authenticated || info.isPro || info.unlimited) return null;

  const remaining = info.remaining ?? 0;
  const limit = info.limit ?? DAILY_LIMIT;
  const isEmpty = remaining === 0;
  const isLow = remaining === 1;

  if (isEmpty) {
    return (
      <button
        onClick={onUpgrade}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
      >
        <Zap className="size-3" />
        0/{limit} · Upgrade
      </button>
    );
  }

  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border bg-muted/50 px-2.5 py-1 text-xs font-medium text-muted-foreground">
      <span className="size-1.5 rounded-full bg-muted-foreground/40" />
      {remaining}/{limit} today
    </span>
  );
}

function StatsBar({
  results,
  total,
  done,
}: {
  results: PlatformResult[];
  total: number;
  done: boolean;
}) {
  const available = results.filter((r) => r.status === "available").length;
  const taken = results.filter((r) => r.status === "taken").length;
  const pct = total > 0 ? Math.round((results.length / total) * 100) : 0;

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground">
      {!done ? (
        <span className="flex items-center gap-1.5">
          <Spinner className="size-3" />
          <span className="font-mono tabular-nums text-xs">{pct}%</span>
        </span>
      ) : (
        <span className="tabular-nums text-xs">{results.length} platforms checked</span>
      )}
      {available > 0 && (
        <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
          {available} available
        </span>
      )}
      {taken > 0 && (
        <span className="text-xs font-medium text-red-600 dark:text-red-400">
          {taken} taken
        </span>
      )}
    </div>
  );
}

function ResultCard({ result, index }: { result: PlatformResult; index: number }) {
  const cfg = STATUS_CFG[result.status];
  const Icon = cfg.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, delay: Math.min(index * 0.015, 0.18), ease: EASE }}
    >
      <Card className="group gap-0 p-0 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <CardHeader className="flex items-center justify-between px-4 py-2.5">
          <CardTitle className="text-sm font-medium">{result.platform}</CardTitle>
          <CardAction>
            <Badge variant="outline" className={cn("gap-1 text-[11px]", cfg.badge)}>
              <Icon className="size-3" />
              {cfg.label}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="border-y px-4 py-2.5">
          <p className="truncate text-xs text-muted-foreground">{result.url}</p>
        </CardContent>
        <CardFooter className="border-none px-4 py-2.5">
          <Button
            variant="outline"
            size="sm"
            className="w-full transition-colors duration-150 group-hover:border-foreground/20"
            asChild
          >
            <Link href={result.url} target="_blank" rel="noopener noreferrer">
              View on {result.platform}
              <ExternalLink className="size-3 opacity-60 transition-opacity group-hover:opacity-100" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function SkeletonCard({ index }: { index: number }) {
  return (
    <div
      className="animate-in fade-in fill-mode-backwards duration-300"
      style={{ animationDelay: `${index * 12}ms` }}
    >
      <Card className="gap-0 p-0">
        <CardHeader className="flex items-center justify-between px-4 py-2.5">
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          <div className="h-5 w-14 animate-pulse rounded-full bg-muted" />
        </CardHeader>
        <CardContent className="border-y px-4 py-2.5">
          <div className="h-3 w-36 animate-pulse rounded bg-muted" />
        </CardContent>
        <CardFooter className="border-none px-4 py-2.5">
          <div className="h-8 w-full animate-pulse rounded bg-muted" />
        </CardFooter>
      </Card>
    </div>
  );
}

/** Renders while Clerk auth state is loading and a query is in the URL.
 *  Matches the dimensions of the real results view to prevent layout shift. */
function AuthLoadingState() {
  return (
    <div className="w-full animate-in fade-in px-4 py-6 duration-200 md:px-8">
      {/* Handle title */}
      <div className="mb-3 h-7 w-28 animate-pulse rounded bg-muted" />
      {/* Toolbar */}
      <div className="mb-6 space-y-3">
        <div className="flex gap-2">
          <div className="h-9 flex-1 animate-pulse rounded-md bg-muted" />
          <div className="h-9 w-36 animate-pulse rounded-md bg-muted" />
        </div>
        <div className="flex gap-1.5 overflow-hidden">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="h-7 w-16 shrink-0 animate-pulse rounded-full bg-muted"
              style={{ animationDelay: `${i * 40}ms` }}
            />
          ))}
        </div>
      </div>
      {/* Card grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, i) => (
          <SkeletonCard key={i} index={i} />
        ))}
      </div>
    </div>
  );
}

function IdleState() {
  return (
    <motion.div
      key="idle"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.22, delay: 0.15, ease: EASE }}
      className="flex flex-col items-center justify-center px-4 py-20 text-center md:px-8"
    >
      <p className="font-mono text-sm text-muted-foreground/60">
        ↑ enter a handle to check availability
      </p>
      <p className="mt-1.5 font-mono text-xs text-muted-foreground/40">
        checks across {PLATFORMS.length} platforms instantly
      </p>
    </motion.div>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border bg-muted/40">
        <SlidersHorizontal className="size-4 text-muted-foreground" />
      </div>
      <p className="text-sm font-medium">No results</p>
      <p className="mt-1 text-xs text-muted-foreground">
        No platforms match your current filters.
      </p>
      <Button variant="ghost" size="sm" className="mt-4 h-7 text-xs" onClick={onClear}>
        Clear filters
      </Button>
    </motion.div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export function LookupResults() {
  const { isSignedIn, isLoaded } = useAuth();
  const { openUpgrade } = useUpgradeDrawer();
  const router = useRouter();

  const [q] = useQueryState("q", { defaultValue: "" });
  const [category, setCategory] = useQueryState("category", {
    defaultValue: "featured",
    clearOnDefault: false,
  });
  const [status, setStatus] = useQueryState("status", {
    defaultValue: "all",
    clearOnDefault: false,
  });
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    clearOnDefault: true,
    throttleMs: 250,
  });
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));

  const [results, setResults] = useState<PlatformResult[]>([]);
  const [done, setDone] = useState(false);
  const [rateLimited, setRateLimited] = useState(false);
  const [limitInfo, setLimitInfo] = useState<LimitInfo | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const fetchLimitInfo = useCallback(() => {
    fetch("/api/lookup/status")
      .then((r) => r.json())
      .then(setLimitInfo)
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchLimitInfo();
  }, [fetchLimitInfo]);

  useEffect(() => {
    if (isLoaded) fetchLimitInfo();
  }, [isLoaded, isSignedIn, fetchLimitInfo]);

  // Unauthenticated users with a query → redirect to sign-up, return to same URL
  useEffect(() => {
    if (isLoaded && !isSignedIn && q) {
      router.push(
        `/sign-up?redirect_url=${encodeURIComponent(`/?q=${encodeURIComponent(q)}`)}`
      );
    }
  }, [isLoaded, isSignedIn, q, router]);

  const startLookup = useCallback(
    async (handle: string) => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setResults([]);
      setDone(false);
      setRateLimited(false);

      try {
        const response = await fetch(
          `/api/lookup?handle=${encodeURIComponent(handle)}`,
          { signal: controller.signal }
        );

        if (response.status === 429) {
          setRateLimited(true);
          setDone(true);
          fetchLimitInfo();
          return;
        }
        if (response.status === 401) {
          setDone(true);
          return;
        }
        if (!response.ok || !response.body) {
          setDone(true);
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done: streamDone, value } = await reader.read();
          if (streamDone) break;
          buffer += decoder.decode(value, { stream: true });
          const chunks = buffer.split("\n\n");
          buffer = chunks.pop() ?? "";
          for (const chunk of chunks) {
            if (!chunk.startsWith("data: ")) continue;
            try {
              const data = JSON.parse(chunk.slice(6)) as PlatformResult & {
                done?: boolean;
              };
              if (data.done) {
                setDone(true);
                fetchLimitInfo();
                return;
              }
              setResults((prev) => [...prev, data]);
            } catch {
              /* ignore malformed chunks */
            }
          }
        }
        setDone(true);
      } catch (err) {
        if (!(err instanceof DOMException && err.name === "AbortError")) {
          setDone(true);
        }
      }
    },
    [fetchLimitInfo]
  );

  useEffect(() => {
    if (!q) {
      abortRef.current?.abort();
      setResults([]);
      setDone(false);
      setRateLimited(false);
      return;
    }
    if (isLoaded && !isSignedIn) return; // redirect effect handles this

    setPage(1);
    startLookup(q);
    return () => abortRef.current?.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, isLoaded, isSignedIn]);

  const handleCategory = (v: string) => { setCategory(v); setPage(1); };
  const handleStatus = (v: string) => { setStatus(v); setPage(1); };
  const handleSearch = (v: string) => { setSearch(v); setPage(1); };
  const clearFilters = () => { setCategory("all"); setStatus("all"); setSearch(""); };

  const filtered = useMemo(() => {
    let list = [...results];
    const cat = category ?? "featured";
    if (cat !== "all") list = list.filter((r) => r.category === cat);
    const st = status ?? "all";
    if (st !== "all") list = list.filter((r) => r.status === st);
    const s = (search ?? "").toLowerCase().trim();
    if (s) list = list.filter((r) => r.platform.toLowerCase().includes(s));
    list.sort((a, b) => {
      const order = { available: 0, taken: 1, unknown: 2 };
      const diff = order[a.status] - order[b.status];
      return diff !== 0 ? diff : a.platform.localeCompare(b.platform);
    });
    return list;
  }, [results, category, status, search]);

  const totalPlatforms = PLATFORMS.length;
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page ?? 1), totalPages);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const skeletonCount =
    !done && currentPage === 1 ? Math.max(0, PAGE_SIZE - paginated.length) : 0;

  const catCounts = useMemo(
    () =>
      results.reduce<Record<string, number>>((acc, r) => {
        acc.all = (acc.all ?? 0) + 1;
        acc[r.category] = (acc[r.category] ?? 0) + 1;
        return acc;
      }, {}),
    [results]
  );

  const activeCat = (category ?? "featured") as Category | "all";
  const activeStatus = status ?? "all";

  // Derived state flags
  const authLoading = !isLoaded;
  const showAuthGate = isLoaded && !isSignedIn && !!q;
  const showRateLimited = isLoaded && !!isSignedIn && !!q && rateLimited;
  const showResults = isLoaded && !!isSignedIn && !!q && !rateLimited;

  return (
    <AnimatePresence mode="wait">
      {/* Clerk not yet initialized — show skeleton if query present, idle hint otherwise */}
      {authLoading && (
        <motion.div
          key="auth-loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {q ? <AuthLoadingState /> : <IdleState />}
        </motion.div>
      )}

      {/* No query — idle prompt */}
      {!authLoading && !q && <IdleState />}

      {/* Not signed in with query — redirect in progress, show skeleton */}
      {showAuthGate && (
        <motion.div
          key="auth-redirecting"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <AuthLoadingState />
        </motion.div>
      )}

      {/* Rate limited — clean empty state, no colors */}
      {showRateLimited && (
        <motion.div
          key="rate-limited"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="flex flex-col items-center justify-center px-4 py-20 text-center md:px-8"
        >
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border bg-muted/40">
            <Zap className="size-4 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium">Daily limit reached</p>
          <p className="mt-1.5 text-xs text-muted-foreground">
            You&apos;ve used all {DAILY_LIMIT} free lookups for today.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-5"
            onClick={openUpgrade}
          >
            Upgrade plan
          </Button>
        </motion.div>
      )}

      {/* Results */}
      {showResults && (
        <motion.div
          key={q}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2, ease: EASE }}
          className="w-full px-4 py-6 md:px-8"
        >
          {/* Handle + stats row */}
          <motion.div
            className="mb-3 flex flex-wrap items-baseline justify-between gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, delay: 0.06 }}
          >
            <h2 className="text-lg font-semibold tracking-tight">
              <span className="font-mono">@{q}</span>
            </h2>
            <StatsBar results={results} total={totalPlatforms} done={done} />
          </motion.div>

          {/* Filter toolbar */}
          <motion.div
            className="mb-6 space-y-3"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, delay: 0.1 }}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search platforms…"
                  className="h-9 pl-8 text-sm"
                  value={search ?? ""}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={activeStatus} onValueChange={handleStatus}>
                  <SelectTrigger className="h-9 w-full text-sm sm:w-36">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All results</SelectItem>
                    <SelectItem value="available">
                      <span className="flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-emerald-500" />
                        Available
                      </span>
                    </SelectItem>
                    <SelectItem value="taken">
                      <span className="flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-red-500" />
                        Taken
                      </span>
                    </SelectItem>
                    <SelectItem value="unknown">
                      <span className="flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-muted-foreground/40" />
                        Unknown
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <LimitBadge
                  info={limitInfo}
                  onUpgrade={openUpgrade}
                />
              </div>
            </div>

            {/* Category pills */}
            <div
              className="flex gap-1.5 overflow-x-auto pb-0.5"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {CATEGORIES.map((cat) => {
                const count = catCounts[cat.id] ?? 0;
                const isActive = activeCat === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategory(cat.id)}
                    className={cn(
                      "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
                      "transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive
                        ? "border-foreground/20 bg-foreground text-background"
                        : "border-border bg-background text-muted-foreground hover:border-foreground/15 hover:text-foreground"
                    )}
                  >
                    {cat.label}
                    {count > 0 && (
                      <Badge
                        variant="secondary"
                        className={cn(
                          "h-4 min-w-4 rounded-full px-1 text-[10px] font-semibold tabular-nums",
                          isActive
                            ? "bg-background/20 text-background"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        {count}
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Results grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.map((result, i) => (
              <ResultCard key={result.platform} result={result} index={i} />
            ))}
            {Array.from({ length: skeletonCount }, (_, i) => (
              <SkeletonCard key={`sk-${i}`} index={paginated.length + i} />
            ))}
          </div>

          {/* Empty state */}
          <AnimatePresence>
            {done && filtered.length === 0 && (
              <EmptyState onClear={clearFilters} />
            )}
          </AnimatePresence>

          {/* Pagination */}
          <AnimatePresence>
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="mt-8"
              >
                <Pagination>
                  <PaginationContent className="flex-wrap justify-center gap-1">
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setPage(Math.max(1, currentPage - 1))}
                        className={cn(
                          "cursor-pointer select-none transition-opacity",
                          currentPage <= 1 && "pointer-events-none opacity-40"
                        )}
                      />
                    </PaginationItem>
                    {getPageNumbers(currentPage, totalPages).map((p, i) =>
                      p === "ellipsis" ? (
                        <PaginationItem key={`e-${i}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={p}>
                          <PaginationLink
                            isActive={currentPage === p}
                            onClick={() => setPage(p)}
                            className="cursor-pointer select-none transition-colors"
                          >
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          setPage(Math.min(totalPages, currentPage + 1))
                        }
                        className={cn(
                          "cursor-pointer select-none transition-opacity",
                          currentPage >= totalPages &&
                            "pointer-events-none opacity-40"
                        )}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
