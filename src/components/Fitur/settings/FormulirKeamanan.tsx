"use client";

import { useState } from "react";
import { updatePassword } from "@/app/(user)/settings/actions";
import { Lock, ShieldCheck, AlertCircle, Loader2, Check } from "lucide-react";
import { Button } from "@/components/Bersama/ui/Button";

export function FormulirKeamanan() {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setMessage(null);

    const formData = new FormData(event.currentTarget);
    const result = await updatePassword(formData);

    setIsPending(false);
    if (result.success) {
      setMessage({ type: "success", text: "Kata sandi berhasil diubah!" });
      event.currentTarget.reset();
    } else {
      setMessage({ type: "error", text: result.error || "Gagal mengubah kata sandi" });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 mb-6">
        <ShieldCheck size={20} className="text-primary mt-1" />
        <div>
          <h4 className="text-sm font-bold text-slate-800">Keamanan Akun</h4>
          <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
            Gunakan kata sandi yang kuat dengan kombinasi huruf, angka, dan simbol untuk melindungi akun Anda.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Kata Sandi Baru</label>
          <div className="relative">
             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
             <input 
               name="password"
               type="password"
               required
               className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
               placeholder="••••••••"
             />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Konfirmasi Kata Sandi Baru</label>
          <div className="relative">
             <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
             <input 
               name="confirmPassword"
               type="password"
               required
               className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
               placeholder="••••••••"
             />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        {message && (
          <p className={`text-xs font-bold flex items-center gap-1 ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {message.type === 'success' ? <Check size={14} /> : <AlertCircle size={14} />}
            {message.text}
          </p>
        )}
        <Button 
          type="submit" 
          disabled={isPending}
          className="ml-auto px-8 py-3 bg-primary text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
        >
          {isPending ? <Loader2 size={16} className="animate-spin" /> : "Update Kata Sandi"}
        </Button>
      </div>
    </form>
  );
}
