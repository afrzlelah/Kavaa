"use server";

import { createClient } from "@/utilitas/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function markModuleAsCompleted(moduleId: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { error } = await supabase
    .from("user_module_progress")
    .upsert({
      user_id: user.id,
      module_id: moduleId,
      is_completed: true,
      last_watched_at: new Date().toISOString()
    }, { onConflict: "user_id, module_id" });

  if (error) {
    console.error("Error updating progress:", error);
    return { error: error.message };
  }

  revalidatePath("/learning");
  revalidatePath(`/learning/[id]`, "page");
  return { success: true };
}
