import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "*.app.github.dev"],
    },
    turbopackUseSystemTlsCerts: true,
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
