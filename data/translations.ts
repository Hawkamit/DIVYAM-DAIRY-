export type Language = "en" | "hi";

export interface Translations {
  // Navigation
  navHome: string;
  navProducts: string;
  navOurStory: string;
  navQuality: string;
  navFarmToFamily: string;
  navWhyDivyam: string;
  navGallery: string;
  navDelivery: string;
  navKnowledgeHub: string;
  navContact: string;
  navFAQ: string;
  navMore: string;
  navOrderNow: string;
  navSearchPlaceholder: string;

  // Hero & CTAs
  heroEyebrow: string;
  heroHeadline: string;
  heroSubline: string;
  heroCtaExplore: string;
  heroCtaStory: string;
  heroTrustBadge1: string;
  heroTrustBadge2: string;
  heroTrustBadge3: string;
  heroTrustBadge4: string;

  // Sections
  secOurProducts: string;
  secOurProductsSub: string;
  secFarmToFamilyBanner: string;
  secFarmToFamilySub: string;
  secSeeJourney: string;
  secWhyChooseDivyam: string;
  secWhyChooseDivyamSub: string;
  secGoodnessInEveryDrop: string;
  secQualitySafety: string;
  secQualitySafetySub: string;
  secLovedByFamilies: string;
  secDairyKnowledge: string;
  secDairyKnowledgeSub: string;
  secDeliveryCoverage: string;
  secFinalCtaTitle: string;
  secFinalCtaSub: string;

  // Product cards & detail
  filterAll: string;
  filterMilk: string;
  filterDahiChaach: string;
  filterPaneer: string;
  filterGhee: string;
  filterKhoya: string;
  filterOther: string;
  searchProducts: string;
  sortLabel: string;
  sortPopular: string;
  sortPriceAsc: string;
  sortPriceDesc: string;
  btnAddToCart: string;
  btnQuickView: string;
  btnOrderWhatsApp: string;
  btnCallToOrder: string;
  tabDescription: string;
  tabNutrition: string;
  tabIngredients: string;
  tabStorage: string;
  tabDelivery: string;
  shelfLifeLabel: string;
  badgeDailyAvailable: string;
  badgeLaunchingSoon: string;
  badgeEnquire: string;
  priceOnRequest: string;
  youMayAlsoLike: string;

  // Cart & Checkout
  cartTitle: string;
  cartEmpty: string;
  cartSubtotal: string;
  cartEstimatedTotal: string;
  cartMinOrderWarning: string;
  cartCheckoutBtn: string;
  cartWhatsAppInquiry: string;
  cartItemSize: string;
  cartItemQty: string;
  checkoutTitle: string;
  stepAddress: string;
  stepPaymentPref: string;
  stepReview: string;
  fullName: string;
  phoneNumber: string;
  deliveryTown: string;
  streetAddress: string;
  orderNotes: string;
  paymentMethodHeading: string;
  paymentSelectionNote: string;
  sendOrderRequestBtn: string;

  // General & Footer
  footerRights: string;
  footerFssai: string;
  footerGst: string;
  footerQuickLinks: string;
  footerProducts: string;
  footerContactUs: string;
  footerHours: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    navHome: "Home",
    navProducts: "Products",
    navOurStory: "Our Story",
    navQuality: "Quality & Hygiene",
    navFarmToFamily: "Farm to Family",
    navWhyDivyam: "Why Divyam",
    navGallery: "Gallery",
    navDelivery: "Delivery Info",
    navKnowledgeHub: "Knowledge Hub",
    navContact: "Contact",
    navFAQ: "FAQ",
    navMore: "More",
    navOrderNow: "Order Now",
    navSearchPlaceholder: "Search products, articles...",

