import { productCopy as generatedProductCopy } from "./catalogProducts";
import { extraProductCopy } from "./catalogExtras";
import { extraCopy } from "../catalogMore";
import { extraCopy2, extraCategoryCopy } from "../catalogNewCategories";

const productCopy = {
  ...generatedProductCopy,
  ...extraProductCopy,
  ...extraCopy,
  ...extraCopy2,
};

const categoryCopy = {
  electronics: {
    en: {
      label: "Electronics",
      blurb: "Phones, audio, and everyday tech built for modern life.",
    },
    fr: {
      label: "Électronique",
      blurb: "Téléphones, audio et tech du quotidien pour la vie moderne.",
    },
    es: {
      label: "Electrónica",
      blurb: "Teléfonos, audio y tecnología diaria para la vida moderna.",
    },
    de: {
      label: "Elektronik",
      blurb: "Telefone, Audio und Alltagstech für das moderne Leben.",
    },
    it: {
      label: "Elettronica",
      blurb: "Telefoni, audio e tech quotidiana per la vita moderna.",
    },
    pt: {
      label: "Eletrônicos",
      blurb: "Telefones, áudio e tech do dia a dia para a vida moderna.",
    },
    nl: {
      label: "Elektronica",
      blurb: "Telefoons, audio en alledaagse tech voor modern leven.",
    },
    pl: {
      label: "Elektronika",
      blurb: "Telefony, audio i codzienny tech do nowoczesnego życia.",
    },
    sv: {
      label: "Elektronik",
      blurb: "Telefoner, ljud och vardagsteknik för moderna liv.",
    },
    ar: {
      label: "إلكترونيات",
      blurb: "هواتف وصوتيات وتقنية يومية لحياة عصرية.",
    },
    zh: {
      label: "电子产品",
      blurb: "手机、音频与日常科技，服务现代生活。",
    },
    hi: {
      label: "इलेक्ट्रॉनिक्स",
      blurb: "फ़ोन, ऑडियो और रोज़मर्रा की तकनीक आधुनिक जीवन के लिए।",
    },
    ja: {
      label: "エレクトロニクス",
      blurb: "スマホ、オーディオ、日常テックをモダンな暮らしに。",
    },
    ko: {
      label: "전자제품",
      blurb: "폰, 오디오, 일상의 테크로 현대적인 라이프를.",
    },
  },
  "computers-accessories": {
    en: {
      label: "Computers & Accessories",
      blurb: "Laptops, peripherals, and tools for focused work.",
    },
    fr: {
      label: "Ordinateurs & accessoires",
      blurb: "Portables, périphériques et outils pour un travail concentré.",
    },
    es: {
      label: "Ordenadores y accesorios",
      blurb: "Portátiles, periféricos y herramientas para trabajar con foco.",
    },
    de: {
      label: "Computer & Zubehör",
      blurb: "Laptops, Peripherie und Tools für konzentriertes Arbeiten.",
    },
    it: {
      label: "Computer e accessori",
      blurb: "Laptop, periferiche e strumenti per lavorare con focus.",
    },
    pt: {
      label: "Computadores e acessórios",
      blurb: "Notebooks, periféricos e ferramentas para trabalho focado.",
    },
    nl: {
      label: "Computers & accessoires",
      blurb: "Laptops, randapparatuur en tools voor gefocust werk.",
    },
    pl: {
      label: "Komputery i akcesoria",
      blurb: "Laptopy, peryferia i narzędzia do skupionej pracy.",
    },
    sv: {
      label: "Datorer & tillbehör",
      blurb: "Laptops, tillbehör och verktyg för fokuserat arbete.",
    },
    ar: {
      label: "أجهزة الكمبيوتر والإكسسوارات",
      blurb: "أجهزة محمولة وملحقات وأدوات للعمل بتركيز.",
    },
    zh: {
      label: "电脑与配件",
      blurb: "笔记本、外设与专注工作的工具。",
    },
    hi: {
      label: "कंप्यूटर और एक्सेसरीज़",
      blurb: "लैपटॉप, पेरिफेरल्स और केंद्रित काम के उपकरण।",
    },
    ja: {
      label: "パソコン＆アクセサリー",
      blurb: "ノートPC、周辺機器、集中作業のためのツール。",
    },
    ko: {
      label: "컴퓨터 및 액세서리",
      blurb: "노트북, 주변기기, 집중 작업을 위한 도구.",
    },
  },
  fashion: {
    en: {
      label: "Fashion",
      blurb: "Essentials and statement pieces with clean style.",
    },
    fr: {
      label: "Mode",
      blurb: "Essentiels et pièces fortes au style épuré.",
    },
    es: {
      label: "Moda",
      blurb: "Básicos y piezas con estilo limpio.",
    },
    de: {
      label: "Mode",
      blurb: "Basics und Statement-Pieces mit klarem Stil.",
    },
    it: {
      label: "Moda",
      blurb: "Essenziali e pezzi forti dallo stile pulito.",
    },
    pt: {
      label: "Moda",
      blurb: "Essenciais e peças de destaque com estilo limpo.",
    },
    nl: {
      label: "Mode",
      blurb: "Essentials en statement pieces met een strakke stijl.",
    },
    pl: {
      label: "Moda",
      blurb: "Podstawy i wyraziste elementy w czystym stylu.",
    },
    sv: {
      label: "Mode",
      blurb: "Basplagg och statement-plagg med ren stil.",
    },
    ar: {
      label: "أزياء",
      blurb: "أساسيات وقطع مميزة بأسلوب نظيف.",
    },
    zh: {
      label: "时尚",
      blurb: "简约风格的日常单品与亮点单品。",
    },
    hi: {
      label: "फ़ैशन",
      blurb: "साफ़ स्टाइल के साथ ज़रूरी और स्टाइलिश पीस।",
    },
    ja: {
      label: "ファッション",
      blurb: "クリーンなスタイルの定番とアクセントアイテム。",
    },
    ko: {
      label: "패션",
      blurb: "깔끔한 스타일의 필수템과 포인트 아이템.",
    },
  },
  "home-kitchen": {
    en: {
      label: "Home & Kitchen",
      blurb: "Comfort, cooking, and living spaces that feel intentional.",
    },
    fr: {
      label: "Maison & cuisine",
      blurb: "Confort, cuisine et espaces de vie pensés avec soin.",
    },
    es: {
      label: "Hogar y cocina",
      blurb: "Confort, cocina y espacios pensados con intención.",
    },
    de: {
      label: "Haus & Küche",
      blurb: "Komfort, Kochen und Wohnräume mit Absicht gestaltet.",
    },
    it: {
      label: "Casa e cucina",
      blurb: "Comfort, cucina e spazi abitativi pensati con cura.",
    },
    pt: {
      label: "Casa e cozinha",
      blurb: "Conforto, culinária e espaços feitos com intenção.",
    },
    nl: {
      label: "Huis & keuken",
      blurb: "Comfort, koken en leefruimtes met intentie.",
    },
    pl: {
      label: "Dom i kuchnia",
      blurb: "Komfort, gotowanie i przestrzenie urządzone świadomie.",
    },
    sv: {
      label: "Hem & kök",
      blurb: "Komfort, matlagning och rum med avsikt.",
    },
    ar: {
      label: "المنزل والمطبخ",
      blurb: "راحة وطبخ ومساحات معيشة بتصميم واعٍ.",
    },
    zh: {
      label: "家居与厨房",
      blurb: "舒适烹饪与有意布置的生活空间。",
    },
    hi: {
      label: "घर और किचन",
      blurb: "आराम, खाना बनाना और सोच-समझकर बनाए घर।",
    },
    ja: {
      label: "ホーム＆キッチン",
      blurb: "心地よい料理と、意図ある暮らしの空間。",
    },
    ko: {
      label: "홈 & 키친",
      blurb: "편안한 요리와 의도 있는 생활 공간.",
    },
  },
  fitness: {
    en: {
      label: "Fitness",
      blurb: "Gear that keeps movement simple and consistent.",
    },
    fr: {
      label: "Fitness",
      blurb: "Équipement pour bouger simplement et régulièrement.",
    },
    es: {
      label: "Fitness",
      blurb: "Equipo para moverte de forma simple y constante.",
    },
    de: {
      label: "Fitness",
      blurb: "Equipment, das Bewegung einfach und regelmäßig hält.",
    },
    it: {
      label: "Fitness",
      blurb: "Attrezzatura per muoversi in modo semplice e costante.",
    },
    pt: {
      label: "Fitness",
      blurb: "Equipamento para se movimentar de forma simples e constante.",
    },
    nl: {
      label: "Fitness",
      blurb: "Gear dat bewegen eenvoudig en consistent houdt.",
    },
    pl: {
      label: "Fitness",
      blurb: "Sprzęt, dzięki któremu ruch jest prosty i regularny.",
    },
    sv: {
      label: "Fitness",
      blurb: "Utrustning som gör rörelse enkel och regelbunden.",
    },
    ar: {
      label: "لياقة بدنية",
      blurb: "معدات تجعل الحركة بسيطة وثابتة.",
    },
    zh: {
      label: "健身",
      blurb: "让运动更简单、更持续的装备。",
    },
    hi: {
      label: "फ़िटनेस",
      blurb: "ऐसा गियर जो मूवमेंट को आसान और नियमित रखे।",
    },
    ja: {
      label: "フィットネス",
      blurb: "運動をシンプルに続けやすくするギア。",
    },
    ko: {
      label: "피트니스",
      blurb: "움직임을 쉽고 꾸준하게 만드는 장비.",
    },
  },
  grocery: {
    en: {
      label: "Grocery",
      blurb: "Pantry staples and everyday goods, ready when you are.",
    },
    fr: {
      label: "Épicerie",
      blurb: "Produits de base et essentiels du quotidien, prêts quand vous l’êtes.",
    },
    es: {
      label: "Comestibles",
      blurb: "Despensa básica y productos diarios, listos cuando tú lo estés.",
    },
    de: {
      label: "Lebensmittel",
      blurb: "Vorrats staples und Alltagswaren, bereit wenn Sie es sind.",
    },
    it: {
      label: "Alimentari",
      blurb: "Dispensa essenziale e prodotti di ogni giorno, pronti quando lo sei tu.",
    },
    pt: {
      label: "Mercearia",
      blurb: "Itens de despensa e produtos do dia a dia, prontos quando você estiver.",
    },
    nl: {
      label: "Boodschappen",
      blurb: "Voorraadbasics en alledaagse producten, klaar wanneer jij dat bent.",
    },
    pl: {
      label: "Spożywcze",
      blurb: "Podstawy spiżarni i codzienne produkty, gotowe gdy Ty jesteś.",
    },
    sv: {
      label: "Matvaror",
      blurb: "Skafferi-basics och vardagsvaror, redo när du är det.",
    },
    ar: {
      label: "بقالة",
      blurb: "أساسيات المخزن وسلع يومية جاهزة عندما تكون أنت جاهزًا.",
    },
    zh: {
      label: "食品杂货",
      blurb: "日常囤货与生活必需，随时可用。",
    },
    hi: {
      label: "किराना",
      blurb: "पेंट्री स्टेपल और रोज़मर्रा की चीज़ें, जब आप तैयार हों।",
    },
    ja: {
      label: "食料品",
      blurb: "パントリーの定番と日常品を、あなたが必要なときに。",
    },
    ko: {
      label: "식료품",
      blurb: "팬트리 필수품과 일상 용품, 필요할 때 바로.",
    },
  },
  beauty: {
    en: {
      label: "Beauty & Personal Care",
      blurb: "Skincare, fragrance, and daily routines that feel considered.",
    },
    fr: {
      label: "Beauté & soins",
      blurb: "Soins, parfums et routines du quotidien pensés avec soin.",
    },
    es: {
      label: "Belleza y cuidado personal",
      blurb: "Cuidado de la piel, fragancias y rutinas diarias con intención.",
    },
    de: {
      label: "Beauty & Pflege",
      blurb: "Hautpflege, Düfte und Alltagsroutinen mit Bedacht.",
    },
    it: {
      label: "Bellezza e cura",
      blurb: "Skincare, profumi e routine quotidiane pensate con cura.",
    },
    pt: {
      label: "Beleza e cuidados",
      blurb: "Skincare, fragrâncias e rotinas do dia a dia com intenção.",
    },
    nl: {
      label: "Beauty & verzorging",
      blurb: "Huidverzorging, geuren en dagelijkse routines met aandacht.",
    },
    pl: {
      label: "Uroda i pielęgnacja",
      blurb: "Pielęgnacja, zapachy i codzienne rytuały z myślą o sobie.",
    },
    sv: {
      label: "Skönhet & vård",
      blurb: "Hudvård, dofter och vardagsrutiner med omtanke.",
    },
    ar: {
      label: "الجمال والعناية الشخصية",
      blurb: "عناية بالبشرة وعطور وروتين يومي مدروس.",
    },
    zh: {
      label: "美妆个护",
      blurb: "护肤、香氛与精心日常护理。",
    },
    hi: {
      label: "ब्यूटी और पर्सनल केयर",
      blurb: "स्किनकेयर, खुशबू और सोच-समझकर बना रोज़ का रूटीन।",
    },
    ja: {
      label: "ビューティー＆ケア",
      blurb: "スキンケア、フレグランス、丁寧な毎日のルーティン。",
    },
    ko: {
      label: "뷰티 & 퍼스널 케어",
      blurb: "스킨케어, 향수, 정성 있는 데일리 루틴.",
    },
  },
  "books-media": {
    en: {
      label: "Books & Media",
      blurb: "Reads, vinyl, and living-room audio for slower evenings.",
    },
    fr: {
      label: "Livres & médias",
      blurb: "Lectures, vinyle et audio salon pour des soirées plus lentes.",
    },
    es: {
      label: "Libros y medios",
      blurb: "Lectura, vinilo y audio de salón para tardes más pausadas.",
    },
    de: {
      label: "Bücher & Medien",
      blurb: "Lesen, Vinyl und Wohnzimmer-Audio für ruhigere Abende.",
    },
    it: {
      label: "Libri e media",
      blurb: "Letture, vinili e audio da salotto per sere più lente.",
    },
    pt: {
      label: "Livros e mídia",
      blurb: "Leitura, vinil e áudio de sala para noites mais calmas.",
    },
    nl: {
      label: "Boeken & media",
      blurb: "Lezen, vinyl en woonkamer-audio voor rustigere avonden.",
    },
    pl: {
      label: "Książki i media",
      blurb: "Czytanie, winyl i dźwięk do salonu na spokojniejsze wieczory.",
    },
    sv: {
      label: "Böcker & media",
      blurb: "Läsning, vinyl och vardagsrumsljud för långsammare kvällar.",
    },
    ar: {
      label: "كتب ووسائط",
      blurb: "قراءة وأسطوانات وصوت للصالون لأمسيات أهدأ.",
    },
    zh: {
      label: "图书与影音",
      blurb: "阅读、黑胶与客厅音响，适合放慢的夜晚。",
    },
    hi: {
      label: "किताबें और मीडिया",
      blurb: "पढ़ाई, विनाइल और लिविंग रूम ऑडियो शांत शामों के लिए।",
    },
    ja: {
      label: "本＆メディア",
      blurb: "読書、レコード、リビングのオーディオでゆったりした夜を。",
    },
    ko: {
      label: "도서 & 미디어",
      blurb: "독서, 바이닐, 거실 오디오로 느린 저녁을.",
    },
  },
  "toys-games": {
    en: {
      label: "Toys & Games",
      blurb: "Play, puzzles, and gifts built for kids and family nights.",
    },
    fr: {
      label: "Jeux & jouets",
      blurb: "Jeux, puzzles et cadeaux pour les enfants et les soirées en famille.",
    },
    es: {
      label: "Juguetes y juegos",
      blurb: "Juego, puzzles y regalos para niños y noches en familia.",
    },
    de: {
      label: "Spielzeug & Spiele",
      blurb: "Spielen, Puzzles und Geschenke für Kinder und Familienabende.",
    },
    it: {
      label: "Giochi e giocattoli",
      blurb: "Gioco, puzzle e regali per bambini e serate in famiglia.",
    },
    pt: {
      label: "Brinquedos e jogos",
      blurb: "Brincar, quebra-cabeças e presentes para crianças e noites em família.",
    },
    nl: {
      label: "Speelgoed & spellen",
      blurb: "Spelen, puzzels en cadeaus voor kids en familieavonden.",
    },
    pl: {
      label: "Zabawki i gry",
      blurb: "Zabawa, puzzle i prezenty dla dzieci i wieczorów rodzinnych.",
    },
    sv: {
      label: "Leksaker & spel",
      blurb: "Lek, pussel och presenter för barn och familjekvällar.",
    },
    ar: {
      label: "ألعاب وهدايا",
      blurb: "لعب وألغاز وهدايا للأطفال وليالي العائلة.",
    },
    zh: {
      label: "玩具与游戏",
      blurb: "玩耍、拼图与礼物，适合孩子和家庭之夜。",
    },
    hi: {
      label: "खिलौने और गेम्स",
      blurb: "खेल, पज़ल और तोहफे बच्चों और फैमिली नाइट्स के लिए।",
    },
    ja: {
      label: "おもちゃ＆ゲーム",
      blurb: "遊び、パズル、ギフト。子どもと家族の夜に。",
    },
    ko: {
      label: "장난감 & 게임",
      blurb: "놀이, 퍼즐, 선물. 아이와 가족 저녁에 맞게.",
    },
  },
  "pet-supplies": {
    en: {
      label: "Pet Supplies",
      blurb: "Food, comfort, and care for the animals at home.",
    },
    fr: {
      label: "Animaux",
      blurb: "Nourriture, confort et soins pour les animaux de la maison.",
    },
    es: {
      label: "Mascotas",
      blurb: "Comida, confort y cuidado para los animales de casa.",
    },
    de: {
      label: "Haustierbedarf",
      blurb: "Futter, Komfort und Pflege für die Tiere zu Hause.",
    },
    it: {
      label: "Animali",
      blurb: "Cibo, comfort e cura per gli animali di casa.",
    },
    pt: {
      label: "Pets",
      blurb: "Comida, conforto e cuidados para os animais de casa.",
    },
    nl: {
      label: "Huisdieren",
      blurb: "Voeding, comfort en verzorging voor de dieren thuis.",
    },
    pl: {
      label: "Zwierzęta",
      blurb: "Jedzenie, komfort i pielęgnacja dla zwierząt w domu.",
    },
    sv: {
      label: "Husdjursprodukter",
      blurb: "Mat, komfort och vård för djuren hemma.",
    },
    ar: {
      label: "مستلزمات الحيوانات",
      blurb: "طعام وراحة وعناية لحيوانات المنزل.",
    },
    zh: {
      label: "宠物用品",
      blurb: "家中毛孩的食物、舒适与护理。",
    },
    hi: {
      label: "पेट सप्लाईज़",
      blurb: "घर के जानवरों के लिए खाना, आराम और देखभाल।",
    },
    ja: {
      label: "ペット用品",
      blurb: "うちの子のためのフード、快適さ、ケア。",
    },
    ko: {
      label: "반려동물 용품",
      blurb: "집 동물을 위한 사료, 편안함, 케어.",
    },
  },
  ...extraCategoryCopy,
};

