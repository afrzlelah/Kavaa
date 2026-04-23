import React from "react";
import { Globe, MessageSquare } from "lucide-react";

export default function FooterHome() {
  return (
    <footer className="bg-white pt-16 md:pt-24 pb-8 border-t border-slate-200">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:grid-cols-5 gap-10 md:gap-8 mb-16">
          <div className="sm:col-span-2">
            <a
              href="#"
              className="flex items-center gap-2 mb-6"
              aria-label="Beranda Kavaa"
            >
              <div className="w-10 h-10 rounded-full bg-primaryTint flex items-center justify-center font-bold text-xl text-white shadow-md">
                K
              </div>
              <span className="text-2xl font-black text-slate-900 tracking-tight">
                Kavaa
              </span>
            </a>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 max-w-sm font-medium">
              Platform pembelajaran premium untuk profesional yang berfokus pada
              evolusi karier melalui jalur belajar yang dipersonalisasi dan
              tervalidasi industri.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-indigo-50 hover:text-primaryTint hover:border-indigo-200 transition-all"
              >
                <Globe size={18} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-indigo-50 hover:text-primaryTint hover:border-indigo-200 transition-all"
              >
                <MessageSquare size={18} />
              </a>
            </div>
          </div>

          <nav aria-label="Tautan Kavaa">
            <h4 className="font-black text-base mb-6 text-slate-900 uppercase tracking-wider">
              Kavaa
            </h4>
            <ul className="flex flex-col gap-4 text-sm font-semibold text-slate-500">
              <li>
                <a
                  href="#"
                  className="hover:text-primaryTint transition-colors"
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primaryTint transition-colors"
                >
                  Karier
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primaryTint transition-colors"
                >
                  Blog & Artikel
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primaryTint transition-colors"
                >
                  Hubungi Kami
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Tautan Belajar">
            <h4 className="font-black text-base mb-6 text-slate-900 uppercase tracking-wider">
              Belajar
            </h4>
            <ul className="flex flex-col gap-4 text-sm font-semibold text-slate-500">
              <li>
                <a
                  href="#"
                  className="hover:text-primaryTint transition-colors"
                >
                  Semua Kursus
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primaryTint transition-colors"
                >
                  Sertifikasi Profesional
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primaryTint transition-colors"
                >
                  Kavaa Live Sessions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primaryTint transition-colors"
                >
                  Kavaa untuk Bisnis
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Tautan Bantuan">
            <h4 className="font-black text-base mb-6 text-slate-900 uppercase tracking-wider">
              Bantuan
            </h4>
            <ul className="flex flex-col gap-4 text-sm font-semibold text-slate-500">
              <li>
                <a
                  href="#"
                  className="hover:text-primaryTint transition-colors"
                >
                  Pusat Bantuan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primaryTint transition-colors"
                >
                  Syarat & Ketentuan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primaryTint transition-colors"
                >
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primaryTint transition-colors"
                >
                  Peta Situs
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between text-sm font-semibold text-slate-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Kavaa Inc. Hak Cipta Dilindungi.
          </p>
          <div className="flex items-center gap-6">
            <button
              aria-label="Ubah Bahasa"
              className="flex items-center gap-2 hover:text-slate-700 transition-colors bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200"
            >
              <Globe size={16} /> Indonesia (ID)
            </button>
            <button
              aria-label="Ubah Mata Uang"
              className="hover:text-slate-700 transition-colors font-bold"
            >
              IDR (Rp)
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
