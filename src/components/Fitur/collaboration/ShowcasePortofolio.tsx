import { Card } from "@/components/Bersama/ui/Card";
import Image from "next/image";

export function ShowcasePortofolio() {
  return (
    <Card className="h-full border border-slate-100 shadow-sm p-8 rounded-[2rem]">
      <h3 className="text-[16px] font-black text-slate-900 mb-2 leading-none">Draf Showcase Portofolio Tim</h3>
      <p className="text-[10px] font-bold text-slate-400 mb-8 uppercase tracking-tighter">Portfolio Showcase Preview</p>
      
      <div className="relative h-32 w-full bg-slate-50 rounded-xl overflow-hidden mb-8 group cursor-pointer">
         <div className="absolute inset-0 flex gap-2 p-2">
            <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden relative rotate-[-2deg] transition-transform group-hover:rotate-0">
               <Image src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=200&h=300&fit=crop" alt="UI" fill className="object-cover" />
            </div>
            <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden relative z-10 scale-110 shadow-xl border border-slate-50">
               <Image src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=200&h=300&fit=crop" alt="Code" fill className="object-cover" />
            </div>
            <div className="flex-1 bg-white rounded-lg shadow-sm overflow-hidden relative rotate-[2deg] transition-transform group-hover:rotate-0">
               <Image src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&h=300&fit=crop" alt="App" fill className="object-cover" />
            </div>
         </div>
      </div>

      <button className="w-full bg-primary text-white py-3 rounded-lg text-[11px] font-black hover:bg-blue-700 transition-all shadow-lg shadow-primary/20 active:scale-95">
        Feedback Tim Mendalam
      </button>
    </Card>
  );
}
