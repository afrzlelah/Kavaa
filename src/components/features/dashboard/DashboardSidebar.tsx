"use client";

import type { UserData } from "@/types";
import Image from "next/image";

import { Bell, Mail, Settings, Plus, MoreVertical } from "lucide-react";
import { Button } from "@/components/shared/ui/Button";

export function DashboardSidebar({ user }: { user?: UserData }) {
  const educators = [
    { name: "WPU", role: "Software Developer", avatar: "https://ui-avatars.com/api/?name=WPU&background=random" },
    { name: "Study With Student", role: "Software Developer", avatar: "https://ui-avatars.com/api/?name=SWS&background=random" },
    { name: "Ichbal Hadi", role: "Software Developer", avatar: "https://ui-avatars.com/api/?name=Ichbal&background=random" },
    { name: "Dr. Sarah Chen", role: "Software Developer", avatar: "https://ui-avatars.com/api/?name=Sarah&background=random" },
    { name: "Budi Santoso, M.Arch", role: "Software Developer", avatar: "https://ui-avatars.com/api/?name=Budi&background=random" },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Profile Section */}
      <div className="flex flex-col items-center text-center">
        <div className="flex justify-between w-full mb-6 items-center">
          <h3 className="text-sm font-black text-slate-800">Your Profile</h3>
          <MoreVertical size={16} className="text-slate-400 cursor-pointer" />
        </div>
        
        <div className="relative mb-6">
          {/* Circular Progress Ring */}
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              className="text-slate-100"
            />
            <circle
              cx="64"
              cy="64"
              r="58"
              stroke="currentColor"
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={364}
              strokeDashoffset={364 - (364 * 75) / 100}
              strokeLinecap="round"
              className="text-primary"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
              <Image 
                src={user?.avatar_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80"} 
                alt="profile" 
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <h2 className="text-base  font-semibold text-slate-900 mb-1">
          Good Morning {user?.first_name || "APIIP"}
        </h2>
        <p className="text-[10px] font-semibold text-slate-400 leading-relaxed max-w-[160px]">
          Continue Your Journey And Achieve Your Target
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 text-black">
          <button className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center text-black hover:bg-slate-50 transition-all">
            <Bell size={18} />
          </button>
          <button className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center text-black hover:bg-slate-50 transition-all">
            <Mail size={18} />
          </button>
          <button className="w-10 h-10 rounded-full border border-slate-600 flex items-center justify-center text-black hover:bg-slate-50 transition-all">
            <Settings size={18} />
          </button>
        </div>
      </div>

      {/* Activity Chart Section */}
      <div>
        <div className="flex items-end gap-2 h-24 mb-2">
          {[30, 50, 40, 70, 90, 60, 45].map((val, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end gap-1 group">
               <div 
                 className={`w-full rounded-sm transition-all group-hover:opacity-80 ${i === 4 ? 'bg-primary' : 'bg-blue-100'}`} 
                 style={{ height: `${val}%` }}
               />
               {/* Multi-layered bars for premium look */}
               {i === 4 && (
                 <div className="w-full h-8 bg-blue-300 rounded-sm mt-[-8px] opacity-50" />
               )}
            </div>
          ))}
        </div>
      </div>

      {/* Educator Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-semibold text-slate-800">The Educator</h3>
          <button className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 transition-all">
            <Plus size={14} />
          </button>
        </div>

        <div className="space-y-4">
          {educators.map((ed, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 shrink-0 relative">
                <Image src={ed.avatar} alt={ed.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[11px] font-black text-slate-800 truncate">{ed.name}</h4>
                <p className="text-[9px] font-bold text-slate-400 truncate">{ed.role}</p>
              </div>
              <button className="px-3 py-1 bg-primary text-white text-[9px] font-black rounded-full hover:bg-blue-700 transition-all">
                Follow
              </button>
            </div>
          ))}
        </div>

        <Button variant="secondary" className="w-full py-3 rounded-xl bg-primaryTint/80 text- text-[10px]  uppercase tracking-widest hover:bg-blue-100 transition-all shadow-none mt-4">
          See All
        </Button>
      </div>
    </div>
  );
}
