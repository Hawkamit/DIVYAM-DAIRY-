"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppStore } from "@/lib/store";

interface HeroSlide {
  id: string;
  desktopImage: string;
  mobileImage: string;
  alt: string;
  link: string;
  themeColor: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "all-products",
    desktopImage: "/images/hero/hero-all-products.jpg",
    mobileImage: "/images/hero/hero-all-products-mobile.jpg",
    alt: "Divyam Dairy Products - Pure Goodness For a Healthier Happier Tomorrow - Milk, Paneer, Doodh, Dahi, Ghee",
    link: "/products",
    themeColor: "#A5D4FB"
  },
  {
    id: "milk",
    desktopImage: "/images/hero/hero-milk.jpg",
    mobileImage: "/images/hero/hero-milk-mobile.jpg",
    alt: "Divyam Fresh Milk - The Purity You Can Trust - Rich, Creamy, Full of Goodness",
    link: "/products?category=milk",
    themeColor: "#9ED7FA"
  },
  {
    id: "dahi",
    desktopImage: "/images/hero/hero-dahi.jpg",
    mobileImage: "/images/hero/hero-dahi-mobile.jpg",
    alt: "Divyam Dahi - Creamy Goodness for a Healthier You - Thick & Creamy, Natural Nutrition",
    link: "/products?category=dahi-chaach",
    themeColor: "#D4E8A8"
  },
  {
    id: "ghee",
    desktopImage: "/images/hero/hero-ghee.jpg",
    mobileImage: "/images/hero/hero-ghee-mobile.jpg",
    alt: "Divyam Danedaar Desi Ghee - The Golden Goodness of Pure Tradition - Rich in Taste, Natural Nutrition",
    link: "/products?category=ghee",
    themeColor: "#F7DF9E"
  }
];

const AUTOPLAY_INTERVAL = 6000;

export function HeroBannerSlider() {
  const { language } = useAppStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx);
  };

  // Autoplay timer
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <section
      className="relative w-full pt-16 md:pt-[72px] overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: currentSlide.themeColor }}
    >
      {/* Visually hidden H1 for SEO and Screen Readers */}
      <h1 className="sr-only">
        {language === "hi"
          ? "दिव्यम डेयरी प्रोडक्ट्स - शुद्ध, सुरक्षित और भरोसेमंद डेयरी उत्पाद"
          : "Divyam Dairy Products - Pure Goodness For a Healthier Happier Tomorrow"}
      </h1>

      {/* Fullscreen Hero Slider Container (Mobile fullscreen: 100svh - 64px, Desktop fullscreen: 100vh - 72px) */}
      <div
        className="relative w-full h-[calc(100svh-64px)] md:h-[calc(100vh-72px)] min-h-[480px] md:min-h-[500px] md:max-h-[920px] overflow-hidden group select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Link
              href={currentSlide.link}
              className="block relative w-full h-full cursor-pointer focus:outline-none"
              tabIndex={0}
              aria-label={currentSlide.alt}
            >
              {/* Responsive Picture: 9:16 vertical on mobile, 16:9 widescreen on desktop */}
              <picture className="block w-full h-full">
                <source
                  media="(max-width: 767px)"
                  srcSet={currentSlide.mobileImage}
                />
                <source
                  media="(min-width: 768px)"
                  srcSet={currentSlide.desktopImage}
                />
                <img
                  src={currentSlide.desktopImage}
                  alt={currentSlide.alt}
                  className="w-full h-full object-cover object-center select-none pointer-events-none"
                  loading={currentIndex === 0 ? "eager" : "lazy"}
                />
              </picture>
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Floating Left Arrow */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            prevSlide();
          }}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white text-[#0B2A6F] shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none border border-white/60 opacity-80 md:opacity-0 md:group-hover:opacity-100"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Floating Right Arrow */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            nextSlide();
          }}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 md:w-12 md:h-12 rounded-full bg-white/80 hover:bg-white text-[#0B2A6F] shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none border border-white/60 opacity-80 md:opacity-0 md:group-hover:opacity-100"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 md:gap-2 px-3 py-1.5 rounded-full bg-black/25 backdrop-blur-md border border-white/30 shadow-md">
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={`dot-${slide.id}`}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`h-1.5 md:h-2 transition-all duration-300 rounded-full focus:outline-none ${
                  isActive
                    ? "w-5 md:w-6 bg-white shadow-xs"
                    : "w-1.5 md:w-2 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}
        </div>

        {/* Slide Counter (Desktop) */}
        <div className="hidden sm:flex absolute bottom-4 md:bottom-6 right-6 lg:right-8 z-30 items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 backdrop-blur-md text-[11px] font-bold text-white border border-white/20 shadow-xs">
          <span>0{currentIndex + 1}</span>
          <span className="text-white/50">/</span>
          <span className="text-white/70">0{HERO_SLIDES.length}</span>
        </div>
      </div>
    </section>
  );
}
