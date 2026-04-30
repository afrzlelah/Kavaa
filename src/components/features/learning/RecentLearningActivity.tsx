import { Card } from "@/components/shared/ui/Card";
import { Avatar } from "@/components/shared/ui/Avatar";
import { Clock } from "lucide-react";
import Image from "next/image";

export function RecentLearningActivity({ activities = [] }: { activities?: { users?: { first_name?: string; avatar_url?: string }; is_completed?: boolean; module?: { title?: string; courses?: { category?: string } }; custom_text?: string; is_system?: boolean }[] }) {
  const displayActivities = activities.length > 0 ? activities : [
    {
      users: { first_name: "Alice", avatar_url: "https://ui-avatars.com/api/?name=Alice&background=random" },
      is_completed: true,
      module: { title: "kuis HTML", courses: { category: "WEB DEV" } }
    },
    {
      users: { first_name: "Charlie", avatar_url: "https://ui-avatars.com/api/?name=Charlie&background=random" },
      is_completed: false,
      module: { title: "mengunggah draf desain ditinjau", courses: { category: "UI DESIGN" } },
      custom_text: "Charlie mengunggah draf desain ditinjau"
    },
    {
      users: { first_name: "Pen", avatar_url: "" }, // Will use icon
      is_completed: false,
      module: { title: "Draf desain portfolio Alice siap untuk ditinjau", courses: { category: "UI DESIGN" } },
      custom_text: "Draf desain portfolio Alice siap untuk ditinjau",
      is_system: true
    }
  ];

  return (
    <Card className="h-full border border-slate-100 shadow-sm p-6 lg:p-8 rounded-[2rem]">
      <div className="mb-6">
        <h4 className="text-[13px] font-black text-slate-900 leading-none">
          Aktivitas Belajar Terbaru
        </h4>
      </div>

      <div className="space-y-6">
        {displayActivities.map((activity, idx) => (
          <div key={idx} className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center shadow-sm shrink-0 relative">
              {activity.is_system ? (
                 <span className="text-slate-400 text-xs">✏️</span>
              ) : activity.users?.avatar_url ? (
                <Image
                  src={activity.users.avatar_url}
                  alt={activity.users.first_name || "avatar"}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-primary text-xs font-black">
                  {(activity.users?.first_name || "U")[0]}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-slate-500 leading-tight">
                {activity.custom_text ? (
                  activity.custom_text
                ) : (
                  <>
                    <span className="font-bold text-slate-800">{activity.users?.first_name || "User"}</span>{" "}
                    {activity.is_completed ? "menyelesaikan" : "sedang menonton"} {activity.module?.title}
                  </>
                )}
              </p>
              <span className="text-[9px] font-bold text-slate-400 tracking-widest mt-1 block">
                {activity.module?.courses?.category || "MATERI"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
