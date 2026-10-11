import { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site";
import { ContactClient } from "@/components/sections/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us & Order Inquiries | Divyam Dairy Products",
  description:
    "Contact Shri R.S. Enterprises, Faridpur, Bareilly. Phone: 8679943224, WhatsApp: +91 8679943224. Send inquiries for milk, ghee, paneer, and dahi.",
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/contact`
  },
  openGraph: {
    title: "Contact Divyam Dairy Products (Shri R.S. Enterprises)",
    description:
      "Get in touch with our dairy facility in Faridpur, Bareilly for retail orders, retail partnerships, and inquiries.",
    url: `${SITE_CONFIG.siteUrl}/contact`,
    images: [
      {
        url: "/images/hero/hero-all-products.jpg",
        width: 1200,
        height: 800,
        alt: "Contact Divyam Dairy"
      }
    ]
  }
};

export default function ContactPage() {
  return <ContactClient />;
}
