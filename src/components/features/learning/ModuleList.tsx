import { CheckCircle2, Circle, PlayCircle, Star } from "lucide-react";
import { useState } from "react";
import { submitCourseFeedback } from "@/app/actions/courseActions";
import type { Course } from "@/types";
import Image from "next/image";

interface Module {
  id: string;
  title: string;
  duration: string;
  is_completed: boolean;
  is_active?: boolean;
}

interface ModuleListProps {
  modules: Module[];
  activeModuleId?: string;
  onModuleSelect?: (id: string) => void;
  relatedCourses?: Course[];
  courseId: string;
}

export function ModuleList({
  modules,
  activeModuleId,
  onModuleSelect,
  relatedCourses,
  courseId,
}: ModuleListProps) {
  const [activeTab, setActiveTab] = useState<"module" | "feedback">("module");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitFeedback = async () => {
    if (rating === 0) {
      alert("Pilih rating terlebih dahulu!");
      return;
    }

    setIsSubmitting(true);
    const result = await submitCourseFeedback(courseId, rating, comment);
    setIsSubmitting(false);

    if (result.success) {
      alert("Feedback berhasil dikirim! Terima kasih.");
      setRating(0);
      setComment("");
      setActiveTab("module");
    } else {
      alert("Gagal mengirim feedback: " + result.error);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-slate-100">
        <button
          onClick={() => setActiveTab("module")}
          className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all ${
            activeTab === "module"
              ? "text-primaryTint border-b-2 border-primaryTint"
              : "text-slate-400"
          }`}
        >
          Module
        </button>
        <button
          onClick={() => setActiveTab("feedback")}
          className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all ${
            activeTab === "feedback"
              ? "text-primaryTint border-b-2 border-primaryTint"
              : "text-slate-400"
          }`}
        >
          Give Feedback
        </button>
      </div>

      {/* Module List Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {activeTab === "module" ? (
          modules.map((module, idx) => {
            const isActive = module.id === activeModuleId;
            return (
              <button
                key={module.id}
                onClick={() => onModuleSelect?.(module.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left group ${
                  isActive
                    ? "bg-blue-50 border border-blue-100 shadow-sm"
                    : "hover:bg-slate-50 border border-transparent"
                }`}
              >
                <div className="flex-shrink-0">
                  {module.is_completed ? (
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                      <CheckCircle2 size={14} strokeWidth={3} />
                    </div>
                  ) : isActive ? (
                    <div className="w-6 h-6 rounded-full border-2 border-primaryTint flex items-center justify-center relative overflow-hidden bg-white">
                      <div className="w-2 h-2 bg-primaryTint rounded-full animate-pulse" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-primaryTint transition-colors bg-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col gap-0.5">
                    <span
                      className={`text-[12px] font-black ${
                        isActive ? "text-slate-900" : "text-slate-500"
                      }`}
                    >
                      {String(idx + 1).padStart(2, "0")} - {module.title}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      <PlayCircle size={10} /> {module.duration}
                    </span>
                  </div>
                </div>
              </button>
            );
          })
        ) : (
          <div className="space-y-6 py-2">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Bagaimana menurutmu modul ini?
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`transition-all transform hover:scale-110 ${
                      rating >= star ? "text-yellow-400" : "text-slate-200"
                    }`}
                  >
                    <Star
                      size={28}
                      fill={rating >= star ? "currentColor" : "none"}
                      strokeWidth={2.5}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Komentar (Opsional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full h-32 p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-primaryTint outline-none resize-none transition-all placeholder:text-slate-300"
                placeholder="Tuliskan masukanmu di sini..."
              />
            </div>
            <button
              onClick={handleSubmitFeedback}
              disabled={isSubmitting}
              className={`w-full py-4 bg-primaryTint text-white text-[11px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/20 hover:translate-y-[-2px] active:translate-y-[0] transition-all ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Mengirim..." : "Kirim Feedback"}
            </button>
          </div>
        )}
      </div>

      {/* Related Courses Section */}
      <div className="p-6 border-t border-slate-100 bg-slate-50/50">
        <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4">Related Courses</h4>
        <div className="space-y-4">
          {relatedCourses?.map((course) => (
            <div key={course.id} className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex gap-3 group cursor-pointer hover:shadow-md transition-all">
              <div className="w-20 h-14 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0 relative">
                 <Image src={course.thumbnail_url || "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&q=80"} alt="related" fill className="object-cover" />
                 <div className="absolute top-1 right-1 bg-white/90 px-1.5 py-0.5 rounded-md text-[8px] font-black text-slate-800 uppercase tracking-tighter">learning</div>
              </div>
              <div className="flex-1 min-w-0">
                 <p className="text-[11px] font-bold text-slate-800 line-clamp-2 leading-tight mb-1 group-hover:text-primary transition-colors">
                   {course.title}
                 </p>
                 <p className="text-[9px] font-bold text-slate-400">
                    {course.lectures_count || "47"} lectures | {course.total_hours || "3.5"} total hours
                 </p>
              </div>
            </div>
          ))}
          {(!relatedCourses || relatedCourses.length === 0) && (
            <p className="text-[10px] text-slate-400 italic">No related courses found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
