"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { TRANSLATIONS } from "@/data/translations";
import { PRODUCTS, Product } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SmartImage } from "@/components/ui/SmartImage";
import { Search, Sparkles, Filter, CheckCircle2, ShieldCheck, HeartHandshake, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const { language } = useAppStore();
  const t = TRANSLATIONS[language];

  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc">("popular");

  // Fetch live products & inventory from Supabase on mount
  useEffect(() => {
    async function loadLiveProducts() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("products")
          .select("*, inventory(current_stock, stock_status, minimum_threshold)")
          .eq("is_published", true)
          .order("sort_order", { ascending: true });

        if (data && data.length > 0) {
          const mapped: Product[] = data.map((item: any) => {
            const inv = Array.isArray(item.inventory) ? item.inventory[0] : item.inventory;
            const isActuallyAvailable = inv
              ? inv.stock_status !== "out_of_stock" && inv.stock_status !== "discontinued"
              : item.is_available;

            return {
              id: item.id,
              slug: item.slug,
              name: item.name,
              nameHi: item.name_hi,
              category: item.category_key as any,
              categoryLabel: item.category_label,
              categoryLabelHi: item.category_label_hi,
              tagline: item.tagline || "",
              taglineHi: item.tagline_hi || "",
              shortDescription: item.short_description || "",
              shortDescriptionHi: item.short_description_hi || "",
              fullDescription: Array.isArray(item.full_description) ? item.full_description : [],
              fullDescriptionHi: Array.isArray(item.full_description_hi) ? item.full_description_hi : [],
              priceRangeDisplay: item.price_range_display || `₹${item.base_price}`,
              priceRangeDisplayHi: item.price_range_display_hi || `₹${item.base_price}`,
              basePrice: Number(item.base_price) || 0,
              isAvailable: isActuallyAvailable,
              isLaunchingSoon: item.is_launching_soon || false,
              shelfLife: item.shelf_life || "",
              shelfLifeHi: item.shelf_life_hi || "",
              storageInstructions: item.storage_instructions || "",
              storageInstructionsHi: item.storage_instructions_hi || "",
              ingredients: item.ingredients || "",
              ingredientsHi: item.ingredients_hi || "",
              fatSpec: item.fat_spec || undefined,
              snfSpec: item.snf_spec || undefined,
              keyFeatures: Array.isArray(item.key_features) ? item.key_features : [],
              keyFeaturesHi: Array.isArray(item.key_features_hi) ? item.key_features_hi : [],
              variants: Array.isArray(item.variants) && item.variants.length > 0 ? item.variants : [
                {
                  size: item.unit || "Standard Pack",
                  sizeHi: item.unit || "मानक पैक",
                  price: Number(item.base_price) || 0,
                  inStock: isActuallyAvailable,
                }
              ],
              images: (() => {
                const staticMatch = PRODUCTS.find((p) => p.slug === item.slug);
                if (staticMatch && staticMatch.images?.front) {
                  return staticMatch.images;
                }
                return item.images && typeof item.images === "object" ? item.images : { front: "" };
              })(),
              deliveryCoverage: item.delivery_coverage as any,
              minOrderNote: item.min_order_note || undefined,
              minOrderNoteHi: item.min_order_note_hi || undefined,
            };
          });
          setProductsList(mapped);
        }
      } catch (e) {
        console.warn("Using default static products:", e);
      }
    }
    loadLiveProducts();
  }, []);

  const categories = [
    { id: "all", label: t.filterAll },
    { id: "milk", label: t.filterMilk },
    { id: "dahi-chaach", label: t.filterDahiChaach },
    { id: "paneer", label: t.filterPaneer },
    { id: "ghee", label: t.filterGhee },
    { id: "khoya", label: t.filterKhoya },
    { id: "other", label: t.filterOther }
  ];

  const filteredProducts = useMemo(() => {
    return productsList.filter((p) => {
      // Category check
      const matchesCat =
        selectedCategory === "all" ||
        p.category === selectedCategory ||
        (selectedCategory === "other" && ["khoya"].includes(p.category));

      // Search query check
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        p.name.toLowerCase().includes(query) ||
        p.nameHi.includes(query) ||
        p.tagline.toLowerCase().includes(query) ||
        p.taglineHi.includes(query);

      return matchesCat && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.basePrice - b.basePrice;
      if (sortBy === "price-desc") return b.basePrice - a.basePrice;
      return 0; // default order
    });
  }, [productsList, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="w-full pt-24 md:pt-28 pb-20">
      {/* Products Hero */}
      <section className="relative bg-gradient-to-b from-[#F3F7FF] to-[#FFFDF8] py-16 md:py-24 border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B2A6F] font-serif tracking-tight">
            {t.secOurProducts}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            {language === "hi"
              ? "स्वच्छता, गुणवत्ता और जिम्मेदारी के साथ तैयार किए गए पौष्टिक डेयरी उत्पाद। दैनिक डिलीवरी और थोक ऑर्डर के लिए उपलब्ध।"
              : "Wholesome dairy products made with care, quality and hygiene. Standardized parameters, tested daily in our laboratory."}
          </p>
        </div>
      </section>

      {/* Filter Tabs & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 select-none",
                    isActive
                      ? "bg-[#1D5BD6] text-white shadow-md shadow-blue-500/20"
                      : "bg-white text-slate-700 border border-slate-200 hover:border-[#1D5BD6] hover:bg-blue-50/50"
                  )}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchProducts}
                className="w-full pl-9 pr-3.5 py-2 text-xs rounded-full border border-slate-200 bg-white text-slate-800 outline-none focus:border-[#1D5BD6]"
              />
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3.5 py-2 text-xs font-semibold rounded-full border border-slate-200 bg-white text-slate-700 outline-none focus:border-[#1D5BD6]"
              >
                <option value="popular">{t.sortPopular}</option>
                <option value="price-asc">{t.sortPriceAsc}</option>
                <option value="price-desc">{t.sortPriceDesc}</option>
              </select>
            </div>
          </div>
        </div>

        {/* 3-Column Products Grid */}
        <div className="pt-8">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <p className="text-base font-bold text-slate-700">
                {language === "hi"
                  ? "चयनित श्रेणी में कोई उत्पाद नहीं मिला।"
                  : "No products found matching your filter criteria."}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSearchQuery("");
                }}
                className="text-xs font-bold text-[#1D5BD6] hover:underline"
              >
                {language === "hi" ? "सभी उत्पाद दिखाएं" : "Reset Filters"}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Complete Dairy Nutrition Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-gradient-to-r from-[#0B2A6F] to-[#1747B8] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="text-xs font-bold text-[#F5B921] uppercase tracking-wider">
              {language === "hi" ? "शुद्ध पोषण" : "Daily Wellness"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">
              {language === "hi"
                ? "आपके परिवार के लिए संपूर्ण डेयरी पोषण"
                : "Complete Dairy Nutrition For Your Family"}
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              {language === "hi"
                ? "फुल क्रीम और टोन्ड दूध से लेकर पारंपरिक दानेदार घी और ताजा मलाई पनीर तक, दिव्यम डेयरी हर घर तक पहुंचाता है सच्चा स्वाद।"
                : "From daily milk pouches and probiotic curd to fragrant golden ghee, experience genuine dairy crafted without compromise."}
            </p>
          </div>

          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-20 pointer-events-none hidden md:block">
            <SmartImage
              src="/images/hero/hero-all-products.jpg"
              alt="Dairy Nutrition"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* 4-Icon Strip matching reference */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            {
              icon: CheckCircle2,
              title: language === "hi" ? "प्रतिदिन ताजा" : "Fresh Daily",
              desc: language === "hi" ? "सुबह का ताजा वितरण" : "Daily dispatch from plant"
            },
            {
              icon: ShieldCheck,
              title: language === "hi" ? "सुरक्षित प्रसंस्करण" : "Carefully Processed",
              desc: language === "hi" ? "स्वच्छ स्टेनलेस स्टील" : "Automated SS-304 lines"
            },
            {
              icon: Sparkles,
              title: language === "hi" ? "स्वच्छता से समझौता नहीं" : "No Compromise on Hygiene",
              desc: language === "hi" ? "दैनिक लैब टेस्टिंग" : "Daily laboratory checks"
            },
            {
              icon: HeartHandshake,
              title: language === "hi" ? "परिवारों का भरोसा" : "Loved by Families",
              desc: language === "hi" ? "सच्ची देखभाल" : "Family-inspired purity"
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#F3F7FF] text-[#1D5BD6] flex items-center justify-center shrink-0 border border-[#E3EDFF]">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-[#0B2A6F] truncate">{item.title}</h4>
                  <p className="text-[10px] text-slate-400 truncate">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="py-32 text-center text-slate-400">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
