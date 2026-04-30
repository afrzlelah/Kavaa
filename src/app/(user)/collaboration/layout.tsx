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
    <div className="p-4 md:p-10 h-full overflow-y-auto bg-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 max-w-7xl mx-auto">
        <h1 className="text-[24px] font-black text-slate-900 tracking-tight">Kolaborasi & Mencari Tim</h1>
        <Link 
          href="/collaboration/post-project"
          className="bg-primary text-white px-6 py-3 rounded-lg text-[13px] font-black flex items-center justify-center gap-2 hover:bg-blue-700 transition-all w-full sm:w-auto shadow-lg shadow-primary/20 active:scale-95"
        >
          <Plus size={18} strokeWidth={3} /> Buat Proyek Baru
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-4 mb-10 scrollbar-hide gap-3 max-w-7xl mx-auto">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;
          return (
            <Link
              key={tab.name}
              href={tab.path}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-lg text-[12px] font-black whitespace-nowrap transition-all border ${
                isActive
                  ? "bg-primary text-white border-primary shadow-md"
                  : "bg-white text-slate-500 border-slate-100 hover:border-slate-200 shadow-sm"
              }`}
            >
              <tab.icon size={16} strokeWidth={isActive ? 3 : 2} />
              {tab.name}
            </Link>
          );
        })}
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}
