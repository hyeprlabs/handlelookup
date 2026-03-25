import { defineCollections, defineConfig } from "fumadocs-mdx/config";
import { z } from "zod";

export const blog = defineCollections({
  type: "doc",
  dir: "content/blog",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().date(),
    category: z.string(),
    tags: z.array(z.string()).optional().default([]),
    author: z.string().optional().default("Handle Lookup Team"),
    image: z.string().optional(),
  }),
});

export default defineConfig({
  mdxOptions: {},
});
