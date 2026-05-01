import React from "react";
import { Flag } from "lucide-react";
import { Card } from "@/components/Bersama/ui/Card";

export default function MilestonesPage() {
  return (
    <Card className="bg-white rounded-[2.5rem] p-20 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 bg-blue-50 rounded-[2rem] flex items-center justify-center text-primary mb-8 rotate-3 shadow-lg shadow-blue-100/50">
        <Flag size={40} strokeWidth={2.5} />
      </div>
      <h2 className="text-[24px] font-black text-slate-900 mb-3 tracking-tight">Milestones Kolaborasi</h2>
      <p className="text-[13px] font-bold text-slate-400 max-w-md mx-auto leading-relaxed">
        Pantau progres dan pencapaian tim Anda di sini. Fitur ini akan segera hadir untuk membantu Anda tetap pada jalur!
      </p>
      
      <div className="mt-12 flex gap-4">
         <div className="w-3 h-3 rounded-full bg-slate-100 animate-bounce duration-700" />
         <div className="w-3 h-3 rounded-full bg-slate-100 animate-bounce duration-1000" />
         <div className="w-3 h-3 rounded-full bg-slate-100 animate-bounce duration-500" />
      </div>
    </Card>
  );
}
