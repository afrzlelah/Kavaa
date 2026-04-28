"use client";

import { useState } from "react";
import {
  Filter,
  Search,
  ChevronDown,
  Award,
  BookOpen,
  Clock,
  LayoutGrid,
  CheckCircle2,
} from "lucide-react";
import { Certificate } from "@/types";

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
    <div className="p-4 md:p-8 h-full overflow-y-auto bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Header Tabs */}
        <div className="flex items-center gap-8 border-b border-slate-200 mb-8">
          <button
            onClick={() => setActiveTab("Learning Progress")}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === "Learning Progress"
                ? "text-primary"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <span className="flex items-center gap-2">
              <div
                className={`w-1.5 h-4 rounded-full ${activeTab === "Learning Progress" ? "bg-primary" : "bg-slate-300"}`}
              ></div>
              Learning Progress
            </span>
            {activeTab === "Learning Progress" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("Sertifikat")}
            className={`pb-4 text-sm font-bold transition-all relative ${
              activeTab === "Sertifikat"
                ? "text-primary"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <span className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${activeTab === "Sertifikat" ? "bg-primary" : "bg-slate-300"}`}
              ></div>
              Sertifikat
            </span>
            {activeTab === "Sertifikat" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t-full"></div>
            )}
          </button>
        </div>

        {activeTab === "Sertifikat" && (
          <div className="flex flex-col gap-6">
            {/* Filters Row */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
                  <input
                    type="date"
                    className="bg-transparent text-xs font-bold text-slate-600 focus:outline-none"
                  />
                  <span className="text-slate-300">|</span>
                  <input
                    type="date"
                    className="bg-transparent text-xs font-bold text-slate-600 focus:outline-none"
                  />
                </div>
                <button className="bg-primary text-white px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-primary/20">
                  <Filter size={14} /> Apply
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Cari sertifikat..."
                    className="bg-white border border-slate-200 rounded-xl pl-4 pr-10 py-2.5 text-xs w-full sm:w-64 focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all shadow-sm"
                  />
                  <Search
                    size={14}
                    className="absolute right-3 top-3 text-slate-400 group-focus-within:text-primary transition-colors"
                  />
                </div>

                <button className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-600 flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
                  Sort by Date <ChevronDown size={14} />
                </button>

                {/* Toggle Switch */}
                <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm">
                  <span
                    className={`text-xs font-bold transition-colors ${isEarnedOnly ? "text-primary" : "text-slate-400"}`}
                  >
                    Didapat
                  </span>
                  <button
                    onClick={() => setIsEarnedOnly(!isEarnedOnly)}
                    className={`w-9 h-5 rounded-full relative transition-all ${isEarnedOnly ? "bg-primary" : "bg-slate-200"}`}
                  >
                    <div
                      className={`w-3.5 h-3.5 bg-white rounded-full absolute top-0.75 transition-all shadow-sm ${isEarnedOnly ? "left-5" : "left-0.75"}`}
                    ></div>
                  </button>
                  <span
                    className={`text-xs font-bold transition-colors ${!isEarnedOnly ? "text-slate-600" : "text-slate-400"}`}
                  >
                    Semua
                  </span>
                </div>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveFilter(cat.name)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-2 ${
                    activeFilter === cat.name
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                      : "bg-white text-slate-500 border-slate-200 hover:border-primary/30 hover:text-primary"
                  }`}
                >
                  {cat.name}
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                      activeFilter === cat.name
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Main Content Area */}
            {!hasCertificates ? (
              <div className="mt-8 bg-white rounded-3xl border border-slate-100 p-12 flex flex-col items-center justify-center text-center shadow-sm min-h-[400px]">
                <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-6">
                  <Award size={48} className="text-primary/20" />
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2">
                  Belum ada sertifikat
                </h3>
                <p className="text-sm text-slate-400 max-w-xs mb-8">
                  Selesaikan modul atau track belajar Anda untuk mendapatkan
                  sertifikat resmi dari Kavaa.
                </p>
                <button className="bg-primary text-white px-8 py-3 rounded-2xl text-sm font-bold shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95">
                  Mulai Belajar Sekarang
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-white rounded-3xl border border-slate-100 p-5 flex flex-col sm:flex-row gap-5 shadow-sm hover:shadow-xl transition-all group"
                  >
                    <div className="w-full sm:w-48 h-36 bg-slate-50 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden relative border border-slate-100">
                      {cert.thumbnail_url ? (
                        <img
                          src={cert.thumbnail_url}
                          alt={cert.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <Award size={40} className="text-slate-200" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>

                    <div className="flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="font-black text-slate-800 text-sm leading-tight group-hover:text-primary transition-colors">
                          {cert.title}
                        </h3>
                        {cert.is_earned ? (
                          <div className="bg-emerald-50 text-emerald-600 p-1.5 rounded-lg shrink-0">
                            <CheckCircle2 size={14} />
                          </div>
                        ) : (
                          <div className="bg-slate-100 text-slate-400 p-1.5 rounded-lg shrink-0">
                            <Clock size={14} />
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          {cert.provider || "Kavaa Academy"}
                        </p>
                      </div>

                      <div className="flex-1 flex flex-col justify-end">
                        <div className="p-3 bg-slate-50 rounded-xl mb-4 border border-slate-100">
                          <p className="text-[11px] text-slate-500 font-medium leading-relaxed italic">
                            "
                            {cert.is_earned
                              ? "Sertifikat ini membuktikan keahlian Anda dalam bidang ini."
                              : "Selesaikan 12 modul lagi untuk mendapatkan sertifikat ini."}
                            "
                          </p>
                        </div>

                        <button
                          className={`w-full py-3 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                            cert.is_earned
                              ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700"
                              : "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-blue-700"
                          } active:scale-95`}
                        >
                          {cert.is_earned
                            ? "Download Certificate"
                            : "Continue Learning"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
