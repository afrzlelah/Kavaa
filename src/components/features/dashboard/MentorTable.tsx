import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function MentorTable() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  // Fetch from mentors table
  const { data: mentorsData } = await supabase
    .from("mentors")
    .select("*")
    .limit(5);

  const mentors = mentorsData && mentorsData.length > 0 ? mentorsData : [
    { 
      name: "Dr.Sarah Chen", 
      role: "FRONTEND", 
      created_at: new Date().toISOString(),
      avatar: "https://ui-avatars.com/api/?name=Sarah+Chen&background=random",
      company: "TechCorp"
    },
    { 
      name: "Budi Santoso, M.Arch", 
      role: "FRONTEND", 
      created_at: new Date().toISOString(),
      avatar: "https://ui-avatars.com/api/?name=Budi+Santoso&background=random",
      company: "DesignStudio"
    }
  ];

  return (
    <div className="w-full bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-50">
            <th className="px-8 py-5 text-[10px]  text-black uppercase">Instructor Name & Date</th>
            <th className="px-8 py-5 text-[10px]  text-black uppercase">Role</th>
            <th className="px-8 py-5 text-[10px]  text-black uppercase">Company</th>
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
                    <p className="text-[10px]  text-slate-600">{new Date(m.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </td>
              <td className="px-8 py-5">
                <span className="px-4 py-1 bg-primaryTint/20 text-primaryTint text-[9px]  rounded-xl uppercase ">
                  {m.role || "MENTOR"}
                </span>
              </td>
              <td className="px-8 py-5">
                <p className="text-[12px]  text-slate-600 max-w-xs  font-semibold">
                  {m.company || "Independent"}
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
