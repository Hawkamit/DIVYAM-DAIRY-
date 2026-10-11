import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SITE_CONFIG } from "@/data/site";
import { CartItem } from "./store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

export const formatCurrency = formatINR;

export function getWhatsAppOrderUrl(params: {
  productName: string;
  size?: string;
  quantity?: number;
}): string {
  const message = composeProductWhatsAppMessage(
    params.productName,
    params.size,
    params.quantity || 1
  );
  return `https://wa.me/${SITE_CONFIG.whatsappNumberDigits}?text=${encodeURIComponent(message)}`;
}

export function composeProductWhatsAppMessage(
  productName: string,
  variantSize?: string,
  quantity: number = 1
): string {
  return `Hello Divyam Dairy Products! 🥛
I would like to order / enquire about:
- Product: ${productName}
- Pack / Size: ${variantSize || "Standard pack"}
- Quantity: ${quantity}

Please let me know current availability, confirmation, and delivery details. Thank you!`;
}

export function composeCartWhatsAppMessage(
  items: CartItem[],
  customer: {
    name: string;
    phone: string;
    town: string;
    address: string;
    notes?: string;
    paymentPref?: string;
  },
  requestId: string
): string {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemsList = items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.name} (${item.size}) × ${item.quantity} = ₹${item.price * item.quantity}`
    )
    .join("\n");

  return `*NEW ORDER REQUEST — DIVYAM DAIRY PRODUCTS* 🥛
*Request ID:* ${requestId}

*Customer Details:*
• Name: ${customer.name}
• Phone: ${customer.phone}
• Town: ${customer.town}
• Address: ${customer.address}
${customer.notes ? `• Notes: ${customer.notes}\n` : ""}${customer.paymentPref ? `• Payment Preference: ${customer.paymentPref}\n` : ""}
*Order Items:*
${itemsList}

*Estimated Subtotal:* ${formatINR(total)}
*(Note: Perishable deliveries confirmed per delivery route and batch confirmation)*

Please review and confirm dispatch schedule and payment details. Thank you!`;
}

export function composeGeneralInquiryWhatsAppMessage(
  name: string,
  phone: string,
  subject: string,
  message: string
): string {
  return `Hello Divyam Dairy Products! 🥛
*Inquiry from Website:*
• Name: ${name}
• Phone: ${phone}
• Subject: ${subject || "General Inquiry"}
• Message: ${message}

Looking forward to your response. Thank you!`;
}

// Order & Enquiry Adapters
export interface OrderSubmissionPayload {
  requestId: string;
  customer: {
    name: string;
    phone: string;
    town: string;
    address: string;
    notes?: string;
    paymentPref?: string;
  };
  items: CartItem[];
  estimatedTotal: number;
}

export interface AdapterResult {
  success: boolean;
  message: string;
  requestId?: string;
  whatsappUrl: string;
}

export async function submitOrder(payload: OrderSubmissionPayload): Promise<AdapterResult> {
  // Store order request locally for client-side order confirmation
  try {
    const existingOrders = JSON.parse(localStorage.getItem("divyam_orders") || "[]");
    existingOrders.unshift({ ...payload, timestamp: new Date().toISOString() });
    localStorage.setItem("divyam_orders", JSON.stringify(existingOrders.slice(0, 20)));
  } catch (e) {
    console.error("Local storage error in order adapter:", e);
  }

  // Record lead in Supabase contact_submissions for the Admin CRM
  try {
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    const itemsSummary = payload.items.map(i => `${i.name} (${i.size}) × ${i.quantity}`).join(", ");
    await supabase.from("contact_submissions").insert({
      name: payload.customer.name,
      phone: payload.customer.phone,
      subject: `Order Request: ${payload.requestId}`,
      message: `Items: ${itemsSummary}\nTown: ${payload.customer.town}\nAddress: ${payload.customer.address}\nTotal: ₹${payload.estimatedTotal}`,
      category: "order",
      status: "new",
    });
  } catch (err) {
    console.warn("Could not sync order to Supabase contact_submissions:", err);
  }

  const message = composeCartWhatsAppMessage(payload.items, payload.customer, payload.requestId);
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumberDigits}?text=${encodeURIComponent(message)}`;

  return {
    success: true,
    message: "Order request recorded successfully.",
    requestId: payload.requestId,
    whatsappUrl
  };
}

export async function submitEnquiry(payload: {
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
}): Promise<AdapterResult> {
  // Record lead in Supabase contact_submissions for Admin CRM
  try {
    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();
    await supabase.from("contact_submissions").insert({
      name: payload.name,
      phone: payload.phone,
      email: payload.email || null,
      subject: payload.subject || "General Inquiry",
      message: payload.message,
      category: "general",
      status: "new",
    });
  } catch (err) {
    console.warn("Could not sync enquiry to Supabase contact_submissions:", err);
  }

  const message = composeGeneralInquiryWhatsAppMessage(
    payload.name,
    payload.phone,
    payload.subject,
    payload.message
  );
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsappNumberDigits}?text=${encodeURIComponent(message)}`;

  return {
    success: true,
    message: "Inquiry recorded successfully.",
    whatsappUrl
  };
}
