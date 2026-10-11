"use client";

import React from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { TRANSLATIONS } from "@/data/translations";
import { StepsFlow, StepItem } from "@/components/ui/StepsFlow";
import { Button } from "@/components/ui/Button";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export function FarmToFamilyBanner() {
  const { language } = useAppStore();
  const t = TRANSLATIONS[language];
  const isHi = language === "hi";

  const homeSteps: StepItem[] = [
    {
      number: "01",
      title: isHi ? "विश्वसनीय स्थानीय डेयरी फार्म" : "Trusted Local Dairy Farms",
      text: isHi
        ? "रुहेलखंड और बरेली के हरे-भरे ग्रामीण क्षेत्रों में स्वच्छ वातावरण और प्राकृतिक चारे के साथ पाली जाने वाली स्वस्थ गायें और भैंसें।"
        : "Healthy, well-nourished Indian dairy cattle grazing in green rural fields around Bareilly and Rohilkhand, cared for with natural feed and clean water.",
      image: "/images/generated/hero-farm-panorama.jpg"
    },
    {
      number: "02",
      title: isHi ? "जिम्मेदार सुबह का दूध संकलन" : "Responsible Morning Milk Sourcing",
      text: isHi
        ? "स्थानीय किसानों से रोज सुबह स्वच्छ, फूड-ग्रेड स्टेनलेस स्टील के बर्तनों में ताजा दूध एकत्रित कर सीधे प्रोसेसिंग प्लांट तक लाया जाता है।"
        : "Milk is sourced fresh from local farmers every morning in clean, food-grade steel cans, ensuring prompt transport to our processing plant.",
      image: "/images/generated/process-01-sourcing.jpg"
    },
    {
      number: "03",
      title: isHi ? "दैनिक ऑन-साइट लैब गुणवत्ता जांच" : "Daily Laboratory Quality Testing",
      text: isHi
        ? "प्लांट में प्रवेश से पहले प्रत्येक बैच की फैट प्रतिशत, एसएनएफ और शून्य-मिलावट शुद्धता की ऑन-साइट आधुनिक लैब में सख्त जांच होती है।"
        : "Every incoming batch undergoes rigorous laboratory screening for fat percentage, SNF, and purity parameters before it is accepted into processing.",
      image: "/images/generated/quality-lab-testing.jpg"
    },
    {
      number: "04",
      title: isHi ? "स्वच्छ मशीनी व पाश्चराइज्ड प्रोसेसिंग" : "Hygienic Machine Processing",
      text: isHi
        ? "स्टेनलेस स्टील (SS-304) संयंत्र में नियंत्रित तापमान पर स्वचालित पाश्चराइजेशन, मानकीकरण और स्वच्छता से बिना किसी अवांछित रसायन के प्रसंस्करण।"
        : "Milk flows through enclosed SS-304 stainless-steel vats and pasteurization lines, maintaining precise temperature control with zero manual touch.",
      image: "/images/generated/hero-plant-process.jpg"
    },
    {
      number: "05",
      title: isHi ? "खाद्य-ग्रेड सुरक्षित सीलबंद पैकेजिंग" : "Food-Grade Safe Packaging",
      text: isHi
        ? "स्वचालित मशीनों द्वारा बिना छुए मल्टी-लेयर खाद्य-ग्रेड पाउच, कप और सीलबंद जार में सुरक्षित पैकेजिंग, FSSAI मानकों के पूर्ण अनुपालन के साथ।"
        : "Automated, untouched pouch-filling and hermetic sealing in multi-layer food-grade materials complying with FSSAI regulations.",
      image: "/images/generated/process-05-packaging.jpg"
    },
    {
      number: "06",
      title: isHi ? "चिल्ड कोल्ड-चेन दैनिक सुबह की डिलीवरी" : "Prompt Chilled Cold-Chain Delivery",
      text: isHi
        ? "4°C से नीचे कोल्ड स्टोरेज में संरक्षित और इंसुलेटेड डिलीवरी वाहनों द्वारा आपके नजदीकी स्टोर्स और परिवारों तक समय पर सुरक्षित वितरण।"
        : "Packed dairy products are maintained below 4°C and dispatched in insulated delivery vehicles to reach your doorstep and retail partners fresh daily.",
      image: "/images/generated/delivery-truck.jpg"
    }
  ];

  return (
    <section className="relative bg-white pt-14 pb-16 md:pt-20 md:pb-24 border-b border-slate-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1D5BD6]/10 text-[#1D5BD6] text-xs font-bold uppercase tracking-widest mb-3.5">
            <Sparkles className="w-3.5 h-3.5 text-[#1D5BD6]" />
            <span>{isHi ? "खेत से रसोई तक • हमारी प्रक्रिया" : "Farm to Family • Our Process"}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#0B2A6F] font-serif tracking-tight leading-tight">
            {t.secFarmToFamilyBanner}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 mt-3.5 leading-relaxed font-medium max-w-2xl mx-auto">
            {t.secFarmToFamilySub}
          </p>
        </div>

        {/* StepsFlow Animated Journey Component */}
        <div className="relative">
          <StepsFlow
            steps={homeSteps}
            accentColor="#1D5BD6"
            lineColor="#E2E8F0"
            cornerMaskColor="#FFFFFF"
            numberColor="#0B2A6F"
            titleColor="#0B2A6F"
            textColor="#475569"
            numberTitleGap={24}
            titleTextGap={10}
            gridGap={68}
            imageRadius={22}
            mobileBreakpoint={809}
            imageAnimation="fade"
            mobileImageGap={16}
            lineWidth={8}
            dotSize={24}
            showDots={true}
            cornerRadius={44}
          />
        </div>

        {/* Bottom CTA & Trust Indicators */}
        <div className="mt-14 md:mt-20 pt-10 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-slate-700 text-sm font-medium">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              {isHi
                ? "FSSAI और प्रयोगशाला-प्रमाणित शुद्धता हर कदम पर सुनिश्चित।"
                : "100% purity, zero adulterants, and strict temperature control at every step."}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/farm-to-family">
              <Button variant="primary" size="md" className="flex items-center gap-2 font-bold px-6">
                <span>{t.secSeeJourney}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <Link href="/quality">
              <Button variant="outline" size="md" className="px-5">
                {t.navQuality}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
