import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/checkout", "/order-confirmation", "/cart"]
    },
    sitemap: `${SITE_CONFIG.siteUrl}/sitemap.xml`
  };
}
