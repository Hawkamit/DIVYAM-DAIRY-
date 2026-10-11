"use server";

import { createServerSupabaseClient } from "./server";
import { revalidatePath } from "next/cache";

/**
 * Log action into audit_logs table
 */
export async function logAuditAction(
  action: string,
  entityType: string,
  entityId?: string,
  metadata: any = {}
) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Get default workspace
    const { data: ws } = await supabase.from("workspaces").select("id").limit(1).single();
    if (!ws) return;

    await supabase.from("audit_logs").insert({
      workspace_id: ws.id,
      user_id: user?.id || null,
      user_email: user?.email || null,
      action,
      entity_type: entityType,
      entity_id: entityId || null,
      metadata,
    });
  } catch (err) {
    console.warn("Failed to write audit log:", err);
  }
}

/**
 * Adjust Stock with complete inventory audit trail
 */
export async function adjustStock(
  productId: string,
  delta: number,
  adjustmentType: "addition" | "reduction" | "reconciliation" | "damage",
  reason: string,
  notes?: string
) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  // 1. Fetch current inventory
  const { data: inv, error: invError } = await supabase
    .from("inventory")
    .select("*")
    .eq("product_id", productId)
    .single();

  if (invError || !inv) {
    throw new Error("Inventory record not found for this product.");
  }

  const previousStock = inv.current_stock;
  let newStock = previousStock;

  if (adjustmentType === "reconciliation") {
    newStock = Math.max(0, delta);
  } else if (adjustmentType === "addition") {
    newStock = previousStock + delta;
  } else {
    // reduction or damage
    newStock = Math.max(0, previousStock - delta);
  }

  // 2. Update inventory
  const { error: updateError } = await supabase
    .from("inventory")
    .update({
      current_stock: newStock,
      last_adjusted_at: new Date().toISOString(),
    })
    .eq("id", inv.id);

  if (updateError) {
    throw new Error(`Failed to update stock: ${updateError.message}`);
  }

  // 3. Insert transaction
  await supabase.from("inventory_transactions").insert({
    inventory_id: inv.id,
    product_id: productId,
    adjustment_type: adjustmentType,
    quantity: Math.abs(newStock - previousStock),
    previous_stock: previousStock,
    new_stock: newStock,
    reason,
    notes: notes || null,
    created_by: user?.id || null,
  });

  // 4. Log audit
  await logAuditAction("STOCK_ADJUSTED", "inventory", inv.id, {
    productId,
    previousStock,
    newStock,
    delta: newStock - previousStock,
    reason,
    type: adjustmentType,
  });

  revalidatePath("/products");
  revalidatePath("/admin");
  revalidatePath("/admin/inventory");
  return { success: true, previousStock, newStock };
}

/**
 * Update Product Details
 */
export async function updateProduct(productId: string, updates: any) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from("products")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", productId);

  if (error) throw new Error(error.message);

  await logAuditAction("PRODUCT_UPDATED", "products", productId, {
    name: updates.name,
    basePrice: updates.base_price,
    isPublished: updates.is_published,
  });

  revalidatePath("/products");
  revalidatePath("/admin/products");
  return { success: true };
}

/**
 * Create New Product
 */
export async function createProduct(productData: any, initialStock = 50) {
  const supabase = await createServerSupabaseClient();
  const { data: ws } = await supabase.from("websites").select("id").limit(1).single();
  if (!ws) throw new Error("Default website not found.");

  const { data, error } = await supabase
    .from("products")
    .insert({
      ...productData,
      website_id: ws.id,
    })
    .select("id")
    .single();

  if (error || !data) throw new Error(error?.message || "Failed to create product");

  // Create initial inventory
  await supabase.from("inventory").insert({
    product_id: data.id,
    current_stock: initialStock,
    minimum_threshold: 10,
    unit: productData.unit || "units",
  });

  await logAuditAction("PRODUCT_CREATED", "products", data.id, {
    name: productData.name,
    slug: productData.slug,
  });

  revalidatePath("/products");
  revalidatePath("/admin/products");
  return { success: true, id: data.id };
}

/**
 * Delete / Archive Product
 */
export async function deleteProduct(productId: string) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.from("products").delete().eq("id", productId);
  if (error) throw new Error(error.message);

  await logAuditAction("PRODUCT_DELETED", "products", productId);
  revalidatePath("/products");
  revalidatePath("/admin/products");
  return { success: true };
}

/**
 * Update Site Settings
 */
export async function updateSiteSettings(settings: any) {
  const supabase = await createServerSupabaseClient();
  const { data: ws } = await supabase.from("websites").select("id").limit(1).single();
  if (!ws) throw new Error("Default website not found.");

  const { error } = await supabase
    .from("site_settings")
    .update({
      ...settings,
      updated_at: new Date().toISOString(),
    })
    .eq("website_id", ws.id);

  if (error) throw new Error(error.message);

  await logAuditAction("SITE_SETTINGS_UPDATED", "site_settings", ws.id);
  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/admin/settings");
  return { success: true };
}

/**
 * Submit Contact / Lead Form
 */
