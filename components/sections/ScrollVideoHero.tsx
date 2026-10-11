"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Play,
  CheckCircle2,
  ShieldCheck,
  Microscope,
  HeartHandshake,
  ArrowRight
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { TRANSLATIONS } from "@/data/translations";
import { SITE_CONFIG } from "@/data/site";
import { Button } from "@/components/ui/Button";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollVideoHero() {
  const { language, openVideoModal } = useAppStore();
  const t = TRANSLATIONS[language];
  const isHi = language === "hi";

  // DOM Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);

  // States
  const [isPreloading, setIsPreloading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [loadPercent, setLoadPercent] = useState(30);
  const [hasError, setHasError] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [videoDuration, setVideoDuration] = useState<number>(10.008);

  // Check reduced motion preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setIsReducedMotion(mediaQuery.matches);

      const handleChange = (e: MediaQueryListEvent) => {
        setIsReducedMotion(e.matches);
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  // Preloader transition out helper - foolproof, pure state-driven
  const dismissPreloader = useCallback(() => {
    setLoadPercent(100);
    setIsExiting(true);
    setTimeout(() => {
      setIsPreloading(false);
      try {
        ScrollTrigger.refresh();
      } catch (e) {
        // ignore
      }
    }, 280);
  }, []);

  // Video Loading Lifecycle Handlers
  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video && Number.isFinite(video.duration) && video.duration > 0) {
      setVideoDuration(video.duration);
      try {
        video.currentTime = 0.001;
      } catch (e) {
        // ignore seek restriction
      }
    }
  };

  const handleLoadedData = () => {
    setLoadPercent(95);
    dismissPreloader();
  };

  const handleCanPlay = () => {
    setLoadPercent(100);
    dismissPreloader();
  };

  const handleVideoError = () => {
    console.warn("Video failed to buffer or load over network, using poster fallback.");
    setHasError(true);
    dismissPreloader();
  };

  // Immediate inspection of video readyState on mount + ultra-fast 450ms ticker to guarantee dismissal
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      try {
        video.load();
      } catch (e) {
        // ignore
      }

      if (video.readyState >= 2) {
        // Already buffered enough for initial frame
        dismissPreloader();
        return;
      }
    }

    // Fast simulated progress: 30% -> 68% -> 92% -> 100% within 450ms
    const t1 = setTimeout(() => setLoadPercent(68), 100);
    const t2 = setTimeout(() => setLoadPercent(92), 220);
    const t3 = setTimeout(() => {
      dismissPreloader();
    }, 450);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [dismissPreloader]);

  // GSAP ScrollTrigger Setup
  useEffect(() => {
    if (isPreloading || isReducedMotion || hasError) return;

    const container = containerRef.current;
    const pinned = pinnedRef.current;
    const video = videoRef.current;
    const tagline = taglineRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!container || !pinned || !video) return;

    // Use GSAP context for clean garbage collection & strict unmount cleanup
    const ctx = gsap.context(() => {
      // 1. Tagline exit animation: fades & moves up in first ~15-20% of scroll distance (2-3 gestures)
      if (tagline) {
        gsap.to(tagline, {
          opacity: 0,
          y: -30,
          ease: "power1.out",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "+=500",
            scrub: 0.5
          }
        });
      }

      // 2. Scroll indicator prompt exit animation
      if (scrollIndicator) {
        gsap.to(scrollIndicator, {
          opacity: 0,
          y: 20,
          ease: "power1.out",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "+=220",
            scrub: true
          }
        });
      }

      // 3. Video currentTime scrub animation
      const duration = videoDuration || 10.008;
      const proxy = { time: 0 };

      gsap.to(proxy, {
        time: duration,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "+=2600", // Pinned scroll distance (~2.5 screen heights)
          scrub: 0.4,
          pin: pinned,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (video && Number.isFinite(self.progress)) {
              const targetTime = self.progress * duration;
              // Direct seek without stutter
              if (Math.abs(video.currentTime - targetTime) > 0.02) {
                video.currentTime = targetTime;
              }
            }
          }
        }
      });
    }, container);

    // Responsive resize & orientation listener
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, [isPreloading, isReducedMotion, hasError, videoDuration]);

  const trustBadges = [
    {
      icon: CheckCircle2,
      label: t.heroTrustBadge1,
      desc: isHi ? "दैनिक ताजगी" : "Fresh Daily"
    },
    {
      icon: Microscope,
      label: t.heroTrustBadge2,
      desc: isHi ? "प्रयोगशाला जांच" : "Lab Verified"
    },
    {
      icon: ShieldCheck,
      label: t.heroTrustBadge3,
      desc: isHi ? "स्वच्छ संयंत्र" : "SS-304 Lines"
    },
    {
      icon: HeartHandshake,
      label: t.heroTrustBadge4,
      desc: isHi ? "परिवारों का विश्वास" : "Honest Care"
    }
  ];

  return (
    <>
      {/* 1. FUNCTIONAL PRELOADER (§7 & §8: Fast, non-blocking, user can click to skip, auto-dismisses in 0.5s max) */}
      {isPreloading && (
        <div
          ref={preloaderRef}
          onClick={() => {
            setIsExiting(true);
            setIsPreloading(false);
            try { ScrollTrigger.refresh(); } catch (e) {}
          }}
          style={{
            animation: "preloaderEmergencyFade 0.4s ease-out 1.2s forwards",
          }}
          className={`fixed inset-0 z-50 bg-[#0B2A6F] flex flex-col items-center justify-center p-6 text-white cursor-pointer select-none transition-all duration-300 ${
            isExiting ? "opacity-0 pointer-events-none scale-98" : "opacity-100"
          }`}
        >
          <div className="max-w-sm w-full mx-auto text-center space-y-6">
            <div className="relative w-44 h-16 mx-auto bg-white/95 p-2 rounded-2xl shadow-xl flex items-center justify-center">
              <Image
                src="/images/real/logo.png"
                alt={SITE_CONFIG.brandName}
                width={160}
                height={55}
                priority
                className="object-contain"
              />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-serif font-bold text-[#F5B921] tracking-wide">
                {SITE_CONFIG.taglineHindi}
              </h2>
              <p className="text-xs text-blue-200/90 font-sans tracking-wide">
                {SITE_CONFIG.taglineEnglish}
              </p>
            </div>

            {/* Minimal Progress Bar */}
            <div className="w-full bg-blue-950/80 rounded-full h-1.5 overflow-hidden border border-blue-800">
              <div
                className="h-full bg-gradient-to-r from-yellow-400 via-white to-yellow-400 transition-all duration-200 ease-out"
                style={{ width: `${loadPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-blue-300 font-mono">
              <span>{isHi ? "सिनेमैटिक अनुभव तैयार हो रहा है..." : "Preparing Cinematic Journey..."}</span>
              <span>{loadPercent}%</span>
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-blue-300/80 underline underline-offset-4 hover:text-white">
                {isHi ? "प्रवेश करने के लिए क्लिक करें →" : "Click anywhere to enter →"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. PINNED SCROLL HERO WRAPPER */}
      <section
        ref={containerRef}
        className="relative w-full bg-[#0B2A6F]"
        style={{ minHeight: isReducedMotion ? "100vh" : "calc(100vh + 2600px)" }}
      >
        {/* Pinned Viewport Container (100svh for stable mobile address bar behavior) */}
        <div
          ref={pinnedRef}
          className="relative w-full h-[100svh] overflow-hidden flex flex-col justify-between"
        >
          {/* A. VIDEO ELEMENT (§1, §3, §10, §12 — Native MP4 faststart + WebM dense keyframes) */}
          {!isReducedMotion && !hasError ? (
            <video
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              poster="/images/hero/hero-video-poster.jpg"
              onLoadedMetadata={handleLoadedMetadata}
              onLoadedData={handleLoadedData}
              onCanPlay={handleCanPlay}
              onError={handleVideoError}
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none z-0"
            >
              {/* Universal H.264 FastStart MP4 first: loads instantly in Safari, iPhone, Chrome & Firefox */}
              <source
                src="/videos/hero-scroll-journey.mp4"
                type="video/mp4"
              />
              {/* Dense-keyframe WebM fallback */}
              <source
                src="/videos/hero-scroll-journey-optimized.webm"
                type="video/webm"
              />
              <source
                src="/videos/hero-scroll-journey.webm"
                type="video/webm"
              />
            </video>
          ) : (
            /* Reduced Motion or Error fallback static poster */
            <div className="absolute inset-0 w-full h-full z-0">
              <Image
                src="/images/hero/hero-video-poster.jpg"
                alt="Divyam Dairy Countryside"
                fill
                priority
                className="object-cover object-center"
              />
            </div>
          )}

          {/* B. SUBTLE VISUAL OVERLAY (§5: No heavy dark boxes, delicate scrim for contrast) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B2A6F]/65 via-transparent to-[#0B2A6F]/75 pointer-events-none z-1" />

          {/* C. HERO TAGLINE & UI (Exits upon scroll within first 15-20%) */}
          <div
            ref={taglineRef}
            className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-auto pt-28 pb-12 flex flex-col items-center lg:items-start text-center lg:text-left text-white"
          >
            {/* Main Headline (Bilingual & Serif with subtle text-shadow per §5) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.14] max-w-3xl drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)]">
              <span className="block font-serif text-white mb-2">
                {t.heroHeadline}
              </span>
            </h1>

            {/* Support Line */}
            <p className="text-base sm:text-lg lg:text-xl text-blue-50 max-w-2xl font-medium leading-relaxed mt-4 drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
              {t.heroSubline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-8">
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-[#1D5BD6] hover:bg-[#154bb3] text-white shadow-xl hover:shadow-2xl font-bold px-8 rounded-full border border-blue-400/40"
                >
                  {t.heroCtaExplore}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <button
                type="button"
                onClick={() => openVideoModal("/videos/divyam-commercial.mp4")}
                className="group flex items-center gap-3 px-5 py-3 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-md text-white border border-white/30 shadow-md transition-all active:scale-95"
              >
                <div className="w-10 h-10 rounded-full bg-white text-[#0B2A6F] flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm">
                  <Play className="w-4 h-4 fill-[#0B2A6F] ml-0.5" />
                </div>
                <span className="text-sm font-bold tracking-wide">
                  {t.heroCtaStory}
                </span>
              </button>
            </div>
          </div>

          {/* D. BOTTOM TRUST BADGES (Fixed inside pinned viewport) */}
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3 sm:p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-xl text-white">
              {trustBadges.map((badge, idx) => {
                const IconComponent = badge.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 px-2 py-1">
                    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0 border border-white/25">
                      <IconComponent className="w-4 h-4 text-yellow-300" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate leading-tight">
                        {badge.label}
                      </p>
                      <p className="text-[11px] text-blue-200/90 truncate leading-tight">
                        {badge.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* E. FLOATING SCROLL INTERACTION PROMPT (§19: "My scroll is controlling the video") */}
          {!isReducedMotion && !hasError && (
            <div
              ref={scrollIndicatorRef}
              className="absolute bottom-28 sm:bottom-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center text-white/90 space-y-1.5"
            >
              <span className="text-[11px] uppercase tracking-widest font-bold text-yellow-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                {isHi ? "स्क्रॉल करके यात्रा देखें" : "Scroll to explore journey"}
              </span>
              <div className="w-6 h-9 rounded-full border-2 border-white/60 flex items-start justify-center p-1 bg-black/20 backdrop-blur-xs shadow-md">
                <div className="w-1.5 h-2.5 rounded-full bg-yellow-400 animate-bounce" />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
