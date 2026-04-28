import { Card } from "@/components/shared/ui/Card";
import { Avatar } from "@/components/shared/ui/Avatar";
import { Clock } from "lucide-react";

export function RecentLearningActivity() {
  const activities = [
    {
      id: 1,
      user: "Alice",
      action: "menyelesaikan kuis HTML",
      path: "WEB DEV",
      initials: "A",
      color: "bg-[#71d99e]"
    },
    {
      id: 2,
      user: "Charlie",
      action: "mengunggah draf desain diinjau",
      path: "UI DESIGN",
      initials: "C",
      color: "bg-[#8ab4f8]"
    },
    {
      id: 3,
      user: "Alice",
      action: "Draf desain portfolio Alice siap untuk ditinjau",
      path: "UI DESIGN",
      initials: "A",
      color: "bg-[#71d99e]"
    }
  ];

  return (
    <Card className="h-full border border-slate-100 shadow-sm p-8 rounded-[2rem]">
      <div className="mb-8">
        <h4 className="text-[13px] font-black text-slate-800 uppercase tracking-widest leading-none">Aktivitas Belajar Terbaru</h4>
      </div>

      <div className="space-y-7">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-4 items-start">
            <div className={`w-9 h-9 rounded-full ${activity.color} flex items-center justify-center text-white text-[10px] font-black shadow-sm shrink-0`}>
              {activity.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-black text-slate-800 leading-tight">
                {activity.user} <span className="font-bold text-slate-400">{activity.action}</span>
              </p>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1 block">{activity.path}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
