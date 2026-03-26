import type { Metadata } from "next";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/app/json-ld";
import { getAllPosts, getAllCategories, serializePost } from "@/lib/blog";
import { BlogPageClient } from "@/components/blog/blog-page-client";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Tutorials, guides, and updates from the Handle Lookup team. Learn how to check username availability, build with the API, and grow your digital brand.",
  alternates: { canonical: "https://handlelookup.com/blog" },
  openGraph: {
    type: "website",
    title: "Blog — Handle Lookup",
    description:
      "Tutorials, guides, and updates from the Handle Lookup team.",
    url: "https://handlelookup.com/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Handle Lookup",
    description:
      "Tutorials, guides, and updates from the Handle Lookup team.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts().map(serializePost);
  const categories = getAllCategories();

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden px-4 supports-[overflow:clip]:overflow-clip">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": "https://handlelookup.com/blog#blog",
          name: "Handle Lookup Blog",
          description:
            "Tutorials, guides, and updates from the Handle Lookup team.",
          url: "https://handlelookup.com/blog",
          publisher: { "@id": "https://handlelookup.com/#organization" },
          blogPost: posts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            url: `https://handlelookup.com${post.url}`,
            datePublished: post.date,
            author: {
              "@type": "Organization",
              name: post.author,
            },
          })),
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
        <Suspense fallback={<div className="py-16 text-sm text-muted-foreground">Loading…</div>}>
          <BlogPageClient posts={posts} categories={categories} />
        </Suspense>
        <Footer />
      </main>
    </div>
  );
}
