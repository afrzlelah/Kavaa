import { Card, CardHeader } from "@/components/shared/ui/Card";
import { getChallenges } from "@/services/collaborationService";
import { Flag, Clock, Trophy } from "lucide-react";

export async function UpcomingMilestones() {
  const challenges = await getChallenges();
  const hasData = challenges && challenges.length > 0;

  // If no challenges, show placeholder content
  const displayItems = hasData ? challenges : [
    { id: 1, title: "Kavaa UI Challenge", company_name: "Kavaa Team", deadline: "31 Des 2024", difficulty: "Medium" },
    { id: 2, title: "Backend API Optimization", company_name: "FreshMart", deadline: "15 Des 2024", difficulty: "Hard" },
  ];

  return (
    <Card className="h-full border-none shadow-xl shadow-slate-200/50">
      <CardHeader 
        title="Tantangan & Milestones" 
        subtitle="Tantangan kolaborasi terbaru" 
        action={<Trophy size={16} className="text-amber-400" />}
      />
      <div className="flex flex-col gap-5 relative mt-2">
        <div className="absolute left-[7px] top-2 bottom-4 w-0.5 bg-slate-100 rounded-full"></div>
        
        {displayItems.map((item: { id: number; title: string; company_name?: string; deadline?: string; difficulty?: string }) => (
          <div key={item.id} className="relative pl-7 group cursor-pointer">
            <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 border-white shadow-sm transition-all group-hover:scale-125 z-10 ${
              item.difficulty === "Hard" ? "bg-rose-500" : "bg-primary"
            }`}></div>
            <div className="flex flex-col gap-1">
              <h3 className="text-xs font-black text-slate-800 uppercase tracking-wide group-hover:text-primary transition-colors">{item.title}</h3>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{item.company_name}</span>
                <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                <div className="flex items-center gap-1 text-[10px] font-black text-rose-500 uppercase">
                  <Clock size={10} />
                  {item.deadline}
                </div>
              </div>
            </div>
          </div>
        ))}

        {!hasData && (
          <div className="mt-2 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-[10px] font-bold text-slate-400 uppercase text-center tracking-widest">Tidak ada tantangan aktif</p>
          </div>
        )}
      </div>
    </Card>
  );
}
