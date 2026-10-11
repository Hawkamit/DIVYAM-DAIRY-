"use client";

import React from "react";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { PRODUCTS } from "@/data/products";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";

export function WishlistView() {
  const { language, wishlist, toggleWishlist, addToCart } = useAppStore();
  const isHi = language === "hi";

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.slug));

  if (wishlistedProducts.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50 pt-32 pb-24 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto shadow-xs border border-red-100">
            <Heart className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-blue-900">
            {isHi ? "आपकी विशलिस्ट खाली है" : "Your Wishlist is Empty"}
          </h1>
          <p className="text-sm text-ink-600 font-sans">
            {isHi
              ? "आप जो उत्पाद बाद में देखना चाहते हैं, उन्हें दिल (❤️) आइकन पर क्लिक करके सहेज सकते हैं।"
              : "Save items you love by tapping the heart icon on any product card."}
          </p>
          <Button variant="primary" size="lg" href="/products" className="w-full justify-center">
            {isHi ? "उत्पाद देखें" : "Explore Products"}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 pt-28 pb-24">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav aria-label="Breadcrumbs" className="flex items-center space-x-2 text-sm text-ink-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            {isHi ? "होम" : "Home"}
          </Link>
          <ChevronRight className="w-4 h-4 text-line" />
          <span className="text-blue-900 font-medium">
            {isHi ? "पसंदीदा उत्पाद (विशलिस्ट)" : "Wishlist"}
          </span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-blue-900">
            {isHi ? "सहेजे गए पसंदीदा उत्पाद" : "My Wishlist"}
          </h1>
          <p className="text-sm text-ink-500 font-sans mt-1">
            {wishlistedProducts.length} {isHi ? "उत्पाद सहेजे गए" : "items saved"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistedProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-3xl p-5 border border-line shadow-xs hover:shadow-soft transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-blue-50/40 p-4 border border-blue-100/60 mb-4">
                  <SmartImage
                    src={prod.images.front}
                    alt={prod.name}
                    fill
                    className="object-contain p-2"
                  />
                  <button
                    type="button"
                    onClick={() => toggleWishlist(prod.slug)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white text-red-500 hover:text-red-700 shadow-xs flex items-center justify-center border border-line transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block mb-1">
                  {isHi ? prod.categoryLabelHi : prod.categoryLabel}
                </span>

                <h3 className="font-serif font-bold text-lg text-blue-900 line-clamp-1 mb-1">
                  <Link href={`/products/${prod.slug}`} className="hover:text-blue-600 transition-colors">
                    {isHi ? prod.nameHi : prod.name}
                  </Link>
                </h3>

                <p className="text-xs text-ink-500 font-sans line-clamp-2 mb-3">
                  {isHi ? prod.taglineHi : prod.tagline}
                </p>

                <div className="font-sans font-bold text-base text-blue-900 mb-4">
                  {isHi ? prod.priceRangeDisplayHi : prod.priceRangeDisplay}
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                {!prod.isLaunchingSoon ? (
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1 justify-center text-xs"
                    onClick={() => {
                      addToCart({
                        productId: prod.id,
                        slug: prod.slug,
                        name: prod.name,
                        nameHi: prod.nameHi,
                        variantId: prod.variants[0]?.id || "default",
                        size: prod.variants[0]?.size || "Standard",
                        sizeHi: prod.variants[0]?.sizeHi || "मानक",
                        price: prod.basePrice,
                        quantity: 1,
                        image: prod.images.front,
                        isGhee: prod.category === "ghee"
                      });
                    }}
                  >
                    <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                    {isHi ? "कार्ट में डालें" : "Move to Cart"}
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    href={`/products/${prod.slug}`}
                    className="flex-1 justify-center text-xs"
                  >
                    {isHi ? "विवरण देखें" : "View Details"}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
