"use client";

import { useAppStore } from "@/lib/store";
import { TRANSLATIONS } from "@/data/translations";
import { SITE_CONFIG, buildWhatsAppLink } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { MessageCircle, Phone, Clock } from "lucide-react";

export function FinalCTA() {
  const { language } = useAppStore();
  const t = TRANSLATIONS[language];

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-[#FFFDF8] via-[#F3F7FF] to-[#FFFDF8] text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2A6F] font-serif tracking-tight leading-tight">
          {t.secFinalCtaTitle}
        </h2>

        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
          {t.secFinalCtaSub}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href={buildWhatsAppLink(
              language === "hi"
                ? "नमस्ते दिव्यम डेयरी! मुझे आज के ताजे दूध और डेयरी उत्पादों का ऑर्डर देना है।"
                : "Hello Divyam Dairy! I would like to place an order for fresh dairy products."
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="whatsapp" size="lg" className="flex items-center gap-2 font-bold px-8 shadow-lg hover:shadow-xl">
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>{t.btnOrderWhatsApp}</span>
            </Button>
          </a>

          <a href={`tel:${SITE_CONFIG.phonePrimary}`}>
            <Button variant="outline" size="lg" className="flex items-center gap-2 font-bold px-7">
              <Phone className="w-4 h-4" />
              <span>{t.btnCallToOrder}</span>
            </Button>
          </a>
        </div>

        <div className="pt-4 flex items-center justify-center gap-2 text-xs text-slate-500 font-medium">
          <Clock className="w-3.5 h-3.5 text-[#F5B921]" />
          <span>{SITE_CONFIG.timings} • {SITE_CONFIG.addressShort}</span>
        </div>
      </div>
    </section>
  );
}
