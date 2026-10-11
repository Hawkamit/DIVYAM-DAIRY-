"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Phone,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Info,
  Thermometer
} from "lucide-react";
import { Product, ProductVariant } from "@/data/products";
import { SITE_CONFIG } from "@/data/site";
import { useAppStore } from "@/lib/store";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { formatCurrency, getWhatsAppOrderUrl } from "@/lib/utils";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailView({ product, relatedProducts }: ProductDetailViewProps) {
  const { language, addToCart, toggleWishlist, isInWishlist } = useAppStore();
  const isHi = language === "hi";

  // Selected variant state
  const hasVariants = product.variants && product.variants.length > 0;
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    hasVariants ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);

  // Related products mobile slider
  const relatedSliderRef = useRef<HTMLDivElement>(null);
  const scrollRelated = (direction: "left" | "right") => {
    if (relatedSliderRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      relatedSliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Gallery image state
  const availableImages = [
    { key: "front", label: isHi ? "सामने" : "Front", url: product.images.front },
    ...(product.images.angle
      ? [{ key: "angle", label: isHi ? "कोण" : "Angle", url: product.images.angle }]
      : []),
    ...(product.images.lifestyle
      ? [{ key: "lifestyle", label: isHi ? "उपयोग" : "Lifestyle", url: product.images.lifestyle }]
      : [])
  ];
  const [activeImage, setActiveImage] = useState(availableImages[0]?.url || product.images.front);

  // Tabs
  type TabKey = "description" | "nutrition" | "ingredients" | "storage" | "delivery";
  const [activeTab, setActiveTab] = useState<TabKey>("description");

  const wishlisted = isInWishlist(product.slug);

  // Price calculations
  const currentPrice = selectedVariant
    ? selectedVariant.priceMin
    : product.basePrice;
  const currentPriceDisplay = selectedVariant
    ? selectedVariant.priceDisplay
    : product.priceRangeDisplay;

  const handleAddToCart = () => {
    if (product.isLaunchingSoon) return;
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      nameHi: product.nameHi,
      variantId: selectedVariant ? selectedVariant.id : "default",
      size: selectedVariant ? selectedVariant.size : "Standard",
      sizeHi: selectedVariant ? selectedVariant.sizeHi : "मानक पैक",
      price: currentPrice,
      quantity,
      image: product.images.front,
      isGhee: product.category === "ghee"
    });
  };

  const selectedSizeLabel = selectedVariant
    ? isHi
      ? selectedVariant.sizeHi
      : selectedVariant.size
    : "Standard Pack";

  const waOrderUrl = getWhatsAppOrderUrl({
    productName: isHi ? product.nameHi : product.name,
    size: selectedSizeLabel,
    quantity
  });

  const waReviewUrl = `https://wa.me/${SITE_CONFIG.whatsappNumberDigits}?text=${encodeURIComponent(
    `Namaste Divyam Dairy! I would like to share my experience with ${product.name}.`
  )}`;

  return (
    <div className="min-h-screen bg-cream-50 pt-28 pb-20">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <nav aria-label="Breadcrumbs" className="flex items-center space-x-2 text-sm text-ink-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            {isHi ? "होम" : "Home"}
          </Link>
          <ChevronRight className="w-4 h-4 text-line" />
          <Link href="/products" className="hover:text-blue-600 transition-colors">
            {isHi ? "हमारे उत्पाद" : "Products"}
          </Link>
          <ChevronRight className="w-4 h-4 text-line" />
          <span className="text-blue-900 font-medium truncate max-w-[200px] sm:max-w-none">
            {isHi ? product.nameHi : product.name}
          </span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 bg-white rounded-3xl p-6 sm:p-10 shadow-soft border border-line">
          {/* LEFT: Product Gallery */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-blue-50/40 border border-blue-100 flex items-center justify-center group">
              <SmartImage
                src={activeImage}
                alt={isHi ? product.nameHi : product.name}
                fill
                priority
                className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
              />

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.slug)}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                className={`absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-md z-10 ${
                  wishlisted
                    ? "bg-red-50 text-red-600 border border-red-200"
                    : "bg-white/90 text-ink-500 hover:text-red-600 border border-line"
                }`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? "fill-current text-red-500" : ""}`} />
              </button>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                {product.isLaunchingSoon && (
                  <span className="bg-yellow-500 text-blue-950 font-semibold text-xs px-3 py-1.5 rounded-full shadow-sm">
                    {isHi ? "शीघ्र उपलब्ध" : "Launching Soon"}
                  </span>
                )}
                {product.needsConfirmation && (
                  <span className="bg-blue-100 text-blue-900 font-medium text-xs px-3 py-1 rounded-full">
                    {isHi ? "पूछताछ पर मूल्य" : "Price on Request"}
                  </span>
                )}
                <span className="bg-white/90 backdrop-blur-xs text-blue-900 font-medium text-xs px-3 py-1 rounded-full border border-blue-100">
                  {isHi ? product.categoryLabelHi : product.categoryLabel}
                </span>
              </div>
            </div>

            {/* Thumbnail Row */}
            {availableImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {availableImages.map((img) => (
                  <button
                    key={img.key}
                    type="button"
                    onClick={() => setActiveImage(img.url)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 bg-blue-50/30 ${
                      activeImage === img.url
                        ? "border-blue-600 shadow-sm ring-2 ring-blue-600/20"
                        : "border-line hover:border-blue-300"
                    }`}
                  >
                    <SmartImage src={img.url} alt={img.label} fill className="object-contain p-2" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Details & Purchase Actions */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-xs font-bold tracking-wider uppercase text-blue-600">
                  {isHi ? product.categoryLabelHi : product.categoryLabel}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-green-700 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  {isHi ? "दैनिक ताजगी उपलब्ध" : "Fresh Daily Availability"}
                </span>
              </div>

              {/* Title & Tagline */}
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-blue-900 tracking-tight mb-2">
                {isHi ? product.nameHi : product.name}
              </h1>
              <p className="text-lg text-ink-500 font-sans font-medium mb-4">
                {isHi ? product.taglineHi : product.tagline}
              </p>

              {/* Rating Section (§3A: No fake stars/numbers; authentic review prompt) */}
              <div className="flex items-center gap-3 py-3 px-4 bg-cream-50/80 rounded-xl border border-line mb-6">
                <Sparkles className="w-4 h-4 text-yellow-500 shrink-0" />
                <span className="text-xs sm:text-sm text-ink-700">
                  {isHi
                    ? "क्या आपने यह उत्पाद आजमाया है? अपना अनुभव साझा करें:"
                    : "Tried this product? Be the first to share your experience:"}
                </span>
                <a
                  href={waReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-green-600 hover:text-green-700 ml-auto whitespace-nowrap flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              </div>

              {/* Price Block */}
              <div className="mb-6 p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-baseline justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-ink-500 block mb-1">
                    {product.needsConfirmation
                      ? isHi ? "अनुमानित मूल्य" : "Estimated Price"
                      : isHi ? "मूल्य" : "Price"}
                  </span>
                  <div className="text-3xl font-bold text-blue-900 font-sans">
                    {product.isLaunchingSoon ? (
                      <span className="text-xl text-ink-500 font-normal">
                        {isHi ? "शीघ्र उपलब्ध (मूल्य घोषणा जल्द)" : "Launching Soon (Price TBA)"}
                      </span>
                    ) : (
                      currentPriceDisplay
                    )}
                  </div>
                  {product.needsConfirmation && (
                    <span className="text-xs text-amber-700 mt-1 block">
                      {isHi
                        ? "* ऑर्डर पुष्टि के समय अंतिम मूल्य बताया जाएगा"
                        : "* Final price confirmed during order confirmation"}
                    </span>
                  )}
                </div>

                {/* Shelf life badge */}
                <div className="text-right">
                  <span className="text-xs text-ink-500 block">
                    {isHi ? "उपयोग अवधि" : "Shelf Life"}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-900">
                    <Clock className="w-4 h-4 text-blue-600" />
                    {isHi ? product.shelfLifeHi : product.shelfLife}
                  </span>
                </div>
              </div>

              {/* Variant / Size Selector */}
              {hasVariants && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-blue-950 mb-2">
                    {isHi ? "आकार / पैक चुनें:" : "Select Size / Pack:"}
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {product.variants.map((v) => {
                      const isSelected = selectedVariant?.id === v.id;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setSelectedVariant(v)}
                          className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                            isSelected
                              ? "bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/30"
                              : "bg-white text-ink-700 border border-line hover:border-blue-400 hover:bg-blue-50/50"
                          }`}
                        >
                          {isHi ? v.sizeHi : v.size}
                          <span
                            className={`ml-2 text-xs font-normal ${
                              isSelected ? "text-blue-100" : "text-ink-500"
                            }`}
                          >
                            ({v.priceDisplay})
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add to Cart (when available) */}
              {!product.isLaunchingSoon && (
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-line bg-white rounded-full p-1 shadow-xs">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        disabled={quantity <= 1}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-ink-700 hover:bg-cream-50 disabled:opacity-30 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-semibold text-blue-900 text-sm">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.min(50, q + 1))}
                        disabled={quantity >= 50}
                        className="w-9 h-9 rounded-full flex items-center justify-center text-ink-700 hover:bg-cream-50 disabled:opacity-30 transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs text-ink-500">
                      {isHi ? "कुल योग अनुमान:" : "Estimated total:"}{" "}
                      <strong className="text-blue-900 text-sm font-bold">
                        {formatCurrency(currentPrice * quantity)}
                      </strong>
                    </span>
                  </div>

                  {/* Stacked 3 CTAs per §7.3 */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={handleAddToCart}
                      className="flex-1 justify-center shadow-md shadow-blue-600/20"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      {isHi ? "कार्ट में जोड़ें" : "Add to Cart"}
                    </Button>

                    <Button
                      variant="whatsapp"
                      size="lg"
                      href={waOrderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 justify-center shadow-md shadow-green-600/20"
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      {isHi ? "WhatsApp पर ऑर्डर" : "Order on WhatsApp"}
                    </Button>
                  </div>

                  <div className="pt-1">
                    <Button
                      variant="outline"
                      size="md"
                      href={`tel:${SITE_CONFIG.phonePrimary}`}
                      className="w-full justify-center text-blue-700 border-blue-200 hover:bg-blue-50"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      {isHi ? "कॉल करके ऑर्डर करें: " : "Call to Order: "}
                      {SITE_CONFIG.phonePrimary}
                    </Button>
                  </div>
                </div>
              )}

              {/* Launching soon state */}
              {product.isLaunchingSoon && (
                <div className="p-6 rounded-2xl bg-yellow-50/60 border border-yellow-200 mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-blue-950 text-base mb-1">
                      {isHi ? "यह उत्पाद जल्द आ रहा है" : "This product is launching soon"}
                    </h2>
                    <p className="text-xs text-ink-500">
                      {isHi
                        ? "जैसे ही यह उपलब्ध होगा, सूचना पाने के लिए WhatsApp पर संदेश भेजें।"
                        : "Send us a message on WhatsApp to get notified as soon as fresh batches arrive."}
                    </p>
                  </div>
                  <Button
                    variant="whatsapp"
                    size="sm"
                    href={`https://wa.me/${SITE_CONFIG.whatsappNumberDigits}?text=${encodeURIComponent(
                      `Hello Divyam Dairy! Please notify me when ${product.name} is available for order.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {isHi ? "मुझे सूचित करें" : "Notify Me"}
                  </Button>
                </div>
              )}

              {/* Minimum order guidance notice */}
              {product.deliveryCoverage === "local" && (
                <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-2.5 mb-6 text-xs text-ink-600">
                  <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-blue-900 font-semibold">
                      {isHi ? "वितरण सूचना:" : "Delivery Notice:"}
                    </strong>{" "}
                    {isHi
                      ? "दूध, दही और पनीर केवल हमारे अधिकृत वितरण क्षेत्रों में ताजा व कोल्ड-चेन में वितरित किए जाते हैं।"
                      : "Milk, Dahi & Paneer are delivered fresh via cold-chain in our local authorized delivery zones."}
                  </div>
                </div>
              )}

              {/* 4 Benefit Icons Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-line text-center">
                <div className="p-3 rounded-xl bg-cream-50 border border-line/60 flex flex-col items-center">
                  <ShieldCheck className="w-5 h-5 text-blue-600 mb-1.5" />
                  <span className="text-xs font-semibold text-blue-950">
                    {isHi ? "दैनिक लैब जांच" : "Daily Lab Tested"}
                  </span>
                  <span className="text-[11px] text-ink-500">
                    {isHi ? "फैट व एसएनएफ" : "Fat & SNF Verified"}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-cream-50 border border-line/60 flex flex-col items-center">
                  <Thermometer className="w-5 h-5 text-blue-600 mb-1.5" />
                  <span className="text-xs font-semibold text-blue-950">
                    {isHi ? "कोल्ड चेन ताजगी" : "Cold Chain"}
                  </span>
                  <span className="text-[11px] text-ink-500">
                    {isHi ? "संभाल कर वितरण" : "Carefully Handled"}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-cream-50 border border-line/60 flex flex-col items-center">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mb-1.5" />
                  <span className="text-xs font-semibold text-blue-950">
                    {isHi ? "स्वच्छ संयंत्र" : "Hygienic Plant"}
                  </span>
                  <span className="text-[11px] text-ink-500">
                    {isHi ? "मशीनी प्रोसेसिंग" : "SS 304 Equipment"}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-cream-50 border border-line/60 flex flex-col items-center">
                  <Sparkles className="w-5 h-5 text-blue-600 mb-1.5" />
                  <span className="text-xs font-semibold text-blue-950">
                    {isHi ? "शुद्धता का वादा" : "No Adulteration"}
                  </span>
                  <span className="text-[11px] text-ink-500">
                    {isHi ? "घर जैसा स्वाद" : "Authentic Taste"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* TABBED SPECIFICATION SECTION */}
        <div className="mt-14 bg-white rounded-3xl p-6 sm:p-10 border border-line shadow-soft">
          <div className="flex border-b border-line overflow-x-auto gap-2 sm:gap-6 pb-2">
            {[
              { id: "description", label: isHi ? "उत्पाद विवरण" : "Description" },
              { id: "nutrition", label: isHi ? "मानकीकरण व पोषण" : "Nutritional Info" },
              { id: "ingredients", label: isHi ? "सामग्री" : "Ingredients" },
              { id: "storage", label: isHi ? "भंडारण व शेल्फ लाइफ" : "Storage & Shelf Life" },
              { id: "delivery", label: isHi ? "वितरण नियम" : "Delivery Rules" }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as TabKey)}
                className={`py-3 px-4 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-ink-600 hover:text-blue-900 hover:bg-cream-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-6 min-h-[180px]">
            {activeTab === "description" && (
              <div className="space-y-4 max-w-4xl">
                <p className="text-ink-700 leading-relaxed font-sans text-base">
                  {isHi ? product.shortDescriptionHi : product.shortDescription}
                </p>
                {(isHi ? product.fullDescriptionHi : product.fullDescription).map(
                  (paragraph, idx) => (
                    <p key={idx} className="text-ink-600 leading-relaxed text-sm">
                      {paragraph}
                    </p>
                  )
                )}

                {/* Key features */}
                <div className="pt-4">
                  <h3 className="text-sm font-bold text-blue-950 uppercase tracking-wider mb-3">
                    {isHi ? "मुख्य विशेषताएं" : "Key Highlights"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {(isHi ? product.keyFeaturesHi : product.keyFeatures).map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-ink-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "nutrition" && (
              <div className="space-y-4 max-w-2xl">
                <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                  <h3 className="font-semibold text-blue-950 text-sm mb-3">
                    {isHi ? "पुष्टीकृत दुग्ध मानकीकरण" : "Confirmed Milk Standardization Specs"}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {product.fatSpec && (
                      <div className="bg-white p-3 rounded-xl border border-line">
                        <span className="text-xs text-ink-500 block">
                          {isHi ? "न्यूनतम दुग्ध वसा (Fat)" : "Minimum Milk Fat"}
                        </span>
                        <span className="text-lg font-bold text-blue-900">{product.fatSpec}</span>
                      </div>
                    )}
                    {product.snfSpec && (
                      <div className="bg-white p-3 rounded-xl border border-line">
                        <span className="text-xs text-ink-500 block">
                          {isHi ? "न्यूनतम एसएनएफ (SNF)" : "Minimum Solids Not Fat"}
                        </span>
                        <span className="text-lg font-bold text-blue-900">{product.snfSpec}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-cream-50 border border-line text-xs text-ink-500 flex items-start gap-2">
                  <Info className="w-4 h-4 text-ink-400 shrink-0 mt-0.5" />
                  <p>
                    {isHi
                      ? "विस्तृत पोषण सारणी प्रयोगशाला पुष्टि के पश्चात जोड़ी जाएगी। हम झूठे या अनुमानित पोषण आंकड़े प्रकाशित नहीं करते।"
                      : "Detailed nutrition values will be added after lab confirmation. We uphold transparency and do not publish fabricated nutrition tables."}
                  </p>
                </div>
              </div>
            )}

            {activeTab === "ingredients" && (
              <div className="max-w-2xl space-y-3">
                <p className="text-ink-700 text-sm leading-relaxed">
                  <strong>{isHi ? "सामग्री:" : "Ingredients:"}</strong>{" "}
                  {isHi ? product.ingredientsHi : product.ingredients}
                </p>
                <div className="p-4 rounded-xl bg-cream-50 border border-line text-xs text-ink-600">
                  {isHi
                    ? "दिव्यम डेयरी में सभी उत्पाद एफएसएसएआई (FSSAI) स्वच्छता मानकों के अनुरूप खाद्य-ग्रेड पैकेजिंग में पैक किए जाते हैं।"
                    : "All Divyam Dairy products are packaged in food-grade, hygienic packaging in accordance with FSSAI regulations."}
                </div>
              </div>
            )}

            {activeTab === "storage" && (
              <div className="max-w-2xl space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/50 border border-blue-100">
                  <Thermometer className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-950 text-sm mb-1">
                      {isHi ? "भंडारण निर्देश" : "Storage Guidelines"}
                    </h4>
                    <p className="text-xs text-ink-700 leading-relaxed">
                      {isHi ? product.storageInstructionsHi : product.storageInstructions}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-xl bg-cream-50 border border-line">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-950 text-sm mb-1">
                      {isHi ? "शेल्फ लाइफ" : "Shelf Life"}
                    </h4>
                    <p className="text-xs text-ink-700">
                      {isHi ? product.shelfLifeHi : product.shelfLife}.{" "}
                      {isHi
                        ? "कृपया पैकेट पर छपी तारीख के भीतर उपभोग करें।"
                        : "Please consume within the date printed on the pack."}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "delivery" && (
              <div className="max-w-3xl space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-cream-50 border border-line flex items-start gap-3">
                    <Truck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-950 text-xs mb-1">
                        {isHi ? "कवरेज क्षेत्र" : "Delivery Coverage"}
                      </h4>
                      <p className="text-xs text-ink-600">
                        {product.deliveryCoverage === "all-india"
                          ? isHi
                            ? "शुद्ध देशी घी पूरे भारत में कूरियर द्वारा भेजा जाता है।"
                            : "Pure Desi Ghee is delivered all over India via courier."
                          : isHi
                            ? "फरीदपुर, बरेली, बहेड़ी, शाहजहाँपुर, खुदागंज, पीलीभीत और बीसलपुर में दैनिक वितरण।"
                            : "Delivered in Faridpur, Bareilly, Baheri, Shahjahanpur, Khudaganj, Pilibhit, and Bisalpur."}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-cream-50 border border-line flex items-start gap-3">
                    <RotateCcw className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-950 text-xs mb-1">
                        {isHi ? "रद्दीकरण नीति" : "Cancellation Rule"}
                      </h4>
                      <p className="text-xs text-ink-600">
                        {isHi
                          ? "ऑर्डर केवल डिस्पैच से पूर्व ही रद्द किया जा सकता है। किसी भी सहायता हेतु 8679943224 पर कॉल करें।"
                          : "Orders can be cancelled only prior to dispatch. For any assistance, call 8679943224."}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 text-xs text-ink-600">
                  <strong className="text-blue-900 font-semibold block mb-1">
                    {isHi ? "गुणवत्ता सुरक्षा नियम:" : "Quality Protection Policy:"}
                  </strong>
                  {isHi
                    ? "खराब होने वाले उत्पादों (दूध, दही, पनीर) का वितरण ऐसे स्थानों पर नहीं किया जाता जहाँ पारगमन समय शेल्फ-लाइफ से अधिक हो।"
                    : "Perishable items are not dispatched to destinations where transit time would approach or exceed their shelf life."}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-blue-900">
                  {isHi ? "आपको यह भी पसंद आ सकता है" : "You May Also Like"}
                </h2>
                <p className="text-xs text-ink-500 mt-1 sm:hidden">
                  {isHi ? "अन्य उत्पाद देखने के लिए स्वाइप करें →" : "Swipe to explore more →"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {/* Mobile carousel arrows */}
                <div className="flex sm:hidden items-center gap-1.5 mr-1">
                  <button
                    type="button"
                    onClick={() => scrollRelated("left")}
                    aria-label="Previous products"
                    className="w-8 h-8 rounded-full border border-blue-200 bg-white shadow-xs flex items-center justify-center text-blue-900 active:scale-95 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollRelated("right")}
                    aria-label="Next products"
                    className="w-8 h-8 rounded-full border border-blue-200 bg-white shadow-xs flex items-center justify-center text-blue-900 active:scale-95 transition-all"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <Link
                  href="/products"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  {isHi ? "सभी उत्पाद" : "All Products"}
                  <ChevronRight className="w-4 h-4 hidden sm:inline-block" />
                </Link>
              </div>
            </div>

            <div
              ref={relatedSliderRef}
              className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto sm:overflow-visible snap-x snap-mandatory scroll-smooth no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 pb-4 sm:pb-0"
            >
              {relatedProducts.map((rel) => (
                <div
                  key={rel.id}
                  className="w-[78vw] sm:w-auto max-w-[290px] sm:max-w-none shrink-0 sm:shrink snap-start h-full"
                >
                  <ProductCard product={rel} className="h-full" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* MOBILE STICKY ACTION BAR */}
      {!product.isLaunchingSoon && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-line px-4 py-3 shadow-lg flex items-center justify-between gap-3 safe-area-bottom">
          <div>
            <span className="text-[11px] text-ink-500 uppercase block">
              {selectedVariant ? selectedVariant.size : "Pack"}
            </span>
            <span className="text-lg font-bold text-blue-900 font-sans">
              {currentPriceDisplay}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddToCart}
              className="py-2.5 px-4 text-xs font-semibold"
            >
              <ShoppingCart className="w-4 h-4 mr-1.5" />
              {isHi ? "कार्ट में जोड़ें" : "Add to Cart"}
            </Button>
            <Button
              variant="whatsapp"
              size="sm"
              href={waOrderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3.5 text-xs font-semibold"
              aria-label="Order on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
