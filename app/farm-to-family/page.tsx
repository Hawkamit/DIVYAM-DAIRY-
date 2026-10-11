import { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site";
import { FarmToFamilyClient } from "@/components/sections/FarmToFamilyClient";

export const metadata: Metadata = {
  title: "From Farm to Family Process | Divyam Dairy Products",
  description:
    "Follow our complete 9-step dairy journey from local dairy farms and daily lab testing to hygienic processing, cold-chain handling, and daily doorstep delivery.",
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/farm-to-family`
  },
  openGraph: {
    title: "From Farm to Family Process — Divyam Dairy Products",
    description:
      "A journey of purity, care, and quality in every drop. See how Divyam milk and dairy are crafted.",
    url: `${SITE_CONFIG.siteUrl}/farm-to-family`,
    images: [
      {
        url: "/images/generated/hero-farm-panorama.jpg",
        width: 1200,
        height: 600,
        alt: "Divyam Dairy Farm to Family"
      }
    ]
  }
};

export default function FarmToFamilyPage() {
  return <FarmToFamilyClient />;
}
