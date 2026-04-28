"use client";

import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { BsApple, BsGoogle, BsGithub } from "react-icons/bs";
import SocialLogin from "@/components/layouts/SocialLogin";
import KavaaBanner from "@/components/Atom/KavaaBanner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { brandFeatures } from "@/constants";
import { createClientClient } from "@/utils/supabase/client";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [messageLogin, setMessageLogin] = useState<string | null>("");
  // data
  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  const route = useRouter();

  const handleSocialLogin = async (platform: string) => {
    const supabase = createClientClient();
    const provider = platform.toLowerCase() as "google" | "github";
    
    if (provider !== "google" && provider !== "github") {
      alert("Hanya Google dan GitHub yang tersedia saat ini.");
      return;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      setMessageLogin("Gagal login dengan " + platform + ": " + error.message);
    }
  };

  // AUTH
  const AUTH = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    if (!email || !password) {
      setTimeout(() => {
        setMessageLogin("");
      }, 3000);
      setMessageLogin("Email dan Password harus diisi!");
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

      const result = await response.json();

      if (response.ok && result.user) {
        route.push(`/dashboard/${result.user.id}`);
      } else {
        setTimeout(() => {
          setMessageLogin("");
        }, 3000);
        setMessageLogin(
          "Login Gagal: " + (result.error || "Kata Sandi atau Email Salah"),
        );
      }
    } catch (err) {
      setMessageLogin("Terjadi kesalahan jaringan.");
    }
  };


  // Efek untuk auto-scroll saben 3 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === brandFeatures.length - 1 ? 0 : prev + 1,
      );
    }, 3000);
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

          <div className="flex justify-center mb-8 ">
            <SocialLogin
              platforms={["Google", "Github"]}
              onSelectPlatform={handleSocialLogin}
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
                Email Address
              </label>
              <input
                type="email"
                onChange={(e) =>
                  setDataLogin({ ...dataLogin, email: e.target.value })
                }
                placeholder="rizalabraka@mail.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primaryTint/20 focus:border-primaryTint transition-all text-sm bg-slate-50/50"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 ml-1">
                Password
              </label>
              <div className="relative">
                <input
                  onChange={(e) =>
                    setDataLogin({ ...dataLogin, password: e.target.value })
                  }
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primaryTint/20 focus:border-primaryTint transition-all text-sm bg-slate-50/50"
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
                      ? "bg-primaryTint border-primaryTint"
                      : "border-slate-300 group-hover:border-primaryTint"
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
                className="text-xs font-bold text-primaryTint hover:text-indigo-800"
              >
                Forgot Password?
              </a>
            </div>
            <p className="text-red-500  ">{messageLogin || " ."}</p>

            <button
              onClick={() => AUTH(dataLogin)}
              className="w-full bg-primaryTint text-white py-3.5 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all"
            >
              Masuk
            </button>
          </form>

          <p className="text-center mt-10 text-sm font-medium text-slate-600">
            Don&apos;t have an account?{" "}
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
            Privacy Policy
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
