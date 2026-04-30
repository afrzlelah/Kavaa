import { Card, CardHeader } from "@/components/shared/ui/Card";
import { ProgressBar } from "@/components/shared/ui/ProgressBar";
import { Users, Target, Activity } from "lucide-react";
import Image from "next/image";

export function CollaborationProgress({ data }: { data?: { id: number; title: string; progress: number }[] }) {
  const hasData = data && data.length > 0;

  return (
    <Card className="h-full border-none shadow-xl shadow-slate-200/50 overflow-hidden group">
      <CardHeader 
        title="Ringkasan Kemajuan Kolaborasi" 
        className="pb-2"
      />
      
      <div className="p-6 pt-2 flex flex-col lg:flex-row gap-8">
        {/* Left: Stats & Image */}
        <div className="lg:w-2/5 flex flex-col gap-4">
          <div className="relative h-48 rounded-3xl overflow-hidden shadow-lg border border-slate-100">
            <Image 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop&q=80" 
              alt="Team Collaboration" 
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Project Status</p>
              <h4 className="text-sm font-black uppercase">On Track & Healthy</h4>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Team Size</p>
              <div className="flex items-center gap-2">
                <Users size={14} className="text-primary" />
                <span className="text-sm font-black text-slate-800">12 Orang</span>
              </div>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Velocity</p>
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-emerald-500" />
                <span className="text-sm font-black text-slate-800">+12%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Progress List */}
        <div className="lg:w-3/5 flex flex-col justify-between py-1 gap-6">
          {hasData ? (
             <div className="flex-1 flex flex-col justify-center gap-6">
                <div>
                  <div className="flex justify-between text-xs font-black uppercase tracking-wider mb-2">
                    <span className="text-slate-500">Tugas Tim Selesai</span>
                    <span className="text-primary">80%</span>
                  </div>
                  <ProgressBar progress={80} />
                </div>
                
                <div>
                  <div className="flex justify-between text-xs font-black uppercase tracking-wider mb-2">
                    <span className="text-slate-500">Laporan Desain UI/UX</span>
                    <span className="text-amber-500 bg-amber-50 px-2 py-0.5 rounded-lg text-[10px]">Review</span>
                  </div>
                  <ProgressBar progress={45} colorClass="bg-amber-500" />
                </div>
                
                <div>
                  <div className="flex justify-between text-xs font-black uppercase tracking-wider mb-2">
                    <span className="text-slate-500">Ulasan Kode API</span>
                    <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg text-[10px]">Testing</span>
                  </div>
                  <ProgressBar progress={65} colorClass="bg-emerald-500" />
                </div>
             </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-8 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <p className="text-sm text-slate-400 font-bold">Belum ada progres kolaborasi aktif</p>
            </div>
          )}

          <button className="w-full bg-slate-900 text-white py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-200 transition-all hover:bg-primary active:scale-95 flex items-center justify-center gap-2">
            <Target size={16} /> Lihat Detail Roadmap
          </button>
        </div>
      </div>
    </Card>
  );
}
