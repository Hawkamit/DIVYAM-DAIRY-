import { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site";
import { FAQS } from "@/data/faqs";
import { FAQClient } from "@/components/sections/FAQClient";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Divyam Dairy Products",
  description:
    "Find answers about Divyam Dairy products, fat standardization, laboratory testing, storage, delivery towns, minimum order, and ordering on WhatsApp.",
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/faq`
  },
  openGraph: {
    title: "Frequently Asked Questions — Divyam Dairy Products",
    description:
      "Clear, verified answers to common questions about our products, testing, and delivery.",
    url: `${SITE_CONFIG.siteUrl}/faq`,
    images: [
      {
        url: "/images/hero/hero-all-products.jpg",
        width: 1200,
        height: 800,
        alt: "Divyam Dairy FAQs"
      }
    ]
  }
};

export default function FAQPage() {
  return (
    <>
      <JsonLd faqs={FAQS} />
      <FAQClient />
    </>
  );
}
