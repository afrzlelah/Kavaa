import dynamic from "next/dynamic";
import KontenUtama from "@/components/TataLetak/Content/KontenUtama";
import NavigasiUtama from "@/components/Bersama/Navbar/NavigasiUtama";

// Dynamic imports for components below the fold
const DaftarFitur = dynamic(() => import("@/components/TataLetak/Content/DaftarFItur"), {
  loading: () => <div className="h-20" />,
});
const KatalogKursus = dynamic(() => import("@/components/TataLetak/Content/KatalogKursus"), {
  loading: () => <div className="h-20" />,
});
const TombolAksi = dynamic(() => import("@/components/TataLetak/Content/TombolAksi"), {
  loading: () => <div className="h-20" />,
});
const FooterHome = dynamic(() => import("@/components/TataLetak/Footer/KakiHalaman"), {
  loading: () => <div className="h-20" />,
});

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
