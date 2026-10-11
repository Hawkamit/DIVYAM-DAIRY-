"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Clock,
  Calendar,
  Share2,
  Check,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Sparkles
} from "lucide-react";
import { Article } from "@/data/articles";
import { Product, getProductBySlug } from "@/data/products";
import { useAppStore } from "@/lib/store";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";

interface ArticleDetailViewProps {
  article: Article;
  relatedProducts: Product[];
  relatedArticles: Article[];
}

export function ArticleDetailView({
  article,
  relatedProducts,
  relatedArticles
}: ArticleDetailViewProps) {
  const { language } = useAppStore();
  const isHi = language === "hi";

  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareText = encodeURIComponent(
    `Read this insightful article from Divyam Dairy Products: ${article.title}\n`
  );
  const waShareUrl = `https://wa.me/?text=${shareText}${encodeURIComponent(
    typeof window !== "undefined" ? window.location.href : ""
  )}`;

  return (
    <div className="min-h-screen bg-cream-50 pt-28 pb-20">
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-yellow-500 z-50 origin-left transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav aria-label="Breadcrumbs" className="flex items-center space-x-2 text-sm text-ink-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            {isHi ? "होम" : "Home"}
          </Link>
          <ChevronRight className="w-4 h-4 text-line" />
          <Link href="/knowledge-hub" className="hover:text-blue-600 transition-colors">
            {isHi ? "ज्ञान केंद्र" : "Knowledge Hub"}
          </Link>
          <ChevronRight className="w-4 h-4 text-line" />
          <span className="text-blue-900 font-medium truncate max-w-[200px] sm:max-w-none">
            {isHi ? article.titleHi : article.title}
          </span>
        </nav>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Article Header */}
        <header className="mb-10 text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-blue-900 tracking-tight leading-[1.18]">
            {isHi ? article.titleHi : article.title}
          </h1>

          <p className="text-base sm:text-lg text-ink-600 font-sans leading-relaxed">
            {isHi ? article.excerptHi : article.excerpt}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-ink-500 pt-2 border-t border-line/60">
            <span className="font-semibold text-blue-900">{article.author}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-600" />
              {article.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              {isHi ? article.readTimeHi : article.readTime}
            </span>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative aspect-16/9 rounded-3xl overflow-hidden shadow-soft border border-line mb-12 bg-blue-50">
          <SmartImage
            src={article.image}
            alt={article.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Main Content Area with Desktop Sidebar for Table of Contents */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT: Table of Contents (Sticky on Desktop) */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-32 p-6 rounded-2xl bg-white border border-line shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-950 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                {isHi ? "विषय सूची" : "Table of Contents"}
              </h3>
              <ul className="space-y-2.5 text-xs text-ink-600">
                {article.sections.map((sec, idx) => (
                  <li key={idx}>
                    <a
                      href={`#sec-${idx}`}
                      className="hover:text-blue-600 transition-colors block leading-relaxed"
                    >
                      {idx + 1}. {isHi ? sec.headingHi : sec.heading}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Share block */}
              <div className="pt-4 border-t border-line space-y-2">
                <span className="text-[11px] uppercase font-bold text-ink-400 block">
                  {isHi ? "शेयर करें:" : "Share Article:"}
                </span>
                <div className="flex gap-2">
                  <a
                    href={waShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 flex items-center justify-center transition-colors flex-1 text-xs font-semibold"
                    aria-label="Share on WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4 mr-1.5" />
                    WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="p-2 rounded-lg bg-cream-50 text-ink-700 hover:bg-slate-100 flex items-center justify-center transition-colors flex-1 text-xs font-semibold border border-line"
                  >
                    {copied ? <Check className="w-4 h-4 mr-1.5 text-green-600" /> : <Share2 className="w-4 h-4 mr-1.5" />}
                    {copied ? (isHi ? "कॉपी हुआ!" : "Copied!") : (isHi ? "लिंक" : "Copy")}
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT: Article Body Text */}
          <main className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-line shadow-soft max-w-prose mx-auto lg:mx-0">
            <div className="space-y-10 text-ink-700 font-sans leading-relaxed text-base sm:text-lg">
              {article.sections.map((sec, idx) => (
                <section key={idx} id={`sec-${idx}`} className="space-y-4 scroll-mt-32">
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-blue-900 tracking-tight">
                    {isHi ? sec.headingHi : sec.heading}
                  </h2>
                  {(isHi ? sec.bodyHi : sec.body).map((para, pIdx) => (
                    <p key={pIdx} className="text-ink-600 leading-relaxed text-sm sm:text-base">
                      {para}
                    </p>
                  ))}
                </section>
              ))}
            </div>

            {/* Mobile Share Block */}
            <div className="lg:hidden mt-10 pt-6 border-t border-line flex items-center justify-between gap-4">
              <span className="text-xs font-bold text-blue-950 uppercase tracking-wider">
                {isHi ? "शेयर करें:" : "Share Article:"}
              </span>
              <div className="flex gap-2">
                <a
                  href={waShareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-full bg-green-50 text-green-700 text-xs font-semibold flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-3.5 py-2 rounded-full bg-cream-50 text-ink-700 text-xs font-semibold flex items-center gap-1.5 border border-line"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4" />}
                  {copied ? (isHi ? "कॉपी हुआ!" : "Copied!") : (isHi ? "लिंक कॉपी करें" : "Copy Link")}
                </button>
              </div>
            </div>
          </main>
        </div>

        {/* RELATED PRODUCTS SECTION */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-line">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-serif font-bold text-blue-900">
                  {isHi ? "इस लेख से जुड़े शुद्ध उत्पाद" : "Explore Featured Dairy Products"}
                </h3>
              </div>
              <Link
                href="/products"
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                {isHi ? "सभी उत्पाद" : "All Products"}
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scroll-smooth no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-4 sm:pb-0">
              {relatedProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="w-[78vw] sm:w-auto max-w-[290px] sm:max-w-none shrink-0 sm:shrink snap-start h-full"
                >
                  <ProductCard product={prod} className="h-full" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* RELATED ARTICLES SECTION */}
        {relatedArticles.length > 0 && (
          <section className="mt-16 pt-12 border-t border-line">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-serif font-bold text-blue-900">
                  {isHi ? "संबंधित ज्ञानवर्धक लेख" : "Related Dairy Guides"}
                </h3>
              </div>
              <Link
                href="/knowledge-hub"
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                {isHi ? "सभी लेख" : "All Articles"}
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/knowledge-hub/${rel.slug}`}
                  className="p-6 rounded-2xl bg-white border border-line hover:border-blue-300 hover:shadow-soft transition-all duration-200 group flex items-start gap-4"
                >
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-blue-50">
                    <SmartImage src={rel.image} alt={rel.title} fill className="object-cover" />
                  </div>
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">
                      {isHi ? rel.categoryHi : rel.category}
                    </span>
                    <h4 className="font-serif font-bold text-base text-blue-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                      {isHi ? rel.titleHi : rel.title}
                    </h4>
                    <span className="text-xs text-ink-400 block">{rel.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
