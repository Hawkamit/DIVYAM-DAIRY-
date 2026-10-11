"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Heart,
  Factory,
  Eye,
  Building,
  ArrowRight
} from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { MilkWaveDivider } from "@/components/ui/MilkWaveDivider";
import { FeatureBento } from "@/components/ui/feature-bento";

export function WhyDivyamClient() {
  const { language } = useAppStore();
  const isHi = language === "hi";

  const pillarIcons = [
    Factory,
    Sparkles,
    ShieldCheck,
    Heart,
    Eye,
    Building
  ];

  return (
    <div className="min-h-screen bg-cream-50 pt-28 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumbs" className="flex items-center space-x-2 text-sm text-ink-500 mb-8">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              {isHi ? "होम" : "Home"}
            </Link>
            <ChevronRight className="w-4 h-4 text-line" />
            <span className="text-blue-900 font-medium">
              {isHi ? "दिव्यम ही क्यों?" : "Why Divyam?"}
            </span>
          </nav>

          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-blue-900 tracking-tight leading-[1.12]">
              {isHi ? (
                <>
                  हवा-हवाई वादे नहीं, <br />
                  <span className="text-blue-600">सच्ची स्वच्छता और शुचिता</span>
                </>
              ) : (
                <>
                  Why Choose Divyam? <br />
                  <span className="text-blue-600">Pure Care in Every Drop</span>
                </>
              )}
            </h1>

            {/* Differentiator Quote verbatim from client CSV */}
            <div className="p-6 rounded-2xl bg-white border border-blue-200 shadow-soft max-w-2xl mx-auto">
              <p className="text-base sm:text-lg text-ink-700 italic font-sans leading-relaxed">
                {isHi
                  ? `“हमारा अंतर बढ़ा-चढ़ाकर किए गए दावों में नहीं, बल्कि इस बात में है कि हम अपने उत्पादों को कैसे तैयार करते हैं — स्वच्छता, ज़िम्मेदार प्रसंस्करण, गुणवत्ता और उन परिवारों के भरोसे के साथ जिनकी हम सेवा करते हैं।”`
                  : `“${SITE_CONFIG.differentiator}”`}
              </p>
              <span className="text-xs uppercase tracking-wider text-blue-600 font-bold block mt-3">
                — {SITE_CONFIG.legalEntity}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* MILK WAVE DIVIDER */}
      <div className="relative w-full overflow-hidden my-4">
        <MilkWaveDivider variant="top" fill="#FFFFFF" />
      </div>

      {/* 2. FEATURE BENTO GRID */}
      <section className="bg-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeatureBento
            className="py-0 bg-transparent"
            containerClassName="w-full"
            heroTitle={
              isHi ? (
                <>
                  हर बूंद में शुद्धता
                  <br />
                  और सेहत का भरोसा
                </>
              ) : (
                <>
                  Purity You Can Trust
                  <br />
                  In Every Single Drop
                </>
              )
            }
            heroDescription={
              isHi
                ? "फरीदपुर और रुहेलखंड के चुनिंदा स्थानीय किसानों से सीधे संकलित ताजा दूध, प्रतिदिन सूर्योदय पर सख्त लैब परीक्षण, और शून्य हानिकारक रसायन।"
                : "Real, fresh milk, pure desi ghee, and hygienic paneer collected daily from local farmers, strictly tested in our on-site laboratory, and crafted with zero chemical additives."
            }
            heroImageUrl="/images/generated/hero-farm-panorama.jpg"
            stat1Icon={ShieldCheck}
            stat1Value="100%"
            stat1Label={isHi ? "पूर्ण शुद्धता व लैब परीक्षण" : "Zero Adulteration Guarantee"}
            featureTitle={isHi ? "24 घंटे में फार्म से परिवार" : "Farm to Family in 24h"}
            featureDescription={
              isHi
                ? "सुबह का ताजा दूध उसी दिन आधुनिक मशीनों से स्वच्छ रूप से पाश्चुरीकृत होकर आपके घर पहुंचता है।"
                : "Collected at dawn, chilled at 4°C, and hygienically delivered fresh across Bareilly & Rohilkhand."
            }
            ctaBadge={isHi ? "ताजा उत्पाद" : "Order Fresh"}
            ctaTitle={
              isHi ? (
                <>
                  दैनिक ताजे उत्पाद
                  <br />
                  अभी देखें
                </>
              ) : (
                <>
                  Explore Pure
                  <br />
                  Dairy Products
                </>
              )
            }
            ctaHref="/products"
            stat2Value="15,000+ L"
            stat2Label={isHi ? "दैनिक गुणवत्ता परीक्षण" : "Liters Quality-Tested Daily"}
            stat3Value="99.8%"
            stat3Label={isHi ? "संतुष्ट परिवारों का भरोसा" : "Family Satisfaction Rate"}
          />
        </div>
      </section>

      {/* 3. THE 6 WHY DIVYAM PILLARS */}
      <section className="bg-white py-12 lg:py-16 border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-blue-900 tracking-tight">
              {isHi ? "जो हमें हर परिवार का चहेता बनाता है" : "What Sets Divyam Apart"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SITE_CONFIG.whyDivyamPillars.map((pillar, idx) => {
              const IconComp = pillarIcons[idx % pillarIcons.length];

              return (
                <div
                  key={pillar.title}
                  className="p-8 rounded-3xl bg-cream-50/70 border border-line shadow-xs hover:border-blue-300 hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6">
                    <IconComp className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-blue-900 mb-3">
                    {isHi ? pillar.titleHi : pillar.title}
                  </h3>
                  <p className="text-sm text-ink-600 leading-relaxed font-sans">
                    {isHi ? pillar.descHi : pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. COMPARISON & COMMITMENT */}
      <section className="py-20 bg-blue-50/50 border-t border-line">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-line shadow-soft">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-blue-900 mb-3">
                {isHi ? "हमारा स्पष्ट वादा" : "Our Clear Commitment"}
              </h2>
              <p className="text-sm text-ink-500 font-sans">
                {isHi
                  ? "हम केवल वही कहते हैं जो हम हर दिन अपनी प्रयोगशाला और संयंत्र में करते हैं।"
                  : "We only claim what we verify every single day in our plant and laboratory."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-green-50/60 border border-green-200 space-y-3">
                <span className="text-xs uppercase font-bold tracking-wider text-green-800 block">
                  {isHi ? "हम क्या करते हैं:" : "What We Practice:"}
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-green-950 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span>{isHi ? "दैनिक प्रयोगशाला में दूध की जांच" : "Daily laboratory milk testing"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span>{isHi ? "अनावश्यक रसायनों और मिलावट से सुरक्षा" : "Avoiding unnecessary chemicals and adulterants"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span>{isHi ? "स्टेनलेस स्टील SS-304 मशीन प्रोसेसिंग" : "SS-304 hygienic machine processing"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                    <span>{isHi ? "खाद्य-ग्रेड FSSAI प्रमाणित पैकेजिंग" : "Food-grade FSSAI compliant packaging"}</span>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
                <span className="text-xs uppercase font-bold tracking-wider text-blue-800 block">
                  {isHi ? "हमारा दृष्टिकोण:" : "Our Approach:"}
                </span>
                <ul className="space-y-2 text-xs sm:text-sm text-blue-950 font-medium">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{isHi ? "घर जैसा शुद्ध और स्वाभाविक स्वाद" : "Authentic home-like dairy taste"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{isHi ? "स्थानीय किसानों और परिवारों का सशक्तिकरण" : "Empowering local farmers and households"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{isHi ? "पारदर्शी और ईमानदार व्यावसायिक मूल्य" : "Transparent, honest business values"}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{isHi ? "निरंतर ग्राहक सेवा और फीडबैक" : "Continuous customer support and feedback"}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="pt-12 pb-8 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" href="/products">
              {isHi ? "उत्पाद देखें" : "Explore Products"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="whatsapp" size="lg" href="/contact">
              {isHi ? "संपर्क करें" : "Contact Divyam Dairy"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
