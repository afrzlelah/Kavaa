import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getConversations(userId: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("conversation_participants")
    .select(`
      conversation_id,
      conversations (
        created_at
      )
    `)
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching conversations:", error);
    return [];
  }

  // Get the other participants for each conversation
  const conversationsWithDetails = await Promise.all(
    data.map(async (cp) => {
      const { data: participantsData } = await supabase
        .from("conversation_participants")
        .select(`
          user_id,
          users (
            id,
            first_name,
            last_name,
            avatar_url
          )
        `)
        .eq("conversation_id", cp.conversation_id)
        .neq("user_id", userId)
        .limit(1);

      const participants = participantsData?.[0];

      const { data: lastMessageData } = await supabase
        .from("messages")
        .select("content, created_at")
        .eq("conversation_id", cp.conversation_id)
        .order("created_at", { ascending: false })
        .limit(1);
      
      const lastMessage = lastMessageData?.[0];


      return {
        id: cp.conversation_id,
        name: participants ? `${participants.users.first_name} ${participants.users.last_name}` : "Unknown User",
        avatar: participants?.users.avatar_url,
        lastMessage: lastMessage?.content || "No messages yet",
        time: lastMessage ? new Date(lastMessage.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "",
        unread: 0, // Logic for unread could be added later
      };
    })
  );

  return conversationsWithDetails;
}

export async function getMessages(conversationId: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching messages:", error);
    return [];
  }

  return data;
}
