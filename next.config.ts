import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
