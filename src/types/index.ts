// Tipe dan interface yang dikonsolidasikan untuk proyek Kavaa
export interface PropertiNavigasi {
  lists: { label: string; href: string }[];
  isLive: boolean;
}

export type TipeKomponenTombolWarna = {
  name: string;
  href: string;
};

export interface PropertiKartuKursus {
  key: number | string;
  category: string;
  title: string;
  description: string;
  instructor: string;
  participants: number | string;
  rating: number;
  duration: string;
  level: string;
  progress: number;
  isFree: boolean;
  instructorAvatar?: string;
  theme: string;
  price: number | string;
}

export interface DataFormulir {
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  state: string;
  phone: string;
  password: string;
}

export interface Kontak {
  id: string;
  name: string;
  avatar: string;
  initials: string;
  color: string;
  lastMessage: string;
  unread?: number;
  hasFile?: boolean;
  fileName?: string;
  type: "group" | "person";
}

export interface Pesan {
  id: string;
  sender: string;
  senderAvatar?: string;
  content: string;
  time: string;
  isMine: boolean;
  type: "text" | "audio" | "files";
  files?: { name: string; size: string; type: "pdf" | "doc" }[];
  subMessages?: { content: string; isMine: boolean }[];
}

export interface PropertiAvatar {
  src?: string;
  initials?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export interface DataPengguna {
  first_name: string;
  last_name: string;
  email: string;
  avatar_url?: string;
}

export interface Kursus {
  id: string;
  title: string;
  description: string;
  category: string;
  instructor: string;
  participants: number | string;
  rating: number | string;
  duration: string;
  level: string;
  is_free: boolean;
  price: number | string;
  thumbnail_url: string;
  theme: string;
  instructor_avatar_url?: string;
  lectures_count?: number;
  total_hours?: number;
}

export interface ModulKursus {
  id: string;
  title: string;
  order_index: number;
  is_completed: boolean;
}

export interface KursusPengguna {
  progress: number;
  courses: Kursus;
}

// Bentuk yang dikembalikan oleh ambilKursusPengguna
export interface KursusPenggunaDatar extends Kursus {
  progress: number;
  tag: string;
  avatar: string;
  role: string;
}

export interface Tugas {
  id: number | string;
  title: string;
  category: string;
  status: "selesai" | "berjalan" | "tertunda" | "belum";
  due_date: string;
  priority: "Tinggi" | "Sedang" | "Rendah";
}

export interface Aktivitas {
  id: number;
  user_name: string;
  initials: string;
  action: string;
  time_ago: string;
  color: string;
}

export interface Percakapan {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  last_message_at: string;
  unread: number;
}

export interface PesanMasuk {
  id: string;
  content: string;
  created_at: string;
  is_read: boolean;
  sender_id: string;
}

export interface Sertifikat {
  id: number | string;
  title: string;
  category: string;
  issued_at: string;
  thumbnail_url: string | null;
  certificate_url: string | null;
  is_earned: boolean;
  provider?: string;
}

export interface PermintaanTim {
  id: number | string;
  title: string;
  initials: string;
  time_ago: string;
  status?: string;
  color?: string;
}

export interface Tantangan {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  participants: number;
  deadline: string;
  reward: string;
  description: string;
}
