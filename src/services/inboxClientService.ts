import { createClientClient } from "@/utils/supabase/client";

/**
 * Check if a 1:1 conversation already exists between two users.
 * CLIENT SIDE version.
 */
export async function findExistingConversationClient(userId1: string, userId2: string) {
  const supabase = createClientClient();

  // Try using RPC if available
  const { data, error } = await supabase.rpc('get_conversation_by_participants', {
    user_ids: [userId1, userId2]
  });

  if (error || !data || data.length === 0) {
    // Fallback to manual check
    const { data: convs } = await supabase
      .from("conversation_participants")
      .select("conversation_id")
      .eq("user_id", userId1);

    if (convs) {
      for (const c of convs) {
        const { data: other } = await supabase
          .from("conversation_participants")
          .select("user_id")
          .eq("conversation_id", c.conversation_id)
          .eq("user_id", userId2)
          .single();
        
        if (other) return c.conversation_id;
      }
    }
    return null;
  }

  return data[0].conversation_id;
}

/**
 * Mark all messages in a conversation as read for the current user.
 * CLIENT SIDE version.
 */
export async function markMessagesAsReadClient(conversationId: string, userId: string) {
  const supabase = createClientClient();

  const { error } = await supabase
    .from("messages")
    .update({ is_read: true })
    .eq("conversation_id", conversationId)
    .neq("sender_id", userId)
    .eq("is_read", false);

  if (error) {
    console.error("Error marking messages as read:", error);
    return false;
  }
  return true;
}
