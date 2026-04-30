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
  avatar_url?: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  instructor: string;
  thumbnail_url: string;
  theme: string;
  instructor_avatar_url?: string;
  lectures_count?: number;
  total_hours?: number;
}

export interface CourseModule {
  id: string;
  title: string;
  order_index: number;
  is_completed: boolean;
}

export interface UserCourse {
  progress: number;
  courses: Course;
}

// Flattened shape returned by getUserCourses (spread courses + computed fields)
export interface FlatUserCourse extends Course {
  progress: number;
  tag: string;
  avatar: string;
  role: string;
}

export interface Task {
  id: number | string;
  title: string;
  category: string;
  status: "selesai" | "berjalan" | "tertunda" | "belum";
  due_date: string;
  priority: "Tinggi" | "Sedang" | "Rendah";
}

export interface Activity {
  id: number;
  user_name: string;
  initials: string;
  action: string;
  time_ago: string;
  color: string;
}

export interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  time: string;
  last_message_at: string;
  unread: number;
}

export interface InboxMessage {
  id: string;
  content: string;
  created_at: string;
  is_read: boolean;
  sender_id: string;
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
