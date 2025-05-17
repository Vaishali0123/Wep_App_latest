import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  distDir:"out",
  images: {
    domains: ["dn3w8358m09e7.cloudfront.net"],
  },
  /* config options here */
};

export default nextConfig;
