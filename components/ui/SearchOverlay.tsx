"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { TRANSLATIONS } from "@/data/translations";
import { PRODUCTS } from "@/data/products";
import { ARTICLES } from "@/data/articles";
import { Search, X, Package, BookOpen, ArrowRight, CornerDownLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { SmartImage } from "./SmartImage";

export function SearchOverlay() {
  const router = useRouter();
  const { isSearchOpen, closeSearch, language } = useAppStore();
  const t = TRANSLATIONS[language];
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when opened
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  // Global hotkey: Cmd/Ctrl + K and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isSearchOpen) closeSearch();
        else useAppStore.getState().openSearch();
      }
      if (e.key === "Escape" && isSearchOpen) {
        closeSearch();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, closeSearch]);

  const filteredProducts = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.nameHi.includes(query) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tagline.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredArticles = query.trim()
    ? ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.titleHi.includes(query) ||
          a.category.toLowerCase().includes(query.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const hasResults = filteredProducts.length > 0 || filteredArticles.length > 0;

  const handleSelectProduct = (slug: string) => {
    closeSearch();
    router.push(`/products/${slug}`);
  };

  const handleSelectArticle = (slug: string) => {
    closeSearch();
    router.push(`/knowledge-hub/${slug}`);
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 px-4 bg-slate-900/60 backdrop-blur-sm">
          {/* Backdrop dismiss */}
          <div className="absolute inset-0" onClick={closeSearch} />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 z-10"
          >
            {/* Search Input Bar */}
            <div className="p-4 border-b border-slate-100 flex items-center gap-3">
              <Search className="w-5 h-5 text-slate-400 shrink-0 ml-2" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.navSearchPlaceholder}
                className="w-full text-base md:text-lg bg-transparent border-none outline-none text-[#1B2430] placeholder:text-slate-400"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 rounded-full hover:bg-slate-100 text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={closeSearch}
                className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-500 rounded-md hover:bg-slate-200 transition-colors"
              >
                ESC
              </button>
            </div>

            {/* Results or Suggestions */}
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
              {query.trim() === "" ? (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-2">
                    {language === "hi" ? "लोकप्रिय खोजें" : "Popular Searches"}
                  </h4>
                  <div className="flex flex-wrap gap-2 px-2">
                    {["Full Cream Milk", "Pure Ghee", "Paneer", "Dahi", "Chaach", "Storage Tips"].map(
                      (item) => (
                        <button
                          key={item}
                          onClick={() => setQuery(item)}
                          className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-[#F3F7FF] hover:text-[#1D5BD6] text-xs font-medium text-slate-600 transition-colors"
                        >
                          {item}
                        </button>
                      )
                    )}
                  </div>
                </div>
              ) : !hasResults ? (
                <div className="py-12 text-center text-slate-500">
                  <p className="text-base font-medium">
                    {language === "hi"
                      ? `"${query}" के लिए कोई परिणाम नहीं मिला।`
                      : `No results found for "${query}".`}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {language === "hi"
                      ? "कृपया दूसरा शब्द खोजें या हमारी उत्पाद सूची देखें।"
                      : "Try checking your spelling or explore all products."}
                  </p>
                  <Link
                    href="/products"
                    onClick={closeSearch}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1D5BD6] mt-4 hover:underline"
                  >
                    {t.navProducts} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Products Matches */}
                  {filteredProducts.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">
                        <Package className="w-4 h-4 text-[#1D5BD6]" />
                        <span>{language === "hi" ? "उत्पाद" : "Products"} ({filteredProducts.length})</span>
                      </div>
                      <div className="space-y-1">
                        {filteredProducts.map((prod) => (
                          <div
                            key={prod.id}
                            onClick={() => handleSelectProduct(prod.slug)}
                            className="group flex items-center gap-3 p-2.5 rounded-2xl hover:bg-[#F3F7FF] transition-colors cursor-pointer"
                          >
                            <SmartImage
                              src={prod.images.front}
                              alt={prod.name}
                              width={48}
                              height={48}
                              className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-100"
                            />
                            <div className="flex-1 min-w-0">
                              <h5 className="text-sm font-bold text-[#0B2A6F] group-hover:text-[#1D5BD6] truncate">
                                {language === "hi" ? prod.nameHi : prod.name}
                              </h5>
                              <p className="text-xs text-slate-500 truncate">
                                {language === "hi" ? prod.taglineHi : prod.tagline}
                              </p>
                            </div>
                            <span className="text-xs font-bold text-slate-700 bg-white px-2.5 py-1 rounded-full border border-slate-200 shrink-0">
                              {language === "hi" ? prod.priceRangeDisplayHi : prod.priceRangeDisplay}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Articles Matches */}
                  {filteredArticles.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">
                        <BookOpen className="w-4 h-4 text-[#25A244]" />
                        <span>{language === "hi" ? "डेयरी ज्ञान लेख" : "Knowledge Articles"} ({filteredArticles.length})</span>
                      </div>
                      <div className="space-y-1">
                        {filteredArticles.map((art) => (
                          <div
                            key={art.id}
                            onClick={() => handleSelectArticle(art.slug)}
                            className="group flex items-center gap-3 p-2.5 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer"
                          >
                            <SmartImage
                              src={art.image}
                              alt={art.title}
                              width={48}
                              height={48}
                              className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-100"
                            />
                            <div className="flex-1 min-w-0">
                              <span className="text-[11px] font-semibold text-[#1D5BD6] uppercase tracking-wider">
                                {language === "hi" ? art.categoryHi : art.category}
                              </span>
                              <h5 className="text-sm font-bold text-[#0B2A6F] group-hover:text-[#1D5BD6] truncate">
                                {language === "hi" ? art.titleHi : art.title}
                              </h5>
                            </div>
                            <span className="text-xs text-slate-400 shrink-0 flex items-center gap-1">
                              {language === "hi" ? art.readTimeHi : art.readTime}
                              <CornerDownLeft className="w-3.5 h-3.5 opacity-60" />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
