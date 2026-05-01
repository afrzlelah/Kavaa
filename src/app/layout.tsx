import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kavaa | Elevasi Karir & Pembelajaran Masa Depan",
  description:
    "Temukan jalur belajar yang dipersonalisasi dari ribuan kursus, sertifikasi global, dan program dari institusi ternama untuk mencapai potensi penuh Anda bersama Kavaa.",
  keywords: ["e-learning", "pembelajaran online", "kursus gratis", "sertifikasi IT", "karir masa depan", "Kavaa", "kolaborasi proyek"],
  authors: [{ name: "Kavaa Team" }],
  openGraph: {
    title: "Kavaa | Platform Pembelajaran & Kolaborasi",
    description: "Tingkatkan skill dan bangun portfolio bersama komunitas Kavaa.",
    url: "https://kavaa.vercel.app",
    siteName: "Kavaa",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kavaa | Where Learning Meets Evolution",
    description: "Platform edukasi masa depan untuk generasi inovatif.",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://hicicwwcehgpznjdtqry.supabase.co" />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
