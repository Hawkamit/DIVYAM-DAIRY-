export interface ProductVariant {
  id: string;
  size: string;
  sizeHi: string;
  priceMin: number;
  priceMax?: number;
  priceDisplay: string;
  priceDisplayHi: string;
  flavor?: string;
  flavorHi?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameHi: string;
  category: "milk" | "dahi-chaach" | "ghee" | "paneer" | "khoya" | "other";
  categoryLabel: string;
  categoryLabelHi: string;
  tagline: string;
  taglineHi: string;
  shortDescription: string;
  shortDescriptionHi: string;
  fullDescription: string[];
  fullDescriptionHi: string[];
  priceRangeDisplay: string;
  priceRangeDisplayHi: string;
  basePrice: number; // Lowest price for cart/filters
  isAvailable: boolean;
  isLaunchingSoon?: boolean;
  needsConfirmation?: boolean;
  shelfLife: string;
  shelfLifeHi: string;
  storageInstructions: string;
  storageInstructionsHi: string;
  ingredients: string;
  ingredientsHi: string;
  fatSpec?: string;
  snfSpec?: string;
  keyFeatures: string[];
  keyFeaturesHi: string[];
  variants: ProductVariant[];
  images: {
    front: string;
    angle?: string;
    lifestyle?: string;
  };
  deliveryCoverage: "local" | "all-india";
  minOrderNote?: string;
  minOrderNoteHi?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "prod-full-cream-milk",
    slug: "full-cream-milk",
    name: "Full Cream Milk",
    nameHi: "फुल क्रीम दूध",
    category: "milk",
    categoryLabel: "Milk",
    categoryLabelHi: "दूध",
    tagline: "Rich, creamy, and wholesome for tea, coffee, and sweets",
    taglineHi: "चाय, कॉफी और मिठाइयों के लिए गाढ़ा, मलाईदार और स्वादिष्ट",
    shortDescription:
      "A rich, nutrient-dense full cream milk with a fuller taste and creamy texture, ideal for everyday drinking, tea, coffee, and traditional sweets.",
    shortDescriptionHi:
      "भरपूर स्वाद और गाढ़ेपन के साथ पौष्टिक फुल क्रीम दूध, जो रोज पीने, चाय, कॉफी और पारंपरिक मिठाइयों के लिए बिल्कुल उपयुक्त है।",
    fullDescription: [
      "Divyam Full Cream Milk is standardized to contain a minimum of 6.0% milk fat and 9.0% solid-not-fat (SNF). It offers a rich mouthfeel, natural creamy layer, and wholesome dairy flavor.",
      "Sourced daily from trusted local farms, every batch is laboratory-tested for purity and standardized in clean, hygienic conditions before automated packaging in food-grade pouches.",
      "Ideal for boiling, making homemade rabdi, kheer, tea, and serving as a fulfilling daily glass of milk for children and family."
    ],
    fullDescriptionHi: [
      "दिव्यम फुल क्रीम दूध न्यूनतम 6.0% फैट और 9.0% एसएनएफ के साथ मानकीकृत है, जो प्राकृतिक मलाईदार स्वाद और भरपूर पोषण प्रदान करता है।",
      "स्थानीय डेयरियों और किसानों से ताजा प्राप्त, हर बैच की प्रयोगशाला में जांच की जाती है और खाद्य-ग्रेड पाउच में स्वच्छता से पैक किया जाता है।",
      "चाय, खीर, रबड़ी और पूरे परिवार के लिए एक पौष्टिक गिलास दूध के लिए सर्वोत्तम।"
    ],
    priceRangeDisplay: "₹38",
    priceRangeDisplayHi: "₹38",
    basePrice: 38,
    isAvailable: true,
    shelfLife: "3 days from packaging",
    shelfLifeHi: "पैकिंग से 3 दिन",
    storageInstructions:
      "Keep refrigerated at 4°C or below. Consume within the shelf life printed on the pack.",
    storageInstructionsHi:
      "4°C या उससे कम तापमान पर फ्रिज में रखें। पैकेट पर छपी तारीख से पहले उपभोग करें।",
    ingredients:
      "Full cream milk (Standardized to contain 6.0% Milk Fat and 9.0% SNF minimum).",
    ingredientsHi:
      "फुल क्रीम दूध (न्यूनतम 6.0% फैट और 9.0% एसएनएफ मानकीकृत)।",
    fatSpec: "6.0% minimum",
    snfSpec: "9.0% minimum",
    keyFeatures: [
      "Rich and creamy mouthfeel (MRP ₹38 / 500 ml)",
      "Standardized to 6.0% fat & 9.0% SNF min",
      "Wholesale crate available (24 pkts / crate @ ₹772.80)",
      "Packed in hygienic food-grade pouches"
    ],
    keyFeaturesHi: [
      "गाढ़ा और मलाईदार स्वाद (₹38 / 500 मि.ली.)",
      "न्यूनतम 6.0% फैट व 9.0% एसएनएफ",
      "थोक क्रेट: 24 पैकेट प्रति क्रेट (₹772.80)",
      "स्वच्छ खाद्य-ग्रेड पाउच में सुरक्षित पैकिंग"
    ],
    variants: [
      {
        id: "fcm-500ml",
        size: "500 ml",
        sizeHi: "500 मि.ली.",
        priceMin: 38,
        priceMax: 38,
        priceDisplay: "₹38",
        priceDisplayHi: "₹38"
      }
    ],
    images: {
      front: "/images/products/product-full-cream-milk.jpg"
    },
    deliveryCoverage: "local"
  },
  {
    id: "prod-toned-milk",
    slug: "toned-milk",
    name: "Toned Milk",
    nameHi: "टोन्ड दूध",
    category: "milk",
    categoryLabel: "Milk",
    categoryLabelHi: "दूध",
    tagline: "Balanced, lighter dairy milk for everyday health and cooking",
    taglineHi: "दैनिक स्वास्थ्य और भोजन के लिए संतुलित और सुपाच्य दूध",
    shortDescription:
      "A balanced everyday milk with a lighter texture, suitable for daily family consumption, morning tea, coffee, and cooking.",
    shortDescriptionHi:
      "हल्की बनावट वाला संतुलित दैनिक दूध, जो सुबह की चाय, कॉफी और रोजमर्रा के खाना पकाने के लिए एकदम उपयुक्त है।",
    fullDescription: [
      "Divyam Toned Milk is standardized to contain a minimum of 3.0% milk fat and 8.5% solid-not-fat (SNF). It retains essential milk nutrients while providing an easy-to-digest, lighter profile.",
      "Each batch undergoes stringent quality checks in our Faridpur laboratory. Processed in automated stainless-steel lines without manual contamination.",
      "Available in convenient 400 ml (₹32) and 180 ml (₹12) single-use packs for household and commercial convenience."
    ],
    fullDescriptionHi: [
      "दिव्यम टोन्ड दूध न्यूनतम 3.0% फैट और 8.5% एसएनएफ के साथ तैयार किया गया है, जो पाचन में हल्का और ऊर्जा से भरपूर है।",
      "फरीदपुर स्थित हमारी प्रयोगशाला में हर बैच का सख्त परीक्षण होता है।",
      "दैनिक जरूरत के हिसाब से 400 मि.ली. (₹32) और 180 मि.ली. (₹12) के सुविधाजनक पैक में उपलब्ध।"
    ],
    priceRangeDisplay: "₹12 – ₹32",
    priceRangeDisplayHi: "₹12 – ₹32",
    basePrice: 12,
    isAvailable: true,
    shelfLife: "3 days from packaging",
    shelfLifeHi: "पैकिंग से 3 दिन",
    storageInstructions:
      "Keep refrigerated at 4°C or below. Consume within the shelf life printed on the pack.",
    storageInstructionsHi:
      "4°C या उससे कम तापमान पर फ्रिज में रखें। पैकेट पर छपी तारीख से पहले उपभोग करें।",
    ingredients:
      "Toned milk (Standardized to contain 3.0% Milk Fat and 8.5% SNF minimum).",
    ingredientsHi:
      "टोन्ड दूध (न्यूनतम 3.0% फैट और 8.5% एसएनएफ मानकीकृत)।",
    fatSpec: "3.0% minimum",
    snfSpec: "8.5% minimum",
    keyFeatures: [
      "Light, balanced, and easily digestible",
      "Standardized to 3.0% fat & 8.5% SNF min",
      "Available in 400 ml (₹32) and 180 ml (₹12) packs",
      "Wholesale crates: 400ml (24 pkts) & 180ml (48 pkts)"
    ],
    keyFeaturesHi: [
      "हल्का, संतुलित और आसानी से पचने योग्य",
      "न्यूनतम 3.0% फैट व 8.5% एसएनएफ",
      "400 मि.ली. (₹32) और 180 मि.ली. (₹12) पैक में उपलब्ध",
      "थोक क्रेट: 400 मि.ली. (24 पैकेट) व 180 मि.ली. (48 पैकेट)"
    ],
    variants: [
      {
        id: "tm-180ml",
        size: "180 ml",
        sizeHi: "180 मि.ली.",
        priceMin: 12,
        priceMax: 12,
        priceDisplay: "₹12",
        priceDisplayHi: "₹12"
      },
      {
        id: "tm-400ml",
        size: "400 ml",
        sizeHi: "400 मि.ली.",
        priceMin: 32,
        priceMax: 32,
        priceDisplay: "₹32",
        priceDisplayHi: "₹32"
      }
    ],
    images: {
      front: "/images/products/product-toned-milk.jpg"
    },
    deliveryCoverage: "local"
  },
  {
    id: "prod-tea-milk",
    slug: "tea-milk",
    name: "T-Fit Tea Special Milk",
    nameHi: "टी-फिट चाय स्पेशल दूध",
    category: "milk",
    categoryLabel: "Milk",
    categoryLabelHi: "दूध",
    tagline: "Homogenized & Pasteurized 4.0% Fat, 8.5% SNF Milk for rich chai",
    taglineHi: "कड़क और मलाईदार चाय के लिए विशेष गुणवत्ता वाला 4.0% फैट दूध",
    shortDescription:
      "Divyam T-Fit Tea Special Milk is homogenized and pasteurized with 4.0% fat and 8.5% SNF minimum. Specially crafted for rich taste, smooth creaminess, and great aroma in tea.",
    shortDescriptionHi:
      "दिव्यम टी-फिट चाय स्पेशल दूध 4.0% फैट और 8.5% एसएनएफ के साथ होमोजिनाइज्ड और पाश्चुरीकृत है, जो कड़क, गाढ़ी और मलाईदार चाय के लिए सर्वोत्तम है।",
    fullDescription: [
      "Divyam T-Fit Tea Special Milk is specially formulated for tea lovers, chai points, cafes, and households who seek an authentic, rich, and smooth cup of chai.",
      "Homogenized and pasteurized with a minimum of 4.0% milk fat and 8.5% SNF to ensure optimal tea leaf infusion without separation or watery taste.",
      "Available from November onwards across all distribution routes in Faridpur, Bareilly, and surrounding regions."
    ],
    fullDescriptionHi: [
      "दिव्यम टी-फिट टी स्पेशल दूध चाय प्रेमियों, कैफे और परिवारों के लिए खास तैयार किया गया है जो गाढ़ी, खुशबूदार और स्वादिष्ट चाय चाहते हैं।",
      "4.0% फैट और 8.5% एसएनएफ के साथ होमोजिनाइज्ड और पाश्चुरीकृत।",
      "नवंबर से सभी वितरण मार्गों पर उपलब्ध।"
    ],
    priceRangeDisplay: "From Nov onwards",
    priceRangeDisplayHi: "नवंबर से उपलब्ध",
    basePrice: 0,
    isAvailable: false,
    isLaunchingSoon: true,
    shelfLife: "3 days from packaging",
    shelfLifeHi: "पैकिंग से 3 दिन",
    storageInstructions: "Keep refrigerated below 4°C.",
    storageInstructionsHi: "4°C से कम पर फ्रिज में रखें।",
    ingredients: "Homogenized & Pasteurized standardized milk (4.0% Fat Min, 8.5% SNF Min).",
    ingredientsHi: "होमोजिनाइज्ड एवं पाश्चुरीकृत दूध (न्यूनतम 4.0% फैट, 8.5% एसएनएफ)।",
    fatSpec: "4.0% minimum",
    snfSpec: "8.5% minimum",
    keyFeatures: [
      "Rich in taste, great for tea, smooth & creamy",
      "Homogenized & Pasteurized (4.0% Fat, 8.5% SNF min)",
      "Pukka Irada, Shuddhata Ka Vaada quality commitment",
      "Available from November onwards"
    ],
    keyFeaturesHi: [
      "स्वाद में भरपूर, चाय के लिए बेहतरीन, मखमली व मलाईदार",
      "होमोजिनाइज्ड व पाश्चुरीकृत (4.0% फैट, 8.5% एसएनएफ)",
      "पक्का इरादा, शुद्धता का वादा",
      "नवंबर से उपलब्ध"
    ],
    variants: [
      {
        id: "tfit-launching-soon",
        size: "Special Pouch Pack",
        sizeHi: "स्पेशल पाउच पैक",
        priceMin: 0,
        priceDisplay: "From Nov onwards",
        priceDisplayHi: "नवंबर से उपलब्ध"
      }
    ],
    images: {
      front: "/images/products/product-tea-milk.jpg"
    },
    deliveryCoverage: "local"
  },
  {
    id: "prod-dahi-cup",
    slug: "dahi",
    name: "Fresh Dahi (Lite)",
    nameHi: "ताजा दही (लाइट)",
    category: "dahi-chaach",
    categoryLabel: "Dahi & Chaach",
    categoryLabelHi: "दही और छाछ",
    tagline: "Light, smooth curd with a mild and fresh natural taste",
    taglineHi: "हल्का, मखमली और ताजे स्वाद वाला पौष्टिक दही",
    shortDescription:
      "A light and smooth curd designed for everyday consumption, featuring a fresh, mild taste and a soft texture in hygienic pouches and cups.",
    shortDescriptionHi:
      "दैनिक भोजन के लिए हल्का और मखमली दही, जो ताजे और सौम्य स्वाद के साथ स्वच्छ पाउच व कपों में उपलब्ध है।",
    fullDescription: [
      "Divyam Dahi (Lite) is prepared using standardized milk cultured under strict temperature control for consistent set texture and gentle tang.",
      "Free from synthetic stabilizers or thickeners. Packed in sturdy, sealed 180g & 350g cups and 400g pouches.",
      "90g cups and authentic Dahi Handi are also available from November onwards."
    ],
    fullDescriptionHi: [
      "दिव्यम दही (लाइट) मानकीकृत दूध से तैयार किया जाता है, जिसे नियंत्रित तापमान में जमाया जाता है ताकि मखमली बनावट मिल सके।",
      "किसी भी कृत्रिम गाढ़ेपन या रसायन से मुक्त। 180 ग्राम, 350 ग्राम कप और 400 ग्राम पाउच में उपलब्ध।",
      "90 ग्राम कप और पारंपरिक दही हांड़ी नवंबर से उपलब्ध।"
    ],
    priceRangeDisplay: "₹16 – ₹32",
    priceRangeDisplayHi: "₹16 – ₹32",
    basePrice: 16,
    isAvailable: true,
    shelfLife: "1 week from packaging",
    shelfLifeHi: "पैकिंग से 1 सप्ताह",
    storageInstructions:
      "Keep refrigerated at 4°C or below. Consume within the shelf life printed on the pack.",
    storageInstructionsHi:
      "4°C या उससे कम तापमान पर फ्रिज में रखें। पैकेट पर छपी तारीख से पहले उपभोग करें।",
    ingredients:
      "Standardized milk, active dairy culture.",
    ingredientsHi:
      "मानकीकृत दूध, प्राकृतिक जामन (दही कल्चर)।",
    fatSpec: "Lite formulation",
    snfSpec: "8.5% minimum",
    keyFeatures: [
      "Light, smooth, and delicious velvety texture",
      "Mild, fresh dairy taste without excessive sourness",
      "Hygienically set and sealed in pouches & cups",
      "1-week shelf life when refrigerated"
    ],
    keyFeaturesHi: [
      "मखमली, कोमल और स्वादिष्ट बनावट",
      "सौम्य, ताजा स्वाद बिना तीखे खट्टेपन के",
      "स्वच्छ पाउच व कप में सीलबंद",
      "फ्रिज में 1 सप्ताह तक सुरक्षित"
    ],
    variants: [
      {
        id: "dahi-180g",
        size: "180 g cup",
        sizeHi: "180 ग्राम कप",
        priceMin: 16,
        priceMax: 16,
        priceDisplay: "₹16",
        priceDisplayHi: "₹16"
      },
      {
        id: "dahi-350g",
        size: "350 g cup",
        sizeHi: "350 ग्राम कप",
        priceMin: 30,
        priceMax: 32,
        priceDisplay: "₹30 – ₹32",
        priceDisplayHi: "₹30 – ₹32"
      },
      {
        id: "dahi-400g-pouch",
        size: "400 g Lite Pouch",
        sizeHi: "400 ग्राम लाइट पाउच",
        priceMin: 32,
        priceMax: 32,
        priceDisplay: "₹32",
        priceDisplayHi: "₹32"
      },
      {
        id: "dahi-90g",
        size: "90 g cup",
        sizeHi: "90 ग्राम कप",
        priceMin: 0,
        priceDisplay: "From Nov onwards",
        priceDisplayHi: "नवंबर से उपलब्ध"
      },
      {
        id: "dahi-handi",
        size: "Dahi Handi",
        sizeHi: "दही हांड़ी",
        priceMin: 0,
        priceDisplay: "From Nov onwards",
        priceDisplayHi: "नवंबर से उपलब्ध"
      }
    ],
    images: {
      front: "/images/products/product-dahi.jpg"
    },
    deliveryCoverage: "local"
  },
  {
    id: "prod-dahi-matka",
    slug: "dahi-matka",
    name: "Dahi in Matka",
    nameHi: "मटका दही",
    category: "dahi-chaach",
    categoryLabel: "Dahi & Chaach",
    categoryLabelHi: "दही और छाछ",
    tagline: "Light dahi in traditional earthen matka for festive and bulk family use",
    taglineHi: "पारंपरिक मिट्टी के मटके में तैयार ताजा व स्वादिष्ट दही",
    shortDescription:
      "Light dahi packed in authentic earthen clay matka, providing a traditional touch, earth-cooled freshness, and soft texture. Available in local rate and 15 kg bulk matka.",
    shortDescriptionHi:
      "पारंपरिक मिट्टी के मटके में पैक ताजा दही, जो मिट्टी की सौंधी ठंडक और प्राकृतिक मिठास देता है। स्थानीय दर व 15 कि.ग्रा. थोक में उपलब्ध।",
    fullDescription: [
      "Divyam Dahi in Matka follows the exact same hygienic culturing process as our cups, but is set inside natural clay matkas that naturally absorb excess whey, yielding a dense, gentle set curd.",
      "Made from standardized full cream milk (6.0% fat / 9.0% SNF min).",
      "Available in 4.5 kg table matka and 15 kg commercial matka for weddings, festive banquets, and bulk catering."
    ],
    fullDescriptionHi: [
      "दिव्यम मटका दही मिट्टी के प्राकृतिक मटके में पारंपरिक विधि से जमाया जाता है जो अतिरिक्त पानी सोखकर गाढ़ा और सौम्य दही बनाता है।",
      "न्यूनतम 6.0% फैट और 9.0% एसएनएफ वाले शुद्ध मानकीकृत दूध से निर्मित।",
      "4.5 किग्रा और 15 किग्रा के थोक मटकों में आयोजनों व कैटरिंग हेतु उपलब्ध।"
    ],
    priceRangeDisplay: "As per quantity",
    priceRangeDisplayHi: "मात्रा अनुसार",
    basePrice: 210,
    isAvailable: true,
    shelfLife: "1 week from packaging",
    shelfLifeHi: "पैकिंग से 1 सप्ताह",
    storageInstructions:
      "Store in a cool place or refrigerated. Keep covered.",
    storageInstructionsHi: "ठंडे स्थान या फ्रिज में रखें। ढंक कर रखें।",
    ingredients:
      "Full cream milk (Standardized to contain 6.0% Milk Fat and 9.0% SNF minimum), active dairy culture.",
    ingredientsHi:
      "फुल क्रीम दूध (न्यूनतम 6.0% फैट और 9.0% एसएनएफ), प्राकृतिक जामन।",
    fatSpec: "6.0% minimum",
    snfSpec: "9.0% minimum",
    keyFeatures: [
      "Traditional earthen clay matka packaging",
      "Natural earthen-cooled fresh flavor",
      "Available in 4.5 kg and 15 kg bulk matka",
      "Rate as per quantity for events and parties"
    ],
    keyFeaturesHi: [
      "पारंपरिक मिट्टी का मटका पैकेजिंग",
      "मिट्टी की सौंधी खुशबू और प्राकृतिक ठंडक",
      "4.5 किग्रा और 15 किग्रा थोक मटके में उपलब्ध",
      "समारोहों के लिए मात्रा अनुसार दर"
    ],
    variants: [
      {
        id: "matka-4-5kg",
        size: "4.5 kg matka",
        sizeHi: "4.5 कि.ग्रा. मटका",
        priceMin: 210,
        priceDisplay: "₹210 / pack",
        priceDisplayHi: "₹210 / पैक"
      },
      {
        id: "matka-15kg",
        size: "15 kg bulk matka",
        sizeHi: "15 कि.ग्रा. थोक मटका",
        priceMin: 0,
        priceDisplay: "As per quantity",
        priceDisplayHi: "मात्रा अनुसार"
      }
    ],
    images: {
      front: "/images/products/product-dahi-matka.jpg"
    },
    deliveryCoverage: "local"
  },
  {
    id: "prod-chaach",
    slug: "chaach",
    name: "Chaach (Buttermilk)",
    nameHi: "छाछ (मट्ठा)",
    category: "dahi-chaach",
    categoryLabel: "Dahi & Chaach",
    categoryLabelHi: "दही और छाछ",
    tagline: "Convenient, light, and refreshing single-serve everyday beverage",
    taglineHi: "रोजाना ताजगी देने वाला हल्का और सुपाच्य पारंपरिक पेय",
    shortDescription:
      "A 270 ml packaged chaach (buttermilk) designed as a convenient, light, and refreshing everyday dairy beverage in Plain and Masala flavors.",
    shortDescriptionHi:
      "270 मि.ली. के सुविधाजनक पाउच में ताजा छाछ, जो सादा और मसाला दोनों स्वादों में ताजगी और राहत देता है।",
    fullDescription: [
      "Divyam Chaach is churned from milk standardized to 3.0% fat and 8.5% SNF minimum. Light on the stomach and cooling on hot afternoons.",
      "Available in Plain (mild natural churned taste) and Masala (infused with roasted cumin, rock salt, and spices).",
      "Sealed in a 270 ml grab-and-go pouch for effortless daily enjoyment (MRP ₹14, Wholesale crate rate available)."
    ],
    fullDescriptionHi: [
      "दिव्यम छाछ 3.0% फैट और 8.5% एसएनएफ वाले मानकीकृत दूध से बिलोकर तैयार की जाती है। पेट के लिए हल्की और पाचन में मददगार।",
      "सादा और भुने जीरे वाले मसालेदार फ्लेवर में उपलब्ध।",
      "270 मि.ली. के पोर्टेबल पाउच में कहीं भी पीने के लिए आसान (एमआरपी ₹14, थोक क्रेट उपलब्ध)।"
    ],
    priceRangeDisplay: "₹14",
    priceRangeDisplayHi: "₹14",
    basePrice: 14,
    isAvailable: true,
    shelfLife: "4 days from packaging",
    shelfLifeHi: "पैकिंग से 4 दिन",
    storageInstructions:
      "Keep refrigerated at 4°C or below. Consume chilled within shelf life.",
    storageInstructionsHi: "4°C पर फ्रिज में रखें। ठंडा करके पिएं।",
    ingredients:
      "Standardized milk (3.0% Milk Fat and 8.5% SNF minimum), water, active culture (and spices/salt in Masala variant).",
    ingredientsHi:
      "मानकीकृत दूध (3.0% फैट और 8.5% एसएनएफ), शुद्ध जल, कल्चर (तथा मसाला वेरिएंट में भुना जीरा व सेंधा नमक)।",
    fatSpec: "3.0% minimum",
    snfSpec: "8.5% minimum",
    keyFeatures: [
      "MRP ₹14 per 270 ml pouch",
      "Available in Plain and Masala options",
      "Light, thirst-quenching, and digestive",
      "Wholesale crate: 48 pkts / crate @ ₹384"
    ],
    keyFeaturesHi: [
      "270 मि.ली. पाउच हेतु ₹14 एमआरपी",
      "सादा और मसाला फ्लेवर में उपलब्ध",
      "पाचन के लिए उत्तम और ताजगी भरा",
      "थोक क्रेट: 48 पैकेट प्रति क्रेट (₹384)"
    ],
    variants: [
      {
        id: "chaach-plain-270ml",
        size: "270 ml (Plain)",
        sizeHi: "270 मि.ली. (सादा)",
        flavor: "Plain",
        flavorHi: "सादा",
        priceMin: 14,
        priceMax: 14,
        priceDisplay: "₹14",
        priceDisplayHi: "₹14"
      },
      {
        id: "chaach-masala-270ml",
        size: "270 ml (Masala)",
        sizeHi: "270 मि.ली. (मसाला)",
        flavor: "Masala",
        flavorHi: "मसाला",
        priceMin: 14,
        priceMax: 14,
        priceDisplay: "₹14",
        priceDisplayHi: "₹14"
      }
    ],
    images: {
      front: "/images/products/product-chaach.jpg"
    },
    deliveryCoverage: "local"
  },
  {
    id: "prod-pure-ghee",
    slug: "ghee",
    name: "Pure Desi Ghee",
    nameHi: "शुद्ध देसी घी",
    category: "ghee",
    categoryLabel: "Ghee",
    categoryLabelHi: "घी",
    tagline: "Rich aroma, smooth texture, and golden hue. Delivered all over India.",
    taglineHi: "मनमोहक खुशबू, दानेदार बनावट और सुनहरा रंग। पूरे भारत में डिलीवरी।",
    shortDescription:
      "A traditional pure dairy ghee with a rich natural aroma, smooth granular texture, and characteristic golden appearance. Delivered all over India with zero minimum order value.",
    shortDescriptionHi:
      "पारंपरिक शुद्ध देसी घी, जो दानेदार बनावट, प्राकृतिक सुगंध और सुनहरे रंग से भरपूर है। पूरे भारत में बिना किसी न्यूनतम ऑर्डर सीमा के उपलब्ध।",
    fullDescription: [
      "Divyam Pure Ghee is crafted through the traditional sequence: Cream -> Butter -> Ghee in automated, hygienic machinery. No adulteration, no added artificial essences.",
      "Features a distinct granular (danedar) texture and deep comforting aroma that enriches hot rotis, dal tadka, halwa, and festive sweets.",
      "Available in consumer jars (180 ml, 500 ml, 1 Litre) and commercial bulk tins (15 Litre Pipa & Loose Ghee). Has a 1-year shelf life and ships safely across India."
    ],
    fullDescriptionHi: [
      "दिव्यम शुद्ध देसी घी को स्वच्छ मशीनों में मलाई से मक्खन और फिर घी की विधि द्वारा धीमी आंच पर तैयार किया जाता है।",
      "इसकी दानेदार बनावट और मनमोहक सुगंध भोजन को देती है घर जैसा सच्चा स्वाद।",
      "खुदरा जार (180 मि.ली., 500 मि.ली., 1 लीटर) और 15 लीटर पीपा व थोक खुला घी उपलब्ध।"
    ],
    priceRangeDisplay: "₹180 – ₹800",
    priceRangeDisplayHi: "₹180 – ₹800",
    basePrice: 180,
    isAvailable: true,
    shelfLife: "1 year from packaging",
    shelfLifeHi: "पैकिंग से 1 वर्ष",
    storageInstructions:
      "Store in a cool, dry place away from direct sunlight. Use a dry, clean spoon always.",
    storageInstructionsHi:
      "धूप से दूर ठंडी व सूखी जगह पर रखें। हमेशा सूखे और साफ चम्मच का उपयोग करें।",
    ingredients: "Pure milk fat (clarified butter, cream → butter → ghee).",
    ingredientsHi: "शुद्ध दुग्ध वसा (मलाई → मक्खन → शुद्ध घी)।",
    keyFeatures: [
      "Rich traditional ghee aroma and golden granular texture",
      "Cream -> Butter -> Ghee machine-processed in hygienic plant",
      "Available in jars, loose ghee & 15-litre pipa",
      "Delivered all over India with NO minimum order limit"
    ],
    keyFeaturesHi: [
      "परंपरागत दानेदार बनावट और सुनहरी सुगंध",
      "स्वच्छ प्लांट में मलाई से मक्खन बनाकर तैयार",
      "जार, खुला घी और 15 लीटर पीपा में उपलब्ध",
      "पूरे भारत में डिलीवरी — कोई न्यूनतम ऑर्डर सीमा नहीं"
    ],
    variants: [
      {
        id: "ghee-180ml",
        size: "180 ml",
        sizeHi: "180 मि.ली.",
        priceMin: 180,
        priceDisplay: "₹180",
        priceDisplayHi: "₹180"
      },
      {
        id: "ghee-500ml",
        size: "500 ml",
        sizeHi: "500 मि.ली.",
        priceMin: 450,
        priceDisplay: "₹450",
        priceDisplayHi: "₹450"
      },
      {
        id: "ghee-1000ml",
        size: "1 Litre",
        sizeHi: "1 लीटर",
        priceMin: 800,
        priceDisplay: "₹800",
        priceDisplayHi: "₹800"
      },
      {
        id: "ghee-pipa-15l",
        size: "15 Litre Pipa (Commercial)",
        sizeHi: "15 लीटर पीपा (व्यावसायिक)",
        priceMin: 0,
        priceDisplay: "As per quantity",
        priceDisplayHi: "मात्रा अनुसार"
      },
      {
        id: "ghee-loose",
        size: "Loose Ghee (Bulk)",
        sizeHi: "खुला घी (थोक)",
        priceMin: 0,
        priceDisplay: "As per quantity",
        priceDisplayHi: "मात्रा अनुसार"
      }
    ],
    images: {
      front: "/images/products/product-ghee.jpg"
    },
    deliveryCoverage: "all-india",
    minOrderNote: "No minimum order value for Ghee.",
    minOrderNoteHi: "घी के लिए कोई न्यूनतम ऑर्डर सीमा नहीं है।"
  },
  {
    id: "prod-fresh-paneer",
    slug: "paneer",
    name: "Fresh Malai Paneer",
    nameHi: "ताजा मलाई पनीर",
    category: "paneer",
    categoryLabel: "Paneer",
    categoryLabelHi: "पनीर",
    tagline: "Soft yet firm texture, ideal for curries, snacks, and grilling",
    taglineHi: "नरम और सुगठित बनावट, कड़ाही पनीर और टिक्का के लिए बेहतरीन",
    shortDescription:
      "Fresh, soft, and delicious dairy paneer made from pure standardized milk. Available in 200g (₹100), 400g (₹190), 1kg (₹360) packs and bulk quantity.",
    shortDescriptionHi:
      "ताजा, कोमल और स्वादिष्ट मलाई पनीर। 200 ग्राम (₹100), 400 ग्राम (₹190), 1 किलो (₹360) पैक और थोक मात्रा में उपलब्ध।",
    fullDescription: [
      "Divyam Fresh Paneer is made by coagulating standardized milk using food-grade acidity regulator (INS 270). Cut into firm, uniform blocks that retain moisture without turning rubbery.",
      "Never contains starch, vegetable fat, or artificial binders. Packed under hygienic standards to protect freshness.",
      "Available in retail packaging of 200g, 400g, 1kg, and loose paneer for caterers and sweet makers."
    ],
    fullDescriptionHi: [
      "दिव्यम ताजा पनीर शुद्ध मानकीकृत दूध से तैयार किया जाता है। यह पकाने पर न तो टूटता है और न ही रबड़ जैसा बनता है।",
      "किसी भी प्रकार के स्टार्च या मिलावट से पूरी तरह मुक्त।",
      "200 ग्राम (₹100), 400 ग्राम (₹190), 1 कि.ग्रा. (₹360) पैक और खुला थोक पनीर उपलब्ध।"
    ],
    priceRangeDisplay: "₹100 – ₹360",
    priceRangeDisplayHi: "₹100 – ₹360",
    basePrice: 100,
    isAvailable: true,
    needsConfirmation: false,
    shelfLife: "3 days from packaging",
    shelfLifeHi: "पैकिंग से 3 दिन",
    storageInstructions:
      "Keep refrigerated at 4°C or below in clean water. Consume within 3 days.",
    storageInstructionsHi:
      "4°C या उससे कम तापमान पर फ्रिज में रखें। 3 दिन के भीतर उपयोग करें।",
    ingredients:
      "Standardized Milk (Cow/Buffalo Milk), Acidity Regulator (INS 270).",
    ingredientsHi:
      "मानकीकृत दूध (गाय/भैंस का दूध), खाद्य नियामक (आईएनएस 270)।",
    keyFeatures: [
      "Soft yet firm texture that holds shape in curries",
      "Mild, natural sweet milky taste, zero starch",
      "Standard packs: 200g (₹100), 400g (₹190), 1kg (₹360)",
      "Loose paneer available as per quantity"
    ],
    keyFeaturesHi: [
      "सब्जी में न टूटने वाली कोमल व सुगठित बनावट",
      "शुद्ध दूध का सौम्य प्राकृतिक स्वाद, बिना स्टार्च",
      "मानक पैक: 200 ग्राम (₹100), 400 ग्राम (₹190), 1 कि.ग्रा. (₹360)",
      "थोक में खुला पनीर मात्रा अनुसार उपलब्ध"
    ],
    variants: [
      {
        id: "paneer-200g",
        size: "200 g pack",
        sizeHi: "200 ग्राम पैक",
        priceMin: 100,
        priceMax: 100,
        priceDisplay: "₹100",
        priceDisplayHi: "₹100"
      },
      {
        id: "paneer-400g",
        size: "400 g pack",
        sizeHi: "400 ग्राम पैक",
        priceMin: 190,
        priceMax: 190,
        priceDisplay: "₹190",
        priceDisplayHi: "₹190"
      },
      {
        id: "paneer-1kg",
        size: "1 kg pack",
        sizeHi: "1 कि.ग्रा. पैक",
        priceMin: 360,
        priceMax: 360,
        priceDisplay: "₹360",
        priceDisplayHi: "₹360"
      },
      {
        id: "paneer-loose",
        size: "Loose Paneer (Bulk)",
        sizeHi: "खुला पनीर (थोक)",
        priceMin: 0,
        priceDisplay: "As per quantity",
        priceDisplayHi: "मात्रा अनुसार"
      }
    ],
    images: {
      front: "/images/products/product-paneer.jpg"
    },
    deliveryCoverage: "local"
  },
  {
    id: "prod-khoa",
    slug: "khoa",
    name: "Pure Khoa / Khoya (Mawa)",
    nameHi: "शुद्ध खोया / मावा",
    category: "khoya",
    categoryLabel: "Khoya",
    categoryLabelHi: "खोया",
    tagline: "Authentic slow-reduced dairy mawa for traditional Indian sweets",
    taglineHi: "पारंपरिक भारतीय मिठाइयों के लिए शुद्ध और दानेदार खोया",
    shortDescription:
      "Traditional pure dairy khoa slowly concentrated from fresh milk in hygienic vats. Ideal for festive sweets, gulab jamun, and gujiya.",
    shortDescriptionHi:
      "ताजे दूध को स्वच्छता से ओटाकर तैयार किया गया पारंपरिक मावा, जो मिठाइयों और पकवानों में लाजवाब स्वाद भरता है।",
    fullDescription: [
      "Divyam Khoa is prepared by gentle continuous evaporation of fresh standardized milk, keeping the natural caramelized milk sweetness intact.",
      "Pack sizes and batch availability are offered on request for sweet-makers, caterers, and households during festival seasons.",
      "Enquire directly on WhatsApp for current batch stock and custom requirements."
    ],
    fullDescriptionHi: [
      "दिव्यम खोया ताजे दूध को धीमी आंच पर गाढ़ा करके तैयार किया जाता है।",
      "हलवाइयों और घरों की मांग पर ताजा उपलब्ध कराया जाता है।",
      "उपलब्धता और ऑर्डर के लिए व्हाट्सएप पर सीधे संपर्क करें।"
    ],
    priceRangeDisplay: "As per quantity",
    priceRangeDisplayHi: "मात्रा अनुसार",
    basePrice: 0,
    isAvailable: true,
    needsConfirmation: true,
    shelfLife: "3–4 days (refrigerated)",
    shelfLifeHi: "3–4 दिन (फ्रिज में)",
    storageInstructions:
      "Store in refrigerator below 4°C in sealed container.",
    storageInstructionsHi: "फ्रिज में 4°C से नीचे एयरटाइट डिब्बे में रखें।",
    ingredients: "Pure concentrated whole milk solids.",
    ingredientsHi: "शुद्ध ओटाया हुआ दूध (मावा)।",
    keyFeatures: [
      "Slow-reduced from pure dairy milk",
      "Rich granular texture with natural sweetness",
      "Free from starch and synthetic additives",
      "Batch availability as per quantity"
    ],
    keyFeaturesHi: [
      "शुद्ध दूध से पारंपरिक तरीके से निर्मित",
      "दानेदार बनावट और प्राकृतिक मिठास",
      "स्टार्च और मिलावट से पूरी तरह मुक्त",
      "मात्रा अनुसार ताजा बैच उपलब्धता"
    ],
    variants: [
      {
        id: "khoa-bulk",
        size: "Bulk / Loose Mawa",
        sizeHi: "थोक / खुला मावा",
        priceMin: 0,
        priceDisplay: "As per quantity",
        priceDisplayHi: "मात्रा अनुसार"
      }
    ],
    images: {
      front: "/images/products/product-khoa.jpg"
    },
    deliveryCoverage: "local"
  }
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
