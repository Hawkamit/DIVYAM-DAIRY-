"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface FooterOversizedWordmarkProps {
  text?: string;
  href?: string;
  className?: string;
}

export function FooterOversizedWordmark({
  text = "DIVYAM DAIRY PRODUCTS",
  href = "/",
  className = ""
}: FooterOversizedWordmarkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof window !== "undefined" && window.location.pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`relative w-full overflow-hidden select-none pt-8 sm:pt-10 md:pt-14 pb-2 sm:pb-3 ${className}`}
      aria-label={text}
    >
      <Link
        href={href}
        onClick={handleClick}
        className="group block w-full outline-none focus-visible:ring-2 focus-visible:ring-[#F5B921] rounded-2xl"
        title={`${text} — Back to top`}
      >
        <motion.div
          whileHover={{
            opacity: 0.95,
            scale: 1.006,
            transition: { duration: 0.35, ease: [0.42, 0, 0.58, 1] }
          }}
          whileTap={{ scale: 0.995 }}
          className="relative w-full flex items-center justify-center cursor-pointer overflow-hidden"
          style={{
            mask: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,1) 100%) add",
            WebkitMask:
              "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,1) 100%) add"
          }}
        >
          {/* SVG Scaled Wordmark: Mathematically locks 100% width edge-to-edge without overflow */}
          <svg
            viewBox="0 0 1600 170"
            className="w-full h-auto max-h-[120px] sm:max-h-[170px] md:max-h-[220px] lg:max-h-[280px]"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="divyamWordmarkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.1" />
                <stop offset="35%" stopColor="#FFFFFF" stopOpacity="0.45" />
                <stop offset="75%" stopColor="#FFFFFF" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.98" />
              </linearGradient>

              <linearGradient id="divyamWordmarkHoverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F5B921" stopOpacity="0.15" />
                <stop offset="35%" stopColor="#F5B921" stopOpacity="0.55" />
                <stop offset="75%" stopColor="#F5B921" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#F5B921" stopOpacity="1" />
              </linearGradient>
            </defs>

            <text
              x="50%"
              y="136"
              textAnchor="middle"
              className="fill-white/80 group-hover:fill-[#F5B921] transition-colors duration-500 font-serif font-black tracking-tight uppercase"
              style={{
                fontSize: "116px",
                letterSpacing: "-0.045em",
                fontWeight: 900
              }}
            >
              {text}
            </text>
          </svg>
        </motion.div>
      </Link>
    </div>
  );
}
