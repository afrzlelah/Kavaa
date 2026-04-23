"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff, Apple } from "lucide-react";
import { BsApple, BsGoogle } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import SocialLogin from "@/components/layouts/SocialLogin";
import KavaaBanner from "@/components/Atom/KavaaBanner";

/**
 * KOMPONEN INTERNAL (Mencegah error unresolved path)
 * Kita satukan komponen pendukung agar file ini bersifat mandiri (self-contained).
 */

// Komponen Banner/Logo Kavaa

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // State untuk mengontrol slide aktif di sisi kanan
  const [currentSlide, setCurrentSlide] = useState(0);

  const brandFeatures = [
    {
      id: 1,
      title: "Platform kolaborasi yang dirancang khusus",
      subtitle:
        "agar bisa belajar, terhubung, dan tumbuh lebih cepat di dunia profesional.",
      description:
        "Kami membantu kamu menentukan target karier dan mendapatkan pengalaman nyata dalam tim. Bangun portofolio profesionalmu lebih awal dan jadilah yang terdepan.",
    },
    {
      id: 2,
      title: "Asah Skill Secara Nyata",
      subtitle: "bekerja dalam tim menyelesaikan tantangan industri.",
      description:
        "Bukan sekadar teori, di sini kamu akan mengerjakan proyek yang memberikan dampak nyata bagi portofoliomu.",
    },
    {
      id: 3,
      title: "Bangun Portofolio Profesional",
      subtitle: "tunjukkan keahlianmu kepada dunia industri.",
      description:
        "Kerjakan proyek riil bersama tim dan dokumentasikan setiap pencapaianmu di sini.",
    },
    {
      id: 4,
      title: "Koneksi Tanpa Batas",
      subtitle: "temukan mentor dan rekan kerja yang sefrekuensi.",
      description:
        "Perluas jaringan profesionalmu sejak dini untuk masa depan yang lebih cerah.",
    },
  ];

  // Efek untuk auto-scroll slider setiap 5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === brandFeatures.length - 1 ? 0 : prev + 1,
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [brandFeatures.length]);

  return (
    <div className="min-h-screen w-full flex bg-white font-sans text-slate-900 overflow-hidden">
      {/* SISI KIRI: Form Container */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-16 lg:p-24 justify-between overflow-y-auto">
        <KavaaBanner src="/assets/icon.ico" />

        <div className="xl:max-w-xl max-w-md w-full mx-auto lg:mx-0">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl font-bold text-slate-900">
              Sign in to Kava
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Raih Potensi Terbaikmu Bersama Kami
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <SocialLogin
              platforms={["Apple", "Google", "Facebook"]}
              icons={[
                <BsApple key="Apple" size={18} />,
                <BsGoogle key="Google" size={18} />,
                <FaFacebook key="Facebook" size={18} />,
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
                Email Address
              </label>
              <input
                type="email"
                placeholder="rizalabraka@mail.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm bg-slate-50/50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm bg-slate-50/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                    rememberMe
                      ? "bg-indigo-600 border-indigo-600"
                      : "border-slate-300 group-hover:border-indigo-500"
                  }`}
                  onClick={() => setRememberMe(!rememberMe)}
                >
                  {rememberMe && (
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
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                Forgot Password?
              </a>
            </div>

            <button className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all">
              Masuk
            </button>
          </form>

          <p className="text-center mt-10 text-sm font-medium text-slate-600">
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="text-indigo-600 font-bold hover:underline decoration-2 underline-offset-4"
            >
              Daftar
            </a>
          </p>
        </div>

        <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <a href="#" className="hover:text-slate-600">
            Privacy Policy
          </a>
          <span>Copyright © 2026 Kava</span>
        </div>
      </div>

      {/* SISI KANAN: Visual Slider (Hanya bagian ini yang berganti-ganti) */}
      <div className="hidden lg:flex w-1/2 bg-indigo-600 p-12 relative flex-col items-center justify-center text-white overflow-hidden">
        {/* Dekorasi Latar Belakang */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>

        {/* Konten Slider dengan Animasi */}
        <div className="relative w-full max-w-md h-[400px] flex items-center justify-center">
          {brandFeatures.map((feature, index) => (
            <div
              key={feature.id}
              className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-1000 ease-in-out ${
                index === currentSlide
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
              <h2 className="text-2xl font-bold mb-4">{feature.title}</h2>
              <h3 className="text-lg font-medium mb-6 text-indigo-100">
                {feature.subtitle}
              </h3>
              <p className="text-sm leading-relaxed opacity-70 font-medium px-8">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Slider Pagination Dots (Klik untuk ganti slide) */}
        <div className="flex gap-3 mt-12 z-10">
          {brandFeatures.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-700 rounded-full h-1.5 ${
                currentSlide === index
                  ? "w-10 bg-white"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
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

export default LoginPage;
