import { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site";
import { CartPageView } from "@/components/cart/CartPageView";

export const metadata: Metadata = {
  title: "Shopping Cart | Divyam Dairy Products",
  description:
    "Review your fresh dairy order items, pack sizes, estimated totals, and minimum order guidelines.",
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/cart`
  }
};

export default function CartPage() {
  return <CartPageView />;
}
