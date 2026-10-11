import { Metadata } from "next";
import { SITE_CONFIG } from "@/data/site";
import { SearchResultsView } from "@/components/sections/SearchResultsView";

export const metadata: Metadata = {
  title: "Search Results | Divyam Dairy Products",
  description: "Search products and articles across Divyam Dairy Products.",
  alternates: {
    canonical: `${SITE_CONFIG.siteUrl}/search`
  },
  robots: {
    index: false,
    follow: true
  }
};

export default function SearchPage() {
  return <SearchResultsView />;
}
