import { createClient } from "@/utilitas/supabase/server";
import { cookies } from "next/headers";
import { Sertifikat } from "@/types";

export async function ambilSertifikatPengguna(
  userId: string,
): Promise<Sertifikat[]> {
  const simpananCookie = await cookies();
  const klienSupabase = createClient(simpananCookie);

  const { data, error } = await klienSupabase
    .from("certificates")
    .select(
      `
      issued_at,
      certificate_url,
      courses:course_id (
        id,
        title,
        thumbnail_url,
        category
      )
    `,
    )
    .eq("user_id", userId)
    .order("issued_at", { ascending: false });

  if (error) {
    console.error("Gagal mengambil sertifikat:", error);
    return [];
  }

  interface SertifikatDb {
    issued_at: string;
    certificate_url: string;
    courses: {
      id: string;
      title: string;
      thumbnail_url: string;
      category: string;
    } | null;
  }

  return (data as unknown as SertifikatDb[]).map((cert) => ({
    id: cert.courses?.id || Math.random().toString(),
    title: cert.courses?.title || "Sertifikat Tanpa Judul",
    provider: cert.courses?.category || "Penyedia Tidak Diketahui",
    category: cert.courses?.category || "Lainnya",
    issued_at: cert.issued_at,
    thumbnail_url: cert.courses?.thumbnail_url || null,
    certificate_url: cert.certificate_url,
    is_earned: true,
  }));
}
