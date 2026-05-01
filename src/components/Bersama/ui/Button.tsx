import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  icon,
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-lg";

  const variants = {
    primary: "bg-primaryTint text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 focus:ring-slate-500",
    outline: "border border-slate-200 text-slate-700 hover:bg-slate-50 focus:ring-slate-500",
    ghost: "text-slate-600 hover:bg-slate-50 focus:ring-slate-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
