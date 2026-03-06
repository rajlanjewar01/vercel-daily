// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Required for the 'use cache' directive
    cacheComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vercel-swag-store-api.vercel.app',
      },
    ],
  },
};

export default nextConfig;
