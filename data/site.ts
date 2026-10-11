export const SITE_CONFIG = {
  brandName: "Divyam Dairy Products",
  legalEntity: "Shri R.S. Enterprises",
  taglineHindi: "पक्का इरादा, शुद्धता का वादा।",
  taglineEnglish: "Pure dairy. Healthier families. A brighter tomorrow.",
  introText:
    "Divyam Dairy Products brings a range of quality dairy products — milk, ghee, chaach, khoya, paneer and dahi. With a focus on quality and consistency, we aim to make everyday dairy a trusted part of every household.",
  differentiator:
    "Our difference lies not in making exaggerated promises, but in how we approach our products — with attention to hygiene, responsible processing, quality, and the trust of the families we serve.",
  pullQuote:
    "If we wouldn't want to serve it to our own family, we wouldn't want to make it for yours.",
  quoteAuthor: "Shri R.S. Enterprises",
  yearEstablished: "2026",

  // Contact
  address: "Shri R.S. Enterprises, Saray Kaswa Z.A.I, Faridpur, Bareilly, Uttar Pradesh – 243503",
  addressShort: "Faridpur, Bareilly, Uttar Pradesh – 243503",
  phonePrimary: "8679943224",
  phoneSecondary: "8679943226",
  supportPhone: "8679943224",
  whatsappPrimary: "+91 8679943224",
  whatsappSecondary: "+91 8679943226",
  whatsappNumberDigits: "918679943224",
  email: "shrirsenterprises.divyam@gmail.com",
  timings: "6:00 AM – 10:00 PM",

  // Registrations
  fssaiNumber: "12726009000106",
  gstNumber: "09BKSPG3127R1ZE",

  // Maps and Socials
  googleMapsBusinessUrl: "https://share.google/6rJIzW1T8PTkOOn4P",
  googleMapsProfileUrl: "https://share.google/6gOsOweMdacVpitP9",
  instagramUrl: "https://www.instagram.com/divyam_dairy_products",
  facebookUrl: "https://www.facebook.com/share/19XjFiJDVh/",

  // Domain & Site
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://divyam.com",

  // Ordering & Delivery Rules
  minOrderOther: 15000, // ₹15,000 for perishable products (milk, paneer, dahi, chaach)
  minOrderGhee: 0, // No minimum for ghee
  gheeDeliveryCoverage: "All over India",
  localDeliveryAreas: [
    "Faridpur",
    "Bareilly",
    "Baheri",
    "Shahjahanpur",
    "Khudaganj",
    "Pilibhit",
    "Bisalpur",
  ],
  deliveryTiming: "Dispatch within 1 day; onward delivery time depends on destination area",
  deliveryChargesNote: "Applicable; confirmed during order confirmation",
  freshnessRule: "Perishable orders are not dispatched if transit time would approach expiry or exceed shelf life.",
  cancellationPolicy: "Orders can be cancelled only before dispatch. No replacements once delivered. For any concern or issue, please call 8679943224 immediately.",
  paymentMethods: ["UPI", "Online Payment", "Bank Transfer", "Pay on Confirmation"],
  enableOnlinePayment: false, // Flag for future payment gateway integration

  // Journey milestones (no fabricated years)
  journeyMilestones: [
    {
      step: "01",
      title: "The Beginning",
      titleHi: "शुरुआत",
      description: "Divyam Dairy Products began with the vision of building a responsible and quality-focused dairy brand for local families.",
      descriptionHi: "दिव्यम डेयरी प्रोडक्ट्स की शुरुआत परिवारों के लिए एक ज़िम्मेदार और गुणवत्ता-केंद्रित डेयरी ब्रांड बनाने के विज़न के साथ हुई।"
    },
    {
      step: "02",
      title: "Setting Up the Plant",
      titleHi: "प्लांट की स्थापना",
      description: "Our modern milk and dairy processing plant was established with hygienic machinery and testing standards to put vision into practice.",
      descriptionHi: "हमारे आधुनिक प्लांट की स्थापना की गई ताकि स्वच्छ मशीनों और परीक्षण मानकों के साथ विचार को वास्तविकता में बदला जा सके।"
    },
    {
      step: "03",
      title: "Expanding Our Product Range",
      titleHi: "उत्पाद श्रृंखला का विस्तार",
      description: "We expanded our daily product range to include Full Cream Milk, Toned Milk, Dahi, Buttermilk, Paneer, and Ghee.",
      descriptionHi: "हमने अपनी दैनिक उत्पाद श्रृंखला में फुल क्रीम दूध, टोन्ड दूध, दही, छाछ, पनीर और घी को शामिल किया।"
    },
    {
      step: "04",
      title: "2026 — Brand Launch",
      titleHi: "2026 — ब्रांड लॉन्च",
      description: "Divyam Dairy Products officially began its journey of bringing wholesome, pure dairy products to retail stores and households.",
      descriptionHi: "दिव्यम डेयरी प्रोडक्ट्स ने आधिकारिक तौर पर शुद्ध डेयरी उत्पादों को परिवारों तक पहुंचाने की अपनी यात्रा शुरू की।"
    },
    {
      step: "05",
      title: "Growing Ahead",
      titleHi: "आगे का सफर",
      description: "We continue to improve our processing standards, cold chain handling, and customer experience as a trusted household dairy partner.",
      descriptionHi: "हम हर घर के भरोसेमंद साथी बनने के लिए अपने प्रसंस्करण मानकों और सेवा में निरंतर सुधार कर रहे हैं।"
    }
  ],

  // Core Values
  brandValues: [
    {
      title: "Quality First",
      titleHi: "गुणवत्ता सर्वोपरि",
      desc: "We focus on maintaining quality throughout our production, testing, and processing.",
      descHi: "हम उत्पादन, परीक्षण और प्रसंस्करण के हर स्तर पर सख्त गुणवत्ता बनाए रखते हैं।"
    },
    {
      title: "Hygiene & Safety",
      titleHi: "स्वच्छता और सुरक्षा",
      desc: "Clean, sanitized equipment and hygienic handling are an essential part of our daily dairy operations.",
      descHi: "साफ-सुथरे उपकरण और स्वच्छ हैंडलिंग हमारे दैनिक डेयरी संचालन का मुख्य हिस्सा हैं।"
    },
    {
      title: "Honesty & Transparency",
      titleHi: "ईमानदारी और पारदर्शिता",
      desc: "We believe customers deserve clear, accurate, and honest information about the dairy they feed their families.",
      descHi: "हमारा मानना है कि परिवारों को अपने खान-पान के बारे में स्पष्ट और सच्ची जानकारी मिलनी चाहिए।"
    },
    {
      title: "Care for Families",
      titleHi: "परिवारों की देखभाल",
      desc: "Our daily approach is guided by the same care and responsibility we expect for our very own children.",
      descHi: "हमारा दृष्टिकोण उसी देखभाल से प्रेरित है जो हम अपने बच्चों के लिए चाहते हैं।"
    },
    {
      title: "Responsible Production",
      titleHi: "ज़िम्मेदार उत्पादन",
      desc: "We follow careful processing while avoiding unnecessary chemicals and preserving natural goodness.",
      descHi: "हम अनावश्यक रसायनों से बचते हुए प्राकृतिक स्वाद और पोषण को सुरक्षित रखते हैं।"
    },
    {
      title: "Continuous Improvement",
      titleHi: "निरंतर सुधार",
      desc: "We listen closely to consumer feedback, constantly refining our methods, delivery, and quality checks.",
      descHi: "हम ग्राहकों के सुझावों को ध्यान से सुनकर अपनी प्रक्रियाओं में लगातार सुधार करते हैं।"
    }
  ],

  // Why Divyam Pillars
  whyDivyamPillars: [
    {
      title: "Hygienic Processing",
      titleHi: "स्वच्छ प्रसंस्करण",
      desc: "Our products are handled and processed with meticulous attention to sanitation and hygiene.",
      descHi: "हमारे सभी उत्पाद साफ-सफाई और स्वच्छता के कड़े नियमों के तहत तैयार किए जाते हैं।"
    },
    {
      title: "Thoughtful Ingredients",
      titleHi: "प्राकृतिक सामग्री",
      desc: "We focus on pure dairy milk while avoiding unnecessary chemicals or artificial additives.",
      descHi: "हम बिना अनावश्यक रसायनों के शुद्ध दूध और प्राकृतिक अवयवों पर ध्यान केंद्रित करते हैं।"
    },
    {
      title: "Quality-Focused Approach",
      titleHi: "गुणवत्ता-केंद्रित दृष्टिकोण",
      desc: "From raw milk intake to paneer, dahi, and ghee, we inspect quality at every single processing stage.",
      descHi: "दूध की आवक से लेकर पनीर, दही और घी तैयार होने तक हर चरण पर गुणवत्ता की जांच होती है।"
    },
    {
      title: "Family-Inspired Values",
      titleHi: "पारिवारिक मूल्य",
      desc: "Divyam was created on a simple conviction: make food with the care you'd give your own children.",
      descHi: "दिव्यम की नींव इसी विश्वास पर है: भोजन उसी प्यार से बनाएं जैसे अपने बच्चों के लिए बनाते हैं।"
    },
    {
      title: "Honest & Transparent",
      titleHi: "सच्चाई और खुलापन",
      desc: "We provide honest labeling, factual standards, and complete transparency in what we offer.",
      descHi: "हम बिना बढ़ा-चढ़ा कर किए गए दावों के साथ अपने उत्पादों की सही जानकारी प्रदान करते हैं।"
    },
    {
      title: "A Growing Local Brand",
      titleHi: "विश्वसनीय स्थानीय ब्रांड",
      desc: "Rooted in Rohilkhand, we value community trust, local farmer support, and direct customer relationships.",
      descHi: "रुहेलखंड की मिट्टी से जुड़ा, स्थानीय किसानों और परिवारों के अटूट भरोसे पर आधारित ब्रांड।"
    }
  ],

  // Hygiene & Quality Practices
  hygienePractices: [
    {
      id: "01",
      title: "Daily Milk Quality Testing in Laboratory",
      titleHi: "प्रयोगशाला में दैनिक दूध परीक्षण",
      desc: "Every batch of raw milk is strictly tested in our on-site laboratory for fat, SNF, purity, and hygiene parameters before entry into the plant.",
      descHi: "प्लांट में प्रवेश से पहले प्रयोगशाला में दूध की शुद्धता, फैट और एसएनएफ की सख्त जांच की जाती है।"
    },
    {
      id: "02",
      title: "Clean & Sanitized Equipment",
      titleHi: "स्वच्छ एवं सेनिटाइज्ड उपकरण",
      desc: "All SS-304 food-grade stainless steel tanks, pipes, and pasteurizers are thoroughly cleaned and sanitized after every processing cycle.",
      descHi: "प्रत्येक चक्र के बाद सभी स्टेनलेस स्टील टैंक, पाइप और पाश्चराइज़र को अच्छी तरह से सेनिटाइज किया जाता है।"
    },
    {
      id: "03",
      title: "Daily Cleaning of Production Area",
      titleHi: "उत्पादन क्षेत्र की दैनिक स्वच्छता",
      desc: "Processing floors, tiled walls, and packaging stations are scrubbed and disinfected daily to ensure an immaculate processing atmosphere.",
      descHi: "उत्पादन स्थल, फर्श और दीवारों को रोजाना कीटाणुरहित किया जाता है ताकि पूर्ण स्वच्छता बनी रहे।"
    },
    {
      id: "04",
      title: "Hygienic Handling & Worker Protection",
      titleHi: "सुरक्षित और स्वच्छ हैंडलिंग",
      desc: "Plant operators wash and sanitize hands regularly and wear clean coats, hair nets, face masks, gloves, and protective boots.",
      descHi: "कर्मचारी नियमित हाथ धोने के साथ हेयरनेट, मास्क, एप्रन और दस्ताने पहनकर काम करते हैं।"
    },
    {
      id: "05",
      title: "Regular Machine Maintenance & Cleaning",
      titleHi: "नियमित मशीन सफाई व रखरखाव",
      desc: "Packaging machines and milk flow lines undergo scheduled daily cleaning routines to prevent residue build-up.",
      descHi: "पैकेजिंग मशीनों और फ्लो लाइनों की नियमित सफाई की जाती है ताकि शुद्धता बरकरार रहे।"
    },
    {
      id: "06",
      title: "Pest-Control Systems",
      titleHi: "कीट-नियंत्रण प्रणाली",
      desc: "Production areas are protected with insect-control systems and physical barriers to ensure no contamination from insects or pests.",
      descHi: "उत्पादन क्षेत्र को कीटों और मक्खी-मच्छरों से सुरक्षित रखने के लिए आधुनिक व्यवस्था की गई है।"
    },
    {
      id: "07",
      title: "Continuous Hygiene Monitoring",
      titleHi: "निरंतर स्वच्छता निगरानी",
      desc: "Supervisors conduct active inspections throughout production, packaging, and cold-room staging.",
      descHi: "उत्पादन से लेकर कोल्ड-स्टोरेज तक हर स्तर पर स्वच्छता की निरंतर निगरानी की जाती है।"
    }
  ]
};

export function buildWhatsAppLink(message: string, phoneDigits: string = SITE_CONFIG.whatsappNumberDigits): string {
  return `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;
}
