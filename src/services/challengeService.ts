import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getChallenges() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("challenges")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching challenges:", error);
    return [];
  }
  return data;
}

export async function getTasks() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
  return data;
}