    heroEyebrow: "Divyam Dairy Products",
    heroHeadline: "पक्का इरादा, शुद्धता का वादा!",
    heroSubline: "Pure dairy. Healthier families. A brighter tomorrow.",
    heroCtaExplore: "Explore Products",
    heroCtaStory: "Watch Our Story",
    heroTrustBadge1: "Pure & Fresh Daily",
    heroTrustBadge2: "Daily Laboratory Testing",
    heroTrustBadge3: "Hygienic Processing",
    heroTrustBadge4: "Trusted by Families",

    secOurProducts: "Our Products",
    secOurProductsSub: "Wholesome, carefully processed dairy crafted with hygiene and care.",
    secFarmToFamilyBanner: "From Our Farms To Your Family",
    secFarmToFamilySub: "A transparent 24-hour journey from local Rohilkhand farms to your breakfast table.",
    secSeeJourney: "See the Journey",
    secWhyChooseDivyam: "Why Choose Divyam?",
    secWhyChooseDivyamSub: "Our difference lies in responsible processing, verified hygiene, and honest care.",
    secGoodnessInEveryDrop: "Goodness in Every Drop",
    secQualitySafety: "Quality & Safety Standards",
    secQualitySafetySub: "Every batch tested in our Faridpur laboratory before processing.",
    secLovedByFamilies: "Loved by Families",
    secDairyKnowledge: "Dairy Knowledge Hub",
    secDairyKnowledgeSub: "Practical storage guides, culinary traditions, and nutrition facts.",
    secDeliveryCoverage: "Our Delivery Network",
    secFinalCtaTitle: "Fresh from our farms. Pure for your family.",
    secFinalCtaSub: "Order via WhatsApp or call our Faridpur desk directly for fresh daily dairy.",

    filterAll: "All Products",
    filterMilk: "Milk",
    filterDahiChaach: "Dahi & Chaach",
    filterPaneer: "Paneer",
    filterGhee: "Pure Ghee",
    filterKhoya: "Khoya / Mawa",
    filterOther: "Other",
    searchProducts: "Search products...",
    sortLabel: "Sort By",
    sortPopular: "Featured / Popular",
    sortPriceAsc: "Price: Low to High",
    sortPriceDesc: "Price: High to Low",
    btnAddToCart: "Add to Cart",
    btnQuickView: "Quick View",
    btnOrderWhatsApp: "Order on WhatsApp",
    btnCallToOrder: "Call to Order",
    tabDescription: "Description",
    tabNutrition: "Nutritional Info",
    tabIngredients: "Ingredients",
    tabStorage: "Storage & Handling",
    tabDelivery: "Delivery & Freshness",
    shelfLifeLabel: "Shelf Life",
    badgeDailyAvailable: "Available Daily",
    badgeLaunchingSoon: "Launching Soon",
    badgeEnquire: "Enquire for Availability",
    priceOnRequest: "Price on request",
    youMayAlsoLike: "You May Also Like",

    cartTitle: "Your Order Request",
    cartEmpty: "Your cart is currently empty.",
    cartSubtotal: "Subtotal (Estimated)",
    cartEstimatedTotal: "Estimated Total",
    cartMinOrderWarning:
      "Notice: Perishable products (Milk, Dahi, Paneer, Chaach) carry a ₹15,000 minimum order value for commercial routes. Ghee has NO minimum order value. You may still send an inquiry directly on WhatsApp.",
    cartCheckoutBtn: "Proceed to Order Request",
    cartWhatsAppInquiry: "Send Cart Inquiry on WhatsApp",
    cartItemSize: "Pack Size",
    cartItemQty: "Quantity",
    checkoutTitle: "Complete Order Request",
    stepAddress: "1. Delivery Details",
    stepPaymentPref: "2. Payment Preference",
    stepReview: "3. Review & Submit",
    fullName: "Full Name",
    phoneNumber: "Mobile Number (WhatsApp preferred)",
    deliveryTown: "Delivery Town / City",
    streetAddress: "Full Delivery Address / Shop Name",
    orderNotes: "Order Notes / Special Instructions",
    paymentMethodHeading: "Select Preferred Payment Method",
    paymentSelectionNote:
      "Payment method preference only. No online card details will be requested. Final invoice is confirmed on WhatsApp / Phone.",
    sendOrderRequestBtn: "Send Order Request via WhatsApp",

