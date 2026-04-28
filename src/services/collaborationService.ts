import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

/**
 * Fetch team requests from the 'team_requests' table, 
 * joining with 'teams' and 'users' for full context.
 */
export async function getTeamRequests() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("team_requests")
    .select(`
      id,
      status,
      message,
      teams (
        id,
        project_name
      ),
      users (
        id,
        first_name,
        last_name,
        avatar_url
      )
    `)
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching team requests:", error);
    return [];
  }
  
  return data.map((req: any) => ({
    id: req.id,
    title: req.teams.project_name,
    initials: req.users.first_name.charAt(0) + (req.users.last_name?.charAt(0) || ""),
    time_ago: "Baru saja", // Could calculate from created_at if added to schema
    status: req.status
  }));
}

/**
 * Fetch challenges from the 'challenges' table.
 */
export async function getChallenges() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("challenges")
    .select("*")
    .order("deadline", { ascending: true });

  if (error) {
    console.error("Error fetching challenges:", error);
    return [];
  }
  return data;
}

/**
 * Fetch teams created by the user or where they are a participant.
 */
export async function getMyTeams(userId: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("teams")
    .select("*")
    .eq("creator_id", userId)
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching my teams:", error);
    return [];
  }
  return data;
}

/**
 * Fetch recent activities (mocked using team status updates or similar logic 
 * since no dedicated activity table was provided in the core schema).
 */
export async function getRecentActivities() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // In a real app, this might be a dedicated table or a join of recent actions.
  // We'll fetch the latest teams for now as "Recent Projects"
  const { data, error } = await supabase
    .from("teams")
    .select(`
      id,
      project_name,
      status,
      users:creator_id (
        first_name,
        last_name
      )
    `)
    .order("id", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Error fetching recent activities:", error);
    return [];
  }
  
  return data.map((team: any) => ({
    id: team.id,
    user_name: team.users.first_name,
    initials: team.users.first_name.charAt(0),
    action: `membuat proyek ${team.project_name}`,
    time_ago: "Baru saja",
    color: "bg-primary"
  }));
}
