import React from "react";

interface AvatarProps {
  src?: string;
  initials?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

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
      <img
        src={src}
        alt={alt}
        className={`${sizeClass} rounded-full object-cover shrink-0 ${className}`}
      />
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
