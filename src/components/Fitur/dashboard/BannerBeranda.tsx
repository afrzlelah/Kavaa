import { Button } from "@/components/Bersama/ui/Button";
import { Play } from "lucide-react";
import type { DataPengguna } from "@/types";

export function BannerBeranda({ user }: { user?: DataPengguna }) {
  return (
    <section className="relative w-full rounded-[2.5rem] bg-gradient-to-r from-blue-600 to-blue-500 p-10 md:px-14 md:py-12 text-white shadow-xl shadow-blue-500/10 overflow-hidden">
      {/* Dekorasi Latar Belakang - Bintang/Sparkles */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
        <svg className="absolute top-[10%] right-[30%] w-24 h-24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
        </svg>
        <svg className="absolute top-[40%] right-[5%] w-40 h-40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-2xl">
        <p className="text-[10px] font-black tracking-[0.2em] text-white/80 uppercase mb-4">
          KURSUS ONLINE
        </p>
        <h1 className="text-[28px] md:text-[36px] font-black mb-10 leading-[1.2] tracking-tight">
          Halo {user?.first_name || "Mahasiswa"},<br />
          Wujudkan Karir Profesionalmu
        </h1>
        <button className="flex items-center gap-4 bg-slate-900 text-white pl-6 pr-2 py-2 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-black transition-all group">
          Join Now
          <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center text-slate-900 group-hover:scale-110 transition-transform">
            <Play size={12} fill="currentColor" />
          </div>
        </button>
      </div>
    </section>
  );
}

