"use client";

import { ChevronDown, Ban } from "lucide-react";
import Link from "next/link";

export default function TeamFinder() {
  const projects = [
    {
      title: "EcoTrack App",
      platform: "Mobile",
      seeking: "UI/UX, Backend",
      rolesFilled: 1,
      totalRoles: 3,
      filledRoles: [
        { initials: "AW", name: "Alice", role: "Designer" },
        { initials: "BK", name: "Bob", role: "Frontend" },
      ],
      emptySlot: "Backend",
    },
    {
      title: "Travel Planner Web",
      platform: "Desktop",
      seeking: "Frontend",
      rolesFilled: 2,
      totalRoles: 3,
      filledRoles: [
        { initials: "AW", name: "Alice", role: "Designer" },
        { initials: "BK", name: "Bob", role: "Frontend" },
      ],
      emptySlot: "Backend",
    },
    {
      title: "Minimarket Web",
      platform: "Desktop",
      seeking: "UI/UX, Backend",
      rolesFilled: 1,
      totalRoles: 3,
      filledRoles: [
        { initials: "AW", name: "Alice", role: "Designer" },
        { initials: "BK", name: "Bob", role: "Frontend" },
      ],
      emptySlot: "Backend",
    },
    {
      title: "Coffeshop App",
      platform: "Mobile",
      seeking: "UI/UX, Backend",
      rolesFilled: 1,
      totalRoles: 3,
      filledRoles: [
        { initials: "AW", name: "Alice", role: "Designer" },
        { initials: "BK", name: "Bob", role: "Frontend" },
      ],
      emptySlot: "Backend",
    },
  ];

  const participants = [
    { initials: "DP", name: "Dian P.", role: "UI/UX Designer", skills: "Adobe XD, Proto.io" },
    { initials: "ER", name: "Eko R.", role: "Backend Dev", skills: "Python, Django, SQL" },
    { initials: "DP", name: "Dian P.", role: "UI/UX Designer", skills: "Adobe XD, Proto.io" },
    { initials: "ER", name: "Eko R.", role: "Backend Dev", skills: "Python, Django, SQL" },
  ];

  return (
    <div className="flex gap-6 flex-col xl:flex-row">
      {/* Left Column: Project Postings */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-800">Daftar Proyek</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Filter Proyek"
              className="border border-slate-200 rounded-full pl-4 pr-10 py-1.5 text-sm w-48 focus:outline-none focus:border-primaryTint"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((proj, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-800">{proj.title}</h3>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  {proj.platform}
                </span>
              </div>
              <p className="text-xs text-slate-600 mb-4 font-medium">Dicari: {proj.seeking}</p>
              
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
                  <span>{proj.rolesFilled}/{proj.totalRoles} Posisi Terisi</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div className="bg-primaryTint h-1.5 rounded-full" style={{ width: `${(proj.rolesFilled / proj.totalRoles) * 100}%` }}></div>
                </div>
              </div>

              <div className="flex gap-2 mb-4">
                {proj.filledRoles.map((role, idx) => (
                  <div key={idx} className="flex-1 bg-emerald-50 text-emerald-700 rounded-lg p-2 flex gap-2 items-center">
                    <div className="w-8 h-8 rounded-md bg-emerald-100 flex items-center justify-center font-bold text-xs shrink-0">
                      {role.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold">{role.name}</span>
                      <span className="text-[9px] font-medium opacity-80">{role.role}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-red-50 text-red-500 rounded-lg p-2.5 flex items-center gap-2 mb-4 text-xs font-bold">
                <Ban size={14} /> Posisi kosong: {proj.emptySlot}
              </div>

              <Link href={`/collaboration/${i}`} className="w-full text-center border border-slate-200 text-slate-800 font-bold text-sm py-2 rounded-lg hover:bg-slate-50 transition-colors mt-auto block">
                Lihat Detail
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Open Roles & Participants */}
      <div className="w-full xl:w-80 flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4">Posisi Terbuka</h2>
          <div className="flex flex-col gap-2">
            <span className="text-xs text-slate-500 font-medium">Filter Proyek</span>
            <div className="flex gap-2">
              <button className="flex-1 flex justify-between items-center border border-slate-200 rounded-full px-3 py-1.5 text-xs text-slate-600 font-medium hover:bg-slate-50">
                Peran <ChevronDown size={14} />
              </button>
              <button className="flex-1 flex justify-between items-center border border-slate-200 rounded-full px-3 py-1.5 text-xs text-slate-600 font-medium hover:bg-slate-50">
                Teknologi <ChevronDown size={14} />
              </button>
              <button className="flex-1 flex justify-between items-center border border-slate-200 rounded-full px-3 py-1.5 text-xs text-slate-600 font-medium hover:bg-slate-50">
                Tipe Proyek <ChevronDown size={14} />
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-800 mb-3">Partisipan Tersedia</h3>
          <div className="flex flex-col gap-3">
            {participants.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col gap-3">
                <div className="flex gap-3 items-center">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm shrink-0">
                    {p.initials}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-800">{p.name}</span>
                    <span className="text-xs text-slate-600 font-medium">{p.role}</span>
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 font-medium">
                  Keahlian: {p.skills}
                </div>
                <button className="w-full border border-slate-200 text-slate-800 font-bold text-xs py-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                  Lamar Proyek
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
