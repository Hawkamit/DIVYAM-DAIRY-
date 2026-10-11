"use client";

import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { TRANSLATIONS } from "@/data/translations";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowRight } from "lucide-react";

export function HomeProductStrip() {
  const { language } = useAppStore();
  const t = TRANSLATIONS[language];

  const categories = [
    {
      id: "milk",
      name: "Fresh Milk",
      nameHi: "ताजा दूध",
      count: "500ml, 400ml, 180ml",
      countHi: "500ml, 400ml, 180ml",
      image: "/images/products/product-full-cream-milk.jpg",
      href: "/products?category=milk"
    },
    {
      id: "ghee",
      name: "Pure Desi Ghee",
      nameHi: "शुद्ध देसी घी",
      count: "1L, 500ml, 180ml",
      countHi: "1 लीटर, 500ml, 180ml",
      image: "/images/products/product-ghee.jpg",
      href: "/products?category=ghee"
    },
    {
      id: "paneer",
      name: "Fresh Paneer",
      nameHi: "ताजा पनीर",
      count: "200g, 500g, 1kg",
      countHi: "200g, 500g, 1kg",
      image: "/images/products/product-paneer.jpg",
      href: "/products?category=paneer"
    },
    {
      id: "dahi",
      name: "Fresh Dahi",
      nameHi: "ताजा दही",
      count: "Cups & 4.5kg Matka",
      countHi: "कप एवं 4.5kg मटका",
      image: "/images/products/product-dahi.jpg",
      href: "/products?category=dahi-chaach"
    },
    {
      id: "chaach",
      name: "Buttermilk Chaach",
      nameHi: "ताजा छाछ",
      count: "Plain & Masala 270ml",
      countHi: "सादा व मसाला 270ml",
      image: "/images/products/product-chaach.jpg",
      href: "/products?category=dahi-chaach"
    },
    {
      id: "khoya",
      name: "Khoa / Mawa",
      nameHi: "खोया / मावा",
      count: "Enquire for Availability",
      countHi: "उपलब्धता पर पूछताछ",
      image: "/images/products/product-khoa.jpg",
      href: "/products?category=khoya"
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-[#FFFDF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0B2A6F] font-serif">
              {t.secOurProducts}
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              {t.secOurProductsSub}
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1D5BD6] hover:text-[#154bb3] transition-colors group self-start sm:self-auto"
          >
            <span>{language === "hi" ? "सभी उत्पाद देखें" : "View All Products"}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6 Category Thumbnails Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={cat.href}
              className="group bg-white rounded-3xl p-3 sm:p-4 border border-slate-100 shadow-milk hover:shadow-milk-lg transition-all duration-300 flex flex-col items-center text-center hover:-translate-y-1.5"
            >
              <div className="relative w-full aspect-square rounded-2xl bg-[#F3F7FF] p-3 mb-3 overflow-hidden flex items-center justify-center">
                <SmartImage
                  src={cat.image}
                  alt={cat.name}
                  width={180}
                  height={180}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <h3 className="text-xs sm:text-sm font-bold text-[#0B2A6F] group-hover:text-[#1D5BD6] transition-colors leading-tight">
                {language === "hi" ? cat.nameHi : cat.name}
              </h3>

              <p className="text-[10px] text-slate-400 mt-1 truncate w-full">
                {language === "hi" ? cat.countHi : cat.count}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
