import { SITE_CONFIG } from "@/data/site";
import { Product } from "@/data/products";
import { Article } from "@/data/articles";
import { FAQItem } from "@/data/faqs";

interface JsonLdProps {
  product?: Product;
  article?: Article;
  faqs?: FAQItem[];
  breadcrumbs?: { name: string; url: string }[];
}

export function JsonLd({ product, article, faqs, breadcrumbs }: JsonLdProps) {
  const schemas: Record<string, unknown>[] = [];

  // 1. Organization & LocalBusiness
  schemas.push({
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "FoodEstablishment"],
    "@id": `${SITE_CONFIG.siteUrl}/#organization`,
    name: SITE_CONFIG.brandName,
    legalName: SITE_CONFIG.legalEntity,
    url: SITE_CONFIG.siteUrl,
    logo: `${SITE_CONFIG.siteUrl}/images/real/logo.png`,
    description: SITE_CONFIG.introText,
    telephone: SITE_CONFIG.phonePrimary,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Saray Kaswa Z.A.I",
      addressLocality: "Faridpur",
      addressRegion: "Uttar Pradesh",
      postalCode: "243503",
      addressCountry: "IN"
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        opens: "06:00",
        closes: "22:00"
      }
    ],
    areaServed: SITE_CONFIG.localDeliveryAreas.map((area) => ({
      "@type": "AdministrativeArea",
      name: area
    })),
    sameAs: [SITE_CONFIG.instagramUrl, SITE_CONFIG.facebookUrl]
  });

  // 2. Product Schema
  if (product) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      image: `${SITE_CONFIG.siteUrl}${product.images.front}`,
      description: product.shortDescription,
      brand: {
        "@type": "Brand",
        name: SITE_CONFIG.brandName
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "INR",
        lowPrice: product.basePrice,
        price: product.basePrice,
        availability: product.isAvailable
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder"
      }
    });
  }

  // 3. Article Schema
  if (article) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      image: `${SITE_CONFIG.siteUrl}${article.image}`,
      datePublished: article.date,
      dateModified: article.date,
      author: {
        "@type": "Organization",
        name: article.author
      },
      publisher: {
        "@type": "Organization",
        name: SITE_CONFIG.brandName,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_CONFIG.siteUrl}/images/real/logo.png`
        }
      },
      description: article.excerpt
    });
  }

  // 4. FAQ Schema
  if (faqs && faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer
        }
      }))
    });
  }

  // 5. Breadcrumbs Schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.url
      }))
    });
  }

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
