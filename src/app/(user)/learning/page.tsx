import { LearningHubHeader } from "@/components/features/learning/LearningHubHeader";
import { LearningPathCard } from "@/components/features/learning/LearningPathCard";
import { LearningSidebar } from "@/components/features/learning/LearningSidebar";
import { RecentLearningActivity } from "@/components/features/learning/RecentLearningActivity";
import { FeedbackSection } from "@/components/features/learning/FeedbackSection";
import { PortfolioBuilding } from "@/components/features/learning/PortfolioBuilding";
import { Computer } from "lucide-react";
import { Button } from "@/components/shared/ui/Button";
import { getLearningPaths } from "@/services/courseService";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function LearningPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 1. Fetch real learning paths
  const pathsData = await getLearningPaths();

  // 2. Map DB categories to the UI structure
  const categoryIcons: Record<string, string[]> = {
    "Web Development": [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    ],
    Design: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
    ],
  };

  const learningPaths = await Promise.all(
    pathsData.map(async (path) => {
      const coursesWithProgress = await Promise.all(
        path.courses.slice(0, 3).map(async (c: { id: string; title: string }) => {
          const progress = user
            ? await import("@/services/courseService").then((m) =>
                m.getCourseProgress(c.id, user.id),
              )
            : 0;
          return {
            id: c.id,
            title: c.title,
            progress,
            status:
              progress === 100
                ? "completed"
                : progress > 0
                  ? "in-progress"
                  : "pending",
          };
        }),
      );

      return {
        title: path.title,
        subtitle: path.subtitle,
        buttonText: `Lanjut ${path.title}`,
        icons: categoryIcons[path.title as keyof typeof categoryIcons] || [
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        ],
        items: coursesWithProgress,
      };
    }),
  );

  // 3. Fetch activity and feedback
  const [recentActivity, recentFeedback] = await Promise.all([
    import("@/services/courseService").then((m) => m.getRecentActivity()),
    import("@/services/courseService").then((m) => m.getRecentFeedback()),
  ]);

  // Fallback if no paths
  if (learningPaths.length === 0) {
    // Add default UI if empty
  }

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#F8FAFC] px-4 md:px-8 py-6">
      <LearningHubHeader />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
        {/* Main Learning Hub Content */}
        <div className="xl:col-span-3 space-y-6">
          <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                  <Computer size={20} />
                </div>
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest">
                  Learning Hub
                </h2>
              </div>
              <Button className="rounded-lg px-5 py-2.5  text-md bg-primary shadow-md hover:bg-blue-700 transition-all">
                + Cari Materi Belajar
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              {learningPaths.map((path, idx) => (
                <LearningPathCard key={idx} {...path} />
              ))}
            </div>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6  xl:w-6xl  ">
            <RecentLearningActivity activities={recentActivity as never} />
            <FeedbackSection feedback={recentFeedback as never} />
            <PortfolioBuilding />
          </div>
        </div>

        {/* Sidebar */}
        <div className="xl:col-span-1">
          <LearningSidebar />
        </div>
      </div>
    </div>
  );
}
