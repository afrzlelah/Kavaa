"use client";

import { Plus, ChevronDown } from "lucide-react";

export default function PostProjectPage() {
  return (
    <div className="p-8 h-full overflow-y-auto max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Post a Project</h1>
        <button className="bg-primaryTint text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-sm">
          <Plus size={18} /> Post New Project
        </button>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-6">Detail Post Project</h2>
        
        <div className="flex flex-col gap-6">
          
          {/* Row 1: Judul, Platform, Kategori */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-800">Judul Project</label>
              <input 
                type="text" 
                defaultValue="E-Commerce Mobile App"
                className="border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primaryTint w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-800">Platform</label>
              <div className="relative">
                <select className="border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primaryTint w-full appearance-none bg-slate-50 text-slate-800">
                  <option value="" disabled selected>Pilih Platform</option>
                  <option value="Mobile">Mobile (Android/iOS)</option>
                  <option value="Web">Web Application</option>
                  <option value="Desktop">Desktop Application</option>
                  <option value="Cross-Platform">Cross-Platform</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-3 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-800">Kategori</label>
              <div className="relative">
                <select className="border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primaryTint w-full appearance-none bg-slate-50 text-slate-800">
                  <option value="" disabled selected>Pilih Kategori</option>
                  <option value="E-Commerce">E-Commerce</option>
                  <option value="Education">Education</option>
                  <option value="Health">Health / Fitness</option>
                  <option value="Finance">Finance</option>
                  <option value="Social Media">Social Media</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-3 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 2: Deskripsi, Tujuan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-800">Deskripsi Singkat</label>
              <textarea 
                className="border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primaryTint w-full h-32 resize-none"
              ></textarea>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-800">Tujuan Project</label>
              <textarea 
                className="border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primaryTint w-full h-32 resize-none"
              ></textarea>
            </div>
          </div>

          {/* Row 3: Teknologi Utama */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-800">Teknologi Utama</label>
            <div className="relative">
              <select className="border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primaryTint w-full appearance-none bg-slate-50 text-slate-800">
                <option value="" disabled selected>Pilih Teknologi Utama</option>
                <option value="ReactJS">ReactJS / Next.js</option>
                <option value="VueJS">VueJS / Nuxt</option>
                <option value="Flutter">Flutter</option>
                <option value="NodeJS">Node.js / Express</option>
                <option value="Python">Python / Django</option>
                <option value="Figma">Figma / UI Design</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-3 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Row 4: Kebutuhan Tim */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-slate-800">Kebutuhan Tim</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Role 1 */}
              <div className="border border-slate-200 rounded-xl p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primaryTint border-slate-300 focus:ring-primaryTint accent-primaryTint" />
                    <span className="text-xs font-bold text-slate-800">1x UI/UX DESIGNER</span>
                  </label>
                  <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded">Need</span>
                </div>
                <div className="relative">
                  <select className="border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primaryTint w-full appearance-none bg-slate-50 text-slate-800">
                    <option value="Junior">Junior Level</option>
                    <option value="Mid">Mid Level</option>
                    <option value="Senior">Senior Level</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Role 2 */}
              <div className="border border-slate-200 rounded-xl p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primaryTint border-slate-300 focus:ring-primaryTint accent-primaryTint" />
                    <span className="text-xs font-bold text-slate-800">1x FRONTEND DEV</span>
                  </label>
                  <span className="bg-red-50 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded">Need</span>
                </div>
                <div className="relative">
                  <select className="border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primaryTint w-full appearance-none bg-slate-50 text-slate-800">
                    <option value="Junior">Junior Level</option>
                    <option value="Mid">Mid Level</option>
                    <option value="Senior">Senior Level</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Role 3 */}
              <div className="border border-slate-200 rounded-xl p-4 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-primaryTint border-slate-300 focus:ring-primaryTint accent-primaryTint" />
                    <span className="text-xs font-bold text-slate-800">1x BACKEND DEV</span>
                  </label>
                  <span className="bg-red-50 text-red-500 text-[10px] font-bold px-2 py-0.5 rounded">Need</span>
                </div>
                <div className="relative">
                  <select className="border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primaryTint w-full appearance-none bg-slate-50 text-slate-800">
                    <option value="Junior">Junior Level</option>
                    <option value="Mid">Mid Level</option>
                    <option value="Senior">Senior Level</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-2.5 text-slate-400 pointer-events-none" />
                </div>
              </div>

            </div>
          </div>

          {/* Row 5: Estimasi Waktu */}
          <div className="flex flex-col gap-2 mt-2">
            <label className="text-sm font-bold text-slate-800">Estimasi Waktu</label>
            <div className="relative">
              <select className="border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primaryTint w-full appearance-none bg-slate-50 text-slate-800">
                <option value="" disabled selected>Pilih Estimasi Waktu</option>
                <option value="< 1 Bulan">Kurang dari 1 Bulan</option>
                <option value="1-3 Bulan">1 - 3 Bulan</option>
                <option value="3-6 Bulan">3 - 6 Bulan</option>
                <option value="> 6 Bulan">Lebih dari 6 Bulan</option>
              </select>
              <ChevronDown size={16} className="absolute right-4 top-3 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Submit Button */}
          <button className="w-full bg-[#4170B8] text-white py-3.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors mt-4 shadow-sm">
            Publish Post Project
          </button>

        </div>
      </div>
    </div>
  );
}
