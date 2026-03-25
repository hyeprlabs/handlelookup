import { blog } from "@/.source";

// Type for a single blog post entry from the collection
export type BlogPost = (typeof blog)[number];

// Derive slug from file path (e.g. "my-post.mdx" → "my-post")
export function getPostSlug(post: BlogPost): string {
  return post.info.path.replace(/\.mdx?$/, "");
}

// URL for a given post
export function getPostUrl(post: BlogPost): string {
  return `/blog/${getPostSlug(post)}`;
}

// All posts sorted by date descending (newest first)
export function getAllPosts(): BlogPost[] {
  return [...blog].sort(
    (a, b) =>
      new Date(b.date as string).getTime() -
      new Date(a.date as string).getTime(),
  );
}

// Find a single post by slug
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blog.find((post) => getPostSlug(post) === slug);
}

// All unique categories across posts
export function getAllCategories(): string[] {
  return [...new Set(blog.map((post) => post.category as string))];
}

// Posts filtered by category
export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((post) => (post.category as string) === category);
}

// Serializable shape used by client components and page metadata
export type SerializedPost = {
  slug: string;
  url: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  author: string;
};

export function serializePost(post: BlogPost): SerializedPost {
  return {
    slug: getPostSlug(post),
    url: getPostUrl(post),
    title: post.title as string,
    description: post.description as string,
    date: post.date as string,
    category: post.category as string,
    tags: (post.tags as string[]) ?? [],
    author: (post.author as string) ?? "Handle Lookup Team",
  };
}
