import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getMentors() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("mentors")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching mentors:", error);
    return [];
  }
  return data;
}

export async function getUserMentors(userId: number | string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("user_mentors")
    .select(`
      mentors (
        id, name, role, avatar_url
      )
    `)
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching user mentors:", error);
    return [];
  }

  return data.map((item: any) => item.mentors);
}
