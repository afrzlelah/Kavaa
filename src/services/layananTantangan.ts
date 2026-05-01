import { createClient } from "@/utilitas/supabase/server";
import { cookies } from "next/headers";

export async function ambilSemuaTantangan() {
  const simpananCookie = await cookies();
  const klienSupabase = createClient(simpananCookie);

  const { data, error } = await klienSupabase
    .from("challenges")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gagal mengambil tantangan:", error);
    return [];
  }
  return data;
}

export async function ambilSemuaTugas() {
  const simpananCookie = await cookies();
  const klienSupabase = createClient(simpananCookie);

  const { data, error } = await klienSupabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gagal mengambil tugas:", error);
    return [];
  }
  return data;
}
