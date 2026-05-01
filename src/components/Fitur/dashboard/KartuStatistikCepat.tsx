import { Bell, MoreVertical } from "lucide-react";
import { Card } from "@/components/Bersama/ui/Card";

type QuickStat = {
  title: string;
  stat: string;
  icon?: React.ElementType | string;
};

export function KartuStatistikCepat({ stats = [] }: { stats?: QuickStat[] }) {
  const defaultStats = [
    { title: "Product Design", stat: "2/8 Watched", icon: Bell },
    { title: "Web Development", stat: "1/5 Watched", icon: Bell },
    { title: "UI/UX Research", stat: "4/10 Watched", icon: Bell },
  ];

  // Selalu tampilkan 3 kartu agar desain tidak kosong (Pad dengan default jika kurang)
  const displayStats = [...stats];
  while (displayStats.length < 3) {
    displayStats.push(defaultStats[displayStats.length]);
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayStats.map((item, idx) => (
        <Card
          key={idx}
          className="flex-row items-center justify-between p-6 hover:shadow-lg hover:translate-y-[-2px] transition-all cursor-pointer rounded-[2rem] border-slate-50"
        >
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-primaryTint/50 rounded-full flex items-center justify-center text-primary shrink-0 shadow-sm">
              {(() => {
                const Icon =
                  item.icon && typeof item.icon !== "string" ? item.icon : Bell;
                return <Icon size={24} className="fill-blue-100" />;
              })()}
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                {item.stat}
              </p>
              <p className="text-[13px] font-black text-slate-800 leading-tight">
                {item.title}
              </p>
            </div>
          </div>
          <button className="text-slate-300 hover:text-slate-600 p-2 transition-colors">
            <MoreVertical size={18} />
          </button>
        </Card>
      ))}
    </section>
  );
}
