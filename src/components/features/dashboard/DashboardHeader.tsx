import { Filter, Search } from "lucide-react";
import type { UserData } from "@/types";

export function DashboardHeader({ user }: { user?: UserData }) {
  return (
    <header className="flex items-center gap-6">
      <div className="relative flex-1 max-w-[640px]">
        <input
          type="text"
          placeholder="Cari kursus kamu disini..."
          className="w-full pl-14 pr-6 py-5 bg-white border border-slate-50 rounded-[2rem] text-[13px] font-bold text-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-100 transition-all shadow-sm placeholder:text-slate-300"
        />
        <Search
          className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300"
          size={20}
        />
      </div>
      <button className="w-14 h-14 bg-white border border-slate-50 rounded-[1.5rem] flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-primary shadow-sm transition-all shrink-0">
        <Filter size={22} strokeWidth={2.5} />
      </button>
    </header>
  );
}

