"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Inbox,
  BookOpen,
  ClipboardList,
  Users,
  Settings,
  LogOut,
  Search,
  Filter,
  MoreVertical,
  Heart,
  ChevronLeft,
  ChevronRight,
  Bell,
  MessageSquare,
  Mail,
  Plus,
  Menu,
  X,
} from "lucide-react";

// --- DATA TIRUAN (MOCK DATA) ---

const menuItems = [
  { icon: LayoutDashboard, label: "Dasbor", active: true },
  { icon: Inbox, label: "Kotak Masuk" },
  { icon: BookOpen, label: "Pembelajaran" },
  { icon: ClipboardList, label: "Tugas" },
  { icon: Users, label: "Grup" },
  { icon: Users, label: "Grup" }, // Sesuai dengan gambar yang memiliki dua item Grup
];

const friends = [
  {
    name: "Afrizal",
    role: "Pengembang Perangkat Lunak",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&q=80",
  },
  {
    name: "Nia",
    role: "Pengembang Perangkat Lunak",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80",
  },
];

const continueWatching = [
  {
    tag: "FRONTEND",
    title: "Panduan Pemula Menjadi Developer Frontend Profesional",
    instructor: "Prashant Kumar Singh",
    role: "Pengembang Perangkat Lunak",
    progress: 75,
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&q=80",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
  },
  {
    tag: "FRONTEND",
    title: "Panduan Pemula Menjadi Developer Frontend Profesional",
    instructor: "Prashant Kumar Singh",
    role: "Pengembang Perangkat Lunak",
    progress: 40,
    thumbnail:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop&q=80",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
  },
  {
    tag: "FRONTEND",
    title: "Panduan Pemula Menjadi Developer Frontend Profesional",
    instructor: "Prashant Kumar Singh",
    role: "Pengembang Perangkat Lunak",
    progress: 10,
    thumbnail:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&q=80",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
  },
];

const mentorTable = [
  {
    instructor: "Prashant Kumar Singh",
    date: "25/2/2023",
    type: "FRONTEND",
    title: "Memahami Konsep React",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
  },
  {
    instructor: "Ravi Kumar",
    date: "25/2/2023",
    type: "FRONTEND",
    title: "Memahami Konsep React",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80",
  },
];

const yourMentorsList = Array(5).fill({
  name: "Prashant Kumar Singh",
  role: "Pengembang Perangkat Lunak",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
});

