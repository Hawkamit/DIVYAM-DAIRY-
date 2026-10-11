"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { TRANSLATIONS } from "@/data/translations";
import { SITE_CONFIG, buildWhatsAppLink } from "@/data/site";
import { checkDeliveryAvailability } from "@/data/delivery";
import { Button } from "@/components/ui/Button";
import {
  MapPin,
  CheckCircle2,
  Search,
  MessageCircle,
  AlertCircle
} from "lucide-react";

export function DeliveryAreaStrip() {
  const { language } = useAppStore();
  const t = TRANSLATIONS[language];

  const [inputTown, setInputTown] = useState("");
  const [result, setResult] = useState<ReturnType<typeof checkDeliveryAvailability> | null>(null);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputTown.trim()) {
      setResult(checkDeliveryAvailability(inputTown));
    }
  };

  return (
    <section className="py-16 md:py-20 bg-[#F3F7FF]/50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-milk">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 7 cols: Towns & Info */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0B2A6F] font-serif">
                {t.secDeliveryCoverage}
              </h2>

              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xl">
                {language === "hi"
                  ? "हम फरीदपुर स्थित हमारे प्लांट से 24 घंटे के भीतर दैनिक इंसुलेटेड वाहनों द्वारा बरेली और निकटवर्ती शहरों में ताजा डेयरी उत्पाद पहुंचाते हैं।"
                  : "We deliver fresh dairy products from our Faridpur facility within 24 hours to Bareilly and surrounding Rohilkhand regions in temperature-controlled vans."}
              </p>

              {/* Towns Pills List */}
              <div className="flex flex-wrap gap-2 pt-1">
                {SITE_CONFIG.localDeliveryAreas.map((town) => (
                  <span
                    key={town}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3F7FF] text-[#0B2A6F] text-xs font-bold border border-[#E3EDFF]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#25A244]" />
                    {town}
                  </span>
                ))}
              </div>

              {/* Ghee All-India Notice */}
              <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200/60 text-xs text-amber-900 flex items-center gap-2 max-w-lg">
                <MapPin className="w-4 h-4 text-[#F5B921] shrink-0" />
                <p>
                  <strong>{language === "hi" ? "शुद्ध देसी घी:" : "Pure Desi Ghee:"}</strong>{" "}
                  {language === "hi"
                    ? "पूरे भारत में सुरक्षित डिलीवरी — कोई न्यूनतम ऑर्डर सीमा नहीं।"
                    : "Delivered all across India with zero minimum order value."}
                </p>
              </div>
            </div>

            {/* Right 5 cols: Instant Town Checker */}
            <div className="lg:col-span-5 bg-[#FFFDF8] rounded-2xl p-5 border border-slate-200/80 space-y-4">
              <h3 className="text-sm font-bold text-[#0B2A6F] flex items-center gap-2">
                <Search className="w-4 h-4 text-[#1D5BD6]" />
                <span>
                  {language === "hi" ? "डिलीवरी की उपलब्धता जांचें" : "Check Delivery in Your Area"}
                </span>
              </h3>

              <form onSubmit={handleCheck} className="flex gap-2">
                <input
                  type="text"
                  value={inputTown}
                  onChange={(e) => setInputTown(e.target.value)}
                  placeholder={language === "hi" ? "शहर या कस्बा दर्ज करें (जैसे बरेली)" : "Enter town (e.g. Bareilly)"}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 outline-none focus:border-[#1D5BD6]"
                />
                <Button size="sm" type="submit" className="rounded-xl px-4 text-xs font-bold">
                  {language === "hi" ? "जांचें" : "Check"}
                </Button>
              </form>

              {/* Results Message */}
              {result && (
                <div
                  className={`p-3 rounded-xl text-xs leading-relaxed flex items-start gap-2 ${
                    result.isServiceable
                      ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                      : "bg-blue-50 text-blue-900 border border-blue-200"
                  }`}
                >
                  {result.isServiceable ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  )}
                  <p>{language === "hi" ? result.messageHi : result.message}</p>
                </div>
              )}

              <div className="flex items-center justify-between pt-1">
                <Link
                  href="/delivery"
                  className="text-xs font-bold text-[#1D5BD6] hover:underline"
                >
                  {language === "hi" ? "विस्तृत डिलीवरी जानकारी →" : "View Full Delivery Guide →"}
                </Link>

                <a
                  href={buildWhatsAppLink(
                    language === "hi"
                      ? "नमस्ते! क्या आप हमारे इलाके में डिलीवरी कर सकते हैं?"
                      : "Hello! Could you deliver to our area?"
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#25A244] hover:underline flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
