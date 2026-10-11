export interface ImageMeta {
  src: string;
  alt: string;
  altHi: string;
  width: number;
  height: number;
  aspect: string;
  isReal: boolean;
}

export const IMAGES = {
  logo: {
    src: "/images/real/logo.png",
    alt: "Divyam Dairy Products Official Logo",
    altHi: "दिव्यम डेयरी प्रोडक्ट्स ऑफिशियल लोगो",
    width: 600,
    height: 380,
    aspect: "1.58",
    isReal: true
  },
  logoOnBlue: {
    src: "/images/real/logo-on-blue.jpg",
    alt: "Divyam Dairy Products Logo on Blue",
    altHi: "दिव्यम डेयरी प्रोडक्ट्स लोगो नीले बैकग्राउंड पर",
    width: 800,
    height: 450,
    aspect: "16:9",
    isReal: true
  },
  heroFarmPanorama: {
    src: "/images/generated/hero-farm-panorama.jpg",
    alt: "Cows grazing in green pastures in Rohilkhand Uttar Pradesh during golden hour",
    altHi: "रुहेलखंड उत्तर प्रदेश के हरे-भरे खेतों में सुबह चरती हुई स्वस्थ गायें",
    width: 1920,
    height: 1080,
    aspect: "16:9",
    isReal: false
  },
  heroProductPedestal: {
    src: "/images/hero/hero-all-products.jpg",
    alt: "Authentic Divyam Dairy products range: fresh milk, pure desi ghee, paneer, chaach, and dahi",
    altHi: "दिव्यम डेयरी के शुद्ध उत्पाद: ताजा दूध, देसी घी, पनीर, छाछ और दही",
    width: 1920,
    height: 1080,
    aspect: "16:9",
    isReal: true
  },
  heroFamilyMorning: {
    src: "/images/generated/hero-family-morning.jpg",
    alt: "Indian family enjoying fresh milk breakfast together at the morning table",
    altHi: "नाश्ते की मेज पर परिवार के साथ ताजे दूध का आनंद",
    width: 1920,
    height: 1080,
    aspect: "16:9",
    isReal: false
  },
  heroPlantProcess: {
    src: "/images/generated/hero-plant-process.jpg",
    alt: "Modern stainless steel milk pasteurization machinery and hygienic operators",
    altHi: "आधुनिक स्टेनलेस स्टील पाश्चराइजेशन प्लांट और स्वच्छ उपकरण",
    width: 1920,
    height: 1080,
    aspect: "16:9",
    isReal: false
  },
  heroMilkSplash: {
    src: "/images/generated/hero-milk-splash.jpg",
    alt: "Dynamic fresh white milk splash crown with crystal droplets",
    altHi: "ताजे दूध की शानदार उछाल और बूंदें",
    width: 1920,
    height: 1080,
    aspect: "16:9",
    isReal: false
  },
  deliveryTruck: {
    src: "/images/generated/delivery-truck.jpg",
    alt: "Divyam insulated refrigerated delivery mini-truck on a rural road",
    altHi: "दिव्यम इंसुलेटेड रेफ्रिजरेटेड डिलीवरी वैन",
    width: 1920,
    height: 1080,
    aspect: "16:9",
    isReal: false
  },
  qualityLabTesting: {
    src: "/images/generated/quality-lab-testing.jpg",
    alt: "Laboratory technician inspecting fresh milk quality in testing glass",
    altHi: "प्रयोगशाला में दूध की शुद्धता और गुणवत्ता की जांच",
    width: 1080,
    height: 1920,
    aspect: "9:16",
    isReal: true
  },
  processPackagingLine: {
    src: "/images/generated/process-packaging-line.jpg",
    alt: "Automated milk packaging machinery in clean environment",
    altHi: "स्वच्छ वातावरण में स्वचालित दूध पैकेजिंग लाइन",
    width: 1080,
    height: 1920,
    aspect: "9:16",
    isReal: true
  },
  realMilkPouch: {
    src: "/images/products/product-full-cream-milk.jpg",
    alt: "Authentic sealed Divyam Full Cream Milk pouch",
    altHi: "असली दिव्यम फुल क्रीम दूध का सीलबंद पाउच",
    width: 819,
    height: 1024,
    aspect: "4:5",
    isReal: true
  }
} as const;
