import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getTeamRequests() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("team_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching team requests:", error);
    return [];
  }
  return data;
}

export async function getMilestones() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("milestones")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching milestones:", error);
    return [];
  }
  return data;
}

export async function getRecentActivities() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("recent_activities")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching recent activities:", error);
    return [];
  }
  return data;
}
