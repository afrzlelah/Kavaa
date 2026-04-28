import { Filter, Search } from "lucide-react";
import { Avatar } from "@/components/shared/ui/Avatar";

export function DashboardHeader({ user }: { user?: any }) {
  const userName = user?.user_metadata?.first_name 
    ? `${user.user_metadata.first_name} ${user.user_metadata.last_name || ""}`
    : user?.email?.split("@")[0] || "User";

  return (
    <header className="flex items-center gap-4 mb-8">
      <div className="relative flex-1 max-w-3xl">
        <input
          type="text"
          placeholder="Cari kursus Anda di sini...."
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
        />
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={20}
        />
      </div>
      <button className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm transition-all shrink-0">
        <Filter size={20} />
      </button>
      
      <div className="flex items-center gap-3 ml-2 shrink-0">
        <div className="hidden md:block text-right">
          <p className="text-sm font-bold text-slate-900">{userName}</p>
          <p className="text-[11px] font-medium text-slate-500">{user?.user_metadata?.role || "Student"}</p>
        </div>
        <Avatar 
          src={user?.user_metadata?.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&q=80"} 
          initials={userName.charAt(0)}
          className="w-11 h-11 border-2 border-white shadow-sm"
        />
      </div>
    </header>
  );
}

