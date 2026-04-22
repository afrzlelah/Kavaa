import React from "react";
import { Clock, Star, BrainCircuit } from "lucide-react";
import { CourseCardProps } from "@/type";

export default function CourseCard({
  category,
  title,
  description,
  instructor,
  participants,
  rating,
  duration,
  level,
  progress,
  isFree,
  theme,
  price,
}: CourseCardProps) {
  return (
    <div className="w-full bg-white rounded-4xl overflow-hidden shadow-xl shadow-slate-200/60 border border-slate-100 group transition-all duration-300 hover:-translate-y-1">
      {/* Header Card  */}
      <div
        className={`relative h-48 bg-linear-to-br ${theme} p-6 flex flex-col justify-between`}
      >
        {/* Rating Tag */}
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/30 px-2 py-1 rounded-full flex items-center gap-1">
          <Star size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-[10px] font-bold text-white">{rating}</span>
        </div>

        {/* Icon Container */}
        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/40 shadow-inner">
          <BrainCircuit className="text-white" size={32} strokeWidth={1.5} />
        </div>

        {/* Category & Participants */}
        <div className="text-white">
          <p className="text-[10px] font-black tracking-[0.2em] uppercase opacity-90 leading-tight">
            {category}
          </p>
          <p className="text-[11px] font-medium opacity-80">
            {participants} peserta
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4">
        {/* Badges */}
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-full">
            {level}
          </span>
          <div className="flex items-center gap-1 text-slate-400 text-[10px] font-medium">
            <Clock size={12} />
            <span>{duration}</span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {title}
          </h3>
          <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-2 pt-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white shadow-sm">
            DS
          </div>
          <span className="text-xs font-semibold text-slate-700">
            {instructor}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between items-center text-[10px] font-bold">
            <span className="text-slate-400 uppercase tracking-wider">
              Progress preview
            </span>
            <span className="text-slate-600">{progress}%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-indigo-500 to-cyan-400 transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Footer: Price & Action */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <span className="text-xl font-black text-slate-900">
            {isFree ? "Free" : "Premium"}
          </span>
          <button className="px-6 py-2 border border-slate-200 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            {price}
          </button>
        </div>
      </div>
    </div>
  );
}