export default function Dashboard() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <aside
        className={`${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:static top-0 left-0 h-full w-64 bg-white border-r border-slate-100 flex flex-col transition-transform duration-300 z-40`}
      >
        {/* Logo bjir anjir*/}
        <div className="p-8 hidden lg:flex items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="grid grid-cols-2 gap-0.5">
              <div className="w-3 h-3 bg-blue-600 rounded-tl-sm rounded-bl-sm"></div>
              <div className="w-3 h-3 bg-blue-500 rounded-tr-sm rounded-br-sm"></div>
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-black text-blue-600 tracking-tight">
              KAVA
            </span>
            <span className="text-[8px] text-blue-400 font-bold uppercase">
              Where Learning Meets Evolution
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto mt-16 lg:mt-0">
          {/* Bagian Gambaran Umum(masa depanku ketok mugo) */}
          <div className="px-6 mb-8">
            <h3 className="text-xs font-bold text-slate-400 mb-4 tracking-wider uppercase">
              Gambaran Umum
            </h3>
            <nav className="flex flex-col gap-1">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    item.active
                      ? "text-blue-600 bg-blue-50/50"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <item.icon
                    size={20}
                    className={item.active ? "text-blue-600" : "text-slate-400"}
                  />
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Bagian Teman */}
          <div className="px-6 mb-8">
            <h3 className="text-xs font-bold text-slate-400 mb-4 tracking-wider uppercase">
              Teman
            </h3>
            <div className="flex flex-col gap-4">
              {friends.map((friend, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-100 transition-all"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-800">
                      {friend.name}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">
                      {friend.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bagian Pengaturan & Keluar */}
        <div className="px-6 py-8 border-t border-slate-50">
          <h3 className="text-xs font-bold text-slate-400 mb-4 tracking-wider uppercase">
            Pengaturan
          </h3>
          <nav className="flex flex-col gap-1">
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Settings size={20} className="text-slate-400" /> Pengaturan
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-colors mt-2"
            >
              <LogOut size={20} className="text-red-500" /> Keluar
            </a>
          </nav>
        </div>
      </aside>

      {/* Overlay untuk Mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* KOLOM TENGAH: Konten Utama */}
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
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
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

        {/* Tabel Mentor Anda */}
        <section className="mb-8 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Mentor Anda</h2>
            <button className="text-sm font-bold text-blue-600 hover:text-blue-800">
              Lihat Semua
            </button>
          </div>

          <div className="bg-white border border-slate-100 rounded-3xl overflow-x-auto shadow-sm">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    NAMA INSTRUKTUR & TANGGAL
                  </th>
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    JENIS KURSUS
                  </th>
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    JUDUL KURSUS
                  </th>
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">
                    AKSI
                  </th>
                </tr>
              </thead>
              <tbody>
                {mentorTable.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors last:border-0"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={row.avatar}
                          alt={row.instructor}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-800">
                            {row.instructor}
                          </span>
                          <span className="text-[10px] font-medium text-slate-400">
                            {row.date}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                        {row.type}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm font-semibold text-slate-700">
                      {row.title}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <button className="text-[10px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors uppercase tracking-wide">
                        Lihat Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* KOLOM KANAN: Panel Profil (Tersembunyi di tablet/mobile jika tidak ada ruang) */}
      <aside className="hidden xl:flex w-80 flex-col bg-white border-l border-slate-100 h-full overflow-y-auto px-6 py-8 z-20">
        {/* Header Profil */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-bold text-slate-900">Profil Anda</h2>
          <button className="text-slate-400 hover:text-slate-600">
            <MoreVertical size={20} />
          </button>
        </div>

        {/* Info Profil */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-28 h-28 mb-4">
            {/* Lingkaran Progress Semu menggunakan Tailwind */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 via-blue-400 to-slate-100 p-1">
              <div className="w-full h-full bg-white rounded-full p-1">
                <img
                  src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop&q=80"
                  alt="Profil"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            {/* Titik indikator kecil di atas */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-600 border-2 border-white rounded-full"></div>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            Selamat Pagi APIIP
          </h3>
          <p className="text-[11px] font-medium text-slate-400 text-center px-4 leading-relaxed">
            Lanjutkan Perjalanan Anda Dan Capai Target Anda
          </p>
        </div>

        {/* Tombol Aksi Cepat */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
            <Bell size={18} />
          </button>
          <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
            <MessageSquare size={18} />
          </button>
          <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
            <Mail size={18} />
          </button>
        </div>

        {/* Grafik Aktivitas (Ilustrasi) */}
        <div className="flex items-end justify-between h-24 mb-10 px-2">
          {/* Batang Grafik Tiruan */}
          <div className="w-8 h-[40%] bg-blue-100 flex flex-col justify-end rounded-t-sm">
            <div className="w-full h-1/2 bg-blue-500 rounded-t-sm"></div>
          </div>
          <div className="w-8 h-[60%] bg-blue-100 flex flex-col justify-end rounded-t-sm">
            <div className="w-full h-2/3 bg-blue-500 rounded-t-sm"></div>
          </div>
          <div className="w-8 h-[80%] bg-blue-100 flex flex-col justify-end rounded-t-sm">
            <div className="w-full h-1/2 bg-blue-500 rounded-t-sm"></div>
          </div>
          <div className="w-8 h-[100%] bg-blue-100 flex flex-col justify-end rounded-t-sm">
            <div className="w-full h-3/4 bg-blue-500 rounded-t-sm"></div>
          </div>
          <div className="w-8 h-[70%] bg-blue-100 flex flex-col justify-end rounded-t-sm">
            <div className="w-full h-1/2 bg-blue-500 rounded-t-sm"></div>
          </div>
        </div>

        {/* Daftar Mentor Anda di Kanan */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold text-slate-900">Mentor Anda</h2>
            <button className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50">
              <Plus size={14} />
            </button>
          </div>

          <div className="flex flex-col gap-5 flex-1">
            {yourMentorsList.map((mentor, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-bold text-slate-800">
                      {mentor.name}
                    </span>
                    <span className="text-[9px] font-medium text-slate-400">
                      {mentor.role}
                    </span>
                  </div>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold px-4 py-1.5 rounded-full transition-colors">
                  Ikuti
                </button>
              </div>
            ))}
          </div>

          <button className="w-full mt-6 py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-bold rounded-xl transition-colors">
            Lihat Semua
          </button>
        </div>
      </aside>
    </div>
  );
}
