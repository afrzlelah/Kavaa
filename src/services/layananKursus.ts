import { createClient } from "@/utilitas/supabase/server";
import { cookies } from "next/headers";
import { Kursus, KursusPenggunaDatar, ModulKursus } from "@/types";

export async function ambilSemuaKursus() {
  const simpananCookie = await cookies();
  const klienSupabase = createClient(simpananCookie);

  const { data, error } = await klienSupabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gagal mengambil kursus:", error);
    return [];
  }
  return data;
}

export async function ambilKursusBerdasarkanId(courseId: string) {
  if (!apakahIdValid(courseId)) return null;
  const simpananCookie = await cookies();
  const klienSupabase = createClient(simpananCookie);

  const { data, error } = await klienSupabase
    .from("courses")
    .select("*")
    .eq("id", courseId)
    .single();

  if (error) {
    console.error("Gagal mengambil kursus berdasarkan id:", error);
    return null;
  }
  return data;
}

export async function ambilModulKursus(courseId: string, userId?: string) {
  if (!apakahIdValid(courseId)) return [];
  const simpananCookie = await cookies();
  const klienSupabase = createClient(simpananCookie);

  const { data: modules, error: mError } = await klienSupabase
    .from("course_modules")
    .select("*")
    .eq("course_id", courseId)
    .order("order_index", { ascending: true });

  if (mError) {
    console.error("Gagal mengambil modul:", mError);
    return [];
  }

  if (!userId) return modules.map((m) => ({ ...m, is_completed: false }));

  const { data: progress, error: pError } = await klienSupabase
    .from("user_module_progress")
    .select("module_id, is_completed")
    .eq("user_id", userId);

  if (pError) {
    console.error("Gagal mengambil progres:", pError);
    return modules.map((m) => ({ ...m, is_completed: false }));
  }

  const petaProgres = new Map(
    progress?.map((p) => [p.module_id, p.is_completed]),
  );

  return modules.map((m) => ({
    ...m,
    is_completed: petaProgres.get(m.id) || false,
  }));
}

export async function ambilProgresKursus(courseId: string, userId: string) {
  const simpananCookie = await cookies();
  const klienSupabase = createClient(simpananCookie);

  const { data: modules, error: mError } = await klienSupabase
    .from("course_modules")
    .select("id")
    .eq("course_id", courseId);

  if (mError || !modules || modules.length === 0) return 0;

  const { data: progress, error: pError } = await klienSupabase
    .from("user_module_progress")
    .select("module_id")
    .eq("user_id", userId)
    .eq("is_completed", true)
    .in(
      "module_id",
      modules.map((m) => m.id),
    );

  if (pError) return 0;

  return Math.round((progress.length / modules.length) * 100);
}

export async function ambilKursusPengguna(
  userId: number | string,
): Promise<KursusPenggunaDatar[]> {
  if (typeof userId === "string" && !apakahIdValid(userId)) return [];
  const simpananCookie = await cookies();
  const klienSupabase = createClient(simpananCookie);

  try {
    const { data, error } = await klienSupabase
      .from("user_courses")
      .select(
        `
        progress,
        courses (
          id, category, title, instructor, thumbnail_url, theme
        )
      `,
      )
      .eq("user_id", userId);

    if (error) {
      console.error(
        "Gagal mengambil kursus pengguna:",
        error?.message || error?.code || "Galat tidak diketahui",
      );
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data.map((item: { progress: number; courses: Record<string, unknown> | Record<string, unknown>[] }) => {
      const course = Array.isArray(item.courses) ? item.courses[0] : item.courses;
      if (!course) return null;
      
      return {
        ...(course as unknown as Kursus),
        progress: item.progress,
        tag: ((course as Record<string, unknown>).category as string)?.toUpperCase() || "KURSUS",
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent((course as Record<string, unknown>).instructor as string || "Instruktur")}&background=random`,
        role: "Instruktur",
      };
    }).filter(Boolean) as KursusPenggunaDatar[];
  } catch (err) {
    console.error("Eksepsi saat mengambil kursus pengguna:", err);
    return [];
  }
}
const apakahIdValid = (id: string) => /^[0-9a-f-]+$/i.test(id) || /^\d+$/.test(id);

export async function ambilStatistikCepat(userId: string) {
  if (!apakahIdValid(userId)) return [];
  const simpananCookie = await cookies();
  const klienSupabase = createClient(simpananCookie);

  const { data, error } = await klienSupabase
    .from("user_courses")
    .select(
      `
      progress,
      courses ( title )
    `,
    )
    .eq("user_id", userId)
    .limit(3);

  if (error) {
    console.error("Gagal mengambil statistik cepat:", error.message);
    return [];
  }

  return data.map((item: { progress: number; courses: { title: string } | { title: string }[] }) => {
    const course = Array.isArray(item.courses) ? item.courses[0] : item.courses;
    return {
      title: course?.title || "Kursus",
      stat: `${item.progress}% Selesai`,
      icon: "Bell", 
    };
  });
}

export async function ambilJalurBelajar() {
  const simpananCookie = await cookies();
  const klienSupabase = createClient(simpananCookie);

  const { data, error } = await klienSupabase
    .from("courses")
    .select("*")
    .order("category");

  if (error) {
    console.error("Gagal mengambil jalur belajar:", error);
    return [];
  }

  const dikelompokkan = data.reduce(
    (
      acc: Record<string, typeof data>,
      course: { category?: string; [key: string]: unknown },
    ) => {
      const cat = course.category || "Umum";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(course);
      return acc;
    },
    {},
  );

  return Object.keys(dikelompokkan).map((category) => ({
    title: category.toUpperCase(),
    subtitle: `Jalur Belajar ${category}`,
    courses: dikelompokkan[category],
  }));
}

export async function ambilKursusTerkait(category: string, excludeId: string) {
  const simpananCookie = await cookies();
  const klienSupabase = createClient(simpananCookie);

  const { data, error } = await klienSupabase
    .from("courses")
    .select("*")
    .eq("category", category)
    .neq("id", excludeId)
    .limit(2);

  if (error) return [];
  return data;
}

export async function ambilAktivitasTerbaru() {
  const simpananCookie = await cookies();
  const klienSupabase = createClient(simpananCookie);

  const { data, error } = await klienSupabase
    .from("user_module_progress")
    .select(
      `
      user_id,
      is_completed,
      last_watched_at,
      users ( first_name, avatar_url ),
      module:module_id ( 
        title, 
        course_id, 
        courses:course_id ( category ) 
      )
    `,
    )
    .order("last_watched_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Detail Galat Aktivitas:", error.message);

    const { data: dataFallback, error: errorFallback } = await klienSupabase
      .from("user_module_progress")
      .select(
        `
        user_id,
        is_completed,
        users ( first_name, avatar_url ),
        module:module_id ( 
          title, 
          course_id, 
          courses:course_id ( category ) 
        )
      `,
      )
      .limit(5);

    if (errorFallback) {
      console.error("Galat Aktivitas Fallback:", errorFallback.message);
      return [];
    }
    return dataFallback;
  }
  return data;
}

export async function ambilUmpanBalikTerbaru() {
  const simpananCookie = await cookies();
  const klienSupabase = createClient(simpananCookie);

  const { data, error } = await klienSupabase
    .from("course_feedback")
    .select(
      `
      id,
      comment,
      users ( first_name, avatar_url )
    `,
    )
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Galat Umpan Balik:", error.message);
    return [];
  }
  return data;
}
