import type { NextConfig } from "next";

// Fails the build early when NEXT_PUBLIC_* variables are missing or invalid.
import "./src/config/env";
import { securityHeaders } from "./src/config/security-headers";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: isGithubPages ? "export" : "standalone",
  ...(isGithubPages ? { basePath: "/Marketing-Platform-Frontend", trailingSlash: true } : {}),
  poweredByHeader: false,
  reactStrictMode: true,
  typedRoutes: true,
  cacheComponents: !isGithubPages,
  partialPrefetching: !isGithubPages,
  images: {
    formats: ["image/avif", "image/webp"],
    unoptimized: isGithubPages,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  ...(!isGithubPages
    ? {
        async headers() {
          return [
            {
              source: "/:path*",
              headers: securityHeaders,
            },
          ];
        },
      }
    : {}),
};

export default nextConfig;
