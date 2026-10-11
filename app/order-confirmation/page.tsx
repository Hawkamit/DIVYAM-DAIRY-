import { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site";
import { OrderConfirmationView } from "@/components/cart/OrderConfirmationView";

export const metadata: Metadata = {
  title: "Order Request Confirmed | Divyam Dairy Products",
  description:
    "Your dairy order request has been received. Our team will verify dispatch timing and confirm on WhatsApp.",
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/order-confirmation`
  },
  robots: {
    index: false,
    follow: false
  }
};

export default function OrderConfirmationPage() {
  return <OrderConfirmationView />;
}
