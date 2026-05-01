import DashboardPage from "@/components/TataLetak/dashboard/DashboardPage";
import { createClient } from "@/utilitas/supabase/server";
import { cookies } from "next/headers";
import { ambilProfilPengguna } from "@/services/layananPengguna";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Kavaa",
  description: "Kelola pembelajaran dan proyek kolaborasi Anda di Kavaa.",
};

export default async function Dashboard({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();
  const profile = user ? await ambilProfilPengguna(user.id) : null;

  return <DashboardPage userId={slug} user={profile || user} />;
}
