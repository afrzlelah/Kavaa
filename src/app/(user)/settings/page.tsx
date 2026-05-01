import { createClient } from "@/utilitas/supabase/server";
import { cookies } from "next/headers";
import { FormulirProfil } from "@/components/Fitur/settings/FormulirProfil";
import { FormulirKeamanan } from "@/components/Fitur/settings/FormulirKeamanan";
import { Settings as SettingsIcon, User, Shield, Bell, Palette } from "lucide-react";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: { user: authUser } } = await supabase.auth.getUser();

  if (!authUser) {
    redirect("/login");
  }

  // Fetch full user profile
  const { data: userProfile } = await supabase
    .from("users")
    .select("*")
    .eq("id", authUser.id)
    .single();

  const userWithEmail = {
    ...userProfile,
    email: authUser.email,
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#F8FAFC] px-4 md:px-8 py-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm border border-slate-100">
          <SettingsIcon size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase leading-none mb-1">Pengaturan</h1>
          <p className="text-xs font-bold text-slate-400">Kelola profil, keamanan, dan preferensi akun Anda.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar (Vertical Tabs) */}
        <div className="lg:col-span-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-black text-primary shadow-sm transition-all text-left">
            <User size={18} />
            PROFIL SAYA
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-50 rounded-2xl text-sm font-bold transition-all text-left">
            <Shield size={18} />
            KEAMANAN
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-50 rounded-2xl text-sm font-bold transition-all text-left">
            <Bell size={18} />
            NOTIFIKASI
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-50 rounded-2xl text-sm font-bold transition-all text-left">
            <Palette size={18} />
            TAMPILAN
          </button>
        </div>

        {/* Settings Content Area */}
        <div className="lg:col-span-3 space-y-8">
          {/* Profile Section */}
          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
            <div className="mb-8">
              <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-1">Profil Saya</h2>
              <p className="text-xs font-bold text-slate-400">Perbarui informasi dasar dan identitas visual Anda.</p>
            </div>
            <FormulirProfil user={userWithEmail} />
          </div>

          {/* Security Section */}
          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
            <div className="mb-8">
              <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-1">Keamanan & Password</h2>
              <p className="text-xs font-bold text-slate-400">Pastikan akun Anda tetap aman dengan kredensial terbaru.</p>
            </div>
            <FormulirKeamanan />
          </div>
        </div>
      </div>
    </div>
  );
}
