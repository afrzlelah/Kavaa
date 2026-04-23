import { LogOut, Settings } from "lucide-react";
import { menuItems } from "@/constants";
import { friends } from "@/constants";
import Link from "next/link";

export default function SidebarKiri({
  isMobileMenuOpen,
  activeTab,
  setActiveTab,
}: {
  isMobileMenuOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  interface MenuItem {
    icon: React.ComponentType<{ size: number; className?: string }>;
    label: string;
    active?: boolean;
  }

  const activeMenuItem = (item: MenuItem) => {
    setActiveTab(item.label);
    item.active = true;
    menuItems.forEach((i) => {
      if (i.label !== item.label) {
        i.active = false;
      }
    });
  };

  return (
    <aside
      className={`${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:static top-0 left-0 h-full w-64 bg-white border-r border-slate-100 flex flex-col transition-transform duration-300 z-40`}
    >
      {/* Logo bjir anjir*/}
      <div className="p-8 hidden lg:flex items-center gap-2">
        <div className="flex items-center gap-1">
          <div className="grid grid-cols-2 gap-0.5">
            <div className="w-3 h-3 bg-primaryTint rounded-tl-sm rounded-bl-sm"></div>
            <div className="w-3 h-3 bg-primaryTint rounded-tr-sm rounded-br-sm"></div>
          </div>
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-2xl font-black text-primaryTint tracking-tight">
            KAVA
          </span>
          <span className="text-[8px] text-blue-400 font-bold uppercase">
            Where Learning Meets Evolution
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mt-16 lg:mt-0">
        {/* Bagian Gambaran Umum(masa depanku ketok mugo) */}
        <div className="px-6 mb-8">
          <h3 className="text-xs font-bold text-slate-400 mb-4 tracking-wider uppercase">
            Gambaran Umum
          </h3>
          <nav className="flex flex-col gap-1">
            {menuItems.map((item, index) => (
              <button
                onClick={() => activeMenuItem(item)}
                key={index}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  item.active
                    ? "text-primaryTint bg-blue-50/50"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <item.icon
                  size={20}
                  className={
                    item.active ? "text-primaryTint" : "text-slate-400"
                  }
                />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Bagian Teman */}
        <div className="px-6 mb-8">
          <h3 className="text-xs font-bold text-slate-400 mb-4 tracking-wider uppercase">
            Teman
          </h3>
          <div className="flex flex-col gap-4">
            {friends.map((friend, index) => (
              <div
                key={index}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-100 transition-all"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-800">
                    {friend.name}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400">
                    {friend.role}
                  </span>
                </div>
              </div>
            ))}
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
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Settings size={20} className="text-slate-400" /> Pengaturan
          </Link>
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors mt-2"
          >
            <LogOut size={20} className="text-red-500" /> Keluar
          </a>
        </nav>
      </div>
    </aside>
  );
}
