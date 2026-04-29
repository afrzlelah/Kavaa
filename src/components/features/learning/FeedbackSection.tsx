import { Card } from "@/components/shared/ui/Card";
import { Button } from "@/components/shared/ui/Button";
import { MessageSquare, ArrowRight } from "lucide-react";

export function FeedbackSection({ feedback = [] }: { feedback?: any[] }) {
  return (
    <Card className="h-full border border-slate-100 shadow-sm p-8 rounded-[2rem] flex flex-col">
      <div className="mb-6">
        <h4 className="text-[13px] font-black text-slate-800 uppercase tracking-widest leading-none">
          Feedback Belajar Lintas Peran
        </h4>
      </div>

      <div className="flex -space-x-1.5 mb-5">
        {feedback.slice(0, 3).map((f, i) => (
          <div
            key={i}
            className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 shadow-sm overflow-hidden"
          >
            {f.users?.avatar_url ? (
              <img
                src={f.users.avatar_url}
                alt="user"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-100 flex items-center justify-center text-[10px] font-bold text-primaryTint">
                {(f.users?.first_name || "U")[0]}
              </div>
            )}
          </div>
        ))}
      </div>

      <p className="text-[10px] font-bold text-slate-400 mb-6 uppercase tracking-widest">
        Feedback Belajar Lintas Peran
      </p>

      <div className="space-y-4 flex-1">
        {feedback.length === 0 ? (
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">
            Belum ada feedback
          </p>
        ) : (
          feedback.map((f, idx) => (
            <div key={idx} className="flex gap-3 items-start">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>
              <p className="text-[11px] font-bold text-slate-400 leading-tight">
                <span className="text-slate-800">{f.users?.first_name}:</span> {f.comment}
              </p>
            </div>
          ))
        )}
      </div>

      <Button
        variant="secondary"
        className="w-full mt-6 py-3 rounded-xl font-black text-[11px] bg-white border border-slate-100 text-slate-400 hover:bg-slate-50 shadow-sm transition-all"
      >
        Tinjauan Ulasan
      </Button>
    </Card>
  );
}
