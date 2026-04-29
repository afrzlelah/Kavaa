"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, 
  Users, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Layout, 
  ExternalLink,
  MoreHorizontal,
  Play,
  Clock1
} from "lucide-react";
import { Card, CardHeader } from "@/components/shared/ui/Card";
import { ProgressBar } from "@/components/shared/ui/ProgressBar";

export default function ProjectDetailsPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : '';

  // Mock data to match design
  const project = {
    title: "Travel Planner Web",
    type: "Web",
    duration: "6 minggu",
    status: "Sedang Berjalan",
    description: "Travel Planner concept, designed UI that creates easy way to plan and organize travel itinerary and activities.",
    figmaLink: "https://figma.com/file/example",
    team: [
      { name: "Alice W.", role: "UI/UX Designer", status: "TEPAT WAKTU", initials: "AW" },
      { name: "Bob K.", role: "Frontend Dev", status: "TEPAT WAKTU", initials: "BK" },
      { name: "Backend Developer", role: "Mencari", status: "Mencari", initials: "?" },
    ],
    milestones: [
      { title: "Design Freeze", date: "Past dat 27", status: "PAST", type: "due" },
      { title: "Design Freeze", date: "Upcoming 12/27", status: "UPCOMING", type: "document" },
      { title: "Design Freeze", date: "Due date 27", status: "DUE", type: "none" },
      { title: "Due date 23", date: "Lihat Prototipe", status: "PAST", type: "prototype", rightSide: true },
      { title: "Upcoming 21", date: "", status: "UPCOMING", type: "none", rightSide: true },
      { title: "Peluncuran MVP", date: "Upcoming 13/26", status: "UPCOMING", type: "prototype", rightSide: true },
    ],
    workPackages: [
      { title: "User Flows", link: "Tautan: User Flows", status: "ACTIVE", assignee: "AW" },
      { title: "Homepage Component", link: "Tautan: Homepage", status: "DONE", assignee: "BK", assigneeName: "BOB" },
      { title: "User Auth API", link: "Tautan: User Auth API", status: "PENDING", assignee: "CD", assigneeName: "Charlie" },
    ],
    activities: [
      { user: "Alice", action: "memperbarui User Flows", time: "" },
      { user: "Bob", action: "melakukan commit ke Frontend repo", time: "" },
      { user: "Alice", action: "melakukan commit ke Frontend repo", time: "" },
    ]
  };

  return (
    <div className="p-4 md:p-8 h-full overflow-y-auto bg-slate-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/collaboration"
            className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-black text-slate-600 hover:bg-slate-50 transition-all shadow-sm mb-6"
          >
            <ArrowLeft size={16} /> Kembali ke Pencari Tim
          </Link>
          
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-black text-slate-800">
              Detail Proyek: <span className="text-slate-400 font-medium ml-2"> &gt; {project.title}</span>
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column (Lg: 3/12) */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            {/* Project Info */}
            <Card className="border-none shadow-xl shadow-slate-200/50">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Tipe Proyek</span>
                  <span className="text-sm font-black text-slate-800 uppercase">{project.type}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Durasi</span>
                  <span className="text-sm font-black text-slate-800 uppercase">{project.duration}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Status</span>
                  <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase">
                    {project.status}
                  </span>
                </div>
              </div>
            </Card>

            {/* Formasi Tim */}
            <Card className="border-none shadow-xl shadow-slate-200/50">
              <CardHeader 
                title="Formasi Tim" 
                action={<span className="text-xs font-black text-slate-800 uppercase tracking-tighter">3/3 Posisi Terisi</span>}
              />
              <div className="mt-2 space-y-6">
                <ProgressBar progress={100} />
                
                <div className="space-y-4">
                  {project.team.map((member, i) => (
                    <div key={i} className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-[10px] font-black ${
                          member.status === "Mencari" ? "bg-slate-100 text-slate-400" : "bg-slate-200 text-slate-600"
                        }`}>
                          {member.initials}
                        </div>
                        <div>
                          <p className="text-xs font-black text-slate-800">{member.name}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">{member.role}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase ${
                        member.status === "TEPAT WAKTU" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                      }`}>
                        {member.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Sumber Daya & Tautan */}
            <Card className="border-none shadow-xl shadow-slate-200/50">
              <CardHeader title="Sumber Daya & Tautan" />
              <div className="space-y-4 mt-2">
                <div className="flex items-center gap-3 text-slate-600 hover:text-primary transition-colors cursor-pointer group">
                  <Clock1 size={18} />
                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-widest">Repositori Bersama</p>
                    <p className="text-[10px] text-slate-400 truncate">github.com/github/repo-links</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-600 hover:text-primary transition-colors cursor-pointer group">
                  <div className="p-1.5 bg-slate-100 rounded-lg group-hover:bg-primary/10">
                    <FileText size={14} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-widest">API Docs</p>
                    <p className="text-[10px] text-slate-400 truncate">https://github/API-docs</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-600 hover:text-primary transition-colors cursor-pointer group">
                  <Clock size={18} />
                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-widest">Saluran Slack</p>
                    <p className="text-[10px] text-slate-400 truncate">https://slack channel-link</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Center Column (Lg: 5/12) */}
          <div className="lg:col-span-5">
            <Card className="h-full border-none shadow-xl shadow-slate-200/50">
              <CardHeader 
                title="Linimasa & Milestones" 
                action={<span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-lg text-[10px] font-black uppercase">Upcoming</span>}
              />
              
              <div className="relative mt-8 px-4 h-[500px]">
                {/* Vertical Center Line */}
                <div className="absolute left-1/2 top-0 bottom-10 w-0.5 bg-slate-100 -translate-x-1/2"></div>

                {/* Milestones */}
                <div className="space-y-24 relative">
                  {/* Past Milestone */}
                  <div className="relative flex items-center justify-between">
                    <div className="w-1/2 pr-8 text-right">
                      <h4 className="text-sm font-black text-slate-800 uppercase tracking-wide">Design Freeze</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Past dat 27</p>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white bg-indigo-400 shadow-sm z-10"></div>
                    <div className="w-1/2 pl-8">
                      <span className="bg-rose-100 text-rose-500 px-2 py-0.5 rounded text-[9px] font-black uppercase mr-2 italic">PAST</span>
                      <span className="text-xs font-black text-slate-800">Due date 23</span>
                      <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400 font-bold hover:text-primary cursor-pointer transition-colors">
                        <Layout size={10} /> Lihat Prototipe
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Milestone */}
                  <div className="relative flex items-center justify-between">
                    <div className="w-1/2 pr-8 text-right">
                      <h4 className="text-sm font-black text-slate-800 uppercase tracking-wide">Design Freeze</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Upcoming 12/27</p>
                      <div className="flex items-center gap-1 mt-1 justify-end text-[10px] text-slate-400 font-bold hover:text-primary cursor-pointer transition-colors">
                        <FileText size={10} /> Lihat Dokumen
                      </div>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white bg-emerald-400 shadow-sm z-10"></div>
                    <div className="w-1/2 pl-8">
                      <span className="bg-amber-100 text-amber-500 px-2 py-0.5 rounded text-[9px] font-black uppercase mr-2 italic">UPCOMING</span>
                      <span className="text-xs font-black text-slate-800">Upcoming 21</span>
                    </div>
                  </div>

                   {/* Future Milestone */}
                   <div className="relative flex items-center justify-between">
                    <div className="w-1/2 pr-8 text-right">
                      <h4 className="text-sm font-black text-slate-800 uppercase tracking-wide">Design Freeze</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Due date 27</p>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white bg-indigo-400 shadow-sm z-10"></div>
                    <div className="w-1/2 pl-8">
                      <h4 className="text-sm font-black text-slate-800 uppercase tracking-wide">Peluncuran MVP</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Upcoming 13/26</p>
                      <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400 font-bold hover:text-primary cursor-pointer transition-colors">
                        <Layout size={10} /> Lihat Prototipe
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column (Lg: 4/12) */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* Deskripsi Proyek */}
            <Card className="border-none shadow-xl shadow-slate-200/50">
              <CardHeader title="Deskripsi Proyek" />
              <p className="text-sm text-slate-500 leading-relaxed font-medium mb-6">
                {project.description}
              </p>
              
              <div className="relative bg-slate-50 border border-slate-100 rounded-2xl h-40 flex items-center justify-center overflow-hidden mb-4 group cursor-pointer">
                <img 
                   src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80" 
                   alt="Travel Planner Preview" 
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-xs font-black text-slate-800 uppercase bg-white/90 px-4 py-2 rounded-xl border border-slate-100 shadow-sm backdrop-blur-sm group-hover:bg-primaryTint group-hover:text-white transition-all">
                    Pratinjau Desain Travel Planner
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                <div className="flex items-center gap-2">
                   <span>Figma design system:</span>
                   <Link href="#" className="text-primary hover:underline flex items-center gap-1">
                      https:///figma <ExternalLink size={10} />
                   </Link>
                </div>
                <MoreHorizontal size={16} />
              </div>
            </Card>

            {/* Paket Pekerjaan */}
            <Card className="border-none shadow-xl shadow-slate-200/50">
              <CardHeader title="Paket Pekerjaan" />
              <div className="space-y-5 mt-2">
                {project.workPackages.map((wp, i) => (
                  <div key={i} className="flex items-start justify-between gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        {wp.assignee}
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-800">{wp.title}</h4>
                        <p className="text-[10px] font-bold text-slate-400 italic">{wp.link}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${
                      wp.status === "ACTIVE" ? "bg-rose-100 text-rose-500" : 
                      wp.status === "DONE" ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
                    }`}>
                      {wp.status === "DONE" ? wp.assigneeName : wp.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Aktivitas Terbaru */}
            <Card className="border-none shadow-xl shadow-slate-200/50">
              <CardHeader title="Aktivitas Terbaru" />
              <div className="relative space-y-8 mt-4 pl-6">
                <div className="absolute left-2 top-2 bottom-4 w-0.5 bg-slate-100 rounded-full"></div>
                
                {project.activities.map((act, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-5 top-1 w-2.5 h-2.5 rounded-full bg-slate-200 border-2 border-white shadow-sm ring-4 ring-white"></div>
                    <p className="text-xs font-bold text-slate-600">
                      <span className="font-black text-slate-800">{act.user}</span> {act.action}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
