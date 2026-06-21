import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/product/cracktiers";

const nextConfig: NextConfig = {
  basePath: basePath === "/" ? "" : basePath.replace(/\/$/, ""),
  trailingSlash: false,
};

export default nextConfig;
