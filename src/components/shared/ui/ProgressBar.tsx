import React from "react";

interface ProgressBarProps {
  progress: number; // 0 to 100
  colorClass?: string;
  bgColorClass?: string;
  className?: string;
}

export function ProgressBar({
  progress,
  colorClass = "bg-primary",
  bgColorClass = "bg-slate-100",
  className = "",
}: ProgressBarProps) {
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={`w-full ${bgColorClass} rounded-full h-2.5 overflow-hidden ${className}`}>
      <div
        className={`${colorClass} h-full rounded-full transition-all duration-500`}
        style={{ width: `${safeProgress}%` }}
      />
    </div>
  );
}
