"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import SidebarKiri from "@/components/layouts/dashboard/SidebarKiri";
import SidebarKanan from "@/components/layouts/dashboard/SidebarKanan";
import DashboardPage from "@/components/layouts/dashboard/DashboardPage";

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  return (
    <div className="flex h-screen w-full bg-slate-50/50 font-sans text-slate-900 overflow-hidden">
      {/* TAMPILAN MOBILE: Header & Toggle Menu */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-white border-b border-slate-100 p-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
          </div>
          <span className="text-xl font-black text-blue-600 tracking-tight">
            KAVA
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-slate-600"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar kiri pak */}
      <SidebarKiri
        isMobileMenuOpen={isMobileMenuOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {/* Overlay untuk Mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* KOLOM TENGAH: Konten Utama */}
      {activeTab === "Dashboard" && <DashboardPage />}
      {activeTab === "Kotak Masuk" && <h1>Inbox</h1>}
      {activeTab === "Pembelajaran" && <h1>Pembelajaran</h1>}
      {activeTab === "Grup" && <h1>Grup</h1>}
      {activeTab === "Tugas" && <h1>Tugas</h1>}
      {/* Sidebar kanan */}
      <SidebarKanan />
    </div>
  );
}
