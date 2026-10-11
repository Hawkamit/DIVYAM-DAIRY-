"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { TRANSLATIONS } from "@/data/translations";
import { SITE_CONFIG, buildWhatsAppLink } from "@/data/site";
import { formatINR, composeProductWhatsAppMessage } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import {
  X,
  Plus,
  Minus,
  MessageCircle,
  ShoppingBag,
  Clock,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function QuickViewModal() {
  const { quickViewProduct, closeQuickView, addToCart, language } = useAppStore();
  const t = TRANSLATIONS[language];

  const product = quickViewProduct;
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const currentVariant = product.variants[selectedVariantIndex] || {
    id: "std",
    size: "Standard Pack",
    sizeHi: "मानक पैक",
    priceMin: product.basePrice,
    priceDisplay: product.priceRangeDisplay,
    priceDisplayHi: product.priceRangeDisplayHi
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      nameHi: product.nameHi,
      variantId: currentVariant.id,
      size: language === "hi" ? currentVariant.sizeHi : currentVariant.size,
      sizeHi: currentVariant.sizeHi,
      price: currentVariant.priceMin || product.basePrice,
      quantity,
      image: product.images.front,
      isGhee: product.category === "ghee"
    });
    closeQuickView();
  };

  const handleWhatsAppOrder = () => {
    const msg = composeProductWhatsAppMessage(
      language === "hi" ? product.nameHi : product.name,
      language === "hi" ? currentVariant.sizeHi : currentVariant.size,
      quantity
    );
    window.open(buildWhatsAppLink(msg), "_blank");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <div className="absolute inset-0" onClick={closeQuickView} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 z-10 flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white text-slate-500 hover:text-slate-800 rounded-full shadow-sm transition-colors"
            aria-label="Close preview"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Product Image */}
          <div className="md:w-1/2 bg-blue-50/50 p-6 flex items-center justify-center relative">
            <SmartImage
              src={product.images.front}
              alt={product.name}
              width={400}
              height={400}
              className="w-full max-w-[260px] aspect-square object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Right: Details & CTAs */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <span className="text-[11px] font-bold text-[#1D5BD6] uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-full">
                {language === "hi" ? product.categoryLabelHi : product.categoryLabel}
              </span>

              <h3 className="text-xl font-bold text-[#0B2A6F] mt-2">
                {language === "hi" ? product.nameHi : product.name}
              </h3>

              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                {language === "hi" ? product.shortDescriptionHi : product.shortDescription}
              </p>

              {/* Price display */}
              <div className="mt-3.5 flex items-baseline gap-2">
                <span className="text-xl font-extrabold text-[#0B2A6F]">
                  {language === "hi"
                    ? currentVariant.priceDisplayHi || product.priceRangeDisplayHi
                    : currentVariant.priceDisplay || product.priceRangeDisplay}
                </span>
                <span className="text-[11px] text-slate-400">
                  {language === "hi" ? "(अनुमानित मूल्य)" : "(Estimated price)"}
                </span>
              </div>

              {/* Variant Selector */}
              {product.variants.length > 0 && (
                <div className="mt-4">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {language === "hi" ? "पैक साइज चुनें:" : "Select Pack Size:"}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v, idx) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariantIndex(idx)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                          selectedVariantIndex === idx
                            ? "bg-[#1D5BD6] text-white shadow-sm"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                        }`}
                      >
                        {language === "hi" ? v.sizeHi : v.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper */}
              {product.isAvailable && (
                <div className="mt-4 flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-700">
                    {language === "hi" ? "मात्रा:" : "Quantity:"}
                  </span>
                  <div className="flex items-center gap-2 border border-slate-200 rounded-full px-2 py-1 bg-slate-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors shadow-xs"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-slate-800 min-w-[20px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(50, quantity + 1))}
                      className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors shadow-xs"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* Shelf life badge */}
              <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5 text-[#F5B921]" />
                <span>
                  {t.shelfLifeLabel}: {language === "hi" ? product.shelfLifeHi : product.shelfLife}
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 space-y-2 pt-4 border-t border-slate-100">
              {product.isAvailable && !product.needsConfirmation ? (
                <Button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2 text-xs py-3"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{t.btnAddToCart}</span>
                </Button>
              ) : (
                <Button
                  variant="whatsapp"
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2 text-xs py-3"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>
                    {product.isLaunchingSoon ? t.badgeLaunchingSoon : t.badgeEnquire}
                  </span>
                </Button>
              )}

              <Button
                variant="whatsapp"
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center gap-2 text-xs py-3"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{t.btnOrderWhatsApp}</span>
              </Button>

              <Link
                href={`/products/${product.slug}`}
                onClick={closeQuickView}
                className="block text-center text-xs font-bold text-[#1D5BD6] hover:underline pt-1"
              >
                {language === "hi" ? "पूरा विवरण देखें →" : "View Full Details →"}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
