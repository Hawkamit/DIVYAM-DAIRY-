import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "whatsapp" | "outline" | "ghost" | "yellow" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  href?: string;
  target?: string;
  rel?: string;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      disabled,
      children,
      href,
      target,
      rel,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100 cursor-pointer text-decoration-none";

    const variantStyles = {
      primary:
        "bg-[#1D5BD6] hover:bg-[#154bb3] text-white shadow-milk hover:shadow-milk-lg hover:-translate-y-0.5 rounded-full",
      whatsapp:
        "bg-[#25A244] hover:bg-[#1e8738] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 rounded-full font-semibold",
      outline:
        "border-2 border-[#1D5BD6] text-[#1D5BD6] hover:bg-[#F3F7FF] rounded-full",
      ghost:
        "text-[#1B2430] hover:bg-slate-100/80 rounded-full",
      yellow:
        "bg-[#F5B921] hover:bg-[#e0a615] text-[#0B2A6F] font-bold shadow-md hover:shadow-lg rounded-full",
      danger:
        "bg-red-600 hover:bg-red-700 text-white rounded-full"
    };

    const sizeStyles = {
      sm: "h-9 px-4 text-xs tracking-wide",
      md: "h-11 px-6 text-sm tracking-wide min-h-[44px]",
      lg: "h-13 px-8 text-base tracking-wide min-h-[48px]",
      icon: "h-11 w-11 p-0 rounded-full min-h-[44px] min-w-[44px]"
    };

    const combinedClasses = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      const isExternal =
        href.startsWith("http") ||
        href.startsWith("tel:") ||
        href.startsWith("mailto:") ||
        href.startsWith("https://wa.me");

      if (isExternal) {
        return (
          <a
            href={href}
            target={target || (href.startsWith("http") ? "_blank" : undefined)}
            rel={rel || (href.startsWith("http") ? "noopener noreferrer" : undefined)}
            className={combinedClasses}
          >
            {children}
          </a>
        );
      }

      return (
        <Link href={href} className={combinedClasses}>
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={combinedClasses}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
