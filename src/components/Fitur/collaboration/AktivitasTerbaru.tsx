import { Card } from "@/components/Bersama/ui/Card";
import Image from "next/image";

export async function AktivitasTerbaru() {
  return (
    <Card className="h-full border border-slate-100 shadow-sm p-8 rounded-[2rem]">
      <h3 className="text-[16px] font-black text-slate-900 mb-2 leading-none">Aktivitas Kolaborasi Terbaru</h3>
      <p className="text-[10px] font-bold text-slate-400 mb-8 uppercase tracking-tighter">Recent Collaboration Aktivitas</p>
      
      <div className="space-y-6">
        {[
          { name: "Alice", action: "updated Wireframes", time: "4 minutes ago", avatar: "https://ui-avatars.com/api/?name=Alice&background=random" },
          { name: "Charlie", action: "merged API branch", time: "4 minutes ago", avatar: "https://ui-avatars.com/api/?name=Charlie&background=random" },
          { name: "Bob", action: "commented on Pull Request", time: "3 minutes ago", avatar: "https://ui-avatars.com/api/?name=Bob&background=random" }
        ].map((item, idx) => (
          <div key={idx} className="flex gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-100 shadow-sm relative">
              <Image src={item.avatar} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-[11px] font-medium text-slate-600 leading-tight">
                  <span className="font-black text-slate-900">{item.name}</span> {item.action}
               </p>
               <p className="text-[9px] font-bold text-slate-400 mt-1">{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
