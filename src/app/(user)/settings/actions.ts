"use server";

import { createClient } from "@/utilitas/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateUserProfile(userId: string, formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Verify the authenticated user matches the requested userId
  const { data: { user: authUser } } = await supabase.auth.getUser();
  if (!authUser || authUser.id !== userId) {
    return { success: false, error: "Unauthorized: you can only update your own profile." };
  }

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const bio = formData.get("bio") as string;
  const avatarUrl = formData.get("avatarUrl") as string;

  const { error } = await supabase
    .from("users")
    .update({
      first_name: firstName,
      last_name: lastName,
      bio: bio,
      avatar_url: avatarUrl,
    })
    .eq("id", userId);

  if (error) {
    console.error("Error updating profile:", error.message);
    return { success: false, error: error.message };
  }

  revalidatePath("/"); // Revalidate everything to update sidebar and other pages
  return { success: true };
}

export async function updatePassword(formData: FormData) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters" };
  }

  if (password !== confirmPassword) {
    return { success: false, error: "Passwords do not match" };
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    console.error("Error updating password:", error.message);
    return { success: false, error: error.message };
  }

  return { success: true };
}

