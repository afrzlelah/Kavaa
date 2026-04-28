// Consolidated types and interfaces for the Kavaa project

export interface NavProps {
  lists: { label: string; href: string }[];
  isLive: boolean;
}

export type ButtonColorComponentsType = {
  name: string;
  href: string;
};

export interface CourseCardProps {
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

export interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  state: string;
  phone: string;
  password: string;
}

export interface Contact {
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

export interface Message {
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

export interface AvatarProps {
  src?: string;
  initials?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export interface UserData {
  first_name: string;
  last_name: string;
  email: string;
}

export interface Certificate {
  id: number | string;
  title: string;
  category: string;
  issued_at: string;
  thumbnail_url: string | null;
  certificate_url: string | null;
  is_earned: boolean;
  provider?: string;
}

export interface TeamRequest {
  id: number;
  title: string;
  initials: string;
  time_ago: string;
  status?: string;
  color?: string;
}

export interface Challenge {
  id: number;
  title: string;
  category: string;
  difficulty: string;
  participants: number;
  deadline: string;
  reward: string;
  description: string;
}
