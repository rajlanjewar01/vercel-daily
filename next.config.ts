// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for the 'use cache' directive (moved from experimental)
  cacheComponents: true,
  experimental: {
    // Add any other experimental features here
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vercel-swag-store-api.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'i8qy5y6gxkdgdcv9.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
