import { Search, Bell, Grid } from "lucide-react";
import Image from "next/image";

export function LearningHubHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 mt-14 lg:mt-0">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-xl font-black text-primary tracking-tight leading-none mb-2">Pilih Jalur Belajar Anda</h1>
        </div>
      </div>

      <div className="flex items-center gap-4 flex-1 max-w-md justify-end">
        <div className="w-full flex items-center gap-3 bg-white border border-slate-100 rounded-2xl px-4 py-2 shadow-sm focus-within:ring-4 focus-within:ring-primary/5 transition-all">
          <Search size={16} className="text-slate-300" />
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-transparent border-none outline-none text-xs text-slate-600 placeholder-slate-300 w-full font-bold"
          />
        </div>
        <button className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-colors shadow-sm relative shrink-0">
          <Bell size={18} />
          <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-rose-500 rounded-full border border-white"></div>
        </button>
        <div className="w-10 h-10 rounded-full border border-slate-100 bg-slate-200 overflow-hidden shadow-sm shrink-0 relative">
          <Image src="https://ui-avatars.com/api/?name=User" alt="avatar" fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}
