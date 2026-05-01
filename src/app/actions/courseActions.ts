"use server";

import { createClient } from "@/utilitas/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const isIdValid = (id: string) => /^[0-9a-f-]+$/i.test(id) || /^\d+$/.test(id);

export async function toggleModuleCompletion(moduleId: string, courseId: string) {
  if (!isIdValid(moduleId) || !isIdValid(courseId)) {
    return { error: `Format ID tidak valid: moduleId=${moduleId}, courseId=${courseId}` };
  }
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "User not authenticated" };

  // Check current status
  const { data: existing } = await supabase
    .from("user_module_progress")
    .select("is_completed")
    .eq("user_id", user.id)
    .eq("module_id", moduleId)
    .single();

  const isCompleted = existing?.is_completed || false;

  const { error } = await supabase
    .from("user_module_progress")
    .upsert({
      user_id: user.id,
      module_id: moduleId,
      is_completed: !isCompleted,
      last_watched_at: new Date().toISOString()
    }, { onConflict: "user_id, module_id" });

  if (error) {
    console.error("Progress Error:", error.message);
    
    // Fallback if last_watched_at is missing
    if (error.message.includes("last_watched_at")) {
      const { error: fallbackError } = await supabase
        .from("user_module_progress")
        .upsert({
          user_id: user.id,
          module_id: moduleId,
          is_completed: !isCompleted,
        }, { onConflict: "user_id, module_id" });
        
      if (fallbackError) return { error: fallbackError.message };
      revalidatePath(`/learning/${courseId}`);
      revalidatePath(`/learning`);
      return { success: true, completed: !isCompleted };
    }
    
    return { error: error.message };
  }

  revalidatePath(`/learning/${courseId}`);
  revalidatePath(`/learning`);
  return { success: true, completed: !isCompleted };
}

export async function recordModuleWatch(moduleId: string) {
  if (!isIdValid(moduleId)) {
    return { error: `Format ID tidak valid: ${moduleId}` };
  }
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "User not authenticated" };

  const { error } = await supabase
    .from("user_module_progress")
    .upsert({
      user_id: user.id,
      module_id: moduleId,
      last_watched_at: new Date().toISOString()
    }, { onConflict: "user_id, module_id" });

  if (error) {
    console.error("Watch Record Error:", error.message);
    
    // Fallback if last_watched_at is missing
    if (error.message.includes("last_watched_at")) {
      const { error: fallbackError } = await supabase
        .from("user_module_progress")
        .upsert({
          user_id: user.id,
          module_id: moduleId,
        }, { onConflict: "user_id, module_id" });
        
      if (fallbackError) return { error: fallbackError.message };
      return { success: true };
    }
    
    return { error: error.message };
  }

  return { success: true };
}

export async function submitCourseFeedback(courseId: string, rating: number, comment: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "User not authenticated" };

  const { error } = await supabase
    .from("course_feedback")
    .insert({
      course_id: courseId,
      user_id: user.id,
      rating,
      comment
    });

  if (error) {
    console.error("Feedback Error:", error.message);
    return { error: error.message };
  }

  revalidatePath(`/learning/${courseId}`);
  return { success: true };
}
