import { createClient } from "@/utilitas/supabase/server";
import { cookies } from "next/headers";

import { Tugas } from "@/types";

export async function ambilTugasPengguna(userId: string): Promise<Tugas[]> {
  const simpananCookie = await cookies();
  const klienSupabase = createClient(simpananCookie);

  const { data, error } = await klienSupabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gagal mengambil tugas:", error);
    return [];
  }

  return data.map((t: { status: string; category?: string; priority?: string; [key: string]: unknown }) => ({
    ...(t as unknown as Tugas),
    status: t.status === "pending" ? "belum" : t.status, 
    category: t.category || "Umum",
    priority: t.priority || "Sedang"
  } as Tugas));
}
