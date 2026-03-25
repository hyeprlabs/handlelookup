import { createSearchAPI } from "fumadocs-core/search/server";
import { getAllPosts, serializePost } from "@/lib/blog";

const posts = getAllPosts().map(serializePost);

export const { GET } = createSearchAPI("simple", {
  indexes: posts.map((post) => ({
    title: post.title,
    description: post.description,
    url: post.url,
    content: post.description,
    keywords: post.tags.join(" "),
  })),
});
