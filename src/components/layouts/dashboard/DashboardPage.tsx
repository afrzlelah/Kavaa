import { DashboardHeader } from "@/components/features/dashboard/DashboardHeader";
import { DashboardBanner } from "@/components/features/dashboard/DashboardBanner";
import { QuickStatCards } from "@/components/features/dashboard/QuickStatCards";
import { ContinueWatchingSection } from "@/components/features/dashboard/ContinueWatchingSection";
import { getQuickStats } from "@/services/courseService";

export default async function DashboardPage({ userId, user }: { userId?: string, user?: any }) {
  const quickStats = userId ? await getQuickStats(userId) : [];

  return (
    <main className="flex-1 flex flex-col h-full overflow-y-auto px-4 md:px-8 py-20 lg:py-8 min-w-0">
      <DashboardHeader user={user} />
      <DashboardBanner user={user} />
      <QuickStatCards stats={quickStats} />
      <ContinueWatchingSection userId={userId} />
    </main>
  );
}


