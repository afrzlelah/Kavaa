"use client";

import { Card, CardHeader } from "@/components/shared/ui/Card";
import { Star, MessageSquare, User } from "lucide-react";

export default function PortfolioReviewsPage() {
  const reviews = [
    {
      id: 1,
      project: "Travel Planner Web",
      user: "Dian P.",
      role: "Senior UI/UX",
      rating: 5,
      comment: "Desainnya sangat bersih dan user-friendly. Alur navigasinya logis.",
      date: "2 hari yang lalu"
    },
    {
      id: 2,
      project: "EcoTrack App",
      user: "Eko R.",
      role: "Backend Lead",
      rating: 4,
      comment: "Integrasi API sudah sangat baik, tinggal optimasi query database.",
      date: "1 minggu yang lalu"
    }
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-slate-800">Ulasan Portofolio</h2>
        <p className="text-sm text-slate-500">Kumpulan feedback dari mentor dan rekan tim untuk proyek Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <Card key={review.id} className="border-none shadow-xl shadow-slate-200/50">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 rounded-full bg-primaryTint/10 flex items-center justify-center text-primaryTint">
                    <User size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-slate-800">{review.user}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{review.role}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={12} 
                      className={i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200"} 
                    />
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <p className="text-xs font-bold text-primaryTint mb-1 uppercase tracking-tight">{review.project}</p>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  "{review.comment}"
                </p>
              </div>

              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase">
                <span className="flex items-center gap-1">
                  <MessageSquare size={12} /> {review.date}
                </span>
                <button className="text-primaryTint hover:underline">Balas Ulasan</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
