import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getUserCertificates(userId: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("certificates")
    .select(`
      issued_at,
      certificate_url,
      courses:course_id (
        id,
        title,
        thumbnail_url,
        category
      )
    `)
    .eq("user_id", userId)
    .order("issued_at", { ascending: false });

  if (error) {
    console.error("Error fetching certificates:", error);
    return [];
  }

  return data.map((cert: any) => ({
    id: cert.courses?.id || Math.random(),
    title: cert.courses?.title || "Sertifikat Tanpa Judul",
    category: cert.courses?.category || "Other",
    issued_at: cert.issued_at,
    thumbnail_url: cert.courses?.thumbnail_url,
    certificate_url: cert.certificate_url,
    is_earned: true
  }));
}
