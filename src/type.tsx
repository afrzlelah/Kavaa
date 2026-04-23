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
  firstName: string;
  lastName: string;
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
