import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { TeamRequest } from "@/types";

/**
 * Fetch team requests from the 'team_requests' table,
 * joining with 'teams' and 'users' for full context.
 */
export async function getTeamRequests(): Promise<TeamRequest[]> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("team_requests")
    .select(
      `
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
    `,
    )
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching team requests:", error);
    return [];
  }

  interface TeamRequestData {
    id: string;
    status: string;
    message: string;
    teams: {
      id: string;
      project_name: string;
    } | null;
    users: {
      id: string;
      first_name: string;
      last_name: string;
      avatar_url: string | null;
    } | null;
  }

  return (data as unknown as TeamRequestData[]).map((req) => ({
    id: req.id,
    title: req.teams?.project_name || "Proyek",
    initials:
      (req.users?.first_name?.charAt(0) || "") + (req.users?.last_name?.charAt(0) || ""),
    time_ago: "Baru saja", // Could calculate from created_at if added to schema
    status: req.status,
  }));
}

export { getChallenges } from "./challengeService";

const isUuid = (id: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

/**
 * Fetch teams created by the user or where they are a participant.
 */
export async function getMyTeams(userId: string) {
  if (!isUuid(userId)) return [];
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
    .select(
      `
      id,
      project_name,
      status,
      users:creator_id (
        first_name,
        last_name
      )
    `,
    )
    .order("id", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Error fetching recent activities:", error);
    return [];
  }

  interface TeamActivityData {
    id: string;
    project_name: string;
    status: string;
    users: {
      first_name: string;
      last_name: string;
    } | null;
  }

  return (data as unknown as TeamActivityData[]).map((team) => ({
    id: team.id,
    user_name: team.users?.first_name || "User",
    initials: team.users?.first_name?.charAt(0) || "?",
    action: `membuat proyek ${team.project_name}`,
    time_ago: "Baru saja",
    color: "bg-primary",
  }));
}
