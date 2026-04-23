import React from "react";
import { Star, ChevronRight, Award } from "lucide-react";
import Image from "next/image";

export default function CTA() {
  return (
    <section
      id="cta"
      className="py-16 md:py-24 bg-slate-900 relative overflow-hidden"
    >
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-b from-indigo-500/20 to-purple-500/10 blur-3xl"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-t from-primaryTint/20 to-blue-500/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        <div className="lg:col-span-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 text-xs md:text-sm font-bold text-white mb-6">
            <Star size={16} className="fill-primaryTint" /> Khusus Pakar
            Industri
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight text-white">
            Jadilah Arsitek <br className="hidden lg:block" /> Pengetahuan{" "}
            <br className="hidden lg:block" /> dengan Kavaa
          </h2>

          <p className="text-base md:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 mb-8 md:mb-10 leading-relaxed font-medium">
            Bagikan keahlian unik Anda dan pandu generasi berikutnya dalam
            perjalanan evolusi mereka. Kavaa menyediakan platform kelas dunia
            untuk Anda mengajar dan menghasilkan pendapatan.
          </p>

          <button
            aria-label="Mulai Mengajar Hari Ini"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primaryTint hover:bg-primaryTint/80 text-white font-black text-base flex items-center justify-center gap-3 transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:-translate-y-1 mx-auto lg:mx-0"
          >
            Mulai Mengajar Hari Ini <ChevronRight size={20} strokeWidth={3} />
          </button>
        </div>

        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md aspect-square md:aspect-[4/3] rounded-[2rem] overflow-hidden border-4 border-slate-800 shadow-2xl">
            <Image
              width={250}
              height={250}
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Seorang ahli sedang mengajar dan berbagi pengetahuan"
              className="w-full h-full object-cover opacity-90"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>

            <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primaryTint text-white flex items-center justify-center shrink-0">
                <Award size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm md:text-base">
                  Kavaa Growth Fund
                </h3>
                <p className="text-xs md:text-sm text-slate-300 font-medium">
                  Tingkatkan jangkauan & pendapatan Anda
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
