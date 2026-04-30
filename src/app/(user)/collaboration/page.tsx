import { CollaborationProgress } from "@/components/features/collaboration/CollaborationProgress";
import { RecentActivity } from "@/components/features/collaboration/RecentActivity";
import { TeamFinderRequests } from "@/components/features/collaboration/TeamFinderRequests";
import { UpcomingMilestones } from "@/components/features/collaboration/UpcomingMilestones";
import { PortfolioShowcase } from "@/components/features/collaboration/PortfolioShowcase";

export default async function CollaborationDashboard() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Top Section */}
      <div className="xl:col-span-2">
        <CollaborationProgress />
      </div>
      <div className="xl:col-span-1">
        <RecentActivity />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:col-span-3 gap-6">
        <TeamFinderRequests />
        <UpcomingMilestones />
        <PortfolioShowcase />
      </div>
    </div>
  );
}
