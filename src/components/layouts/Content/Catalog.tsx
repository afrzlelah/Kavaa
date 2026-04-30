"use client";

import { useState, useEffect } from "react";
import CourseCard from "@/components/shared/Cards/CourseCard";
import { createClientClient } from "@/utils/supabase/client";

export default function Catalog() {
  const [activeTab, setActiveTab] = useState("Development");
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    "Development",
    "Design",
    "Business",
    "Marketing",
    "IT & Software",
    "Personal Development",
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const supabase = createClientClient();
      const { data, error } = await supabase
        .from("courses")
        .select("*")
        .eq("category", activeTab);
      console.log(data);

      if (error) {
        console.error("Error fetching courses:", error);
      } else {
        setCourses(data || []);
      }
      setLoading(false);
    };

    fetchCourses();
  }, [activeTab]);

  return (
    <section
      id="catalog"
      className="py-16 md:py-24 bg-slate-50 border-t border-slate-100 relative"
    >
      <div className="container mx-auto px-4 md:px-12">
        <header className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-slate-900 tracking-tight">
            Kuasai Keahlian <br className="md:hidden" /> Paling Diminati
          </h2>
          <p className="text-base md:text-lg text-slate-600 font-medium">
            Pilih dari katalog kursus terkurasi yang dirancang oleh pakar
            industri untuk mengakselerasi pertumbuhan karier Anda.
          </p>
        </header>

        <nav
          className="flex items-center gap-2 mb-10 overflow-x-auto pb-4 pl-4 snap-x scrollbar-hide"
          aria-label="Kategori Kursus"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`snap-start shrink-0 text-sm md:text-base font-bold px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === tab
                  ? "bg-primaryTint text-white shadow-[0_4px_14px_0_rgba(79,70,229,0.39)]"
                  : "bg-white text-slate-600 hover:text-primaryTint hover:bg-primaryTint/10 border border-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primaryTint"></div>
          </div>
        ) : courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-6 w-full">
            {courses.map((course, idx) => (
              <CourseCard
                key={course.id || idx}
                category={course.category}
                title={course.title}
                description={course.description}
                instructor={course.instructor}
                participants={course.participants}
                rating={Number(course.rating)}
                duration={course.duration}
                level={course.level}
                progress={0} // Catalog usually shows 0% progress for new users
                isFree={course.is_free}
                theme={course.theme}
                price={course.price}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-400 font-medium">
              Belum ada kursus untuk kategori ini.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
