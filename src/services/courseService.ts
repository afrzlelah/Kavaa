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

export async function getCourseById(courseId: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("id", courseId)
    .single();

  if (error) {
    console.error("Error fetching course by id:", error);
    return null;
  }
  return data;
}

export async function getCourseModules(courseId: string, userId?: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: modules, error: mError } = await supabase
    .from("course_modules")
    .select("*")
    .eq("course_id", courseId)
    .order("order_index", { ascending: true });

  if (mError) {
    console.error("Error fetching modules:", mError);
    return [];
  }

  if (!userId) return modules.map(m => ({ ...m, is_completed: false }));

  const { data: progress, error: pError } = await supabase
    .from("user_module_progress")
    .select("module_id, is_completed")
    .eq("user_id", userId);

  if (pError) {
    console.error("Error fetching progress:", pError);
    return modules.map(m => ({ ...m, is_completed: false }));
  }

  const progressMap = new Map(progress?.map(p => [p.module_id, p.is_completed]));

  return modules.map(m => ({
    ...m,
    is_completed: progressMap.get(m.id) || false
  }));
}

export async function getCourseProgress(courseId: string, userId: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: modules, error: mError } = await supabase
    .from("course_modules")
    .select("id")
    .eq("course_id", courseId);

  if (mError || !modules.length) return 0;

  const { data: progress, error: pError } = await supabase
    .from("user_module_progress")
    .select("module_id")
    .eq("user_id", userId)
    .eq("is_completed", true)
    .in("module_id", modules.map(m => m.id));

  if (pError) return 0;

  return Math.round((progress.length / modules.length) * 100);
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
    avatar: item.courses.instructor_avatar_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
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

/**
 * Fetch courses grouped by category to serve as "Learning Paths"
 */
export async function getLearningPaths() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // In a real app, you might have a dedicated 'learning_paths' table
  // For now, we'll group existing courses by category
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("category");

  if (error) {
    console.error("Error fetching learning paths:", error);
    return [];
  }

  // Group by category
  const grouped = data.reduce((acc: any, course: any) => {
    const cat = course.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(course);
    return acc;
  }, {});

  return Object.keys(grouped).map(category => ({
    title: category.toUpperCase(),
    subtitle: `Jalur Belajar ${category}`,
    courses: grouped[category]
  }));
}

export async function getRelatedCourses(category: string, excludeId: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("category", category)
    .neq("id", excludeId)
    .limit(2);

  if (error) return [];
  return data;
}

export async function getRecentActivity() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("user_module_progress")
    .select(`
      user_id,
      is_completed,
      last_watched_at,
      users:user_id ( first_name, avatar_url ),
      module:module_id ( 
        title, 
        course_id, 
        courses:course_id ( category ) 
      )
    `)
    .order("last_watched_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Activity Error:", error);
    
    // Fallback if last_watched_at is missing from schema
    const { data: fallbackData, error: fallbackError } = await supabase
      .from("user_module_progress")
      .select(`
        user_id,
        is_completed,
        users:user_id ( first_name, avatar_url ),
        module:module_id ( 
          title, 
          course_id, 
          courses:course_id ( category ) 
        )
      `)
      .limit(5);

    if (fallbackError) return [];
    return fallbackData;
  }
  return data;
}

export async function getRecentFeedback() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("course_feedback")
    .select(`
      id,
      comment,
      users:user_id ( first_name, avatar_url )
    `)
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Feedback Error:", error);
    return [];
  }
  return data;
}
