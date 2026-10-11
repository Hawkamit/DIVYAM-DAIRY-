# Divyam Dairy Products — Image Manifest & Asset Registry

All images across the website are centralized through `/lib/images.ts` and loaded via `<SmartImage />`. Real client assets take highest priority, followed by generated photographic assets calibrated against the Style Bible, with zero broken images.

| Slot ID | Filename / Path | Type | Dimensions | Aspect | Subject & Source Details |
|---|---|---|---|---|---|
| `logo` | `/images/real/logo.png` | **Real Master** | 600×380 | ~1.58:1 | Supplied official Divyam logo isolated from white background. Blue script with golden sun and green leaf. |
| `logo-blue` | `/images/real/logo-on-blue.jpg` | **Real Master** | 800×450 | 16:9 | Official Divyam logo on blue background for footer and banners. |
| `video-commercial` | `/videos/divyam-commercial.mp4` | **Real Video** | 1080×1920 | 9:16 | 10-second commercial production video showing plant line, laboratory testing, and milk pouring. |
| `video-outro` | `/videos/divyam-outro.mp4` | **Real Video** | 1080×1920 | 9:16 | 10-second commercial outro showing authentic Divyam milk pouch in front of grazing cattle. |
| `pouch-real` | `/images/products/product-divyam-pouch-real.jpg` | **Real Frame** | 1080×1920 | 9:16 | Frame extracted from commercial outro showing real Divyam milk pouch on table with cows in meadow. |
| `lab-testing` | `/images/generated/quality-lab-testing.jpg` | **Real Frame** | 1080×1920 | 9:16 | Frame extracted from commercial showing lab technician in coat and net testing milk quality. |
| `packaging-line` | `/images/generated/process-packaging-line.jpg` | **Real Frame** | 1080×1920 | 9:16 | Frame extracted from commercial showing automated stainless steel milk flow & packaging lines. |
| `hero-farm` | `/images/generated/hero-farm-panorama.jpg` | **Generated Photo** | 1920×1080 | 16:9 | Wide morning golden hour Indian dairy countryside, green fields, neem trees, farm shed, grazing cows. |
| `hero-pedestal`| `/images/generated/hero-product-pedestal.jpg` | **Generated Photo** | 1920×1080 | 16:9 | Full cream milk pouch, golden ghee jar, paneer, and dahi on rustic wooden slab with dynamic milk splash. |
| `hero-family` | `/images/generated/hero-family-morning.jpg` | **Generated Photo** | 1920×1080 | 16:9 | Indian family (father, mother in yellow saree, young daughter with braids) enjoying milk breakfast. |
| `hero-plant` | `/images/generated/hero-plant-process.jpg` | **Generated Photo** | 1920×1080 | 16:9 | Modern stainless-steel dairy processing plant with operators in clean coats, hair nets, and masks. |
| `hero-splash` | `/images/generated/hero-milk-splash.jpg` | **Generated Photo** | 1920×1080 | 16:9 | High-speed macro photography of fresh milk splash crown with suspended droplets. |
| `delivery-truck`| `/images/generated/delivery-truck.jpg` | **Generated Photo** | 1920×1080 | 16:9 | White insulated refrigerated delivery mini-truck with blue and yellow accents driving on green road. |
| `prod-fcm` | `/images/products/product-full-cream-milk.jpg` | **Generated Photo** | 1024×1024 | 1:1 | Full Cream Milk pouch standing next to a tall glass of thick, creamy milk with froth. |
| `prod-ghee` | `/images/products/product-ghee.jpg` | **Generated Photo** | 1024×1024 | 1:1 | Pure Desi Ghee in glass jar with brass spoon drizzling golden granular ghee over hot paratha. |
| `prod-paneer` | `/images/products/product-paneer.jpg` | **Generated Photo** | 1024×1024 | 1:1 | Fresh Malai Paneer white cubes stacked on wooden cutting board with mint sprigs. |
| `prod-dahi` | `/images/products/product-dahi.jpg` | **Generated Photo** | 1024×1024 | 1:1 | Fresh Indian Dahi curd in traditional clay matka pot with wooden spoon scooping thick curd. |
| `prod-chaach` | `/images/products/product-chaach.jpg` | **Generated Photo** | 1024×1024 | 1:1 | Frothy Masala Chaach poured into a tall clay kulhad glass with roasted cumin and mint. |
| `prod-khoa` | `/images/products/product-khoa.jpg` | **Generated Photo** | 1024×1024 | 1:1 | Pure Khoya Mawa in traditional brass thali tray with fresh golden gulab jamun. |
| `prod-tea-milk`| `/images/products/product-tea-milk.jpg` | **Generated Photo** | 1024×1024 | 1:1 | Steaming hot rich Indian masala chai being poured from vintage brass kettle into glasses. |
| `hero-scroll-webm` | `/videos/hero-scroll-journey.webm` | **User Master Video** | 1920×1080 | 16:9 | Provided 10s WebM video showing dairy farm to family milk delivery journey. |
| `hero-scroll-opt` | `/videos/hero-scroll-journey-optimized.webm` | **Optimized WebM** | 1920×1080 | 16:9 | Dense intra-keyframe (every 6 frames / 0.25s) WebM for instant zero-stutter scroll scrubbing. |
| `hero-video-poster` | `/images/hero/hero-video-poster.jpg` | **Extracted Poster** | 1920×1080 | 16:9 | First frame extracted from WebM for instant preloader background and reduced-motion fallback. |
