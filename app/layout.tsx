import type { Metadata } from "next";
import {
  Playfair_Display,
  Plus_Jakarta_Sans,
  Noto_Serif_Devanagari,
  Noto_Sans_Devanagari
} from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { QuickViewModal } from "@/components/product/QuickViewModal";
import { SearchOverlay } from "@/components/ui/SearchOverlay";
import { VideoModal } from "@/components/ui/VideoModal";
import { Toast } from "@/components/ui/Toast";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_CONFIG } from "@/data/site";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap"
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap"
});

const notoSerifDevanagari = Noto_Serif_Devanagari({
  variable: "--font-noto-serif-devanagari",
  subsets: ["devanagari"],
  weight: ["600", "700", "800", "900"],
  display: "swap"
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-sans-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.siteUrl),
  title: {
    default: `${SITE_CONFIG.brandName} — पक्का इरादा, शुद्धता का वादा।`,
    template: `%s | ${SITE_CONFIG.brandName}`
  },
  description:
    "Divyam Dairy Products (Shri R.S. Enterprises) — Fresh Milk, Pure Desi Ghee, Paneer, Dahi, and Chaach crafted with hygiene and care in Faridpur, Bareilly.",
  keywords: [
    "Divyam Dairy Products",
    "Divyam Milk",
    "Shri R.S. Enterprises",
    "Dairy in Bareilly",
    "Dairy in Faridpur",
    "Pure Desi Ghee",
    "Fresh Paneer",
    "Fresh Milk Bareilly",
    "FSSAI 12726009000106"
  ],
  authors: [{ name: SITE_CONFIG.legalEntity }],
  openGraph: {
    title: `${SITE_CONFIG.brandName} — पक्का इरादा, शुद्धता का वादा।`,
    description:
      "Fresh Milk, Pure Desi Ghee, Paneer, Dahi, and Chaach crafted with hygiene and care in Faridpur, Bareilly.",
    url: SITE_CONFIG.siteUrl,
    siteName: SITE_CONFIG.brandName,
    images: [
      {
        url: "/images/hero/hero-all-products.jpg",
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.brandName
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  icons: {
    icon: "/images/real/logo.png"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="hi"
      className={`${playfair.variable} ${jakarta.variable} ${notoSerifDevanagari.variable} ${notoSansDevanagari.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FFFDF8] text-[#1B2430]">
        <JsonLd />
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />

        {/* Global Overlays & Modals */}
        <CartDrawer />
        <QuickViewModal />
        <SearchOverlay />
        <VideoModal />
        <Toast />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
