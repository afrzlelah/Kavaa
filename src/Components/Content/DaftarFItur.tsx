import React from "react";
import { Globe, Award } from "lucide-react";

const stats = [
  {
    icon: Globe,
    value: "316,000+",
    label: "Instruktur Berkualifikasi",
    desc: "Mentor berpengalaman lintas industri global.",
  },
  {
    icon: Globe,
    value: "1.8 Miliar+",
    label: "Pendaftaran Kursus",
    desc: "Perjalanan belajar dari komunitas seluruh dunia.",
  },
  {
    icon: Globe,
    value: "41,000+",
    label: "Kursus Berbagai Bahasa",
    desc: "Pilihan kelas multibahasa dan sertifikasi resmi.",
  },
  {
    icon: Award,
    value: "179,000+",
    label: "Video Pembelajaran",
    desc: "Materi video mendalam, praktis, dan interaktif.",
  },
];

export default function DaftarFitur() {
  return (
    <section
      id="stats"
      className="py-16 md:py-24 bg-white relative border-t border-slate-100"
    >
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <article
              key={idx}
              className="bg-slate-50 hover:bg-white p-8 rounded-3xl border border-slate-100 hover:border-indigo-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group cursor-default"
            >
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <stat.icon size={32} strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-2 text-slate-900 tracking-tight">
                {stat.value}
              </h2>
              <h3 className="text-sm md:text-base font-bold text-indigo-600 mb-2">
                {stat.label}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                {stat.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
