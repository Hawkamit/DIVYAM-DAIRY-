import { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site";
import { QualityClient } from "@/components/sections/QualityClient";

export const metadata: Metadata = {
  title: "Quality & Hygiene Standards | Divyam Dairy Products",
  description:
    "Explore our 7 daily hygiene practices, on-site laboratory testing, SS-304 food-grade processing, and FSSAI compliance (Lic. 12726009000106).",
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/quality`
  },
  openGraph: {
    title: "Quality & Hygiene Standards — Divyam Dairy Products",
    description:
      "Daily testing in our laboratory, hygienic stainless-steel processing, and disciplined hygiene protocols.",
    url: `${SITE_CONFIG.siteUrl}/quality`,
    images: [
      {
        url: "/images/real/quality-lab-testing.jpg",
        width: 1200,
        height: 800,
        alt: "Divyam Dairy Quality Testing"
      }
    ]
  }
};

export default function QualityPage() {
  return <QualityClient />;
}
