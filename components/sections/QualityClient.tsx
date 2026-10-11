"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  FlaskConical,
  Sparkles,
  Award,
  Thermometer,
  Layers,
  ArrowRight,
  FileCheck2,
  AlertCircle
} from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import { useAppStore } from "@/lib/store";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { MilkWaveDivider } from "@/components/ui/MilkWaveDivider";

export function QualityClient() {
  const { language } = useAppStore();
  const isHi = language === "hi";

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
              {isHi ? "गुणवत्ता एवं स्वच्छता" : "Quality & Hygiene"}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-blue-900 tracking-tight leading-[1.12]">
                {isHi ? (
                  <>
                    हर बूँद में शुद्धता, <br />
                    <span className="text-blue-600">कड़े स्वच्छता मानकों के साथ</span>
                  </>
                ) : (
                  <>
                    Uncompromising Hygiene. <br />
                    <span className="text-blue-600">Daily Laboratory Testing.</span>
                  </>
                )}
              </h1>

              <p className="text-lg text-ink-700 font-sans leading-relaxed">
                {isHi
                  ? "दिव्यम डेयरी में हम विश्वास करते हैं कि गुणवत्ता केवल दावों से नहीं, बल्कि दैनिक कड़े परीक्षणों, साफ-सुथरे संयंत्र और पारदर्शी प्रसंस्करण से सिद्ध होती है।"
                  : "At Divyam Dairy Products, quality is not measured by exaggerated marketing, but by daily laboratory testing, disciplined hygiene protocols, and food-grade packaging."}
              </p>

              {/* FSSAI Registration Callout Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-blue-200 shadow-xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <FileCheck2 className="w-8 h-8 text-blue-600 shrink-0" />
                  <div>
                    <span className="text-xs text-ink-500 uppercase tracking-wider block font-semibold">
                      {isHi ? "खाद्य सुरक्षा अनुपालन" : "Food Safety Compliance"}
                    </span>
                    <strong className="text-base text-blue-950 font-mono">
                      FSSAI Lic. No. {SITE_CONFIG.fssaiNumber}
                    </strong>
                  </div>
                </div>
                <span className="hidden sm:inline-block text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium border border-blue-100">
                  {SITE_CONFIG.legalEntity}
                </span>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5">
              <div className="relative aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <SmartImage
                  src="/images/real/quality-lab-testing.jpg"
                  alt="Divyam Dairy laboratory testing"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase mb-1">
                    <FlaskConical className="w-4 h-4" />
                    {isHi ? "इन-हाउस प्रयोगशाला" : "On-Site Laboratory"}
                  </div>
                  <p className="text-sm font-medium">
                    {isHi
                      ? "प्लांट में उपयोग से पहले प्रत्येक दूध बैच का परीक्षण किया जाता है।"
                      : "Every milk batch is tested for fat and SNF before entering processing."}
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

      {/* 2. THE 7 HYGIENE PRACTICES */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-blue-900 tracking-tight">
              {isHi ? "हमारी 7 स्वच्छता और गुणवत्ता प्रणालियाँ" : "Our Seven Daily Hygiene & Quality Protocols"}
            </h2>
            <p className="text-sm sm:text-base text-ink-500 mt-3 font-sans">
              {isHi
                ? "कच्चे दूध के आगमन से लेकर सीलबंद पैकेट के डिस्पैच तक स्वच्छता हमारी सर्वोच्च प्राथमिकता है।"
                : "From milk arrival to sealed pack dispatch, hygiene is engineered into every stage."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {SITE_CONFIG.hygienePractices.map((practice) => (
              <div
                key={practice.id}
                className="flex items-start gap-4 p-6 sm:p-7 rounded-2xl bg-cream-50/60 border border-line hover:border-blue-300 hover:shadow-soft transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                  {practice.id}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-serif font-bold text-blue-900">
                    {isHi ? practice.titleHi : practice.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-600 leading-relaxed font-sans">
                    {isHi ? practice.descHi : practice.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* Packaging Standards Card */}
            <div className="flex items-start gap-4 p-6 sm:p-7 rounded-2xl bg-blue-50/70 border border-blue-200">
              <div className="w-10 h-10 rounded-xl bg-[#25A244] text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                <Layers className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-serif font-bold text-blue-900">
                  {isHi ? "खाद्य-ग्रेड सीलबंद पैकेजिंग" : "Food-Grade Sealed Packaging"}
                </h3>
                <p className="text-xs sm:text-sm text-ink-600 leading-relaxed font-sans">
                  {isHi
                    ? "दूध और छाछ के लिए सुरक्षित पाउच, दही के लिए स्वच्छ कप व पारंपरिक मटका, तथा घी के लिए सुरक्षित जार का उपयोग किया जाता है।"
                    : "Packed in multi-layer food-grade pouches, hygienic dahi cups, sanitized traditional matkas, and sealed jars adhering strictly to packaging norms."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LABORATORY TESTING FEATURE SECTION */}
      <section className="py-20 bg-blue-50/40 border-y border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 relative aspect-4/3 rounded-3xl overflow-hidden shadow-soft border border-line">
              <SmartImage
                src="/images/real/process-packaging-line.jpg"
                alt="Divyam Dairy packaging and inspection line"
                fill
                className="object-cover"
              />
            </div>

            <div className="lg:col-span-6 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-blue-900">
                {isHi ? "दूध प्लांट में आने से पहले दैनिक लैब जांच" : "Daily Lab Testing Before Processing"}
              </h2>

              <p className="text-sm sm:text-base text-ink-700 leading-relaxed font-sans">
                {isHi
                  ? "हम स्थानीय किसानों और विक्रेताओं से दूध प्राप्त करते हैं। प्रत्येक कैन और टैंकर का नमूना लेकर हमारी प्रयोगशाला में परीक्षण किया जाता है। यदि कोई बैच हमारे कड़े गुणवत्ता मानकों पर खरा नहीं उतरता, तो उसे संयंत्र में प्रवेश नहीं दिया जाता।"
                  : "We source milk from trusted local farms and vendors. Before milk is unloaded, samples are analyzed in our laboratory for fat, solids-not-fat (SNF), and purity. Any batch that does not meet strict standards is rejected."}
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-ink-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span>
                    {isHi ? "फैट और एसएनएफ (SNF) का सटीक मानकीकरण" : "Accurate fat and SNF standardization"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-ink-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span>
                    {isHi ? "अनावश्यक रसायनों और मिलावट से पूर्ण सुरक्षा" : "Avoiding unnecessary chemicals and zero adulteration"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-ink-700">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <span>
                    {isHi ? "स्वच्छ स्टेनलेस स्टील (SS 304) मशीनों द्वारा प्रोसेसिंग" : "SS-304 machine processing in temperature-controlled vats"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "QUALITY YOU CAN TRUST" 4-ICON CARD */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0B2A6F] text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">
                {isHi ? "गुणवत्ता जिस पर आप भरोसा कर सकते हैं" : "Quality You Can Trust"}
              </h2>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-6 border border-white/10 text-center">
                <FlaskConical className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="font-serif font-bold text-base mb-1">
                  {isHi ? "दैनिक परीक्षण" : "Daily Testing"}
                </h3>
                <p className="text-xs text-blue-100/80 leading-relaxed">
                  {isHi ? "प्रत्येक बैच का इन-हाउस लैब परीक्षण" : "Every batch tested before processing"}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-6 border border-white/10 text-center">
                <Thermometer className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="font-serif font-bold text-base mb-1">
                  {isHi ? "कोल्ड-चेन प्रबंधन" : "Cold-Chain Control"}
                </h3>
                <p className="text-xs text-blue-100/80 leading-relaxed">
                  {isHi ? "ताजगी बनाए रखने के लिए तापमान नियंत्रण" : "Chilled staging and insulated delivery"}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-6 border border-white/10 text-center">
                <ShieldCheck className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="font-serif font-bold text-base mb-1">
                  {isHi ? "स्वच्छ संयंत्र" : "Sanitized Plant"}
                </h3>
                <p className="text-xs text-blue-100/80 leading-relaxed">
                  {isHi ? "SS-304 उपकरण और दैनिक सेनिटाइजेशन" : "Food-grade stainless equipment & daily scrub"}
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-6 border border-white/10 text-center">
                <FileCheck2 className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <h3 className="font-serif font-bold text-base mb-1">
                  {isHi ? "FSSAI अनुपालन" : "FSSAI Registered"}
                </h3>
                <p className="text-xs text-blue-100/80 leading-relaxed">
                  Lic. No. {SITE_CONFIG.fssaiNumber}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="pt-4 pb-12 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" size="lg" href="/products">
              {isHi ? "हमारे उत्पाद देखें" : "Explore Products"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" size="lg" href="/farm-to-family">
              {isHi ? "पूरी उत्पादन प्रक्रिया देखें" : "See Complete Process"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
