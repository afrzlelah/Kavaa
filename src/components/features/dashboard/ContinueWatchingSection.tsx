import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { ProgressBar } from "@/components/shared/ui/ProgressBar";
import { Avatar } from "@/components/shared/ui/Avatar";
import { getUserCourses } from "@/services/courseService";

export async function ContinueWatchingSection({ userId }: { userId?: string }) {
  // Use mock data fallback if no user ID or if database doesn't have records yet
  let userCourses = [];
  
  if (userId && userId !== "undefined") {
    userCourses = await getUserCourses(userId);
  }

  // Fallback static data if no courses are returned (so UI isn't empty during testing)
  if (!userCourses || userCourses.length === 0) {
    userCourses = [
      {
        id: 1,
        tag: "FRONTEND",
        title: "Panduan Pemula Menjadi Developer Frontend Profesional",
        instructor: "Prashant Kumar Singh",
        role: "Pengembang Perangkat Lunak",
        progress: 75,
        thumbnail_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&q=80",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
      }
    ];
  }

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900">
          Lanjutkan Menonton
        </h2>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50">
            <ChevronLeft size={16} />
          </button>
          <button className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-800 hover:bg-slate-50">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {userCourses.map((course: any, idx: number) => (
          <div
            key={idx}
            className="bg-white border border-slate-100 rounded-3xl p-3 flex flex-col shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="relative rounded-2xl overflow-hidden mb-4 aspect-video bg-slate-100">
              <img
                src={course.thumbnail_url}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <button className="absolute top-3 right-3 w-8 h-8 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors">
                <Heart size={14} className="fill-white/50" />
              </button>
            </div>

            <div className="px-2 flex flex-col flex-1">
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md w-fit mb-3">
                {course.tag}
              </span>
              <h3 className="text-sm font-bold text-slate-800 leading-snug mb-4 line-clamp-2">
                {course.title}
              </h3>

              <div className="mt-auto">
                <ProgressBar progress={course.progress || 0} className="mb-4" />

                <div className="flex items-center gap-3 pt-2 border-t border-slate-50">
                  <Avatar src={course.avatar} size="sm" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">
                      {course.instructor}
                    </span>
                    <span className="text-[10px] font-medium text-slate-500">
                      {course.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
