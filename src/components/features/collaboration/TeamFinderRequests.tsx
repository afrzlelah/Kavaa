import { Card, CardHeader } from "@/components/shared/ui/Card";
import { Avatar } from "@/components/shared/ui/Avatar";
import { getTeamRequests } from "@/services/collaborationService";
import { ArrowRight, UserPlus } from "lucide-react";
import Link from "next/link";
import { TeamRequest } from "@/types";

export async function TeamFinderRequests() {
  let requests = await getTeamRequests();
  const hasData = requests && requests.length > 0;

  if (!hasData) {
    requests = [
      {
        id: 1,
        initials: "AW",
        title: "Front-end needed for FreshMart",
        time_ago: "4m ago",
        color: "bg-indigo-500",
      },
      {
        id: 2,
        initials: "CM",
        title: "Back-end for SkillLink",
        time_ago: "12m ago",
        color: "bg-amber-500",
      },
      {
        id: 3,
        initials: "JS",
        title: "UI Designer for EduApp",
        time_ago: "1h ago",
        color: "bg-emerald-500",
      },
    ];
  }

  return (
    <Card className="h-full border-none shadow-xl shadow-slate-200/50">
      <CardHeader
        title="Pencarian Tim Baru"
        subtitle="Permintaan pencarian tim terbaru"
      />
      <div className="flex flex-col gap-4 mt-2">
        {requests.map((req: TeamRequest) => (
          <div
            key={req.id}
            className="flex gap-4 items-center justify-between p-3 rounded-2xl border border-transparent hover:border-slate-100 hover:bg-slate-50 transition-all group"
          >
            <div className="flex gap-3 items-center min-w-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-black shadow-sm group-hover:scale-110 transition-transform ${req.color || "bg-primary"}`}
              >
                {req.initials}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-slate-800 truncate group-hover:text-primary transition-colors">
                  {req.title}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  {req.time_ago}
                </p>
              </div>
            </div>
            <Link
              href={`/collaboration/${req.id}`}
              className="p-2 rounded-xl bg-slate-100 text-slate-400 group-hover:bg-primary group-hover:text-white transition-all"
            >
              <ArrowRight size={14} />
            </Link>
          </div>
        ))}

        {!hasData && (
          <button className="w-full mt-2 py-3 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-slate-400 hover:border-primary hover:text-primary transition-all">
            <UserPlus size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              Cari Tim Sekarang
            </span>
          </button>
        )}
      </div>
    </Card>
  );
}
