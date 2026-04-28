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

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Use the user ID as the slug for now
  const slug = user.id;

  return (
    <UserLayoutClient user={user} slug={slug}>
      {children}
    </UserLayoutClient>
  );
}

