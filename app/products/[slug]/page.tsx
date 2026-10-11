import { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductBySlug } from "@/data/products";
import { SITE_CONFIG } from "@/data/site";
import { ProductDetailView } from "@/components/product/ProductDetailView";
import { JsonLd } from "@/components/seo/JsonLd";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Divyam Dairy Products",
      description: "The requested dairy product could not be found."
    };
  }

  const title = `${product.name} | Divyam Dairy Products`;
  const description = `${product.tagline} — ${product.shortDescription}`;
  const canonicalUrl = `${SITE_CONFIG.siteUrl}/products/${product.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [
        {
          url: product.images.front,
          width: 1200,
          height: 1200,
          alt: product.name
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.images.front]
    }
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Related products from same category or others
  const related = PRODUCTS.filter((p) => p.id !== product.id && p.isAvailable)
    .sort((a, b) => (a.category === product.category ? -1 : 1))
    .slice(0, 6);

  return (
    <>
      <JsonLd product={product} />
      <ProductDetailView product={product} relatedProducts={related} />
    </>
  );
}
