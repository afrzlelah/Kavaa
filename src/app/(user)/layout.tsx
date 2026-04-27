"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import SidebarKiri from "@/components/layouts/dashboard/SidebarKiri";
import SidebarKanan from "@/components/layouts/dashboard/SidebarKanan";
import { useParams, usePathname } from "next/navigation";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  // Right sidebar is mostly shown on Dashboard and Collaboration pages, we can show/hide based on needs,
  // but for now let's keep it visible everywhere or only on dashboard
  const showRightSidebar =
    pathname === `/dashboard/${useParams().slug}` ||
    pathname === "/collaboration";

  return (
    <div className="flex h-screen w-full bg-slate-50/50 font-sans text-slate-900 overflow-hidden">
      {/* TAMPILAN MOBILE: Header & Toggle Menu */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white border-b border-slate-100 p-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-primaryTint rounded-sm"></div>
            <div className="w-3 h-3 bg-primaryTint rounded-sm"></div>
          </div>
          <span className="text-xl font-black text-primaryTint tracking-tight">
            KAVA
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-slate-600"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Kiri */}
      <SidebarKiri
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Overlay untuk Mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Konten Utama */}
      <main className="flex-1 h-screen overflow-y-auto mt-16 lg:mt-0 relative">
        {children}
      </main>

      {/* Sidebar Kanan (opsional, tergantung routing) */}
      {showRightSidebar && <SidebarKanan />}
    </div>
  );
}
