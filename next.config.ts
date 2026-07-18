import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        // Allow any HTTPS image URL (covers GitHub, Vercel, Supabase storage, imgur, etc.)
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
