import { createClient } from "@/utilitas/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardRoot() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Redirect to the user-specific dashboard
  redirect(`/dashboard/${user.id}`);
}
