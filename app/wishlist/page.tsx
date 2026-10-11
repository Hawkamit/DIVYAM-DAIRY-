import { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site";
import { WishlistView } from "@/components/product/WishlistView";

export const metadata: Metadata = {
  title: "My Wishlist | Divyam Dairy Products",
  description: "View and manage your saved favorite dairy products.",
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/wishlist`
  },
  robots: {
    index: false,
    follow: false
  }
};

export default function WishlistPage() {
  return <WishlistView />;
}
