"use client";

import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { TRANSLATIONS } from "@/data/translations";
import { SITE_CONFIG } from "@/data/site";
import { PRODUCTS } from "@/data/products";
import { ARTICLES } from "@/data/articles";
import { HeroBannerSlider } from "@/components/sections/HeroBannerSlider";
import { FarmToFamilyBanner } from "@/components/sections/FarmToFamilyBanner";
import { WhyChooseDivyam } from "@/components/sections/WhyChooseDivyam";
import { LovedByFamilies } from "@/components/sections/LovedByFamilies";
import { DeliveryAreaStrip } from "@/components/sections/DeliveryAreaStrip";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ProductCarouselFramer } from "@/components/product/ProductCarouselFramer";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Clock } from "lucide-react";

export default function HomePage() {
  const { language } = useAppStore();
  const t = TRANSLATIONS[language];

  // 3 Articles for Home
  const featuredArticles = ARTICLES.slice(0, 3);

  return (
    <div className="w-full">
      {/* 1. Interactive Hero Banner Slider */}
      <HeroBannerSlider />

      {/* 2. Brand Intro Section */}
      <section className="pt-10 pb-8 sm:pt-12 sm:pb-9 md:pt-14 md:pb-10 bg-white border-b border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#0B2A6F] font-serif leading-tight tracking-tight">
            {language === "hi"
              ? "हर घर के लिए शुद्ध, सुरक्षित और भरोसेमंद डेयरी"
              : "Making Everyday Dairy a Trusted Part of Every Household"}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium mt-3">
            {language === "hi"
              ? "दिव्यम डेयरी प्रोडक्ट्स लाता है उच्च गुणवत्ता वाले डेयरी उत्पाद — दूध, घी, छाछ, खोया, पनीर और दही। गुणवत्ता और निरंतरता पर ध्यान केंद्रित करते हुए, हमारा उद्देश्य शुद्ध डेयरी को हर परिवार का अटूट हिस्सा बनाना है।"
              : SITE_CONFIG.introText}
          </p>

          <div className="mt-3.5">
            <Link
              href="/our-story"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1D5BD6] hover:text-[#0B2A6F] transition-colors hover:underline"
            >
              <span>{language === "hi" ? "हमारी पूरी कहानी पढ़ें →" : "Read the full founder story →"}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Popular Daily Essentials (Moved from Section 7) */}
      <section className="pt-7 pb-10 sm:pt-8 sm:pb-12 md:pt-9 md:pb-14 bg-[#FFFDF8] border-b border-slate-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductCarouselFramer
            products={PRODUCTS}
            columns={3}
            gap={24}
            radius={20}
          />
        </div>
      </section>

      {/* 4. Farm to Family Banner */}
      <FarmToFamilyBanner />

      {/* 5. Why Choose Divyam */}
      <WhyChooseDivyam />

      {/* 8. Loved by Families Section */}
      <LovedByFamilies />

      {/* 9. Dairy Knowledge Hub Preview */}
      <section className="py-20 md:py-24 bg-[#F3F7FF]/50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0B2A6F] font-serif">
                {t.secDairyKnowledge}
              </h2>
              <p className="text-sm text-slate-500 mt-1 max-w-xl">
                {t.secDairyKnowledgeSub}
              </p>
            </div>

            <Link href="/knowledge-hub">
              <Button variant="outline" size="md" className="flex items-center gap-2">
                <span>{language === "hi" ? "सभी लेख पढ़ें" : "All Articles"}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {featuredArticles.map((art) => (
              <Link
                key={art.id}
                href={`/knowledge-hub/${art.slug}`}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-milk hover:shadow-milk-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
              >
                <div>
                  <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                    <SmartImage
                      src={art.image}
                      alt={art.title}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#1D5BD6] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                      {language === "hi" ? art.categoryHi : art.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-[#F5B921]" />
                      <span>{language === "hi" ? art.readTimeHi : art.readTime}</span>
                      <span>•</span>
                      <span>{art.date}</span>
                    </div>

                    <h3 className="text-base font-bold text-[#0B2A6F] group-hover:text-[#1D5BD6] transition-colors line-clamp-2 leading-snug">
                      {language === "hi" ? art.titleHi : art.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {language === "hi" ? art.excerptHi : art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <span className="text-xs font-bold text-[#1D5BD6] inline-flex items-center gap-1 group-hover:underline">
                    <span>{language === "hi" ? "पूरा पढ़ें" : "Read More"}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Delivery Area Strip */}
      <DeliveryAreaStrip />

      {/* 11. Final CTA */}
      <FinalCTA />
    </div>
  );
}
