"use client";

import { Card } from "@/components/shared/ui/Card";
import { Folder, MoreVertical, Users, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MyProjectsPage() {
  const myProjects = [
    {
      id: "travel-planner",
      title: "Travel Planner Web",
      status: "In Progress",
      progress: 65,
      teamCount: 3,
      deadline: "27 Dec 2024",
      type: "Web",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400"
    },
    {
      id: "freshmart",
      title: "FreshMart App",
      status: "Planning",
      progress: 20,
      teamCount: 2,
      deadline: "15 Jan 2025",
      type: "Mobile",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400"
    }
  ];

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between items-center">
        <h2 className="text-[20px] font-black text-slate-900 tracking-tight">Proyek Saya</h2>
        <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[12px] font-black text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
           Filter Proyek
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {myProjects.map((project) => (
          <Link href={`/collaboration/${project.id}`} key={project.id}>
            <Card className="group border border-slate-100 shadow-sm p-0 rounded-[2rem] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
              <div className="relative h-48 w-full bg-slate-50 overflow-hidden">
                 <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-lg shadow-sm">
                    <ArrowUpRight size={16} className="text-slate-800" />
                 </div>
                 <div className="absolute bottom-4 left-4">
                    <span className="bg-primary text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-primary/20">
                       {project.status}
                    </span>
                 </div>
              </div>
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-[16px] font-black text-slate-800 group-hover:text-primary transition-colors">{project.title}</h3>
                  <MoreVertical size={16} className="text-slate-400" />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">{project.type} Project</p>

                <div className="space-y-3 mb-8">
                  <div className="flex justify-between items-center text-[11px] font-black uppercase tracking-tight">
                    <span className="text-slate-400">Completion</span>
                    <span className="text-primary">{project.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${project.progress}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div className="flex items-center -space-x-2">
                     {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden relative">
                           <Image src={`https://ui-avatars.com/api/?name=U${i}&background=random`} alt="User" fill />
                        </div>
                     ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                    <Clock size={12} strokeWidth={3} /> {project.deadline}
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
