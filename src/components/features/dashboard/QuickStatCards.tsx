import { Bell, MoreVertical } from "lucide-react";
import { Card } from "@/components/shared/ui/Card";

export function QuickStatCards({ stats = [] }: { stats?: any[] }) {
  const defaultStats = [
    { title: "Mulai Belajar", stat: "0% Selesai", icon: Bell },
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;


  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {displayStats.map((item, idx) => (
        <Card key={idx} className="flex-row items-center justify-between p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shrink-0">
              {(() => {
                const Icon = item.icon && typeof item.icon !== 'string' ? item.icon : Bell;
                return <Icon size={20} className="fill-blue-100" />;
              })()}
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 mb-0.5">
                {item.stat}
              </p>
              <p className="text-sm font-bold text-slate-800">
                {item.title}
              </p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600 p-2">
            <MoreVertical size={20} />
          </button>
        </Card>
      ))}
    </section>
  );
}
