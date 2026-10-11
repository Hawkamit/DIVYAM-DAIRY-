import { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site";
import { KnowledgeHubClient } from "@/components/sections/KnowledgeHubClient";

export const metadata: Metadata = {
  title: "Dairy Knowledge Hub | Articles & Guides | Divyam Dairy Products",
  description:
    "Explore practical guides on milk storage, understanding toned vs full cream milk, paneer cooking tips, daily laboratory testing, and authentic dairy facts.",
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/knowledge-hub`
  },
  openGraph: {
    title: "Dairy Knowledge Hub — Divyam Dairy Products",
    description:
      "Wholesome, factual articles on milk storage, nutrition facts, and traditional kitchen tips.",
    url: `${SITE_CONFIG.siteUrl}/knowledge-hub`,
    images: [
      {
        url: "/images/products/product-full-cream-milk.jpg",
        width: 1200,
        height: 800,
        alt: "Divyam Dairy Knowledge Hub"
      }
    ]
  }
};

export default function KnowledgeHubPage() {
  return <KnowledgeHubClient />;
}
