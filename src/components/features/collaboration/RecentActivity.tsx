import { Card, CardHeader } from "@/components/shared/ui/Card";
import { Avatar } from "@/components/shared/ui/Avatar";
import { getRecentActivities } from "@/services/collaborationService";

export async function RecentActivity() {
  let activities = await getRecentActivities();

  if (!activities || activities.length === 0) {
    activities = [
      { id: 1, initials: "AW", user_name: "Alice", action: "updated Wireframes", time_ago: "4 minutes ago" },
      { id: 2, initials: "CM", user_name: "Charlie", action: "merged API branch", time_ago: "4 minutes ago" },
    ];
  }

  return (
    <Card>
      <CardHeader 
        title="Aktivitas Kolaborasi Terbaru" 
        subtitle="Recent Collaboration Activity" 
      />
      <div className="flex flex-col gap-5">
        {activities.map((activity: any) => (
          <div key={activity.id} className="flex gap-3 items-center">
            <Avatar initials={activity.initials} size="md" />
            <div>
              <p className="text-sm font-medium text-slate-800">
                <span className="font-bold">{activity.user_name || activity.name}</span> {activity.action}
              </p>
              <p className="text-xs text-slate-400">{activity.time_ago || activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
