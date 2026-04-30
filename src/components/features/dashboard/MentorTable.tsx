"use client";

import { Avatar } from "@/components/shared/ui/Avatar";
import Image from "next/image";

export function MentorTable() {
  const mentors = [
    { 
      name: "Dr.Sarah Chen", 
      date: "25/2/2023", 
      type: "FRONTEND", 
      title: "Mengenal Lebih Dekat Apa Itu Web",
      avatar: "https://ui-avatars.com/api/?name=Sarah+Chen&background=random"
    },
    { 
      name: "Budi Santoso, M.Arch", 
      date: "25/2/2023", 
      type: "FRONTEND", 
      title: "Desain Berkelanjutan Untuk Produk Nyata",
      avatar: "https://ui-avatars.com/api/?name=Budi+Santoso&background=random"
    }
  ];

  return (
    <div className="w-full bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-50">
            <th className="px-8 py-5 text-[10px]  text-black uppercase">Instructor Name & Date</th>
            <th className="px-8 py-5 text-[10px]  text-black uppercase">Course Type</th>
            <th className="px-8 py-5 text-[10px]  text-black uppercase">Course Title</th>
            <th className="px-8 py-5 text-[10px]  text-black uppercase text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {mentors.map((m, i) => (
            <tr key={i} className="group hover:bg-slate-50 transition-colors">
              <td className="px-8 py-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border-2 border-white shadow-sm relative">
                    <Image src={m.avatar} alt={m.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="text-[12px]  text-slate-800">{m.name}</h4>
                    <p className="text-[10px]  text-slate-600">{m.date}</p>
                  </div>
                </div>
              </td>
              <td className="px-8 py-5">
                <span className="px-4 py-1 bg-primaryTint/20 text-primaryTint text-[9px]  rounded-xl uppercase ">
                  {m.type}
                </span>
              </td>
              <td className="px-8 py-5">
                <p className="text-[12px]  text-slate-600 max-w-xs  font-semibold">
                  {m.title}
                </p>
              </td>
              <td className="px-8 py-5 text-right">
                <button className="px-4 py-1 bg-primaryTint/20 text-primaryTint text-[9px]  rounded-xl uppercase hover:bg-primary hover:text-white transition-all">
                  Show Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
