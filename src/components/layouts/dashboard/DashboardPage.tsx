import { DashboardHeader } from "@/components/features/dashboard/DashboardHeader";
import { DashboardBanner } from "@/components/features/dashboard/DashboardBanner";
import { QuickStatCards } from "@/components/features/dashboard/QuickStatCards";
import { ContinueWatchingSection } from "@/components/features/dashboard/ContinueWatchingSection";
import { RecentLearningActivity } from "@/components/features/learning/RecentLearningActivity";
import { getQuickStats, getRecentActivity } from "@/services/courseService";

export default async function DashboardPage({ userId, user }: { userId?: string, user?: any }) {
  const [quickStats, recentActivity] = await Promise.all([
    userId ? getQuickStats(userId) : [],
    getRecentActivity()
  ]);

  return (
    <main className="flex-1 flex flex-col h-full overflow-y-auto px-4 md:px-8 py-20 lg:py-8 min-w-0">
      <DashboardHeader user={user} />
      <DashboardBanner user={user} />
      <QuickStatCards stats={quickStats} />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">
        <div className="xl:col-span-2">
          <ContinueWatchingSection userId={userId} />
        </div>
        <div className="xl:col-span-1">
          <RecentLearningActivity activities={recentActivity as any} />
        </div>
      </div>
    </main>
  );
}


