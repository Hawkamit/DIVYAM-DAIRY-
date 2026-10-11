"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Clock,
  Calendar,
  Search,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { ARTICLES, Article } from "@/data/articles";
import { useAppStore } from "@/lib/store";
import { SmartImage } from "@/components/ui/SmartImage";
import { MilkWaveDivider } from "@/components/ui/MilkWaveDivider";

export function KnowledgeHubClient() {
  const { language } = useAppStore();
  const isHi = language === "hi";

  const categories = [
    { id: "all", label: "All Topics", labelHi: "सभी विषय" },
    { id: "Dairy Facts", label: "Dairy Facts", labelHi: "डेयरी तथ्य" },
    { id: "Nutrition", label: "Nutrition", labelHi: "पोषण" },
    { id: "Recipes", label: "Recipes", labelHi: "व्यंजन व विधियाँ" },
    { id: "Health & Lifestyle", label: "Lifestyle", labelHi: "लाइफस्टाइल" },
    { id: "Our Story", label: "Our Story", labelHi: "हमारी कहानी" }
  ];

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = ARTICLES.filter((art) => {
    const matchesCategory =
      activeCategory === "all" || art.category === activeCategory;
    const clean = searchQuery.toLowerCase().trim();
    if (!clean) return matchesCategory;

    const matchesSearch =
      art.title.toLowerCase().includes(clean) ||
      art.excerpt.toLowerCase().includes(clean) ||
      art.titleHi.includes(clean) ||
      art.excerptHi.includes(clean);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-cream-50 pt-28 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumbs" className="flex items-center space-x-2 text-sm text-ink-500 mb-8">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              {isHi ? "होम" : "Home"}
            </Link>
            <ChevronRight className="w-4 h-4 text-line" />
            <span className="text-blue-900 font-medium">
              {isHi ? "डेयरी ज्ञान केंद्र" : "Knowledge Hub"}
            </span>
          </nav>

          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-blue-900 tracking-tight">
              {isHi ? "डेयरी ज्ञान केंद्र" : "Dairy Knowledge Hub"}
            </h1>

            <p className="text-base sm:text-lg text-ink-600 font-sans max-w-2xl mx-auto">
              {isHi
                ? "दूध के सही भंडारण, मानकीकरण, गुणवत्ता परीक्षण और पारंपरिक व्यंजनों की उपयोगी और प्रामाणिक मार्गदर्शिका।"
                : "Authentic, factual guides on dairy storage, fat standardization, quality testing, and wholesome kitchen recipes."}
            </p>

            {/* Search Input */}
            <div className="max-w-md mx-auto pt-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isHi
                      ? "लेख खोजें (उदा. भंडारण, पनीर, घी)..."
                      : "Search articles (e.g. storage, paneer, ghee)..."
                  }
                  className="w-full h-12 pl-4 pr-10 rounded-full border border-line bg-white text-sm shadow-xs focus:outline-hidden focus:border-blue-600 text-ink-700"
                />
                <Search className="w-4 h-4 text-ink-400 absolute right-4 top-4" />
              </div>
            </div>

            {/* Category Pills */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-white text-ink-700 border border-line hover:border-blue-400 hover:bg-blue-50/50"
                    }`}
                  >
                    {isHi ? cat.labelHi : cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* MILK WAVE DIVIDER */}
      <div className="relative w-full overflow-hidden my-4">
        <MilkWaveDivider variant="top" fill="#FFFFFF" />
      </div>

      {/* 2. ARTICLES GRID */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 bg-cream-50 rounded-3xl border border-line">
              <p className="text-ink-600 text-sm font-sans mb-4">
                {isHi ? "कोई लेख नहीं मिला।" : "No articles found matching your query."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="text-xs font-bold text-blue-600 underline"
              >
                {isHi ? "सभी लेख देखें" : "Reset Filters"}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((art) => (
                <article
                  key={art.id}
                  className="group flex flex-col bg-cream-50/50 rounded-3xl overflow-hidden border border-line hover:border-blue-300 hover:shadow-soft transition-all duration-300 hover:-translate-y-1"
                >
                  <Link href={`/knowledge-hub/${art.slug}`} className="block relative aspect-16/10 overflow-hidden bg-blue-50">
                    <SmartImage
                      src={art.image}
                      alt={art.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 text-xs font-semibold bg-white/90 backdrop-blur-xs text-blue-900 px-3 py-1 rounded-full shadow-xs border border-line">
                      {isHi ? art.categoryHi : art.category}
                    </span>
                  </Link>

                  <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-xs text-ink-500 font-sans">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-blue-600" />
                          {art.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-blue-600" />
                          {isHi ? art.readTimeHi : art.readTime}
                        </span>
                      </div>

                      <h2 className="text-xl font-serif font-bold text-blue-900 group-hover:text-blue-600 transition-colors leading-snug">
                        <Link href={`/knowledge-hub/${art.slug}`}>
                          {isHi ? art.titleHi : art.title}
                        </Link>
                      </h2>

                      <p className="text-xs sm:text-sm text-ink-600 font-sans line-clamp-3 leading-relaxed">
                        {isHi ? art.excerptHi : art.excerpt}
                      </p>
                    </div>

                    <div className="pt-5 mt-5 border-t border-line/60 flex items-center justify-between">
                      <span className="text-xs text-ink-500 font-sans truncate max-w-[160px]">
                        {art.author}
                      </span>
                      <Link
                        href={`/knowledge-hub/${art.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <span>{isHi ? "पूरा पढ़ें" : "Read Article"}</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
