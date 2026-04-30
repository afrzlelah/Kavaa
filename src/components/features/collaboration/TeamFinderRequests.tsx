import { Card } from "@/components/shared/ui/Card";
import Image from "next/image";
import Link from "next/link";

export async function TeamFinderRequests() {
  const requests = [
    {
      id: "1",
      title: "Front-end needed for FreshMart",
      time: "4 minutes ago",
      avatar: "https://ui-avatars.com/api/?name=FM&background=random"
    },
    {
      id: "2",
      title: "Back-end for SkillLink",
      time: "3 minutes ago",
      avatar: "https://ui-avatars.com/api/?name=SL&background=random"
    },
    {
      id: "3",
      title: "Looking for UI/UX (EduOnnech)",
      time: "3 minutes ago",
      avatar: "https://ui-avatars.com/api/?name=EO&background=random"
    }
  ];

  return (
    <Card className="h-full border border-slate-100 shadow-sm p-8 rounded-[2rem]">
      <h3 className="text-[16px] font-black text-slate-900 mb-2 leading-none">Permintaan Pencarian Tim Baru</h3>
      <p className="text-[10px] font-bold text-slate-400 mb-8 uppercase tracking-tighter">New Team Finder Requests</p>
      
      <div className="space-y-6">
        {requests.map((req) => (
          <div key={req.id} className="flex items-center justify-between gap-4 group">
            <div className="flex items-center gap-3 min-w-0">
               <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden relative">
                  <Image src={req.avatar} alt={req.title} fill className="object-cover" />
               </div>
               <div className="min-w-0">
                  <h4 className="text-[12px] font-medium text-slate-800 truncate">{req.title}</h4>
                  <p className="text-[10px] font-bold text-slate-400 mt-1">{req.time}</p>
               </div>
            </div>
            
            <Link 
              href={`/collaboration/team-finder/${req.id}`}
              className="px-4 py-2 border border-blue-100 text-blue-600 text-[10px] font-black rounded-lg hover:bg-blue-50 transition-all whitespace-nowrap"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </Card>
  );
}
