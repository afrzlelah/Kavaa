import { Card } from "@/components/shared/ui/Card";
import { Avatar } from "@/components/shared/ui/Avatar";
import { Clock } from "lucide-react";

export function RecentLearningActivity({ activities = [] }: { activities?: any[] }) {
  return (
    <Card className="h-full border border-slate-100 shadow-sm p-8 rounded-[2rem]">
      <div className="mb-8">
        <h4 className="text-[13px] font-black text-slate-800 uppercase tracking-widest leading-none">
          Aktivitas Belajar Terbaru
        </h4>
      </div>

      <div className="space-y-7">
        {activities.length === 0 ? (
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">
            Belum ada aktivitas terbaru
          </p>
        ) : (
          activities.map((activity, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="w-9 h-9 rounded-full bg-blue-50 overflow-hidden flex items-center justify-center shadow-sm shrink-0">
                {activity.users?.avatar_url ? (
                  <img
                    src={activity.users.avatar_url}
                    alt={activity.users.first_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-primaryTint text-[10px] font-black uppercase">
                    {(activity.users?.first_name || "U")[0]}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-black text-slate-800 leading-tight">
                  {activity.users?.first_name || "User"}{" "}
                  <span className="font-bold text-slate-400">
                    {activity.is_completed ? "menyelesaikan" : "sedang menonton"} {activity.module?.title}
                  </span>
                </p>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1 block">
                  {activity.module?.courses?.category || "MATERI"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
