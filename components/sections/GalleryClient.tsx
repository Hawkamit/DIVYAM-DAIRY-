"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronRight,
  X,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  Maximize2,
  Sparkles
} from "lucide-react";
import { GALLERY_ITEMS, GalleryItem } from "@/data/gallery";
import { useAppStore } from "@/lib/store";
import { SmartImage } from "@/components/ui/SmartImage";
import { MilkWaveDivider } from "@/components/ui/MilkWaveDivider";

export function GalleryClient() {
  const { language } = useAppStore();
  const isHi = language === "hi";

  const categories = [
    { id: "all", label: "All", labelHi: "सभी" },
    { id: "products", label: "Products", labelHi: "उत्पाद" },
    { id: "farm", label: "Farm", labelHi: "फार्म" },
    { id: "processing", label: "Processing", labelHi: "प्रोसेसिंग" },
    { id: "packaging", label: "Packaging", labelHi: "पैकेजिंग" },
    { id: "delivery", label: "Delivery", labelHi: "डिलीवरी" },
    { id: "family", label: "Family", labelHi: "परिवार" },
    { id: "lifestyle", label: "Lifestyle", labelHi: "लाइफस्टाइल" },
    { id: "behind-the-scenes", label: "Behind the Scenes", labelHi: "लैब व परीक्षण" }
  ];

  const [activeCategory, setActiveCategory] = useState("all");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  // Close lightbox on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveLightboxIndex(null);
      } else if (e.key === "ArrowRight" && activeLightboxIndex !== null) {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : null
        );
      } else if (e.key === "ArrowLeft" && activeLightboxIndex !== null) {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIndex, filteredItems.length]);

  const activeItem =
    activeLightboxIndex !== null ? filteredItems[activeLightboxIndex] : null;

  return (
    <div className="min-h-screen bg-cream-50 pt-28 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumbs" className="flex items-center space-x-2 text-sm text-ink-500 mb-8">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              {isHi ? "होम" : "Home"}
            </Link>
            <ChevronRight className="w-4 h-4 text-line" />
            <span className="text-blue-900 font-medium">
              {isHi ? "गैलरी" : "Gallery"}
            </span>
          </nav>

          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-blue-900 tracking-tight">
              {isHi ? "हमारी फोटो गैलरी" : "Our Visual Journey"}
            </h1>

            <p className="text-base sm:text-lg text-ink-600 font-sans max-w-2xl mx-auto">
              {isHi
                ? "हरे-भरे खेतों, स्वच्छ प्रसंस्करण संयंत्र, दैनिक परीक्षण प्रयोगशाला और खुशहाल परिवारों की एक झलक।"
                : "Explore glimpses of rural pastures, hygienic processing plant, daily testing laboratory, and happy families."}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setActiveLightboxIndex(null);
                  }}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-white text-ink-700 border border-line hover:border-blue-400 hover:bg-blue-50/50"
                  }`}
                >
                  {isHi ? cat.labelHi : cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* MILK WAVE DIVIDER */}
      <div className="relative w-full overflow-hidden my-4">
        <MilkWaveDivider variant="top" fill="#FFFFFF" />
      </div>

      {/* 2. MASONRY GRID */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setActiveLightboxIndex(idx)}
                className="group relative rounded-3xl overflow-hidden shadow-xs hover:shadow-soft border border-line cursor-pointer break-inside-avoid transition-all duration-300 hover:-translate-y-1 bg-cream-50"
              >
                <div
                  className={`relative w-full ${
                    item.aspect === "portrait"
                      ? "aspect-3/4"
                      : item.aspect === "square"
                      ? "aspect-square"
                      : "aspect-4/3"
                  }`}
                >
                  <SmartImage
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Pill on top left */}
                  <span className="absolute top-4 left-4 text-[11px] font-semibold bg-white/90 backdrop-blur-xs text-blue-900 px-3 py-1 rounded-full shadow-xs border border-line">
                    {isHi ? item.categoryLabelHi : item.categoryLabel}
                  </span>

                  {/* Expand icon on top right */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 backdrop-blur-xs flex items-center justify-center text-blue-900 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-4 h-4" />
                  </div>

                  {/* Caption at bottom */}
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h3 className="font-serif font-bold text-base mb-0.5">
                      {isHi ? item.titleHi : item.title}
                    </h3>
                    <p className="text-xs text-blue-100/90 line-clamp-2 font-sans">
                      {isHi ? item.descriptionHi : item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ACCESSIBLE LIGHTBOX MODAL */}
      {activeItem && activeLightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-blue-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-20"
            aria-label="Close image lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            type="button"
            onClick={() =>
              setActiveLightboxIndex(
                (activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length
              )
            }
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-20"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={() =>
              setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length)
            }
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-20"
            aria-label="Next image"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="relative w-full aspect-16/10 sm:aspect-16/9 bg-slate-950 flex items-center justify-center">
              <SmartImage
                src={activeItem.src}
                alt={activeItem.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="p-6 sm:p-8 bg-white border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-blue-600 block mb-1">
                  {isHi ? activeItem.categoryLabelHi : activeItem.categoryLabel}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-blue-900">
                  {isHi ? activeItem.titleHi : activeItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-ink-600 font-sans mt-1">
                  {isHi ? activeItem.descriptionHi : activeItem.description}
                </p>
              </div>

              <span className="text-xs text-ink-400 font-sans whitespace-nowrap self-end sm:self-center">
                {activeLightboxIndex + 1} / {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
