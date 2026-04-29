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

  // If no modules found, provide mock data for demo purposes if needed, 
  // but ideally we should have data in the DB.
  const displayModules = modules.length > 0 ? modules : [
    { id: "1", title: "Welcome!", duration: "3:36", is_completed: true, video_url: "", description: "" },
    { id: "2", title: "Apa Itu Website?", duration: "13:09", is_completed: false, video_url: "", description: "" },
    { id: "3", title: "Website Develop role de...", duration: "3:36", is_completed: false, video_url: "", description: "" },
    { id: "4", title: "A little bit of a backgrou...", duration: "7:34", is_completed: false, video_url: "", description: "" },
    { id: "5", title: "Benefits of being a prod...", duration: "5:12", is_completed: false, video_url: "", description: "" },
    { id: "6", title: "Is this a career for me", duration: "8:45", is_completed: false, video_url: "", description: "" },
    { id: "7", title: "Misconceptions about p...", duration: "7:22", is_completed: false, video_url: "", description: "" },
  ];

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#F8FAFC] px-4 md:px-8 py-6">
      <CoursePlayerContent course={course} modules={displayModules as any} />
    </div>
  );
}
