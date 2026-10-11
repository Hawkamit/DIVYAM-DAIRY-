"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAppStore } from "@/lib/store";
import { TRANSLATIONS } from "@/data/translations";
import { SITE_CONFIG, buildWhatsAppLink } from "@/data/site";
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  ChevronDown,
  Globe,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const {
    language,
    toggleLanguage,
    openCart,
    openSearch,
    cart,
    wishlist
  } = useAppStore();

  const t = TRANSLATIONS[language];

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t.navHome },
    { href: "/products", label: t.navProducts },
    { href: "/our-story", label: t.navOurStory },
    { href: "/quality", label: t.navQuality },
    { href: "/gallery", label: t.navGallery },
    { href: "/contact", label: t.navContact }
  ];

  const moreLinks = [
    { href: "/farm-to-family", label: t.navFarmToFamily },
    { href: "/why-divyam", label: t.navWhyDivyam },
    { href: "/delivery", label: t.navDelivery },
    { href: "/knowledge-hub", label: t.navKnowledgeHub },
    { href: "/faq", label: t.navFAQ }
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100/80 h-16 md:h-[72px] flex items-center",
          isScrolled && "shadow-sm"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="relative w-32 sm:w-40 md:w-48 h-11 sm:h-12 md:h-14 transition-all duration-300 group-hover:scale-[1.03] active:scale-95">
              <Image
                src="/images/real/logo.png"
                alt={SITE_CONFIG.brandName}
                fill
                priority
                sizes="(max-width: 640px) 130px, (max-width: 768px) 160px, 192px"
                className="object-contain object-left drop-shadow-xs"
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-semibold transition-colors duration-200 rounded-full",
                    isActive
                      ? "text-[#1D5BD6]"
                      : "text-[#1B2430] hover:text-[#1D5BD6] hover:bg-blue-50/50"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0.5 left-3 right-3 h-0.5 bg-[#1D5BD6] rounded-full" />
                  )}
                </Link>
              );
            })}

            {/* More Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsMoreOpen(true)}
              onMouseLeave={() => setIsMoreOpen(false)}
            >
              <button
                className={cn(
                  "flex items-center gap-1 px-3 py-2 text-sm font-semibold text-[#1B2430] hover:text-[#1D5BD6] hover:bg-blue-50/50 rounded-full transition-colors",
                  isMoreOpen && "text-[#1D5BD6] bg-blue-50/50"
                )}
                aria-expanded={isMoreOpen}
              >
                <span>{t.navMore}</span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 transition-transform duration-200",
                    isMoreOpen && "rotate-180"
                  )}
                />
              </button>

              {isMoreOpen && (
                <div className="absolute top-full right-0 pt-2 w-52">
                  <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-2 space-y-1">
                    {moreLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMoreOpen(false)}
                        className={cn(
                          "block px-3 py-2 text-xs font-semibold rounded-xl transition-colors",
                          pathname === item.href
                            ? "bg-[#F3F7FF] text-[#1D5BD6]"
                            : "text-[#1B2430] hover:bg-slate-50 hover:text-[#1D5BD6]"
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-1.5 md:gap-2.5">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              aria-label="Toggle language between English and Hindi"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-slate-200 hover:border-[#1D5BD6] bg-white text-xs font-bold text-[#0B2A6F] transition-all hover:bg-blue-50/50"
            >
              <Globe className="w-3.5 h-3.5 text-[#1D5BD6]" />
              <span>{language === "hi" ? "EN" : "हिन्दी"}</span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={openSearch}
              aria-label="Search products and knowledge hub"
              className="p-2 text-slate-700 hover:text-[#1D5BD6] hover:bg-blue-50/50 rounded-full transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              aria-label="View Wishlist"
              className="relative p-2 text-slate-700 hover:text-red-500 hover:bg-red-50/50 rounded-full transition-colors hidden sm:flex items-center justify-center"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={openCart}
              aria-label="Open Cart Drawer"
              className="relative p-2 text-slate-700 hover:text-[#1D5BD6] hover:bg-blue-50/50 rounded-full transition-colors flex items-center justify-center"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#1D5BD6] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Order Now Primary Pill Button */}
            <button
              onClick={openCart}
              className="hidden sm:inline-flex items-center gap-1.5 bg-[#1D5BD6] hover:bg-[#154bb3] text-white text-xs font-bold tracking-wide uppercase px-4 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-95 ml-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F5B921]" />
              <span>{t.navOrderNow}</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className="lg:hidden p-2 text-slate-800 hover:text-[#1D5BD6] rounded-full hover:bg-slate-100 transition-colors ml-1"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        links={[...navLinks, ...moreLinks]}
      />
    </>
  );
}
