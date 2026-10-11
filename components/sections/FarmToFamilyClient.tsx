"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronRight,
  Play,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Truck,
  Heart
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { MilkWaveDivider } from "@/components/ui/MilkWaveDivider";
import { StepsFlow, StepItem } from "@/components/ui/StepsFlow";

export function FarmToFamilyClient() {
  const { language, openVideoModal } = useAppStore();
  const isHi = language === "hi";

  const steps = [
    {
      step: "01",
      title: "Trusted Local Dairy Farms",
      titleHi: "विश्वसनीय स्थानीय डेयरी फार्म",
      desc: "Healthy, well-nourished Indian dairy cattle grazing in green rural fields around Bareilly and Rohilkhand, cared for with natural feed and clean water.",
      descHi: "रुहेलखंड और बरेली के हरे-भरे ग्रामीण क्षेत्रों में स्वच्छ वातावरण और प्राकृतिक चारे के साथ पाली जाने वाली स्वस्थ गायें और भैंसें।",
      image: "/images/generated/process-01-sourcing.jpg"
    },
    {
      step: "02",
      title: "Responsible Milk Sourcing",
      titleHi: "जिम्मेदार दूध संकलन",
      desc: "Milk is sourced fresh from local farmers and vendors every morning in clean, food-grade steel cans, ensuring prompt transport to our facility.",
      descHi: "स्वच्छ स्टील के बर्तनों में स्थानीय किसानों से रोज सुबह ताजा दूध एकत्रित कर सीधे प्लांट में लाया जाता है।",
      image: "/images/generated/process-01-sourcing.jpg"
    },
    {
      step: "03",
      title: "Daily Laboratory Quality Testing",
      titleHi: "दैनिक प्रयोगशाला गुणवत्ता परीक्षण",
      desc: "Every incoming batch undergoes rigorous laboratory screening for fat percentage, SNF, and purity parameters before it is accepted into processing.",
      descHi: "प्लांट में उतरने से पहले प्रत्येक बैच की फैट, एसएनएफ और शुद्धता की ऑन-साइट लैब में सख्त जांच की जाती है।",
      image: "/images/generated/quality-lab-testing.jpg"
    },
    {
      step: "04",
      title: "Hygienic Machine Processing",
      titleHi: "स्वच्छ मशीनी प्रोसेसिंग",
      desc: "Milk flows through enclosed SS-304 stainless-steel vats and pasteurization lines, maintaining precise temperature control without unnecessary chemicals.",
      descHi: "स्टेनलेस स्टील (SS 304) संयंत्र में नियंत्रित तापमान पर पाश्चराइजेशन और मानकीकरण, पूर्ण शुचिता के साथ।",
      image: "/images/generated/hero-plant-process.jpg"
    },
    {
      step: "05",
      title: "In-Line Quality Control",
      titleHi: "सख्त गुणवत्ता नियंत्रण",
      desc: "Trained operators in protective hygiene gear monitor batch consistency, ensuring every product meets Divyam's exacting standards.",
      descHi: "प्रशिक्षित तकनीशियनों द्वारा पूरी स्वच्छता और सुरक्षात्मक गियर में प्रत्येक बैच की गुणवत्ता का निरीक्षण।",
      image: "/images/generated/process-04-qc.jpg"
    },
    {
      step: "06",
      title: "Food-Grade Safe Packaging",
      titleHi: "खाद्य-ग्रेड सुरक्षित पैकेजिंग",
      desc: "Automated, untouched pouch-filling and hermetic sealing in multi-layer food-grade materials complying with FSSAI regulations.",
      descHi: "स्वचालित मशीनों द्वारा बिना छुए खाद्य-ग्रेड पाउच, कप और सीलबंद जार में सुरक्षित पैकेजिंग।",
      image: "/images/generated/process-05-packaging.jpg"
    },
    {
      step: "07",
      title: "Chilled Cold-Chain Staging",
      titleHi: "कोल्ड-चेन भंडारण",
      desc: "Packed dairy products are immediately transferred to refrigerated storage below 4°C to lock in natural freshness and flavor.",
      descHi: "ताजगी और प्राकृतिक स्वाद को बनाए रखने के लिए पैकेटों को तुरंत 4°C से नीचे कोल्ड स्टोरेज में रखा जाता है।",
      image: "/images/generated/process-06-coldchain.jpg"
    },
    {
      step: "08",
      title: "Prompt Daily Delivery",
      titleHi: "त्वरित दैनिक वितरण",
      desc: "Dispatched in insulated delivery vehicles across Faridpur, Bareilly, and surrounding towns to reach retail partners and families on time.",
      descHi: "इंसुलेटेड वाहनों द्वारा फरीदपुर, बरेली और आसपास के शहरों में समय पर सुरक्षित डिलीवरी।",
      image: "/images/generated/delivery-truck.jpg"
    },
    {
      step: "09",
      title: "Wholesome Goodness for Your Family",
      titleHi: "आपके परिवार के लिए पौष्टिक स्वाद",
      desc: "Rich tea, nourishing morning milk, fragrant golden ghee, and creamy fresh paneer that bring health, trust, and happiness to your dining table.",
      descHi: "चाय, सुबह का दूध, दानेदार शुद्ध घी और ताजा पनीर — आपके परिवार की सेहत और मुस्कान के लिए।",
      image: "/images/generated/hero-family-morning.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-cream-50 pt-28 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumbs" className="flex items-center space-x-2 text-sm text-ink-500 mb-8">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              {isHi ? "होम" : "Home"}
            </Link>
            <ChevronRight className="w-4 h-4 text-line" />
            <span className="text-blue-900 font-medium">
              {isHi ? "फार्म-से-परिवार यात्रा" : "Farm to Family"}
            </span>
          </nav>

          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-blue-900 tracking-tight leading-[1.12]">
              {isHi ? (
                <>
                  फार्म से परिवार तक: <br />
                  <span className="text-blue-600">शुद्धता और विश्वास का सफर</span>
                </>
              ) : (
                <>
                  From Farm to Family: <br />
                  <span className="text-blue-600">A Journey of Care & Quality</span>
                </>
              )}
            </h1>

            <p className="text-lg text-ink-700 font-sans leading-relaxed">
              {isHi
                ? "कच्चे दूध की गुणवत्ता जांच से लेकर आपकी रसोई तक — जानिए दिव्यम डेयरी में प्रत्येक उत्पाद कैसे तैयार किया जाता है।"
                : "From morning sourcing and daily lab screening to hygienic processing and prompt dispatch — discover how Divyam Dairy delivers wholesome purity."}
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => openVideoModal("/videos/divyam-commercial.mp4")}
                className="shadow-md shadow-blue-600/20"
              >
                <Play className="w-4 h-4 mr-2 fill-current" />
                {isHi ? "प्रक्रिया वीडियो देखें" : "Watch Our Process"}
              </Button>
              <Button variant="outline" size="lg" href="/quality">
                {isHi ? "गुणवत्ता मानक देखें" : "View Quality Standards"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* MILK WAVE DIVIDER */}
      <div className="relative w-full overflow-hidden my-4">
        <MilkWaveDivider variant="top" fill="#FFFFFF" />
      </div>

      {/* 2. THE VISUAL 01-09 STEP-BY-STEP PROCESS FLOW */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <StepsFlow
            steps={steps.map((item) => ({
              number: item.step,
              title: isHi ? item.titleHi : item.title,
              text: isHi ? item.descHi : item.desc,
              image: item.image
            }))}
            accentColor="#1D5BD6"
            lineColor="#E2E8F0"
            cornerMaskColor="#FFFFFF"
            numberColor="#0B2A6F"
            titleColor="#0B2A6F"
            textColor="#475569"
            numberTitleGap={24}
            titleTextGap={10}
            gridGap={68}
            imageRadius={22}
            mobileBreakpoint={809}
            imageAnimation="fade"
            mobileImageGap={16}
            lineWidth={8}
            dotSize={24}
            showDots={true}
            cornerRadius={44}
          />
        </div>
      </section>

      {/* 3. CLOSING TRUST STRIP & CALL TO ACTION */}
      <section className="py-20 bg-blue-50/50 border-t border-line">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-blue-900">
            {isHi ? "सच्ची निष्ठा से तैयार हर उत्पाद" : "Pure Care in Every Drop"}
          </h2>

          <p className="text-base text-ink-600 font-sans leading-relaxed max-w-2xl mx-auto">
            {isHi
              ? "हम गुणवत्ता और निरंतरता के साथ काम करते हैं ताकि रोज़मर्रा का डेयरी उत्पाद हर घर का विश्वसनीय हिस्सा बन सके।"
              : "With a focus on quality and consistency, we aim to make everyday dairy a trusted part of every household."}
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button variant="primary" size="lg" href="/products">
              {isHi ? "उत्पाद ऑर्डर करें" : "Order Products Now"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="whatsapp" size="lg" href="/contact">
              {isHi ? "हमसे संपर्क करें" : "Contact Divyam Dairy"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
