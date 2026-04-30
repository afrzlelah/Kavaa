"use client";

import { useState } from "react";
import { updateUserProfile } from "@/app/(user)/settings/actions";
import { User, Mail, FileText, Link as LinkIcon, Camera, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/shared/ui/Button";
import Image from "next/image";

interface ProfileFormProps {
  user: {
    id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    avatar_url?: string;
    bio?: string;
  };
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    
    if (!user.id) {
      setMessage({ type: "error", text: "Gagal: User ID tidak ditemukan" });
      setIsPending(false);
      return;
    }

    const result = await updateUserProfile(user.id, formData);

    setIsPending(false);
    if (result.success) {
      setMessage({ type: "success", text: "Profil berhasil diperbarui!" });
    } else {
      setMessage({ type: "error", text: "Gagal memperbarui profil: " + result.error });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Avatar Upload Placeholder */}
        <div className="relative group">
          <div className="w-32 h-32 rounded-full bg-slate-100 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center relative">
            {user.avatar_url ? (
              <Image src={user.avatar_url} alt="avatar" fill className="object-cover" />
            ) : (
              <User size={48} className="text-slate-300" />
            )}
          </div>
          <button type="button" className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full border-4 border-white flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all">
            <Camera size={16} />
          </button>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Nama Depan</label>
            <div className="relative">
               <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input 
                 name="firstName"
                 defaultValue={user.first_name}
                 className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                 placeholder="John"
               />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Nama Belakang</label>
            <div className="relative">
               <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input 
                 name="lastName"
                 defaultValue={user.last_name}
                 className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                 placeholder="Doe"
               />
            </div>
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Email (Permanen)</label>
            <div className="relative">
               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
               <input 
                 disabled
                 value={user.email || "user@example.com"}
                 className="w-full pl-10 pr-4 py-3 bg-slate-100 border border-slate-100 rounded-xl text-sm font-bold text-slate-400 cursor-not-allowed"
               />
            </div>
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Bio Singkat</label>
            <div className="relative">
               <FileText className="absolute left-3 top-3 text-slate-400" size={18} />
               <textarea 
                 name="bio"
                 defaultValue={user.bio}
                 rows={3}
                 className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                 placeholder="Ceritakan sedikit tentang dirimu..."
               />
            </div>
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">URL Avatar</label>
            <div className="relative">
               <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input 
                 name="avatarUrl"
                 defaultValue={user.avatar_url}
                 className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                 placeholder="https://images.unsplash.com/..."
               />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        {message && (
          <p className={`text-xs font-bold ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {message.type === 'success' && <Check size={14} className="inline mr-1" />}
            {message.text}
          </p>
        )}
        <Button 
          type="submit" 
          disabled={isPending}
          className="ml-auto px-8 py-3 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
        >
          {isPending ? <Loader2 size={16} className="animate-spin" /> : "Simpan Perubahan"}
        </Button>
      </div>
    </form>
  );
}
