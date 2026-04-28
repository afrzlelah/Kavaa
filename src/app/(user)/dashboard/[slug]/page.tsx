import DashboardPage from "@/components/layouts/dashboard/DashboardPage";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { getUserProfile } from "@/services/getAllUser";

export default async function Dashboard({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();
  const profile = user ? await getUserProfile(user.id) : null;

  return <DashboardPage userId={slug} user={profile || user} />;
}
