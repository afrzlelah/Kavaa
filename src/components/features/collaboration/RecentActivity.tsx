import { Card, CardHeader } from "@/components/shared/ui/Card";
import { getRecentActivities } from "@/services/collaborationService";
import { History, Zap } from "lucide-react";

export async function RecentActivity() {
  let activities = await getRecentActivities();
  const hasData = activities && activities.length > 0;

  if (!hasData) {
    activities = [
      { id: 1, initials: "AW", user_name: "Alice", action: "updated Wireframes", time_ago: "4m ago", color: "bg-primary" },
      { id: 2, initials: "CM", user_name: "Charlie", action: "merged API branch", time_ago: "12m ago", color: "bg-indigo-500" },
      { id: 3, initials: "BK", user_name: "Bob", action: "uploaded Assets", time_ago: "1h ago", color: "bg-emerald-500" },
    ];
  }

  return (
    <Card className="h-full border-none shadow-xl shadow-slate-200/50">
      <CardHeader 
        title="Aktivitas Terbaru" 
        subtitle="Log kolaborasi tim" 
        action={<History size={16} className="text-slate-300" />}
      />
      <div className="flex flex-col gap-6 mt-2 relative">
        <div className="absolute left-4 top-2 bottom-6 w-0.5 bg-slate-50 rounded-full"></div>
        
        {activities.map((activity: any) => (
          <div key={activity.id} className="relative pl-10 group cursor-default">
            <div className={`absolute left-0 top-0.5 w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-black border-2 border-white shadow-sm z-10 transition-transform group-hover:scale-110 ${activity.color || 'bg-slate-400'}`}>
              {activity.initials}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-slate-600 leading-tight">
                <span className="font-black text-slate-800 group-hover:text-primary transition-colors">{activity.user_name || activity.name}</span> {activity.action}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <Zap size={10} className="text-amber-400" />
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{activity.time_ago || activity.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
