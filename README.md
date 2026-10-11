# Divyam Dairy Products (Shri R.S. Enterprises) — Official Web Platform

> **पक्का इरादा, शुद्धता का वादा!**  
> *"Pure dairy. Healthier families. A brighter tomorrow."*

A production-grade, bilingual (Hindi & English), art-directed web application built for **Divyam Dairy Products** (*legal entity: Shri R.S. Enterprises, Faridpur, Bareilly*). Developed with Next.js 16 (App Router), TypeScript, Tailwind CSS, and Zustand.

---

## 1. Quick Start

### Prerequisites
- Node.js 18.18+ or 20+
- npm 9+

### Installation & Local Development
```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp .env.example .env.local

# 3. Start local development server
npm run dev

# 4. Open in browser
# Visit http://localhost:3000
```

### Production Build
```bash
# Build production bundle with static route generation (SSG)
npm run build

# Start production server
npm run start
```

---

## 2. Architecture & Directory Structure

```text
├── app/                          # Next.js App Router routes
│   ├── (site)/
│   ├── cart/                     # Full shopping cart with minimum order checks
│   ├── checkout/                 # 3-step checkout flow (Address -> Payment preference -> WhatsApp submission)
│   ├── contact/                  # Contact facts + WhatsApp & email inquiry form
│   ├── delivery/                 # Delivery zones, interactive town checker, and freshness rules
│   ├── faq/                      # 16+ verified FAQs with accessible accordion & schema
│   ├── farm-to-family/           # 01-09 visual journey with video modal trigger
│   ├── gallery/                  # Filterable editorial photo masonry & accessible lightbox
│   ├── knowledge-hub/            # Dairy Knowledge Hub articles list
│   │   └── [slug]/               # Editorial article page with reading progress & related products
│   ├── order-confirmation/       # Order request received screen with reference ID
│   ├── our-story/                # Founder story, 6 core values, 5-stage timeline, and pull quote
│   ├── products/                 # Full catalog with category tabs, search, and sorting
│   │   └── [slug]/               # Detail page with zoom, size pills, quantity, and 3 stacked CTAs
│   ├── quality/                  # 7 daily hygiene practices, lab testing, and FSSAI Lic. 12726009000106
│   ├── search/                   # Instant search across all products and articles
│   ├── why-divyam/               # 6 Why Divyam pillars and verified differentiator statement
│   ├── wishlist/                 # Saved items with Move-to-Cart
│   ├── not-found.tsx             # Branded 404 page
│   ├── sitemap.ts                # Dynamic XML sitemap generator
│   └── robots.ts                 # Dynamic robots.txt
├── components/
│   ├── cart/                     # Cart drawer, cart page view, checkout, confirmation
│   ├── layout/                   # Navbar, Mobile Menu, Footer with SVG wave dividers
│   ├── product/                  # ProductCard, ProductDetailView, QuickViewModal
│   ├── sections/                 # HomeHero, Strip, BANNER, LovedByFamilies, etc.
│   ├── seo/                      # JsonLd structured data (Organization, Product, Article, FAQ)
│   └── ui/                       # SmartImage, Button, Icons, Toast, MilkWaveDivider, VideoModal
├── data/                         # Centralized business truth (No hard-coded facts in components!)
│   ├── site.ts                   # Verified business constants, phones, addresses, FSSAI, policies
│   ├── products.ts               # SKUs, fat/SNF specs, variants, prices, shelf-life
│   ├── delivery.ts               # Delivery towns, dispatch timelines, and area checker logic
│   ├── faqs.ts                   # Categorized non-fabricated questions and answers
│   ├── articles.ts               # 8 original, factual, non-medical dairy knowledge articles
│   ├── gallery.ts                # Categorized photo gallery data
│   └── translations.ts           # Bilingual dictionary (English & Devanagari Hindi)
├── docs/
│   ├── design-system.md          # Visual tokens, palette, typography, radii, and motifs
│   └── image-manifest.md         # Image inventory, origins, prompts, and status
├── lib/
│   ├── store.ts                  # Zustand store (Cart, Wishlist, Language, Modals, Toasts)
│   └── utils.ts                  # Currency formatters, WhatsApp link builders, submit adapters
└── public/
    ├── images/real/              # Authentic logos & extracted video frames
    ├── images/generated/         # Art-directed commercial dairy photography
    └── videos/                   # Commercial videos
```

---

## 3. How to Update Business Information & Products

Every business fact and product detail is isolated in `/data/*` so non-technical team members can easily make changes in a single place.

