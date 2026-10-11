import { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site";
import { DeliveryClient } from "@/components/sections/DeliveryClient";

export const metadata: Metadata = {
  title: "Delivery Information & Areas | Divyam Dairy Products",
  description:
    "Check dairy delivery availability in Faridpur, Bareilly, Baheri, Shahjahanpur, Khudaganj, Pilibhit, and Bisalpur. Ghee delivered all over India.",
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/delivery`
  },
  openGraph: {
    title: "Delivery Information — Divyam Dairy Products",
    description:
      "Temperature-controlled delivery of fresh milk, curd, paneer, and buttermilk. Ghee dispatched all across India.",
    url: `${SITE_CONFIG.siteUrl}/delivery`,
    images: [
      {
        url: "/images/generated/delivery-truck.jpg",
        width: 1200,
        height: 675,
        alt: "Divyam Dairy Delivery Van"
      }
    ]
  }
};

export default function DeliveryPage() {
  return <DeliveryClient />;
}
