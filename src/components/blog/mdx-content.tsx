import { cn } from "@/lib/utils";
import { Callout } from "fumadocs-ui/components/callout";

/**
 * MDX component map — passed to the compiled MDX body component.
 * Callout is pre-imported so MDX files don't need to import it.
 */
export const mdxComponents = {
  Callout,
};

/**
 * Prose wrapper that applies typography styles to MDX content.
 * Uses @tailwindcss/typography and overrides with our app's CSS variables.
 */
export function MDXContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        // Base prose
        "prose prose-neutral dark:prose-invert max-w-none",
        // Headings
        "prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-foreground",
        "prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg",
        // Paragraphs and links
        "prose-p:text-foreground/80 prose-p:leading-relaxed",
        "prose-a:text-foreground prose-a:font-medium prose-a:underline prose-a:decoration-border hover:prose-a:decoration-foreground prose-a:transition-colors",
        // Code
        "prose-code:text-foreground prose-code:bg-muted prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono",
        "prose-code:before:content-none prose-code:after:content-none",
        "prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:rounded-xl",
        // Blockquote
        "prose-blockquote:border-l-border prose-blockquote:text-muted-foreground",
        // Lists
        "prose-li:text-foreground/80",
        // Table
        "prose-table:border-border prose-th:text-foreground prose-td:text-foreground/80",
        "prose-thead:border-border prose-tr:border-border",
        // Horizontal rule
        "prose-hr:border-border",
        // Strong and em
        "prose-strong:text-foreground prose-strong:font-semibold",
        className,
      )}
    >
      {children}
    </div>
  );
}
