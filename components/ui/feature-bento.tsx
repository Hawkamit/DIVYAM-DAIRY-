"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  LucideIcon
} from "lucide-react";

export interface FeatureBentoProps {
  heroBadge?: string;
  heroTitle?: React.ReactNode;
  heroDescription?: string;
  heroImageUrl?: string;
  heroImages?: string[];
  stat1Icon?: LucideIcon;
  stat1Value?: string;
  stat1Label?: string;
  stat1ImageUrl?: string;
  stat1Images?: string[];
  featureIcon?: LucideIcon;
  featureTitle?: string;
  featureDescription?: string;
  featureImageUrl?: string;
  featureImages?: string[];
  ctaBadge?: string;
  ctaTitle?: React.ReactNode;
  ctaHref?: string;
  ctaImageUrl?: string;
  ctaImages?: string[];
  stat2Value?: string;
  stat2Label?: string;
  stat2ImageUrl?: string;
  stat2Images?: string[];
  stat3Value?: string;
  stat3Label?: string;
  stat3ImageUrl?: string;
  stat3Images?: string[];
  className?: string;
  containerClassName?: string;
}

// Background Slideshow component that smoothly crossfades through images
const BoxSlideshow: React.FC<{
  images: string[];
  interval?: number;
  opacityClass?: string;
}> = ({ images, interval = 4500, opacityClass = "opacity-30" }) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images, interval]);

  if (!images || images.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {images.map((img, idx) => (
        <div
          key={`${img}-${idx}`}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out group-hover:scale-105 ${
            idx === currentIdx
              ? `${opacityClass} scale-100`
              : "opacity-0 scale-105"
          }`}
          style={{ backgroundImage: `url('${img}')` }}
        />
      ))}
    </div>
  );
};

export const FeatureBento: React.FC<FeatureBentoProps> = ({
  heroBadge,
  heroTitle = (
    <>
      Purity You Can Trust
      <br />
      In Every Single Drop
    </>
  ),
  heroDescription = "Real, fresh milk, pure desi ghee, and hygienic paneer crafted with strict laboratory testing and cold-chain care for healthy families.",
  heroImageUrl,
  heroImages = [
    "/images/generated/hero-farm-panorama.jpg",
    "/images/generated/process-01-sourcing.jpg",
    "/images/generated/story-quote-splash.jpg"
  ],
  stat1Icon: Stat1Icon = ShieldCheck,
  stat1Value = "100%",
  stat1Label = "Zero Adulteration Guarantee",
  stat1ImageUrl,
  stat1Images = [
    "/images/generated/quality-lab-testing.jpg",
    "/images/generated/process-02-testing.jpg",
    "/images/generated/process-04-qc.jpg"
  ],
  featureIcon: FeatureIcon = Sparkles,
  featureTitle = "Farm to Family in 24h",
  featureDescription = "Collected at dawn from trusted local dairy farmers, chilled at 4°C, and delivered fresh across Bareilly & Rohilkhand.",
  featureImageUrl,
  featureImages = [
    "/images/generated/process-milk-pour.jpg",
    "/images/generated/process-packaging-line.jpg",
    "/images/generated/process-03-processing.jpg"
  ],
  ctaBadge = "Order Fresh",
  ctaTitle = (
    <>
      Explore Pure
      <br />
      Dairy Products
    </>
  ),
  ctaHref = "/products",
  ctaImageUrl,
  ctaImages = [
    "/images/hero/hero-all-products.jpg",
    "/images/products/product-ghee.jpg",
    "/images/products/product-full-cream-milk.jpg",
    "/images/products/product-paneer.jpg",
    "/images/products/product-dahi.jpg",
    "/images/products/product-chaach.jpg"
  ],
  stat2Value = "15,000+ L",
  stat2Label = "Quality-Tested Daily",
  stat2ImageUrl,
  stat2Images = [
    "/images/generated/hero-plant-process.jpg",
    "/images/generated/delivery-truck.jpg",
    "/images/generated/process-06-coldchain.jpg"
  ],
  stat3Value = "99.8%",
  stat3Label = "Customer Satisfaction Rate",
  stat3ImageUrl,
  stat3Images = [
    "/images/generated/hero-family-morning.jpg",
    "/images/generated/story-family-milk.jpg",
    "/images/generated/process-08-family.jpg"
  ],
  className = "",
  containerClassName = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Normalize image lists (if single imageUrl prop passed, prepend to list)
  const resolvedHeroImages = heroImageUrl ? [heroImageUrl, ...heroImages.filter(x => x !== heroImageUrl)] : heroImages;
  const resolvedStat1Images = stat1ImageUrl ? [stat1ImageUrl, ...stat1Images.filter(x => x !== stat1ImageUrl)] : stat1Images;
  const resolvedFeatureImages = featureImageUrl ? [featureImageUrl, ...featureImages.filter(x => x !== featureImageUrl)] : featureImages;
  const resolvedCtaImages = ctaImageUrl ? [ctaImageUrl, ...ctaImages.filter(x => x !== ctaImageUrl)] : ctaImages;
  const resolvedStat2Images = stat2ImageUrl ? [stat2ImageUrl, ...stat2Images.filter(x => x !== stat2ImageUrl)] : stat2Images;
  const resolvedStat3Images = stat3ImageUrl ? [stat3ImageUrl, ...stat3Images.filter(x => x !== stat3ImageUrl)] : stat3Images;

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cards = container.querySelectorAll<HTMLElement>("[data-bento-card]");
    if (!cards.length) return;

    let closestIndex = 0;
    let minDistance = Infinity;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  const scrollToIndex = (idx: number) => {
    if (!scrollContainerRef.current) return;
    const cards = scrollContainerRef.current.querySelectorAll<HTMLElement>("[data-bento-card]");
    if (cards[idx]) {
      cards[idx].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
      setActiveIndex(idx);
    }
  };

  return (
    <section className={`bg-background py-10 font-manrope ${className}`}>
      <div className={containerClassName}>
        {/* Mobile Swipe / Slide Tracker Top Bar */}
        <div className="flex md:hidden items-center justify-between mb-3 px-1">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 uppercase tracking-wider">
            <span>दाएँ से बाएँ स्वाइप करें</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500 font-medium">Slide ({activeIndex + 1}/6)</span>
          </div>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Slide to card ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === i ? "w-6 bg-blue-600" : "w-2 bg-blue-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Sliding Carousel on Mobile / 3-Column Bento Grid on Desktop */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-3 gap-4 md:gap-5 md:auto-rows-[280px] overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth no-scrollbar pb-3 pt-1 px-4 sm:px-0 -mx-4 sm:mx-0"
        >
          {/* Card 1: Hero Card - Large (2 cols, 2 rows) with Slideshow */}
          <div
            data-bento-card="0"
            className="w-[84vw] max-w-[340px] shrink-0 snap-center h-[380px] md:h-auto md:w-auto md:max-w-none md:shrink md:col-span-2 md:row-span-2 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950 rounded-3xl p-8 sm:p-10 text-white flex flex-col justify-end relative overflow-hidden group shadow-lg"
          >
            <BoxSlideshow images={resolvedHeroImages} interval={4200} opacityClass="opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

            <div className="relative z-10 space-y-3">
              {heroBadge && (
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold border border-white/20">
                  <span className="size-2 bg-emerald-400 rounded-full animate-pulse" />
                  {heroBadge}
                </div>
              )}
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight font-serif">
                {heroTitle}
              </h3>
              <p className="max-w-xl text-white/90 text-sm sm:text-base leading-relaxed font-sans">
                {heroDescription}
              </p>
            </div>
          </div>

          {/* Card 2: Stats Card 1 (Laboratory Testing Slideshow) */}
          <div
            data-bento-card="1"
            className="w-[84vw] max-w-[340px] shrink-0 snap-center h-[380px] md:h-auto md:w-auto md:max-w-none md:shrink bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 rounded-3xl p-8 text-white flex flex-col justify-between relative overflow-hidden group transition-all shadow-md hover:shadow-xl"
          >
            <BoxSlideshow images={resolvedStat1Images} interval={4800} opacityClass="opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/95 via-blue-900/65 to-blue-950/40" />

            <div className="relative z-10">
              <div className="size-14 text-white rounded-2xl bg-blue-600/80 backdrop-blur-sm flex items-center justify-center text-2xl mb-4 border border-white/20 shadow-sm">
                <Stat1Icon className="w-7 h-7" />
              </div>
              <h4 className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tight">
                {stat1Value}
              </h4>
              <p className="text-blue-50 font-medium text-sm sm:text-base leading-snug">
                {stat1Label}
              </p>
            </div>
            <div className="relative z-10 text-xs font-semibold text-blue-100 flex items-center gap-1.5 pt-4 border-t border-white/15">
              <span>02 · Strict Laboratory Testing</span>
            </div>
          </div>

          {/* Card 3: Feature Card (Processing & Fresh Milk Slideshow) */}
          <div
            data-bento-card="2"
            className="w-[84vw] max-w-[340px] shrink-0 snap-center h-[380px] md:h-auto md:w-auto md:max-w-none md:shrink bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 rounded-3xl p-8 text-white flex flex-col justify-between relative overflow-hidden group shadow-md hover:shadow-xl border border-white/10"
          >
            <BoxSlideshow images={resolvedFeatureImages} interval={5200} opacityClass="opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30" />

            <div className="relative z-10">
              <div className="size-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xl font-bold transition-transform group-hover:scale-110 shadow-sm">
                <FeatureIcon className="w-6 h-6" />
              </div>
              <div className="space-y-2 mt-5">
                <h4 className="text-2xl font-bold text-white tracking-tight font-serif">
                  {featureTitle}
                </h4>
                <p className="text-slate-200 text-sm leading-relaxed">
                  {featureDescription}
                </p>
              </div>
            </div>
            <div className="relative z-10 text-xs font-semibold text-slate-300 flex items-center gap-1.5 pt-4 border-t border-white/15">
              <span>03 · Speed & Freshness Guarantee</span>
            </div>
          </div>

          {/* Card 4: CTA Card (Artisanal Products Slideshow) */}
          <Link
            data-bento-card="3"
            href={ctaHref}
            className="w-[84vw] max-w-[340px] shrink-0 snap-center h-[380px] md:h-auto md:w-auto md:max-w-none md:shrink bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 rounded-3xl p-8 text-white flex flex-col justify-between relative overflow-hidden transition-all cursor-pointer group shadow-md hover:shadow-xl"
          >
            <BoxSlideshow images={resolvedCtaImages} interval={4400} opacityClass="opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/35" />

            <div className="relative z-10 flex justify-between items-start">
              <span className="text-xs font-bold uppercase tracking-wider bg-white/20 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/10">
                {ctaBadge}
              </span>
              <div className="size-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-xl group-hover:bg-blue-600 group-hover:rotate-45 transition-all">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </div>
            <div className="relative z-10 space-y-2">
              <h4 className="text-2xl font-bold leading-tight tracking-tight group-hover:text-blue-300 transition-colors font-serif">
                {ctaTitle}
              </h4>
              <p className="text-xs text-neutral-300">
                दूध, घी, पनीर, दही और छाछ · ऑर्डर करें
              </p>
            </div>
            <div className="relative z-10 text-xs font-semibold text-neutral-300 flex items-center gap-1.5 pt-4 border-t border-white/15">
              <span>04 · Same-Day Route Dispatch</span>
            </div>
          </Link>

          {/* Card 5: Stats Card 2 (Plant & Cold Chain Slideshow) */}
          <div
            data-bento-card="4"
            className="w-[84vw] max-w-[340px] shrink-0 snap-center h-[380px] md:h-auto md:w-auto md:max-w-none md:shrink bg-gradient-to-br from-gray-950 via-slate-900 to-neutral-950 rounded-3xl p-8 text-white flex flex-col justify-between relative overflow-hidden group shadow-md hover:shadow-xl"
          >
            <BoxSlideshow images={resolvedStat2Images} interval={5000} opacityClass="opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/30" />

            <div className="relative z-10 flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                दैनिक परीक्षण
              </span>
              <span className="relative flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex size-3 rounded-full bg-blue-500"></span>
              </span>
            </div>
            <div className="relative z-10 py-4">
              <span className="text-4xl sm:text-5xl font-black bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent tracking-tight">
                {stat2Value}
              </span>
              <p className="text-xs uppercase tracking-widest text-neutral-300 font-semibold mt-2">
                {stat2Label}
              </p>
            </div>
            <div className="relative z-10 text-xs font-semibold text-neutral-300 flex items-center gap-1.5 pt-4 border-t border-white/15">
              <span>05 · Stainless Steel Processing</span>
            </div>
          </div>

          {/* Card 6: Stats Card 3 (Happy Families & Breakfast Slideshow) */}
          <div
            data-bento-card="5"
            className="w-[84vw] max-w-[340px] shrink-0 snap-center h-[380px] md:h-auto md:w-auto md:max-w-none md:shrink bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 rounded-3xl p-8 text-white flex flex-col justify-between relative overflow-hidden group hover:shadow-2xl transition-all shadow-md"
          >
            <BoxSlideshow images={resolvedStat3Images} interval={4600} opacityClass="opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/95 via-blue-900/65 to-blue-950/40" />

            <div className="relative z-10 text-xs font-bold uppercase tracking-wider text-blue-200">
              उपभोक्ता संतुष्टि
            </div>
            <div className="relative z-10 py-4">
              <span className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                {stat3Value}
              </span>
              <p className="text-xs uppercase tracking-widest text-blue-100 font-semibold mt-2">
                {stat3Label}
              </p>
            </div>
            <div className="relative z-10 text-xs font-semibold text-blue-100 flex items-center gap-1.5 pt-4 border-t border-white/15">
              <span>06 · Trusted by Local Families</span>
            </div>
          </div>
        </div>

        {/* Mobile Slide Controls Bottom Bar */}
        <div className="flex md:hidden items-center justify-between mt-3 px-1">
          <button
            type="button"
            onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            aria-label="Previous card"
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white border border-blue-200 text-blue-900 disabled:opacity-30 disabled:cursor-not-allowed shadow-xs active:scale-95 transition-all"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>पिछला</span>
          </button>

          <span className="text-[11px] font-medium text-slate-500">
            Swipe left & right
          </span>

          <button
            type="button"
            onClick={() => scrollToIndex(Math.min(5, activeIndex + 1))}
            disabled={activeIndex === 5}
            aria-label="Next card"
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-600 text-white disabled:opacity-30 disabled:cursor-not-allowed shadow-xs active:scale-95 transition-all"
          >
            <span>अगला</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeatureBento;
