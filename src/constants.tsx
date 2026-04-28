import {
  Award,
  BookOpen,
  ClipboardList,
  Globe,
  Inbox,
  LayoutDashboard,
  Users,
  Target,
} from "lucide-react";
import { Contact, Message } from "./types";

export const stats = [
  {
    icon: Globe,
    value: "316,000+",
    label: "Instruktur Berkualifikasi",
    desc: "Mentor berpengalaman lintas industri global.",
  },
  {
    icon: Globe,
    value: "1.8 Miliar+",
    label: "Pendaftaran Kursus",
    desc: "Perjalanan belajar dari komunitas seluruh dunia.",
  },
  {
    icon: Globe,
    value: "41,000+",
    label: "Kursus Berbagai Bahasa",
    desc: "Pilihan kelas multibahasa dan sertifikasi resmi.",
  },
  {
    icon: Award,
    value: "179,000+",
    label: "Video Pembelajaran",
    desc: "Materi video mendalam, praktis, dan interaktif.",
  },
];

export const courses = [
  {
    category: "Programming",
    title: "React for Beginners",
    description: "Belajar React dari nol sampai bisa bikin project.",
    instructor: "John Doe",
    participants: 1200,
    rating: 4.7,
    duration: "8 jam",
    level: "Beginner",
    progress: 0,
    isFree: true,
    theme: " from-rose-500 via-orange-400 to-amber-300",
    price: "free",
  },
  {
    category: "Design",
    title: "UI/UX Fundamentals",
    description: "Dasar desain UI/UX untuk produk digital.",
    instructor: "Jane Smith",
    participants: 850,
    rating: 4.5,
    duration: "6 jam",
    level: "Intermediate",
    progress: 30,
    isFree: false,
    price: 10000,
    theme: " from-blue-600 via-sky-500 to-cyan-400",
  },
  {
    category: "Data Science",
    title: "Intro to Machine Learning",
    description: "Konsep dasar machine learning dan implementasinya.",
    instructor: "Andrew Ng",
    participants: 2000,
    rating: 4.9,
    duration: "10 jam",
    level: "Advanced",
    progress: 75,
    isFree: false,
    theme: " from-rose-500 via-orange-400 to-amber-300",
    price: 10000,
  },
  {
    category: "Data Science",
    title: "Intro to Machine Learning",
    description: "Konsep dasar machine learning dan implementasinya.",
    instructor: "Andrew Ng",
    participants: 2000,
    rating: 4.9,
    duration: "10 jam",
    level: "Advanced",
    progress: 75,
    isFree: false,
    theme: " from-violet-700 via-indigo-600 to-purple-500",
    price: 10000,
  },
  {
    category: "Data Science",
    title: "Intro to Machine Learning",
    description: "Konsep dasar machine learning dan implementasinya.",
    instructor: "Andrew Ng",
    participants: 2000,
    rating: 4.9,
    duration: "10 jam",
    level: "Advanced",
    progress: 75,
    isFree: false,
    theme: " from-indigo-500 via-blue-400 to-cyan-400",
    price: 10000,
  },
];

export const brandFeatures = [
  {
    id: 1,
    title: "Platform kolaborasi yang dirancang khusus",
    subtitle:
      "agar bisa belajar, terhubung, dan tumbuh lebih cepat di dunia profesional.",
    description:
      "Kami membantu kamu menentukan target karier dan mendapatkan pengalaman nyata dalam tim. Bangun portofolio profesionalmu lebih awal dan jadilah yang terdepan.",
  },
  {
    id: 2,
    title: "Asah Skill Secara Nyata",
    subtitle: "bekerja dalam tim menyelesaikan tantangan industri.",
    description:
      "Bukan sekadar teori, di sini kamu akan mengerjakan proyek yang memberikan dampak nyata bagi portofoliomu.",
  },
  {
    id: 3,
    title: "Bangun Portofolio Profesional",
    subtitle: "tunjukkan keahlianmu kepada dunia industri.",
    description:
      "Kerjakan proyek riil bersama tim dan dokumentasikan setiap pencapaianmu di sini.",
  },
  {
    id: 4,
    title: "Koneksi Tanpa Batas",
    subtitle: "temukan mentor dan rekan kerja yang sefrekuensi.",
    description:
      "Perluas jaringan profesionalmu sejak dini untuk masa depan yang lebih cerah.",
  },
];

export const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Inbox, label: "Inbox", path: "/inbox" },
  { icon: BookOpen, label: "Learning", path: "/learning" },
  { icon: ClipboardList, label: "Task", path: "/task" },
  { icon: Target, label: "Challenge", path: "/challenge" },
  { icon: Users, label: "Collaboration", path: "/collaboration" },
  { icon: Award, label: "Reward & Certificate", path: "/reward-certificate" },
];

export const friends = [
  {
    name: "Afrizal",
    role: "Pengembang Perangkat Lunak",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&q=80",
  },
  {
    name: "Nia",
    role: "Pengembang Perangkat Lunak",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80",
  },
];

