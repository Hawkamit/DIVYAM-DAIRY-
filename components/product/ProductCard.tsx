"use client";

import Link from "next/link";
import { Product } from "@/data/products";
import { useAppStore } from "@/lib/store";
import { TRANSLATIONS } from "@/data/translations";
import { SITE_CONFIG, buildWhatsAppLink } from "@/data/site";
import { composeProductWhatsAppMessage } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { Heart, ShoppingBag, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const {
    language,
    addToCart,
    wishlist,
    toggleWishlist
  } = useAppStore();

  const t = TRANSLATIONS[language];
  const isWishlisted = wishlist.includes(product.slug);

  const defaultVariant = product.variants[0];

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (product.isLaunchingSoon || product.needsConfirmation || !product.isAvailable) {
      const msg = composeProductWhatsAppMessage(
        language === "hi" ? product.nameHi : product.name,
        defaultVariant ? defaultVariant.size : "Batch Inquiry"
      );
      window.open(buildWhatsAppLink(msg), "_blank");
      return;
    }

    addToCart({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      nameHi: product.nameHi,
      variantId: defaultVariant ? defaultVariant.id : "std",
      size: defaultVariant
        ? language === "hi"
          ? defaultVariant.sizeHi
          : defaultVariant.size
        : "Standard Pack",
      sizeHi: defaultVariant ? defaultVariant.sizeHi : "मानक पैक",
      price: defaultVariant ? defaultVariant.priceMin : product.basePrice,
      quantity: 1,
      image: product.images.front,
      isGhee: product.category === "ghee"
    });
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.slug);
  };

  return (
    <div
      className={cn(
        "group relative bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-milk hover:shadow-milk-lg transition-all duration-300 flex flex-col justify-between hover:-translate-y-1",
        className
      )}
    >
      {/* Top: Wishlist Heart & Badges */}
      <div>
        <div className="relative w-full aspect-square rounded-2xl bg-[#F3F7FF] p-4 flex items-center justify-center overflow-hidden">
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className={cn(
              "absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-xs",
              isWishlisted
                ? "bg-red-50 text-red-500 scale-105"
                : "bg-white/90 text-slate-400 hover:text-red-500 hover:bg-white"
            )}
          >
            <Heart className={cn("w-4 h-4", isWishlisted && "fill-red-500 text-red-500")} />
          </button>

          {/* Product Image */}
          <Link href={`/products/${product.slug}`} className="w-full h-full flex items-center justify-center">
            <SmartImage
              src={product.images.front}
              alt={product.name}
              width={320}
              height={320}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
        </div>

        {/* Content Section - Only Product Name */}
        <div className="pt-3">
          <h3 className="text-base sm:text-lg font-bold text-[#0B2A6F] group-hover:text-[#1D5BD6] transition-colors leading-snug">
            <Link href={`/products/${product.slug}`}>
              {language === "hi" ? product.nameHi : product.name}
            </Link>
          </h3>
        </div>
      </div>

      {/* Bottom Pricing & Add to Cart */}
      <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <span className="text-sm sm:text-base font-extrabold text-[#0B2A6F] truncate block">
            {language === "hi" ? product.priceRangeDisplayHi : product.priceRangeDisplay}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Add to Cart or WhatsApp */}
          {product.isAvailable && !product.needsConfirmation ? (
            <Button
              onClick={handleQuickAdd}
              size="sm"
              className="flex items-center gap-1.5 text-xs px-3.5 sm:px-4 rounded-2xl h-9"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{t.btnAddToCart}</span>
            </Button>
          ) : (
            <Button
              variant="whatsapp"
              onClick={handleQuickAdd}
              size="sm"
              className="flex items-center gap-1.5 text-xs px-3 rounded-2xl h-9 font-bold"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span className="hidden sm:inline">
                {product.isLaunchingSoon ? t.badgeLaunchingSoon : t.badgeEnquire}
              </span>
              <span className="sm:hidden">
                {product.isLaunchingSoon ? "Soon" : "Ask"}
              </span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
