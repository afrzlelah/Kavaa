import { getCourses } from "@/services/courseService";
import { Card } from "@/components/shared/ui/Card";
import { Button } from "@/components/shared/ui/Button";
import { Avatar } from "@/components/shared/ui/Avatar";

export default async function Learning() {
  let courses = await getCourses();

  // Fallback if db is empty during testing
  if (!courses || courses.length === 0) {
    courses = [
      {
        id: 1,
        category: "Programming",
        title: "React for Beginners",
        description: "Belajar React dari nol sampai bisa bikin project.",
        instructor: "John Doe",
        participants: 1200,
        rating: 4.7,
        duration: "8 jam",
        level: "Beginner",
        is_free: true,
        price: 0,
        thumbnail_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&q=80"
      }
    ];
  }

  return (
    <div className="p-8 max-w-7xl mx-auto h-full overflow-y-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Pusat Pembelajaran</h1>
          <p className="text-slate-500">Tingkatkan keahlianmu dengan kelas interaktif terbaru.</p>
        </div>
        <Button>Lihat Semua</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course: any) => (
          <Card key={course.id} className="p-0 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48 w-full bg-slate-100">
              {course.thumbnail_url ? (
                <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-blue-500 to-cyan-400" />
              )}
              {course.is_free && (
                <div className="absolute top-3 right-3 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                  GRATIS
                </div>
              )}
            </div>
            <div className="p-5 flex flex-col flex-1">
              <span className="text-[10px] font-bold text-primaryTint bg-blue-50 px-2 py-1 rounded w-fit mb-2">
                {course.category?.toUpperCase() || "UMUM"}
              </span>
              <h3 className="text-base font-bold text-slate-800 mb-2 line-clamp-2 leading-tight">
                {course.title}
              </h3>
              <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                {course.description || "Deskripsi kursus tidak tersedia."}
              </p>
              
              <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar initials={course.instructor?.[0] || "?"} size="sm" />
                  <span className="text-[11px] font-semibold text-slate-700">{course.instructor || "Instruktur"}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500">
                  <span>★</span> {course.rating || "0.0"}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
