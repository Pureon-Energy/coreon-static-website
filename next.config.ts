import type { NextConfig } from "next";

// Static export for GitHub Pages: every URL is a real folder with an index.html (/, /en/, /privatliv/, /en/privacy/).
// NEXT_PUBLIC_BASE_PATH is "/repo-name" when served from user.github.io/repo-name, empty on a custom domain.
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  images: { unoptimized: true },
  experimental: { globalNotFound: true },
};

export default nextConfig;
