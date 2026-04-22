import Catalog from "@/components/layouts/Content/Catalog";
import Content1 from "@/components/layouts/Content/Content1";
import CTA from "@/components/layouts/Content/CTA";
import DaftarFitur from "@/components/layouts/Content/DaftarFItur";
import FooterHome from "@/components/layouts/Footer/Footer";
import NavbarHome from "@/components/shared/Navbar/NavbarHome";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-900">
      <NavbarHome
        lists={[
          { label: "Belajar", href: "/register" },
          { label: "Berkembang", href: "/login" },
          { label: "Membangun", href: "/login" },
        ]}
        isLive={true}
      />
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
