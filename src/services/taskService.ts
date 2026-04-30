import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

import { Task } from "@/types";

export async function getTasks(userId: string): Promise<Task[]> {
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

  return data.map((t: { status: string; category?: string; priority?: string; [key: string]: unknown }) => ({
    ...(t as unknown as Task),
    status: t.status === "pending" ? "belum" : t.status, // Map 'pending' to 'belum' to match current UI logic
    category: t.category || "General",
    priority: t.priority || "Sedang"
  } as Task));
}
