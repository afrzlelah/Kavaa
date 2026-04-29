"use client";

import { Card, CardHeader } from "@/components/shared/ui/Card";
import { ProgressBar } from "@/components/shared/ui/ProgressBar";
import { Folder, MoreVertical, Users, Clock } from "lucide-react";
import Link from "next/link";

export default function MyProjectsPage() {
  const myProjects = [
    {
      id: "travel-planner",
      title: "Travel Planner Web",
      status: "In Progress",
      progress: 65,
      teamCount: 3,
      deadline: "27 Des 2024",
      type: "Web"
    },
    {
      id: "freshmart",
      title: "FreshMart App",
      status: "Planning",
      progress: 20,
      teamCount: 2,
      deadline: "15 Jan 2025",
      type: "Mobile"
    }
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Proyek Saya</h2>
        <div className="flex gap-2">
           <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
              Filter
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myProjects.map((project) => (
          <Link href={`/collaboration/${project.id}`} key={project.id}>
            <Card className="group hover:shadow-xl hover:-translate-y-1 transition-all border-none shadow-lg shadow-slate-200/50 cursor-pointer">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-xl bg-primaryTint/10 flex items-center justify-center text-primaryTint group-hover:bg-primaryTint group-hover:text-white transition-colors">
                    <Folder size={20} />
                  </div>
                  <button className="text-slate-400 hover:text-slate-600">
                    <MoreVertical size={16} />
                  </button>
                </div>

                <div>
                  <h3 className="font-black text-slate-800 group-hover:text-primaryTint transition-colors">{project.title}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{project.type} Project</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase">
                    <span className="text-slate-400">Progress</span>
                    <span className="text-primaryTint">{project.progress}%</span>
                  </div>
                  <ProgressBar progress={project.progress} />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase">
                      <Users size={12} /> {project.teamCount} Members
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase">
                      <Clock size={12} /> {project.deadline}
                    </div>
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
