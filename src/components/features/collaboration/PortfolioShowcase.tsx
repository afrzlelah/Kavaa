import { Card, CardHeader } from "@/components/shared/ui/Card";
import { Layout, MessageSquare } from "lucide-react";
import Image from "next/image";

export function PortfolioShowcase() {
  return (
    <Card className="h-full border-none shadow-xl shadow-slate-200/50 group">
      <CardHeader 
        title="Draf Showcase Tim" 
        subtitle="Pratinjau portofolio kolaborasi" 
      />
      <div className="grid grid-cols-2 gap-4 flex-1 mb-4">
        {[
          { id: 1, title: "Travel Planner App", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop&q=80" },
          { id: 2, title: "E-Commerce Dashboard", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&q=80" }
        ].map((item) => (
          <div key={item.id} className="relative bg-slate-100 rounded-2xl w-full h-24 flex items-center justify-center overflow-hidden border border-slate-100 shadow-inner group-hover/item:border-primaryTint transition-colors cursor-pointer">
            <Image 
              src={item.img} 
              alt={item.title} 
              fill
              className="object-cover hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-primaryTint/10 hover:bg-primaryTint/20 transition-colors"></div>
            <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm text-[8px] font-bold text-slate-800">
              {item.title}
            </div>
          </div>
        ))}
      </div>
      <button className="w-full bg-blue-50 text-primaryTint hover:bg-primaryTint hover:text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 mt-auto">
        <MessageSquare size={14} /> Feedback Tim Mendalam
      </button>
    </Card>
  );
}
