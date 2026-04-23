import { yourMentorsList } from "@/constants";
import { Bell, Mail, MessageSquare, MoreVertical, Plus } from "lucide-react";

export default function SidebarKanan() {
  return (
    <aside className="hidden xl:flex w-80 flex-col bg-white border-l border-slate-100 h-full overflow-y-auto px-6 py-8 z-20">
      {/* Header Profil */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-bold text-slate-900">Profil Anda</h2>
        <button className="text-slate-400 hover:text-slate-600">
          <MoreVertical size={20} />
        </button>
      </div>

      {/* Info Profil */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative w-28 h-28 mb-4">
          {/* Lingkaran Progress Semu menggunakan Tailwind */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-600 via-blue-400 to-slate-100 p-1">
            <div className="w-full h-full bg-white rounded-full p-1">
              <img
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop&q=80"
                alt="Profil"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
          {/* Titik indikator kecil di atas */}
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-blue-600 border-2 border-white rounded-full"></div>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          Selamat Pagi APIIP
        </h3>
        <p className="text-[11px] font-medium text-slate-400 text-center px-4 leading-relaxed">
          Lanjutkan Perjalanan Anda Dan Capai Target Anda
        </p>
      </div>

      {/* Tombol Aksi Cepat */}
      <div className="flex items-center justify-center gap-4 mb-10">
        <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
          <Bell size={18} />
        </button>
        <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
          <MessageSquare size={18} />
        </button>
        <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
          <Mail size={18} />
        </button>
      </div>

      {/* Grafik Aktivitas (Ilustrasi) */}
      <div className="flex items-end justify-between h-24 mb-10 px-2">
        {/* Batang Grafik Tiruan */}
        <div className="w-8 h-[40%] bg-blue-100 flex flex-col justify-end rounded-t-sm">
          <div className="w-full h-1/2 bg-blue-500 rounded-t-sm"></div>
        </div>
        <div className="w-8 h-[60%] bg-blue-100 flex flex-col justify-end rounded-t-sm">
          <div className="w-full h-2/3 bg-blue-500 rounded-t-sm"></div>
        </div>
        <div className="w-8 h-[80%] bg-blue-100 flex flex-col justify-end rounded-t-sm">
          <div className="w-full h-1/2 bg-blue-500 rounded-t-sm"></div>
        </div>
        <div className="w-8 h-[100%] bg-blue-100 flex flex-col justify-end rounded-t-sm">
          <div className="w-full h-3/4 bg-blue-500 rounded-t-sm"></div>
        </div>
        <div className="w-8 h-[70%] bg-blue-100 flex flex-col justify-end rounded-t-sm">
          <div className="w-full h-1/2 bg-blue-500 rounded-t-sm"></div>
        </div>
      </div>

      {/* Daftar Mentor Anda di Kanan */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-bold text-slate-900">Mentor Anda</h2>
          <button className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50">
            <Plus size={14} />
          </button>
        </div>

        <div className="flex flex-col gap-5 flex-1">
          {yourMentorsList.map((mentor, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={mentor.avatar}
                  alt={mentor.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-800">
                    {mentor.name}
                  </span>
                  <span className="text-[9px] font-medium text-slate-400">
                    {mentor.role}
                  </span>
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold px-4 py-1.5 rounded-full transition-colors">
                Ikuti
              </button>
            </div>
          ))}
        </div>

        <button className="w-full mt-6 py-3 bg-blue-50 hover:bg-blue-100 text-blue-600 text-sm font-bold rounded-xl transition-colors">
          Lihat Semua
        </button>
      </div>
    </aside>
  );
}
