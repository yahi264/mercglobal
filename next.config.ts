import type { NextConfig } from "next";

// The whole site is static (no server), so it can be hosted on GitHub Pages.
// NEXT_PUBLIC_BASE_PATH is "/mercglobal" for the GitHub Pages copy and empty on a normal domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
