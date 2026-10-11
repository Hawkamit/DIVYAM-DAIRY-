"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Phone,
  MessageCircle,
  Truck,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileText
} from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";

function OrderConfirmationContent() {
  const { language } = useAppStore();
  const isHi = language === "hi";
  const searchParams = useSearchParams();
  const requestId = searchParams?.get("id") || `DIV-${Date.now().toString().slice(-6)}`;

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 border border-line shadow-soft max-w-2xl mx-auto text-center space-y-8">
      {/* Success Badge */}
      <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-xs animate-bounce">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-blue-900 tracking-tight">
          {isHi ? "धन्यवाद! आपका अनुरोध प्राप्त हुआ" : "Thank You! Request Received"}
        </h1>

        <p className="text-sm sm:text-base text-ink-600 font-sans max-w-md mx-auto leading-relaxed">
          {isHi
            ? "हमारे संयंत्र और वितरण केंद्र को आपका ऑर्डर अनुरोध प्राप्त हो चुका है। हमारी टीम शीघ्र ही आपसे संपर्क करेगी।"
            : "Your dairy order request has been logged. Our dispatch team is reviewing delivery routes and will connect promptly."}
        </p>
      </div>

      {/* Request ID Display Card */}
      <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
        <span className="text-xs uppercase tracking-wider text-ink-500 font-bold block">
          {isHi ? "आपका अनुरोध संदर्भ संख्या:" : "Your Request Reference ID:"}
        </span>
        <div className="text-2xl sm:text-3xl font-mono font-bold text-blue-900 tracking-wider">
          {requestId}
        </div>
        <p className="text-xs text-ink-500 font-sans">
          {isHi
            ? "कृपया इस संदर्भ संख्या को अपनी बातचीत में उपयोग करें।"
            : "Please quote this ID in your WhatsApp or phone interactions with us."}
        </p>
      </div>

      {/* Dispatch Steps Guidance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left font-sans text-xs sm:text-sm">
        <div className="p-4 rounded-xl bg-cream-50 border border-line flex items-start gap-3">
          <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-blue-950 block mb-0.5">
              {isHi ? "1 दिन में डिस्पैच" : "Dispatch Timeline"}
            </strong>
            <span className="text-ink-600 text-xs">
              {isHi
                ? "दैनिक रूट के अनुसार 1 दिन के भीतर सुरक्षित रवानगी।"
                : "Dispatched within 1 day based on delivery area route."}
            </span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-cream-50 border border-line flex items-start gap-3">
          <Truck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <strong className="text-blue-950 block mb-0.5">
              {isHi ? "कोल्ड चेन ताजगी" : "Cold-Chain Handling"}
            </strong>
            <span className="text-ink-600 text-xs">
              {isHi
                ? "इंसुलेटेड वाहनों द्वारा सुरक्षित और ताजा डिलीवरी।"
                : "Insulated transport ensuring natural milk freshness."}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
        <Button
          variant="whatsapp"
          size="lg"
          href={`https://wa.me/${SITE_CONFIG.whatsappNumberDigits}?text=${encodeURIComponent(
            `Hello Divyam Dairy! I have submitted Order Request ID: ${requestId}. Please confirm dispatch details.`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shadow-md shadow-green-600/20"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          {isHi ? "WhatsApp पर पुष्टि करें" : "Confirm on WhatsApp"}
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

      <div className="pt-4 border-t border-line">
        <Link
          href="/products"
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
        >
          <span>{isHi ? "अन्य उत्पाद देखें" : "Continue Browsing Products"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

export function OrderConfirmationView() {
  return (
    <div className="min-h-screen bg-cream-50 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="text-center py-20 text-ink-500">Loading confirmation...</div>}>
        <OrderConfirmationContent />
      </Suspense>
    </div>
  );
}
