export default function CollaborationDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Ringkasan Kemajuan Kolaborasi (Col Span 2) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm lg:col-span-2 flex flex-col">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Ringkasan Kemajuan Kolaborasi</h2>
        <div className="flex flex-col md:flex-row gap-6 flex-1">
          <div className="bg-slate-100 rounded-xl flex-1 min-h-[160px] flex items-center justify-center text-slate-400 text-sm font-medium">
            Team Collaboration Illustration
          </div>
          <div className="flex-1 flex flex-col justify-center gap-6">
            
            <div>
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span className="text-slate-700">Tugas Tim Selesai</span>
                <span className="text-slate-900">80%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div className="bg-primaryTint h-2.5 rounded-full" style={{ width: "80%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span className="text-slate-700">Laporan Desain UI/UX</span>
                <span className="text-amber-500 bg-amber-50 px-2 py-0.5 rounded text-xs">Pending</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div className="bg-primaryTint h-2.5 rounded-full" style={{ width: "40%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span className="text-slate-700">Ulasan Kode API</span>
                <span className="text-amber-500 bg-amber-50 px-2 py-0.5 rounded text-xs">In Progress</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5">
                <div className="bg-amber-400 h-2.5 rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Aktivitas Kolaborasi Terbaru (Col Span 1) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-800">Aktivitas Kolaborasi Terbaru</h2>
          <p className="text-xs text-slate-400">Recent Collaboration Activity</p>
        </div>
        <div className="flex flex-col gap-5">
          {[
            { id: 1, initials: "AW", name: "Alice", action: "updated Wireframes", time: "4 minutes ago" },
            { id: 2, initials: "CM", name: "Charlie", action: "merged API branch", time: "4 minutes ago" },
            { id: 3, initials: "BB", name: "Bob", action: "commented on Pull Request", time: "3 minutes ago" },
          ].map((activity) => (
            <div key={activity.id} className="flex gap-3 items-center">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs shrink-0">
                {activity.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">
                  <span className="font-bold">{activity.name}</span> {activity.action}
                </p>
                <p className="text-xs text-slate-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Permintaan Pencarian Tim Baru */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-800">Permintaan Pencarian Tim Baru</h2>
          <p className="text-xs text-slate-400">New Team Finder Requests</p>
        </div>
        <div className="flex flex-col gap-4">
           {[
            { id: 1, initials: "AW", title: "Front-end needed for FreshMart", time: "4 minutes ago" },
            { id: 2, initials: "CM", title: "Back-end for SkillLink", time: "3 minutes ago" },
            { id: 3, initials: "CM", title: "Looking for UI/UX (EduConnect)", time: "3 minutes ago" },
          ].map((req) => (
            <div key={req.id} className="flex gap-3 items-center justify-between">
              <div className="flex gap-3 items-center">
                 <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs shrink-0">
                  {req.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{req.title}</p>
                  <p className="text-xs text-slate-400">{req.time}</p>
                </div>
              </div>
              <button className="text-primaryTint border border-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors whitespace-nowrap">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones Mendatang */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-800">Milestones Mendatang</h2>
          <p className="text-xs text-slate-400 leading-tight">Recent feedback requested from team members projects</p>
        </div>
        <div className="flex flex-col gap-4 relative">
          <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-slate-100"></div>
          
          <div className="relative pl-6">
            <div className="absolute left-0.5 top-1.5 w-3 h-3 bg-primaryTint rounded-full shadow-sm ring-4 ring-white"></div>
            <h3 className="text-sm font-bold text-slate-800">MVP Launch</h3>
            <p className="text-xs text-slate-500 font-medium">(FreshMart - 2 days)</p>
          </div>
          
          <div className="relative pl-6">
            <div className="absolute left-0.5 top-1.5 w-3 h-3 bg-primaryTint rounded-full shadow-sm ring-4 ring-white"></div>
            <h3 className="text-sm font-bold text-slate-800">Final Design Freeze</h3>
            <p className="text-xs text-slate-500 font-medium">(SkillLink - 4 days)</p>
          </div>
        </div>
      </div>

      {/* Draf Showcase Portofolio Tim */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-slate-800 leading-tight">Draf Showcase Portofolio Tim</h2>
          <p className="text-xs text-slate-400">Portfolio Showcase Preview</p>
        </div>
        <div className="bg-slate-100 rounded-xl w-full h-24 mb-4 flex items-center justify-center">
           <span className="text-xs text-slate-400 font-medium">E-Commerce App Portfolio Preview</span>
        </div>
        <button className="w-full bg-primaryTint text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
          Feedback Tim Mendalam
        </button>
      </div>

    </div>
  );
}
