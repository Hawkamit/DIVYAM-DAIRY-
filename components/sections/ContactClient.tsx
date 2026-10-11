"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ExternalLink,
  ChevronRight,
  Send,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { SITE_CONFIG } from "@/data/site";
import { PRODUCTS } from "@/data/products";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { MilkWaveDivider } from "@/components/ui/MilkWaveDivider";
import { submitEnquiry } from "@/lib/utils";

function ContactForm() {
  const { language } = useAppStore();
  const isHi = language === "hi";
  const searchParams = useSearchParams();
  const isOrderIntent = searchParams?.get("intent") === "order";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(
    isOrderIntent ? "General Order Inquiry" : ""
  );
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError(isHi ? "कृपया अपना नाम दर्ज करें।" : "Please enter your name.");
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setError(
        isHi
          ? "कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें।"
          : "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const subject = selectedProduct
        ? `Inquiry regarding ${selectedProduct}`
        : "General Inquiry";

      const result = await submitEnquiry({
        name,
        phone: cleanPhone,
        email: email.trim() || undefined,
        subject,
        message: message.trim() || "Interested in learning more about Divyam Dairy products."
      });

      setIsSubmitting(false);
      setSubmitted(true);

      // Launch WhatsApp with pre-composed message
      if (typeof window !== "undefined" && result.whatsappUrl) {
        window.open(result.whatsappUrl, "_blank", "noopener,noreferrer");
      }
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      setError(
        isHi
          ? "संदेश भेजने में त्रुटि हुई। कृपया सीधे कॉल या व्हाट्सएप करें।"
          : "An error occurred. Please contact us directly via phone or WhatsApp."
      );
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-line shadow-soft">
      {submitted ? (
        <div className="text-center py-12 space-y-4">
          <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-blue-900">
            {isHi ? "संदेश तैयार हो गया है!" : "Inquiry Prepared!"}
          </h3>
          <p className="text-sm text-ink-600 font-sans max-w-md mx-auto">
            {isHi
              ? "आपका संदेश व्हाट्सएप पर प्रेषित किया जा रहा है। यदि यह स्वचालित रूप से नहीं खुला, तो नीचे दिए गए बटन पर क्लिक करें।"
              : "Your inquiry has been compiled and opened in WhatsApp. If it did not launch automatically, click the button below."}
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <Button
              variant="whatsapp"
              size="md"
              href={`https://wa.me/${SITE_CONFIG.whatsappNumberDigits}?text=${encodeURIComponent(
                `Hello Divyam Dairy! My name is ${name}. I submitted an inquiry from your website.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="w-4 h-4 mr-2" />
              {isHi ? "व्हाट्सएप खोलें" : "Open WhatsApp"}
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                setSubmitted(false);
                setName("");
                setPhone("");
                setMessage("");
              }}
            >
              {isHi ? "नया संदेश भेजें" : "Send Another"}
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <h3 className="text-2xl font-serif font-bold text-blue-900 mb-1">
              {isOrderIntent
                ? isHi ? "ऑर्डर / पूछताछ फॉर्म" : "Order / Bulk Inquiry"
                : isHi ? "हमें संदेश भेजें" : "Send Us a Message"}
            </h3>
            <p className="text-xs text-ink-500 font-sans">
              {isHi
                ? "हम आपके संदेश का त्वरित उत्तर देंगे।"
                : "Fill out the form below; we will promptly respond on WhatsApp or phone."}
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-blue-950 mb-1.5">
              {isHi ? "आपका नाम *" : "Your Name *"}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={isHi ? "पूरा नाम दर्ज करें" : "Enter your full name"}
              className="w-full h-11 px-4 rounded-xl border border-line text-sm focus:outline-hidden focus:border-blue-600 bg-cream-50/40 text-ink-700"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-blue-950 mb-1.5">
                {isHi ? "मोबाइल नंबर *" : "Mobile Number *"}
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile number"
                className="w-full h-11 px-4 rounded-xl border border-line text-sm focus:outline-hidden focus:border-blue-600 bg-cream-50/40 text-ink-700"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-blue-950 mb-1.5">
                {isHi ? "ईमेल (वैकल्पिक)" : "Email (Optional)"}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full h-11 px-4 rounded-xl border border-line text-sm focus:outline-hidden focus:border-blue-600 bg-cream-50/40 text-ink-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-blue-950 mb-1.5">
              {isHi ? "संबंधित उत्पाद (वैकल्पिक)" : "Interested Product (Optional)"}
            </label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-line text-sm focus:outline-hidden focus:border-blue-600 bg-cream-50/40 text-ink-700"
            >
              <option value="">{isHi ? "-- उत्पाद चुनें --" : "-- Select a Product --"}</option>
              {PRODUCTS.map((prod) => (
                <option key={prod.id} value={prod.name}>
                  {isHi ? prod.nameHi : prod.name}
                </option>
              ))}
              <option value="Khoa / Khoya Availability">Khoa / Khoya</option>
              <option value="Bulk / Wholesale Distribution">Bulk / Wholesale Distribution</option>
              <option value="General Inquiry">General Inquiry</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-blue-950 mb-1.5">
              {isHi ? "आपका संदेश / आवश्यकता" : "Your Message / Requirement"}
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                isHi
                  ? "कृपया अपनी आवश्यकता, मात्रा अथवा कोई भी प्रश्न लिखें..."
                  : "Please let us know your requirements, delivery location, or question..."
              }
              className="w-full p-4 rounded-xl border border-line text-sm focus:outline-hidden focus:border-blue-600 bg-cream-50/40 text-ink-700 resize-none"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="w-full justify-center shadow-md shadow-blue-600/20"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting
              ? isHi ? "कृपया प्रतीक्षा करें..." : "Preparing..."
              : isHi ? "संदेश भेजें (WhatsApp द्वारा)" : "Send Message via WhatsApp"}
          </Button>
        </form>
      )}
    </div>
  );
}

