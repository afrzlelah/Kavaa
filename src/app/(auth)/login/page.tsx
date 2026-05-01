"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { BsApple, BsGoogle, BsGithub } from "react-icons/bs";
import SocialLogin from "@/components/TataLetak/SocialLogin";
import KavaaBanner from "@/components/Atom/KavaaBanner";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { brandFeatures } from "@/konstanta";
import { createClientClient } from "@/utilitas/supabase/client";
import { Suspense } from "react";

const LoginContent = () => {
  const paramsPencarian = useSearchParams();
  const apakahDemo = paramsPencarian.get("demo") === "true";
  const [tampilkanSandi, setTampilkanSandi] = useState(false);
  const [ingatSaya, setIngatSaya] = useState(false);
  const [slideSaatIni, setSlideSaatIni] = useState(0);
  const [pesanMasuk, setPesanMasuk] = useState<string | null>("");
  
  const [dataMasuk, setDataMasuk] = useState({
    email: "",
    password: "",
  });
  const navigasi = useRouter();

  const tanganiMasukSosial = async (platform: string) => {
    const klienSupabase = createClientClient();
    const penyedia = platform.toLowerCase() as "google" | "github";
    
    if (penyedia !== "google" && penyedia !== "github") {
      alert("Hanya Google dan GitHub yang tersedia saat ini.");
      return;
    }

    const { error } = await klienSupabase.auth.signInWithOAuth({
      provider: penyedia,
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      setPesanMasuk("Gagal masuk dengan " + platform + ": " + error.message);
    }
  };

  const OTENTIKASI = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    if (!email || !password) {
      setTimeout(() => {
        setPesanMasuk("");
      }, 3000);
      setPesanMasuk("Email dan Kata Sandi harus diisi!");
      return;
    }
    try {
      const response = await fetch("/api/auth/credentials/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const hasil = await response.json();

      if (response.ok && hasil.user) {
        navigasi.push(`/dashboard/${hasil.user.id}`);
      } else {
        setTimeout(() => {
          setPesanMasuk("");
        }, 3000);
        setPesanMasuk(
          "Masuk Gagal: " + (hasil.error || "Email atau Kata Sandi Salah"),
        );
      }
    } catch (err) {
      setPesanMasuk("Terjadi kesalahan jaringan.");
    }
  };


  useEffect(() => {
    if (brandFeatures.length <= 1) return;
    
    const pengaturWaktu = setInterval(() => {
      setSlideSaatIni((prev) => (prev + 1) % brandFeatures.length);
    }, 3000);
    return () => clearInterval(pengaturWaktu);
  }, []);

  useEffect(() => {
    if (apakahDemo) {
      OTENTIKASI({ email: "juri@kavaa.id", password: "kavaa2026" });
    }
  }, [apakahDemo]);

  return (
    <div className="min-h-screen w-full flex bg-white font-sans text-slate-900 overflow-hidden">
      {/* SISI KIRI: Form Container */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-16 lg:p-24 justify-between overflow-y-auto">
        <KavaaBanner src="/assets/icon.ico" />

        <div className="xl:max-w-xl max-w-md w-full mx-auto lg:mx-0">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-slate-900">
              Masuk ke Kavaa
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Raih Potensi Terbaikmu Bersama Kami
            </p>
          </div>

          <div className="flex justify-center mb-8 ">
            <SocialLogin
              platforms={["Google", "Github"]}
              onSelectPlatform={tanganiMasukSosial}
              icons={[
                <BsGoogle key="Google" size={18} />,
                <BsGithub key="Github" size={18} />,
              ]}
            />
          </div>


          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-4 text-slate-400 font-medium tracking-wide">
                Atau dengan email
              </span>
            </div>
          </div>

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 ml-1">
                Alamat Email
              </label>
              <input
                type="email"
                onChange={(e) =>
                  setDataMasuk({ ...dataMasuk, email: e.target.value })
                }
                placeholder="pengguna@mail.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primaryTint/20 focus:border-primaryTint transition-all text-sm bg-slate-50/50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 ml-1">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  onChange={(e) =>
                    setDataMasuk({ ...dataMasuk, password: e.target.value })
                  }
                  type={tampilkanSandi ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primaryTint/20 focus:border-primaryTint transition-all text-sm bg-slate-50/50"
                />
                <button
                  type="button"
                  onClick={() => setTampilkanSandi(!tampilkanSandi)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {tampilkanSandi ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                    ingatSaya
                      ? "bg-primaryTint border-primaryTint"
                      : "border-slate-300 group-hover:border-primaryTint"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIngatSaya(!ingatSaya);
                  }}
                >
                  {ingatSaya && (
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="4"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-xs font-semibold text-slate-600 select-none">
                  Ingat saya
                </span>
              </label>
              <a
                href="#"
                className="text-xs font-bold text-primaryTint hover:text-indigo-800"
              >
                Lupa Kata Sandi?
              </a>
            </div>
            <p className="text-red-500  ">{pesanMasuk || " ."}</p>

            <button
              onClick={() => OTENTIKASI(dataMasuk)}
              className="w-full bg-primaryTint text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all"
            >
              Masuk
            </button>

            <button
              type="button"
              onClick={() => OTENTIKASI({ email: "juri@kavaa.id", password: "kavaa2026" })}
              className="w-full bg-white text-primaryTint py-3.5 rounded-xl font-bold border-2 border-primaryTint hover:bg-indigo-50 transition-all flex items-center justify-center gap-2"
            >
              <span className="w-2 h-2 bg-primaryTint rounded-full animate-pulse"></span>
              Masuk sebagai Juri (Demo)
            </button>
          </form>

          <p className="text-center mt-10 text-sm font-medium text-slate-600">
            Belum punya akun?{" "}
            <Link
              href="/register"
              className="text-primaryTint font-bold hover:underline decoration-2 underline-offset-4"
            >
              Daftar
            </Link>
          </p>
        </div>

        <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <a href="#" className="hover:text-slate-600">
            Kebijakan Privasi
          </a>
          <span>Copyright © 2026 Kava</span>
        </div>
      </div>

      {/* SISI KANAN:  */}
      <div className="hidden lg:flex w-1/2 bg-primaryTint p-12 relative flex-col items-center justify-center text-white overflow-hidden">
        {/* Dekorasi Latar Belakang */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>

        {/* Konten Slider dengan Animasi */}
        <div className="relative w-full max-w-md h-[400px] flex items-center justify-center">
          {brandFeatures.map((fitur, index) => (
            <div
              key={fitur.id}
              className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-1000 ease-in-out ${
                index === slideSaatIni
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-12 scale-90 pointer-events-none"
              }`}
            >
              <div className="mb-8 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-4">{fitur.title}</h2>
              <h3 className="text-lg font-medium mb-6 text-indigo-100">
                {fitur.subtitle}
              </h3>
              <p className="text-sm leading-relaxed opacity-70 font-medium px-8">
                {fitur.description}
              </p>
            </div>
          ))}
        </div>

        {/* Slider Pagination Dots (Klik untuk ganti slide) */}
        <div className="flex gap-3 mt-12 z-10">
          {brandFeatures.map((_, index) => (
            <button
              key={index}
              onClick={() => setSlideSaatIni(index)}
              className={`transition-all duration-700 rounded-full h-1.5 ${
                slideSaatIni === index
                  ? "w-10 bg-white"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Ke slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Grid Pattern Decoration */}
        <div className="absolute bottom-12 right-12 opacity-10">
          <div className="grid grid-cols-4 gap-3">
            {[...Array(16)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-white rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const HalamanMasuk = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryTint"></div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
};

export default HalamanMasuk;
