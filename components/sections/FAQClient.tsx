"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronRight,
  MessageCircle,
  Phone,
  Search,
  Sparkles
} from "lucide-react";
import { FAQS, FAQItem } from "@/data/faqs";
import { SITE_CONFIG } from "@/data/site";
import { useAppStore } from "@/lib/store";
import { MilkWaveDivider } from "@/components/ui/MilkWaveDivider";
import { Button } from "@/components/ui/Button";

export function FAQClient() {
  const { language } = useAppStore();
  const isHi = language === "hi";

  const categories = [
    { id: "all", label: "All Questions", labelHi: "सभी प्रश्न" },
    { id: "products", label: "Products", labelHi: "उत्पाद" },
    { id: "ordering", label: "Ordering", labelHi: "ऑर्डर नियम" },
    { id: "delivery", label: "Delivery", labelHi: "वितरण" },
    { id: "quality", label: "Quality & Hygiene", labelHi: "गुणवत्ता व स्वच्छता" },
    { id: "storage", label: "Storage", labelHi: "भंडारण" }
  ];

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openIds, setOpenIds] = useState<string[]>([FAQS[0]?.id || ""]);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    const cleanQ = searchQuery.toLowerCase().trim();
    if (!cleanQ) return matchesCategory;

    const matchesSearch =
      faq.question.toLowerCase().includes(cleanQ) ||
      faq.answer.toLowerCase().includes(cleanQ) ||
      faq.questionHi.includes(cleanQ) ||
      faq.answerHi.includes(cleanQ);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-cream-50 pt-28 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumbs" className="flex items-center space-x-2 text-sm text-ink-500 mb-8">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              {isHi ? "होम" : "Home"}
            </Link>
            <ChevronRight className="w-4 h-4 text-line" />
            <span className="text-blue-900 font-medium">
              {isHi ? "अक्सर पूछे जाने वाले प्रश्न" : "FAQ"}
            </span>
          </nav>

          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-blue-900 tracking-tight">
              {isHi ? "अक्सर पूछे जाने वाले सवाल" : "Frequently Asked Questions"}
            </h1>

            <p className="text-base sm:text-lg text-ink-600 font-sans max-w-2xl mx-auto">
              {isHi
                ? "हमारे दुग्ध उत्पादों, शेल्फ लाइफ, पैकेजिंग, न्यूनतम ऑर्डर और डिलीवरी के बारे में पूरी जानकारी।"
                : "Find clear, factual information about our products, laboratory testing, storage, and order procedures."}
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
                      ? "सवाल खोजें (उदा. फैट, डिलीवरी, शेल्फ लाइफ)..."
                      : "Search questions (e.g. fat, delivery, shelf life)..."
                  }
                  className="w-full h-12 pl-4 pr-10 rounded-full border border-line bg-white text-sm shadow-xs focus:outline-hidden focus:border-blue-600 text-ink-700"
                />
                <Search className="w-4 h-4 text-ink-400 absolute right-4 top-4" />
              </div>
            </div>

            {/* Filter Tabs */}
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

      {/* 2. ACCORDION SECTION */}
      <section className="bg-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-16 bg-cream-50 rounded-3xl border border-line">
              <p className="text-ink-600 text-sm font-sans mb-4">
                {isHi
                  ? "आपकी खोज के लिए कोई प्रश्न नहीं मिला।"
                  : "No questions found matching your search."}
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
              >
                {isHi ? "सभी प्रश्न देखें" : "View All Questions"}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq) => {
                const isOpen = openIds.includes(faq.id);

                return (
                  <div
                    key={faq.id}
                    className="border border-line rounded-2xl overflow-hidden transition-all bg-cream-50/40"
                  >
                    <button
                      type="button"
                      onClick={() => toggleItem(faq.id)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                      className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-cream-50 transition-colors gap-4"
                    >
                      <span className="font-serif font-bold text-base sm:text-lg text-blue-900 leading-snug">
                        {isHi ? faq.questionHi : faq.question}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                          isOpen
                            ? "bg-blue-600 text-white rotate-180"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div
                        id={`faq-answer-${faq.id}`}
                        className="px-5 sm:px-6 pb-6 pt-1 text-ink-600 font-sans text-sm sm:text-base leading-relaxed border-t border-line/60 bg-white"
                      >
                        {isHi ? faq.answerHi : faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* 3. STILL HAVE QUESTIONS CARD */}
      <section className="py-16 bg-blue-50/50 border-t border-line">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-yellow-500 text-blue-950 flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-blue-900">
            {isHi ? "क्या आपका प्रश्न यहाँ सूचीबद्ध नहीं है?" : "Still Have Questions?"}
          </h2>

          <p className="text-sm sm:text-base text-ink-600 font-sans max-w-xl mx-auto">
            {isHi
              ? "हमारी सहायता टीम से सीधे WhatsApp या फोन पर बात करें। हम सुबह 6:00 बजे से रात 10:00 बजे तक उपलब्ध हैं।"
              : "Our support team is happy to assist you directly over WhatsApp or phone call between 6:00 AM – 10:00 PM."}
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button
              variant="whatsapp"
              size="lg"
              href={`https://wa.me/${SITE_CONFIG.whatsappNumberDigits}?text=${encodeURIComponent(
                "Hello Divyam Dairy! I have a question about your products."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              {isHi ? "WhatsApp पर पूछें" : "Ask on WhatsApp"}
            </Button>
            <Button
              variant="outline"
              size="lg"
              href={`tel:${SITE_CONFIG.supportPhone}`}
            >
              <Phone className="w-4 h-4 mr-2" />
              {isHi ? `कॉल करें: ${SITE_CONFIG.supportPhone}` : `Call Support: ${SITE_CONFIG.supportPhone}`}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
