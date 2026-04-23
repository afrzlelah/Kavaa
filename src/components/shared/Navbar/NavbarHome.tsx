"use client";

import { useState } from "react";
import { Menu, X, Search, Bell } from "lucide-react";

import { NavProps } from "@/type";
import Link from "next/link";
import ButtonNonColorLink from "@/components/Atom/ButtonNonColorLink";
import ButtonColorLink from "@/components/Atom/ButtonColorLink";
import BtnFullWidthNonColorLink from "@/components/Atom/BtnFullWidthNonColorLink";
import BtnFullWidthColorLink from "@/components/Atom/BtnFullWidthColorLink";
import Image from "next/image";

export default function NavbarHome({ lists, isLive }: NavProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="bg-white/60 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-100 shadow-sm">
      <nav className="container mx-auto px-4 md:px-12 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 cursor-pointer"
            aria-label="Beranda Kavaa"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primaryTint flex items-center justify-center font-bold text-lg md:text-xl text-white shadow-md">
              <Image
                src={"/assets/icon.ico"}
                height={250}
                width={250}
                alt="Logo Kavaa"
                className="w-full rounded-full"
              />
            </div>
            <span className="text-xl md:text-2xl font-bold text-primaryTint tracking-tight">
              Kavaa
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {lists?.map((list, index) => (
              <Link
                key={index}
                href={list.href}
                className="text-sm font-semibold text-slate-600 hover:text-primaryTint transition-colors"
              >
                {list.label}
              </Link>
            ))}
            {isLive && (
              <a
                href="#live"
                className="text-sm font-bold text-red-500 flex items-center gap-1.5 hover:text-red-600 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                Kavaa Live
              </a>
            )}
          </div>

          {/* Search button (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="relative group">
              <input
                type="search"
                placeholder="Cari kursus..."
                aria-label="Cari kursus"
                className="pl-10 pr-4 py-2 w-64 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primaryTint focus:bg-white outline-none transition-all group-hover:border-primaryTint"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-primaryTint transition-colors"
                size={18}
              />
            </div>
            <button
              aria-label="Notifikasi"
              className="text-slate-500 hover:text-primaryTint p-2 rounded-full hover:bg-slate-100 transition-all"
            >
              <Bell size={20} />
            </button>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-4">
              <ButtonNonColorLink name="Masuk" href="/login" />
              <ButtonColorLink name="Daftar" href="/register" />
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-slate-600 hover:text-primaryTint p-2 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl py-6 px-6 flex flex-col gap-4 z-50 animate-in slide-in-from-top-2">
            <div className="relative mb-2">
              <input
                type="search"
                placeholder="Cari kursus..."
                className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primaryTint outline-none"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
            </div>
            {lists?.map((list, index) => (
              <Link
                key={index}
                href={list.href}
                className="text-sm font-semibold text-slate-600 hover:text-primaryTint transition-colors"
              >
                {list.label}
              </Link>
            ))}
            {isLive && (
              <a
                href="#live"
                className="text-sm font-bold text-red-500 flex items-center gap-1.5 hover:text-red-600 transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                Kavaa Live
              </a>
            )}
            <div className="flex flex-col gap-3 mt-4">
              <BtnFullWidthNonColorLink name="Masuk" href="/login" />
              <BtnFullWidthColorLink name="Daftar" href="/register" />
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
