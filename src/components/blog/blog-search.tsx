"use client";

import { useDocsSearch } from "fumadocs-core/search/client";
import { useState, useRef, useEffect } from "react";
import { Search, FileText, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function BlogSearch() {
  const [open, setOpen] = useState(false);

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="h-9 gap-2 text-muted-foreground"
        onClick={() => setOpen(true)}
        aria-label="Search blog"
      >
        <Search className="size-3.5" />
        <span className="hidden sm:inline text-xs">Search</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
          <span>⌘</span>K
        </kbd>
      </Button>

      <BlogSearchDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

function BlogSearchDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { search, setSearch, query } = useDocsSearch({
    type: "fetch",
    api: "/api/search",
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearch("");
    }
  }, [open, setSearch]);

  // query.data is SortedResult[] | 'empty' | undefined
  const results =
    Array.isArray(query.data) && query.data !== null ? query.data : [];
  const isEmpty = query.data === "empty";
  const isLoading = query.isLoading;
  const hasQuery = search.trim().length > 0;
  const hasResults = results.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 max-w-lg overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Search blog</DialogTitle>
        </DialogHeader>

        {/* Search input */}
        <div className="flex items-center gap-2 border-b px-3 py-2.5">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <Input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blog posts…"
            className="border-0 shadow-none focus-visible:ring-0 h-8 px-0 text-sm bg-transparent"
          />
          {isLoading && (
            <Loader2 className="size-4 shrink-0 text-muted-foreground animate-spin" />
          )}
          {search && !isLoading && (
            <button
              onClick={() => setSearch("")}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {!hasQuery ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Search className="size-8 text-muted-foreground/40 mb-2" />
              <p className="text-sm text-muted-foreground">
                Start typing to search blog posts
              </p>
            </div>
          ) : isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="size-5 text-muted-foreground animate-spin" />
            </div>
          ) : !hasResults || isEmpty ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="text-sm text-muted-foreground">
                No results for &ldquo;{search}&rdquo;
              </p>
            </div>
          ) : (
            <ul className="py-1">
              {results.map((result) => (
                <li key={result.id}>
                  <Link
                    href={result.url}
                    onClick={() => onOpenChange(false)}
                    className={cn(
                      "flex items-start gap-3 px-3 py-2.5 mx-1 rounded-lg",
                      "hover:bg-muted transition-colors duration-100",
                    )}
                  >
                    <FileText className="size-4 shrink-0 text-muted-foreground mt-0.5" />
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-sm font-medium leading-snug truncate">
                        {result.content}
                      </span>
                      {result.breadcrumbs && result.breadcrumbs.length > 0 && (
                        <span className="text-xs text-muted-foreground line-clamp-1">
                          {result.breadcrumbs.join(" › ")}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer hint */}
        <div className="border-t px-3 py-2 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            {hasResults
              ? `${results.length} result${results.length !== 1 ? "s" : ""}`
              : ""}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
              ↵
            </kbd>
            <span>to select</span>
            <kbd className="rounded border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
              esc
            </kbd>
            <span>to close</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
