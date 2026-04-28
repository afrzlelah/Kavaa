import { Card } from "@/components/shared/ui/Card";
import { Button } from "@/components/shared/ui/Button";
import { Layout, ArrowRight } from "lucide-react";

export function PortfolioBuilding() {
  const items = [
    {
      id: 1,
      title: "In-Progreson Case Study draf",
      subtitle: "(in-progress case study draf)",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&q=80"
    },
    {
      id: 2,
      title: "Membangun Portfolio Belajar",
      subtitle: "(in-progress case study draf)",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop&q=80"
    }
  ];

  return (
    <Card className="h-full border border-slate-100 shadow-sm p-8 rounded-[2rem] flex flex-col">
      <div className="mb-6">
        <h4 className="text-[13px] font-black text-slate-800 uppercase tracking-widest leading-none">Membangun Portfolio Belajar</h4>
      </div>

      <div className="grid grid-cols-2 gap-4 flex-1 mb-6">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col">
            <div className="aspect-[1.4] rounded-xl overflow-hidden bg-slate-100 mb-3 border border-slate-50 shadow-sm">
              <img src={item.image} alt="portfolio" className="w-full h-full object-cover" />
            </div>
            <h5 className="text-[11px] font-black text-slate-800 leading-tight mb-1">{item.title}</h5>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">{item.subtitle}</p>
          </div>
        ))}
      </div>

      <Button variant="secondary" className="w-full py-3 rounded-xl font-black text-[11px] bg-white border border-slate-100 text-slate-400 hover:bg-slate-50 shadow-sm transition-all">
        Tinjauan Ulasan
      </Button>
    </Card>
  );
}
