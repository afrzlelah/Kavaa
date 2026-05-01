import { createClient } from "@/utilitas/supabase/server";
import { cookies } from "next/headers";

export async function ambilSemuaMentor() {
  const simpananCookie = await cookies();
  const klienSupabase = createClient(simpananCookie);

  const { data, error } = await klienSupabase
    .from("mentors")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Gagal mengambil mentor:", error);
    return [];
  }
  return data;
}
