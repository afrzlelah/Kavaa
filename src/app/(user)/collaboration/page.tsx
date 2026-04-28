import { CollaborationProgress } from "@/components/features/collaboration/CollaborationProgress";
import { RecentActivity } from "@/components/features/collaboration/RecentActivity";
import { TeamFinderRequests } from "@/components/features/collaboration/TeamFinderRequests";
import { UpcomingMilestones } from "@/components/features/collaboration/UpcomingMilestones";
import { PortfolioShowcase } from "@/components/features/collaboration/PortfolioShowcase";

export default function CollaborationDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <CollaborationProgress />
      <RecentActivity />
      <TeamFinderRequests />
      <UpcomingMilestones />
      <PortfolioShowcase />
    </div>
  );
}
