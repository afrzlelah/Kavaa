import { ambilKursusBerdasarkanId, ambilModulKursus } from "@/services/layananKursus";
import { createClient } from "@/utilitas/supabase/server";
import { cookies } from "next/headers";
import { KontenPemutarKursus } from "@/components/Fitur/learning/KontenPemutarKursus";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CoursePlayerPage({ params }: PageProps) {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [course, modules] = await Promise.all([
    ambilKursusBerdasarkanId(id),
    ambilModulKursus(id, user?.id),
  ]);

  if (!course) {
    notFound();
  }

  const relatedCourses = await import("@/services/layananKursus").then((m) =>
    m.ambilKursusTerkait(course.category, id),
  );

  const displayModules = modules;

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#F8FAFC] px-4 md:px-8 py-6">
      <KontenPemutarKursus
        course={course!}
        modules={displayModules}
        relatedCourses={relatedCourses}
      />
    </div>
  );
}
