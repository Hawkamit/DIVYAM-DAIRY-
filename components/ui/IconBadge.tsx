import React from "react";
import { cn } from "@/lib/utils";

interface IconBadgeProps {
  children: React.ReactNode;
  variant?: "blue" | "green" | "yellow" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function IconBadge({
  children,
  variant = "blue",
  size = "md",
  className
}: IconBadgeProps) {
  const variantStyles = {
    blue: "bg-[#F3F7FF] text-[#1D5BD6] border border-[#E3EDFF]",
    green: "bg-[#E5F5EA] text-[#25A244] border border-[#d1ecd7]",
    yellow: "bg-[#FFF4D1] text-[#b8860b] border border-[#ffe699]",
    white: "bg-white text-[#1D5BD6] shadow-sm border border-slate-100"
  };

  const sizeStyles = {
    sm: "w-8 h-8 min-w-[32px] text-xs",
    md: "w-11 h-11 min-w-[44px] text-sm",
    lg: "w-14 h-14 min-w-[56px] text-base"
  };

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-105",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </div>
  );
}
