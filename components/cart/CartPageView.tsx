"use client";

import React from "react";
import Link from "next/link";
import {
  ShoppingCart,
  Trash2,
  ChevronRight,
  ArrowRight,
  Info,
  ShieldCheck,
  MessageCircle,
  Truck,
  Sparkles
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { SITE_CONFIG } from "@/data/site";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { formatINR } from "@/lib/utils";

export function CartPageView() {
  const { language, cart, updateQuantity, removeFromCart, clearCart } = useAppStore();
  const isHi = language === "hi";

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hasPerishableItems = cart.some((item) => !item.isGhee);
  const isPerishableUnderMin = hasPerishableItems && subtotal < SITE_CONFIG.minOrderOther;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50 pt-32 pb-24 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
            <ShoppingCart className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-serif font-bold text-blue-900">
            {isHi ? "आपकी कार्ट खाली है" : "Your Cart is Empty"}
          </h1>
          <p className="text-sm text-ink-600 font-sans">
            {isHi
              ? "आपकी कार्ट में अभी कोई उत्पाद नहीं है। हमारे शुद्ध व ताजे डेयरी उत्पादों की सूची देखें।"
              : "Looks like you haven't added any dairy products yet. Explore our fresh milk, ghee, paneer, and dahi."}
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
            {isHi ? "शॉपिंग कार्ट" : "Shopping Cart"}
          </span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-blue-900">
              {isHi ? "आपकी कार्ट" : "Shopping Cart"}
            </h1>
            <p className="text-xs sm:text-sm text-ink-500 font-sans mt-1">
              {cart.length} {cart.length === 1 ? (isHi ? "उत्पाद" : "item") : (isHi ? "उत्पाद" : "items")} {isHi ? "चुने गए" : "selected"}
            </p>
          </div>

          <button
            type="button"
            onClick={clearCart}
            className="text-xs text-red-600 hover:text-red-700 font-semibold underline"
          >
            {isHi ? "कार्ट खाली करें" : "Clear All"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT: Cart Line Items */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 sm:p-6 border border-line shadow-xs flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
              >
                <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-blue-50/40 shrink-0 border border-blue-100 p-2">
                  <SmartImage
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0 text-center sm:text-left space-y-1">
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block">
                    {item.isGhee
                      ? isHi ? "अखिल भारतीय डिलीवरी" : "All-India Delivery"
                      : isHi ? "दैनिक कोल्ड-चेन" : "Local Fresh Route"}
                  </span>
                  <h3 className="font-serif font-bold text-lg text-blue-900 truncate">
                    {isHi ? item.nameHi : item.name}
                  </h3>
                  <p className="text-xs text-ink-500 font-sans">
                    {isHi ? "पैक आकार:" : "Pack Size:"} {isHi ? item.sizeHi : item.size} • {formatINR(item.price)} each
                  </p>
                </div>

                {/* Quantity Stepper */}
                <div className="flex items-center border border-line bg-cream-50/50 rounded-full p-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-ink-700 hover:bg-white disabled:opacity-30 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-blue-900">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= 50}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-ink-700 hover:bg-white disabled:opacity-30 transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal & Delete */}
                <div className="text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                  <span className="text-base font-bold text-blue-900 font-sans">
                    {formatINR(item.price * item.quantity)}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-ink-400 hover:text-red-600 transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-line shadow-soft sticky top-32 space-y-6">
              <h2 className="text-xl font-serif font-bold text-blue-900">
                {isHi ? "ऑर्डर सारांश" : "Order Summary"}
              </h2>

              <div className="space-y-3 text-sm font-sans pt-2 border-t border-line">
                <div className="flex justify-between text-ink-600">
                  <span>{isHi ? "अनुमानित उप-योग" : "Estimated Subtotal"}</span>
                  <span className="font-semibold text-blue-900">{formatINR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-ink-600">
                  <span>{isHi ? "डिलीवरी शुल्क" : "Delivery Charges"}</span>
                  <span className="text-xs text-ink-500">
                    {isHi ? "पुष्टि पर तय" : "Confirmed at dispatch"}
                  </span>
                </div>
              </div>

              {/* Minimum Order Note per §3 & §10 */}
              {isPerishableUnderMin && (
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-2">
                  <div className="flex items-start gap-2 font-semibold">
                    <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{isHi ? "न्यूनतम ऑर्डर नीति सूचना:" : "Commercial Policy Notice:"}</span>
                  </div>
                  <p className="leading-relaxed">
                    {isHi
                      ? "नाशवान डेयरी उत्पादों (दूध, दही, पनीर, छाछ) के लिए न्यूनतम ऑर्डर ₹15,000 है। शुद्ध देशी घी के ऑर्डर पर कोई न्यूनतम सीमा नहीं है।"
                      : "Orders containing perishable products (milk, paneer, dahi, chaach) require a ₹15,000 minimum order as per policy. Ghee has no minimum."}
                  </p>
                  <p className="font-medium text-blue-900">
                    {isHi
                      ? "आप नीचे दिए गए बटन से अपनी आवश्यकता की पूछताछ व्हाट्सएप पर भेज सकते हैं।"
                      : "You can proceed to send your order inquiry via WhatsApp directly."}
                  </p>
                </div>
              )}

              {/* Total Block */}
              <div className="pt-4 border-t border-line space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-base font-bold text-blue-950">
                    {isHi ? "अनुमानित कुल योग:" : "Estimated Total:"}
                  </span>
                  <span className="text-2xl font-bold text-blue-900 font-sans">
                    {formatINR(subtotal)}
                  </span>
                </div>
                <p className="text-[11px] text-ink-500 italic">
                  {isHi
                    ? "* मूल्य सीमा और मार्ग पुष्टि के अनुसार अंतिम राशि तय होगी"
                    : "* Estimated — final price confirmed on WhatsApp/phone"}
                </p>
              </div>

              {/* Checkout & WhatsApp Buttons */}
              <div className="space-y-3 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  href="/checkout"
                  className="w-full justify-center shadow-md shadow-blue-600/20"
                >
                  {isHi ? "ऑर्डर अनुरोध जारी रखें" : "Proceed to Order Request"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <Button
                  variant="whatsapp"
                  size="md"
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumberDigits}?text=${encodeURIComponent(
                    `Hello Divyam Dairy! I have a cart inquiry of ₹${subtotal} with ${cart.length} items. Please guide me.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full justify-center text-xs"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {isHi ? "व्हाट्सएप पर ऑर्डर पूछताछ" : "Place Inquiry on WhatsApp"}
                </Button>
              </div>

              {/* Security trust badges */}
              <div className="pt-4 border-t border-line/60 flex items-center justify-center gap-4 text-[11px] text-ink-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  {isHi ? "दैनिक लैब जांच" : "Daily Tested"}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-blue-600" />
                  {isHi ? "कोल्ड चेन ताजगी" : "Cold Chain"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
