import { Card } from "@/components/shared/ui/Card";
import { Button } from "@/components/shared/ui/Button";
import { ProgressBar } from "@/components/shared/ui/ProgressBar";
import { Calendar, Video, BookOpen, CheckCircle, Heart } from "lucide-react";

export function LearningSidebar() {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Live Sessions Card */}
      <Card className="p-6 border border-slate-100 bg-white shadow-sm rounded-3xl">
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-col">
            <h4 className="text-sm font-black text-slate-800 leading-tight">Active Sessions &<br />Community</h4>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-[11px] font-bold text-slate-400 mb-1">Sesi Live: 'UX Research Fundamentals'</p>
          <p className="text-[11px] font-bold text-slate-500">Kamis, 15:00 WIB</p>
        </div>

        <Button className="w-full py-3.5 rounded-xl font-black text-[11px] bg-primary shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
          Daftar Sesi Live
        </Button>
      </Card>

      {/* Statistics Card */}
      <Card className="p-6 border border-slate-100 bg-white shadow-sm rounded-3xl flex-1">
        <div className="space-y-8">
          {/* Stat 1 */}
          <div className="space-y-3">
            <div className="flex justify-between items-end text-xs font-black">
              <span className="text-slate-500 uppercase tracking-widest text-[9px]">Total Learning Progress</span>
              <span className="text-slate-800">33%</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 mb-1">Modul Selesai: 4/12</p>
            <ProgressBar progress={33} className="h-2" />
          </div>

          {/* Stat 2 */}
          <div className="space-y-3">
            <div className="flex justify-between items-end text-xs font-black">
              <span className="text-slate-500 uppercase tracking-widest text-[9px]">Tugas Belajar Selesai</span>
              <span className="text-slate-800">65%</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 mb-1">Tugas 13/20</p>
            <ProgressBar progress={65} className="h-2" />
          </div>

          {/* Stat 3 */}
          <div className="space-y-3">
            <div className="flex justify-between items-end text-xs font-black">
              <span className="text-slate-500 uppercase tracking-widest text-[9px]">Kesehatan Portofolio Belajar</span>
              <span className="text-slate-800">100%</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 mb-1">Ulasan Draf</p>
            <ProgressBar progress={100} className="h-2" />
          </div>
        </div>
      </Card>
    </div>
  );
}
