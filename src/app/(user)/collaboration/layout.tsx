"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, LayoutDashboard, Folder, Search, Flag, Star } from "lucide-react";

export default function CollaborationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const tabs = [
    { name: "Dasbor Kolaborasi", path: "/collaboration", icon: LayoutDashboard },
    { name: "Proyek Saya", path: "/collaboration/my-projects", icon: Folder },
    { name: "Pencari Tim", path: "/collaboration/team-finder", icon: Search },
    { name: "Milestones Kolaborasi", path: "/collaboration/milestones", icon: Flag },
    { name: "Ulasan Portofolio", path: "/collaboration/reviews", icon: Star },
  ];

  // Do not show tabs on "post-project" page
  if (pathname === "/collaboration/post-project") {
    return <>{children}</>;
  }

  return (
    <div className="p-8 h-full overflow-y-auto max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Kolaborasi & Mencari Tim</h1>
        <Link 
          href="/collaboration/post-project"
          className="bg-primaryTint text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors w-full sm:w-auto shadow-sm"
        >
          <Plus size={18} /> Buat Proyek Baru
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-2 mb-6 hide-scrollbar gap-2">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;
          return (
            <Link
              key={tab.name}
              href={tab.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors border ${
                isActive
                  ? "bg-primaryTint text-white border-primaryTint shadow-sm"
                  : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <tab.icon size={16} className={isActive ? "text-white" : "text-slate-400"} />
              {tab.name}
            </Link>
          );
        })}
      </div>

      {/* Content */}
      {children}
    </div>
  );
}
