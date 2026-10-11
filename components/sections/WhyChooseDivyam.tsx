"use client";

import { useAppStore } from "@/lib/store";
import { TRANSLATIONS } from "@/data/translations";
import { SITE_CONFIG } from "@/data/site";
import { FeatureBento } from "@/components/ui/feature-bento";
import {
  ShieldCheck,
  Leaf,
  Microscope,
  Heart,
  Eye,
  Building2,
  Clock
} from "lucide-react";

export function WhyChooseDivyam() {
  const { language } = useAppStore();
  const t = TRANSLATIONS[language];
  const isHi = language === "hi";

  const icons = [
    ShieldCheck,
    Leaf,
    Microscope,
    Heart,
    Eye,
    Building2
  ];

  return (
    <section className="py-20 md:py-24 bg-[#FFFDF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2A6F] font-serif tracking-tight">
            {t.secWhyChooseDivyam}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            {t.secWhyChooseDivyamSub}
          </p>
        </div>

        {/* Feature Bento Grid */}
        <div className="mb-16">
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
                ? "फरीदपुर और रुहेलखंड के चुनिंदा स्थानीय डेयरी किसानों से सीधा संकलन, प्रतिदिन सूर्योदय पर सख्त लैब परीक्षण, और बिना किसी रासायनिक मिलावट के स्वच्छता से तैयार।"
                : "Real, fresh milk, pure desi ghee, and hygienic dairy collected daily from local farmers, strictly tested in our on-site laboratory, and crafted with zero chemical additives."
            }
            heroImageUrl="/images/generated/hero-farm-panorama.jpg"
            stat1Icon={ShieldCheck}
            stat1Value="100%"
            stat1Label={isHi ? "पूर्ण शुद्धता व लैब परीक्षण" : "Zero Adulteration Guarantee"}
            featureIcon={Clock}
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

        {/* 6 Key Pillars Subheader */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h3 className="text-2xl sm:text-3xl font-bold text-[#0B2A6F] font-serif">
            {isHi ? "जो हमें हर परिवार का चहेता बनाता है" : "The Standards Behind Every Product"}
          </h3>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SITE_CONFIG.whyDivyamPillars.map((pillar, idx) => {
            const Icon = icons[idx] || ShieldCheck;
            return (
              <div
                key={idx}
                className="group bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-milk hover:shadow-milk-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F3F7FF] text-[#1D5BD6] group-hover:bg-[#1D5BD6] group-hover:text-white flex items-center justify-center transition-colors mb-6 border border-[#E3EDFF]">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-[#0B2A6F] mb-2 leading-snug">
                    {isHi ? pillar.titleHi : pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                    {isHi ? pillar.descHi : pillar.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-50 flex items-center justify-between text-[11px] font-bold text-slate-400">
                  <span>0{idx + 1}</span>
                  <span className="text-[#1D5BD6] opacity-0 group-hover:opacity-100 transition-opacity">
                    Divyam Standard
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Client's Genuine Differentiator Card */}
        <div className="mt-14 max-w-4xl mx-auto bg-gradient-to-r from-[#F3F7FF] to-[#FFFDF8] rounded-3xl p-6 sm:p-8 border border-[#E3EDFF] text-center shadow-sm">
          <p className="text-sm sm:text-base font-semibold text-[#0B2A6F] leading-relaxed italic">
            &ldquo;{SITE_CONFIG.differentiator}&rdquo;
          </p>
          <p className="text-xs text-slate-500 mt-2 font-bold uppercase tracking-wider">
            — {SITE_CONFIG.legalEntity}
          </p>
        </div>
      </div>
    </section>
  );
}
