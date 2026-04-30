"use client";

import { useState } from "react";
import {
  Filter,
  Search,
  ChevronDown,
  Award,
  BookOpen,
  Lock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Certificate } from "@/types";
import Image from "next/image";

export default function RewardCertificateClient({
  initialCertificates,
}: {
  initialCertificates: Certificate[];
}) {
  const [activeTab, setActiveTab] = useState("Sertifikat");
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [isEarnedOnly, setIsEarnedOnly] = useState(false);

  // Filtering logic
  const certificates = initialCertificates.filter((cert) => {
    const matchesFilter =
      activeFilter === "Semua" || cert.category === activeFilter;
    const matchesEarned = !isEarnedOnly || cert.is_earned;
    return matchesFilter && matchesEarned;
  });

  const hasCertificates = certificates.length > 0;

  const categories = [
    { name: "Semua", count: initialCertificates.length },
    {
      name: "Modul",
      count: initialCertificates.filter((c) => c.category === "Modul").length,
    },
    {
      name: "Projects",
      count: initialCertificates.filter((c) => c.category === "Projects")
        .length,
    },
    {
      name: "Track",
      count: initialCertificates.filter((c) => c.category === "Track").length,
    },
    {
      name: "Other",
      count: initialCertificates.filter(
        (c) => !["Modul", "Projects", "Track"].includes(c.category),
      ).length,
    },
  ];

  return (
    <div className="p-4 md:p-8 h-full overflow-y-auto bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Tabs */}
        <div className="flex items-center gap-10 mb-8">
          <button
            onClick={() => setActiveTab("Learning Progress")}
            className={`flex items-center gap-2 pb-2 text-[13px] font-bold transition-all relative ${
              activeTab === "Learning Progress"
                ? "text-primaryTint border-b-2 border-primaryTint"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <BookOpen size={16} />
            Progres Belajar
          </button>
          <button
            onClick={() => setActiveTab("Sertifikat")}
            className={`flex items-center gap-2 pb-2 text-[13px] font-bold transition-all relative ${
              activeTab === "Sertifikat"
                ? "text-primaryTint border-b-2 border-primaryTint"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <div className="w-3 h-3 rounded-full bg-primaryTint"></div>
            Sertifikat
          </button>
        </div>

        {activeTab === "Sertifikat" && (
          <div className="flex flex-col gap-8">
            {/* Filters Row */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
                  <input
                    type="text"
                    placeholder="mm/dd/yyyy"
                    className="w-28 px-3 py-2 text-[12px] text-slate-500 outline-none"
                  />
                  <div className="px-2 text-slate-300">-</div>
                  <input
                    type="text"
                    placeholder="mm/dd/yyyy"
                    className="w-28 px-3 py-2 text-[12px] text-slate-500 outline-none"
                  />
                </div>
                <button className="bg-primaryTint text-white px-5 py-2.5 rounded-lg text-[12px] font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-sm">
                  <Filter size={14} fill="currentColor" /> Apply
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari sertifikat..."
                    className="w-full sm:w-64 border border-slate-200 rounded-[2rem] pl-4 pr-10 py-2.5 text-[12px] focus:outline-none focus:border-primaryTint transition-all bg-white"
                  />
                  <Search
                    size={14}
                    className="absolute right-4 top-3 text-slate-400"
                  />
                </div>

                <button className="bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-[12px] font-bold text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
                  <ChevronDown size={14} /> Sort by Date
                </button>

                {/* Toggle Switch */}
                <div className="flex items-center gap-3 bg-slate-50 rounded-[2rem] px-4 py-1.5 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Didapat</span>
                  <button
                    onClick={() => setIsEarnedOnly(!isEarnedOnly)}
                    className={`w-10 h-5 rounded-full relative transition-all ${isEarnedOnly ? "bg-primaryTint" : "bg-primaryTint"}`}
                  >
                    <div
                      className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.75 transition-all shadow-sm ${isEarnedOnly ? "left-5.5" : "left-1"}`}
                    ></div>
                  </button>
                  <span className="text-[10px] font-bold text-primaryTint uppercase tracking-wider">Semua</span>
                </div>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveFilter(cat.name)}
                  className={`px-5 py-3 rounded-lg text-[13px] font-bold whitespace-nowrap transition-all flex items-center gap-3 border ${
                    activeFilter === cat.name
                      ? "bg-primaryTint text-white border-primaryTint shadow-md"
                      : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {cat.name === "Semua" && <div className="w-3 h-3 rounded-full bg-white"></div>}
                  {cat.name !== "Semua" && <BookOpen size={14} />}
                  {cat.name}
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      activeFilter === cat.name
                        ? "bg-black/20 text-white"
                        : "bg-slate-800 text-white"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Main Content Area */}
            {!hasCertificates ? (
              <div className="mt-8 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-100 p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
                <h3 className="text-sm font-bold text-slate-400">
                  Belum ada sertifikat yang didapat
                </h3>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {certificates.map((cert) => (
                    <div
                      key={cert.id}
                      className="bg-white rounded-xl border border-slate-100 p-6 flex flex-col sm:flex-row gap-6 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
                    >
                      {/* Image Thumbnail */}
                      <div className="w-full sm:w-44 h-32 bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden relative">
                        {cert.thumbnail_url ? (
                          <Image
                            src={cert.thumbnail_url}
                            alt={cert.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <Award size={40} className="text-slate-200" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-black text-slate-800 text-[14px] leading-tight mb-2">
                              {cert.title}
                            </h3>
                            <div className="flex items-center gap-2 text-slate-400">
                              <BookOpen size={12} />
                              <p className="text-[11px] font-bold">
                                Selesaikan modul untuk mendapatkan sertifikat
                              </p>
                            </div>
                          </div>
                          
                          {/* Locked Badge */}
                          <div className="absolute top-4 right-4 bg-slate-500/80 backdrop-blur-sm text-white px-3 py-1 rounded-md flex items-center gap-1.5 shadow-sm">
                             <Lock size={10} />
                             <span className="text-[9px] font-bold uppercase tracking-wider">Belum Didapat</span>
                          </div>
                        </div>

                        <div className="mt-6">
                          <button
                            className="w-full py-2.5 rounded-lg text-[12px] font-black bg-primaryTint text-white hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primaryTint/10 active:scale-95"
                          >
                            <BookOpen size={14} fill="currentColor" />
                            Mulai Belajar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Info & Pagination */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mt-12 pt-8 border-t border-slate-100">
                   <p className="text-[11px] font-bold text-slate-400">
                      Menampilkan 1-6 dari 138 sertifikat
                   </p>
                   
                   <div className="flex items-center gap-2">
                      <button className="p-2.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition-all">
                        <ChevronLeft size={16} />
                      </button>
                      <button className="w-10 h-10 rounded-lg bg-primaryTint text-white font-black text-[12px] shadow-lg shadow-primaryTint/20">1</button>
                      <button className="w-10 h-10 rounded-lg border border-slate-200 text-slate-600 font-bold text-[12px] hover:bg-slate-50">2</button>
                      <button className="w-10 h-10 rounded-lg border border-slate-200 text-slate-600 font-bold text-[12px] hover:bg-slate-50">3</button>
                      <span className="px-2 text-slate-400">...</span>
                      <button className="w-10 h-10 rounded-lg border border-slate-200 text-slate-600 font-bold text-[12px] hover:bg-slate-50">23</button>
                      <button className="p-2.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 transition-all">
                        <ChevronRight size={16} />
                      </button>
                   </div>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === "Learning Progress" && (
          <div className="bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-100 p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
            <h3 className="text-sm font-bold text-slate-400">
              Belum ada progres belajar yang ditampilkan
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}
