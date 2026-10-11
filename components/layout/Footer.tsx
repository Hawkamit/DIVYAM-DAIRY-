"use client";

import Link from "next/link";
import Image from "next/image";
import { useAppStore } from "@/lib/store";
import { TRANSLATIONS } from "@/data/translations";
import { SITE_CONFIG, buildWhatsAppLink } from "@/data/site";
import { PRODUCTS } from "@/data/products";
import { MilkWaveDivider } from "@/components/ui/MilkWaveDivider";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ShieldCheck
} from "lucide-react";
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { FooterOversizedWordmark } from "@/components/layout/FooterOversizedWordmark";

export function Footer() {
  const { language } = useAppStore();
  const t = TRANSLATIONS[language];

  return (
    <footer className="relative bg-[#0B2A6F] text-white pt-16 pb-12 overflow-hidden">
      {/* Top Milk Wave Curve */}
      <div className="absolute top-0 left-0 right-0">
        <MilkWaveDivider variant="top" fill="#FFFDF8" flip />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-blue-900/80">
          {/* Column 1: Brand & Identity */}
          <div className="space-y-4">
            <Link href="/" className="inline-block bg-white p-3 rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02]">
              <div className="relative w-44 sm:w-52 h-14 sm:h-16">
                <Image
                  src="/images/real/logo.png"
                  alt={SITE_CONFIG.brandName}
                  fill
                  sizes="(max-width: 640px) 176px, 208px"
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <div className="space-y-1 pt-1">
              <p className="text-base font-bold text-[#F5B921]">
                {SITE_CONFIG.taglineHindi}
              </p>
              <p className="text-xs text-blue-200 leading-relaxed">
                {SITE_CONFIG.taglineEnglish}
              </p>
            </div>

            <p className="text-xs text-blue-100/80 leading-relaxed">
              {language === "hi"
                ? "दिव्यम डेयरी प्रोडक्ट्स लाता है शुद्ध और स्वच्छ डेयरी उत्पाद — दूध, घी, छाछ, खोया, पनीर और दही।"
                : SITE_CONFIG.introText}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Divyam Dairy on Instagram"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white hover:text-[#F5B921]"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href={SITE_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Divyam Dairy on Facebook"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white hover:text-[#F5B921]"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href={buildWhatsAppLink(
                  language === "hi"
                    ? "नमस्ते दिव्यम डेयरी! मुझे जानकारी चाहिए।"
                    : "Hello Divyam Dairy! I would like information."
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Divyam Dairy on WhatsApp"
                className="w-10 h-10 rounded-full bg-[#25A244] hover:bg-[#1e8738] flex items-center justify-center transition-colors text-white shadow-sm"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#F5B921] mb-4">
              {t.footerQuickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs text-blue-100/90 font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {t.navHome}
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  {t.navProducts}
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-white transition-colors">
                  {t.navOurStory}
                </Link>
              </li>
              <li>
                <Link href="/quality" className="hover:text-white transition-colors">
                  {t.navQuality}
                </Link>
              </li>
              <li>
                <Link href="/farm-to-family" className="hover:text-white transition-colors">
                  {t.navFarmToFamily}
                </Link>
              </li>
              <li>
                <Link href="/why-divyam" className="hover:text-white transition-colors">
                  {t.navWhyDivyam}
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="hover:text-white transition-colors">
                  {t.navDelivery}
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition-colors">
                  {t.navGallery}
                </Link>
              </li>
              <li>
                <Link href="/knowledge-hub" className="hover:text-white transition-colors">
                  {t.navKnowledgeHub}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  {t.navFAQ}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t.navContact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Products */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#F5B921] mb-4">
              {t.footerProducts}
            </h4>
            <ul className="space-y-2.5 text-xs text-blue-100/90 font-medium">
              {PRODUCTS.map((prod) => (
                <li key={prod.id}>
                  <Link
                    href={`/products/${prod.slug}`}
                    className="hover:text-white transition-colors block"
                  >
                    {language === "hi" ? prod.nameHi : prod.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Dairy Facility */}
          <div className="space-y-3.5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#F5B921] mb-4">
              {t.footerContactUs}
            </h4>

            <div className="flex items-start gap-2.5 text-xs text-blue-100/90">
              <MapPin className="w-4 h-4 text-[#F5B921] shrink-0 mt-0.5" />
              <p className="leading-relaxed">{SITE_CONFIG.address}</p>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-blue-100/90">
              <Phone className="w-4 h-4 text-[#F5B921] shrink-0" />
              <div className="flex items-center gap-2">
                <a href={`tel:${SITE_CONFIG.phonePrimary}`} className="hover:text-white underline">
                  {SITE_CONFIG.phonePrimary}
                </a>
                <span>/</span>
                <a href={`tel:${SITE_CONFIG.phoneSecondary}`} className="hover:text-white underline">
                  {SITE_CONFIG.phoneSecondary}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-blue-100/90">
              <Mail className="w-4 h-4 text-[#F5B921] shrink-0" />
              <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-white truncate">
                {SITE_CONFIG.email}
              </a>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-blue-100/90">
              <Clock className="w-4 h-4 text-[#F5B921] shrink-0" />
              <span>{t.footerHours}</span>
            </div>

            <div className="pt-2">
              <a
                href={buildWhatsAppLink(
                  language === "hi"
                    ? "नमस्ते! मुझे दिव्यम डेयरी उत्पादों के ऑर्डर के संबंध में बात करनी है।"
                    : "Hello! I would like to enquire about ordering Divyam Dairy products."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#25A244] hover:bg-[#1e8738] text-white text-xs font-bold rounded-full shadow-sm transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>{language === "hi" ? "व्हाट्सएप चैट" : "Order on WhatsApp"}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Delivery Towns Strip */}
        <div className="py-4 border-b border-blue-900/80 text-xs text-blue-200/80 leading-relaxed text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p>
            <strong className="text-white font-semibold">
              {language === "hi" ? "दैनिक डिलीवरी क्षेत्र:" : "Daily Delivery Areas:"}
            </strong>{" "}
            {SITE_CONFIG.localDeliveryAreas.join(" • ")}
          </p>
          <p className="text-[#F5B921] font-medium">
            {language === "hi"
              ? "शुद्ध देसी घी पूरे भारत में उपलब्ध (No Minimum Order)"
              : "Pure Desi Ghee delivered all over India (No Minimum Order)"}
          </p>
        </div>

        {/* Bottom Legal Line */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-blue-300/70 gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#25A244]" />
            <p>
              © {SITE_CONFIG.yearEstablished} {SITE_CONFIG.brandName} ({SITE_CONFIG.legalEntity}). {t.footerRights}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span className="text-blue-200 font-semibold">{t.footerFssai}</span>
            <span>•</span>
            <span>{t.footerGst}</span>
            <span>•</span>
            <Link
              href="/admin/login"
              className="text-blue-300 hover:text-[#F5B921] transition inline-flex items-center gap-1 font-semibold"
            >
              <span>CMS Portal</span>
            </Link>
          </div>
        </div>

        {/* Oversized Wordmark (Framer Style) */}
        <FooterOversizedWordmark text="DIVYAM DAIRY PRODUCTS" />
      </div>
    </footer>
  );
}
