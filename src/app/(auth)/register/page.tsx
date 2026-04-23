"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { ChevronRight, Star } from "lucide-react";
import KavaaBanner from "@/components/Atom/KavaaBanner";
import Link from "next/link";
import { FormData } from "@/type";

const RegisterPage: React.FC = () => {
  // Inisialisasi state dengan tipe data yang sudah didefinisikan
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    phone: "",
    password: "",
  });

  // Handler untuk perubahan input dengan tipe event yang spesifik
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
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
            Let&apos;s <br />
            Improve <br />
            Your Skills
          </h1>
          <p className="text-blue-100 text-lg max-w-xs leading-relaxed opacity-80">
            a solution for you to improve your skills and gain experience
            working in a team
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="mt-12 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl relative z-10 shadow-2xl">
          <p className="font-semibold text-lg mb-2 italic">
            &quot;Solusi terbaik buat yang mau stress&quot;
          </p>
          <p className="text-sm text-blue-50 leading-relaxed mb-6 opacity-90">
            Berhasil menyelesaikan proyek bareng tim lewat platform ini.
            Pengalamannya bener-benar mirip dengan lingkungan kerja profesional.
            Sangat merekomendasikan!
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center font-bold text-[10px] uppercase shadow-inner tracking-tighter"></div>
              <div>
                <p className="text-sm font-bold">Apip Alay kyubi rawwrr</p>
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
            Let&apos;s get started
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* First & Last Name Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-500 ml-1">
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="e.g. John"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-500 ml-1">
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="e.g. Doe"
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
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
              />
            </div>

            {/* Country & State */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-500 ml-1">
                  Country of residence
                </label>
                <div className="relative">
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option value="">Select country</option>
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
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="e.g. Central Java"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500 ml-1">
                Phone number
              </label>
              <div className="relative flex items-center">
                {/* <div className="absolute left-4 flex items-center gap-2 pointer-events-none border-r pr-3 border-slate-200">
                  <span className="text-lg">🇮🇩</span>
                </div> */}
                <input
                  type="tel"
                  name="phone"
                  placeholder="+6281234567891"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-5  py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-500 ml-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#1D61D8] hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] mt-8 group"
            >
              Daftar
              <ChevronRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
            <Link
              href="/login"
              className="text-sm text-primaryTint/80 hover:text-primaryTint transition-colors"
            >
              Already have an account? Sign in
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
