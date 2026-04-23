import React from "react";
import { ChevronRight, CheckCircle, Award } from "lucide-react";

export default function Content1() {
  return (
    <section
      id="hero"
      className="relative pt-16 pb-16 md:pt-28 md:pb-32 overflow-hidden"
    >
      {/* Background Gradients (SEO: Empty divs for decoration) */}
      <div
        className="absolute inset-0 bg-linear-to-br from-indigo-50/80 via-white to-purple-50/50 -z-10"
        aria-hidden="true"
      ></div>
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      ></div>

      <div className="container mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Text Content */}
        <div className="lg:col-span-6 relative z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primaryTint shadow-sm text-xs md:text-sm font-semibold text-primaryTint mb-6 md:mb-8">
            <span className="w-2 h-2 rounded-full bg-primaryTint animate-pulse"></span>{" "}
            Masa Depan Pembelajaran
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] text-slate-900">
            Kembangkan Keahlian, <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primaryTint to-primaryTint/60">
              Evolusi Karier Anda
            </span>
          </h1>

          <p className="text-base md:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 mb-8 md:mb-10 leading-relaxed">
            Temukan jalur belajar yang dipersonalisasi dari ribuan kursus,
            sertifikasi global, dan program dari institusi ternama untuk
            mencapai potensi penuh Anda.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
            <button
              aria-label="Mulai Belajar Sekarang"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primaryTint hover:bg-primaryTint/90 text-white font-bold flex items-center justify-center gap-2 shadow-[0_8px_20px_-6px_rgba(79,70,229,0.5)] hover:-translate-y-1 transition-transform duration-300"
            >
              Mulai Belajar Sekarang <ChevronRight size={20} />
            </button>
            <button
              aria-label="Lihat Cara Kerja"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <CheckCircle size={20} className="text-primaryTint" /> Cara Kerja
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 md:gap-6 text-slate-600 text-sm font-medium">
            <span className="flex items-center gap-2">
              <CheckCircle size={18} className="text-primaryTint" /> Jalur
              personal
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle size={18} className="text-primaryTint" /> Mentor
              global
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle size={18} className="text-primaryTint" /> Sertifikasi
              resmi
            </span>
          </div>
        </div>

        {/* Visual Content */}
        <div className="lg:col-span-6 relative mt-10 lg:mt-0 w-full max-w-2xl mx-auto">
          <div className="relative rounded-[2rem] overflow-hidden border-8 border-white shadow-[0_20px_50px_-15px_rgba(79,70,229,0.2)] bg-slate-100 aspect-square md:aspect-[4/3] lg:aspect-square">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Tim profesional sedang berkolaborasi di kantor"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>

          {/* Floating Elements */}
          <div className="hidden md:flex absolute top-10 -right-8 bg-white/90 border border-slate-100 p-4 rounded-2xl shadow-xl items-center gap-4 backdrop-blur-md animate-bounce-slow">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-primaryTint">
              <Award size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">
                Target Mingguan
              </h3>
              <p className="text-xs font-medium text-slate-500">
                3 dari 4 kelas selesai
              </p>
            </div>
          </div>

          <div className="hidden md:flex absolute -bottom-6 left-10 bg-white border border-slate-100 p-5 rounded-2xl shadow-xl items-center gap-4 w-72 backdrop-blur-md">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <CheckCircle size={24} />
            </div>
            <div className="flex-grow">
              <p className="text-xs font-bold text-slate-500 mb-2">
                Evolusi Keahlian AI
              </p>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="w-[78%] h-full bg-gradient-to-r from-primaryTint to-purple-500 rounded-full"></div>
              </div>
            </div>
            <span className="text-sm font-black text-slate-800">78%</span>
          </div>
        </div>
      </div>
    </section>
  );
}
