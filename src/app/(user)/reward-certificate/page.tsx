"use client";

import { useState } from "react";
import { Filter, Search, ChevronDown, Lock } from "lucide-react";

export default function RewardCertificatePage() {
  const [activeTab, setActiveTab] = useState("Sertifikat");
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [isEarnedOnly, setIsEarnedOnly] = useState(false);

  // Mock data for certificates based on Figma screenshot
  const certificates = [
    { id: 1, title: "WEBSITE STORE", provider: "Python AI at DQLab" },
    { id: 2, title: "Fundamental SQL Group By and Having", provider: "SQL Group By and Having" },
    { id: 3, title: "Project Machine Learning For Retail RFM Analysis", provider: "Machine Learning RFM" },
    { id: 4, title: "Statistics using R for Data Science", provider: "Statistics using R" },
    { id: 5, title: "Penerapan SQL dalam Data Analysis pada Industri Retail: Beginner to Intermediate", provider: "SQL Data Analysis Retail" },
    { id: 6, title: "Case Data Analyst with Excel", provider: "Data Analyst with Excel" },
  ];

  const hasCertificates = true; // Set to true to show the grid, false to show empty state

  return (
    <div className="p-8 h-full overflow-y-auto">
      {/* Header Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-200 mb-6">
        <button
          onClick={() => setActiveTab("Learning Progress")}
          className={`pb-4 text-sm font-semibold transition-colors ${
            activeTab === "Learning Progress"
              ? "text-primaryTint border-b-2 border-primaryTint"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
          <span className="flex items-center gap-2">
            <div className={`w-2 h-4 rounded-sm ${activeTab === "Learning Progress" ? "bg-primaryTint" : "bg-slate-300"}`}></div>
            Learning Progress
          </span>
        </button>
        <button
          onClick={() => setActiveTab("Sertifikat")}
          className={`pb-4 text-sm font-semibold transition-colors ${
            activeTab === "Sertifikat"
              ? "text-primaryTint border-b-2 border-primaryTint"
              : "text-slate-400 hover:text-slate-600"
          }`}
        >
           <span className="flex items-center gap-2">
             <div className={`w-3 h-3 rounded-full ${activeTab === "Sertifikat" ? "bg-primaryTint" : "bg-slate-300"}`}></div>
             Sertifikat
           </span>
        </button>
      </div>

      {activeTab === "Sertifikat" && (
        <div className="flex flex-col gap-6">
          {/* Controls Row 1 */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <input type="date" className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-500 focus:outline-none focus:border-primaryTint" />
              <span className="text-slate-400">-</span>
              <input type="date" className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-500 focus:outline-none focus:border-primaryTint" />
              <button className="bg-primaryTint text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-blue-700 transition-colors">
                <Filter size={16} /> Apply
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari sertifikat..."
                  className="border border-slate-200 rounded-full pl-4 pr-10 py-2 text-sm w-64 focus:outline-none focus:border-primaryTint"
                />
                <Search size={16} className="absolute right-3 top-2.5 text-slate-400" />
              </div>
              <button className="border border-slate-200 rounded-full px-4 py-2 text-sm font-medium text-slate-600 flex items-center gap-2 hover:bg-slate-50">
                Sort by Date <ChevronDown size={16} />
              </button>
              
              {/* Toggle Switch */}
              <div className="flex items-center gap-3 border border-slate-200 rounded-full px-4 py-1.5">
                <span className={`text-sm font-medium ${isEarnedOnly ? "text-primaryTint" : "text-slate-400"}`}>Didapat</span>
                <button 
                  onClick={() => setIsEarnedOnly(!isEarnedOnly)}
                  className={`w-10 h-5 rounded-full relative transition-colors ${isEarnedOnly ? "bg-primaryTint" : "bg-slate-300"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${isEarnedOnly ? "left-5" : "left-1"}`}></div>
                </button>
                <span className={`text-sm font-medium ${!isEarnedOnly ? "text-slate-600" : "text-slate-400"}`}>Semua</span>
              </div>
            </div>
          </div>

          {/* Controls Row 2 (Pills) */}
          <div className="flex flex-wrap items-center gap-3">
            {[
              { id: "Semua", label: "Semua", count: 0 },
              { id: "Modul", label: "Modul", count: 0 },
              { id: "Projects", label: "Projects", count: 0 },
              { id: "Track", label: "Track", count: 0 },
              { id: "Other", label: "Other", count: 0 },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
                  activeFilter === filter.id
                    ? "bg-primaryTint text-white border-primaryTint"
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                }`}
              >
                {filter.id === "Semua" ? (
                  <div className={`w-2 h-2 rounded-full ${activeFilter === filter.id ? "bg-white" : "bg-slate-400"}`}></div>
                ) : (
                  <div className={`w-3 h-4 rounded-sm ${activeFilter === filter.id ? "bg-white" : "bg-slate-400"}`}></div>
                )}
                {filter.label}
                {filter.id === "Semua" && (
                  <span className={`px-2 py-0.5 rounded-full text-xs ${activeFilter === filter.id ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                    {filter.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          {!hasCertificates ? (
            <div className="mt-4 bg-white rounded-2xl border border-slate-100 h-96 flex items-center justify-center">
              <span className="text-slate-400 font-medium">Belum ada sertifikat yang didapat</span>
            </div>
          ) : (
            <div className="mt-4">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {certificates.map((cert) => (
                  <div key={cert.id} className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col sm:flex-row gap-4 shadow-sm hover:shadow-md transition-shadow">
                    {/* Placeholder Image */}
                    <div className="w-full sm:w-48 h-32 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-slate-400 font-medium text-center px-4">{cert.provider}</span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-slate-800 text-sm leading-tight max-w-[70%]">{cert.title}</h3>
                        <div className="flex items-center gap-1 bg-slate-500 text-white px-2 py-1 rounded text-[10px] font-bold shrink-0">
                          <Lock size={10} /> Belum Didapat
                        </div>
                      </div>
                      
                      <div className="mt-2 flex items-start gap-2">
                        <div className="w-3 h-4 bg-slate-200 rounded-sm mt-0.5"></div>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">
                          Selesaikan modul untuk mendapatkan sertifikat
                        </p>
                      </div>
                      
                      <button className="mt-4 w-full bg-primaryTint text-white py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
                        <Lock size={14} /> Mulai Belajar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination (Static for now) */}
              <div className="mt-8 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">Menampilkan 1-6 dari 138 sertifikat</span>
                <div className="flex items-center gap-1">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">&lt;</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primaryTint text-white font-medium">1</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">2</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">3</button>
                  <span className="text-slate-400 px-1">...</span>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">23</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">&gt;</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
