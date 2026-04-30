import React from "react";
import { Star } from "lucide-react";

export default function ReviewsPage() {
  return (
    <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mb-6">
        <Star size={40} />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Ulasan Portofolio</h2>
      <p className="text-slate-500 max-w-md mx-auto">
        Lihat apa yang orang lain katakan tentang kolaborasi Anda. Fitur ulasan akan membantu meningkatkan kredibilitas Anda di komunitas!
      </p>
    </div>
  );
}
