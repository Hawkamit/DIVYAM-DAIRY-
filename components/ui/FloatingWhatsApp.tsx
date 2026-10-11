"use client";

import { useAppStore } from "@/lib/store";
import { TRANSLATIONS } from "@/data/translations";
import { SITE_CONFIG, buildWhatsAppLink } from "@/data/site";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  const { language } = useAppStore();
  const t = TRANSLATIONS[language];

  const defaultMsg =
    language === "hi"
      ? "नमस्ते दिव्यम डेयरी! मुझे ताजा डेयरी उत्पादों के बारे में जानकारी और ऑर्डर चाहिए।"
      : "Hello Divyam Dairy! I would like to enquire about fresh dairy products and ordering.";

  const whatsappHref = buildWhatsAppLink(defaultMsg);

  return (
    <aside aria-label="WhatsApp Quick Order" className="fixed bottom-6 right-6 z-40">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order on WhatsApp"
        className="group flex items-center gap-2.5 bg-[#25A244] hover:bg-[#1e8738] text-white pl-4 pr-5 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-95"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-white text-[#25A244]" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-300"></span>
          </span>
        </div>
        <span className="text-sm font-bold tracking-wide hidden sm:inline-block">
          {language === "hi" ? "व्हाट्सएप ऑर्डर" : "Order on WhatsApp"}
        </span>
      </a>
    </aside>
  );
}
