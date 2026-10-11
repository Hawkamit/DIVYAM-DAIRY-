"use client";

import { useAppStore } from "@/lib/store";
import { TRANSLATIONS } from "@/data/translations";
import { SITE_CONFIG, buildWhatsAppLink } from "@/data/site";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { Quote, MessageCircle } from "lucide-react";

export function LovedByFamilies() {
  const { language } = useAppStore();
  const t = TRANSLATIONS[language];

  return (
    <section className="py-20 md:py-24 bg-[#FFFDF8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0B2A6F] to-[#1747B8] rounded-3xl text-white overflow-hidden shadow-2xl border border-blue-900/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Authentic Family Photography */}
            <div className="lg:col-span-6 relative aspect-4/3 lg:aspect-auto lg:h-full min-h-[340px] sm:min-h-[420px]">
              <SmartImage
                src="/images/generated/hero-family-morning.jpg"
                alt="Indian Family Enjoying Fresh Milk"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 z-10 lg:hidden">
                <span className="text-xs font-bold text-[#F5B921]">
                  {SITE_CONFIG.legalEntity}
                </span>
                <p className="text-xs text-white/90">
                  {language === "hi" ? "परिवारों का अटूट विश्वास" : "Trusted by Households"}
                </p>
              </div>
            </div>

            {/* Right: Founder's Message & Promise */}
            <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 space-y-6">
              <div className="relative">
                <Quote className="w-10 h-10 text-[#F5B921]/30 -top-3 -left-3 absolute pointer-events-none" />
                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif leading-snug relative z-10 text-white">
                  &ldquo;{SITE_CONFIG.pullQuote}&rdquo;
                </blockquote>
              </div>

              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-normal">
                {language === "hi"
                  ? "दिव्यम डेयरी की शुरुआत हमारे अपने बच्चों और परिवार के लिए शुद्ध व सुरक्षित दूध की तलाश से हुई थी। जो हम अपने परिवार को नहीं परोसना चाहते, वह हम आपके परिवार के लिए कभी नहीं बनाएंगे। यही हमारा सच्चा वादा है।"
                  : "Divyam Dairy began when concerns about food adulteration made us look for a cleaner, more transparent way. Every drop of milk and every block of paneer is crafted under conditions we trust for our own home."}
              </p>

              <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white tracking-wide">
                    {SITE_CONFIG.legalEntity}
                  </h4>
                  <p className="text-xs text-blue-200">
                    {language === "hi" ? "फरीदपुर, बरेली, उत्तर प्रदेश" : "Faridpur, Bareilly, Uttar Pradesh"}
                  </p>
                </div>

                <a
                  href={buildWhatsAppLink(
                    language === "hi"
                      ? "नमस्ते दिव्यम डेयरी! मैं अपने परिवार के अनुभव या सुझाव साझा करना चाहता हूँ।"
                      : "Hello Divyam Dairy! I would like to share our family feedback."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25A244] hover:bg-[#1e8738] text-white text-xs font-bold transition-all shadow-md active:scale-95 self-start sm:self-auto"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>
                    {language === "hi" ? "अनुभव साझा करें → व्हाट्सएप" : "Share Experience → WhatsApp"}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
