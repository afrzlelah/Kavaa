import { ambilTugasPengguna } from "@/services/layananTugas";
import { createClient } from "@/utilitas/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Card } from "@/components/Bersama/ui/Card";
import { Button } from "@/components/Bersama/ui/Button";
import { CheckCircle2, Circle, Clock, AlertCircle, Plus } from "lucide-react";
import type { Tugas } from "@/types";

const STATUS_STYLES: Record<string, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  selesai:   { label: "Selesai",       icon: CheckCircle2,  color: "text-emerald-600", bg: "bg-emerald-50" },
  berjalan:  { label: "Sedang Dikerjakan", icon: Clock,     color: "text-blue-600",    bg: "bg-blue-50"    },
  tertunda:  { label: "Tertunda",      icon: AlertCircle,   color: "text-amber-600",   bg: "bg-amber-50"   },
  belum:     { label: "Belum Dimulai", icon: Circle,        color: "text-slate-400",   bg: "bg-slate-50"   },
};

const FALLBACK_TASKS: Tugas[] = [
  { id: 1, title: "Review Pull Request Tim A",    category: "Kolaborasi", status: "berjalan",  due_date: "2026-04-28", priority: "Tinggi"  },
  { id: 2, title: "Buat Mockup Halaman Dashboard", category: "Desain",    status: "belum",     due_date: "2026-04-30", priority: "Sedang"  },
  { id: 3, title: "Selesaikan Modul React Dasar",  category: "Learning",  status: "selesai",   due_date: "2026-04-25", priority: "Rendah"  },
];

const PRIORITY_COLOR: Record<string, string> = {
  Tinggi: "text-red-600 bg-red-50 border-red-200",
  Sedang: "text-amber-600 bg-amber-50 border-amber-200",
  Rendah: "text-slate-500 bg-slate-50 border-slate-200",
};

export default async function Tugas() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let tasks = await ambilTugasPengguna(user.id);
  if (!tasks || tasks.length === 0) {
    tasks = FALLBACK_TASKS;
  }


  const grouped = {
    berjalan: tasks.filter((t: Tugas) => t.status === "berjalan"),
    belum:    tasks.filter((t: Tugas) => t.status === "belum"),
    tertunda: tasks.filter((t: Tugas) => t.status === "tertunda"),
    selesai:  tasks.filter((t: Tugas) => t.status === "selesai"),
  };

  return (
    <div className="p-8 max-w-7xl mx-auto h-full overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Papan Tugas</h1>
          <p className="text-slate-500">Kelola dan pantau semua pekerjaan Anda di satu tempat.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus size={16} /> Tugas Baru
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {Object.entries(STATUS_STYLES).map(([key, s]) => {
          const Icon = s.icon;
          const count = grouped[key as keyof typeof grouped]?.length ?? 0;
          return (
            <Card key={key} className={`flex items-center gap-3 p-4 border ${s.bg}`}>
              <Icon size={20} className={s.color} />
              <div>
                <p className="text-xl font-bold text-slate-800">{count}</p>
                <p className="text-xs text-slate-500 font-medium">{s.label}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Kanban-style columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {Object.entries(grouped).map(([statusKey, items]) => {
          const s = STATUS_STYLES[statusKey];
          const Icon = s.icon;
          return (
            <div key={statusKey}>
              <div className={`flex items-center gap-2 mb-4 px-3 py-2 rounded-xl ${s.bg}`}>
                <Icon size={14} className={s.color} />
                <span className={`text-sm font-bold ${s.color}`}>{s.label}</span>
                <span className="ml-auto text-xs font-bold text-slate-500 bg-white rounded-full px-2 py-0.5">
                  {(items as Tugas[]).length}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {(items as Tugas[]).map((task: Tugas) => {
                  const priorityClass = PRIORITY_COLOR[task.priority] ?? PRIORITY_COLOR.Rendah;
                  return (
                    <Card key={task.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
                      <h3 className="text-sm font-bold text-slate-800 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                        {task.title}
                      </h3>
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {task.category}
                        </span>
                        {task.priority && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${priorityClass}`}>
                            {task.priority}
                          </span>
                        )}
                      </div>
                      {task.due_date && (
                        <p className="mt-3 flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                          <Clock size={11} />
                          Tenggat: {new Date(task.due_date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      )}
                    </Card>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
