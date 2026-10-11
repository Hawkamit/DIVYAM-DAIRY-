import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ARTICLES, getArticleBySlug } from "@/data/articles";
import { PRODUCTS, getProductBySlug } from "@/data/products";
import { SITE_CONFIG } from "@/data/site";
import { ArticleDetailView } from "@/components/sections/ArticleDetailView";
import { JsonLd } from "@/components/seo/JsonLd";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({
    slug: article.slug
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | Divyam Dairy Products",
      description: "The requested article could not be found."
    };
  }

  const title = `${article.title} | Divyam Dairy Knowledge Hub`;
  const description = article.excerpt;
  const canonicalUrl = `${SITE_CONFIG.siteUrl}/knowledge-hub/${article.slug}`;

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
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
      images: [
        {
          url: article.image,
          width: 1200,
          height: 675,
          alt: article.title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [article.image]
    }
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  // Fetch related products
  const relatedProducts = article.relatedProductSlugs
    .map((pSlug) => getProductBySlug(pSlug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  // Fetch related articles
  const relatedArticles = article.relatedArticleSlugs
    .map((aSlug) => getArticleBySlug(aSlug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <>
      <JsonLd article={article} />
      <ArticleDetailView
        article={article}
        relatedProducts={relatedProducts}
        relatedArticles={relatedArticles}
      />
    </>
  );
}
