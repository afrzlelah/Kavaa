import { createClient } from "@/utilitas/supabase/server";
import { cookies } from "next/headers";
import { PermintaanTim } from "@/types";

/**
 * Mengambil permintaan tim dari tabel 'team_requests',
 * menggabungkan dengan 'teams' dan 'users' untuk konteks penuh.
 */
export async function ambilPermintaanTim(): Promise<PermintaanTim[]> {
  const simpananCookie = await cookies();
  const klienSupabase = createClient(simpananCookie);

  const { data, error } = await klienSupabase
    .from("team_requests")
    .select(
      `
      id,
      status,
      message,
      teams (
        id,
        project_name
      ),
      users (
        id,
        first_name,
        last_name,
        avatar_url
      )
    `,
    )
    .order("id", { ascending: false });

  if (error) {
    console.error("Gagal mengambil permintaan tim:", error);
    return [];
  }

  interface DataPermintaanTim {
    id: string;
    status: string;
    message: string;
    teams: {
      id: string;
      project_name: string;
    } | null;
    users: {
      id: string;
      first_name: string;
      last_name: string;
      avatar_url: string | null;
    } | null;
  }

  return (data as unknown as DataPermintaanTim[]).map((req) => ({
    id: req.id,
    title: req.teams?.project_name || "Proyek",
    initials:
      (req.users?.first_name?.charAt(0) || "") + (req.users?.last_name?.charAt(0) || ""),
    time_ago: "Baru saja", 
    status: req.status,
  }));
}

export { ambilSemuaTantangan } from "./layananTantangan";

const apakahUuid = (id: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);

/**
 * Mengambil tim yang dibuat oleh pengguna atau di mana mereka menjadi peserta.
 */
export async function ambilTimSaya(userId: string) {
  if (!apakahUuid(userId)) return [];
  const simpananCookie = await cookies();
  const klienSupabase = createClient(simpananCookie);

  const { data, error } = await klienSupabase
    .from("teams")
    .select("*")
    .eq("creator_id", userId)
    .order("id", { ascending: false });

  if (error) {
    console.error("Gagal mengambil tim saya:", error);
    return [];
  }
  return data;
}

/**
 * Mengambil aktivitas terbaru (mocked menggunakan pembaruan status tim atau logika serupa
 * karena tidak ada tabel aktivitas khusus yang disediakan dalam skema inti).
 */
export async function ambilAktivitasTerbaruKolaborasi() {
  const simpananCookie = await cookies();
  const klienSupabase = createClient(simpananCookie);

  const { data, error } = await klienSupabase
    .from("teams")
    .select(
      `
      id,
      project_name,
      status,
      users:creator_id (
        first_name,
        last_name
      )
    `,
    )
    .order("id", { ascending: false })
    .limit(5);

  if (error) {
    console.error("Gagal mengambil aktivitas terbaru:", error);
    return [];
  }

  interface DataAktivitasTim {
    id: string;
    project_name: string;
    status: string;
    users: {
      first_name: string;
      last_name: string;
    } | null;
  }

  return (data as unknown as DataAktivitasTim[]).map((team) => ({
    id: team.id,
    user_name: team.users?.first_name || "Pengguna",
    initials: team.users?.first_name?.charAt(0) || "?",
    action: `membuat proyek ${team.project_name}`,
    time_ago: "Baru saja",
    color: "bg-primary",
  }));
}
