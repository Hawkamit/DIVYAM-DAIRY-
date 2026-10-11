import { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site";
import { GalleryClient } from "@/components/sections/GalleryClient";

export const metadata: Metadata = {
  title: "Photo Gallery | Divyam Dairy Products",
  description:
    "Explore photo highlights of Divyam Dairy: dairy farms, SS-304 processing facility, daily testing laboratory, hygienic packaging lines, and family moments.",
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/gallery`
  },
  openGraph: {
    title: "Photo Gallery — Divyam Dairy Products",
    description:
      "A visual journey of quality, care, and hygiene across our dairy production and community.",
    url: `${SITE_CONFIG.siteUrl}/gallery`,
    images: [
      {
        url: "/images/hero/hero-all-products.jpg",
        width: 1200,
        height: 800,
        alt: "Divyam Dairy Gallery"
      }
    ]
  }
};

export default function GalleryPage() {
  return <GalleryClient />;
}
