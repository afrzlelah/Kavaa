import { Card, CardHeader } from "@/components/shared/ui/Card";
import { ProgressBar } from "@/components/shared/ui/ProgressBar";
import { Users, Target, Activity } from "lucide-react";
import Image from "next/image";

export function CollaborationProgress() {
  return (
    <Card className="h-full border border-slate-100 shadow-sm p-8 rounded-[2rem]">
      <h3 className="text-[18px] font-black text-slate-900 mb-8 leading-none">Ringkasan Kemajuan Kolaborasi</h3>
      
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left: Illustration Area */}
        <div className="lg:w-[45%] bg-[#f8faff] rounded-2xl p-6 relative overflow-hidden min-h-[220px] flex flex-col justify-center border border-blue-50/50">
          <div className="relative z-10">
             <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[11px] font-black text-slate-800 uppercase tracking-tighter mb-1">KOLABORASI TIM</p>
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-bold text-slate-400 bg-white/80 px-2 py-0.5 rounded border border-slate-100 inline-block w-fit">DESAIN UI/UX PENDING</span>
                    <span className="text-[8px] font-bold text-slate-400 bg-white/80 px-2 py-0.5 rounded border border-slate-100 inline-block w-fit">DESAIN DESAIN PENDING</span>
                  </div>
                </div>
                <div className="text-right">
                   <p className="text-[24px] font-black text-primary leading-none">80%</p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">SELESAI</p>
                </div>
             </div>
             
             {/* Character Mockup (simplified) */}
             <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 border-4 border-white shadow-sm overflow-hidden flex items-center justify-center">
                   <div className="w-12 h-12 bg-slate-800 rounded-t-full mt-4" /> {/* Simple avatar shape */}
                </div>
                <div className="flex-1 space-y-2">
                   <div className="h-2 w-full bg-blue-100 rounded-full" />
                   <div className="h-2 w-3/4 bg-blue-100 rounded-full" />
                </div>
             </div>
          </div>
          
          {/* Background Grid/Decorative elements */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full blur-3xl -mr-10 -mt-10" />
             <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
          </div>
        </div>

        {/* Right: Progress bars */}
        <div className="lg:w-[55%] flex flex-col justify-center gap-8">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-[11px] font-black uppercase mb-2">
                <span className="text-slate-700">Tugas Tim Selesai</span>
                <span className="text-slate-400">80%</span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '80%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-black uppercase mb-2">
                <span className="text-slate-700">Laporan Desain UI/UX</span>
                <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-[9px]">Pending</span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '65%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-black uppercase mb-2">
                <span className="text-slate-700">Ulasan Kode API</span>
                <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[9px]">In Progress</span>
              </div>
              <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-400 rounded-full" style={{ width: '45%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
