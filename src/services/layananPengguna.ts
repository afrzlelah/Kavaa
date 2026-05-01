import { createClient } from "@/utilitas/supabase/server";
import { cookies } from "next/headers";

export const ambilSemuaPengguna = async () => {
  const simpananCookie = await cookies();
  const klienSupabase = createClient(simpananCookie);

  const { data, error } = await klienSupabase.from("users").select("*");

  if (error) {
    console.error("Gagal mengambil pengguna:", error);
    return [];
  }

  return data;
};

export const ambilProfilPengguna = async (userId: string) => {
  const simpananCookie = await cookies();
  const klienSupabase = createClient(simpananCookie);

  const { data, error } = await klienSupabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Gagal mengambil profil pengguna:", error);
    return null;
  }

  return data;
};
