import { Card, CardHeader } from "@/components/shared/ui/Card";
import { getMilestones } from "@/services/collaborationService";

export async function UpcomingMilestones() {
  let milestones = await getMilestones();

  if (!milestones || milestones.length === 0) {
    milestones = [
      { id: 1, title: "MVP Launch", project_name: "FreshMart", days_left: 2 },
      { id: 2, title: "Final Design Freeze", project_name: "SkillLink", days_left: 4 },
    ];
  }

  return (
    <Card>
      <CardHeader 
        title="Milestones Mendatang" 
        subtitle="Recent feedback requested from team members projects" 
      />
      <div className="flex flex-col gap-4 relative">
        <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-slate-100"></div>
        
        {milestones.map((ms: any) => (
          <div key={ms.id} className="relative pl-6">
            <div className="absolute left-0.5 top-1.5 w-3 h-3 bg-primaryTint rounded-full shadow-sm ring-4 ring-white"></div>
            <h3 className="text-sm font-bold text-slate-800">{ms.title}</h3>
            <p className="text-xs text-slate-500 font-medium">({ms.project_name} - {ms.days_left} days)</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
