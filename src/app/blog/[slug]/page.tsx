import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { getAllPosts, getPostBySlug, getPostUrl } from "@/lib/blog";
import { MDXContent, mdxComponents } from "@/components/blog/mdx-content";
import { DecorIcon } from "@/components/ui/decor-icon";
import { FullWidthDivider } from "@/components/ui/full-width-divider";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.info.path.replace(/\.mdx?$/, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  const url = `https://handlelookup.com${getPostUrl(post)}`;

  return {
    title: post.title as string,
    description: post.description as string,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title as string,
      description: post.description as string,
      url,
      publishedTime: post.date as string,
      authors: [post.author as string],
      tags: post.tags as string[],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title as string,
      description: post.description as string,
    },
  };
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

  const { body: MDX, toc } = post;
  const postUrl = `https://handlelookup.com${getPostUrl(post)}`;
  const colorClass =
    CATEGORY_COLORS[post.category as string] ??
    "bg-muted text-muted-foreground border-border";

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden px-4 supports-[overflow:clip]:overflow-clip">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "@id": postUrl,
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          url: postUrl,
          author: {
            "@type": "Organization",
            name: post.author ?? "Handle Lookup Team",
          },
          publisher: { "@id": "https://handlelookup.com/#organization" },
          isPartOf: { "@id": "https://handlelookup.com/blog#blog" },
          keywords: (post.tags as string[]).join(", "),
        }}
      />

      <Header />

      <main
        className={cn(
          "relative mx-auto w-full max-w-4xl grow",
          "before:absolute before:-inset-y-14 before:-left-px before:w-px before:bg-border",
          "after:absolute after:-inset-y-14 after:-right-px after:w-px after:bg-border",
        )}
      >
        {/* Back nav */}
        <div className="px-4 pt-8 pb-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            Back to blog
          </Link>
        </div>

        {/* Post header — corner decos + full-width dividers */}
        <div className="relative">
          <DecorIcon className="size-4" position="top-left" />
          <DecorIcon className="size-4" position="top-right" />
          <DecorIcon className="size-4" position="bottom-left" />
          <DecorIcon className="size-4" position="bottom-right" />

          <FullWidthDivider className="-top-px" />

          <header className="flex flex-col gap-4 px-4 py-10 md:py-14">
            {/* Category + date row */}
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  "inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-medium capitalize",
                  colorClass,
                )}
              >
                {post.category as string}
              </span>
              <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground uppercase">
                <Calendar className="size-3.5" />
                <time dateTime={post.date as string}>
                  {formatDate(post.date as string)}
                </time>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold tracking-tight leading-tight md:text-4xl lg:text-5xl">
              {post.title as string}
            </h1>

            {/* Description */}
            <p className="text-base text-muted-foreground leading-relaxed md:text-lg max-w-2xl">
              {post.description as string}
            </p>

            {/* Author + tags row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
              <span className="text-sm text-muted-foreground">
                By{" "}
                <span className="text-foreground font-medium">
                  {post.author as string}
                </span>
              </span>
              {(post.tags as string[]).length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {(post.tags as string[]).map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </header>

          <FullWidthDivider className="-bottom-px" />
        </div>

        {/* Table of contents */}
        {toc && toc.length > 0 && (
          <div className="relative">
            <div className="px-4 py-6">
              <InlineTOC
                items={toc}
                className="rounded-xl border border-border bg-card not-prose"
              >
                Table of contents
              </InlineTOC>
            </div>
            <FullWidthDivider className="-bottom-px" />
          </div>
        )}

        {/* MDX content */}
        <div className="px-4 py-10 md:py-14">
          <MDXContent>
            <MDX components={mdxComponents} />
          </MDXContent>
        </div>

        {/* Post footer CTA — corner decos + full-width dividers */}
        <div className="relative mb-36">
          <DecorIcon className="size-4" position="top-left" />
          <DecorIcon className="size-4" position="top-right" />
          <DecorIcon className="size-4" position="bottom-left" />
          <DecorIcon className="size-4" position="bottom-right" />

          <FullWidthDivider className="-top-px" />

          <div className="flex flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-3.5" />
              Back to all posts
            </Link>
            {(post.tags as string[]).length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {(post.tags as string[]).slice(0, 4).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <FullWidthDivider className="-bottom-px" />
        </div>

        <Footer />
      </main>
    </div>
  );
}