### A. Updating Contact Numbers, Address, or Timings
Edit `/data/site.ts`:
```typescript
export const SITE_CONFIG = {
  phonePrimary: "8679943224",
  phoneSecondary: "8679943226",
  whatsappNumberDigits: "918679943224",
  address: "Shri R.S. Enterprises, Saray Kaswa Z.A.I, Faridpur, Bareilly...",
  timings: "6:00 AM – 10:00 PM",
  fssaiNumber: "12726009000106",
  // ...
};
```

### B. Updating Product Prices, Variants, or Shelf Life
Edit `/data/products.ts`:
```typescript
{
  id: "prod-ghee",
  slug: "ghee",
  name: "Pure Desi Ghee",
  variants: [
    { id: "ghee-1l", size: "1 L", priceMin: 800, priceDisplay: "₹800" },
    { id: "ghee-500ml", size: "500 ml", priceMin: 450, priceDisplay: "₹450" }
  ],
  // ...
}
```

### C. Swapping Images
1. Place new high-resolution images in `public/images/real/` or `public/images/products/`.
2. Update the image paths in `/data/products.ts` or `/data/gallery.ts`.
3. The `<SmartImage>` component automatically optimizes, resizes, and generates blur placeholders.

---

## 4. E-Commerce & WhatsApp Ordering System

The website implements a pragmatic, robust **Order Request System**:
- **WhatsApp Deep-Link Composition:** Orders and inquiries compose pre-filled, URL-encoded WhatsApp messages sent to `+91 8679943224`.
- **Minimum Order Policy Rule (§10):**
  - **Pure Desi Ghee:** No minimum order (`minOrderGhee = 0`); shipped all over India via courier.
  - **Perishable Dairy (Milk, Curd, Paneer, Chaach):** Configured with ₹15,000 commercial threshold (`minOrderOther = 15000`). If a user has a smaller cart, a helpful advisory notice is displayed while still enabling direct WhatsApp inquiries.
- **Future Payment Gateway Seam:**
  In `/components/cart/CheckoutPageView.tsx` and `/lib/utils.ts`, a clean `PaymentProvider` interface is isolated:
  ```typescript
  export interface PaymentProvider {
    id: string;
    name: string;
    type: "upi" | "online" | "bank_transfer" | "cod_confirmation";
    isLive: boolean;
    processPayment?: (amount: number, orderId: string) => Promise<boolean>;
  }
  ```
  To connect Razorpay, Cashfree, or Paytm, implement `processPayment` and flip `enableOnlinePayment` to `true` in `/data/site.ts`.

---

## 5. Compliance & Content Guardrails (§3A)

This website strictly adheres to all regulatory and authenticity rules:
- **Zero Hallucinated Claims:** No claims of "100%", "organic", "chemical-free", "antibiotic-free", "A2", "award-winning", or pre-2026 founding years.
- **Verified Phrasing Used:** "Avoiding unnecessary chemicals", "no adulteration", "shuddh", "carefully processed", "tested daily in our laboratory".
- **Zero Fabricated Ratings/Reviews:** Customer ratings and reviews are hidden when empty. The home page features the authentic founder's message ("If we wouldn't want to serve it to our own family, we wouldn't want to make it for yours.") and product detail pages feature a direct WhatsApp feedback prompt.

---

## 6. Client to Confirm Before Launch

Before launching publicly to the primary domain (`divyam.com`), the client (*Shri R.S. Enterprises*) should review and confirm:

1. **Paneer Pricing Confirmation:**
   - Client note had ambiguous wording: *"1kg – 300rs-350rs / 200g"*. The site currently shows *"from ₹300/kg"* and flags `needsConfirmation: true`. Confirm exact pack rates for 200g, 500g, and 1kg.
2. **Khoa / Khoya Details:**
   - Confirm retail pack sizes (e.g. 250g, 500g, 1kg), price, and shelf life. Currently configured as *"Enquire for availability"*.
3. **Dahi-Matka Packaging & Rate:**
   - Confirm 4.5kg Matka price (currently set to ₹210 as per requirement form).
4. **Delivery Charge Structure:**
   - Confirm whether a fixed per-km delivery fee or flat town-based charge applies for retail routes.
5. **₹15,000 Minimum-Order Policy for Perishables:**
   - Confirm whether the ₹15,000 limit applies strictly to wholesale/bulk orders, or if a local household daily subscription route will have a lower threshold (e.g. ₹300-₹500).
6. **High-Resolution Packaging & Plant Photos:**
   - Real pouch and plant frames were extracted from the commercial videos. If higher-resolution studio pack shots are available, replace them in `/public/images/real/`.
7. **Authentic Customer Testimonials:**
   - When real customer quotes and photos are gathered, add them to `/data/site.ts` to automatically activate the `TestimonialCarousel`.
8. **YouTube Channel:**
   - If a YouTube channel is launched in the future, add the URL to `/data/site.ts` to reveal the YouTube icon.
