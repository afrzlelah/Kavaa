import { ProgresKolaborasi } from "@/components/Fitur/collaboration/ProgresKolaborasi";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kolaborasi | Kavaa",
  description: "Bangun proyek bersama tim dan kembangkan portofolio Anda.",
};
import { AktivitasTerbaru } from "@/components/Fitur/collaboration/AktivitasTerbaru";
import { PermintaanPencariTim } from "@/components/Fitur/collaboration/PermintaanPencariTim";
import { TenggatMendatang } from "@/components/Fitur/collaboration/TenggatMendatang";
import { ShowcasePortofolio } from "@/components/Fitur/collaboration/ShowcasePortofolio";

export default async function BerandaKolaborasi() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Section */}
      <div className="xl:col-span-2">
        <ProgresKolaborasi />
      </div>
      <div className="xl:col-span-1">
        <AktivitasTerbaru />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:col-span-3 gap-6">
        <PermintaanPencariTim />
        <TenggatMendatang />
        <ShowcasePortofolio />
      </div>
    </div>
  );
}
