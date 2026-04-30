import React from "react";
import Link from "next/link";
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
  Globe,
  Link as LinkIcon,
  MessageCircle,
  ChevronRight
} from "lucide-react";
import { Card } from "@/components/shared/ui/Card";
import Image from "next/image";

export default async function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  const project = {
    title: "Travel Planner Web",
    type: "Web",
    duration: "6 weeks",
    status: "In Progress",
    description: "Travel Planner Web concept, designed ui that creates acaramw concept and imprand and aonupoted moduu marketents.",
    figmaLink: "https://figma",
    team: [
      { name: "Alice W.", role: "UI/UX Designer", status: "ON TRACK", initials: "AW", avatar: "https://ui-avatars.com/api/?name=Alice+W&background=random" },
      { name: "Bob K.", role: "Frontend Dev", status: "ON TRACK", initials: "BK", avatar: "https://ui-avatars.com/api/?name=Bob+K&background=random" },
      { name: "Backend Developer", role: "Backend Developer", status: "SEEKING", initials: "?" },
    ],
    milestones: [
      { title: "Design Freeze", date: "Past dat 27", status: "PAST", type: "due", left: true },
      { title: "Due date 23", date: "View Prototypes", status: "PAST", type: "prototype", left: false },
      { title: "Design Freeze", date: "Upcoming 12/27", status: "UPCOMING", type: "document", left: true },
      { title: "Upcoming 21", date: "", status: "UPCOMING", type: "none", left: false },
      { title: "Design Freeze", date: "Due date 27", status: "DUE", type: "none", left: true },
      { title: "MVP Launch", date: "Upcoming 13/26", status: "UPCOMING", type: "prototype", left: false },
    ],
    workPackages: [
      { title: "User Flows", link: "Links: Unex Flows", status: "ACTIVE", color: "bg-rose-50 text-rose-500" },
      { title: "Homepage Component", link: "Links: Homepage", status: "BOB", color: "bg-emerald-50 text-emerald-600" },
      { title: "User Auth API", link: "Links: User Auth API", status: "Charlie", color: "bg-emerald-50 text-emerald-600" },
    ],
    activities: [
      { user: "Alice", action: "updated User Flows" },
      { user: "Bob", action: "committed to Frontend repo" },
      { user: "Alice", action: "committed to Frontend repo" },
    ]
  };

  return (
    <div className="p-4 md:p-10 h-full overflow-y-auto bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <div className="mb-10 flex items-center justify-between">
           <Link 
            href="/collaboration/team-finder"
            className="inline-flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg px-4 py-2 text-[11px] font-black text-slate-600 hover:bg-slate-100 transition-all shadow-sm"
          >
            <ArrowLeft size={14} strokeWidth={3} /> Kembali ke Pencari Tim
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-[28px] font-black text-slate-900 mb-10 tracking-tight flex items-center gap-3">
          Project Details: <span className="text-slate-300 font-medium"> <ChevronRight size={24} className="inline opacity-50" /> {project.title}</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Side (Lg: 3/12) */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            {/* Project Info */}
            <Card className="border border-slate-100 shadow-sm p-6 rounded-[1.5rem]">
               <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                    <span className="text-[12px] font-bold text-slate-400">Project Type</span>
                    <span className="text-[12px] font-black text-slate-800">{project.type}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                    <span className="text-[12px] font-bold text-slate-400">Duration</span>
                    <span className="text-[12px] font-black text-slate-800">{project.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[12px] font-bold text-slate-400">Status</span>
                    <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase">
                      {project.status}
                    </span>
                  </div>
               </div>
            </Card>

            {/* Team Formation */}
            <Card className="border border-slate-100 shadow-sm p-8 rounded-[2rem]">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-[14px] font-black text-slate-900 tracking-tight">Team Formation</h3>
                  <span className="text-[10px] font-black text-slate-400">3/3 Roles Filled</span>
               </div>
               
               <div className="space-y-6">
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: '100%' }} />
                  </div>
                  
                  <div className="space-y-5">
                    {project.team.map((member, i) => (
                      <div key={i} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center relative overflow-hidden shrink-0">
                            {member.avatar ? (
                               <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                            ) : (
                               <span className="text-slate-400 font-black text-[14px]">?</span>
                            )}
                          </div>
                          <div>
                            <p className="text-[11px] font-black text-slate-800 leading-none mb-1">{member.name}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{member.role}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black tracking-tighter ${
                          member.status === "ON TRACK" ? "bg-emerald-50 text-emerald-500" : "bg-rose-50 text-rose-500"
                        }`}>
                          {member.status}
                        </span>
                      </div>
                    ))}
                  </div>
               </div>
            </Card>

            {/* Resources & Links */}
            <Card className="border border-slate-100 shadow-sm p-8 rounded-[2rem]">
               <h3 className="text-[14px] font-black text-slate-900 mb-8 tracking-tight">Resources & Links</h3>
               <div className="space-y-6">
                  <div className="flex items-start gap-4 group cursor-pointer">
                    <Globe size={18} className="text-slate-800 shrink-0" />
                    <div className="min-w-0">
                       <p className="text-[11px] font-black text-slate-800 leading-none mb-1 group-hover:text-primary transition-colors">Shared Repo</p>
                       <p className="text-[10px] font-bold text-slate-400 truncate tracking-tight">github.com/github/repo-links</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group cursor-pointer">
                    <LinkIcon size={18} className="text-slate-800 shrink-0" />
                    <div className="min-w-0">
                       <p className="text-[11px] font-black text-slate-800 leading-none mb-1 group-hover:text-primary transition-colors">API Docs</p>
                       <p className="text-[10px] font-bold text-slate-400 truncate tracking-tight">https://github/API-docs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 group cursor-pointer">
                    <MessageCircle size={18} className="text-slate-800 shrink-0" />
                    <div className="min-w-0">
                       <p className="text-[11px] font-black text-slate-800 leading-none mb-1 group-hover:text-primary transition-colors">Slack Channel</p>
                       <p className="text-[10px] font-bold text-slate-400 truncate tracking-tight">kavaa.slack.com/invites/team</p>
                    </div>
                  </div>
               </div>
            </Card>
          </div>

          {/* Center Column (Timeline) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <Card className="border border-slate-100 shadow-sm p-10 rounded-[2.5rem] relative overflow-hidden">
               <div className="flex justify-between items-center mb-12">
                  <h3 className="text-[16px] font-black text-slate-900">Timeline & Milestones</h3>
                  <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Upcoming</span>
               </div>

               <div className="relative min-h-[500px]">
                  {/* Vertical Line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-50 -translate-x-1/2"></div>
                  
                  {/* Milestones in Image style */}
                  <div className="space-y-24">
                     <div className="relative flex items-center">
                        <div className="w-1/2 pr-8 text-right">
                           <h4 className="text-[13px] font-black text-slate-800">Design Freeze</h4>
                           <p className="text-[10px] font-bold text-slate-400">Past dat 27</p>
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white bg-blue-400 shadow-sm z-10"></div>
                        <div className="w-1/2 pl-8">
                           <div className="flex items-center gap-2">
                              <span className="bg-rose-100 text-rose-500 px-2 py-0.5 rounded text-[8px] font-black">PAST</span>
                              <span className="text-[11px] font-black text-slate-800">Due date 23</span>
                           </div>
                           <p className="text-[10px] text-slate-400 font-bold mt-1">👁️ View Prototypes</p>
                        </div>
                     </div>

                     <div className="relative flex items-center">
                        <div className="w-1/2 pr-8 text-right">
                           <h4 className="text-[13px] font-black text-slate-800">Design Freeze</h4>
                           <p className="text-[10px] font-bold text-slate-400">Upcoming 12/27</p>
                           <p className="text-[10px] text-slate-400 font-bold mt-1">📄 View Documents</p>
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white bg-emerald-400 shadow-sm z-10"></div>
                        <div className="w-1/2 pl-8">
                           <div className="flex items-center gap-2">
                              <span className="bg-amber-100 text-amber-500 px-2 py-0.5 rounded text-[8px] font-black uppercase">Upcoming</span>
                              <span className="text-[11px] font-black text-slate-800">Upcoming 21</span>
                           </div>
                        </div>
                     </div>

                     <div className="relative flex items-center">
                        <div className="w-1/2 pr-8 text-right">
                           <h4 className="text-[13px] font-black text-slate-800">Design Freeze</h4>
                           <p className="text-[10px] font-bold text-slate-400">Due date 27</p>
                        </div>
                        <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white bg-blue-400 shadow-sm z-10"></div>
                        <div className="w-1/2 pl-8">
                           <div className="flex items-center gap-2">
                              <span className="bg-amber-100 text-amber-500 px-2 py-0.5 rounded text-[8px] font-black uppercase">Upcoming</span>
                              <span className="text-[11px] font-black text-slate-800">MVP Launch</span>
                           </div>
                           <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tight">Upcoming 13/26</p>
                           <p className="text-[10px] text-slate-400 font-bold mt-1">👁️ View Prototypes</p>
                        </div>
                     </div>
                  </div>
               </div>
            </Card>

            <button className="w-full bg-primary text-white py-4 rounded-xl text-[14px] font-black shadow-xl shadow-primary/20 hover:bg-blue-700 transition-all active:scale-95">
               Join to Project
            </button>
          </div>

          {/* Right Side */}
          <div className="lg:col-span-4 flex flex-col gap-8">
             {/* Project Description */}
             <Card className="border border-slate-100 shadow-sm p-8 rounded-[2rem]">
                <h3 className="text-[14px] font-black text-slate-900 mb-6">Project Description</h3>
                <p className="text-[11px] text-slate-500 font-bold leading-relaxed mb-8">
                   {project.description}
                </p>
                
                <div className="bg-slate-50 rounded-2xl p-4 flex flex-col gap-4 border border-slate-100">
                   <div className="relative h-24 rounded-lg overflow-hidden border border-slate-200">
                      <Image src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800" alt="Mockup" fill className="object-cover" />
                   </div>
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                         Figma design system: <Link href="#" className="text-primary hover:underline">https:///figma</Link>
                      </div>
                      <MoreHorizontal size={16} className="text-slate-400" />
                   </div>
                </div>
             </Card>

             {/* Work Packages */}
             <Card className="border border-slate-100 shadow-sm p-8 rounded-[2rem]">
                <h3 className="text-[14px] font-black text-slate-900 mb-8">Work Packages</h3>
                <div className="space-y-6">
                   {project.workPackages.map((wp, i) => (
                      <div key={i} className="flex items-center justify-between gap-4">
                         <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-lg bg-slate-900 flex items-center justify-center shrink-0">
                               <Image src={`https://ui-avatars.com/api/?name=${encodeURIComponent(wp.title)}&background=random`} alt={wp.title} fill className="object-cover rounded-lg" />
                            </div>
                            <div className="min-w-0">
                               <h4 className="text-[11px] font-black text-slate-800 leading-none mb-1 truncate">{wp.title}</h4>
                               <p className="text-[9px] font-bold text-slate-400 truncate tracking-tight">{wp.link}</p>
                            </div>
                         </div>
                         <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${wp.color}`}>
                            {wp.status}
                         </span>
                      </div>
                   ))}
                </div>
             </Card>

             {/* Recent Activities */}
             <Card className="border border-slate-100 shadow-sm p-8 rounded-[2rem]">
                <h3 className="text-[14px] font-black text-slate-900 mb-8 tracking-tight">Recent Activities</h3>
                <div className="relative space-y-6 pl-4">
                   <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-slate-50 rounded-full"></div>
                   {project.activities.map((act, i) => (
                      <div key={i} className="relative">
                         <div className="absolute -left-3.5 top-1 w-2 h-2 rounded-full bg-slate-100 border border-white z-10"></div>
                         <p className="text-[11px] font-bold text-slate-500 leading-none">
                            <span className="font-black text-slate-900">{act.user}</span> {act.action}
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
