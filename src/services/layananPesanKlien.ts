import { createClientClient } from "@/utilitas/supabase/client";

/**
 * Memeriksa apakah percakapan 1:1 sudah ada di antara dua pengguna.
 * Versi SISI KLIEN.
 */
export async function cariPercakapanAdaKlien(userId1: string, userId2: string) {
  const klienSupabase = createClientClient();

  // Coba gunakan RPC jika tersedia
  const { data, error } = await klienSupabase.rpc('get_conversation_by_participants', {
    p_user_ids: [userId1, userId2]
  });

  if (error || !data || data.length === 0) {
    // Fallback: Cari semua percakapan untuk user1
    const { data: konvUser1 } = await klienSupabase
      .from("conversation_participants")
      .select("conversation_id")
      .eq("user_id", userId1);

    if (konvUser1 && konvUser1.length > 0) {
      const idKonv = konvUser1.map(c => c.conversation_id);
      
      // Periksa percakapan mana yang juga memiliki user2
      const { data: konvBersama } = await klienSupabase
        .from("conversation_participants")
        .select("conversation_id")
        .in("conversation_id", idKonv)
        .eq("user_id", userId2);
      
      if (konvBersama && konvBersama.length > 0) {
        return konvBersama[0].conversation_id;
      }
    }
    return null;
  }

  return data[0].conversation_id;
}

/**
 * Tandai semua pesan dalam percakapan sebagai sudah dibaca untuk pengguna saat ini.
 * Versi SISI KLIEN.
 */
export async function tandaiPesanSudahDibacaKlien(conversationId: string, userId: string) {
  const klienSupabase = createClientClient();

  const { error } = await klienSupabase
    .from("messages")
    .update({ is_read: true })
    .eq("conversation_id", conversationId)
    .neq("sender_id", userId)
    .eq("is_read", false);

  if (error) {
    console.error("Gagal menandai pesan sebagai dibaca:", error);
    return false;
  }
  return true;
}
