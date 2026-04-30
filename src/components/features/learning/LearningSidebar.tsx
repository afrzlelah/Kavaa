import { Card } from "@/components/shared/ui/Card";
import { Button } from "@/components/shared/ui/Button";
import { ProgressBar } from "@/components/shared/ui/ProgressBar";
// Unused imports removed

export function LearningSidebar() {
  return (
    <div className="flex flex-col gap-6 h-1/2 ">
      {/* Live Sessions Card */}
      <Card className="p-6 lg:p-8 border border-slate-100 bg-white shadow-sm rounded-[2rem]">
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-col">
            <h4 className="text-[13px] font-black text-slate-900 leading-tight">Active Sessions &<br />Community</h4>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-[11px] text-slate-500 mb-1 leading-relaxed">Sesi Live: &apos;UX Research Fundamentals&apos;</p>
          <p className="text-[10px] text-slate-400">Kamis, 15:00 WIB</p>
        </div>

        <Button className="w-full py-2.5 rounded-md text-[11px] font-medium bg-primary hover:bg-blue-700 transition-all">
          Daftar Sesi Live
        </Button>
      </Card>

      {/* Statistics Card */}
      <Card className="p-6 lg:p-8 border border-slate-100 bg-white shadow-sm rounded-[2rem] flex-1">
        <div className="space-y-8">
          {/* Stat 1 */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-[11px] font-bold text-slate-800">Total Learning Progress</span>
              <span className="text-[11px] font-bold text-slate-800">33%</span>
            </div>
            <p className="text-[10px] text-slate-500 mb-1">Modul Selesai 4/12</p>
            <ProgressBar progress={33} className="h-1.5" />
          </div>

          {/* Stat 2 */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-[11px] font-bold text-slate-800">Tugas Belajar Selesai</span>
              <span className="text-[11px] font-bold text-slate-800">65%</span>
            </div>
            <p className="text-[10px] text-slate-500 mb-1">Tugas 13/20</p>
            <ProgressBar progress={65} className="h-1.5" />
          </div>

          {/* Stat 3 */}
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-[11px] font-bold text-slate-800">Kesehatan Portofolio Belajar</span>
              <span className="text-[11px] font-bold text-slate-800">100%</span>
            </div>
            <p className="text-[10px] text-slate-500 mb-1">Ulasan Draf</p>
            <ProgressBar progress={100} className="h-1.5" />
          </div>
        </div>
      </Card>
    </div>
  );
}
