import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Slugs are pre-rendered at build time from the client registry.
  // No rewrites needed — /api/config/[slug] and /[slug] are both native App Router routes.
};

export default nextConfig;
