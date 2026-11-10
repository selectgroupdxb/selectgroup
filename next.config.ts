import type { NextConfig } from "next";
import { cspHeaderValue } from "./src/lib/csp";

const nextConfig: NextConfig = {
  // Cache Components / Partial Prefetching are left off for now — phase 1 is
  // static/seed content with no dynamic data access yet. Revisit once Sanity
  // queries land and a deliberate caching strategy is designed around them.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [{ key: "Content-Security-Policy", value: cspHeaderValue }],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
