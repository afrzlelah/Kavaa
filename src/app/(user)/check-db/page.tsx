import { getCourses } from "@/services/courseService";

export default async function CheckDbPage() {
  const courses = await getCourses();
  
  return (
    <div className="p-10 bg-white min-h-screen font-mono text-xs">
      <h1 className="text-xl font-bold mb-5">Database Course List</h1>
      <table className="w-full border-collapse border border-slate-200">
        <thead>
          <tr className="bg-slate-100">
            <th className="border p-2">Title</th>
            <th className="border p-2">ID (Use this for URL)</th>
            <th className="border p-2">Type</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(c => (
            <tr key={c.id}>
              <td className="border p-2">{c.title}</td>
              <td className="border p-2 text-primaryTint font-bold">{c.id}</td>
              <td className="border p-2">{typeof c.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-5 text-slate-500">
        If the list above is empty, you need to add data to the &quot;courses&quot; table in Supabase.
      </p>
    </div>
  );
}
