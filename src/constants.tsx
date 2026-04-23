import {
  Award,
  BookOpen,
  ClipboardList,
  Globe,
  Inbox,
  LayoutDashboard,
  Users,
} from "lucide-react";

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
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Inbox, label: "Kotak Masuk", active: false },
  { icon: BookOpen, label: "Pembelajaran", active: false },
  { icon: ClipboardList, label: "Tugas", active: false },
  { icon: Users, label: "Grup", active: false },
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
