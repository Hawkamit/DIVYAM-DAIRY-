import { createServerSupabaseClient } from "./server";
import { PRODUCTS, type Product } from "@/data/products";
import { SITE_CONFIG } from "@/data/site";
import { FAQS, type FAQItem } from "@/data/faqs";
import { DELIVERY_TOWNS, type DeliveryTown } from "@/data/delivery";

// Revalidate cache every 60 seconds or on demand
export const REVALIDATE_INTERVAL = 60;

/**
 * Fetch all published products with inventory status from Supabase
 * Falls back safely to static data if database is unreachable.
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, inventory(current_stock, stock_status, minimum_threshold)")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return PRODUCTS;
    }

    return data.map((item: any) => {
      const inv = Array.isArray(item.inventory) ? item.inventory[0] : item.inventory;
      const isActuallyAvailable = inv ? inv.stock_status !== "out_of_stock" && inv.stock_status !== "discontinued" : item.is_available;

      return {
        id: item.id,
        slug: item.slug,
        name: item.name,
        nameHi: item.name_hi,
        category: item.category_key as any,
        categoryLabel: item.category_label,
        categoryLabelHi: item.category_label_hi,
        tagline: item.tagline || "",
        taglineHi: item.tagline_hi || "",
        shortDescription: item.short_description || "",
        shortDescriptionHi: item.short_description_hi || "",
        fullDescription: Array.isArray(item.full_description) ? item.full_description : [],
        fullDescriptionHi: Array.isArray(item.full_description_hi) ? item.full_description_hi : [],
        priceRangeDisplay: item.price_range_display || "",
        priceRangeDisplayHi: item.price_range_display_hi || "",
        basePrice: Number(item.base_price) || 0,
        isAvailable: isActuallyAvailable,
        isLaunchingSoon: item.is_launching_soon || false,
        shelfLife: item.shelf_life || "",
        shelfLifeHi: item.shelf_life_hi || "",
        storageInstructions: item.storage_instructions || "",
        storageInstructionsHi: item.storage_instructions_hi || "",
        ingredients: item.ingredients || "",
        ingredientsHi: item.ingredients_hi || "",
        fatSpec: item.fat_spec || undefined,
        snfSpec: item.snf_spec || undefined,
        keyFeatures: Array.isArray(item.key_features) ? item.key_features : [],
        keyFeaturesHi: Array.isArray(item.key_features_hi) ? item.key_features_hi : [],
        variants: Array.isArray(item.variants) ? item.variants : [],
        images: item.images && typeof item.images === "object" ? item.images : { front: "" },
        deliveryCoverage: item.delivery_coverage as any,
        minOrderNote: item.min_order_note || undefined,
        minOrderNoteHi: item.min_order_note_hi || undefined,
      };
    });
  } catch (err) {
    console.warn("Failed to fetch products from Supabase, using fallback data:", err);
    return PRODUCTS;
  }
}

/**
 * Fetch a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug);
}

/**
 * Fetch active Site Settings with fallback
 */
export async function getSiteSettings() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .single();

    if (error || !data) {
      return SITE_CONFIG;
    }

    return {
      ...SITE_CONFIG,
      brandName: data.brand_name || SITE_CONFIG.brandName,
      legalEntity: data.legal_entity || SITE_CONFIG.legalEntity,
      taglineHindi: data.tagline_hi || SITE_CONFIG.taglineHindi,
      taglineEnglish: data.tagline_en || SITE_CONFIG.taglineEnglish,
      introText: data.intro_text || SITE_CONFIG.introText,
      address: data.address || SITE_CONFIG.address,
      addressShort: data.address_short || SITE_CONFIG.addressShort,
      phonePrimary: data.phone_primary || SITE_CONFIG.phonePrimary,
      phoneSecondary: data.phone_secondary || SITE_CONFIG.phoneSecondary,
      whatsappPrimary: data.whatsapp_primary || SITE_CONFIG.whatsappPrimary,
      whatsappSecondary: data.whatsapp_secondary || SITE_CONFIG.whatsappSecondary,
      whatsappNumberDigits: data.whatsapp_digits || SITE_CONFIG.whatsappNumberDigits,
      email: data.email || SITE_CONFIG.email,
      timings: data.timings || SITE_CONFIG.timings,
      fssaiNumber: data.fssai_number || SITE_CONFIG.fssaiNumber,
      gstNumber: data.gst_number || SITE_CONFIG.gstNumber,
      googleMapsBusinessUrl: data.google_maps_url || SITE_CONFIG.googleMapsBusinessUrl,
      instagramUrl: data.instagram_url || SITE_CONFIG.instagramUrl,
      facebookUrl: data.facebook_url || SITE_CONFIG.facebookUrl,
      minOrderOther: Number(data.min_order_perishable) || SITE_CONFIG.minOrderOther,
      minOrderGhee: Number(data.min_order_ghee) || SITE_CONFIG.minOrderGhee,
    };
  } catch {
    return SITE_CONFIG;
  }
}

/**
 * Fetch FAQs with fallback
 */
export async function getFAQs(): Promise<FAQItem[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return FAQS;
    }

    return data.map((item) => ({
      id: item.id,
      category: item.category,
      question: item.question,
      questionHi: item.question_hi,
      answer: item.answer,
      answerHi: item.answer_hi,
    }));
  } catch {
    return FAQS;
  }
}

/**
 * Fetch Delivery Towns / Services with fallback
 */
export async function getDeliveryTowns(): Promise<DeliveryTown[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return DELIVERY_TOWNS;
    }

    return data.map((item) => ({
      name: item.name,
      nameHi: item.name_hi,
      status: item.status,
      note: item.note || "",
      noteHi: item.note_hi || "",
      dispatchTime: item.dispatch_time || "Within 24 hours",
    }));
  } catch {
    return DELIVERY_TOWNS;
  }
}

/**
 * Fetch Testimonials from Supabase
 */
export async function getTestimonials() {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

/**
 * Fetch Page Content (Draft vs Published)
 */
export async function getPageContent(slug: string, previewDraft = false) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase
      .from("pages")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error || !data) return null;
    return previewDraft ? data.content_blocks : data.published_blocks;
  } catch {
    return null;
  }
}
