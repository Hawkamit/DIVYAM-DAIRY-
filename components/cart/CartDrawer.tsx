"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { TRANSLATIONS } from "@/data/translations";
import { SITE_CONFIG } from "@/data/site";
import { formatINR, composeCartWhatsAppMessage } from "@/lib/utils";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  AlertCircle,
  MessageCircle,
  ArrowRight,
  ShieldAlert
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function CartDrawer() {
  const router = useRouter();
  const { isCartOpen, closeCart, cart, updateQuantity, removeFromCart, clearCart, language } =
    useAppStore();
  const t = TRANSLATIONS[language];

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const hasNonGheeItems = cart.some((item) => !item.isGhee);
  const isBelowPerishableMinimum = hasNonGheeItems && subtotal < SITE_CONFIG.minOrderOther;

  const handleCheckoutClick = () => {
    closeCart();
    router.push("/checkout");
  };

  const handleQuickWhatsAppInquiry = () => {
    const defaultCustomer = {
      name: "Valued Customer",
      phone: "Via WhatsApp",
      town: "Local / All-India",
      address: "Direct WhatsApp Order Request",
      notes: isBelowPerishableMinimum ? "Inquiry for small batch or route delivery" : "Ready for route dispatch"
    };
    const reqId = `DIV-${Math.floor(100000 + Math.random() * 900000)}`;
    const msg = composeCartWhatsAppMessage(cart, defaultCustomer, reqId);
    window.open(
      `https://wa.me/${SITE_CONFIG.whatsappNumberDigits}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Drawer content */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col z-10"
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-[#FFFDF8]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#1D5BD6]" />
                <h3 className="font-bold text-base text-[#0B2A6F]">{t.cartTitle}</h3>
                <span className="text-xs bg-[#F3F7FF] text-[#1D5BD6] font-semibold px-2 py-0.5 rounded-full">
                  {cart.length}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-blue-50 text-[#1D5BD6] flex items-center justify-center">
                    <ShoppingBag className="w-8 h-8 opacity-60" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-slate-700">{t.cartEmpty}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {language === "hi"
                        ? "हमारे ताजे दूध, शुद्ध घी, पनीर और दही का अन्वेषण करें।"
                        : "Add wholesome fresh milk, desi ghee, paneer, and dahi."}
                    </p>
                  </div>
                  <Link
                    href="/products"
                    onClick={closeCart}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1D5BD6] hover:bg-[#154bb3] text-white text-xs font-bold rounded-full shadow-md transition-all"
                  >
                    <span>{t.navProducts}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-3 bg-slate-50/80 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors"
                  >
                    <SmartImage
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200 bg-white"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-[#0B2A6F] truncate">
                        {language === "hi" ? item.nameHi : item.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {item.size} • {formatINR(item.price)}
                      </p>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-slate-800 min-w-[18px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal & Delete */}
                    <div className="flex flex-col items-end justify-between self-stretch shrink-0">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-bold text-[#0B2A6F]">
                        {formatINR(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Footer & Checkout Logic */}
            {cart.length > 0 && (
              <div className="p-4 border-t border-slate-100 bg-[#FFFDF8] space-y-3">
                {/* Minimum Order Policy Notice */}
                {isBelowPerishableMinimum ? (
                  <div className="p-3 bg-amber-50/90 rounded-2xl border border-amber-200/80 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-[11px] text-amber-900 leading-snug">
                      <p className="font-bold">
                        {language === "hi" ? "न्यूनतम ऑर्डर सूचना" : "Minimum Order Notice"}
                      </p>
                      <p className="text-amber-800/90 mt-0.5">
                        {language === "hi"
                          ? "दूध, पनीर, दही व छाछ के वितरण हेतु ₹15,000 का न्यूनतम ऑर्डर मान लागू है। घी के लिए कोई न्यूनतम सीमा नहीं है। आप पूछताछ के लिए सीधे व्हाट्सएप पर संपर्क कर सकते हैं।"
                          : "Orders of perishable dairy have a ₹15,000 commercial delivery minimum. Ghee has no minimum."}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-[11px] text-[#25A244] font-medium bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                    <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                    <span>
                      {hasNonGheeItems
                        ? language === "hi"
                          ? "वितरण न्यूनतम सीमा पूर्ण है।"
                          : "Minimum order threshold met for route delivery."
                        : language === "hi"
                        ? "शुद्ध देसी घी — बिना किसी न्यूनतम सीमा के उपलब्ध!"
                        : "Pure Desi Ghee — ships with zero minimum order limit!"}
                    </span>
                  </div>
                )}

                {/* Subtotal breakdown */}
                <div className="space-y-1 py-1">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{t.cartSubtotal}</span>
                    <span className="font-bold text-slate-700">{formatINR(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-base font-extrabold text-[#0B2A6F]">
                    <span>{t.cartEstimatedTotal}</span>
                    <span className="text-[#1D5BD6]">{formatINR(subtotal)}</span>
                  </div>
                  <p className="text-[10px] text-slate-400">
                    {language === "hi"
                      ? "*अंतिम मूल्य और डिलीवरी शुल्क की पुष्टि व्हाट्सएप/फोन पर होगी।"
                      : "*Estimated total. Final prices and delivery confirmed on WhatsApp/phone."}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2 pt-1">
                  <Button
                    onClick={handleCheckoutClick}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <span>{t.cartCheckoutBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>

                  <Button
                    variant="whatsapp"
                    onClick={handleQuickWhatsAppInquiry}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>{t.cartWhatsAppInquiry}</span>
                  </Button>

                  <button
                    onClick={clearCart}
                    className="w-full text-center text-[11px] text-slate-400 hover:text-red-500 py-1 transition-colors"
                  >
                    {language === "hi" ? "कार्ट खाली करें" : "Clear Cart"}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
