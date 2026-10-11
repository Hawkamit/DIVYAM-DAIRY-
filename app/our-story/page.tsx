import { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site";
import { OurStoryClient } from "@/components/sections/OurStoryClient";

export const metadata: Metadata = {
  title: "Our Story | Divyam Dairy Products (Shri R.S. Enterprises)",
  description:
    "Learn about the founding journey, family values, and commitment to hygiene and testing at Divyam Dairy Products.",
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/our-story`
  },
  openGraph: {
    title: "Our Story — Divyam Dairy Products",
    description:
      "A promise of purity: How concerns about quality led to the foundation of Divyam Dairy Products.",
    url: `${SITE_CONFIG.siteUrl}/our-story`,
    images: [
      {
        url: "/images/generated/hero-family-morning.jpg",
        width: 1200,
        height: 800,
        alt: "Divyam Dairy Family"
      }
    ]
  }
};

export default function OurStoryPage() {
  return <OurStoryClient />;
}
