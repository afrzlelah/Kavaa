"use client";

import { useState, useTransition } from "react";
import { ModuleList } from "./ModuleList";
import { Play, Clock, Download, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/shared/ui/Button";
import {
  toggleModuleCompletion,
  recordModuleWatch,
} from "@/app/actions/courseActions";
import { useEffect } from "react";
import type { Course } from "@/types";

interface Module {
  id: string;
  title: string;
  duration: string;
  is_completed: boolean;
  video_url: string;
  description: string;
}

interface CoursePlayerContentProps {
  course: Course;
  modules: Module[];
  relatedCourses: Course[];
}

export function CoursePlayerContent({
  course,
  modules,
  relatedCourses,
}: CoursePlayerContentProps) {
  const [activeModuleId, setActiveModuleId] = useState(modules[0]?.id);
  const [activeTab, setActiveTab] = useState<"deskripsi" | "feedback">(
    "deskripsi",
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (activeModuleId) {
      recordModuleWatch(activeModuleId);
    }
  }, [activeModuleId]);

  const activeModule =
    modules.find((m) => m.id === activeModuleId) || modules[0];

  const handleToggleCompletion = async () => {
    if (!activeModule) return;

    startTransition(async () => {
      const result = await toggleModuleCompletion(activeModule.id, course.id);
      if (result.error) {
        alert("Gagal memperbarui progres: " + result.error);
      }
    });
  };

  // Helper to convert YouTube URL to Embed URL
  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("youtube.com/embed/")) return url;

    let videoId = "";
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      videoId = match[2];
    }

    return videoId
      ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
      : url;
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-full">
      {/* Video Area (Main) */}
      <div className="xl:col-span-3 space-y-6">
        {/* Video Player */}
        <div className="bg-slate-900 rounded-[2rem] overflow-hidden aspect-video relative group shadow-2xl border border-slate-800">
          {activeModule?.video_url ? (
            <iframe
              src={getEmbedUrl(activeModule.video_url)}
              title={activeModule.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-400 gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center animate-pulse">
                <Play size={32} />
              </div>
              <p className="font-medium tracking-tight">
                Materi video tidak tersedia
              </p>
            </div>
          )}
        </div>

        {/* Course Info */}
        <div className="space-y-8 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <Link
                  href="/learning"
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 transition-colors"
                >
                  <ArrowLeft size={16} />
                </Link>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-widest rounded-lg">
                  Materi Sedang Dipelajari
                </span>
                <span className="text-slate-200">•</span>
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                  <Clock size={14} /> {activeModule?.duration || "0:00"}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                {activeModule?.title}
              </h1>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
                    {course.instructor?.[0] || "K"}
                  </div>
                  <span className="text-sm font-bold text-slate-500">
                    {course.instructor || "Kavaa Instructor"}
                  </span>
                </div>
                <button className="text-lg  text-primaryTint hover:underline">
                  + Follow Channel
                </button>
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Button
                onClick={handleToggleCompletion}
                disabled={isPending}
                className={`flex-1 md:flex-none rounded-2xl h-12 px-6 gap-2 font-bold transition-all ${
                  activeModule?.is_completed
                    ? "bg-emerald-600 hover:bg-emerald-600 shadow-emerald-100"
                    : "bg-primaryTint hover:bg-blue-700 shadow-blue-100"
                } text-white shadow-lg`}
              >
                {activeModule?.is_completed ? (
                  <CheckCircle size={18} />
                ) : (
                  <Play size={18} />
                )}
                {activeModule?.is_completed ? "Selesai" : "Tandai Selesai"}
              </Button>
              <Button
                variant="outline"
                className="flex-1 md:flex-none rounded-2xl border-slate-200 h-12 px-6 gap-2 text-slate-600 font-bold hover:bg-slate-50"
              >
                <Download size={18} />
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-8 border-b border-slate-100">
            {(["deskripsi", "feedback"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-black uppercase  transition-all relative font-semibold ${
                  activeTab === tab
                    ? "text-slate-900"
                    : "text-slate-300 hover:text-slate-500"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5  bg-black rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[100px] ">
            {activeTab === "deskripsi" ? (
              <div className="space-y-10">
                <p className="text-slabg-blackte-500  font-normal leading-relaxed max-w-4xl">
                  {activeModule?.description ||
                    "Pelajari fondasi utama dalam materi ini untuk membangun pemahaman yang kuat."}
                </p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex flex-col gap-2 min-w-[120px]">
                    <span className="text-[10px] font-bold text-black  tracking-widest">
                      Durasi
                    </span>
                    <div className="px-5 py-3 bg-primaryTint rounded-2xl text-blue-100 text-xs font-black border border-blue-100 font-medium">
                      {activeModule?.duration || "0:00"} Menit
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 min-w-[120px]">
                    <span className="text-[10px] font-bold text-black  tracking-widest">
                      Level
                    </span>
                    <div className="px-5 py-3 bg-primaryTint rounded-2xl text-blue-100 text-xs font-black border border-blue-100 font-medium">
                      Dasar
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 min-w-[120px]">
                    <span className="text-[10px] font-bold text-black  tracking-widest">
                      Modul
                    </span>
                    <div className="px-5 py-3 bg-primaryTint rounded-2xl text-blue-100 text-xs font-black border border-blue-100 font-medium">
                      {modules.findIndex((m) => m.id === activeModuleId) + 1} /{" "}
                      {modules.length}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
                <p className="text-sm font-bold text-slate-400">
                  Klik tab &quot;Give Feedback&quot; di panel kanan untuk
                  memberikan ulasan
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar (Right) */}
      <div className="xl:col-span-1 h-[calc(100vh-180px)] sticky top-6">
        <ModuleList
          modules={modules}
          activeModuleId={activeModuleId}
          onModuleSelect={setActiveModuleId}
          relatedCourses={relatedCourses}
          courseId={course.id}
        />
      </div>
    </div>
  );
}
