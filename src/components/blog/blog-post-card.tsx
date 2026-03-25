import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { SerializedPost } from "@/lib/blog";

const CATEGORY_COLORS: Record<string, string> = {
  tutorials:
    "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900",
  guides:
    "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/30 dark:text-purple-400 dark:border-purple-900",
  changelog:
    "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900",
  product:
    "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950/30 dark:text-orange-400 dark:border-orange-900",
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function BlogPostCard({ post }: { post: SerializedPost }) {
  const colorClass =
    CATEGORY_COLORS[post.category] ??
    "bg-muted text-muted-foreground border-border";

  return (
    <Link
      href={post.url}
      className={cn(
        "group flex flex-col gap-3 rounded-xl border border-border p-5",
        "bg-card hover:bg-muted/40 transition-colors duration-150",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium capitalize",
            colorClass,
          )}
        >
          {post.category}
        </span>
        <time
          className="text-xs text-muted-foreground tabular-nums"
          dateTime={post.date}
        >
          {formatDate(post.date)}
        </time>
      </div>

      <h2 className="font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
        {post.title}
      </h2>

      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
        {post.description}
      </p>

      {post.tags.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-1 pt-1">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs px-1.5 py-0">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </Link>
  );
}
