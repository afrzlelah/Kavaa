"use client";

import { ChevronDown, Ban, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function TeamFinder() {
  const projects = [
    {
      title: "EcoTrack App",
      platform: "Mobile",
      seeking: "UI/UX, Backend",
      rolesFilled: 1,
      totalRoles: 3,
      filledRoles: [
        { initials: "AW", name: "Aubrey", role: "Designer", color: "bg-emerald-100 text-emerald-700" },
        { initials: "BK", name: "Victoria", role: "Frontend", color: "bg-emerald-100 text-emerald-700" },
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
        { initials: "AW", name: "Alice", role: "Designer", color: "bg-emerald-100 text-emerald-700" },
        { initials: "BK", name: "Bob", role: "Frontend", color: "bg-emerald-100 text-emerald-700" },
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
        { initials: "AW", name: "Shawn", role: "Designer", color: "bg-emerald-100 text-emerald-700" },
        { initials: "BK", name: "Shane", role: "Frontend", color: "bg-emerald-100 text-emerald-700" },
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
        { initials: "AW", name: "Max", role: "Designer", color: "bg-emerald-100 text-emerald-700" },
        { initials: "BK", name: "Kyle", role: "Frontend", color: "bg-emerald-100 text-emerald-700" },
      ],
      emptySlot: "Backend",
    },
  ];

  const participants = [
    { name: "Ronald Richards", role: "UI/UX Designer", skills: "Adobe XD, Proto.io", avatar: "https://ui-avatars.com/api/?name=Ronald+Richards&background=random" },
    { name: "Marvin McKinney", role: "Backend Dev", skills: "Python, Django, SQL", avatar: "https://ui-avatars.com/api/?name=Marvin+McKinney&background=random" },
    { name: "Darrell Steward", role: "UI/UX Designer", skills: "Adobe XD, Proto.io", avatar: "https://ui-avatars.com/api/?name=Darrell+Steward&background=random" },
    { name: "Robert Fox", role: "Backend Dev", skills: "Python, Django, SQL", avatar: "https://ui-avatars.com/api/?name=Robert+Fox&background=random" },
  ];

  return (
    <div className="flex gap-10 flex-col lg:flex-row pb-20">
      {/* Left Column: Project Postings */}
      <div className="flex-1 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-black text-slate-900 tracking-tight">Project Postings</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Filter Projects"
              className="border border-slate-200 rounded-lg pl-4 pr-10 py-2 text-[12px] w-48 focus:outline-none focus:border-primary transition-all bg-white shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj, i) => (
            <div key={i} className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm flex flex-col hover:shadow-md transition-all group">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-[18px] font-black text-slate-800 leading-tight group-hover:text-primary transition-colors">{proj.title}</h3>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100 uppercase tracking-wider">
                  {proj.platform}
                </span>
              </div>
              <p className="text-[12px] text-slate-500 mb-6 font-black">Seeking: <span className="text-slate-800">{proj.seeking}</span></p>
              
              <div className="mb-6">
                <div className="flex items-center justify-between text-[11px] font-black text-slate-400 uppercase tracking-tight mb-2">
                  <span>{proj.rolesFilled}/{proj.totalRoles} Roles Filled</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div className="bg-primary h-full rounded-full" style={{ width: `${(proj.rolesFilled / proj.totalRoles) * 100}%` }}></div>
                </div>
              </div>

              <div className="flex gap-2 mb-6">
                {proj.filledRoles.map((role, idx) => (
                  <div key={idx} className={`flex-1 ${role.color} rounded-xl p-3 flex gap-3 items-center border border-emerald-200/50`}>
                    <div className="w-10 h-10 rounded-lg bg-white/50 flex items-center justify-center font-black text-[11px] shrink-0 shadow-sm overflow-hidden relative">
                       <Image src={`https://ui-avatars.com/api/?name=${encodeURIComponent(role.name)}&background=random`} alt={role.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col min-w-0">
                       <span className="text-[11px] font-black truncate">{role.name}</span>
                       <span className="text-[9px] font-bold opacity-70 truncate">{role.role}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-rose-50 text-rose-500 rounded-xl p-3.5 flex items-center gap-3 mb-8 text-[11px] font-black border border-rose-100/50">
                <div className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                  <Ban size={12} strokeWidth={3} />
                </div>
                Empty slot: {proj.emptySlot}
              </div>

              <Link href={`/collaboration/${i}`} className="w-full text-center border border-slate-200 text-slate-800 font-black text-[13px] py-3.5 rounded-xl hover:bg-slate-50 transition-all active:scale-[0.98] mt-auto">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column: Open Roles & Participants */}
      <div className="w-full lg:w-96 flex flex-col gap-10">
        <div>
          <h2 className="text-[20px] font-black text-slate-900 mb-6 tracking-tight">Open Roles</h2>
          <div className="flex flex-col gap-4">
            <span className="text-[11px] text-slate-400 font-black uppercase tracking-widest">Filter Projects</span>
            <div className="grid grid-cols-1 gap-2.5">
               {[
                 { label: "By Role", options: [] },
                 { label: "Technology", options: [] },
                 { label: "Project Tipe", options: [] }
               ].map((filter) => (
                  <button key={filter.label} className="w-full flex justify-between items-center border border-slate-100 bg-white rounded-xl px-5 py-3.5 text-[12px] text-slate-600 font-black hover:border-slate-200 transition-all shadow-sm">
                    {filter.label} <ChevronDown size={14} strokeWidth={3} className="text-slate-400" />
                  </button>
               ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-[16px] font-black text-slate-900 mb-6 tracking-tight uppercase tracking-wide">Available Participants</h3>
          <div className="flex flex-col gap-4">
            {participants.map((p, i) => (
              <div key={i} className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm flex flex-col gap-6 hover:shadow-md transition-all">
                <div className="flex gap-4 items-center">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden relative shrink-0">
                    <Image src={p.avatar} alt={p.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-black text-slate-800 text-[14px] leading-tight">{p.name}</span>
                    <span className="text-[11px] text-slate-500 font-bold">{p.role}</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-400 font-bold flex flex-wrap gap-1">
                  Skills: <span className="text-slate-600">{p.skills}</span>
                </div>
                <button className="w-full border border-slate-200 text-slate-800 font-black text-[12px] py-3.5 rounded-xl hover:bg-slate-50 transition-all active:scale-95">
                  Apply to Projects
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
