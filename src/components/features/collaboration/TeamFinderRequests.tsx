import { Card, CardHeader } from "@/components/shared/ui/Card";
import { Avatar } from "@/components/shared/ui/Avatar";
import { Button } from "@/components/shared/ui/Button";
import { getTeamRequests } from "@/services/collaborationService";

export async function TeamFinderRequests() {
  let requests = await getTeamRequests();

  if (!requests || requests.length === 0) {
    requests = [
      { id: 1, initials: "AW", title: "Front-end needed for FreshMart", time_ago: "4 minutes ago" },
      { id: 2, initials: "CM", title: "Back-end for SkillLink", time_ago: "3 minutes ago" },
    ];
  }

  return (
    <Card>
      <CardHeader 
        title="Permintaan Pencarian Tim Baru" 
        subtitle="New Team Finder Requests" 
      />
      <div className="flex flex-col gap-4">
        {requests.map((req: any) => (
          <div key={req.id} className="flex gap-3 items-center justify-between">
            <div className="flex gap-3 items-center">
              <Avatar initials={req.initials} size="md" />
              <div>
                <p className="text-sm font-bold text-slate-800">{req.title}</p>
                <p className="text-xs text-slate-400">{req.time_ago || req.time}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="whitespace-nowrap">
              View Details
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
