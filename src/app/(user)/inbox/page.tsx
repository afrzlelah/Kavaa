import InboxPage from "@/components/TataLetak/dashboard/InboxPage";
import { ambilSemuaPercakapan } from "@/services/layananPesan";
import { createClient } from "@/utilitas/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Inbox() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const initialConversations = await ambilSemuaPercakapan(user.id);

  return <InboxPage initialConversations={initialConversations} userId={user.id} />;
}

