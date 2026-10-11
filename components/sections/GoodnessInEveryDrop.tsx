"use client";

import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { TRANSLATIONS } from "@/data/translations";
import { SmartImage } from "@/components/ui/SmartImage";
import { ArrowUpRight } from "lucide-react";

export function GoodnessInEveryDrop() {
  const { language } = useAppStore();
  const t = TRANSLATIONS[language];

  const tiles = [
    {
      title: "Fresh Milk",
      titleHi: "ताजा दूध",
      desc: "Standardized 6.0% Full Cream and 3.0% Toned milk packed daily.",
      descHi: "दैनिक चाय और पीने के लिए 6.0% फुल क्रीम व 3.0% टोन्ड दूध।",
      image: "/images/products/product-full-cream-milk.jpg",
      href: "/products/full-cream-milk",
      badge: "Daily Essential"
    },
    {
      title: "Pure Desi Ghee",
      titleHi: "शुद्ध देसी घी",
      desc: "Granular golden texture and comforting traditional aroma.",
      descHi: "पारंपरिक दानेदार बनावट और घर जैसी सौंधी महक।",
      image: "/images/products/product-ghee.jpg",
      href: "/products/ghee",
      badge: "All-India Delivery"
    },
    {
      title: "Fresh Malai Paneer",
      titleHi: "ताजा मलाई पनीर",
      desc: "Tender yet firm texture that absorbs curry flavors effortlessly.",
      descHi: "नरम, सुगठित और सब्जी में न घुलने वाला शुद्ध पनीर।",
      image: "/images/products/product-paneer.jpg",
      href: "/products/paneer",
      badge: "Pure Milk"
    },
    {
      title: "Natural Dahi & Matka",
      titleHi: "ताजा दही एवं मटका",
      desc: "Smooth velvety set curd in hygienic cups and traditional clay pots.",
      descHi: "स्वच्छ कप और पारंपरिक मिट्टी के मटके में जमा मखमली दही।",
      image: "/images/products/product-dahi.jpg",
      href: "/products/dahi",
      badge: "Mild & Fresh"
    }
  ];

  return (
    <section className="py-20 md:py-24 bg-[#F3F7FF]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B2A6F] font-serif tracking-tight">
            {t.secGoodnessInEveryDrop}
          </h2>
          <p className="text-sm text-slate-500">
            {language === "hi"
              ? "हर घूंट और निवाले में शुद्धता, स्वाद और स्वच्छता का संगम।"
              : "Crafted with clean milk, standardized parameters, and uncompromising hygiene."}
          </p>
        </div>

        {/* 4 Photo Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiles.map((tile, idx) => (
            <Link
              key={idx}
              href={tile.href}
              className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-milk hover:shadow-milk-lg transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-slate-50">
                <SmartImage
                  src={tile.image}
                  alt={tile.title}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#0B2A6F] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                  {tile.badge}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="text-lg font-bold text-[#0B2A6F] group-hover:text-[#1D5BD6] transition-colors">
                      {language === "hi" ? tile.titleHi : tile.title}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-[#F3F7FF] text-[#1D5BD6] group-hover:bg-[#1D5BD6] group-hover:text-white flex items-center justify-center transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed">
                    {language === "hi" ? tile.descHi : tile.desc}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-[#1D5BD6]">
                  <span>{language === "hi" ? "विवरण देखें" : "Explore"}</span>
                  <span className="text-[11px] text-slate-400">0{idx + 1}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
