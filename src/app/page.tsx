import KatalogKursus from "@/components/TataLetak/Content/KatalogKursus";
import KontenUtama from "@/components/TataLetak/Content/KontenUtama";
import TombolAksi from "@/components/TataLetak/Content/TombolAksi";
import DaftarFitur from "@/components/TataLetak/Content/DaftarFItur";
import FooterHome from "@/components/TataLetak/Footer/KakiHalaman";
import NavigasiUtama from "@/components/Bersama/Navbar/NavigasiUtama";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-900">
      <NavigasiUtama
        lists={[
          { label: "Belajar", href: "/register" },
          { label: "Berkembang", href: "/login" },
          { label: "Membangun", href: "/login" },
        ]}
        isLive={false}
      />
      <main id="main-content">
        <KontenUtama />
        <DaftarFitur />
        <KatalogKursus />
        <TombolAksi />
      </main>
      <FooterHome />
    </div>
  );
}
