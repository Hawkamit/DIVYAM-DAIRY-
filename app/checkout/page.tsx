import { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site";
import { CheckoutPageView } from "@/components/cart/CheckoutPageView";

export const metadata: Metadata = {
  title: "Checkout & Order Request | Divyam Dairy Products",
  description:
    "Complete your dairy order request for fresh milk, ghee, paneer, and curd. Quick confirmation via WhatsApp.",
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/checkout`
  },
  robots: {
    index: false,
    follow: false
  }
};

export default function CheckoutPage() {
  return <CheckoutPageView />;
}
