import { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site";
import { WhyDivyamClient } from "@/components/sections/WhyDivyamClient";

export const metadata: Metadata = {
  title: "Why Divyam Dairy? | Pure Care in Every Drop",
  description:
    "Discover why families choose Divyam Dairy Products: hygienic machine processing, thoughtful ingredients, daily testing, and family-inspired care.",
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/why-divyam`
  },
  openGraph: {
    title: "Why Choose Divyam Dairy Products?",
    description:
      "Our difference lies not in exaggerated promises, but in how we approach our products — with hygiene, responsible processing, and quality.",
    url: `${SITE_CONFIG.siteUrl}/why-divyam`,
    images: [
      {
        url: "/images/hero/hero-all-products.jpg",
        width: 1200,
        height: 800,
        alt: "Why Choose Divyam Dairy"
      }
    ]
  }
};

export default function WhyDivyamPage() {
  return <WhyDivyamClient />;
}
