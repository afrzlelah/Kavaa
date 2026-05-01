import React from "react";

interface ProgressBarProps {
  progress: number; // 0 to 100
  colorClass?: string;
  bgColorClass?: string;
  className?: string;
}

export function ProgressBar({
  progress,
  colorClass = "bg-primaryTint",
  bgColorClass = "bg-slate-100",
  className = "",
}: ProgressBarProps) {
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div
      className={`w-full  ${bgColorClass} rounded-full overflow-hidden ${className || "h-2.5"}`}
    >
      <div
        className={`${colorClass} h-full rounded-full transition-all duration-500`}
        style={{ width: `${safeProgress}%` }}
      />
    </div>
  );
}
