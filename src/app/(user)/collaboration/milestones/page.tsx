import React from "react";
import { Flag } from "lucide-react";

export default function MilestonesPage() {
  return (
    <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-primaryTint/10 rounded-full flex items-center justify-center text-primaryTint mb-6">
        <Flag size={40} />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Milestones Kolaborasi</h2>
      <p className="text-slate-500 max-w-md mx-auto">
        Pantau progres dan pencapaian tim Anda di sini. Fitur ini akan segera hadir untuk membantu Anda tetap pada jalur!
      </p>
    </div>
  );
}
