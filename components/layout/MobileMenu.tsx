"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAppStore } from "@/lib/store";
import { TRANSLATIONS } from "@/data/translations";
import { SITE_CONFIG, buildWhatsAppLink } from "@/data/site";
import { X, Phone, MessageCircle, Globe, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const pathname = usePathname();
  const { language, toggleLanguage } = useAppStore();
  const t = TRANSLATIONS[language];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Slide-over panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative ml-auto w-full max-w-xs sm:max-w-sm h-full bg-white shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-slate-100 bg-[#FFFDF8]">
              <div className="relative w-36 h-12">
                <Image
                  src="/images/real/logo.png"
                  alt={SITE_CONFIG.brandName}
                  fill
                  className="object-contain object-left"
                />
              </div>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Language Banner */}
            <div className="px-4 py-3 bg-[#F3F7FF] flex items-center justify-between border-b border-blue-50">
              <span className="text-xs font-semibold text-[#0B2A6F] flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#1D5BD6]" />
                {language === "hi" ? "भाषा बदलें (Language)" : "Change Language"}
              </span>
              <button
                onClick={toggleLanguage}
                className="px-3 py-1 bg-white text-xs font-bold text-[#1D5BD6] rounded-full border border-blue-200 shadow-sm"
              >
                {language === "hi" ? "English" : "हिन्दी"}
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-2xl text-sm font-semibold transition-colors min-h-[44px] ${
                      isActive
                        ? "bg-[#1D5BD6] text-white"
                        : "text-[#1B2430] hover:bg-slate-50 active:bg-slate-100"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight
                      className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Footer Contact Actions */}
            <div className="p-4 border-t border-slate-100 bg-[#FFFDF8] space-y-2.5">
              <a
                href={buildWhatsAppLink(
                  language === "hi"
                    ? "नमस्ते दिव्यम डेयरी! मुझे उत्पादों की जानकारी चाहिए।"
                    : "Hello Divyam Dairy! I would like product information."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#25A244] hover:bg-[#1e8738] text-white font-bold text-xs uppercase tracking-wider rounded-full shadow-md min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{language === "hi" ? "व्हाट्सएप पर ऑर्डर करें" : "Order on WhatsApp"}</span>
              </a>

              <a
                href={`tel:${SITE_CONFIG.phonePrimary}`}
                className="flex items-center justify-center gap-2 w-full py-3 border border-[#1D5BD6] text-[#1D5BD6] hover:bg-[#F3F7FF] font-bold text-xs uppercase tracking-wider rounded-full min-h-[44px]"
              >
                <Phone className="w-4 h-4" />
                <span>{language === "hi" ? "कॉल करें: " : "Call: "}{SITE_CONFIG.phonePrimary}</span>
              </a>

              <p className="text-[11px] text-center text-slate-400 pt-1">
                FSSAI Lic. No. {SITE_CONFIG.fssaiNumber}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
