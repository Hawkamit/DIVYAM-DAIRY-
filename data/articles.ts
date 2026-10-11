export interface ArticleSection {
  heading: string;
  headingHi: string;
  body: string[];
  bodyHi: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  titleHi: string;
  excerpt: string;
  excerptHi: string;
  category: "Dairy Facts" | "Nutrition" | "Recipes" | "Farm" | "Health & Lifestyle" | "Our Story";
  categoryHi: string;
  date: string;
  readTime: string;
  readTimeHi: string;
  image: string;
  author: string;
  authorRole: string;
  sections: ArticleSection[];
  relatedProductSlugs: string[];
  relatedArticleSlugs: string[];
}

export const ARTICLES: Article[] = [
  {
    id: "art-how-to-store-milk",
    slug: "how-to-store-milk-safely",
    title: "How to Store Fresh Milk Safely at Home",
    titleHi: "घर पर ताजे दूध को सुरक्षित रखने के आसान व सही तरीके",
    excerpt:
      "Essential refrigeration rules, boiling tips, and vessel hygiene to keep your daily milk fresh, flavorful, and safe.",
    excerptHi:
      "दूध को खराब होने से बचाने, ताजगी बनाए रखने और सही तापमान पर स्टोर करने के व्यावहारिक सुझाव।",
    category: "Dairy Facts",
    categoryHi: "डेयरी तथ्य",
    date: "2026-10-01",
    readTime: "4 min read",
    readTimeHi: "4 मिनट पठन",
    image: "/images/products/product-full-cream-milk.jpg",
    author: "Divyam Quality Team",
    authorRole: "Food Safety & Quality Desk",
    sections: [
      {
        heading: "The Temperature Rule: Keep It Cold",
        headingHi: "तापमान का नियम: दूध को ठंडा रखें",
        body: [
          "Fresh pasteurized milk is a perishable natural food. The single most important factor in maintaining its shelf life is continuous cold storage. Place your milk pouches or boiled milk in the coldest part of your refrigerator — typically the middle or lower back shelf — rather than inside the door bins, which fluctuate in temperature every time the fridge is opened.",
          "Ideal storage temperature is between 2°C and 4°C. If milk sits on a countertop during hot summer weather, naturally occurring lactic acid bacteria multiply quickly, causing the milk to turn sour."
        ],
        bodyHi: [
          "ताजा पाश्चुरीकृत दूध एक प्राकृतिक और संवेदनशील उत्पाद है। इसे सही रखने के लिए तापमान नियंत्रण सबसे महत्वपूर्ण है। दूध के पैकेट को फ्रिज के सबसे ठंडे हिस्से में रखें।",
          "आदर्श तापमान 2°C से 4°C के बीच होना चाहिए। गर्मियों में रसोई के स्लैब पर ज्यादा देर खुला रखने से दूध तेजी से खट्टा होने लगता है।"
        ]
      },
      {
        heading: "Clean Vessels and Gentle Boiling",
        headingHi: "स्वच्छ बर्तन और उबालने का सही तरीका",
        body: [
          "Always pour milk into thoroughly washed and dried stainless steel or enamel pots. Never use vessels that previously held acidic foods or spices without a thorough soapy wash and hot water rinse.",
          "Bring the milk to a rolling boil over medium flame, stirring gently. Once it reaches a boil, simmer for one minute and turn off the heat. Allow it to cool to room temperature with a ventilated wire lid before transferring it to the refrigerator."
        ],
        bodyHi: [
          "दूध को हमेशा अच्छी तरह धुले और सूखे स्टेनलेस स्टील के बर्तनों में ही रखें।",
          "धीमी आंच पर एक उबाल आने दें और फिर गैस बंद कर दें। सामान्य तापमान पर आने के बाद ही फ्रिज में रखें।"
        ]
      },
      {
        heading: "Avoid Cross-Contamination",
        headingHi: "अन्य खाद्य पदार्थों की महक से बचाव",
        body: [
          "Dairy fats easily absorb strong ambient odors like onions, garlic, or cooked curries. Always keep milk covered with a clean lid or food-grade wrap inside the refrigerator."
        ],
        bodyHi: [
          "दूध प्याज, लहसुन या मसालों की तेज गंध को बहुत जल्दी सोख लेता है। इसलिए फ्रिज में दूध को हमेशा ढंक कर रखें।"
        ]
      }
    ],
    relatedProductSlugs: ["full-cream-milk", "toned-milk"],
    relatedArticleSlugs: ["what-does-toned-vs-full-cream-mean", "why-we-test-milk-every-day"]
  },
  {
    id: "art-toned-vs-full-cream",
    slug: "what-does-toned-vs-full-cream-mean",
    title: "Understanding Milk: What Does Toned vs Full Cream Mean?",
    titleHi: "दूध के प्रकार: फुल क्रीम और टोन्ड दूध में क्या अंतर होता है?",
    excerpt:
      "A clear guide to milk fat percentages, SNF standards, and which milk variant best suits your family's daily needs.",
    excerptHi:
      "फैट प्रतिशत, एसएनएफ के मानक और आपके परिवार के लिए कौन सा दूध सबसे बेहतर है, इसकी पूरी जानकारी।",
    category: "Nutrition",
    categoryHi: "पोषण",
    date: "2026-09-28",
    readTime: "5 min read",
    readTimeHi: "5 मिनट पठन",
    image: "/images/products/product-toned-milk.jpg",
    author: "Divyam Dairy Technical Desk",
    authorRole: "Standardization & Testing",
    sections: [
      {
        heading: "What is Milk Standardization?",
        headingHi: "दूध का मानकीकरण क्या है?",
        body: [
          "Raw milk obtained from dairy cows and buffaloes naturally fluctuates in fat content depending on season, feed, and lactation cycle. Standardization is the careful, automated dairy process of adjusting fat and solids-not-fat (SNF) to legally defined, uniform standards so consumers receive consistent taste and nutrition every day.",
          "In India, the Food Safety and Standards Authority of India (FSSAI) sets exact minimum thresholds for each category."
        ],
        bodyHi: [
          "पशुओं से मिलने वाले कच्चे दूध में मौसम और चारे के अनुसार फैट की मात्रा बदलती रहती है। मानकीकरण वह वैज्ञानिक प्रक्रिया है जिससे उपभोक्ताओं को रोज एक समान गुणवत्ता मिलती है।",
          "भारतीय खाद्य सुरक्षा मानक (FSSAI) के अनुसार सभी श्रेणियों के लिए स्पष्ट नियम तय हैं।"
        ]
      },
      {
        heading: "Full Cream Milk: 6.0% Fat / 9.0% SNF",
        headingHi: "फुल क्रीम दूध: 6.0% फैट और 9.0% एसएनएफ",
        body: [
          "Full Cream milk is rich, full-bodied, and carries a natural creamy mouthfeel. With a minimum of 6.0% fat, it forms a thick golden-white cream (malai) upon boiling.",
          "It is the preferred milk for preparing homemade sweets, kheer, paneer, rabdi, and delivering a satisfying morning beverage for growing children."
        ],
        bodyHi: [
          "फुल क्रीम दूध गाढ़ा और मलाईदार होता है। 6.0% फैट के कारण इसमें उबालने पर बढ़िया मलाई जमती है।",
          "यह बच्चों, चाय, खीर और पारंपरिक मिठाइयों के लिए आदर्श है।"
        ]
      },
      {
        heading: "Toned Milk: 3.0% Fat / 8.5% SNF",
        headingHi: "टोन्ड दूध: 3.0% फैट और 8.5% एसएनएफ",
        body: [
          "Toned milk retains the essential protein, calcium, and carbohydrates of dairy while moderating the fat level down to 3.0%.",
          "It provides a lighter, refreshing texture that digests easily. It is ideal for daily household tea, coffee, breakfast cereals, and adults monitoring their daily caloric intake."
        ],
        bodyHi: [
          "टोन्ड दूध में फैट की मात्रा 3.0% रखी जाती है, जिससे यह हल्का और सुपाच्य रहता है।",
          "यह दैनिक चाय, नाश्ते और सुपाच्य भोजन के लिए सबसे उपयुक्त विकल्प है।"
        ]
      }
    ],
    relatedProductSlugs: ["full-cream-milk", "toned-milk"],
    relatedArticleSlugs: ["how-to-store-milk-safely", "why-we-test-milk-every-day"]
  },
  {
    id: "art-why-we-test-milk",
    slug: "why-we-test-milk-every-day",
    title: "Why We Test Every Single Batch in Our Laboratory",
    titleHi: "हम अपनी प्रयोगशाला में दूध के हर बैच की जांच क्यों करते हैं?",
    excerpt:
      "Inside our daily testing protocols: how lactometers, fat testing, and hygiene checks protect your family's morning glass.",
    excerptHi:
      "हमारी दैनिक जांच प्रक्रिया: कैसे लैक्टोमीटर, फैट टेस्टिंग और स्वच्छता जांच आपके परिवार तक शुद्ध दूध पहुंचाती है।",
    category: "Farm",
    categoryHi: "फार्म व प्लांट",
    date: "2026-09-24",
    readTime: "4 min read",
    readTimeHi: "4 मिनट पठन",
    image: "/images/generated/quality-lab-testing.jpg",
    author: "R.S. Enterprises Lab",
    authorRole: "Quality Control Department",
    sections: [
      {
        heading: "The First Line of Defense: Raw Milk Intake",
        headingHi: "पहली कड़ी: कच्चे दूध की आवक पर जांच",
        body: [
          "When milk cans arrive at our Faridpur plant from local farms and trusted vendors, no batch is pumped into storage silos before laboratory verification.",
          "Our technicians immediately measure temperature, organoleptic properties (clean natural aroma and white appearance), and specific gravity using precision lactometers to confirm that no water or foreign adulterants are present."
        ],
        bodyHi: [
          "फरीदपुर स्थित प्लांट में दूध पहुंचते ही प्रयोगशाला में तुरंत जांच शुरू होती है।",
          "लैक्टोमीटर द्वारा दूध के घनत्व की जांच की जाती है ताकि किसी भी मिलावट को तुरंत रोका जा सके।"
        ]
      },
      {
        heading: "Testing for Acidity and Alcohol Stability",
        headingHi: "अम्लता और ताजगी का वैज्ञानिक परीक्षण",
        body: [
          "Fresh milk naturally has a balanced, slightly acidic pH. As milk ages or if improper cooling occurs at the collection point, acidity rises. We run rapid alcohol testing and clot-on-boiling (COB) checks to verify microbial freshness before thermal pasteurization."
        ],
        bodyHi: [
          "ताजे दूध की प्राकृतिक अम्लता को बनाए रखने के लिए अल्कोहल टेस्ट और उबालकर जांच की जाती है।"
        ]
      },
      {
        heading: "Commitment Over Marketing",
        headingHi: "विज्ञापनों से बढ़कर जिम्मेदारी",
        body: [
          "True quality in dairy is not about claiming miraculous attributes; it is about rigorous daily repetition of foundational hygiene, testing discipline, and honest rejection of sub-standard milk batches."
        ],
        bodyHi: [
          "सच्ची गुणवत्ता बड़े-बड़े दावों में नहीं, बल्कि हर दिन नियमों का पालन करने और ईमानदारी से काम करने में है।"
        ]
      }
    ],
    relatedProductSlugs: ["full-cream-milk", "toned-milk", "dahi"],
    relatedArticleSlugs: ["how-to-store-milk-safely", "from-farm-to-your-doorstep"]
  },
  {
    id: "art-ghee-in-indian-kitchen",
    slug: "ghee-in-the-indian-kitchen",
    title: "The Art of Pure Ghee: Tradition in the Indian Kitchen",
    titleHi: "भारतीय रसोई में शुद्ध देसी घी: स्वाद और परंपरा की महक",
    excerpt:
      "From simmering cream to golden granular ghee: why authentic preparation matters for cooking, festivals, and aroma.",
    excerptHi:
      "धीमी आंच पर पके दानेदार देसी घी की महक, पारंपरिक महत्व और इसके दैनिक उपयोग के बारे में।",
    category: "Recipes",
    categoryHi: "व्यंजन व परंपरा",
    date: "2026-09-20",
    readTime: "5 min read",
    readTimeHi: "5 मिनट पठन",
    image: "/images/products/product-ghee.jpg",
    author: "Divyam Culinary Team",
    authorRole: "Traditional Dairy Insights",
    sections: [
      {
        heading: "The Traditional Journey: Cream to Butter to Ghee",
        headingHi: "मलाई से मक्खन, मक्खन से घी",
        body: [
          "In the traditional Indian home, making ghee was a slow, meditative craft. At Divyam Dairy, we honor that heritage by following the authentic sequence: fresh cream is churned into white butter, which is then heated in temperature-controlled vessels to clarify the butter into golden, fragrant ghee.",
          "As the moisture gently evaporates, milk solids caramelize to a warm golden hue, creating the signature granular (danedar) mouthfeel that Indian culinary traditions revere."
        ],
        bodyHi: [
          "भारतीय घरों में घी बनाना हमेशा से एक खास कला रही है। दिव्यम में हम उसी परंपरा का सम्मान करते हुए मलाई से मक्खन और फिर धीमी आंच पर घी तैयार करते हैं।",
          "धीमी आंच पर पकने से इसमें प्राकृतिक दानेदार बनावट और सौंधी खुशबू आती है।"
        ]
      },
      {
        heading: "High Smoke Point and Everyday Cooking",
        headingHi: "दैनिक खाना पकाने में घी का उपयोग",
        body: [
          "Unlike raw butter, clarified ghee has milk solids removed, giving it a remarkably high smoke point of approximately 250°C (482°F). This makes it ideal for traditional Indian tempering (tadka) of cumin and mustard seeds, pan-frying parathas, and roasting semolina or gram flour for festive laddoos."
        ],
        bodyHi: [
          "घी का स्मोक पॉइंट बहुत अधिक होता है, जिससे दाल में जीरा-हींग का तड़का लगाने, पराठे सेंकने और हलवा बनाने में यह बिल्कुल नहीं जलता।"
        ]
      }
    ],
    relatedProductSlugs: ["ghee"],
    relatedArticleSlugs: ["paneer-at-home-five-simple-dishes", "chaach-the-everyday-cooler"]
  },
  {
    id: "art-paneer-at-home",
    slug: "paneer-at-home-five-simple-dishes",
    title: "Fresh Paneer in Everyday Cooking: 5 Wholesome Dishes",
    titleHi: "रोजाना के भोजन में ताजा पनीर: 5 स्वादिष्ट और आसान व्यंजन",
    excerpt:
      "Simple, delicious ways to incorporate fresh malai paneer into weekday family meals with authentic homestyle flavors.",
    excerptHi:
      "ताजे मलाई पनीर से घर पर झटपट बनने वाले 5 पौष्टिक और लजीज व्यंजनों की सरल विधियां।",
    category: "Recipes",
    categoryHi: "व्यंजन व रेसिपी",
    date: "2026-09-16",
    readTime: "6 min read",
    readTimeHi: "6 मिनट पठन",
    image: "/images/products/product-paneer.jpg",
    author: "Divyam Home Kitchen",
    authorRole: "Homestyle Recipes",
    sections: [
      {
        heading: "The Secret to Great Paneer: Tenderness and Freshness",
        headingHi: "सच्चे पनीर की पहचान: कोमलता और ताजगी",
        body: [
          "Good paneer should be tender to the bite yet firm enough to hold its shape when tossed in a hot pan. Fresh paneer made from pure dairy milk retains natural moisture without becoming chewy or rubbery.",
          "Here are five wholesome ways to prepare it for your family:"
        ],
        bodyHi: [
          "अच्छा पनीर वही है जो मुंह में घुल जाए लेकिन ग्रेवी में डालने पर टूटे नहीं। ताजे दूध से बना पनीर हमेशा कोमल रहता है।",
          "आइए जानें 5 आसान घरेलू तरीके:"
        ]
      },
      {
        heading: "1. Homestyle Paneer Bhurji",
        headingHi: "1. घरेलू पनीर भुर्जी",
        body: [
          "Crumble 200g of fresh Divyam Paneer. Sauté diced onions, tomatoes, green chillies, and ginger in a teaspoon of ghee. Add turmeric and salt, toss in the crumbled paneer for 2 minutes, and finish with freshly chopped coriander. Perfect with warm rotis."
        ],
        bodyHi: [
          "पनीर को हाथों से मैश करके प्याज, टमाटर, हरी मिर्च और घी के तड़के के साथ 2 मिनट भूनें। गरमा-गरम रोटियों के साथ लाजवाब।"
        ]
      },
      {
        heading: "2. Matar Paneer, 3. Paneer Paratha, 4. Tawa Tikka, 5. Palak Paneer",
        headingHi: "2. मटर पनीर, 3. पनीर पराठा, 4. तवा टिक्का, 5. पालक पनीर",
        body: [
          "Because Divyam Paneer holds its moisture, you never need to deep-fry the cubes before adding them to curries. Simply drop the raw cubes directly into your simmering curry for the last 3 minutes of cooking to keep them velvety soft."
        ],
        bodyHi: [
          "दिव्यम पनीर को ग्रेवी में डालने से पहले तलने की जरूरत नहीं होती। इसे सीधे आंच बंद करने से 3 मिनट पहले डालें, पनीर बेहद नरम रहेगा।"
        ]
      }
    ],
    relatedProductSlugs: ["paneer", "ghee"],
    relatedArticleSlugs: ["ghee-in-the-indian-kitchen", "chaach-the-everyday-cooler"]
  },
  {
    id: "art-chaach-everyday-cooler",
    slug: "chaach-the-everyday-cooler",
    title: "Chaach: The Everyday Indian Cooler and Digestive Drink",
    titleHi: "छाछ: भारतीय दोपहर का सबसे ताजगी भरा और सुपाच्य पेय",
    excerpt:
      "Why traditional churned buttermilk remains the ultimate thirst quencher and meal companion across Indian households.",
    excerptHi:
      "जानिए क्यों पारंपरिक मट्ठा और मसाला छाछ सदियों से भोजन के बाद सबसे पसंदीदा पेय रहा है।",
    category: "Dairy Facts",
    categoryHi: "डेयरी तथ्य",
    date: "2026-09-12",
    readTime: "4 min read",
    readTimeHi: "4 मिनट पठन",
    image: "/images/products/product-chaach.jpg",
    author: "Divyam Wellness Desk",
    authorRole: "Traditional Lifestyle",
    sections: [
      {
        heading: "A Natural Alternative to Sugary Drinks",
        headingHi: "मीठे पेय पदार्थों का स्वस्थ और प्राकृतिक विकल्प",
        body: [
          "During warm afternoons, packaged sodas and sugary beverages offer temporary refreshment followed by energy crashes. Traditional chaach (buttermilk) is light on the stomach, hydrating, and naturally cooling.",
          "Standardized to 3.0% fat, Divyam Chaach delivers pure dairy satisfaction with an easy-to-carry single-serve 270 ml pouch."
        ],
        bodyHi: [
          "गर्मियों में कृत्रिम कोल्ड-ड्रिंक्स के मुकाबले ताजा मट्ठा शरीर को प्राकृतिक ठंडक और ऊर्जा देता है।",
          "दिव्यम छाछ 270 मि.ली. के सुविधाजनक पाउच में रोज पीने के लिए एकदम सही है।"
        ]
      },
      {
        heading: "Plain vs Masala Chaach",
        headingHi: "सादा और मसाला छाछ का स्वाद",
        body: [
          "For those who enjoy pure cultured dairy with zero additives, Plain Chaach provides a smooth, gentle taste. For an extra kick, Masala Chaach infused with roasted cumin seeds (bhuna jeera), black salt, and spices stimulates digestion and elevates any traditional Indian thali."
        ],
        bodyHi: [
          "सादा छाछ शुद्ध और सौम्य स्वाद देती है, जबकि भुने जीरे और काले नमक वाली मसाला छाछ खाने का स्वाद कई गुना बढ़ा देती है।"
        ]
      }
    ],
    relatedProductSlugs: ["chaach", "dahi"],
    relatedArticleSlugs: ["how-to-store-milk-safely", "paneer-at-home-five-simple-dishes"]
  },
  {
    id: "art-from-farm-to-doorstep",
    slug: "from-farm-to-your-doorstep",
    title: "From Farm to Your Doorstep: The 24-Hour Dairy Journey",
    titleHi: "फार्म से आपकी दहलीज तक: 24 घंटे की शुद्धता भरी यात्रा",
    excerpt:
      "How morning milk collected from local Rohilkhand farms transforms into hygienically packed dairy in your neighborhood store.",
    excerptHi:
      "रुहेलखंड के खेतों से लेकर आपकी नजदीकी दुकान तक दूध की सुरक्षित और स्वच्छ यात्रा की पूरी कहानी।",
    category: "Farm",
    categoryHi: "फार्म व सप्लाई",
    date: "2026-09-08",
    readTime: "5 min read",
    readTimeHi: "5 मिनट पठन",
    image: "/images/generated/delivery-truck.jpg",
    author: "Divyam Operations",
    authorRole: "Supply Chain & Logistics",
    sections: [
      {
        heading: "Early Dawn Milking in Rohilkhand",
        headingHi: "भोर की शुरुआत और दूध संग्रहण",
        body: [
          "The daily cycle begins before sunrise at 5:00 AM across local dairy farms in Faridpur and nearby villages. Cattle are fed fresh green fodder, clean drinking water, and milked in clean conditions.",
          "Milk is transferred into food-grade stainless steel cans and brought immediately to our reception bay."
        ],
        bodyHi: [
          "सुबह 5:00 बजे फरीदपुर और आसपास के गांवों से यह यात्रा शुरू होती है। किसान ताजे दूध को साफ बर्तनों में भरकर प्लांट तक लाते हैं।"
        ]
      },
      {
        heading: "Automated Cold-Chain Routing",
        headingHi: "तापमान-नियंत्रित वैन द्वारा वितरण",
        body: [
          "Once pasteurized and chilled to below 4°C, products are packed into sealed pouches and transferred directly into insulated cold rooms. Our refrigerated delivery vans depart early to ensure local stores in Bareilly, Baheri, Shahjahanpur, and Faridpur receive fresh stock daily."
        ],
        bodyHi: [
          "पाश्चराइजेशन के बाद दूध को 4°C से कम तापमान पर ठंडा करके इंसुलेटेड गाड़ियों द्वारा दुकानों और परिवारों तक समय पर पहुंचाया जाता है।"
        ]
      }
    ],
    relatedProductSlugs: ["full-cream-milk", "toned-milk"],
    relatedArticleSlugs: ["why-we-test-milk-every-day", "how-to-store-milk-safely"]
  },
  {
    id: "art-why-hygiene-matters",
    slug: "why-hygiene-matters-in-dairy",
    title: "Why Hygiene Matters Most: Protecting Everyday Family Health",
    titleHi: "डेयरी में स्वच्छता क्यों सबसे महत्वपूर्ण है: परिवार की सुरक्षा",
    excerpt:
      "A look into our cleaning sanitation protocols and how clean handling shapes trustworthy milk.",
    excerptHi:
      "हमारे प्लांट की सैनिटेशन प्रक्रिया और कैसे स्वच्छ हैंडलिंग हर घूंट में शुद्धता सुनिश्चित करती है।",
    category: "Our Story",
    categoryHi: "हमारी कहानी",
    date: "2026-09-04",
    readTime: "4 min read",
    readTimeHi: "4 मिनट पठन",
    image: "/images/generated/hero-plant-process.jpg",
    author: "Shri R.S. Enterprises Founders",
    authorRole: "Founders Desk",
    sections: [
      {
        heading: "A Parent's Motivation",
        headingHi: "माता-पिता की चिंता से उपजा संकल्प",
        body: [
          "Divyam Dairy was born out of a parent's concern. When we looked at common dairy practices around us — open containers, unverified handling, and chemical adulteration headlines — we realized our children deserved better.",
          "Our foundational promise was straightforward: if we wouldn't want to serve it to our own family, we wouldn't want to make it for yours."
        ],
        bodyHi: [
          "दिव्यम डेयरी की शुरुआत एक माता-पिता के तौर पर हमारी अपनी चिंता से हुई थी। हम चाहते थे कि हमारे बच्चों को बिना मिलावट और स्वच्छ दूध मिले।",
          "हमारा संकल्प सरल है: जो हम अपने बच्चों को नहीं दे सकते, वो हम आपके परिवार के लिए कभी नहीं बनाएंगे।"
        ]
      },
      {
        heading: "Practical Hygiene Everyday",
        headingHi: "प्रतिदिन स्वच्छता का कड़ाई से पालन",
        body: [
          "Hygiene is not an occasional audit; it is a relentless daily habit. From staff washing and protective coats to daily scrubbing of vats and insect barriers, we maintain a workplace where purity is protected at every touchpoint."
        ],
        bodyHi: [
          "स्वच्छता कोई एक दिन का काम नहीं बल्कि रोज का नियम है। हाथ धोने से लेकर मशीनों की सफाई तक, हर कदम पर पूर्ण सतर्कता बरती जाती है।"
        ]
      }
    ],
    relatedProductSlugs: ["full-cream-milk", "ghee", "paneer"],
    relatedArticleSlugs: ["why-we-test-milk-every-day", "from-farm-to-your-doorstep"]
  }
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
