"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { ChevronRight, Star } from "lucide-react";
import KavaaBanner from "@/components/Atom/KavaaBanner";
import Link from "next/link";

interface DataFormulir {
  first_name?: string;
  last_name?: string;
  email?: string;
  country?: string;
  state?: string;
  phone?: string;
  password?: string;
}

const HalamanDaftar: React.FC = () => {
  const [pesanDaftar, setPesanDaftar] = useState<string>("");
  const [dataFormulir, setDataFormulir] = useState<DataFormulir>({
    first_name: "",
    last_name: "",
    email: "",
    country: "",
    state: "",
    phone: "",
    password: "",
  });

  const [sedangMemuat, setSedangMemuat] = useState(false);
  const [apakahBerhasil, setApakahBerhasil] = useState(false);

  const tanganiPerubahan = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setDataFormulir((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const tanganiSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!dataFormulir.first_name || !dataFormulir.last_name) {
      setPesanDaftar("Nama depan dan belakang wajib diisi.");
      return;
    }

    if (!dataFormulir.password || dataFormulir.password.length < 6) {
      setPesanDaftar("Kata sandi minimal 6 karakter.");
      return;
    }

    setSedangMemuat(true);
    setPesanDaftar("");
    
    try {
      const response = await fetch("/api/auth/credentials/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataFormulir),
      });

      const hasil = await response.json();

      if (!response.ok) {
        setPesanDaftar(hasil.error || "Pendaftaran gagal");
        return;
      }

      setApakahBerhasil(true);
      setPesanDaftar(hasil.message || "Pendaftaran berhasil!");
      
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      setPesanDaftar("Terjadi kesalahan jaringan.");
    } finally {
      setSedangMemuat(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans text-slate-800 antialiased bg-white">
      {/* Sisi Kiri - Branding & Testimonial */}
      <div className="w-full md:w-[40%] bg-[#1D61D8] p-8 md:p-12 flex flex-col justify-between text-white relative overflow-hidden">
        {/* Background Decorative Circles */}
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

        <div>
          {/* Logo */}
          <KavaaBanner color="white" src="/assets/icon.ico" />

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6">
            Ayo <br />
            Tingkatkan <br />
            Keahlianmu
          </h1>
          <p className="text-blue-100 text-lg max-w-xs leading-relaxed opacity-80">
            solusi bagi Anda untuk meningkatkan keterampilan dan pengalaman
            bekerja dalam tim
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="mt-12 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl relative z-10 shadow-2xl">
          <p className="font-semibold text-lg mb-2 italic">
            &quot;Solusi terbaik buat yang mau berkembang&quot;
          </p>
          <p className="text-sm text-blue-50 leading-relaxed mb-6 opacity-90">
            Berhasil menyelesaikan proyek bareng tim lewat platform ini.
            Pengalamannya benar-benar mirip dengan lingkungan kerja profesional.
            Sangat merekomendasikan!
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center font-bold text-[10px] uppercase shadow-inner tracking-tighter"></div>
              <div>
                <p className="text-sm font-bold">Afrizal Abraka</p>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Pagination Dots */}
        <div className="flex gap-3 mt-12 self-center md:self-start">
          <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-white/30 rounded-full"></div>
          <div className="w-2.5 h-2.5 bg-white/30 rounded-full"></div>
        </div>
      </div>

      {/* Sisi Kanan - Form */}
      <div className="w-full md:w-[60%] p-8 md:p-16 lg:p-24 flex flex-col justify-center">
        {/* Top Progress Stepper */}
        <div className="flex items-center justify-between mb-12 max-w-md mx-auto md:mx-0 w-full">
          <div className="flex gap-4">
            <div className="w-3 h-3 rounded-full bg-[#1D61D8]"></div>
            <div className="w-3 h-3 rounded-full bg-blue-100"></div>
            <div className="w-3 h-3 rounded-full bg-blue-100"></div>
            <div className="w-3 h-3 rounded-full bg-blue-100"></div>
          </div>
          <div className="h-px flex-1 ml-6 bg-slate-200"></div>
        </div>

        <div className="max-w-xl mx-auto md:mx-0 w-full">
          <h2 className="text-3xl font-bold mb-10 tracking-tight text-slate-900">
            Mulai Sekarang
          </h2>

          <form className="space-y-6" onSubmit={tanganiSubmit}>
            {/* First & Last Name Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-500 ml-1">
                  Nama Depan
                </label>
                <input
                  required
                  type="text"
                  name="first_name"
                  value={dataFormulir.first_name}
                  onChange={tanganiPerubahan}
                  placeholder="misal: John"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-500 ml-1">
                  Nama Belakang
                </label>
                <input
                  required
                  type="text"
                  name="last_name"
                  value={dataFormulir.last_name}
                  onChange={tanganiPerubahan}
                  placeholder="misal: Doe"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500 ml-1">
                Email
              </label>
              <input
                required
                type="email"
                name="email"
                value={dataFormulir.email}
                onChange={tanganiPerubahan}
                placeholder="nama@email.com"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
              />
            </div>

            {/* Country & State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-500 ml-1">
                  Negara Domisili
                </label>
                <div className="relative">
                  <select
                    required
                    name="country"
                    value={dataFormulir.country}
                    onChange={tanganiPerubahan}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option value="">Pilih negara</option>
                    <option value="ID">Indonesia</option>
                    <option value="MY">Malaysia</option>
                    <option value="SG">Singapore</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                    <ChevronRight size={18} className="rotate-90" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-500 ml-1">
                  Provinsi
                </label>
                <input
                  required
                  type="text"
                  name="state"
                  value={dataFormulir.state}
                  onChange={tanganiPerubahan}
                  placeholder="misal: Jawa Tengah"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500 ml-1">
                Nomor Telepon
              </label>
              <div className="relative flex items-center">
                <input
                  type="tel"
                  name="phone"
                  placeholder="+6281234567891"
                  value={dataFormulir.phone}
                  onChange={tanganiPerubahan}
                  required
                  className="w-full pl-5  py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500 ml-1">
                Kata Sandi
              </label>
              <input
                type="password"
                name="password"
                value={dataFormulir.password}
                onChange={tanganiPerubahan}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
              />
            </div>
            <p className="text-red-600">{pesanDaftar}</p>

            {/* Submit Button */}
            <button
              disabled={sedangMemuat || apakahBerhasil}
              type="submit"
              className={`w-full ${apakahBerhasil ? "bg-green-600" : "bg-[#1D61D8] hover:bg-blue-700"} text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] mt-8 group disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {sedangMemuat ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </span>
              ) : apakahBerhasil ? (
                "Berhasil!"
              ) : (
                <>
                  Daftar
                  <ChevronRight
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </button>

            <Link
              href="/login"
              className="text-sm text-primaryTint/80 hover:text-primaryTint transition-colors"
            >
              Sudah punya akun? Masuk
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HalamanDaftar;