    footerRights: "All Rights Reserved.",
    footerFssai: "FSSAI Lic. No. 12726009000106",
    footerGst: "GSTIN: 09BKSPG3127R1ZE",
    footerQuickLinks: "Quick Links",
    footerProducts: "Our Products",
    footerContactUs: "Contact & Plant Desk",
    footerHours: "Daily Timings: 6:00 AM – 10:00 PM"
  },
  hi: {
    navHome: "मुख्य पृष्ठ",
    navProducts: "उत्पाद",
    navOurStory: "हमारी कहानी",
    navQuality: "गुणवत्ता व स्वच्छता",
    navFarmToFamily: "फार्म से परिवार तक",
    navWhyDivyam: "दिव्यम ही क्यों",
    navGallery: "गैलरी",
    navDelivery: "डिलीवरी जानकारी",
    navKnowledgeHub: "डेयरी ज्ञान केंद्र",
    navContact: "संपर्क",
    navFAQ: "अक्सर पूछे जाने वाले सवाल",
    navMore: "अन्य",
    navOrderNow: "ऑर्डर करें",
    navSearchPlaceholder: "उत्पाद या लेख खोजें...",

    heroEyebrow: "दिव्यम डेयरी प्रोडक्ट्स",
    heroHeadline: "पक्का इरादा, शुद्धता का वादा!",
    heroSubline: "शुद्ध डेयरी। स्वस्थ परिवार। खुशहाल कल।",
    heroCtaExplore: "उत्पाद देखें",
    heroCtaStory: "हमारी कहानी",
    heroTrustBadge1: "ताजा व शुद्ध प्रतिदिन",
    heroTrustBadge2: "दैनिक लैब परीक्षण",
    heroTrustBadge3: "स्वच्छ प्रसंस्करण",
    heroTrustBadge4: "परिवारों का भरोसा",

    secOurProducts: "हमारे उत्पाद",
    secOurProductsSub: "पूर्ण स्वच्छता और देखभाल के साथ तैयार किए गए पौष्टिक डेयरी उत्पाद।",
    secFarmToFamilyBanner: "हमारे फार्म से आपके परिवार तक",
    secFarmToFamilySub: "रुहेलखंड के स्थानीय खेतों से नाश्ते की मेज तक 24 घंटे की पारदर्शी यात्रा।",
    secSeeJourney: "पूरी यात्रा देखें",
    secWhyChooseDivyam: "दिव्यम डेयरी क्यों चुनें?",
    secWhyChooseDivyamSub: "हमारा अंतर बढ़ा-चढ़ाकर किए गए दावों में नहीं, बल्कि सच्ची स्वच्छता और जिम्मेदारी में है।",
    secGoodnessInEveryDrop: "हर बूंद में शुद्धता और स्वाद",
    secQualitySafety: "गुणवत्ता और सुरक्षा मानक",
    secQualitySafetySub: "प्लांट में प्रवेश से पहले फरीदपुर प्रयोगशाला में हर बैच का सख्त परीक्षण।",
    secLovedByFamilies: "परिवारों का अटूट विश्वास",
    secDairyKnowledge: "डेयरी ज्ञान केंद्र",
    secDairyKnowledgeSub: "दूध को सुरक्षित रखने के तरीके, पारंपरिक व्यंजन और पोषण संबंधी तथ्य।",
    secDeliveryCoverage: "हमारा डिलीवरी नेटवर्क",
    secFinalCtaTitle: "खेतों से ताजा। आपके परिवार के लिए शुद्ध।",
    secFinalCtaSub: "ताजे दूध और उत्पादों के लिए सीधे व्हाट्सएप पर ऑर्डर करें या हमारे फरीदपुर केंद्र पर कॉल करें।",

    filterAll: "सभी उत्पाद",
    filterMilk: "दूध",
    filterDahiChaach: "दही और छाछ",
    filterPaneer: "पनीर",
    filterGhee: "शुद्ध देसी घी",
    filterKhoya: "खोया / मावा",
    filterOther: "अन्य",
    searchProducts: "उत्पाद खोजें...",
    sortLabel: "क्रमबद्ध करें",
    sortPopular: "विशेष / लोकप्रिय",
    sortPriceAsc: "कीमत: कम से ज्यादा",
    sortPriceDesc: "कीमत: ज्यादा से कम",
    btnAddToCart: "कार्ट में जोड़ें",
    btnQuickView: "त्वरित झलक",
    btnOrderWhatsApp: "व्हाट्सएप पर ऑर्डर करें",
    btnCallToOrder: "कॉल करके ऑर्डर करें",
    tabDescription: "विवरण",
    tabNutrition: "पोषण व मानकीकरण",
    tabIngredients: "सामग्री",
    tabStorage: "भंडारण व रखरखाव",
    tabDelivery: "डिलीवरी व ताजगी नियम",
    shelfLifeLabel: "शेल्फ लाइफ",
    badgeDailyAvailable: "प्रतिदिन उपलब्ध",
    badgeLaunchingSoon: "जल्द आ रहा है",
    badgeEnquire: "उपलब्धता के लिए संपर्क करें",
    priceOnRequest: "पूछताछ पर मूल्य",
    youMayAlsoLike: "संबंधित उत्पाद",

    cartTitle: "आपका ऑर्डर अनुरोध",
    cartEmpty: "आपकी कार्ट अभी खाली है।",
    cartSubtotal: "अनुमानित उप-योग",
    cartEstimatedTotal: "अनुमानित कुल राशि",
    cartMinOrderWarning:
      "सूचना: खराब होने वाले उत्पादों (दूध, दही, पनीर, छाछ) के लिए व्यावसायिक रूट पर ₹15,000 का न्यूनतम ऑर्डर मान लागू है। घी के लिए कोई न्यूनतम ऑर्डर सीमा नहीं है। आप व्हाट्सएप पर भी संपर्क कर सकते हैं।",
    cartCheckoutBtn: "ऑर्डर अनुरोध आगे बढ़ाएं",
    cartWhatsAppInquiry: "व्हाट्सएप पर कार्ट भेजें",
    cartItemSize: "पैक का आकार",
    cartItemQty: "मात्रा",
    checkoutTitle: "ऑर्डर अनुरोध पूरा करें",
    stepAddress: "1. डिलीवरी विवरण",
    stepPaymentPref: "2. भुगतान का तरीका",
    stepReview: "3. समीक्षा व अनुरोध भेजें",
    fullName: "पूरा नाम",
    phoneNumber: "मोबाइल नंबर (व्हाट्सएप नंबर)",
    deliveryTown: "शहर / कस्बा",
    streetAddress: "पूरा पता / दुकान का नाम",
    orderNotes: "विशेष निर्देश या सुझाव",
    paymentMethodHeading: "भुगतान का पसंदीदा तरीका चुनें",
    paymentSelectionNote:
      "यह केवल प्राथमिकता चयन है। कोई ऑनलाइन कार्ड विवरण दर्ज नहीं करना है। अंतिम बिल व्हाट्सएप पर भेजा जाएगा।",
    sendOrderRequestBtn: "व्हाट्सएप द्वारा ऑर्डर अनुरोध भेजें",

    footerRights: "सर्वाधिकार सुरक्षित।",
    footerFssai: "FSSAI लाइसेंस सं. 12726009000106",
    footerGst: "जीएसटीIN: 09BKSPG3127R1ZE",
    footerQuickLinks: "त्वरित लिंक",
    footerProducts: "हमारे उत्पाद",
    footerContactUs: "संपर्क एवं प्लांट केंद्र",
    footerHours: "कार्य समय: सुबह 6:00 बजे से रात 10:00 बजे तक"
  }
};
