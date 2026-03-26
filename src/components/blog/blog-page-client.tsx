"use client";

import { parseAsString, useQueryState } from "nuqs";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { DecorIcon } from "@/components/ui/decor-icon";
import type { SerializedPost } from "@/lib/blog";
import { Search } from "lucide-react";

type Props = {
  posts: SerializedPost[];
  categories: string[];
};

const ALL = "all";

function formatDate(dateStr: string): string {
  return new Date(dateStr)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();
}

function BlogCard({
  title,
  date,
  description,
  href,
}: {
  title: string;
  date: string;
  description: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="group flex h-24 w-full flex-col justify-center gap-y-1 p-4 hover:cursor-pointer hover:bg-accent/30 active:bg-accent dark:active:bg-accent/50"
    >
      <div className="relative flex items-end justify-center gap-2">
        <h3 className="whitespace-nowrap font-medium text-foreground text-lg md:text-xl">
          {title}
        </h3>
        <span className="mb-[6px] w-full border-b-2 border-dashed" />
        <span className="whitespace-nowrap font-mono text-muted-foreground text-xs uppercase group-hover:text-foreground md:text-sm">
          {date}
        </span>
      </div>
      <div className="max-w-sm text-muted-foreground text-sm group-hover:text-foreground md:max-w-full md:text-base">
        {description}
      </div>
    </a>
  );
}

export function BlogPageClient({ posts, categories }: Props) {
  const [category, setCategory] = useQueryState(
    "category",
    parseAsString.withDefault(ALL),
  );
  const [search, setSearch] = useQueryState("q", parseAsString.withDefault(""));

  const validCategory = [ALL, ...categories].includes(category)
    ? category
    : ALL;

  const filtered = posts.filter((post) => {
    const matchesCategory =
      validCategory === ALL || post.category === validCategory;
    const q = search.trim().toLowerCase();
    const matchesSearch =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q) ||
      post.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const tabValues = [ALL, ...categories];

  return (
    <div className="flex w-full flex-col justify-start mb-36">
      {/* Page header */}
      <div className="space-y-2 px-4 py-10 md:py-14">
        <h1 className="font-semibold text-2xl tracking-wide md:text-4xl">
          Latest Posts
        </h1>
        <p className="text-muted-foreground text-sm">
          Tutorials, guides, and updates from the Handle Lookup team.
        </p>
      </div>

      {/* Tabs + search row */}
      <div className="flex flex-col gap-3 px-4 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <Tabs
          value={validCategory}
          onValueChange={(v) => setCategory(v === ALL ? null : v)}
        >
          <TabsList className="h-8">
            {tabValues.map((cat) => (
              <TabsTrigger
                key={cat}
                value={cat}
                className="capitalize text-xs px-3"
              >
                {cat === ALL ? "All" : cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
          <Input
            className="pl-8 h-8 w-48 text-sm"
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value || null)}
          />
        </div>
      </div>

      {/* Blog list — corner decos + full-width dividers */}
      <div className="relative">
        <DecorIcon className="size-4" position="top-left" />
        <DecorIcon className="size-4" position="top-right" />
        <DecorIcon className="size-4" position="bottom-left" />
        <DecorIcon className="size-4" position="bottom-right" />

        <FullWidthDivider className="-top-px" />

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-muted-foreground text-sm">
              No posts found{search ? ` for "${search}"` : ""}.
            </p>
            {(search || validCategory !== ALL) && (
              <button
                className="mt-2 text-sm text-primary hover:underline"
                onClick={() => {
                  setSearch(null);
                  setCategory(null);
                }}
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y">
            {filtered.map((post) => (
              <BlogCard
                key={post.slug}
                title={post.title}
                date={formatDate(post.date)}
                description={post.description}
                href={post.url}
              />
            ))}
          </div>
        )}

        <FullWidthDivider className="-bottom-px" />
      </div>
    </div>
  );
}
