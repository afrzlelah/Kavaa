import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**", // Mengizinkan semua gambar dari domain ini
      },
    ],
  },
  // Catatan: allowedDevOrigins bukanlah konfigurasi standar Next.js.
  // Jika Anda tidak menggunakan library khusus yang membutuhkannya, lebih baik dihapus.
};

export default nextConfig;
