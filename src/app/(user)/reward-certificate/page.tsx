import { getUserCertificates } from "@/services/certificateService";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RewardCertificateClient from "./RewardCertificateClient";

export default async function RewardCertificatePage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let certificates = await getUserCertificates(user.id);

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
        thumbnail_url: "https://images.unsplash.com/photo-1551288049-bbbda536ad0a?w=400&q=80",
        certificate_url: null,
        category: "Modul",
      },
      {
        id: 3,
        title: "UX Research Essentials",
        provider: "Kavaa Team",
        is_earned: false,
        issued_at: new Date().toISOString(),
        thumbnail_url: "https://images.unsplash.com/photo-1586717791821-3f44a563cc4c?w=400&q=80",
        certificate_url: null,
        category: "Projects",
      },
    ];
  }

  return <RewardCertificateClient initialCertificates={certificates} />;
}