export async function submitContactForm(submission: {
  name: string;
  phone: string;
  email?: string;
  subject?: string;
  message: string;
  category?: string;
}) {
  const supabase = await createServerSupabaseClient();
  const { data: ws } = await supabase.from("websites").select("id").limit(1).single();
  if (!ws) throw new Error("Default website not found.");

  const { error } = await supabase.from("contact_submissions").insert({
    website_id: ws.id,
    name: submission.name,
    phone: submission.phone,
    email: submission.email || null,
    subject: submission.subject || null,
    message: submission.message,
    category: submission.category || "general",
    status: "new",
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin/enquiries");
  return { success: true };
}

/**
 * Update Enquiry Status & Notes
 */
export async function updateEnquiryStatus(
  id: string,
  status: "new" | "contacted" | "resolved" | "archived",
  adminNotes?: string
) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from("contact_submissions")
    .update({
      status,
      admin_notes: adminNotes || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  await logAuditAction("ENQUIRY_UPDATED", "contact_submissions", id, { status });
  revalidatePath("/admin/enquiries");
  return { success: true };
}

/**
 * Save Page Content Draft
 */
export async function savePageDraft(slug: string, contentBlocks: any) {
  const supabase = await createServerSupabaseClient();
  const { data: ws } = await supabase.from("websites").select("id").limit(1).single();
  if (!ws) throw new Error("Default website not found.");

  const { error } = await supabase
    .from("pages")
    .update({
      content_blocks: contentBlocks,
      has_unpublished_changes: true,
      updated_at: new Date().toISOString(),
    })
    .eq("website_id", ws.id)
    .eq("slug", slug);

  if (error) throw new Error(error.message);

  await logAuditAction("PAGE_DRAFT_SAVED", "pages", slug);
  return { success: true };
}

/**
 * Publish Page Content Draft
 */
export async function publishPage(slug: string) {
  const supabase = await createServerSupabaseClient();
  const { data: ws } = await supabase.from("websites").select("id").limit(1).single();
  if (!ws) throw new Error("Default website not found.");

  // Fetch current draft blocks
  const { data: page } = await supabase
    .from("pages")
    .select("content_blocks")
    .eq("website_id", ws.id)
    .eq("slug", slug)
    .single();

  if (!page) throw new Error("Page not found");

  const { error } = await supabase
    .from("pages")
    .update({
      published_blocks: page.content_blocks,
      has_unpublished_changes: false,
      updated_at: new Date().toISOString(),
    })
    .eq("website_id", ws.id)
    .eq("slug", slug);

  if (error) throw new Error(error.message);

  await logAuditAction("PAGE_PUBLISHED", "pages", slug);
  revalidatePath(`/${slug === "home" ? "" : slug}`);
  return { success: true };
}

/**
 * Manage FAQs
 */
export async function createFAQ(faq: any) {
  const supabase = await createServerSupabaseClient();
  const { data: ws } = await supabase.from("websites").select("id").limit(1).single();
  if (!ws) throw new Error("Default website not found.");

  const { error } = await supabase.from("faqs").insert({
    ...faq,
    website_id: ws.id,
  });

  if (error) throw new Error(error.message);
  await logAuditAction("FAQ_CREATED", "faqs", faq.question);
  revalidatePath("/faq");
  return { success: true };
}

export async function updateFAQ(id: string, updates: any) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("faqs").update(updates).eq("id", id);
  if (error) throw new Error(error.message);
  await logAuditAction("FAQ_UPDATED", "faqs", id);
  revalidatePath("/faq");
  return { success: true };
}

export async function deleteFAQ(id: string) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) throw new Error(error.message);
  await logAuditAction("FAQ_DELETED", "faqs", id);
  revalidatePath("/faq");
  return { success: true };
}

/**
 * Manage Testimonials
 */
export async function createTestimonial(testimonial: any) {
  const supabase = await createServerSupabaseClient();
  const { data: ws } = await supabase.from("websites").select("id").limit(1).single();
  if (!ws) throw new Error("Default website not found.");

  const { error } = await supabase.from("testimonials").insert({
    ...testimonial,
    website_id: ws.id,
  });

  if (error) throw new Error(error.message);
  await logAuditAction("TESTIMONIAL_CREATED", "testimonials", testimonial.author_name);
  revalidatePath("/");
  return { success: true };
}

export async function updateTestimonial(id: string, updates: any) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("testimonials").update(updates).eq("id", id);
  if (error) throw new Error(error.message);
  await logAuditAction("TESTIMONIAL_UPDATED", "testimonials", id);
  revalidatePath("/");
  return { success: true };
}

export async function deleteTestimonial(id: string) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);
  await logAuditAction("TESTIMONIAL_DELETED", "testimonials", id);
  revalidatePath("/");
  return { success: true };
}

/**
 * Manage Services / Delivery Towns
 */
export async function updateService(id: string, updates: any) {
  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("services").update(updates).eq("id", id);
  if (error) throw new Error(error.message);
  await logAuditAction("SERVICE_UPDATED", "services", id);
  revalidatePath("/delivery");
  return { success: true };
}

/**
 * Manage SEO
 */
export async function updateSEOMetadata(pageSlug: string, updates: any) {
  const supabase = await createServerSupabaseClient();
  const { data: ws } = await supabase.from("websites").select("id").limit(1).single();
  if (!ws) throw new Error("Default website not found.");

  const { error } = await supabase
    .from("seo_metadata")
    .upsert({
      ...updates,
      page_slug: pageSlug,
      website_id: ws.id,
      updated_at: new Date().toISOString(),
    }, { onConflict: "website_id,page_slug" });

  if (error) throw new Error(error.message);
  await logAuditAction("SEO_UPDATED", "seo_metadata", pageSlug);
  return { success: true };
}
