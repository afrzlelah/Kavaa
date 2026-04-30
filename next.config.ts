import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.gstatic.com",
        pathname: "/**",
      },
      // Supabase Storage — derived from NEXT_PUBLIC_SUPABASE_URL
      {
        protocol: "https",
        hostname: "hicicwwcehgpznjdtqry.supabase.co",
        pathname: "/storage/v1/object/**",
      },
      // CDN for devicon tech logos used in learning path cards
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        pathname: "/**",
      },
      // Dynamic avatar fallbacks
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        pathname: "/**",
      },
      // Google Images for user avatars
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      // Instagram/Facebook CDN for user avatars
      {
        protocol: "https",
        hostname: "instagram.fsrg6-1.fna.fbcdn.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
