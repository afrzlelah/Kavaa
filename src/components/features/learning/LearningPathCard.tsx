import { Card } from "@/components/shared/ui/Card";
import { ProgressBar } from "@/components/shared/ui/ProgressBar";
import { Button } from "@/components/shared/ui/Button";

interface PathItem {
  title: string;
  progress: number;
  status: "completed" | "in-progress" | "pending";
}

interface LearningPathCardProps {
  title: string;
  subtitle: string;
  items: PathItem[];
  icons: string[]; // URLs or identifiers
  buttonText: string;
}

export function LearningPathCard({ title, subtitle, items, icons, buttonText }: LearningPathCardProps) {
  return (
    <Card className="p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col rounded-3xl bg-[#f0f4ff]/40">
      {/* Tech Icons */}
      <div className="flex gap-2 mb-4">
        {icons.map((icon, idx) => (
          <div key={idx} className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center p-1.5 shadow-sm">
            <img src={icon} alt="tech" className="w-full h-full object-contain" />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-base font-black text-slate-800 tracking-tight leading-tight mb-1 uppercase">{title}</h3>
        <p className="text-[11px] font-bold text-slate-400">{subtitle}</p>
      </div>

      {/* Progress Items */}
      <div className="space-y-4 flex-1 mb-8">
        {items.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between items-center text-[11px]">
              <span className={`font-bold ${item.status === 'pending' ? 'text-slate-400' : 'text-slate-700'}`}>
                {idx + 1}. {item.title}
              </span>
              <span className="font-bold text-slate-400">
                {item.status === 'pending' ? '(Pending)' : `(${item.progress}%)`}
              </span>
            </div>
            <div className="relative h-1.5 w-full bg-slate-200/50 rounded-full overflow-hidden">
              <div 
                className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ${item.status === 'pending' ? 'bg-slate-300' : 'bg-primary'}`} 
                style={{ width: `${item.status === 'pending' ? 0 : item.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <Button className="w-full py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest bg-primary shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
        {buttonText}
      </Button>
    </Card>
  );
}
