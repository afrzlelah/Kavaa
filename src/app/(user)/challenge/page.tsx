import { getChallenges } from "@/services/challengeService";
import { Card } from "@/components/shared/ui/Card";
import { Button } from "@/components/shared/ui/Button";
import { Target, Clock, Users, Trophy } from "lucide-react";
import type { Challenge } from "@/types";

const DIFFICULTY_COLOR: Record<string, string> = {
  Mudah: "text-emerald-600 bg-emerald-50",
  Menengah: "text-amber-600 bg-amber-50",
  Sulit: "text-red-600 bg-red-50",
};

const FALLBACK_CHALLENGES = [
  { id: 1, title: "Build a REST API", category: "Backend", difficulty: "Menengah", participants: 340, deadline: "5 hari lagi", reward: "500 XP", description: "Bangun REST API yang aman menggunakan Node.js dan Supabase." },
  { id: 2, title: "UI Clone: Spotify", category: "Frontend", difficulty: "Mudah", participants: 870, deadline: "3 hari lagi", reward: "250 XP", description: "Buat clone tampilan Spotify menggunakan React dan Tailwind CSS." },
  { id: 3, title: "ML Sentiment Analysis", category: "Data Science", difficulty: "Sulit", participants: 120, deadline: "10 hari lagi", reward: "1000 XP", description: "Latih model analisis sentimen dengan dataset review produk." },
  { id: 4, title: "Mobile App Prototype", category: "Mobile", difficulty: "Menengah", participants: 215, deadline: "7 hari lagi", reward: "750 XP", description: "Buat prototipe aplikasi mobile untuk manajemen keuangan pribadi." },
];

export default async function Challenge() {
  let challenges = await getChallenges();

  if (!challenges || challenges.length === 0) {
    challenges = FALLBACK_CHALLENGES;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto h-full overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Arena Tantangan</h1>
          <p className="text-slate-500">Asah kemampuanmu dengan tantangan dari komunitas dan mentor.</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50 text-amber-700 border border-amber-200 px-4 py-2 rounded-xl">
          <Trophy size={16} />
          <span className="text-sm font-bold">Total XP Anda: 1,250</span>
        </div>
      </div>

      {/* Stats Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Tantangan Aktif", value: challenges.length, icon: Target, color: "text-blue-600 bg-blue-50" },
          { label: "Diikuti", value: "3", icon: Users, color: "text-emerald-600 bg-emerald-50" },
          { label: "Diselesaikan", value: "12", icon: Trophy, color: "text-amber-600 bg-amber-50" },
          { label: "Rata-rata Waktu", value: "4 hari", icon: Clock, color: "text-purple-600 bg-purple-50" },
        ].map((s) => (
          <Card key={s.label} className="flex items-center gap-3 p-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${s.color}`}>
              <s.icon size={18} />
            </div>
            <div>
              <p className="text-xl font-bold text-slate-800">{s.value}</p>
              <p className="text-xs text-slate-500 font-medium">{s.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Challenge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {challenges.map((challenge: Challenge) => {
          const diffClass = DIFFICULTY_COLOR[challenge.difficulty] ?? "text-slate-600 bg-slate-100";
          return (
            <Card key={challenge.id} className="flex flex-col hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md">
                  {challenge.category?.toUpperCase() || "UMUM"}
                </span>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${diffClass}`}>
                  {challenge.difficulty || "Menengah"}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-800 mb-2 leading-tight">{challenge.title}</h3>
              <p className="text-xs text-slate-500 mb-4 flex-1 leading-relaxed">{challenge.description || "Ikuti tantangan ini dan buktikan kemampuanmu."}</p>

              <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pt-4 border-t border-slate-50">
                <span className="flex items-center gap-1"><Users size={12} /> {challenge.participants || 0} peserta</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {challenge.deadline || "N/A"}</span>
                <span className="flex items-center gap-1 text-amber-600 font-bold"><Trophy size={12} /> {challenge.reward || "XP"}</span>
              </div>

              <Button className="w-full" size="sm">Ikuti Tantangan</Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
