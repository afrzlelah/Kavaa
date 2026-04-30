"use client";

import { LogOut, Settings } from "lucide-react";
import { menuItems } from "@/constants";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClientClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function SidebarKiri({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  userId,
  user,
  friendsList = [],
}: {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  userId: string;
  user: { id?: string; user_metadata?: { first_name?: string; last_name?: string } };
  friendsList?: { avatar_url?: string; first_name?: string; last_name?: string; role?: string }[];
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    const supabase = createClientClient();
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/login");
      router.refresh();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Terjadi kesalahan";
      console.error("Gagal keluar:", msg);
      window.location.href = "/login";
    }
  };

  return (
    <aside
      className={`${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:static top-0 left-0 h-full w-64 bg-white border-r border-slate-100 flex flex-col transition-transform duration-300 z-40`}
    >
      {/* Logo */}
      <div className="p-8 hidden lg:flex items-center gap-2">
        <Link href="/" className="flex flex-col leading-none">
          <Image
            src={"/assets/logo_kava_text_biru.png"}
            alt={"Logo Kavaa"}
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto mt-16 lg:mt-0">
        {/* Bagian Gambaran Umum(masa depanku ketok mugo) */}
        <div className="px-6 mb-8">
          <h3 className="text-xs font-bold text-slate-400 mb-4 tracking-wider uppercase">
            Gambaran Umum
          </h3>
          <nav className="flex flex-col gap-1">
            {menuItems.map((item, index) => {
              // Logic for dynamic paths: dashboard needs the userId slug
              const href =
                item.path === "/dashboard"
                  ? `${item.path}/${userId}`
                  : item.path;
              const isActive =
                pathname === href ||
                (href !== "/" && pathname?.startsWith(href));

              return (
                <Link
                  href={href || "#"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  key={index}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? "text-primaryTint bg-blue-50/50"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <item.icon
                    size={20}
                    className={isActive ? "text-primaryTint" : "text-slate-400"}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bagian Teman */}
        <div className="px-6 mb-8">
          <h3 className="text-xs font-bold text-slate-400 mb-4 tracking-wider uppercase">
            Teman
          </h3>
          <div className="flex flex-col gap-4">
            {friendsList.length === 0 ? (
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest px-2 italic">
                Belum ada teman
              </p>
            ) : (
              friendsList.map((friend, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-blue-100 transition-all bg-slate-100 flex items-center justify-center">
                    {friend.avatar_url ? (
                      <Image
                        src={friend.avatar_url}
                        alt={friend.first_name ?? ""}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-xs font-bold text-slate-400">
                        {(friend.first_name || "?")[0]}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800">
                      {friend.first_name} {friend.last_name}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">
                      {friend.role || "Pelajar"}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bagian Pengaturan & Keluar */}
      <div className="px-6 py-8 border-t border-slate-50">
        <h3 className="text-xs font-bold text-slate-400 mb-4 tracking-wider uppercase">
          Pengaturan
        </h3>
        <nav className="flex flex-col gap-1">
          <Link
            href="/settings"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              pathname === "/settings"
                ? "text-primaryTint bg-blue-50/50"
                : "text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Settings 
              size={20} 
              className={pathname === "/settings" ? "text-primaryTint" : "text-slate-400"} 
            /> Pengaturan
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors mt-2"
          >
            <LogOut size={20} className="text-red-500" /> Keluar
          </button>
        </nav>
      </div>
    </aside>
  );
}
