"use client";

import React from "react";
import Link from "next/link";
import {
  Heart,
  ShieldCheck,
  Sparkles,
  Users,
  Award,
  CheckCircle2,
  ChevronRight,
  Quote,
  ArrowRight,
  TrendingUp,
  Factory
} from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import { useAppStore } from "@/lib/store";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { MilkWaveDivider } from "@/components/ui/MilkWaveDivider";

export function OurStoryClient() {
  const { language } = useAppStore();
  const isHi = language === "hi";

  const valueIcons = [
    Award,
    ShieldCheck,
    CheckCircle2,
    Heart,
    Factory,
    TrendingUp
  ];

  return (
    <div className="min-h-screen bg-cream-50 pt-28 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumbs" className="flex items-center space-x-2 text-sm text-ink-500 mb-8">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              {isHi ? "होम" : "Home"}
            </Link>
            <ChevronRight className="w-4 h-4 text-line" />
            <span className="text-blue-900 font-medium">
              {isHi ? "हमारी कहानी" : "Our Story"}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-blue-900 tracking-tight leading-[1.12]">
                {isHi ? (
                  <>
                    शुद्धता और भरोसे की <span className="text-blue-600">एक पारिवारिक यात्रा</span>
                  </>
                ) : (
                  <>
                    More than just dairy. <br />
                    <span className="text-blue-600">A promise of purity.</span>
                  </>
                )}
              </h1>

              <p className="text-lg sm:text-xl text-ink-700 font-sans leading-relaxed">
                {isHi
                  ? "दिव्यम डेयरी की शुरुआत एक बेहद सरल विचार के साथ हुई — जो भोजन हम अपने परिवार को परोसते हैं, वह उसी देखभाल और ईमानदारी से बनना चाहिए जो हम अपने बच्चों को देते हैं।"
                  : "Divyam Dairy began with a simple thought: the food we serve our families should be made with the exact care we would give our own children."}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button variant="primary" size="lg" href="/products">
                  {isHi ? "हमारे उत्पाद देखें" : "Explore Our Products"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" size="lg" href="/farm-to-family">
                  {isHi ? "फार्म-से-परिवार यात्रा" : "Farm to Family Process"}
                </Button>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5">
              <div className="relative aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <SmartImage
                  src="/images/generated/hero-family-morning.jpg"
                  alt="Divyam Dairy family morning milk"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs uppercase tracking-wider text-yellow-400 font-bold block mb-1">
                    {SITE_CONFIG.legalEntity}
                  </span>
                  <p className="text-sm font-medium leading-snug">
                    {isHi
                      ? "हर सुबह हर घर तक शुद्ध और स्वच्छ डेयरी उत्पाद।"
                      : "Delivering wholesome, pure dairy products to households every morning."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MILK WAVE DIVIDER */}
      <div className="relative w-full overflow-hidden my-4">
        <MilkWaveDivider variant="top" fill="#FFFFFF" />
      </div>

      {/* 2. THE FOUNDER'S NARRATIVE SECTION */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-blue-900 tracking-tight">
              {isHi ? "चिंता से जन्म लिया एक भरोसेमंद संकल्प ने" : "From Concern to a Vision of Care"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-5 text-ink-700 font-sans leading-relaxed text-base">
              <p>
                {isHi
                  ? "रोजमर्रा के खान-पान में मिलावट और स्वच्छता की कमी की बढ़ती चिंताओं ने संस्थापकों (पति-पत्नी) को प्रेरित किया कि वे अपने क्षेत्र के परिवारों के लिए एक ऐसा डेयरी ब्रांड स्थापित करें जिस पर आंख मूंदकर भरोसा किया जा सके।"
                  : "Concerns about hygiene, quality, and adulteration in everyday dairy products led the founders (husband and wife) to establish Divyam Dairy: milk and dairy made under clean, strictly hygienic, and carefully monitored conditions."}
              </p>
              <p>
                {isHi
                  ? "हमने एक आधुनिक प्रोसेसिंग प्लांट की नींव रखी, जहां प्रत्येक बैच का परीक्षण हमारी अपनी इन-हाउस प्रयोगशाला में किया जाता है। हम अनावश्यक रसायनों से बचते हुए, भोजन-ग्रेड पैकेजिंग में प्राकृतिक पोषण प्रदान करते हैं।"
                  : "We set up an advanced facility with dedicated laboratory testing for every batch before processing, avoiding unnecessary chemicals and packaging in certified food-grade materials."}
              </p>
              <p className="font-semibold text-blue-900">
                {isHi
                  ? "जो चिंता हमारे अपने परिवार से शुरू हुई थी, वह आज अनगिनत परिवारों के लिए ताजगी, शुचिता और पारदर्शिता का सशक्त माध्यम बन चुकी है।"
                  : "What began as concern for our own family has grown into a lasting commitment of responsibility, hygiene, and transparency for every household we serve."}
              </p>
            </div>

            <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-soft border border-line">
              <SmartImage
                src="/images/generated/hero-plant-process.jpg"
                alt="Divyam Dairy hygienic processing plant"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES SECTION */}
      <section className="py-20 bg-blue-50/50 border-y border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-blue-900">
              {isHi ? "सिद्धांत जो हमारे हर निर्णय का मार्गदर्शन करते हैं" : "Principles That Guide Every Batch"}
            </h2>
            <p className="text-sm sm:text-base text-ink-500 mt-3">
              {isHi
                ? "हम झूठे दावों के बजाय सच्ची कार्यप्रणाली और निरंतर परीक्षण में विश्वास रखते हैं।"
                : "We believe in honest practices, continuous laboratory checks, and uncompromising hygiene."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SITE_CONFIG.brandValues.map((val, idx) => {
              const IconComp = valueIcons[idx % valueIcons.length];
              return (
                <div
                  key={val.title}
                  className="bg-white rounded-2xl p-7 border border-line shadow-xs hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 border border-blue-100">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-blue-900 mb-2">
                    {isHi ? val.titleHi : val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-600 leading-relaxed">
                    {isHi ? val.descHi : val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. OUR JOURNEY TIMELINE (5 Milestones — Strictly No Fabricated Years) */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-blue-900">
              {isHi ? "विचार से ब्रांड लॉन्च तक का सफर" : "From Foundation to Launch"}
            </h2>
          </div>

          <div className="relative border-l-2 border-blue-200 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
            {SITE_CONFIG.journeyMilestones.map((milestone) => (
              <div key={milestone.step} className="relative group">
                {/* Yellow Number Badge */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-yellow-500 text-blue-950 font-bold text-xs sm:text-sm flex items-center justify-center shadow-md ring-4 ring-white">
                  {milestone.step}
                </div>

                <div className="bg-cream-50/80 rounded-2xl p-6 border border-line shadow-xs group-hover:border-blue-300 transition-colors">
                  <h3 className="text-xl font-serif font-bold text-blue-900 mb-2">
                    {isHi ? milestone.titleHi : milestone.title}
                  </h3>
                  <p className="text-sm text-ink-600 leading-relaxed font-sans">
                    {isHi ? milestone.descriptionHi : milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE FOUNDER'S PULL-QUOTE CARD OVER MILK SPLASH */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden bg-[#0B2A6F] text-white p-8 sm:p-14 shadow-2xl">
            {/* Background subtle milk splash image overlay */}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay">
              <SmartImage
                src="/images/generated/hero-milk-splash.jpg"
                alt="Milk splash"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
              <Quote className="w-12 h-12 text-yellow-400 mx-auto opacity-80" />
              <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold leading-snug tracking-tight">
                {isHi
                  ? "“अगर हम इसे अपने परिवार को परोसना नहीं चाहेंगे, तो हम इसे आपके परिवार के लिए कभी नहीं बनाएंगे।”"
                  : `“${SITE_CONFIG.pullQuote}”`}
              </blockquote>
              <div className="pt-2">
                <span className="text-sm font-semibold tracking-wider uppercase text-yellow-400 block">
                  — {SITE_CONFIG.quoteAuthor}
                </span>
                <span className="text-xs text-blue-200 block mt-1">
                  {SITE_CONFIG.brandName}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="pt-8 pb-12 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-blue-900 mb-4">
            {isHi ? "आज ही हमारे शुद्ध डेयरी उत्पादों का अनुभव करें" : "Experience Wholesome Dairy Quality Today"}
          </h2>
          <p className="text-sm text-ink-500 mb-8 font-sans">
            {isHi
              ? "फुल क्रीम दूध, ताज़ा पनीर, पारंपरिक मटका दही और शुद्ध देशी घी का आनंद लें।"
              : "Discover Full Cream Milk, Fresh Paneer, Traditional Matka Dahi, and Pure Desi Ghee."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" href="/products">
              {isHi ? "उत्पाद देखें" : "View All Products"}
            </Button>
            <Button variant="whatsapp" size="lg" href="/contact">
              {isHi ? "हमसे संपर्क करें" : "Contact Our Team"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
