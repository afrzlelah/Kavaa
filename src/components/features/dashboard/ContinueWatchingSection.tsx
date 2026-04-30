import Image from "next/image";
import { Heart } from "lucide-react";
import { getUserCourses } from "@/services/courseService";
import { FlatUserCourse } from "@/types";

export async function ContinueWatchingSection({ userId }: { userId?: string }) {
  let userCourses: FlatUserCourse[] = [];

  if (userId && userId !== "undefined") {
    userCourses = await getUserCourses(userId);
  }

  // Fallback data matching the screenshot exactly
  const fallbackCourses = [
    {
      title: "Panduan Front End Web Developer",
      instructor: "WPU",
      role: "Software Developer",
      tag: "FRONTEND",
      progress: 45,
      thumbnail_url: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
      avatar: "https://ui-avatars.com/api/?name=WPU&background=random",
    },
    {
      title: "Pemrograman Web Dasar",
      instructor: "Study With Student",
      role: "Software Developer",
      tag: "FRONTEND",
      progress: 60,
      thumbnail_url: "https://images.unsplash.com/photo-1542831371-29b0f74f9713",
      avatar: "https://ui-avatars.com/api/?name=SWS&background=random",
    },
    {
      title: "Mengenal Software Development Life Cycle",
      instructor: "Ichbal Hadi",
      role: "Software Developer",
      tag: "FRONTEND",
      progress: 80,
      thumbnail_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
      avatar: "https://ui-avatars.com/api/?name=Ichbal&background=random",
    },
  ];

  const displayCourses = userCourses.length > 0 ? userCourses : fallbackCourses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
      {displayCourses.map((course, idx) => (
        <div
          key={idx}
          className="bg-white w-full border border-slate-50 rounded-[2.5rem] p-4 flex flex-col shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all group cursor-pointer"
        >
          <div className="relative rounded-[2rem] bg-black overflow-hidden mb-5 aspect-video bg-slate-100 shadow-inner">
            <Image
              src={course.thumbnail_url}
              alt={course.title}
              fill
              style={{ objectFit: "cover" }}
              className="group-hover:scale-110 transition-transform duration-700"
            />
            <button className="absolute top-4 right-4 w-9 h-9 bg-black/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/30 transition-all border border-white/20">
              <Heart size={15} className="group-hover:fill-white transition-all" />
            </button>
          </div>
          <span className="px-4 py-1 min-w-20 w-24 max-w-40 bg-primaryTint/20 text-primaryTint text-[9px] rounded-xl uppercase">
            {course.tag}
          </span>
          <div className="px-2 flex flex-col flex-1">
            <h3 className="text-lg font-black text-slate-800 leading-snug mb-5 line-clamp-2 min-h-[40px]">
              {course.title}
            </h3>
            <div className="mt-auto space-y-5">
              <div className="space-y-2">
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-1000"
                    style={{ width: `${course.progress || 0}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <Image
                    src={course.avatar}
                    alt={course.instructor}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] font-black text-slate-800 truncate">
                    {course.instructor}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 truncate">
                    {course.role || "Software Developer"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
