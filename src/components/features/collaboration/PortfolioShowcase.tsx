import { Card, CardHeader } from "@/components/shared/ui/Card";
import { Layout, MessageSquare } from "lucide-react";

export function PortfolioShowcase() {
  return (
    <Card className="h-full border-none shadow-xl shadow-slate-200/50 group">
      <CardHeader 
        title="Draf Showcase Tim" 
        subtitle="Pratinjau portofolio kolaborasi" 
      />
      <div className="relative bg-slate-100 rounded-2xl w-full h-32 mb-4 flex items-center justify-center overflow-hidden border border-slate-100 shadow-inner">
        <img 
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop&q=80" 
          alt="Portfolio preview" 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-primary/10 group-hover:bg-primary/20 transition-colors"></div>
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm">
          <Layout size={12} className="text-primary" />
        </div>
      </div>
      <button className="w-full bg-primary/5 text-primary hover:bg-primary hover:text-white py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
        <MessageSquare size={14} /> Feedback Tim Mendalam
      </button>
    </Card>
  );
}
