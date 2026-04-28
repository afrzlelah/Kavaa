import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import UserLayoutClient from "@/components/layouts/UserLayoutClient";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: { user: authUser } } = await supabase.auth.getUser();

  if (!authUser) {
    redirect("/login");
  }

  // Fetch full profile and all users
  const { data: userProfile } = await supabase
    .from("users")
    .select("*")
    .eq("id", authUser.id)
    .single();

  const { data: allUsers } = await supabase
    .from("users")
    .select("id, first_name, last_name, avatar_url, role")
    .neq("id", authUser.id)
    .limit(10);

  return (
    <UserLayoutClient 
      user={userProfile || authUser} 
      slug={authUser.id}
      friends={allUsers || []}
    >
      {children}
    </UserLayoutClient>
  );
}

