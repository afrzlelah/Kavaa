import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Heart,
  Play,
} from "lucide-react";
import { continueWatching } from "@/constants";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* SEARCH & FILTER */}
      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search your course here...."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <button className="p-3.5 bg-white border border-slate-100 rounded-2xl shadow-sm text-slate-600">
          <Filter size={20} />
        </button>
      </div>

      {/* HERO BANNER */}
      <section className="relative bg-blue-600 rounded-[32px] p-8 md:p-12 text-white mb-8 overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <p className="text-xs font-bold tracking-widest uppercase mb-4 opacity-80">
            Online Course
          </p>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-8">
            Sharpen Your Skills With Professional Online Courses
          </h1>
          <button className="flex items-center gap-3 bg-black text-white pl-6 pr-2 py-2 rounded-full font-bold hover:scale-105 transition-transform">
            Join Now
            <div className="bg-white p-1.5 rounded-full text-black">
              <Play size={14} fill="currentColor" />
            </div>
          </button>
        </div>
        {/* Decorative Shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent flex items-center justify-center">
          <div className="grid grid-cols-2 gap-4 opacity-20">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-16 h-16 border-2 border-white rotate-45"
              />
            ))}
          </div>
        </div>
      </section>

      {/* STATISTICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-3xl flex items-center justify-between shadow-sm border border-slate-100"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
                <Bell size={20} fill="currentColor" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400">
                  2/8 Watched
                </p>
                <p className="text-sm font-bold text-slate-800">
                  Product Design
                </p>
              </div>
            </div>
            <MoreVertical size={18} className="text-slate-300" />
          </div>
        ))}
      </div>

      {/* CONTINUE WATCHING */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-extrabold">Continue Watching</h2>
          <div className="flex gap-2">
            <button className="p-2 border border-slate-200 rounded-full text-slate-400 hover:bg-white">
              <ChevronLeft size={20} />
            </button>
            <button className="p-2 border border-slate-200 rounded-full text-slate-800 bg-white">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {continueWatching.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-[2.5rem] shadow-sm border border-slate-100 group"
            >
              <div className="relative rounded-[2rem] overflow-hidden mb-4 aspect-video">
                <img
                  src={item.thumbnail}
                  className="w-full h-full object-cover group-hover:scale-105 transition-duration-500"
                  alt=""
                />
                <button className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-md rounded-full text-white">
                  <Heart size={16} />
                </button>
              </div>
              <div className="px-2">
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg mb-3 inline-block">
                  {item.tag}
                </span>
                <h3 className="font-bold text-sm leading-snug mb-4 line-clamp-2">
                  {item.title}
                </h3>
                <div className="h-1.5 w-full bg-slate-100 rounded-full mb-4 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/100"
                    className="w-8 h-8 rounded-full"
                    alt=""
                  />
                  <div>
                    <p className="text-[10px] font-bold">{item.instructor}</p>
                    <p className="text-[9px] text-slate-400 font-medium">
                      Software Developer
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </DashboardLayout>
  );
}
