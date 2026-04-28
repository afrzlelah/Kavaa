import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getCourses() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
  return data;
}

export async function getUserCourses(userId: number | string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("user_courses")
    .select(`
      progress,
      courses (
        id, category, title, instructor, thumbnail_url, theme
      )
    `)
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching user courses:", error);
    return [];
  }

  return data.map((item: any) => ({
    ...item.courses,
    progress: item.progress,
    tag: item.courses.category?.toUpperCase() || "COURSE",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80", // Mock avatar for now
    role: "Instruktur",
  }));
}
export async function getQuickStats(userId: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("user_courses")
    .select(`
      progress,
      courses ( title )
    `)
    .eq("user_id", userId)
    .limit(3);

  if (error) {
    console.error("Error fetching quick stats:", error);
    return [];
  }

  return data.map((item: any) => ({
    title: item.courses.title,
    stat: `${item.progress}% Selesai`,
    icon: "Bell", // Fallback icon
  }));
}
