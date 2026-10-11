export interface FAQItem {
  id: string;
  category: "products" | "ordering" | "delivery" | "quality" | "storage";
  question: string;
  questionHi: string;
  answer: string;
  answerHi: string;
}

export const FAQS: FAQItem[] = [
  {
    id: "faq-products-range",
    category: "products",
    question: "What dairy products are in the Divyam range?",
    questionHi: "दिव्यम डेयरी में कौन-कौन से उत्पाद उपलब्ध हैं?",
    answer:
      "Our core range includes Full Cream Milk (500 ml), Toned Milk (180 ml and 400 ml), Fresh Dahi Lite (180g & 350g cups, 400g pouch), Dahi in Matka, Chaach Buttermilk (270 ml Plain and Masala), Pure Desi Ghee (180 ml, 500 ml, 1 L, 15 L pipa), Fresh Malai Paneer (200g, 400g, 1kg), and Khoa / Khoya on inquiry. T-Fit Tea Special Milk is launching from November onwards.",
    answerHi:
      "हमारी श्रृंखला में फुल क्रीम दूध (500 मि.ली.), टोन्ड दूध (180 और 400 मि.ली.), ताजा दही लाइट (180 व 350 ग्राम कप, 400 ग्राम पाउच), मटका दही, छाछ (270 मि.ली. सादा व मसाला), शुद्ध देसी घी (180 मि.ली., 500 मि.ली., 1 लीटर, 15 लीटर पीपा), ताजा मलाई पनीर (200 ग्राम, 400 ग्राम, 1 किग्रा) और खोया शामिल हैं। टी-फिट चाय स्पेशल दूध नवंबर से उपलब्ध होगा।"
  },
  {
    id: "faq-milk-difference",
    category: "products",
    question: "What is the difference between Full Cream Milk and Toned Milk?",
    questionHi: "फुल क्रीम दूध और टोन्ड दूध में क्या अंतर है?",
    answer:
      "Full Cream Milk is standardized to a minimum of 6.0% milk fat and 9.0% SNF, offering a rich, thick, creamy consistency ideal for drinking, making tea, coffee, and sweets. Toned Milk is standardized to 3.0% fat and 8.5% SNF, providing a lighter, easily digestible everyday dairy milk.",
    answerHi:
      "फुल क्रीम दूध में न्यूनतम 6.0% फैट और 9.0% एसएनएफ होता है, जो चाय, कॉफी और मिठाइयों के लिए गाढ़ा और मलाईदार है। टोन्ड दूध 3.0% फैट और 8.5% एसएनएफ के साथ हल्का और सुपाच्य होता है।"
  },
  {
    id: "faq-ghee-preparation",
    category: "products",
    question: "How is Divyam Pure Desi Ghee prepared?",
    questionHi: "दिव्यम शुद्ध देसी घी कैसे तैयार किया जाता है?",
    answer:
      "Divyam Pure Desi Ghee is prepared in our hygienic plant using the authentic process: fresh dairy cream is converted into butter and then slowly simmered into pure clarified ghee using modern stainless steel machinery, ensuring authentic granular texture, golden color, and traditional aroma without artificial additives.",
    answerHi:
      "दिव्यम शुद्ध देसी घी आधुनिक स्वच्छ प्लांट में ताजा मलाई से मक्खन बनाकर और फिर धीमी आंच पर ओटाकर तैयार किया जाता है। इसमें कोई भी कृत्रिम सुगंध या मिलावट नहीं की जाती।"
  },
  {
    id: "faq-paneer-ingredients",
    category: "products",
    question: "What ingredients are used in Divyam Paneer?",
    questionHi: "दिव्यम पनीर में क्या सामग्री उपयोग की जाती है?",
    answer:
      "Our paneer is made strictly from standardized dairy milk (cow and buffalo milk) and food-grade acidity regulator (INS 270). We do not add starch, vegetable oil, or synthetic binders.",
    answerHi:
      "हमारा पनीर केवल शुद्ध मानकीकृत गाय/भैंस के दूध और खाद्य-ग्रेड नियामक (INS 270) से बनाया जाता है। इसमें कोई स्टार्च या वनस्पति वसा नहीं मिलाई जाती।"
  },
  {
    id: "faq-quality-testing",
    category: "quality",
    question: "Is Divyam milk tested for quality and adulteration before processing?",
    questionHi: "क्या प्रसंस्करण से पहले दूध की गुणवत्ता की जांच की जाती है?",
    answer:
      "Yes. Every single batch of raw milk arriving from local farms and vendors is tested daily in our on-site laboratory for purity, fat, SNF, and hygiene parameters. Only milk meeting strict standards enters our pasteurization lines.",
    answerHi:
      "हाँ, स्थानीय डेयरियों से आने वाले हर बैच की हमारे प्लांट की प्रयोगशाला में प्रतिदिन शुद्धता, फैट और एसएनएफ की जांच की जाती है। केवल मानकों पर खरा उतरने वाला दूध ही प्रोसेस होता है।"
  },
  {
    id: "faq-hygiene-measures",
    category: "quality",
    question: "What hygiene protocols are followed inside the processing plant?",
    questionHi: "प्रोसेसिंग प्लांट में स्वच्छता के क्या नियम अपनाए जाते हैं?",
    answer:
      "We practice daily equipment cleaning and sanitation of SS-304 food-grade lines, daily scrubbing of production floors, personal hygiene protocols (clean coats, hair nets, gloves, hand-sanitizing), machine cleaning routines, and electric insect-control barriers.",
    answerHi:
      "हमारे प्लांट में स्टेनलेस स्टील उपकरणों का दैनिक सेनिटाइजेशन, फर्श की गहन सफाई, कर्मचारियों के लिए हेयरनेट, मास्क, दस्ताने और कीट-नियंत्रण व्यवस्था का कड़ाई से पालन किया जाता है।"
  },
  {
    id: "faq-fssai-licence",
    category: "quality",
    question: "What is your FSSAI registration and license details?",
    questionHi: "आपकी FSSAI लाइसेंस संख्या क्या है?",
    answer:
      "Divyam Dairy Products operates under Shri R.S. Enterprises with FSSAI License Number: 12726009000106. We adhere strictly to national food safety and hygiene guidelines.",
    answerHi:
      "दिव्यम डेयरी प्रोडक्ट्स (श्री आर.एस. एंटरप्राइजेज) का FSSAI लाइसेंस नंबर 12726009000106 है। हम खाद्य सुरक्षा मानकों का पूर्ण पालन करते हैं।"
  },
  {
    id: "faq-ordering-methods",
    category: "ordering",
    question: "How can I place an order for Divyam products?",
    questionHi: "मैं दिव्यम उत्पादों का ऑर्डर कैसे दे सकता हूँ?",
    answer:
      "You can place an order directly through WhatsApp (+91 8679943224), by calling our dispatch desk (8679943224 / 8679943226), through our website inquiry forms, or using our online cart request flow.",
    answerHi:
      "आप व्हाट्सएप (+91 8679943224), फोन कॉल (8679943224 / 8679943226), वेबसाइट पूछताछ फॉर्म या ऑनलाइन कार्ट के माध्यम से आसानी से ऑर्डर दे सकते हैं।"
  },
  {
    id: "faq-min-order-rule",
    category: "ordering",
    question: "Is there a minimum order value?",
    questionHi: "क्या ऑर्डर के लिए कोई न्यूनतम मूल्य निर्धारित है?",
    answer:
      "For Pure Desi Ghee, there is NO minimum order value. For other perishable fresh products (milk, paneer, dahi, chaach), the minimum order value is ₹15,000 as configured for distribution and commercial delivery. For smaller retail quantities, please connect with our team on WhatsApp.",
    answerHi:
      "शुद्ध देसी घी के लिए कोई न्यूनतम ऑर्डर सीमा नहीं है। अन्य ताजे उत्पादों (दूध, पनीर, दही, छाछ) के लिए डिलीवरी रूट हेतु ₹15,000 का न्यूनतम ऑर्डर मान निर्धारित है। खुदरा जानकारी के लिए व्हाट्सएप पर संपर्क करें।"
  },
  {
    id: "faq-payment-methods",
    category: "ordering",
    question: "What payment methods do you accept?",
    questionHi: "भुगतान के कौन-से तरीके स्वीकार किए जाते हैं?",
    answer:
      "We accept UPI payments, online bank transfers (NEFT/RTGS/IMPS), and pay-on-order confirmation. Details are provided directly upon order verification.",
    answerHi:
      "हम यूपीआई (UPI), बैंक ट्रांसफर (NEFT/IMPS) और ऑर्डर पुष्टि पर भुगतान स्वीकार करते हैं।"
  },
  {
    id: "faq-cancellation-policy",
    category: "ordering",
    question: "What is your order cancellation policy?",
    questionHi: "ऑर्डर रद्द करने की क्या नीति है?",
    answer:
      "Orders can be cancelled free of charge if the consignment has not yet been dispatched from our plant. Since dairy products are fresh and perishable, there is no replacement once delivered. For any concerns, call customer support at 8679943224 immediately.",
    answerHi:
      "डिस्पैच होने से पहले ऑर्डर बिना किसी शुल्क के रद्द किया जा सकता है। खराब होने वाले ताजे उत्पाद होने के कारण डिलीवरी के बाद वापसी संभव नहीं है। किसी भी समस्या के लिए 8679943224 पर संपर्क करें।"
  },
  {
    id: "faq-delivery-coverage",
    category: "delivery",
    question: "Which cities and areas do you currently deliver to?",
    questionHi: "आप किन-किन शहरों में डिलीवरी करते हैं?",
    answer:
      "Our fresh daily delivery routes cover Faridpur (home base), Bareilly, Baheri, Shahjahanpur, Khudaganj, Pilibhit, and Bisalpur. Pure Desi Ghee is delivered all over India.",
    answerHi:
      "हमारे ताजे दूध और डेयरी उत्पादों के रूट फरीदपुर, बरेली, बहेड़ी, शाहजहांपुर, खुदागंज, पीलीभीत और बीसलपुर में हैं। शुद्ध देसी घी पूरे भारत में भेजा जाता है।"
  },
  {
    id: "faq-delivery-schedule",
    category: "delivery",
    question: "What is the expected delivery timing?",
    questionHi: "डिलीवरी में कितना समय लगता है?",
    answer:
      "Orders are dispatched from our plant within 1 day. Onward delivery timing depends on your specific town and route schedule.",
    answerHi:
      "ऑर्डर की पुष्टि के 1 दिन के भीतर प्लांट से माल डिस्पैच किया जाता है। डिलीवरी का समय आपके इलाके के रूट पर निर्भर करता है।"
  },
  {
    id: "faq-freshness-guarantee",
    category: "delivery",
    question: "What happens if delivery transit time approaches product expiry?",
    questionHi: "यदि डिलीवरी का समय उत्पाद की अवधि के करीब हो तो क्या होता है?",
    answer:
      "As a strict freshness rule, perishable dairy orders are not dispatched if transit times would approach expiry or exceed the product's shelf life.",
    answerHi:
      "हमारी सख्त नीति के अनुसार, यदि डिलीवरी का समय उत्पाद की शेल्फ लाइफ के करीब पहुंचता है, तो ऐसे ऑर्डर डिस्पैच नहीं किए जाते ताकि ग्राहकों को केवल ताजा माल मिले।"
  },
  {
    id: "faq-storage-shelf-life",
    category: "storage",
    question: "What is the shelf life and proper storage for Divyam Milk and Dahi?",
    questionHi: "दूध और दही की शेल्फ लाइफ कितनी है और इन्हें कैसे रखें?",
    answer:
      "Full Cream and Toned Milk have a shelf life of 3 days and should be kept refrigerated at 4°C or below. Dahi cups have a shelf life of 1 week under continuous refrigeration. Chaach has a 4-day shelf life. Pure Ghee has a 1-year shelf life in a cool, dry place.",
    answerHi:
      "दूध की शेल्फ लाइफ 3 दिन है और इसे 4°C से कम तापमान पर फ्रिज में रखना चाहिए। दही कप 1 सप्ताह तक सुरक्षित रहता है। छाछ 4 दिन और शुद्ध घी 1 वर्ष तक ठीक रहता है।"
  },
  {
    id: "faq-support-hours",
    category: "ordering",
    question: "What are your business hours and customer support contact?",
    questionHi: "कार्य समय और ग्राहक सहायता संपर्क क्या है?",
    answer:
      "Our operations run from 6:00 AM to 10:00 PM every day. For inquiries, orders, or complaints, you can call or WhatsApp our primary helpline at 8679943224 or secondary line at 8679943226.",
    answerHi:
      "हमारा कार्य समय प्रतिदिन सुबह 6:00 बजे से रात 10:00 बजे तक है। सहायता या ऑर्डर के लिए 8679943224 या 8679943226 पर कॉल या व्हाट्सएप करें।"
  }
];
