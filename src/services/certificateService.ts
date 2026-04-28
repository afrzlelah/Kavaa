import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getUserCertificates(userId: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("certificates")
    .select(`
      *,
      courses (
        title,
        thumbnail_url
      )
    `)
    .eq("user_id", userId)
    .order("issued_at", { ascending: false });

  if (error) {
    console.error("Error fetching certificates:", error);
    return [];
  }

  return data.map((cert: any) => ({
    id: cert.id,
    title: cert.courses.title,
    provider: "Kavaa Official", // Fallback provider
    issued_at: cert.issued_at,
    thumbnail_url: cert.courses.thumbnail_url,
    certificate_url: cert.certificate_url,
    is_earned: true
  }));
}
