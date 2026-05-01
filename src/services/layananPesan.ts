import { createClient } from "@/utilitas/supabase/server";
import { cookies } from "next/headers";

export async function ambilSemuaPercakapan(userId: string) {
  const simpananCookie = await cookies();
  const klienSupabase = createClient(simpananCookie);

  // 1. Ambil semua ID percakapan untuk pengguna ini
  const { data: peserta, error: errorPeserta } = await klienSupabase
    .from("conversation_participants")
    .select("conversation_id")
    .eq("user_id", userId);

  if (errorPeserta) {
    console.error("Gagal mengambil peserta:", errorPeserta.message);
    return [];
  }

  if (!peserta || peserta.length === 0) return [];

  const idPercakapan = peserta.map(p => p.conversation_id);

  // 2. Ambil detail percakapan
  const { data: dataPercakapan, error: errorPercakapan } = await klienSupabase
    .from("conversations")
    .select("id, created_at")
    .in("id", idPercakapan);

  if (errorPercakapan) {
    console.error("Gagal mengambil detail percakapan:", errorPercakapan.message);
    return [];
  }

  // 3. Ambil detail untuk setiap percakapan
  const percakapanDenganDetail = await Promise.all(
    dataPercakapan.map(async (konv: { id: string; created_at: string }) => {
      // Ambil peserta lain
      const { data: dataPesertaLain } = await klienSupabase
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
        .eq("conversation_id", konv.id)
        .neq("user_id", userId)
        .limit(1);

      const pesertaLain = dataPesertaLain?.[0]?.users as unknown as { first_name: string; last_name: string; avatar_url: string };

      // Ambil pesan terakhir
      const { data: dataPesanTerakhir } = await klienSupabase
        .from("messages")
        .select("content, created_at, is_read, sender_id")
        .eq("conversation_id", konv.id)
        .order("created_at", { ascending: false })
        .limit(1);
      
      const pesanTerakhir = dataPesanTerakhir?.[0];

      return {
        id: konv.id,
        name: pesertaLain ? `${pesertaLain.first_name} ${pesertaLain.last_name}` : "Pengguna Kavaa",
        avatar: pesertaLain?.avatar_url,
        lastMessage: pesanTerakhir?.content || "Mulai percakapan...",
        time: pesanTerakhir ? new Date(pesanTerakhir.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "",
        last_message_at: pesanTerakhir?.created_at || konv.created_at,
        unread: pesanTerakhir && !pesanTerakhir.is_read && pesanTerakhir.sender_id !== userId ? 1 : 0,
      };
    })
  );

  // Urutkan berdasarkan last_message_at terbaru
  return percakapanDenganDetail.sort((a, b) => 
    new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime()
  );
}

export async function ambilPesan(conversationId: string) {
  const simpananCookie = await cookies();
  const klienSupabase = createClient(simpananCookie);

  const { data, error } = await klienSupabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Gagal mengambil pesan:", error);
    return [];
  }

  return data;
}