export const continueWatching = [
  {
    tag: "FRONTEND",
    title: "Panduan Pemula Menjadi Developer Frontend Profesional",
    instructor: "Prashant Kumar Singh",
    role: "Pengembang Perangkat Lunak",
    progress: 75,
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&q=80",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
  },
  {
    tag: "FRONTEND",
    title: "Panduan Pemula Menjadi Developer Frontend Profesional",
    instructor: "Prashant Kumar Singh",
    role: "Pengembang Perangkat Lunak",
    progress: 40,
    thumbnail:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=400&fit=crop&q=80",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
  },
  {
    tag: "FRONTEND",
    title: "Panduan Pemula Menjadi Developer Frontend Profesional",
    instructor: "Prashant Kumar Singh",
    role: "Pengembang Perangkat Lunak",
    progress: 10,
    thumbnail:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&q=80",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
  },
];

export const mentorTable = [
  {
    instructor: "Prashant Kumar Singh",
    date: "25/2/2023",
    type: "FRONTEND",
    title: "Memahami Konsep React",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
  },
  {
    instructor: "Ravi Kumar",
    date: "25/2/2023",
    type: "FRONTEND",
    title: "Memahami Konsep React",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80",
  },
];

export const yourMentorsList = Array(5).fill({
  name: "Prashant Kumar Singh",
  role: "Pengembang Perangkat Lunak",
  avatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80",
});

export const groups: Contact[] = [
  {
    id: "g1",
    name: "BakulMac",
    initials: "AD",
    color: "bg-purple-500",
    avatar: "",
    lastMessage: "Apik boss😊",
    unread: 3,
    type: "group",
  },
  {
    id: "g2",
    name: "Project Web Pecel Mbok Darmi",
    initials: "MS",
    color: "bg-blue-400",
    avatar: "",
    lastMessage: "Suwun bos!",
    type: "group",
  },
  {
    id: "g3",
    name: "Omah Guyup",
    initials: "OG",
    color: "bg-orange-400",
    avatar: "",
    lastMessage: "Iyoo mas, bener, web e seng simple...",
    unread: 12,
    type: "group",
  },
  {
    id: "g4",
    name: "Sugih Manteb",
    initials: "SM",
    color: "bg-red-400",
    avatar: "",
    lastMessage: "RevenueUpdates.pdf",
    hasFile: true,
    unread: 7,
    type: "group",
  },
  {
    id: "g5",
    name: "Para Habib",
    initials: "PH",
    color: "bg-emerald-500",
    avatar: "",
    lastMessage: "Okay, joss!",
    type: "group",
  },
];

export const persons: Contact[] = [
  {
    id: "p1",
    name: "Rizal Plenger",
    initials: "RP",
    color: "bg-blue-500",
    avatar: "/avatars/rizal.jpg",
    lastMessage: "kicau kicauu...",
    unread: 2,
    type: "person",
  },
  {
    id: "p2",
    name: "Nia Slebeww",
    initials: "NS",
    color: "bg-pink-400",
    avatar: "/avatars/nia.jpg",
    lastMessage: "okee, bentar yaa",
    type: "person",
  },
  {
    id: "p3",
    name: "Kucing Kicau Mania",
    initials: "KK",
    color: "bg-amber-500",
    avatar: "/avatars/kucing.jpg",
    lastMessage: "miawww, miaww, miaww...",
    unread: 14,
    type: "person",
  },
  {
    id: "p4",
    name: "Mas Leclerc",
    initials: "ML",
    color: "bg-red-500",
    avatar: "/avatars/mas.jpg",
    lastMessage: "Thank you Apip 👋",
    unread: 4,
    type: "person",
  },
  {
    id: "p5",
    name: "Pakde Lewis",
    initials: "PL",
    color: "bg-gray-600",
    avatar: "/avatars/pakde.jpg",
    lastMessage: "FerrariOTWSragen.pdf",
    hasFile: true,
    type: "person",
  },
];

export const messages: Message[] = [
  {
    id: "m1",
    sender: "Apip",
    content: "Apip nih bos",
    time: "3:21 PM",
    isMine: false,
    type: "text",
    subMessages: [
      { content: "piyhe web e?, info progress pakkk", isMine: false },
    ],
  },
  {
    id: "m2",
    sender: "amannnnn",
    content: "kurang design bagian ikii iku trus wlelelelelelel besok jadi.",
    time: "3:23 PM",
    isMine: true,
    type: "text",
  },
  {
    id: "m3",
    sender: "Nia Slebeww",
    content: "",
    time: "3:15 PM",
    isMine: false,
    type: "audio",
    subMessages: [
      {
        content: "kalo aku sih kurang minta ini itu yaaa......",
        isMine: false,
      },
    ],
  },
  {
    id: "m4",
    sender: "Rizal Plenger",
    content: "file project pecel mbok darmi",
    time: "3:25 PM",
    isMine: false,
    type: "files",
    files: [
      { name: "RevenueUpdates.pdf", size: "13Mb", type: "pdf" },
      { name: "TrackingUpdates.doc", size: "13Mb", type: "doc" },
    ],
    subMessages: [
      {
        content: "Itu beberapa file dah ku kirim yaaa, kalo butuh lagi kabarin",
        isMine: false,
      },
      { content: "semangatt", isMine: false },
    ],
  },
];
