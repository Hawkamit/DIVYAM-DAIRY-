"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  ShieldCheck,
  Truck,
  CreditCard,
  Building,
  QrCode,
  Wallet,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Sparkles
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { SITE_CONFIG } from "@/data/site";
import { DELIVERY_TOWNS } from "@/data/delivery";
import { formatINR, submitOrder } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

// Seam for future payment gateway integrations
export interface PaymentProvider {
  id: string;
  name: string;
  type: "upi" | "online" | "bank_transfer" | "cod_confirmation";
  isLive: boolean;
  processPayment?: (amount: number, orderId: string) => Promise<boolean>;
}

export function CheckoutPageView() {
  const router = useRouter();
  const { language, cart, clearCart } = useAppStore();
  const isHi = language === "hi";

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form Fields - Step 1: Customer Details
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [town, setTown] = useState(DELIVERY_TOWNS[0]?.name || "Faridpur");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [formError, setFormError] = useState("");

  // Form Fields - Step 2: Payment Preference Selection (No processing per §7.12)
  const [paymentPreference, setPaymentPreference] = useState<
    "UPI" | "Online Payment" | "Bank Transfer" | "Pay on Confirmation"
  >("UPI");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-cream-50 pt-32 pb-24 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-6">
          <h1 className="text-3xl font-serif font-bold text-blue-900">
            {isHi ? "आपकी कार्ट खाली है" : "No Items in Cart"}
          </h1>
          <p className="text-sm text-ink-600 font-sans">
            {isHi
              ? "ऑर्डर अनुरोध भेजने के लिए पहले कार्ट में उत्पाद जोड़ें।"
              : "Please add products to your cart before proceeding to checkout."}
          </p>
          <Button variant="primary" size="lg" href="/products">
            {isHi ? "उत्पाद देखें" : "Explore Products"}
          </Button>
        </div>
      </div>
    );
  }

  // Step 1 validation
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!name.trim()) {
      setFormError(isHi ? "कृपया अपना नाम दर्ज करें।" : "Please enter your name.");
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setFormError(
        isHi
          ? "कृपया 10 अंकों का मान्य मोबाइल नंबर दर्ज करें।"
          : "Please enter a valid 10-digit mobile number."
      );
      return;
    }

    if (!address.trim()) {
      setFormError(
        isHi
          ? "कृपया अपना पूरा पता दर्ज करें।"
          : "Please enter your full delivery address."
      );
      return;
    }

    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Step 2 to Step 3
  const handleProceedToReview = () => {
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Step 3 submission
  const handleSendOrderRequest = async () => {
    setIsSubmitting(true);

    const requestId = `DIV-${Date.now().toString().slice(-6)}`;

    // TODO: payment gateway integration seam
    // If online payment was enabled: await PaymentProvider.processPayment(subtotal, requestId);

    try {
      const result = await submitOrder({
        requestId,
        customer: {
          name,
          phone,
          town,
          address,
          notes: notes.trim() || undefined,
          paymentPref: paymentPreference
        },
        items: cart,
        estimatedTotal: subtotal
      });

      // Clear cart
      clearCart();

      // Launch WhatsApp in new window
      if (typeof window !== "undefined" && result.whatsappUrl) {
        window.open(result.whatsappUrl, "_blank", "noopener,noreferrer");
      }

      // Navigate to order confirmation
      router.push(`/order-confirmation?id=${requestId}`);
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
      setFormError(
        isHi
          ? "ऑर्डर भेजने में समस्या आई। कृपया सीधे व्हाट्सएप या फोन करें।"
          : "Could not submit order. Please contact us on WhatsApp directly."
      );
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 pt-28 pb-24">
      {/* Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <nav aria-label="Breadcrumbs" className="flex items-center space-x-2 text-sm text-ink-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            {isHi ? "होम" : "Home"}
          </Link>
          <ChevronRight className="w-4 h-4 text-line" />
          <Link href="/cart" className="hover:text-blue-600 transition-colors">
            {isHi ? "कार्ट" : "Cart"}
          </Link>
          <ChevronRight className="w-4 h-4 text-line" />
          <span className="text-blue-900 font-medium">
            {isHi ? "चेकआउट" : "Checkout"}
          </span>
        </nav>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Indicator Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-blue-900 mb-6">
            {isHi ? "ऑर्डर अनुरोध प्रक्रिया" : "Order Request Checkout"}
          </h1>

          <div className="flex items-center justify-center max-w-lg mx-auto">
            <div
              className={`flex items-center gap-2 text-xs font-semibold ${
                step >= 1 ? "text-blue-600" : "text-ink-400"
              }`}
            >
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                  step >= 1 ? "bg-blue-600 text-white" : "bg-line text-ink-500"
                }`}
              >
                1
              </span>
              <span>{isHi ? "पता" : "Address"}</span>
            </div>

            <div
              className={`h-0.5 w-12 sm:w-16 mx-2 sm:mx-4 ${
                step >= 2 ? "bg-blue-600" : "bg-line"
              }`}
            />

            <div
              className={`flex items-center gap-2 text-xs font-semibold ${
                step >= 2 ? "text-blue-600" : "text-ink-400"
              }`}
            >
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                  step >= 2 ? "bg-blue-600 text-white" : "bg-line text-ink-500"
                }`}
              >
                2
              </span>
              <span>{isHi ? "भुगतान" : "Payment"}</span>
            </div>

            <div
              className={`h-0.5 w-12 sm:w-16 mx-2 sm:mx-4 ${
                step === 3 ? "bg-blue-600" : "bg-line"
              }`}
            />

            <div
              className={`flex items-center gap-2 text-xs font-semibold ${
                step === 3 ? "text-blue-600" : "text-ink-400"
              }`}
            >
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
                  step === 3 ? "bg-blue-600 text-white" : "bg-line text-ink-500"
                }`}
              >
                3
              </span>
              <span>{isHi ? "पुष्टि" : "Review"}</span>
            </div>
          </div>
        </div>

        {formError && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* STEP 1: CUSTOMER DETAILS & ADDRESS */}
        {step === 1 && (
          <form
            onSubmit={handleProceedToPayment}
            className="bg-white rounded-3xl p-6 sm:p-10 border border-line shadow-soft space-y-6"
          >
            <div className="border-b border-line pb-4">
              <h2 className="text-xl font-serif font-bold text-blue-900">
                {isHi ? "1. संपर्क एवं वितरण विवरण" : "1. Contact & Delivery Details"}
              </h2>
              <p className="text-xs text-ink-500 font-sans mt-0.5">
                {isHi
                  ? "कृपया अपना सही पता और फोन नंबर दर्ज करें ताकि डिलीवरी टीम संपर्क कर सके।"
                  : "Please provide accurate details for order dispatch and route planning."}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-blue-950 mb-1.5">
                  {isHi ? "पूरा नाम *" : "Full Name *"}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isHi ? "उदा. रमेश कुमार" : "e.g. Ramesh Kumar"}
                  className="w-full h-11 px-4 rounded-xl border border-line text-sm bg-cream-50/40 text-ink-700 focus:outline-hidden focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-blue-950 mb-1.5">
                  {isHi ? "मोबाइल नंबर (WhatsApp सक्षम) *" : "Phone Number (WhatsApp Active) *"}
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full h-11 px-4 rounded-xl border border-line text-sm bg-cream-50/40 text-ink-700 focus:outline-hidden focus:border-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-blue-950 mb-1.5">
                {isHi ? "शहर / क्षेत्र चुनें *" : "Select Town / Area *"}
              </label>
              <select
                value={town}
                onChange={(e) => setTown(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-line text-sm bg-cream-50/40 text-ink-700 focus:outline-hidden focus:border-blue-600"
              >
                {DELIVERY_TOWNS.map((t) => (
                  <option key={t.name} value={t.name}>
                    {isHi ? t.nameHi : t.name} ({t.status === "home-base" ? (isHi ? "मुख्य केंद्र" : "Home Base") : (isHi ? "दैनिक मार्ग" : "Daily Route")})
                  </option>
                ))}
                <option value="Other Area (Ghee / Inquiry)">
                  {isHi ? "अन्य शहर (केवल घी अथवा विशेष पूछताछ)" : "Other Location (Ghee or Special Route Inquiry)"}
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-blue-950 mb-1.5">
                {isHi ? "डिलीवरी का पूरा पता *" : "Full Street Address *"}
              </label>
              <textarea
                rows={3}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={
                  isHi
                    ? "मकान संख्या, गली/मोहल्ला, लैंडमार्क और पिनकोड..."
                    : "House/Shop no., street/colony, landmark, and PIN code..."
                }
                className="w-full p-4 rounded-xl border border-line text-sm bg-cream-50/40 text-ink-700 focus:outline-hidden focus:border-blue-600 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-blue-950 mb-1.5">
                {isHi ? "विशेष निर्देश (वैकल्पिक)" : "Delivery Notes (Optional)"}
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={isHi ? "उदा. सुबह 7 बजे से पहले, या दुकान पर दें" : "e.g. Morning delivery preference"}
                className="w-full h-11 px-4 rounded-xl border border-line text-sm bg-cream-50/40 text-ink-700 focus:outline-hidden focus:border-blue-600"
              />
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-line">
              <Link
                href="/cart"
                className="text-xs font-semibold text-ink-500 hover:text-blue-600 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                {isHi ? "कार्ट पर वापस" : "Back to Cart"}
              </Link>
              <Button type="submit" variant="primary" size="lg">
                {isHi ? "भुगतान विकल्प चुनें" : "Continue to Payment"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        )}

        {/* STEP 2: PAYMENT PREFERENCE SELECTION */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-line shadow-soft space-y-6">
            <div className="border-b border-line pb-4">
              <h2 className="text-xl font-serif font-bold text-blue-900">
                {isHi ? "2. भुगतान वरीयता चुनें" : "2. Payment Preference"}
              </h2>
              <p className="text-xs text-ink-500 font-sans mt-0.5">
                {isHi
                  ? "अपनी सुविधानुसार भुगतान विधि चुनें। अंतिम भुगतान ऑर्डर पुष्टि के पश्चात होगा।"
                  : "Select your preferred payment method. Payment details are settled upon order confirmation."}
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: "UPI",
                  title: "UPI (Google Pay, PhonePe, Paytm)",
                  titleHi: "UPI (गूगल पे, फोनपे, पेटीएम)",
                  desc: "Quick and secure via QR code or UPI ID upon confirmation.",
                  descHi: "ऑर्डर पुष्टि के बाद क्यूआर कोड अथवा यूपीआई आईडी द्वारा सीधा भुगतान।",
                  icon: QrCode
                },
                {
                  id: "Online Payment",
                  title: "Online Payment / Net Banking",
                  titleHi: "ऑनलाइन पेमेंट / नेट बैंकिंग",
                  desc: "Direct online transfer or payment link shared by support.",
                  descHi: "नेट बैंकिंग या टीम द्वारा भेजे गए सुरक्षित लिंक द्वारा भुगतान।",
                  icon: CreditCard
                },
                {
                  id: "Bank Transfer",
                  title: "Direct Bank Transfer (NEFT / IMPS)",
                  titleHi: "बैंक ट्रांसफर (NEFT / IMPS)",
                  desc: "Transfer directly to Shri R.S. Enterprises account.",
                  descHi: "श्री आर.एस. एंटरप्राइजेज के आधिकारिक बैंक खाते में ट्रांसफर।",
                  icon: Building
                },
                {
                  id: "Pay on Confirmation",
                  title: "Pay on Dispatch Confirmation",
                  titleHi: "डिस्पैच पुष्टि पर भुगतान",
                  desc: "Settle amount once delivery van route and timing is locked.",
                  descHi: "डिलीवरी वैन शेड्यूल तय होने के बाद भुगतान करें।",
                  icon: Wallet
                }
              ].map((method) => {
                const isSelected = paymentPreference === method.id;
                const IconComp = method.icon;

                return (
                  <div
                    key={method.id}
                    onClick={() => setPaymentPreference(method.id as any)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/40 shadow-xs"
                        : "border-line hover:border-blue-200 bg-cream-50/20"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? "border-blue-600 bg-blue-600" : "border-ink-300"
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <IconComp className="w-4 h-4 text-blue-600" />
                        <h3 className="font-serif font-bold text-base text-blue-900">
                          {isHi ? method.titleHi : method.title}
                        </h3>
                      </div>
                      <p className="text-xs text-ink-600 font-sans">
                        {isHi ? method.descHi : method.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-line">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-ink-500 hover:text-blue-600 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                {isHi ? "पता बदलें" : "Edit Address"}
              </button>
              <Button type="button" variant="primary" size="lg" onClick={handleProceedToReview}>
                {isHi ? "ऑर्डर की समीक्षा करें" : "Review Order Request"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: REVIEW & SEND ORDER REQUEST */}
        {step === 3 && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-line shadow-soft space-y-6">
            <div className="border-b border-line pb-4">
              <h2 className="text-xl font-serif font-bold text-blue-900">
                {isHi ? "3. अंतिम समीक्षा एवं अनुरोध प्रेषण" : "3. Review & Submit Order Request"}
              </h2>
              <p className="text-xs text-ink-500 font-sans mt-0.5">
                {isHi
                  ? "कृपया विवरण की जांच करें। बटन दबाते ही यह अनुरोध WhatsApp पर तैयार हो जाएगा।"
                  : "Review your order summary and delivery details before sending via WhatsApp."}
              </p>
            </div>

            {/* Customer & Delivery Summary Card */}
            <div className="p-5 rounded-2xl bg-cream-50 border border-line space-y-3 text-xs sm:text-sm font-sans">
              <div className="flex justify-between border-b border-line/60 pb-2">
                <span className="text-ink-500">{isHi ? "ग्राहक नाम:" : "Customer Name:"}</span>
                <strong className="text-blue-900">{name}</strong>
              </div>
              <div className="flex justify-between border-b border-line/60 pb-2">
                <span className="text-ink-500">{isHi ? "मोबाइल नंबर:" : "Phone Number:"}</span>
                <strong className="text-blue-900">{phone}</strong>
              </div>
              <div className="flex justify-between border-b border-line/60 pb-2">
                <span className="text-ink-500">{isHi ? "शहर / क्षेत्र:" : "Delivery Town:"}</span>
                <strong className="text-blue-900">{town}</strong>
              </div>
              <div className="flex justify-between border-b border-line/60 pb-2">
                <span className="text-ink-500">{isHi ? "पता:" : "Address:"}</span>
                <span className="text-ink-700 text-right max-w-xs">{address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-500">{isHi ? "भुगतान वरीयता:" : "Payment Preference:"}</span>
                <strong className="text-blue-900">{paymentPreference}</strong>
              </div>
            </div>

            {/* Items Summary Table */}
            <div className="space-y-3 pt-2">
              <h3 className="font-serif font-bold text-base text-blue-900">
                {isHi ? "ऑर्डर किए गए उत्पाद" : "Order Items"}
              </h3>
              <div className="border border-line rounded-2xl overflow-hidden divide-y divide-line text-xs font-sans">
                {cart.map((item) => (
                  <div key={item.id} className="p-3.5 flex items-center justify-between bg-cream-50/30">
                    <div>
                      <strong className="text-blue-900 block text-sm">
                        {isHi ? item.nameHi : item.name}
                      </strong>
                      <span className="text-ink-500">
                        {isHi ? item.sizeHi : item.size} × {item.quantity}
                      </span>
                    </div>
                    <span className="font-bold text-blue-900 text-sm">
                      {formatINR(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Estimated Total Block */}
            <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="font-serif font-bold text-base text-blue-950">
                  {isHi ? "अनुमानित कुल योग:" : "Estimated Total:"}
                </span>
                <span className="text-2xl font-bold text-blue-900 font-sans">
                  {formatINR(subtotal)}
                </span>
              </div>
              <p className="text-[11px] text-ink-500 italic">
                {isHi
                  ? "* अंतिम मूल्य व डिलीवरी समय की पुष्टि WhatsApp पर हमारी टीम द्वारा की जाएगी।"
                  : "* Final price and delivery timings will be verified on WhatsApp by our team."}
              </p>
            </div>

            {/* Send Request Button */}
            <div className="pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-line">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs font-semibold text-ink-500 hover:text-blue-600 flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                {isHi ? "भुगतान विकल्प बदलें" : "Back to Payment"}
              </button>

              <Button
                type="button"
                variant="whatsapp"
                size="lg"
                disabled={isSubmitting}
                onClick={handleSendOrderRequest}
                className="w-full sm:w-auto shadow-md shadow-green-600/20 px-8"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {isSubmitting
                  ? isHi ? "अनुरोध भेजा जा रहा है..." : "Submitting..."
                  : isHi ? "WhatsApp पर ऑर्डर अनुरोध भेजें" : "Send Order Request via WhatsApp"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
