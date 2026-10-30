import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow images from any source for placeholder image support
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Ensure GSAP works in SSR environment
  transpilePackages: ['gsap'],
};

export default nextConfig;
