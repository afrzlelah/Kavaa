import { continueWatching } from "@/constants";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Filter,
  Heart,
  MoreVertical,
  Search,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <main className="flex-1 flex flex-col h-full overflow-y-auto px-4 md:px-8 py-20 lg:py-8 min-w-0">
      {/* Header Pencarian */}
      <header className="flex items-center gap-4 mb-8">
        <div className="relative flex-1 max-w-3xl">
          <input
            type="text"
            placeholder="Cari kursus Anda di sini...."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
          />
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
        </div>
        <button className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-600 hover:bg-slate-50 shadow-sm transition-all shrink-0">
          <Filter size={20} />
        </button>
      </header>

      {/* Banner Utama */}
      <section className="relative w-full rounded-[24px] bg-[#2563eb] mb-8 p-8 md:px-12 md:py-10 text-white shadow-sm">
        {/* Dekorasi Latar Belakang - Bintang/Sparkles */}
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none overflow-hidden">
          {/* Bintang Atas Kiri */}
          <svg
            className="absolute top-[10%] right-[30%] w-24 h-24 text-white/[0.12]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
          </svg>
          {/* Bintang Besar Kanan Tengah */}
          <svg
            className="absolute top-[35%] -right-[5%] w-48 h-48 text-white/[0.12]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
          </svg>
          {/* Bintang Bawah */}
          <svg
            className="absolute bottom-[5%] right-[15%] w-28 h-28 text-white/[0.12]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 12 24C12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
          </svg>
        </div>

        <div className="relative z-10 max-w-2xl">
          <p className="text-[11px] md:text-[13px] font-semibold tracking-wide text-white/90 uppercase mb-3">
            ONLINE COURSE
          </p>
          <h1 className="text-[26px] md:text-[34px] font-bold mb-8 leading-[1.3] tracking-wide">
            Sharpen Your Skills With
            <br className="hidden md:block" />
            Professional Online Courses
          </h1>
          <button className="bg-[#1c1c1c] text-white pl-5 pr-1.5 py-1.5 rounded-full font-medium text-sm flex items-center gap-3 hover:bg-black transition-colors shadow-lg w-fit">
            Join Now
            <div className="bg-white w-7 h-7 rounded-full flex items-center justify-center">
              {/* Ikon Play custom untuk match dengan gambar */}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-[#1c1c1c] ml-0.5"
              >
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
            </div>
          </button>
        </div>
      </section>

      {/* Kartu Statistik Cepat */}
      <section className="grid grid-cols-1 grid-cols-3 gap-6 mb-10">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 shrink-0">
                <Bell size={20} className="fill-blue-100" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 mb-0.5">
                  2/8 Ditonton
                </p>
                <p className="text-sm font-bold text-slate-800">
                  Desain Produk
                </p>
              </div>
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-2">
              <MoreVertical size={20} />
            </button>
          </div>
        ))}
      </section>

      {/* Lanjutkan Menonton */}
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
          {continueWatching.map((course, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-100 rounded-3xl p-3 flex flex-col shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="relative rounded-2xl overflow-hidden mb-4 aspect-video bg-slate-100">
                <img
                  src={course.thumbnail}
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
                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center gap-3 pt-2 border-t border-slate-50">
                    <img
                      src={course.avatar}
                      alt={course.instructor}
                      className="w-8 h-8 rounded-full object-cover"
                    />
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
    </main>
  );
}
