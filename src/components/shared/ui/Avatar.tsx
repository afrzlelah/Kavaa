import React from "react";
import { AvatarProps } from "@/types";
import Image from "next/image";

const sizeClasses = {
  sm: "w-8 h-8 text-[10px]",
  md: "w-10 h-10 text-xs",
  lg: "w-12 h-12 text-sm",
  xl: "w-16 h-16 text-base",
};

export function Avatar({
  src,
  initials,
  alt = "Avatar",
  size = "md",
  className = "",
}: AvatarProps) {
  const sizeClass = sizeClasses[size];

  if (src) {
    return (
      <div className={`${sizeClass} rounded-full overflow-hidden shrink-0 relative ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`${sizeClass} rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-bold shrink-0 ${className}`}
    >
      {initials || "?"}
    </div>
  );
}
