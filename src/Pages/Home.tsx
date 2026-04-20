import Catalog from "@/Components/Content/Catalog";
import Content1 from "@/Components/Content/Content1";
import CTA from "@/Components/Content/CTA";
import DaftarFitur from "@/Components/Content/DaftarFItur";
import FooterHome from "@/Components/Content/Footer";
import NavbarHome from "@/Components/Navbar/NavbarHome";
import React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-900">
      <NavbarHome />
      <main id="main-content">
        <Content1 />
        <DaftarFitur />
        <Catalog />
        <CTA />
      </main>
      <FooterHome />
    </div>
  );
}
