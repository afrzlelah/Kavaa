import { getUserCertificates } from "@/services/certificateService";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import RewardCertificateClient from "./RewardCertificateClient";

export default async function RewardCertificatePage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

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
        title: "WEBSITE STORE", 
        provider: "Python AI at DQLab", 
        is_earned: false,
        issued_at: new Date().toISOString(),
        thumbnail_url: null,
        certificate_url: null
      },
      { 
        id: 2, 
        title: "Fundamental SQL Group By and Having", 
        provider: "SQL Group By and Having", 
        is_earned: false,
        issued_at: new Date().toISOString(),
        thumbnail_url: null,
        certificate_url: null
      },
    ];
  }

  return <RewardCertificateClient initialCertificates={certificates} />;
}
