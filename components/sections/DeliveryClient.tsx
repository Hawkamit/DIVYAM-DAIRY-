"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Truck,
  CheckCircle2,
  ChevronRight,
  Clock,
  ShieldAlert,
  MapPin,
  ExternalLink,
  MessageCircle,
  Phone,
  Search,
  Package,
  AlertCircle,
  Sparkles,
  Info
} from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import { DELIVERY_TOWNS, checkDeliveryAvailability, DeliveryCheckResult } from "@/data/delivery";
import { useAppStore } from "@/lib/store";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { MilkWaveDivider } from "@/components/ui/MilkWaveDivider";

export function DeliveryClient() {
  const { language } = useAppStore();
  const isHi = language === "hi";

  const [townQuery, setTownQuery] = useState("");
  const [checkResult, setCheckResult] = useState<DeliveryCheckResult | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!townQuery.trim()) return;
    const res = checkDeliveryAvailability(townQuery);
    setCheckResult(res);
  };

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
              {isHi ? "वितरण जानकारी" : "Delivery Information"}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-blue-900 tracking-tight leading-[1.12]">
                {isHi ? (
                  <>
                    आपके परिवार तक ताजगी, <br />
                    <span className="text-blue-600">सुरक्षा और समयबद्ध सेवा</span>
                  </>
                ) : (
                  <>
                    Fresh to Your Family, <br />
                    <span className="text-blue-600">Delivered With Care.</span>
                  </>
                )}
              </h1>

              <p className="text-lg text-ink-700 font-sans leading-relaxed">
                {isHi
                  ? "दूध, दही, छाछ और पनीर जैसे ताज़ा उत्पादों को तापमान-नियंत्रित व्यवस्था में पहुंचाया जाता है। शुद्ध देशी घी की डिलीवरी पूरे भारत में उपलब्ध है।"
                  : "Perishable items like fresh milk, curd, buttermilk, and paneer are delivered in temperature-monitored routes. Pure Desi Ghee is delivered all over India."}
              </p>

              {/* Quick Area Checker Form */}
              <div className="bg-white p-4 sm:p-5 rounded-3xl border border-line shadow-soft max-w-xl">
                <label className="block text-xs font-bold uppercase tracking-wider text-blue-950 mb-2">
                  {isHi ? "अपने शहर में डिलीवरी जांचें:" : "Check Delivery in Your Town:"}
                </label>
                <form onSubmit={handleCheck} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={townQuery}
                      onChange={(e) => setTownQuery(e.target.value)}
                      placeholder={isHi ? "उदा. फरीदपुर, बरेली, पीलीभीत..." : "e.g. Faridpur, Bareilly, Pilibhit..."}
                      className="w-full h-11 pl-4 pr-10 rounded-full border border-line bg-cream-50/50 text-sm focus:outline-hidden focus:border-blue-600 text-ink-700"
                    />
                    <Search className="w-4 h-4 text-ink-400 absolute right-3.5 top-3.5" />
                  </div>
                  <Button type="submit" variant="primary" size="md" className="shrink-0 px-6">
                    {isHi ? "जांचें" : "Check"}
                  </Button>
                </form>

                {/* Checker Result Alert */}
                {checkResult && (
                  <div
                    className={`mt-4 p-4 rounded-2xl text-xs sm:text-sm font-sans flex items-start gap-3 ${
                      checkResult.isServiceable
                        ? "bg-green-50 text-green-900 border border-green-200"
                        : "bg-blue-50 text-blue-900 border border-blue-200"
                    }`}
                  >
                    {checkResult.isServiceable ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    ) : (
                      <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-semibold mb-1">
                        {isHi ? checkResult.messageHi : checkResult.message}
                      </p>
                      {checkResult.town && (
                        <p className="text-xs text-ink-600 mt-1">
                          <strong>{isHi ? "डिस्पैच समय:" : "Dispatch Schedule:"}</strong>{" "}
                          {checkResult.town.dispatchTime}
                        </p>
                      )}
                      {!checkResult.isServiceable && (
                        <a
                          href={`https://wa.me/${SITE_CONFIG.whatsappNumberDigits}?text=${encodeURIComponent(
                            `Hello Divyam Dairy! I am from ${townQuery} and would like to ask about delivery options.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-bold text-green-700 hover:text-green-800 mt-2 underline"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          {isHi ? "व्हाट्सएप पर डिलीवरी की पुष्टि करें" : "Confirm delivery options on WhatsApp"}
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-5">
              <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <SmartImage
                  src="/images/generated/delivery-truck.jpg"
                  alt="Divyam Dairy Delivery Van"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs uppercase tracking-wider text-yellow-400 font-bold block mb-1">
                    {SITE_CONFIG.brandName}
                  </span>
                  <p className="text-sm font-medium">
                    {isHi
                      ? "1 दिन के भीतर डिस्पैच — आपकी रसोई तक दैनिक ताजगी।"
                      : "Dispatch within 1 day — fresh dairy delivered directly."}
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

      {/* 2. 4-ITEM INFO STRIP */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-cream-50 border border-line">
              <Truck className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-serif font-bold text-lg text-blue-900 mb-1">
                {isHi ? "ताजा दैनिक डिलीवरी" : "Fresh Daily Delivery"}
              </h3>
              <p className="text-xs text-ink-600 leading-relaxed font-sans">
                {isHi
                  ? "दूध और दही सीधे संयंत्र से दैनिक मार्गों पर वितरित किए जाते हैं।"
                  : "Milk and curd delivered daily directly from our processing plant."}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-cream-50 border border-line">
              <Package className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-serif font-bold text-lg text-blue-900 mb-1">
                {isHi ? "न्यूनतम ऑर्डर नियम" : "Minimum Order Policy"}
              </h3>
              <p className="text-xs text-ink-600 leading-relaxed font-sans">
                {isHi
                  ? "घी: कोई न्यूनतम सीमा नहीं। अन्य उत्पाद: ₹15,000 न्यूनतम ऑर्डर।"
                  : "Ghee: No minimum. Perishable dairy items: ₹15,000 minimum order."}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-cream-50 border border-line">
              <Clock className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-serif font-bold text-lg text-blue-900 mb-1">
                {isHi ? "त्वरित डिस्पैच" : "Prompt Dispatch"}
              </h3>
              <p className="text-xs text-ink-600 leading-relaxed font-sans">
                {isHi
                  ? "ऑर्डर पुष्टि के 1 दिन के भीतर सुरक्षित रवानगी।"
                  : "Orders dispatched within 1 day of confirmation."}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-cream-50 border border-line">
              <AlertCircle className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-serif font-bold text-lg text-blue-900 mb-1">
                {isHi ? "डिलीवरी शुल्क" : "Delivery Charges"}
              </h3>
              <p className="text-xs text-ink-600 leading-relaxed font-sans">
                {isHi
                  ? "लागू (स्थान व दूरी के अनुसार ऑर्डर पुष्टि पर तय)।"
                  : "Applicable; confirmed upon order verification based on location."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR DELIVERY AREAS & TOWNS */}
      <section className="py-20 bg-blue-50/40 border-y border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-blue-900">
              {isHi ? "हमारे अधिकृत दैनिक वितरण क्षेत्र" : "Our Authorized Delivery Areas"}
            </h2>
            <p className="text-sm sm:text-base text-ink-500 mt-2 font-sans">
              {isHi
                ? "फरीदपुर मुख्य केंद्र और रुहेलखंड के प्रमुख आसपास के शहर।"
                : "Faridpur home base and key surrounding cities across Rohilkhand."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {DELIVERY_TOWNS.map((town) => (
              <div
                key={town.name}
                className="bg-white rounded-2xl p-6 border border-line shadow-xs hover:border-blue-300 hover:shadow-soft transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <h3 className="text-xl font-serif font-bold text-blue-900">
                      {isHi ? town.nameHi : town.name}
                    </h3>
                  </div>
                  {town.status === "home-base" ? (
                    <span className="text-[11px] font-bold bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded-full border border-yellow-200">
                      {isHi ? "मुख्य प्लांट" : "Home Base"}
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold bg-green-50 text-green-700 px-2.5 py-0.5 rounded-full border border-green-200">
                      {isHi ? "दैनिक रूट" : "Daily Route"}
                    </span>
                  )}
                </div>
                <p className="text-xs text-ink-600 leading-relaxed font-sans mb-3">
                  {isHi ? town.noteHi : town.note}
                </p>
                <div className="text-[11px] text-ink-500 pt-2 border-t border-line/60 flex items-center justify-between">
                  <span>{isHi ? "डिस्पैच:" : "Dispatch:"}</span>
                  <strong className="text-blue-900 font-semibold">{town.dispatchTime}</strong>
                </div>
              </div>
            ))}
          </div>

          {/* GHEE ALL INDIA CALLOUT */}
          <div className="bg-white rounded-3xl p-8 border border-yellow-200 shadow-soft flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-yellow-500 text-blue-950 flex items-center justify-center shrink-0 shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold text-blue-900 mb-1">
                  {isHi ? "शुद्ध देशी घी: पूरे भारत में डिलीवरी" : "Pure Desi Ghee: Delivered All Over India"}
                </h3>
                <p className="text-xs sm:text-sm text-ink-600 font-sans max-w-2xl">
                  {isHi
                    ? "हमारे 1L, 500ml और 180ml शुद्ध घी के जार सुरक्षित पैकेजिंग के साथ कूरियर द्वारा पूरे भारत में कहीं भी मंगाए जा सकते हैं। घी पर कोई न्यूनतम ऑर्डर सीमा नहीं है।"
                    : "Our 1L, 500ml, and 180ml jars of pure ghee are shipped securely via courier anywhere in India. Ghee orders carry NO minimum order requirement."}
                </p>
              </div>
            </div>

            <Button
              variant="whatsapp"
              size="md"
              href={`https://wa.me/${SITE_CONFIG.whatsappNumberDigits}?text=${encodeURIComponent(
                "Hello Divyam Dairy! I want to order Pure Desi Ghee for delivery."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              {isHi ? "घी ऑर्डर करें" : "Order Pure Ghee"}
            </Button>
          </div>
        </div>
      </section>

      {/* 4. FRESHNESS & CANCELLATION POLICIES */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-7 rounded-3xl bg-cream-50 border border-line space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-2">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-blue-900">
                {isHi ? "गुणवत्ता सुरक्षा एवं ताजगी नियम" : "Freshness & Transit Rule"}
              </h3>
              <p className="text-xs sm:text-sm text-ink-600 leading-relaxed font-sans">
                {isHi
                  ? SITE_CONFIG.freshnessRule
                  : "Perishable orders are not dispatched to destinations where delivery transit time would approach expiry or exceed the product shelf life."}
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-cream-50 border border-line space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-2">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-blue-900">
                {isHi ? "रद्दीकरण एवं सहायता नीति" : "Cancellation & Support Policy"}
              </h3>
              <p className="text-xs sm:text-sm text-ink-600 leading-relaxed font-sans">
                {isHi
                  ? SITE_CONFIG.cancellationPolicy
                  : "Orders can be cancelled only before dispatch. No replacements once delivered. For any concern or issue, please call 8679943224 immediately."}
              </p>
            </div>
          </div>

          {/* Map Link Card */}
          <div className="mt-8 p-6 rounded-3xl bg-blue-50/60 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-blue-600 shrink-0" />
              <div>
                <strong className="text-sm text-blue-950 font-serif block">
                  {SITE_CONFIG.legalEntity}
                </strong>
                <span className="text-xs text-ink-500">{SITE_CONFIG.address}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={SITE_CONFIG.googleMapsBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 bg-white px-4 py-2 rounded-full border border-line shadow-xs"
              >
                <span>{isHi ? "गूगल मैप पर देखें" : "View on Google Maps"}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="pt-8 pb-8 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="whatsapp"
              size="lg"
              href={`https://wa.me/${SITE_CONFIG.whatsappNumberDigits}?text=${encodeURIComponent(
                "Hello Divyam Dairy! I would like to place an order."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              {isHi ? "व्हाट्सएप पर ऑर्डर करें" : "Order on WhatsApp"}
            </Button>
            <Button
              variant="outline"
              size="lg"
              href={`tel:${SITE_CONFIG.phonePrimary}`}
            >
              <Phone className="w-4 h-4 mr-2" />
              {isHi ? `कॉल: ${SITE_CONFIG.phonePrimary}` : `Call: ${SITE_CONFIG.phonePrimary}`}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
