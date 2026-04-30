import { Card } from "@/components/shared/ui/Card";

export async function UpcomingMilestones() {
  const milestones = [
    {
      id: "1",
      title: "MVP Launch",
      project: "FreshMart",
      daysLeft: "2 days"
    },
    {
      id: "2",
      title: "Final Design Freeze",
      project: "SkillLink",
      daysLeft: "4 days"
    }
  ];

  return (
    <Card className="h-full border border-slate-100 shadow-sm p-8 rounded-[2rem]">
      <h3 className="text-[16px] font-black text-slate-900 mb-2 leading-none">Milestones Mendatang</h3>
      <p className="text-[10px] font-bold text-slate-400 mb-8 leading-relaxed">Recent feedback requested from team members projects</p>
      
      <div className="space-y-8 relative">
        {/* Timeline line */}
        <div className="absolute left-1.5 top-2 bottom-2 w-0.5 bg-slate-50 rounded-full"></div>
        
        {milestones.map((milestone) => (
          <div key={milestone.id} className="relative pl-8">
            <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-primary border-4 border-white shadow-sm z-10"></div>
            <div>
              <h4 className="text-[12px] font-black text-slate-800 leading-tight mb-1">{milestone.title}</h4>
              <p className="text-[10px] font-bold text-slate-400">({milestone.project} - {milestone.daysLeft})</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
