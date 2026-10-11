export interface GalleryItem {
  id: string;
  category: "all" | "products" | "farm" | "processing" | "packaging" | "delivery" | "family" | "lifestyle" | "behind-the-scenes";
  categoryLabel: string;
  categoryLabelHi: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  src: string;
  aspect: "landscape" | "portrait" | "square";
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-01",
    category: "farm",
    categoryLabel: "Farm",
    categoryLabelHi: "फार्म",
    title: "Morning Pastures in Rohilkhand",
    titleHi: "रुहेलखंड के हरे-भरे खेत",
    description: "Healthy dairy cattle grazing at dawn in local green fields.",
    descriptionHi: "स्थानीय हरे-भरे खेतों में सुबह चरती हुई स्वस्थ गायें।",
    src: "/images/generated/hero-farm-panorama.jpg",
    aspect: "landscape"
  },
  {
    id: "gal-02",
    category: "products",
    categoryLabel: "Products",
    categoryLabelHi: "उत्पाद",
    title: "Divyam Wholesome Range",
    titleHi: "दिव्यम संपूर्ण उत्पाद श्रृंखला",
    description: "Full cream milk, pure ghee, fresh paneer, and dahi on display.",
    descriptionHi: "फुल क्रीम दूध, शुद्ध घी, ताजा पनीर और दही का प्रदर्शन।",
    src: "/images/hero/hero-all-products.jpg",
    aspect: "landscape"
  },
  {
    id: "gal-03",
    category: "family",
    categoryLabel: "Family",
    categoryLabelHi: "परिवार",
    title: "A Healthy Family Morning",
    titleHi: "परिवार का खुशहाल सवेरा",
    description: "Indian family enjoying fresh milk breakfast together at the table.",
    descriptionHi: "नाश्ते की मेज पर ताजे दूध के साथ भारतीय परिवार का आनंदमय पल।",
    src: "/images/generated/hero-family-morning.jpg",
    aspect: "landscape"
  },
  {
    id: "gal-04",
    category: "processing",
    categoryLabel: "Processing",
    categoryLabelHi: "प्रोसेसिंग",
    title: "Modern Stainless Steel Pasteurization",
    titleHi: "आधुनिक स्टेनलेस स्टील पाश्चराइजेशन प्लांट",
    description: "Hygienic SS-304 vats and pipe systems inside our Faridpur plant.",
    descriptionHi: "फरीदपुर प्लांट में स्वच्छ स्टेनलेस स्टील प्रसंस्करण इकाइयां।",
    src: "/images/generated/hero-plant-process.jpg",
    aspect: "landscape"
  },
  {
    id: "gal-05",
    category: "behind-the-scenes",
    categoryLabel: "Behind the scenes",
    categoryLabelHi: "जांच व परीक्षण",
    title: "Laboratory Testing for Every Batch",
    titleHi: "हर बैच की प्रयोगशाला जांच",
    description: "Daily milk testing for fat, SNF, and purity parameters.",
    descriptionHi: "फैट, एसएनएफ और शुद्धता के लिए प्रयोगशाला में दैनिक परीक्षण।",
    src: "/images/generated/quality-lab-testing.jpg",
    aspect: "portrait"
  },
  {
    id: "gal-06",
    category: "packaging",
    categoryLabel: "Packaging",
    categoryLabelHi: "पैकेजिंग",
    title: "Automated Pouch Packing Lines",
    titleHi: "स्वचालित पाउच पैकेजिंग लाइन",
    description: "Clean food-grade packaging protected from external touch.",
    descriptionHi: "स्वच्छ खाद्य-ग्रेड सुरक्षित पैकेजिंग लाइन।",
    src: "/images/generated/process-packaging-line.jpg",
    aspect: "portrait"
  },
  {
    id: "gal-07",
    category: "delivery",
    categoryLabel: "Delivery",
    categoryLabelHi: "डिलीवरी",
    title: "Insulated Refrigerated Transport",
    titleHi: "इंसुलेटेड रेफ्रिजरेटेड वैन",
    description: "Maintaining cold chain from our plant to neighborhood stores.",
    descriptionHi: "प्लांट से दुकानों तक तापमान-नियंत्रित सुरक्षित कोल्ड-चेन।",
    src: "/images/generated/delivery-truck.jpg",
    aspect: "landscape"
  },
  {
    id: "gal-08",
    category: "products",
    categoryLabel: "Products",
    categoryLabelHi: "उत्पाद",
    title: "Pure Desi Ghee Clarification",
    titleHi: "शुद्ध दानेदार देसी घी",
    description: "Traditional granular golden ghee crafted from fresh churned butter.",
    descriptionHi: "मक्खन से धीमी आंच पर तैयार किया गया दानेदार सुनहरा घी।",
    src: "/images/products/product-ghee.jpg",
    aspect: "square"
  },
  {
    id: "gal-09",
    category: "products",
    categoryLabel: "Products",
    categoryLabelHi: "उत्पाद",
    title: "Fresh Soft Malai Paneer",
    titleHi: "ताजा मलाईदार पनीर",
    description: "Pure dairy paneer with firm yet tender texture for homestyle meals.",
    descriptionHi: "सब्जियों और स्नैक्स के लिए नरम व सुगठित ताजा पनीर।",
    src: "/images/products/product-paneer.jpg",
    aspect: "square"
  },
  {
    id: "gal-10",
    category: "products",
    categoryLabel: "Products",
    categoryLabelHi: "उत्पाद",
    title: "Fresh Set Dahi in Earthen Matka",
    titleHi: "पारंपरिक मिट्टी के मटके का दही",
    description: "Light, velvety curd naturally cooled in traditional terracotta.",
    descriptionHi: "मिट्टी के मटके में सौंधी मिठास के साथ जमाया गया ताजा दही।",
    src: "/images/products/product-dahi-matka.jpg",
    aspect: "square"
  },
  {
    id: "gal-11",
    category: "lifestyle",
    categoryLabel: "Lifestyle",
    categoryLabelHi: "लाइफस्टाइल",
    title: "Chilled Masala Chaach Pour",
    titleHi: "ताजा मसाला छाछ",
    description: "Cooling buttermilk infused with roasted cumin and mint.",
    descriptionHi: "भुने जीरे और पुदीने के स्वाद से भरपूर ताजगी देने वाला मट्ठा।",
    src: "/images/products/product-chaach.jpg",
    aspect: "square"
  },
  {
    id: "gal-12",
    category: "lifestyle",
    categoryLabel: "Lifestyle",
    categoryLabelHi: "लाइफस्टाइल",
    title: "Morning Kadak Chai Ritual",
    titleHi: "सुबह की कड़क चाय",
    description: "Rich, aromatic milk tea brewed with wholesome dairy milk.",
    descriptionHi: "गाढ़े और शुद्ध दूध से बनी खुशबूदार भारतीय चाय।",
    src: "/images/hero/hero-milk.jpg",
    aspect: "square"
  },
  {
    id: "gal-13",
    category: "products",
    categoryLabel: "Products",
    categoryLabelHi: "उत्पाद",
    title: "Traditional Mawa / Khoya Preparation",
    titleHi: "पारंपरिक खोया / मावा",
    description: "Concentrated milk solids for festive Indian sweet dishes.",
    descriptionHi: "त्योहारों की मिठाइयों के लिए शुद्ध ओटाया हुआ दूध।",
    src: "/images/hero/hero-all-products.jpg",
    aspect: "square"
  },
  {
    id: "gal-14",
    category: "products",
    categoryLabel: "Products",
    categoryLabelHi: "उत्पाद",
    title: "Official Divyam Milk Pouch",
    titleHi: "दिव्यम मिल्क ऑफिशियल पाउच",
    description: "Authentic sealed milk pouch tested and packed in Faridpur.",
    descriptionHi: "फरीदपुर में परीक्षित और पैक किया गया ऑफिशियल मिल्क पाउच।",
    src: "/images/products/product-full-cream-milk.jpg",
    aspect: "portrait"
  }
];
