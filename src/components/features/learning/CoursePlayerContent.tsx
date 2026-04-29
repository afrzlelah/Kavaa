"use client";

import { useState } from "react";
import { ModuleList } from "./ModuleList";
import { Play, RotateCcw, Volume2, Settings, Maximize, Clock, Download, Plus } from "lucide-react";
import { Button } from "@/components/shared/ui/Button";

interface Module {
  id: string;
  title: string;
  duration: string;
  is_completed: boolean;
  video_url: string;
  description: string;
}

interface CoursePlayerContentProps {
  course: any;
  modules: Module[];
}

export function CoursePlayerContent({ course, modules }: CoursePlayerContentProps) {
  const [activeModuleId, setActiveModuleId] = useState(modules[0]?.id);
  const [activeTab, setActiveTab] = useState<"deskripsi" | "feedback">("deskripsi");

  const activeModule = modules.find((m) => m.id === activeModuleId) || modules[0];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-full">
      {/* Video Area (Main) */}
      <div className="xl:col-span-3 space-y-6">
        {/* Video Player */}
        <div className="bg-slate-900 rounded-[2rem] overflow-hidden aspect-video relative group shadow-2xl">
          <img 
            src={activeModule?.video_url || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80"} 
            alt="video thumbnail" 
            className="w-full h-full object-cover opacity-60"
          />
          
          {/* Mock Video Controls */}
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 cursor-pointer hover:scale-110 transition-all">
                <Play fill="white" className="text-white ml-1" size={32} />
             </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
             <div className="flex flex-col gap-4">
                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden relative">
                   <div className="absolute top-0 left-0 h-full w-[40%] bg-blue-500 rounded-full" />
                </div>
                
                <div className="flex items-center justify-between text-white">
                   <div className="flex items-center gap-6">
                      <button className="hover:text-blue-400 transition-colors"><Play size={20} fill="currentColor" /></button>
                      <button className="hover:text-blue-400 transition-colors"><RotateCcw size={20} /></button>
                      <button className="hover:text-blue-400 transition-colors flex items-center gap-2">
                        <Volume2 size={20} />
                        <div className="w-16 h-1 bg-white/30 rounded-full overflow-hidden">
                           <div className="w-[60%] h-full bg-white" />
                        </div>
                      </button>
                      <span className="text-xs font-bold font-mono">05:42 / 08:23</span>
                   </div>
                   <div className="flex items-center gap-6">
                      <button className="hover:text-blue-400 transition-colors"><Settings size={20} /></button>
                      <button className="hover:text-blue-400 transition-colors"><Maximize size={20} /></button>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Course Info */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight mb-2 uppercase">
                {activeModule?.title.toUpperCase()} ? (Penjelasan Sederhana mengenai Website)
              </h1>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-slate-400">{course.instructor || "AsalJeplak"}</span>
                <button className="text-sm font-bold text-primary hover:underline">+ Follow Chanel</button>
              </div>
            </div>
            <div className="flex gap-3">
               <button className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-all">
                  <Clock size={20} />
               </button>
               <button className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-all">
                  <Download size={20} />
               </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-slate-100 flex gap-8">
            <button
              onClick={() => setActiveTab("deskripsi")}
              className={`pb-4 text-sm font-black uppercase tracking-widest transition-all ${
                activeTab === "deskripsi" ? "text-slate-800 border-b-2 border-slate-800" : "text-slate-400"
              }`}
            >
              Deskripsi
            </button>
          </div>

          {/* Tab Content */}
          <div className="space-y-12">
            <p className="text-sm font-bold text-slate-500 leading-relaxed max-w-4xl">
              {activeModule?.description || "Kenali fondasi utama dunia internet dalam video ini. \"Apa Itu Website?\" memberikan pemahaman mendasar bagi pemula mengenai struktur, kegunaan, dan cara kerja website secara singkat dan padat. Langkah pertama yang tepat sebelum kamu masuk ke materi Web Development yang lebih dalam."}
            </p>

            <div className="flex gap-4">
               <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Durasi</span>
                  <div className="px-5 py-2.5 bg-primary rounded-lg text-white text-[11px] font-black shadow-lg shadow-primary/20">
                    13.09 Menit
                  </div>
               </div>
               <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Level</span>
                  <div className="px-8 py-2.5 bg-primary rounded-lg text-white text-[11px] font-black shadow-lg shadow-primary/20">
                    Dasar
                  </div>
               </div>
               <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Modul</span>
                  <div className="px-8 py-2.5 bg-primary rounded-lg text-white text-[11px] font-black shadow-lg shadow-primary/20">
                    2 dari 10
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar (Right) */}
      <div className="xl:col-span-1 h-[calc(100vh-180px)] sticky top-6">
        <ModuleList 
          modules={modules} 
          activeModuleId={activeModuleId} 
          onModuleSelect={setActiveModuleId} 
        />
      </div>
    </div>
  );
}
