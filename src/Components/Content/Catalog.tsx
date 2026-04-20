"use client";

import React, { useState } from "react";
import { Globe, Award, Star } from "lucide-react";

const courses = [
  {
    iconBg: "bg-blue-100 text-blue-600",
    icon: Globe,
    rating: 4.9,
    englishTitle: "AI FUNDAMENTALS",
    participants: "12.4k peserta",
    levelDuration: ["Pemula", "4 Minggu"],
    indonesianTitle: "Kuasai Dasar AI untuk Masa Depan",
    description:
      "Bangun pemahaman praktis tentang machine learning, prompt strategy, dan penerapan AI untuk keputusan...",
    instructor: "Dr. Sarah Chen",
    progress: 28,
    price: "Free",
  },
  {
    iconBg: "bg-green-100 text-green-600",
    icon: Globe,
    rating: 4.8,
    englishTitle: "SUSTAINABLE DESIGN",
    participants: "8.2k peserta",
    levelDuration: ["Menengah", "6 Minggu"],
    indonesianTitle: "Desain Berkelanjutan untuk Produk Nyata",
    description:
      "Pelajari riset material, siklus hidup produk, dan prinsip desain yang mengurangi dampak tanpa...",
    instructor: "Budi Santoso, M.Arch",
    progress: 44,
    price: "$49.00",
  },
  {
    iconBg: "bg-purple-100 text-purple-600",
    icon: Award,
    rating: 4.7,
    englishTitle: "QUANTUM COMPUTING",
    participants: "24.1k peserta",
    levelDuration: ["Pemula", "2 Minggu"],
    indonesianTitle: "Pengantar Quantum Computing Terapan",
    description:
      "Pahami qubit, superposisi, algoritma dasar, dan bagaimana teknologi kuantum mengubah komputasi ma...",
    instructor: "Prof. Nadia Wibowo",
    progress: 62,
    price: "$79.00",
  },
  {
    iconBg: "bg-indigo-100 text-indigo-600",
    icon: Award,
    rating: 4.9,
    englishTitle: "DIGITAL PRODUCT MANAGEMENT",
    participants: "15.3k peserta",
    levelDuration: ["Lanjutan", "8 Minggu"],
    indonesianTitle: "Strategi Produk Digital dari Nol ke Skala",
    description:
      "Susun roadmap, validasi pasar, metrik produk, dan proses kolaborasi lintas tim untuk meluncurkan prod...",
    instructor: "Elena Rodriguez",
    progress: 30,
    price: "$69.00",
  },
];

export default function Catalog() {
  const [activeTab, setActiveTab] = useState("Development");
  const tabs = [
    "Development",
    "Design",
    "Business",
    "Marketing",
    "IT & Software",
    "Personal Development",
  ];

  return (
    <section
      id="catalog"
      className="py-16 md:py-24 bg-slate-50 border-t border-slate-100 relative"
    >
      <div className="container mx-auto px-4 md:px-12">
        <header className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-900 tracking-tight">
            Kuasai Keahlian <br className="md:hidden" /> Paling Diminati
          </h2>
          <p className="text-base md:text-lg text-slate-600 font-medium">
            Pilih dari katalog kursus terkurasi yang dirancang oleh pakar
            industri untuk mengakselerasi pertumbuhan karier Anda.
          </p>
        </header>

        <nav
          className="flex items-center md:justify-center gap-2 mb-10 overflow-x-auto pb-4 scrollbar-hide snap-x"
          aria-label="Kategori Kursus"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`snap-start shrink-0 text-sm md:text-base font-bold px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === tab
                  ? "bg-indigo-600 text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.39)]"
                  : "bg-white text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {courses.map((course, idx) => (
            <article
              key={idx}
              className="bg-white border border-slate-200 p-5 md:p-6 rounded-3xl shadow-sm hover:shadow-2xl hover:border-indigo-200 transition-all duration-300 flex flex-col group cursor-pointer"
            >
              <div
                className={`${course.iconBg} rounded-2xl h-40 flex items-center justify-center mb-6 relative overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
                <course.icon
                  size={56}
                  className="relative z-10 group-hover:scale-110 transition-transform duration-500"
                  strokeWidth={1.5}
                />
                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-xs font-bold text-slate-800 flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-sm z-10">
                  <Star size={14} className="text-yellow-500 fill-yellow-500" />{" "}
                  {course.rating}
                </span>
              </div>

              <div className="flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <p className="text-xs font-bold text-indigo-600 tracking-wider uppercase">
                    {course.englishTitle}
                  </p>
                </div>

                <h3 className="text-lg md:text-xl font-black mb-3 text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug line-clamp-2">
                  {course.indonesianTitle}
                </h3>

                <p className="text-sm text-slate-500 leading-relaxed mb-6 line-clamp-2 flex-grow font-medium">
                  {course.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 mb-6 bg-slate-50 p-1.5 rounded-xl w-fit border border-slate-100">
                  <span className="bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-100">
                    {course.levelDuration[0]}
                  </span>
                  <span className="px-2">{course.levelDuration[1]}</span>
                </div>
              </div>

              <footer className="border-t border-slate-100 pt-5 mt-auto">
                <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 mb-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">
                    {course.instructor.charAt(0)}
                  </div>
                  <span>{course.instructor}</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span
                    className={`text-xl font-black ${course.price === "Free" ? "text-green-500" : "text-slate-900"}`}
                  >
                    {course.price === "Free" ? "Gratis" : course.price}
                  </span>
                  {course.price === "Free" ? (
                    <button
                      aria-label={`Daftar ${course.indonesianTitle} gratis`}
                      className="text-sm font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-4 py-2 rounded-lg transition-colors"
                    >
                      Daftar
                    </button>
                  ) : (
                    <button
                      aria-label={`Beli ${course.indonesianTitle}`}
                      className="bg-slate-900 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-xl transition-all"
                    >
                      Beli Kelas
                    </button>
                  )}
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
