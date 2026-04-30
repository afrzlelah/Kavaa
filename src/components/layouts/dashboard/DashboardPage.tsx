import { DashboardHeader } from "@/components/features/dashboard/DashboardHeader";
import { DashboardBanner } from "@/components/features/dashboard/DashboardBanner";
import { QuickStatCards } from "@/components/features/dashboard/QuickStatCards";
import { ContinueWatchingSection } from "@/components/features/dashboard/ContinueWatchingSection";
import { DashboardSidebar } from "@/components/features/dashboard/DashboardSidebar";
import { MentorTable } from "@/components/features/dashboard/MentorTable";
import { getQuickStats } from "@/services/courseService";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { UserData } from "@/types";

export default async function DashboardPage({ userId, user }: { userId?: string, user?: UserData }) {
  const quickStats = userId ? await getQuickStats(userId) : [];

  return (
    <div className="flex w-full h-full bg-[#F8FAFC]">
      {/* Konten Utama (Tengah) */}
      <main className="flex-1 overflow-y-auto px-4 md:px-10 py-8 min-w-0">
        <DashboardHeader user={user} />
        
        <div className="space-y-10 mt-8">
          <DashboardBanner user={user} />
          
          <QuickStatCards stats={quickStats} />
          
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
            <MentorTable />
          </section>
        </div>
      </main>

      {/* Sidebar Kanan (Profil & Aktivitas) */}
      <aside className="hidden xl:block w-[360px] border-l border-slate-100 bg-white p-10 overflow-y-auto shrink-0">
        <DashboardSidebar user={user} />
      </aside>
    </div>
  );
}


