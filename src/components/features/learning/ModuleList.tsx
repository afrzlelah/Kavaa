"use client";

import { CheckCircle2, Circle, PlayCircle } from "lucide-react";
import { useState } from "react";

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
  relatedCourses?: any[];
}

export function ModuleList({ modules, activeModuleId, onModuleSelect, relatedCourses }: ModuleListProps) {
  const [activeTab, setActiveTab] = useState<"module" | "feedback">("module");

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-slate-100">
        <button
          onClick={() => setActiveTab("module")}
          className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${
            activeTab === "module" ? "text-primary border-b-2 border-primary" : "text-slate-400"
          }`}
        >
          Module
        </button>
        <button
          onClick={() => setActiveTab("feedback")}
          className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest transition-all ${
            activeTab === "feedback" ? "text-primary border-b-2 border-primary" : "text-slate-400"
          }`}
        >
          Give a Feedback
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
                className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all text-left ${
                  isActive ? "bg-blue-50/50 border border-blue-100 shadow-sm" : "hover:bg-slate-50"
                }`}
              >
                <div className="flex-shrink-0">
                  {module.is_completed ? (
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <CheckCircle2 size={12} strokeWidth={3} />
                    </div>
                  ) : isActive ? (
                    <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center relative overflow-hidden">
                       <div className="absolute top-0 left-0 w-full h-1/2 bg-blue-500" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-blue-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <PlayCircle size={14} className={isActive ? "text-blue-500" : "text-slate-400"} />
                    <span className={`text-[12px] font-bold truncate ${isActive ? "text-slate-900" : "text-slate-600"}`}>
                      {String(idx + 1).padStart(2, "0")} - {module.title}
                    </span>
                  </div>
                  <span className="text-[9px] font-bold text-slate-400 ml-5">
                    ({module.duration})
                  </span>
                </div>
              </button>
            );
          })
        ) : (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bagaimana menurutmu modul ini?</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} className="text-slate-300 hover:text-yellow-400 transition-colors">
                    <CheckCircle2 size={24} fill="currentColor" className="text-current" />
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Komentar (Opsional)</label>
              <textarea 
                className="w-full h-32 p-4 bg-slate-50 border border-slate-100 rounded-2xl text-xs focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all"
                placeholder="Tuliskan masukanmu di sini..."
              />
            </div>
            <button className="w-full py-3 bg-[#0066FF] text-white text-[11px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all">
              Kirim Feedback
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
                 <img src={course.thumbnail_url || "https://images.unsplash.com/photo-1586717791821-3f44a563cc4c?w=200&q=80"} alt="related" className="w-full h-full object-cover" />
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
