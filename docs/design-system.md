# Divyam Dairy Products — Design System Specification

## 1. Visual Foundation & Philosophy
Derived directly from the master brand board, identity kit, and reference contact sheet:
- **Brand Feeling**: Traditional, warm Indian dairy brand combined with clean, modern, spacious layouts. Trustworthy, familiar, approachable, and premium FMCG advertising quality.
- **Visual Cues**: Flowing milk lines, gentle organic milk-wave dividers, clean white space, warm morning golden-hour lighting, deep brand navy, crisp milk white, sunny harvest yellow, and fresh natural green.

## 2. Color Palette & Semantic Tokens
- **Divyam Blue (Primary)**:
  - Deep Navy (Headings/Hero text): `#00339A` / `#0B2A6F` (`--blue-900`)
  - Primary Brand Blue: `#1747B8` (`--blue-700`)
  - Interactive Action Blue (Pills, CTAs, Highlights): `#1D5BD6` (`--blue-600`)
  - Soft Tints: `#E3EDFF` (`--blue-100`), `#F3F7FF` (`--blue-50`)
- **Harvest Yellow (Accent)**:
  - Sun Accent & Number Badges: `#F5B921` / `#FEE202` (`--yellow-500`)
  - Soft Yellow Background: `#FFF4D1` (`--yellow-100`)
- **Natural Green (Freshness & WhatsApp)**:
  - WhatsApp & Fresh Indicators: `#25A244` / `#087F36` / `#2E9B4F` (`--green-600`)
  - Soft Green Tint: `#E5F5EA` (`--green-100`)
- **Neutrals & Surfaces**:
  - Milk White: `#FFFFFF`
  - Cream Background: `#FFFDF8` (`--cream-50`)
  - Text Ink Primary: `#1B2430` / `#2B3550` (`--ink-700`)
  - Text Secondary: `#5E6A85` (`--ink-500`)
  - Borders & Hairlines: `#E4EAF5` (`--line`)

## 3. Typography System
- **Display & Headings**:
  - English: Bold humanist/editorial serif (`Playfair Display` or `Fraunces`) for elevated hero and section titles, paired with `Plus Jakarta Sans` / `Inter` / `Lato` for crisp UI and body.
  - Hindi (हिन्दी): `Noto Serif Devanagari` for headlines (पक्का इरादा, शुद्धता का वादा!), paired with `Noto Sans Devanagari` for body and UI elements.
- **Scale**:
  - Display: `72px` (desktop) -> `40px` (mobile), Line-height: `1.08`
  - H1: `56px` -> `34px`, Line-height: `1.12`
  - H2: `40px` -> `28px`, Line-height: `1.18`
  - H3: `26px` -> `22px`, Line-height: `1.25`
  - Body: `17px` -> `16px`, Line-height: `1.6`
  - Small / Badges: `13px` - `14px`

## 4. Radii, Shadows & Surfaces
- **Corner Radii**:
  - Buttons / Filter Pills: Full pill (`rounded-full` / `9999px`)
  - Product & Content Cards: `14px` (`rounded-2xl`)
  - Product Image Tiles: `12px` (`rounded-xl`)
  - Inputs & Textareas: `10px` (`rounded-lg`)
- **Shadows**:
  - Default Card: `0 8px 30px rgba(16, 42, 110, 0.08)`
  - Elevated / Hover: `0 16px 48px rgba(16, 42, 110, 0.14)`
  - Glow / Badge: `0 4px 14px rgba(29, 91, 214, 0.25)`

## 5. Signature Motifs
1. **Organic Milk-Wave Dividers**: Soft curved SVG transitions between cream, blue-50, and white sections.
2. **Milk-Splash Hero Overlays**: Transparent milk splash / crown motifs framing hero and pedigree product shots.
3. **Numbered Yellow Badges**: Circular yellow badges with bold numbers (`01`, `02`, `03`...) connecting process nodes.
4. **Circled Thin-Line Blue Icons**: 1.5px stroke icons encased in soft blue or green circular badges (`p-2.5 rounded-full bg-blue-50 text-blue-600`).
5. **Dual-Language Native Toggle**: Seamless switching between Hindi and English without layout shift.
6. **Cinematic Scroll-Controlled WebM Hero**:
   - Pinned 100svh viewport using GSAP ScrollTrigger.
   - User scroll scrub directly maps progress (0 -> 1) to `video.currentTime` (0s -> 10.008s).
   - Real loading lifecycle preloader with live percentage indicator.
   - Tagline exit animation over the first 15–20% of scroll (`opacity: 1 -> 0`, `y: 0 -> -30px`).
   - Seamless unpin into `HomeProductStrip` upon reaching the final frame.
   - Fully responsive `object-fit: cover` with reduced-motion fallback to static poster.
