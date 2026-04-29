import { getCourseById, getCourseModules } from "@/services/courseService";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { CoursePlayerContent } from "@/components/features/learning/CoursePlayerContent";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CoursePlayerPage({ params }: PageProps) {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  const { data: { user } } = await supabase.auth.getUser();

  const [course, modules] = await Promise.all([
    getCourseById(id),
    getCourseModules(id, user?.id)
  ]);

  if (!course) {
    notFound();
  }

  const relatedCourses = await import("@/services/courseService").then(m => 
    m.getRelatedCourses(course.category, id)
  );

  const displayModules = modules;

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#F8FAFC] px-4 md:px-8 py-6">
      <CoursePlayerContent 
        course={course} 
        modules={displayModules as any} 
        relatedCourses={relatedCourses as any}
      />
    </div>
  );
}
