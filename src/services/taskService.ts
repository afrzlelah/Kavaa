import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getTasks(userId: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }

  // Map status values if necessary to match the UI keys (berjalan, belum, tertunda, selesai)
  return data.map((t: any) => ({
    ...t,
    status: t.status === "pending" ? "belum" : t.status, // Map 'pending' to 'belum' to match current UI logic
    category: t.category || "General",
    priority: t.priority || "Sedang"
  }));
}
