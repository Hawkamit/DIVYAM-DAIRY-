"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Search,
  ChevronRight,
  BookOpen,
  Package,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import { ARTICLES, Article } from "@/data/articles";
import { useAppStore } from "@/lib/store";
import { ProductCard } from "@/components/product/ProductCard";
import { SmartImage } from "@/components/ui/SmartImage";

function SearchResultsContent() {
  const { language } = useAppStore();
  const isHi = language === "hi";
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get("q") || "";

  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const clean = query.trim().toLowerCase();

  const matchingProducts = clean
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(clean) ||
          p.nameHi.includes(clean) ||
          p.shortDescription.toLowerCase().includes(clean) ||
          p.category.toLowerCase().includes(clean) ||
          p.tagline.toLowerCase().includes(clean)
      )
    : [];

  const matchingArticles = clean
    ? ARTICLES.filter(
        (a) =>
          a.title.toLowerCase().includes(clean) ||
          a.titleHi.includes(clean) ||
          a.excerpt.toLowerCase().includes(clean) ||
          a.category.toLowerCase().includes(clean)
      )
    : [];

  const totalResults = matchingProducts.length + matchingArticles.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Search Header & Bar */}
      <div className="max-w-2xl mx-auto text-center space-y-4 mb-12">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-blue-900">
          {isHi ? "खोज परिणाम" : "Search Divyam Dairy"}
        </h1>

        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isHi
                ? "उत्पाद अथवा लेख खोजें (उदा. दूध, घी, पनीर, तापमान)..."
                : "Search products or articles (e.g. milk, ghee, paneer, storage)..."
            }
            className="w-full h-13 pl-5 pr-12 rounded-full border border-line bg-white shadow-soft text-base focus:outline-hidden focus:border-blue-600 text-ink-700"
          />
          <Search className="w-5 h-5 text-ink-400 absolute right-4 top-4" />
        </div>

        {clean && (
          <p className="text-xs sm:text-sm text-ink-500 font-sans">
            &quot;{query}&quot; {isHi ? "के लिए" : "found"} {totalResults}{" "}
            {totalResults === 1 ? (isHi ? "परिणाम मिला" : "result") : (isHi ? "परिणाम मिले" : "results")}
          </p>
        )}
      </div>

      {!clean ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-line p-8 max-w-xl mx-auto space-y-4">
          <Sparkles className="w-8 h-8 text-yellow-500 mx-auto" />
          <h2 className="text-xl font-serif font-bold text-blue-900">
            {isHi ? "खोजने के लिए ऊपर टाइप करें" : "Type above to search"}
          </h2>
          <p className="text-xs text-ink-500 font-sans">
            {isHi
              ? "लोकप्रिय खोजें: फुल क्रीम दूध, शुद्ध घी, पनीर, मटका दही, लैब जांच"
              : "Popular searches: Full cream milk, Pure ghee, Paneer, Matka dahi, Lab testing"}
          </p>
        </div>
      ) : totalResults === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-line p-8 max-w-xl mx-auto space-y-4">
          <p className="text-ink-600 text-base font-sans">
            {isHi
              ? `"${query}" के लिए कोई परिणाम नहीं मिला।`
              : `No results found matching "${query}".`}
          </p>
          <div className="pt-2">
            <span className="text-xs text-ink-400 block mb-3">
              {isHi ? "सुझाए गए शब्द:" : "Try searching for:"}
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              {["Milk", "Ghee", "Paneer", "Dahi", "Chaach", "Testing"].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setQuery(term)}
                  className="px-3.5 py-1.5 rounded-full text-xs bg-cream-50 hover:bg-blue-50 text-blue-900 border border-line"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-16">
          {/* Products Results */}
          {matchingProducts.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center gap-2 border-b border-line pb-3">
                <Package className="w-5 h-5 text-blue-600" />
                <h2 className="text-2xl font-serif font-bold text-blue-900">
                  {isHi ? "उत्पाद" : "Products"} ({matchingProducts.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {matchingProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </section>
          )}

          {/* Articles Results */}
          {matchingArticles.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center gap-2 border-b border-line pb-3">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <h2 className="text-2xl font-serif font-bold text-blue-900">
                  {isHi ? "ज्ञान केंद्र के लेख" : "Knowledge Hub Articles"} ({matchingArticles.length})
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchingArticles.map((art) => (
                  <Link
                    key={art.id}
                    href={`/knowledge-hub/${art.slug}`}
                    className="p-6 rounded-3xl bg-white border border-line hover:border-blue-300 hover:shadow-soft transition-all duration-200 group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block mb-2">
                        {isHi ? art.categoryHi : art.category}
                      </span>
                      <h3 className="font-serif font-bold text-lg text-blue-900 group-hover:text-blue-600 transition-colors mb-2 leading-snug">
                        {isHi ? art.titleHi : art.title}
                      </h3>
                      <p className="text-xs text-ink-600 line-clamp-3 leading-relaxed font-sans mb-4">
                        {isHi ? art.excerptHi : art.excerpt}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-blue-600 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>{isHi ? "लेख पढ़ें" : "Read Article"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

export function SearchResultsView() {
  return (
    <div className="min-h-screen bg-cream-50 pt-28 pb-24">
      <Suspense fallback={<div className="text-center py-20 text-ink-500">Loading search...</div>}>
        <SearchResultsContent />
      </Suspense>
    </div>
  );
}
