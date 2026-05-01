import { HeaderBeranda } from "@/components/Fitur/dashboard/HeaderBeranda";
import { BannerBeranda } from "@/components/Fitur/dashboard/BannerBeranda";
import { KartuStatistikCepat } from "@/components/Fitur/dashboard/KartuStatistikCepat";
import { ContinueWatchingSection } from "@/components/Fitur/dashboard/ContinueWatchingSection";
import { SidebarBeranda } from "@/components/Fitur/dashboard/SidebarBeranda";
import { TabelMentor } from "@/components/Fitur/dashboard/TabelMentor";
import { ambilStatistikCepat } from "@/services/layananKursus";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { DataPengguna } from "@/types";

export default async function DashboardPage({ userId, user }: { userId?: string, user?: DataPengguna }) {
  const quickStats = userId ? await ambilStatistikCepat(userId) : [];

  return (
    <div className="flex w-full h-full bg-[#F8FAFC]">
      {/* Konten Utama (Tengah) */}
      <main className="flex-1 overflow-y-auto px-4 md:px-10 py-8 min-w-0">
        <HeaderBeranda user={user} />
        
        <div className="space-y-10 mt-8">
          <BannerBeranda user={user} />
          
          <KartuStatistikCepat stats={quickStats} />
          
          <section>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-800">Continue Watching</h2>
              <div className="flex gap-2">
                <button className="p-2 border border-slate-200 rounded-full hover:bg-white transition-all">
                  <ArrowLeft size={16} className="text-slate-400" />
                </button>
                <button className="p-2 border border-slate-200 rounded-full hover:bg-white transition-all">
                  <ArrowRight size={16} className="text-slate-400" />
                </button>
              </div>
            </div>
            <ContinueWatchingSection userId={userId} />
          </section>

          <section className="pb-10">
             <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-slate-800">Your Mentor</h2>
              <button className="text-primaryTint text-md  underline">See All</button>
            </div>
            <TabelMentor />
          </section>
        </div>
      </main>

      {/* Sidebar Kanan (Profil & Aktivitas) */}
      <aside className="hidden xl:block w-[360px] border-l border-slate-100 bg-white p-10 overflow-y-auto shrink-0">
        <SidebarBeranda user={user} />
      </aside>
    </div>
  );
}