export function ContactClient() {
  const { language } = useAppStore();
  const isHi = language === "hi";

  return (
    <div className="min-h-screen bg-cream-50 pt-28 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumbs" className="flex items-center space-x-2 text-sm text-ink-500 mb-8">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              {isHi ? "होम" : "Home"}
            </Link>
            <ChevronRight className="w-4 h-4 text-line" />
            <span className="text-blue-900 font-medium">
              {isHi ? "संपर्क करें" : "Contact"}
            </span>
          </nav>

          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-blue-900 tracking-tight">
              {isHi ? "दिव्यम डेयरी से संपर्क करें" : "Contact Divyam Dairy"}
            </h1>

            <p className="text-base sm:text-lg text-ink-600 font-sans max-w-2xl mx-auto">
              {isHi
                ? "ऑर्डर करने, थोक आपूर्ति पूछताछ, या किसी भी जानकारी के लिए हमसे सीधे संपर्क करें।"
                : "Get in touch with Shri R.S. Enterprises for retail orders, distribution inquiries, or support."}
            </p>
          </div>
        </div>
      </section>

      {/* MILK WAVE DIVIDER */}
      <div className="relative w-full overflow-hidden my-4">
        <MilkWaveDivider variant="top" fill="#FFFFFF" />
      </div>

      {/* 2. MAIN CONTACT SECTION */}
      <section className="bg-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* LEFT: Verified Business Facts Details */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-blue-900">
                  {SITE_CONFIG.brandName}
                </h2>
                <p className="text-sm text-ink-500 font-sans mt-0.5">
                  ({SITE_CONFIG.legalEntity})
                </p>
              </div>

              <div className="space-y-6 text-sm font-sans">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-950 text-xs uppercase tracking-wider mb-0.5">
                      {isHi ? "संयंत्र का पता" : "Dairy Plant Address"}
                    </h3>
                    <p className="text-ink-600 text-xs sm:text-sm leading-relaxed">
                      {SITE_CONFIG.address}
                    </p>
                    <a
                      href={SITE_CONFIG.googleMapsBusinessUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-semibold mt-1"
                    >
                      <span>{isHi ? "गूगल मैप पर देखें" : "View on Google Maps"}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* Phones */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-950 text-xs uppercase tracking-wider mb-0.5">
                      {isHi ? "फोन नंबर" : "Phone Numbers"}
                    </h3>
                    <div className="flex flex-col gap-1 text-ink-700">
                      <a href={`tel:${SITE_CONFIG.phonePrimary}`} className="hover:text-blue-600 font-medium">
                        {SITE_CONFIG.phonePrimary} (Orders & Support)
                      </a>
                      <a href={`tel:${SITE_CONFIG.phoneSecondary}`} className="hover:text-blue-600 font-medium">
                        {SITE_CONFIG.phoneSecondary} (Enquiries)
                      </a>
                    </div>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0 border border-green-200">
                    <WhatsAppIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-950 text-xs uppercase tracking-wider mb-0.5">
                      {isHi ? "व्हाट्सएप संपर्क" : "WhatsApp Ordering"}
                    </h3>
                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsappNumberDigits}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-700 hover:text-green-800 font-medium block"
                    >
                      {SITE_CONFIG.whatsappPrimary}
                    </a>
                    <span className="text-[11px] text-ink-500">
                      {isHi ? "दैनिक ऑर्डर और त्वरित पुष्टि" : "Quick orders & dispatch updates"}
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-950 text-xs uppercase tracking-wider mb-0.5">
                      {isHi ? "ईमेल" : "Official Email"}
                    </h3>
                    <a
                      href={`mailto:${SITE_CONFIG.email}`}
                      className="text-ink-700 hover:text-blue-600 font-medium break-all"
                    >
                      {SITE_CONFIG.email}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-950 text-xs uppercase tracking-wider mb-0.5">
                      {isHi ? "कार्य समय" : "Operating Hours"}
                    </h3>
                    <p className="text-ink-700 font-medium">{SITE_CONFIG.timings}</p>
                    <span className="text-[11px] text-ink-500">
                      {isHi ? "सप्ताह के सातों दिन" : "All 7 Days Open"}
                    </span>
                  </div>
                </div>

                {/* Social Channels (Strictly Instagram + Facebook; NO YouTube per prompt) */}
                <div className="pt-4 border-t border-line">
                  <h3 className="font-semibold text-blue-950 text-xs uppercase tracking-wider mb-3">
                    {isHi ? "सोशल मीडिया पर जुड़ें" : "Follow Our Journey"}
                  </h3>
                  <div className="flex items-center gap-3">
                    <a
                      href={SITE_CONFIG.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-cream-50 hover:bg-blue-50 text-ink-700 hover:text-blue-600 border border-line flex items-center justify-center transition-colors"
                      aria-label="Follow Divyam Dairy on Instagram"
                    >
                      <InstagramIcon className="w-5 h-5" />
                    </a>
                    <a
                      href={SITE_CONFIG.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-cream-50 hover:bg-blue-50 text-ink-700 hover:text-blue-600 border border-line flex items-center justify-center transition-colors"
                      aria-label="Follow Divyam Dairy on Facebook"
                    >
                      <FacebookIcon className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Inquiry & Order Form */}
            <div className="lg:col-span-7">
              <Suspense fallback={<div className="p-8 text-center text-ink-400">Loading form...</div>}>
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
