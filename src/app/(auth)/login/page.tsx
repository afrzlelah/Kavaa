"use client";

import { useState } from "react";
import { Apple, Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Data untuk slider/konten di sisi kanan
  const brandFeatures = [
    {
      title: "Platform kolaborasi yang dirancang khusus",
      subtitle:
        "agar bisa belajar, terhubung, dan tumbuh lebih cepat di dunia profesional.",
      description:
        "Kami membantu kamu menentukan target karier dan mendapatkan pengalaman nyata dalam tim. Bangun portofolio profesionalmu lebih awal dan jadilah yang terdepan.",
    },
  ];

  return (
    <div className="min-h-screen w-full flex bg-white font-sans text-slate-900">
      {/* Sisi Kiri: Form Login */}
      <div className="w-full lg:w-1/2 flex flex-col p-8 md:p-16 lg:p-24 justify-between">
        {/* Header / Logo */}
        <div className="flex items-center gap-2 mb-12">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center font-bold text-white">
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-2 h-2 bg-white rounded-sm"></div>
                  <div className="w-2 h-2 bg-white/50 rounded-sm"></div>
                  <div className="w-2 h-2 bg-white/50 rounded-sm"></div>
                  <div className="w-2 h-2 bg-white rounded-sm"></div>
                </div>
              </div>
              <span className="text-2xl font-black text-blue-700 tracking-tighter">
                KAVA
              </span>
            </div>
            <span className="text-[10px] text-blue-500 font-medium ml-1">
              Where Learning Meets Evolution
            </span>
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-md w-full mx-auto lg:mx-0">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">
              Sign in to Kava
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Raih Potensi Terbaikmu Bersama Kami
            </p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
              <Apple className="w-4 h-4" />
              Sign in with Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 px-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
              <svg
                className="w-4 h-4"
                viewBox="0 0 384 512"
                fill="currentColor"
              >
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 21.8-88.5 21.8-14.7 0-51.4-22.2-84.9-22.2-41.4 0-100.2 24.5-125.7 75.3-26.5 52-21 127.3 12.3 203.4 16.8 38.3 43.1 82 82.6 82 35.3 0 46.2-25.6 94.6-25.6 47.9 0 58.6 25.6 96.6 25.6 39.1 0 63.7-39.2 79.5-74.8 17.6-40.4 23.3-64.3 23.6-66.2-.8-.2-69.5-27-69.8-114.8zm-60.7-184.2c20.3-25.2 18.9-52.1 18.9-52.1-24.1 2.3-48.4 17.3-60.7 34.1-13.8 18.8-18.1 44.5-18.1 44.5 25.4 0 42.6-9.9 59.9-26.5z" />
              </svg>
              Sign in with Apple
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-4 text-slate-400 font-medium">
                Or with email
              </span>
            </div>
          </div>

          {/* Login Form */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <input
                type="email"
                placeholder="rizalabraka@mail.com"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              />
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="•••••"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${rememberMe ? "bg-blue-600 border-blue-600" : "border-slate-300 group-hover:border-blue-400"}`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  {rememberMe && (
                    <div className="w-1.5 h-2.5 border-r-2 border-bottom-2 border-white rotate-45 mb-1"></div>
                  )}
                </div>
                <span className="text-xs font-semibold text-slate-600">
                  Remember me
                </span>
              </label>
              <a
                href="#"
                className="text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                Forgot Password?
              </a>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all">
              Sign In
            </button>
          </form>

          <p className="text-center mt-8 text-sm font-medium text-slate-600">
            Don&apos;t have an account?{" "}
            <a href="#" className="text-slate-900 font-bold hover:underline">
              Sign Up
            </a>
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-100 text-[10px] font-medium text-slate-400">
          <a href="#" className="hover:text-slate-600">
            Privacy Policy
          </a>
          <span>Copyright by kava2026</span>
        </div>
      </div>

      {/* Sisi Kanan: Visual/Info (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-blue-600 p-12 relative flex-col items-center justify-center text-white overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48"></div>

        <div className="max-w-md text-center z-10">
          <h2 className="text-xl font-bold mb-4">{brandFeatures[0].title}</h2>
          <h3 className="text-xl font-bold mb-6">
            {brandFeatures[0].subtitle}
          </h3>
          <p className="text-sm leading-relaxed opacity-80 font-medium">
            {brandFeatures[0].description}
          </p>
        </div>

        {/* Slider Pagination Dots */}
        <div className="flex gap-2 mt-12 z-10">
          <div className="w-2 h-2 rounded-full bg-white"></div>
          <div className="w-2 h-2 rounded-full bg-white/30"></div>
        </div>

        {/* Grid Pattern in Corner */}
        <div className="absolute bottom-10 right-10 opacity-20">
          <div className="grid grid-cols-3 gap-2">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 bg-white rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
