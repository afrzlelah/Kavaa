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
}

export function ModuleList({ modules, activeModuleId, onModuleSelect }: ModuleListProps) {
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
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">
                      <CheckCircle2 size={14} fill="currentColor" className="text-white" />
                    </div>
                  ) : isActive ? (
                    <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    </div>
                  ) : (
                    <Circle className="text-primary w-6 h-6" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <PlayCircle size={14} className={isActive ? "text-primary" : "text-slate-400"} />
                    <span className={`text-[13px] font-bold truncate ${isActive ? "text-slate-900" : "text-slate-600"}`}>
                      {String(idx + 1).padStart(2, "0")} - {module.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 ml-5">
                    ({module.duration})
                  </span>
                </div>
              </button>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 text-xs font-medium py-10">
            Feature coming soon...
          </div>
        )}
      </div>

      {/* Related Courses Section */}
      <div className="p-6 border-t border-slate-100 bg-slate-50/50">
        <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-4">Related Courses</h4>
        <div className="space-y-4">
          <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex gap-3 group cursor-pointer hover:shadow-md transition-all">
            <div className="w-20 h-14 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0 relative">
               <img src="https://images.unsplash.com/photo-1586717791821-3f44a563cc4c?w=200&q=80" alt="related" className="w-full h-full object-cover" />
               <div className="absolute top-1 right-1 bg-white/90 px-1 py-0.5 rounded-sm text-[8px] font-bold">learning</div>
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-[11px] font-bold text-slate-800 line-clamp-2 leading-tight mb-1 group-hover:text-primary transition-colors">
                 Learn Figma - UI/UX Design Es...
               </p>
               <p className="text-[9px] font-bold text-slate-400">47 lectures | 3.5 total hours</p>
            </div>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm flex gap-3 group cursor-pointer hover:shadow-md transition-all">
             <div className="w-20 h-14 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0">
                <img src="https://images.unsplash.com/photo-1541462608141-ad4d157ee9f7?w=200&q=80" alt="related" className="w-full h-full object-cover" />
             </div>
             <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-slate-800 line-clamp-2 leading-tight mb-1 group-hover:text-primary transition-colors">
                  Web Development Bootcamp 2024
                </p>
                <p className="text-[9px] font-bold text-slate-400">120 lectures | 45 total hours</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
