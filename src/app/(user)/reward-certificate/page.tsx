import { ambilSertifikatPengguna } from "@/services/layananSertifikat";
import { createClient } from "@/utilitas/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import KlienSertifikatHadiah from "./KlienSertifikatHadiah";

export default async function RewardCertificatePage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let certificates = await ambilSertifikatPengguna(user.id);

  // Fallback data for testing if database is empty
  // Adding missing properties to match the expected type
  if (!certificates || certificates.length === 0) {
    certificates = [
      {
        id: 1,
        title: "WEBSITE STORE DEVELOPMENT",
        provider: "Kavaa Academy",
        is_earned: true,
        issued_at: new Date().toISOString(),
        thumbnail_url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80",
        certificate_url: "#",
        category: "Modul",
      },
      {
        id: 2,
        title: "Fundamental SQL Group By and Having",
        provider: "DQLab",
        is_earned: false,
        issued_at: new Date().toISOString(),
        thumbnail_url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80",
        certificate_url: null,
        category: "Modul",
      },
      {
        id: 3,
        title: "UX Research Essentials",
        provider: "Kavaa Team",
        is_earned: false,
        issued_at: new Date().toISOString(),
        thumbnail_url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80",
        certificate_url: null,
        category: "Projects",
      },
    ];
  }

  return <KlienSertifikatHadiah initialCertificates={certificates} />;
}