export function getCategoryCopy(categoryId, lang = "en") {
  const entry = categoryCopy[categoryId];
  if (!entry) return null;
  return entry[lang] || entry.en || null;
}

export function getProductCopy(productId, lang = "en") {
  const entry = productCopy[productId];
  if (!entry) return null;
  return entry[lang] || entry.en || null;
}

export function localizeCategory(category, lang = "en") {
  if (!category) return category;
  const copy = getCategoryCopy(category.id, lang);
  if (!copy) return category;
  return { ...category, label: copy.label, blurb: copy.blurb };
}

export function localizeProduct(product, lang = "en") {
  if (!product) return product;
  const copy = getProductCopy(product.id, lang);
  const category = getCategoryCopy(product.category, lang);
  return {
    ...product,
    name: copy?.name || product.name,
    description: copy?.description || product.description,
    categoryLabel: category?.label || product.categoryLabel,
  };
}

export function localizeCategories(list, lang = "en") {
  return (list || []).map((category) => localizeCategory(category, lang));
}

export function localizeProducts(list, lang = "en") {
  return (list || []).map((product) => localizeProduct(product, lang));
}

/** Search against localized name/description/category for the active language. */
export function matchesLocalizedProduct(product, query, lang = "en") {
  const q = String(query || "").trim().toLowerCase();
  if (!q) return true;
  const localized = localizeProduct(product, lang);
  return (
    localized.name.toLowerCase().includes(q) ||
    localized.description.toLowerCase().includes(q) ||
    localized.category.toLowerCase().includes(q) ||
    localized.categoryLabel.toLowerCase().includes(q) ||
    product.name.toLowerCase().includes(q) ||
    product.description.toLowerCase().includes(q)
  );
}

export function matchesLocalizedCategory(category, query, lang = "en") {
  const q = String(query || "").trim().toLowerCase();
  if (!q) return true;
  const localized = localizeCategory(category, lang);
  return (
    localized.label.toLowerCase().includes(q) ||
    localized.blurb.toLowerCase().includes(q) ||
    localized.id.toLowerCase().includes(q) ||
    category.label.toLowerCase().includes(q) ||
    category.blurb.toLowerCase().includes(q)
  );
}

export { categoryCopy, productCopy };
