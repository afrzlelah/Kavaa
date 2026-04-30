import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getConversations(userId: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // 1. Get all conversation IDs for this user
  const { data: participants, error: pError } = await supabase
    .from("conversation_participants")
    .select("conversation_id")
    .eq("user_id", userId);

  if (pError) {
    console.error("Error fetching participants:", pError.message);
    return [];
  }

  if (!participants || participants.length === 0) return [];

  const conversationIds = participants.map(p => p.conversation_id);

  // 2. Get conversation details
  const { data: conversationsData, error: cError } = await supabase
    .from("conversations")
    .select("id, created_at")
    .in("id", conversationIds);

  if (cError) {
    console.error("Error fetching conversations details:", cError.message);
    return [];
  }

  // 3. Get details for each conversation
  const conversationsWithDetails = await Promise.all(
    conversationsData.map(async (conv: { id: string; created_at: string }) => {
      // Get the other participant
      const { data: participantsData } = await supabase
        .from("conversation_participants")
        .select(`
          user_id,
          users:user_id (
            id,
            first_name,
            last_name,
            avatar_url
          )
        `)
        .eq("conversation_id", conv.id)
        .neq("user_id", userId)
        .limit(1);

      const participant = participantsData?.[0]?.users as unknown as { first_name: string; last_name: string; avatar_url: string };

      // Get the last message
      const { data: lastMessageData } = await supabase
        .from("messages")
        .select("content, created_at, is_read, sender_id")
        .eq("conversation_id", conv.id)
        .order("created_at", { ascending: false })
        .limit(1);
      
      const lastMessage = lastMessageData?.[0];

      return {
        id: conv.id,
        name: participant ? `${participant.first_name} ${participant.last_name}` : "Kavaa User",
        avatar: participant?.avatar_url,
        lastMessage: lastMessage?.content || "Mulai percakapan...",
        time: lastMessage ? new Date(lastMessage.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "",
        last_message_at: lastMessage?.created_at || conv.created_at,
        unread: lastMessage && !lastMessage.is_read && lastMessage.sender_id !== userId ? 1 : 0,
      };
    })
  );

  // Sort by last_message_at descending
  return conversationsWithDetails.sort((a, b) => 
    new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime()
  );
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
