import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // ignore type cheking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // ignore eslint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
