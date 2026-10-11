export interface DeliveryTown {
  name: string;
  nameHi: string;
  status: "home-base" | "active" | "all-india";
  note: string;
  noteHi: string;
  dispatchTime: string;
}

export const DELIVERY_TOWNS: DeliveryTown[] = [
  {
    name: "Faridpur",
    nameHi: "फरीदपुर",
    status: "home-base",
    note: "Plant Home Base — Same day & daily morning routes available.",
    noteHi: "प्लांट मुख्य केंद्र — उसी दिन व प्रतिदिन सुबह डिलीवरी उपलब्ध।",
    dispatchTime: "Same day dispatch"
  },
  {
    name: "Bareilly",
    nameHi: "बरेली",
    status: "active",
    note: "Regular daily distribution routes covering major markets and neighborhoods.",
    noteHi: "दैनिक वितरण रूट — प्रमुख बाजारों और कॉलोनियों में उपलब्ध।",
    dispatchTime: "Within 24 hours"
  },
  {
    name: "Shahjahanpur",
    nameHi: "शाहजहांपुर",
    status: "active",
    note: "Daily & scheduled delivery route from our Faridpur facility.",
    noteHi: "फरीदपुर प्लांट से प्रतिदिन व निर्धारित शेड्यूल पर डिलीवरी।",
    dispatchTime: "Within 24 hours"
  },
  {
    name: "Pilibhit",
    nameHi: "पीलीभीत",
    status: "active",
    note: "Scheduled temperature-controlled delivery vans.",
    noteHi: "तापमान-नियंत्रित वैन द्वारा निर्धारित डिलीवरी।",
    dispatchTime: "Within 24–36 hours"
  },
  {
    name: "Baheri",
    nameHi: "बहेड़ी",
    status: "active",
    note: "Scheduled distribution van routes.",
    noteHi: "निर्धारित रूट पर वैन द्वारा नियमित सप्लाई।",
    dispatchTime: "Within 24–36 hours"
  },
  {
    name: "Bisalpur",
    nameHi: "बीसलपुर",
    status: "active",
    note: "Regular supply route for stores and bulk household deliveries.",
    noteHi: "दुकानों और थोक ऑर्डरों के लिए नियमित रूट।",
    dispatchTime: "Within 24 hours"
  },
  {
    name: "Khudaganj",
    nameHi: "खुदागंज",
    status: "active",
    note: "Connected route directly adjacent to Faridpur base.",
    noteHi: "फरीदपुर केंद्र से सीधे जुड़ा दैनिक रूट।",
    dispatchTime: "Within 24 hours"
  }
];

export interface DeliveryCheckResult {
  isServiceable: boolean;
  isGheeEligible: boolean;
  town?: DeliveryTown;
  message: string;
  messageHi: string;
}

export function checkDeliveryAvailability(query: string): DeliveryCheckResult {
  const clean = query.trim().toLowerCase();
  if (!clean) {
    return {
      isServiceable: false,
      isGheeEligible: true,
      message: "Please enter your town name or PIN code.",
      messageHi: "कृपया अपने शहर का नाम दर्ज करें।"
    };
  }

  const match = DELIVERY_TOWNS.find(
    (t) =>
      t.name.toLowerCase().includes(clean) ||
      t.nameHi.includes(clean) ||
      clean.includes(t.name.toLowerCase())
  );

  if (match) {
    return {
      isServiceable: true,
      isGheeEligible: true,
      town: match,
      message: `Great news! We deliver all fresh dairy products (Milk, Dahi, Paneer, Chaach, Ghee) to ${match.name}.`,
      messageHi: `खुशखबरी! हम ${match.nameHi} में सभी ताजे डेयरी उत्पाद (दूध, दही, पनीर, छाछ, घी) डिलीवर करते हैं।`
    };
  }

  return {
    isServiceable: false,
    isGheeEligible: true,
    message: `While our fresh milk and paneer routes currently focus on Bareilly, Faridpur, and neighboring towns, our Pure Desi Ghee ships all over India! Contact us on WhatsApp for special routes.`,
    messageHi: `हमारे ताजे दूध और पनीर के रूट वर्तमान में बरेली, फरीदपुर और नजदीकी शहरों में हैं, लेकिन हमारा शुद्ध देसी घी पूरे भारत में डिलीवर होता है! विशेष ऑर्डर के लिए व्हाट्सएप पर संपर्क करें।`
  };
}
