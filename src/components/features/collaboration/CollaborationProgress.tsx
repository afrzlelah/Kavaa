import { Card, CardHeader } from "@/components/shared/ui/Card";
import { ProgressBar } from "@/components/shared/ui/ProgressBar";

export function CollaborationProgress() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader title="Ringkasan Kemajuan Kolaborasi" />
      <div className="flex flex-col md:flex-row gap-6 flex-1">
        <div className="bg-slate-100 rounded-xl flex-1 min-h-[160px] flex items-center justify-center text-slate-400 text-sm font-medium overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop&q=80" 
            alt="Team Collaboration" 
            className="w-full h-full object-cover opacity-80 mix-blend-multiply"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center gap-6">
          
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-slate-700">Tugas Tim Selesai</span>
              <span className="text-slate-900">80%</span>
            </div>
            <ProgressBar progress={80} />
          </div>
          
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-slate-700">Laporan Desain UI/UX</span>
              <span className="text-amber-500 bg-amber-50 px-2 py-0.5 rounded text-xs">Pending</span>
            </div>
            <ProgressBar progress={40} />
          </div>
          
          <div>
            <div className="flex justify-between text-sm font-semibold mb-2">
              <span className="text-slate-700">Ulasan Kode API</span>
              <span className="text-amber-500 bg-amber-50 px-2 py-0.5 rounded text-xs">In Progress</span>
            </div>
            <ProgressBar progress={60} colorClass="bg-amber-400" />
          </div>
          
        </div>
      </div>
    </Card>
  );
}
