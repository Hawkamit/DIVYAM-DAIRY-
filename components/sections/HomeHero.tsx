"use client";

import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { TRANSLATIONS } from "@/data/translations";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { Play, CheckCircle2, ShieldCheck, Microscope, HeartHandshake } from "lucide-react";
import { motion } from "framer-motion";

export function HomeHero() {
  const { language, openVideoModal } = useAppStore();
  const t = TRANSLATIONS[language];

  const handleWatchStory = () => {
    openVideoModal("/videos/divyam-commercial.mp4");
  };

  const trustBadges = [
    {
      icon: CheckCircle2,
      label: t.heroTrustBadge1,
      desc: language === "hi" ? "दैनिक ताजगी" : "Fresh Daily"
    },
    {
      icon: Microscope,
      label: t.heroTrustBadge2,
      desc: language === "hi" ? "प्रयोगशाला जांच" : "Lab Verified"
    },
    {
      icon: ShieldCheck,
      label: t.heroTrustBadge3,
      desc: language === "hi" ? "स्वच्छ संयंत्र" : "SS-304 Lines"
    },
    {
      icon: HeartHandshake,
      label: t.heroTrustBadge4,
      desc: language === "hi" ? "परिवारों का विश्वास" : "Honest Care"
    }
  ];

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-24 md:pt-28 pb-8 overflow-hidden bg-gradient-to-b from-[#F3F7FF] via-[#FFFDF8] to-[#FFFDF8]">
      {/* Background Decorative Panorama Overlay */}
      <div className="absolute inset-0 z-0 opacity-15 mix-blend-multiply pointer-events-none">
        <SmartImage
          src="/images/generated/hero-farm-panorama.jpg"
          alt="Divyam Dairy Farmland"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Main Hero Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto py-6 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B2A6F] tracking-tight leading-[1.12]"
            >
              <span className="block text-[#0B2A6F] font-serif">
                {t.heroHeadline}
              </span>
            </motion.h1>

            {/* Support Line */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-[#2B3550] max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed"
            >
              {t.heroSubline}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link href="/products">
                <Button size="lg" className="shadow-lg hover:shadow-xl font-bold px-8">
                  {t.heroCtaExplore}
                </Button>
              </Link>

              <button
                onClick={handleWatchStory}
                className="group flex items-center gap-3 px-5 py-3 rounded-full bg-white/90 hover:bg-white text-[#0B2A6F] border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
              >
                <div className="w-10 h-10 rounded-full bg-[#1D5BD6] text-white flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm">
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </div>
                <span className="text-sm font-bold tracking-wide">
                  {t.heroCtaStory}
                </span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Hero Product Pedestal Composition (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[480px] aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white"
            >
              <SmartImage
                src="/images/hero/hero-all-products.jpg"
                alt="Divyam Dairy Products Range"
                fill
                priority
                className="object-cover object-center"
              />

              {/* Floating Quality Seal Badge */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#E5F5EA] flex items-center justify-center text-[#25A244]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#0B2A6F]">
                    {language === "hi" ? "शुद्धता एवं स्वच्छता" : "Daily Lab Tested"}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {language === "hi" ? "प्रयोगशाला में परीक्षित" : "Zero Adulteration"}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Trust Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 pt-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 bg-white/90 backdrop-blur-sm p-4 sm:p-5 rounded-3xl border border-slate-100 shadow-milk">
          {trustBadges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50/80 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#F3F7FF] text-[#1D5BD6] flex items-center justify-center shrink-0 border border-[#E3EDFF]">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B2A6F] truncate">
                    {badge.label}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">
                    {badge.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
