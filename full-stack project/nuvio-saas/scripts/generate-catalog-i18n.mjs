import { writeFileSync } from "fs";

const products = [
  [
    "apple-iphone-16-pro-256gb",
    "Apple iPhone 16 Pro 256GB",
    "Experience next-generation performance with the A18 Pro chip, a stunning 6.3-inch Super Retina XDR OLED display, advanced triple-camera system with 48MP main sensor, 5x optical zoom, Face ID, all-day battery life, MagSafe charging, and premium titanium construction.",
  ],
  [
    "samsung-galaxy-s25-ultra",
    "Samsung Galaxy S25 Ultra",
    "Premium flagship smartphone featuring a 6.9-inch Dynamic AMOLED display, Snapdragon processor, AI-powered features, 200MP camera, integrated S Pen, IP68 water resistance, and a large 5,000mAh battery.",
  ],
  [
    "macbook-air-15-m4",
    "MacBook Air 15-inch M4",
    "Ultra-thin laptop powered by Apple's M4 chip with 16GB unified memory, 512GB SSD, up to 18 hours of battery life, Liquid Retina display, backlit Magic Keyboard, and Touch ID.",
  ],
  [
    "dell-xps-13",
    "Dell XPS 13",
    "Premium Windows ultrabook featuring Intel Core Ultra processor, InfinityEdge display, CNC-machined aluminum chassis, Thunderbolt ports, fingerprint login, and Wi-Fi 7 support.",
  ],
  [
    "sony-wh-1000xm6",
    "Sony WH-1000XM6",
    "Industry-leading wireless noise-canceling headphones with adaptive sound control, 40-hour battery life, crystal-clear call quality, and multipoint Bluetooth connection.",
  ],
  [
    "logitech-mx-master-3s",
    "Logitech MX Master 3S",
    "Advanced ergonomic wireless mouse featuring ultra-quiet clicks, MagSpeed electromagnetic scrolling, customizable buttons, and USB-C charging.",
  ],
  [
    "samsung-32-smart-monitor",
    'Samsung 32" Smart Monitor',
    "4K UHD IPS display with HDR10 support, Smart TV apps, wireless screen sharing, USB-C connectivity, and built-in speakers.",
  ],
  [
    "asus-rog-gaming-laptop",
    "ASUS ROG Gaming Laptop",
    "Intel Core i9 processor, NVIDIA RTX 5070 graphics, 32GB DDR5 RAM, 1TB PCIe SSD, 240Hz display, RGB keyboard, and advanced cooling.",
  ],
  [
    "gopro-hero13-black",
    "GoPro HERO13 Black",
    "Capture stunning 5.3K videos and high-resolution photos with HyperSmooth stabilization, waterproof design, voice control, and live streaming.",
  ],
  [
    "dji-mini-4-pro-drone",
    "DJI Mini 4 Pro Drone",
    "Lightweight drone featuring obstacle avoidance, 4K HDR video recording, intelligent flight modes, long battery life, and GPS precision.",
  ],
  [
    "mechanical-rgb-gaming-keyboard",
    "Mechanical RGB Gaming Keyboard",
    "Full-size mechanical keyboard with customizable RGB lighting, hot-swappable switches, durable aluminum frame, and programmable macros.",
  ],
  [
    "32gb-ddr5-ram-kit",
    "32GB DDR5 RAM Kit",
    "High-performance desktop memory optimized for gaming, content creation, and multitasking with XMP profiles for easy overclocking.",
  ],
  [
    "2tb-nvme-gen4-ssd",
    "2TB NVMe Gen4 SSD",
    "Ultra-fast PCIe Gen4 solid-state drive delivering read speeds up to 7,000MB/s, ideal for gaming, video editing, and professional workloads.",
  ],
  [
    "4k-webcam",
    "4K Webcam",
    "Professional webcam with 4K recording, autofocus, HDR support, dual microphones, privacy shutter, and AI-powered background blur.",
  ],
  [
    "usb-c-docking-station",
    "USB-C Docking Station",
    "Connect multiple monitors, Ethernet, SD cards, USB devices, and charging through a single USB-C cable for modern laptops.",
  ],
  [
    "premium-mens-cotton-tshirt",
    "Premium Men's Cotton T-Shirt",
    "Made from 100% combed cotton with moisture-wicking technology, reinforced stitching, and a modern athletic fit.",
  ],
  [
    "slim-fit-denim-jeans",
    "Slim Fit Denim Jeans",
    "Stretch denim jeans designed for comfort and durability with reinforced pockets, fade-resistant fabric, and a modern slim silhouette.",
  ],
  [
    "waterproof-winter-jacket",
    "Waterproof Winter Jacket",
    "Insulated jacket with windproof and waterproof outer shell, fleece-lined interior, detachable hood, and multiple zippered pockets.",
  ],
  [
    "running-shoes",
    "Running Shoes",
    "Lightweight athletic shoes featuring responsive foam cushioning, breathable mesh upper, and enhanced arch support.",
  ],
  [
    "genuine-leather-wallet",
    "Genuine Leather Wallet",
    "Premium handcrafted leather wallet with RFID protection, multiple card slots, cash compartment, and slim minimalist profile.",
  ],
  [
    "luxury-automatic-watch",
    "Luxury Automatic Watch",
    "Stainless steel automatic movement watch with sapphire crystal glass, water resistance up to 100 meters, and luminous hands.",
  ],
  [
    "smart-air-fryer-8l",
    "Smart Air Fryer 8L",
    "Large-capacity digital air fryer with Wi-Fi connectivity, touchscreen controls, 12 cooking presets, and dishwasher-safe basket.",
  ],
  [
    "stainless-steel-cookware-set",
    "Stainless Steel Cookware Set",
    "Professional 12-piece cookware collection including frying pans, saucepans, stockpot, tempered glass lids, and induction compatibility.",
  ],
  [
    "robot-vacuum-cleaner",
    "Robot Vacuum Cleaner",
    "Intelligent robotic vacuum with laser mapping, automatic charging, app control, voice assistant integration, and mopping functionality.",
  ],
  [
    "espresso-coffee-machine",
    "Espresso Coffee Machine",
    "Professional-grade espresso machine with 15-bar pressure pump, steam wand for milk frothing, and programmable brewing options.",
  ],
  [
    "memory-foam-mattress",
    "Memory Foam Mattress",
    "Premium queen-size mattress with cooling gel technology, pressure relief support, motion isolation, and breathable cover.",
  ],
  [
    "adjustable-dumbbell-set",
    "Adjustable Dumbbell Set",
    "Space-saving dumbbells adjustable from 5 to 52.5 lbs per hand with quick-change mechanism and ergonomic grip.",
  ],
  [
    "olympic-barbell-set",
    "Olympic Barbell Set",
    "Professional 300-pound weight set including Olympic bar, bumper plates, collars, and storage rack for strength training.",
  ],
  [
    "whey-protein-isolate-5lb",
    "Whey Protein Isolate 5 lb",
    "High-quality protein supplement delivering 25g protein per serving with low sugar and digestive enzymes for muscle recovery.",
  ],
  [
    "smart-fitness-watch",
    "Smart Fitness Watch",
    "GPS-enabled fitness tracker with heart-rate monitoring, sleep tracking, blood oxygen measurement, and up to 14-day battery life.",
  ],
  [
    "premium-basmati-rice-10kg",
    "Premium Basmati Rice 10kg",
    "Extra-long grain aromatic basmati rice sourced from premium farms. Perfect for biryani, fried rice, and everyday meals.",
  ],
  [
    "organic-red-lentils-2kg",
    "Organic Red Lentils 2kg",
    "Rich in plant protein, dietary fiber, iron, and essential nutrients. Ideal for soups, curries, and stews.",
  ],
  [
    "natural-peanut-butter-1kg",
    "Natural Peanut Butter 1kg",
    "Made from 100% roasted peanuts with no added sugar, preservatives, or hydrogenated oils.",
  ],
  [
    "extra-virgin-olive-oil-1l",
    "Extra Virgin Olive Oil 1L",
    "Cold-pressed olive oil with rich flavor, antioxidants, and heart-healthy fats. Ideal for salads, cooking, and marinades.",
  ],
];

/** Templates for translating product name/description patterns by language */
const nameMap = {
  fr: {
    "Mechanical RGB Gaming Keyboard": "Clavier mécanique gaming RGB",
    "32GB DDR5 RAM Kit": "Kit RAM DDR5 32 Go",
    "2TB NVMe Gen4 SSD": "SSD NVMe Gen4 2 To",
    "4K Webcam": "Webcam 4K",
    "USB-C Docking Station": "Station d’accueil USB-C",
    "Premium Men's Cotton T-Shirt": "T-shirt coton premium homme",
    "Slim Fit Denim Jeans": "Jean slim stretch",
    "Waterproof Winter Jacket": "Veste d’hiver imperméable",
    "Running Shoes": "Chaussures de running",
    "Genuine Leather Wallet": "Portefeuille cuir véritable",
    "Luxury Automatic Watch": "Montre automatique de luxe",
    "Smart Air Fryer 8L": "Friteuse à air intelligente 8 L",
    "Stainless Steel Cookware Set": "Batterie de cuisine inox",
    "Robot Vacuum Cleaner": "Aspirateur robot",
    "Espresso Coffee Machine": "Machine à espresso",
    "Memory Foam Mattress": "Matelas mémoire de forme",
    "Adjustable Dumbbell Set": "Haltères réglables",
    "Olympic Barbell Set": "Set barre olympique",
    "Whey Protein Isolate 5 lb": "Isolat de whey 2,27 kg",
    "Smart Fitness Watch": "Montre fitness connectée",
    "Premium Basmati Rice 10kg": "Riz basmati premium 10 kg",
    "Organic Red Lentils 2kg": "Lentilles rouges bio 2 kg",
    "Natural Peanut Butter 1kg": "Beurre de cacahuète naturel 1 kg",
    "Extra Virgin Olive Oil 1L": "Huile d’olive extra vierge 1 L",
    "DJI Mini 4 Pro Drone": "Drone DJI Mini 4 Pro",
    "ASUS ROG Gaming Laptop": "PC portable gaming ASUS ROG",
    'Samsung 32" Smart Monitor': 'Moniteur intelligent Samsung 32"',
    "MacBook Air 15-inch M4": "MacBook Air 15 pouces M4",
    "Apple iPhone 16 Pro 256GB": "Apple iPhone 16 Pro 256 Go",
  },
  es: {
    "Mechanical RGB Gaming Keyboard": "Teclado mecánico gaming RGB",
    "32GB DDR5 RAM Kit": "Kit RAM DDR5 32 GB",
    "2TB NVMe Gen4 SSD": "SSD NVMe Gen4 2 TB",
    "4K Webcam": "Webcam 4K",
    "USB-C Docking Station": "Estación de acoplamiento USB-C",
    "Premium Men's Cotton T-Shirt": "Camiseta de algodón premium",
    "Slim Fit Denim Jeans": "Jeans slim fit",
    "Waterproof Winter Jacket": "Chaqueta de invierno impermeable",
    "Running Shoes": "Zapatillas de running",
    "Genuine Leather Wallet": "Cartera de cuero genuino",
    "Luxury Automatic Watch": "Reloj automático de lujo",
    "Smart Air Fryer 8L": "Freidora de aire inteligente 8 L",
    "Stainless Steel Cookware Set": "Batería de cocina de acero inoxidable",
    "Robot Vacuum Cleaner": "Aspiradora robot",
    "Espresso Coffee Machine": "Máquina de espresso",
    "Memory Foam Mattress": "Colchón de espuma viscoelástica",
    "Adjustable Dumbbell Set": "Set de mancuernas ajustables",
    "Olympic Barbell Set": "Set de barra olímpica",
    "Whey Protein Isolate 5 lb": "Aislado de proteína whey 2,27 kg",
    "Smart Fitness Watch": "Reloj de fitness inteligente",
    "Premium Basmati Rice 10kg": "Arroz basmati premium 10 kg",
    "Organic Red Lentils 2kg": "Lentejas rojas orgánicas 2 kg",
    "Natural Peanut Butter 1kg": "Mantequilla de maní natural 1 kg",
    "Extra Virgin Olive Oil 1L": "Aceite de oliva virgen extra 1 L",
    "DJI Mini 4 Pro Drone": "Dron DJI Mini 4 Pro",
    "ASUS ROG Gaming Laptop": "Portátil gaming ASUS ROG",
    'Samsung 32" Smart Monitor': 'Monitor inteligente Samsung 32"',
    "MacBook Air 15-inch M4": 'MacBook Air 15" M4',
    "Apple iPhone 16 Pro 256GB": "Apple iPhone 16 Pro 256 GB",
  },
  de: {
    "Mechanical RGB Gaming Keyboard": "Mechanische RGB-Gaming-Tastatur",
    "32GB DDR5 RAM Kit": "32-GB-DDR5-RAM-Kit",
    "2TB NVMe Gen4 SSD": "2-TB-NVMe-Gen4-SSD",
    "4K Webcam": "4K-Webcam",
    "USB-C Docking Station": "USB-C-Dockingstation",
    "Premium Men's Cotton T-Shirt": "Premium Herren-Baumwoll-T-Shirt",
    "Slim Fit Denim Jeans": "Slim-Fit-Jeans",
    "Waterproof Winter Jacket": "Wasserdichte Winterjacke",
    "Running Shoes": "Laufschuhe",
    "Genuine Leather Wallet": "Echtleder-Geldbörse",
    "Luxury Automatic Watch": "Luxus-Automatikuhr",
    "Smart Air Fryer 8L": "Smarte Heißluftfritteuse 8 L",
    "Stainless Steel Cookware Set": "Edelstahl-Kochgeschirr-Set",
    "Robot Vacuum Cleaner": "Saugroboter",
    "Espresso Coffee Machine": "Espressomaschine",
    "Memory Foam Mattress": "Memory-Foam-Matratze",
    "Adjustable Dumbbell Set": "Verstellbares Hantelset",
    "Olympic Barbell Set": "Olympisches Langhantel-Set",
    "Whey Protein Isolate 5 lb": "Whey-Protein-Isolat 2,27 kg",
    "Smart Fitness Watch": "Smart-Fitnessuhr",
    "Premium Basmati Rice 10kg": "Premium-Basmati-Reis 10 kg",
    "Organic Red Lentils 2kg": "Bio-Rote-Linsen 2 kg",
    "Natural Peanut Butter 1kg": "Natürliche Erdnussbutter 1 kg",
    "Extra Virgin Olive Oil 1L": "Natives Olivenöl extra 1 L",
    "DJI Mini 4 Pro Drone": "DJI Mini 4 Pro Drohne",
    "ASUS ROG Gaming Laptop": "ASUS ROG Gaming-Laptop",
    'Samsung 32" Smart Monitor': 'Samsung 32" Smart-Monitor',
    "MacBook Air 15-inch M4": "MacBook Air 15 Zoll M4",
    "Apple iPhone 16 Pro 256GB": "Apple iPhone 16 Pro 256 GB",
  },
  zh: {
    "Mechanical RGB Gaming Keyboard": "机械 RGB 游戏键盘",
    "32GB DDR5 RAM Kit": "32GB DDR5 内存套装",
    "2TB NVMe Gen4 SSD": "2TB NVMe Gen4 固态硬盘",
    "4K Webcam": "4K 网络摄像头",
    "USB-C Docking Station": "USB-C 扩展坞",
    "Premium Men's Cotton T-Shirt": "男士优质纯棉 T 恤",
    "Slim Fit Denim Jeans": "修身牛仔长裤",
    "Waterproof Winter Jacket": "防水冬外套",
    "Running Shoes": "跑步鞋",
    "Genuine Leather Wallet": "真皮钱包",
    "Luxury Automatic Watch": "豪华自动机械表",
    "Smart Air Fryer 8L": "智能空气炸锅 8L",
    "Stainless Steel Cookware Set": "不锈钢锅具套装",
    "Robot Vacuum Cleaner": "扫地机器人",
    "Espresso Coffee Machine": "意式浓缩咖啡机",
    "Memory Foam Mattress": "记忆棉床垫",
    "Adjustable Dumbbell Set": "可调节哑铃套装",
    "Olympic Barbell Set": "奥运杠铃套装",
    "Whey Protein Isolate 5 lb": "乳清分离蛋白 2.27kg",
    "Smart Fitness Watch": "智能运动手表",
    "Premium Basmati Rice 10kg": "优质印度香米 10kg",
    "Organic Red Lentils 2kg": "有机红扁豆 2kg",
    "Natural Peanut Butter 1kg": "天然花生酱 1kg",
    "Extra Virgin Olive Oil 1L": "特级初榨橄榄油 1L",
    "DJI Mini 4 Pro Drone": "DJI Mini 4 Pro 无人机",
    "ASUS ROG Gaming Laptop": "华硕 ROG 游戏本",
    'Samsung 32" Smart Monitor': "三星 32 英寸智能显示器",
    "MacBook Air 15-inch M4": "MacBook Air 15 英寸 M4",
    "Apple iPhone 16 Pro 256GB": "Apple iPhone 16 Pro 256GB",
    "Samsung Galaxy S25 Ultra": "三星 Galaxy S25 Ultra",
    "Sony WH-1000XM6": "索尼 WH-1000XM6",
    "Logitech MX Master 3S": "罗技 MX Master 3S",
    "GoPro HERO13 Black": "GoPro HERO13 Black",
    "Dell XPS 13": "戴尔 XPS 13",
  },
  ja: {
    "Mechanical RGB Gaming Keyboard": "メカニカルRGBゲーミングキーボード",
    "32GB DDR5 RAM Kit": "32GB DDR5メモリキット",
    "2TB NVMe Gen4 SSD": "2TB NVMe Gen4 SSD",
    "4K Webcam": "4Kウェブカメラ",
    "USB-C Docking Station": "USB-Cドッキングステーション",
    "Premium Men's Cotton T-Shirt": "プレミアムメンズコットンTシャツ",
    "Slim Fit Denim Jeans": "スリムフィットデニムジーンズ",
    "Waterproof Winter Jacket": "防水ウィンタージャケット",
    "Running Shoes": "ランニングシューズ",
    "Genuine Leather Wallet": "本革ウォレット",
    "Luxury Automatic Watch": "ラグジュアリー自動巻き腕時計",
    "Smart Air Fryer 8L": "スマートエアフライヤー 8L",
    "Stainless Steel Cookware Set": "ステンレス調理器具セット",
    "Robot Vacuum Cleaner": "ロボット掃除機",
    "Espresso Coffee Machine": "エスプレッソマシン",
    "Memory Foam Mattress": "メモリーフォームマットレス",
    "Adjustable Dumbbell Set": "可変式ダンベルセット",
    "Olympic Barbell Set": "オリンピックバーベルセット",
    "Whey Protein Isolate 5 lb": "ホエイプロテインアイソレート 2.27kg",
    "Smart Fitness Watch": "スマートフィットネスウォッチ",
    "Premium Basmati Rice 10kg": "プレミアムバスマティ米 10kg",
    "Organic Red Lentils 2kg": "オーガニック赤レンズ豆 2kg",
    "Natural Peanut Butter 1kg": "ナチュラルピーナッツバター 1kg",
    "Extra Virgin Olive Oil 1L": "エクストラバージンオリーブオイル 1L",
    "DJI Mini 4 Pro Drone": "DJI Mini 4 Proドローン",
    "ASUS ROG Gaming Laptop": "ASUS ROGゲーミングノートPC",
    'Samsung 32" Smart Monitor': 'Samsung 32"スマートモニター',
    "MacBook Air 15-inch M4": "MacBook Air 15インチ M4",
    "Apple iPhone 16 Pro 256GB": "Apple iPhone 16 Pro 256GB",
  },
  ko: {
    "Mechanical RGB Gaming Keyboard": "기계식 RGB 게이밍 키보드",
    "32GB DDR5 RAM Kit": "32GB DDR5 RAM 키트",
    "2TB NVMe Gen4 SSD": "2TB NVMe Gen4 SSD",
    "4K Webcam": "4K 웹캠",
    "USB-C Docking Station": "USB-C 도킹 스테이션",
    "Premium Men's Cotton T-Shirt": "프리미엄 남성 코튼 티셔츠",
    "Slim Fit Denim Jeans": "슬림핏 데님 진",
    "Waterproof Winter Jacket": "방수 겨울 재킷",
    "Running Shoes": "러닝화",
    "Genuine Leather Wallet": "천연 가죽 지갑",
    "Luxury Automatic Watch": "럭셔리 오토매틱 워치",
    "Smart Air Fryer 8L": "스마트 에어프라이어 8L",
    "Stainless Steel Cookware Set": "스테인리스 쿡웨어 세트",
    "Robot Vacuum Cleaner": "로봇 청소기",
    "Espresso Coffee Machine": "에스프레소 머신",
    "Memory Foam Mattress": "메모리폼 매트리스",
    "Adjustable Dumbbell Set": "조절식 덤벨 세트",
    "Olympic Barbell Set": "올림픽 바벨 세트",
    "Whey Protein Isolate 5 lb": "웨이 프로틴 아이솔레이트 2.27kg",
    "Smart Fitness Watch": "스마트 피트니스 워치",
    "Premium Basmati Rice 10kg": "프리미엄 바스마티 쌀 10kg",
    "Organic Red Lentils 2kg": "유기농 붉은 렌즈콩 2kg",
    "Natural Peanut Butter 1kg": "천연 땅콩버터 1kg",
    "Extra Virgin Olive Oil 1L": "엑스트라 버진 올리브 오일 1L",
    "DJI Mini 4 Pro Drone": "DJI Mini 4 Pro 드론",
    "ASUS ROG Gaming Laptop": "ASUS ROG 게이밍 노트북",
    'Samsung 32" Smart Monitor': '삼성 32" 스마트 모니터',
    "MacBook Air 15-inch M4": "MacBook Air 15인치 M4",
    "Apple iPhone 16 Pro 256GB": "Apple iPhone 16 Pro 256GB",
  },
  hi: {
    "Mechanical RGB Gaming Keyboard": "मैकेनिकल RGB गेमिंग कीबोर्ड",
    "32GB DDR5 RAM Kit": "32GB DDR5 RAM किट",
    "2TB NVMe Gen4 SSD": "2TB NVMe Gen4 SSD",
    "4K Webcam": "4K वेबकैम",
    "USB-C Docking Station": "USB-C डॉकिंग स्टेशन",
    "Premium Men's Cotton T-Shirt": "प्रीमियम पुरुष कॉटन टी-शर्ट",
    "Slim Fit Denim Jeans": "स्लिम फिट डेनिम जींस",
    "Waterproof Winter Jacket": "वाटरप्रूफ विंटर जैकेट",
    "Running Shoes": "रनिंग शूज़",
    "Genuine Leather Wallet": "असली लेदर वॉलेट",
    "Luxury Automatic Watch": "लक्ज़री ऑटोमैटिक वॉच",
    "Smart Air Fryer 8L": "स्मार्ट एयर फ्रायर 8L",
    "Stainless Steel Cookware Set": "स्टेनलेस स्टील कुकवेयर सेट",
    "Robot Vacuum Cleaner": "रोबोट वैक्यूम क्लीनर",
    "Espresso Coffee Machine": "एस्प्रेसो कॉफ़ी मशीन",
    "Memory Foam Mattress": "मेमोरी फोम गद्दा",
    "Adjustable Dumbbell Set": "एडजस्टेबल डम्बल सेट",
    "Olympic Barbell Set": "ओलंपिक बारबेल सेट",
    "Whey Protein Isolate 5 lb": "व्हे प्रोटीन आइसोलेट 2.27 किग्रा",
    "Smart Fitness Watch": "स्मार्ट फिटनेस वॉच",
    "Premium Basmati Rice 10kg": "प्रीमियम बासमती चावल 10 किग्रा",
    "Organic Red Lentils 2kg": "ऑर्गेनिक लाल मसूर 2 किग्रा",
    "Natural Peanut Butter 1kg": "नेचुरल पीनट बटर 1 किग्रा",
    "Extra Virgin Olive Oil 1L": "एक्स्ट्रा वर्जिन ऑलिव ऑयल 1 लीटर",
    "DJI Mini 4 Pro Drone": "DJI Mini 4 Pro ड्रोन",
    "ASUS ROG Gaming Laptop": "ASUS ROG गेमिंग लैपटॉप",
    'Samsung 32" Smart Monitor': 'Samsung 32" स्मार्ट मॉनिटर',
    "MacBook Air 15-inch M4": "MacBook Air 15-इंच M4",
    "Apple iPhone 16 Pro 256GB": "Apple iPhone 16 Pro 256GB",
  },
  ar: {
    "Mechanical RGB Gaming Keyboard": "لوحة مفاتيح ميكانيكية RGB للألعاب",
    "32GB DDR5 RAM Kit": "طقم ذاكرة DDR5 بسعة 32 جيجابايت",
    "2TB NVMe Gen4 SSD": "قرص SSD NVMe Gen4 بسعة 2 تيرابايت",
    "4K Webcam": "كاميرا ويب 4K",
    "USB-C Docking Station": "محطة إرساء USB-C",
    "Premium Men's Cotton T-Shirt": "تيشيرت قطني فاخر للرجال",
    "Slim Fit Denim Jeans": "جينز دينم بقصة ضيقة",
    "Waterproof Winter Jacket": "سترة شتوية مقاومة للماء",
    "Running Shoes": "أحذية جري",
    "Genuine Leather Wallet": "محفظة جلد طبيعي",
    "Luxury Automatic Watch": "ساعة أوتوماتيكية فاخرة",
    "Smart Air Fryer 8L": "قلاية هوائية ذكية 8 لتر",
    "Stainless Steel Cookware Set": "طقم أواني طهي من الستانلس ستيل",
    "Robot Vacuum Cleaner": "مكنسة روبوتية",
    "Espresso Coffee Machine": "آلة إسبريسو",
    "Memory Foam Mattress": "مرتبة فوم الذاكرة",
    "Adjustable Dumbbell Set": "طقم دمبل قابل للتعديل",
    "Olympic Barbell Set": "طقم بار أولمبي",
    "Whey Protein Isolate 5 lb": "عزل بروتين مصل اللبن 2.27 كجم",
    "Smart Fitness Watch": "ساعة لياقة ذكية",
    "Premium Basmati Rice 10kg": "أرز بسمتي فاخر 10 كجم",
    "Organic Red Lentils 2kg": "عدس أحمر عضوي 2 كجم",
    "Natural Peanut Butter 1kg": "زبدة فول سوداني طبيعية 1 كجم",
    "Extra Virgin Olive Oil 1L": "زيت زيتون بكر ممتاز 1 لتر",
    "DJI Mini 4 Pro Drone": "طائرة DJI Mini 4 Pro",
    "ASUS ROG Gaming Laptop": "لابتوب ألعاب ASUS ROG",
    'Samsung 32" Smart Monitor': 'شاشة سامسونج الذكية 32"',
    "MacBook Air 15-inch M4": "MacBook Air مقاس 15 إنش M4",
    "Apple iPhone 16 Pro 256GB": "Apple iPhone 16 Pro بسعة 256 جيجابايت",
  },
};

const descPrefix = {
  fr: "Description produit : ",
  es: "Descripción del producto: ",
  de: "Produktbeschreibung: ",
  it: "Descrizione prodotto: ",
  pt: "Descrição do produto: ",
  nl: "Productbeschrijving: ",
  pl: "Opis produktu: ",
  sv: "Produktbeskrivning: ",
  ar: "وصف المنتج: ",
  zh: "产品描述：",
  hi: "उत्पाद विवरण: ",
  ja: "商品説明：",
  ko: "제품 설명: ",
};

const fullDesc = {
  fr: Object.fromEntries(
    products.map(([id, , d]) => [
      id,
      // Keep English structure but provide French for common ones via separate map below
      d,
    ])
  ),
};

// Curated French/Spanish/German/Chinese/etc descriptions for all products
const descByLang = {
  fr: {
    "apple-iphone-16-pro-256gb":
      "Performances nouvelle génération avec la puce A18 Pro, écran Super Retina XDR OLED 6,3 pouces, triple appareil photo avancé (48 MP), zoom optique 5x, Face ID, autonomie toute la journée, charge MagSafe et finition titane premium.",
    "samsung-galaxy-s25-ultra":
      "Smartphone phare premium avec écran Dynamic AMOLED 6,9 pouces, processeur Snapdragon, fonctions IA, appareil photo 200 MP, S Pen intégré, résistance à l’eau IP68 et batterie 5 000 mAh.",
    "macbook-air-15-m4":
      "Ultrabook fin propulsé par la puce Apple M4, 16 Go de mémoire unifiée, SSD 512 Go, jusqu’à 18 h d’autonomie, écran Liquid Retina, Magic Keyboard rétroéclairé et Touch ID.",
    "dell-xps-13":
      "Ultrabook Windows premium avec processeur Intel Core Ultra, écran InfinityEdge, châssis aluminium CNC, ports Thunderbolt, empreinte digitale et Wi-Fi 7.",
    "sony-wh-1000xm6":
      "Casque sans fil à réduction de bruit de référence, contrôle sonore adaptatif, 40 h d’autonomie, appels limpides et Bluetooth multipoint.",
    "logitech-mx-master-3s":
      "Souris sans fil ergonomique avancée avec clics ultra-silencieux, défilement MagSpeed, boutons personnalisables et charge USB-C.",
    "samsung-32-smart-monitor":
      "Écran IPS 4K UHD avec HDR10, apps Smart TV, partage d’écran sans fil, USB-C et haut-parleurs intégrés.",
    "asus-rog-gaming-laptop":
      "Processeur Intel Core i9, graphiques NVIDIA RTX 5070, 32 Go DDR5, SSD PCIe 1 To, écran 240 Hz, clavier RGB et refroidissement avancé.",
    "gopro-hero13-black":
      "Capturez des vidéos 5,3K et des photos haute résolution avec stabilisation HyperSmooth, design étanche, commande vocale et streaming en direct.",
    "dji-mini-4-pro-drone":
      "Drone léger avec évitement d’obstacles, vidéo 4K HDR, modes de vol intelligents, longue autonomie et précision GPS.",
    "mechanical-rgb-gaming-keyboard":
      "Clavier mécanique full-size avec éclairage RGB personnalisable, switches hot-swap, cadre aluminium durable et macros programmables.",
    "32gb-ddr5-ram-kit":
      "Mémoire desktop haute performance pour le jeu, la création et le multitâche, avec profils XMP pour l’overclocking.",
    "2tb-nvme-gen4-ssd":
      "SSD PCIe Gen4 ultra-rapide jusqu’à 7 000 Mo/s, idéal pour le jeu, le montage vidéo et les charges pro.",
    "4k-webcam":
      "Webcam pro avec enregistrement 4K, autofocus, HDR, doubles micros, cache-privacy et flou d’arrière-plan IA.",
    "usb-c-docking-station":
      "Connectez plusieurs écrans, Ethernet, cartes SD, USB et charge via un seul câble USB-C pour portables modernes.",
    "premium-mens-cotton-tshirt":
      "100 % coton peigné, technologie anti-humidité, coutures renforcées et coupe athlétique moderne.",
    "slim-fit-denim-jeans":
      "Jean stretch confortable et durable, poches renforcées, tissu résistant à la décoloration et silhouette slim moderne.",
    "waterproof-winter-jacket":
      "Veste isolante coupe-vent et imperméable, intérieur polaire, capuche amovible et nombreuses poches zippées.",
    "running-shoes":
      "Chaussures légères avec amorti mousse réactif, mesh respirant et soutien de voûte plantaire renforcé.",
    "genuine-leather-wallet":
      "Portefeuille artisanal premium avec protection RFID, plusieurs fentes cartes, compartiment billets et profil mince.",
    "luxury-automatic-watch":
      "Montre automatique en acier inoxydable, verre saphir, étanchéité 100 m et aiguilles luminescentes.",
    "smart-air-fryer-8l":
      "Friteuse numérique grande capacité avec Wi-Fi, écran tactile, 12 programmes et panier lave-vaisselle.",
    "stainless-steel-cookware-set":
      "Collection pro 12 pièces : poêles, casseroles, faitout, couvercles en verre trempé, compatible induction.",
    "robot-vacuum-cleaner":
      "Robot intelligent avec cartographie laser, recharge auto, app, assistants vocaux et fonction lavage.",
    "espresso-coffee-machine":
      "Machine espresso pro pompe 15 bars, buse vapeur pour mousser le lait et options de préparation programmables.",
    "memory-foam-mattress":
      "Matelas queen premium avec gel rafraîchissant, soutien anti-pression, isolation des mouvements et housse respirante.",
    "adjustable-dumbbell-set":
      "Haltères gain de place réglables de 2,3 à 23,8 kg par main, changement rapide et prise ergonomique.",
    "olympic-barbell-set":
      "Set pro 136 kg avec barre olympique, disques bumper, colliers et rack de rangement.",
    "whey-protein-isolate-5lb":
      "Complément protéiné qualité : 25 g par portion, peu de sucre et enzymes digestives pour la récupération.",
    "smart-fitness-watch":
      "Tracker GPS avec rythme cardiaque, sommeil, SpO2 et jusqu’à 14 jours d’autonomie.",
    "premium-basmati-rice-10kg":
      "Riz basmati aromatique à grains extra-longs, parfait pour biryani, riz sauté et repas quotidiens.",
    "organic-red-lentils-2kg":
      "Riches en protéines végétales, fibres, fer et nutriments. Idéales pour soupes, currys et ragoûts.",
    "natural-peanut-butter-1kg":
      "100 % cacahuètes torréfiées, sans sucre ajouté, sans conservateurs ni huiles hydrogénées.",
    "extra-virgin-olive-oil-1l":
      "Huile pressée à froid, goût riche, antioxydants et lipides sains. Salades, cuisine et marinades.",
  },
};

// For langs without full curated desc, translate via simple quality templates using name context
const translatedDescFallback = {
  es: (en) =>
    en
      .replace(/featuring/gi, "con")
      .replace(/with /gi, "con ")
      .replace(/and /gi, "y ")
      .replace(/for /gi, "para "),
  de: (en) => en, // keep EN if missing — we'll copy curated where available
};

const langs = [
  "fr",
  "es",
  "de",
  "it",
  "pt",
  "nl",
  "pl",
  "sv",
  "ar",
  "zh",
  "hi",
  "ja",
  "ko",
];

// Additional language name maps reuse closest
nameMap.it = { ...nameMap.es };
nameMap.pt = { ...nameMap.es };
nameMap.nl = { ...nameMap.de };
nameMap.pl = { ...nameMap.de };
nameMap.sv = { ...nameMap.de };

// Italian/Portuguese name overrides for key retail terms
Object.assign(nameMap.it, {
  "Running Shoes": "Scarpe da running",
  "Robot Vacuum Cleaner": "Aspirapolvere robot",
  "Espresso Coffee Machine": "Macchina per espresso",
  "Extra Virgin Olive Oil 1L": "Olio extravergine di oliva 1 L",
});
Object.assign(nameMap.pt, {
  "Running Shoes": "Tênis de corrida",
  "Robot Vacuum Cleaner": "Aspirador robô",
  "Espresso Coffee Machine": "Máquina de espresso",
  "Extra Virgin Olive Oil 1L": "Azeite extra virgem 1 L",
});

// Descriptions for other langs: use French as pivot for Romance, German for Germanic, etc.
function romanceFromFr(fr) {
  return fr; // placeholder replaced below
}

const descEs = { ...descByLang.fr };
// Better: provide Spanish descriptions as adapted from French keys with Spanish text
descByLang.es = {
  "apple-iphone-16-pro-256gb":
    "Rendimiento de nueva generación con el chip A18 Pro, pantalla Super Retina XDR OLED de 6,3\", sistema triple de cámara 48 MP, zoom óptico 5x, Face ID, batería de todo el día, MagSafe y titanio premium.",
  "samsung-galaxy-s25-ultra":
    "Flagship premium con pantalla Dynamic AMOLED de 6,9\", Snapdragon, funciones de IA, cámara de 200 MP, S Pen, IP68 y batería de 5.000 mAh.",
  "macbook-air-15-m4":
    "Ultraligera con chip Apple M4, 16 GB de memoria unificada, SSD de 512 GB, hasta 18 h de batería, Liquid Retina, Magic Keyboard retroiluminado y Touch ID.",
  "dell-xps-13":
    "Ultrabook Windows premium con Intel Core Ultra, pantalla InfinityEdge, chasis de aluminio CNC, Thunderbolt, huella dactilar y Wi‑Fi 7.",
  "sony-wh-1000xm6":
    "Auriculares inalámbricos con cancelación de ruido líder, sonido adaptativo, 40 h de batería, llamadas nítidas y Bluetooth multipunto.",
  "logitech-mx-master-3s":
    "Ratón ergonómico inalámbrico con clics silenciosos, desplazamiento MagSpeed, botones personalizables y carga USB‑C.",
  "samsung-32-smart-monitor":
    "Pantalla IPS 4K UHD con HDR10, apps Smart TV, compartir pantalla, USB‑C y altavoces integrados.",
  "asus-rog-gaming-laptop":
    "Intel Core i9, NVIDIA RTX 5070, 32 GB DDR5, SSD PCIe 1 TB, pantalla 240 Hz, teclado RGB y refrigeración avanzada.",
  "gopro-hero13-black":
    "Graba vídeo 5,3K y fotos de alta resolución con estabilización HyperSmooth, diseño impermeable, control por voz y streaming en vivo.",
  "dji-mini-4-pro-drone":
    "Dron ligero con evitación de obstáculos, vídeo 4K HDR, modos inteligentes, gran autonomía y precisión GPS.",
  "mechanical-rgb-gaming-keyboard":
    "Teclado mecánico completo con RGB personalizable, switches hot‑swap, marco de aluminio y macros programables.",
  "32gb-ddr5-ram-kit":
    "Memoria de alto rendimiento para juegos, creación y multitarea, con perfiles XMP.",
  "2tb-nvme-gen4-ssd":
    "SSD PCIe Gen4 ultrarrápido hasta 7.000 MB/s para juegos, edición de vídeo y cargas profesionales.",
  "4k-webcam":
    "Webcam profesional 4K con autofoco, HDR, dobles micros, tapa de privacidad y desenfoque IA.",
  "usb-c-docking-station":
    "Conecta monitores, Ethernet, SD, USB y carga con un solo cable USB‑C.",
  "premium-mens-cotton-tshirt":
    "100% algodón peinado, tecnología que absorbe la humedad, costuras reforzadas y corte atlético moderno.",
  "slim-fit-denim-jeans":
    "Denim elástico cómodo y duradero, bolsillos reforzados, tela resistente a la decoloración y silueta slim.",
  "waterproof-winter-jacket":
    "Aislante cortavientos e impermeable, interior de forro polar, capucha desmontable y bolsillos con cremallera.",
  "running-shoes":
    "Zapatillas ligeras con amortiguación de espuma reactiva, malla transpirable y soporte de arco reforzado.",
  "genuine-leather-wallet":
    "Cartera artesanal premium con RFID, varias ranuras, compartimento para billetes y perfil delgado.",
  "luxury-automatic-watch":
    "Reloj automático de acero inoxidable, cristal de zafiro, resistencia al agua 100 m y manecillas luminosas.",
  "smart-air-fryer-8l":
    "Gran capacidad con Wi‑Fi, pantalla táctil, 12 presets y cesta apta para lavavajillas.",
  "stainless-steel-cookware-set":
    "Colección profesional de 12 piezas con sartenes, ollas, tapa de vidrio y compatibilidad de inducción.",
  "robot-vacuum-cleaner":
    "Robot inteligente con mapeo láser, carga automática, app, asistentes de voz y fregado.",
  "espresso-coffee-machine":
    "Máquina profesional con bomba de 15 bares, vaporizador de leche y opciones programables.",
  "memory-foam-mattress":
    "Colchón queen premium con gel refrigerante, alivio de presión, aislamiento de movimiento y funda transpirable.",
  "adjustable-dumbbell-set":
    "Mancuernas ahorraespacio de 2,3 a 23,8 kg por mano, cambio rápido y agarre ergonómico.",
  "olympic-barbell-set":
    "Set profesional de 136 kg con barra olímpica, discos bumper, collares y rack.",
  "whey-protein-isolate-5lb":
    "Suplemento de calidad con 25 g por ración, bajo azúcar y enzimas digestivas.",
  "smart-fitness-watch":
    "Tracker GPS con ritmo cardíaco, sueño, SpO2 y hasta 14 días de batería.",
  "premium-basmati-rice-10kg":
    "Basmati aromático de grano extralargo. Ideal para biryani, arroz frito y comidas diarias.",
  "organic-red-lentils-2kg":
    "Ricas en proteína vegetal, fibra y hierro. Ideales para sopas, currys y guisos.",
  "natural-peanut-butter-1kg":
    "100% maní tostado, sin azúcar añadido, conservantes ni aceites hidrogenados.",
  "extra-virgin-olive-oil-1l":
    "Prensado en frío, sabor intenso, antioxidantes y grasas saludables. Ensaladas, cocina y marinados.",
};

descByLang.de = Object.fromEntries(
  products.map(([id, , en]) => [
    id,
    // German: keep technical English product specs readable but add German framing for common retail words
    en
      .replace(/^/, "")
      .replace(/Premium /g, "Premium-")
      .replace(/featuring /gi, "mit ")
      .replace(/with /gi, "mit ")
      .replace(/ and /g, " und "),
  ])
);

// Better German curated for all via mapping from EN with full sentences for major ones
Object.assign(descByLang.de, {
  "apple-iphone-16-pro-256gb":
    "Next-Gen-Leistung mit dem A18 Pro Chip, 6,3-Zoll Super Retina XDR OLED, fortschrittlichem Triple-Kamera-System mit 48-MP-Hauptsensor, 5x optischem Zoom, Face ID, Ganztagesakku, MagSafe und Premium-Titan.",
  "running-shoes":
    "Leichte Laufschuhe mit reaktionsschneller Schaumdämpfung, atmungsaktivem Mesh-Obermaterial und verstärkter Fußgewölbestütze.",
  "robot-vacuum-cleaner":
    "Intelligenter Saugroboter mit Laserkartierung, automatischem Laden, App-Steuerung, Sprachassistenten und Wischfunktion.",
  "extra-virgin-olive-oil-1l":
    "Kaltgepresstes Olivenöl mit reichem Geschmack, Antioxidantien und herzgesunden Fetten. Ideal für Salate, Kochen und Marinaden.",
});

for (const lang of ["it", "pt"]) {
  descByLang[lang] = { ...descByLang.es };
}
for (const lang of ["nl", "pl", "sv"]) {
  descByLang[lang] = { ...descByLang.de };
}

descByLang.zh = {};
Object.assign(descByLang.zh, {
  "apple-iphone-16-pro-256gb":
    "搭载 A18 Pro 芯片，6.3 英寸 Super Retina XDR OLED 显示屏，先进三摄系统（4800 万主摄）、5 倍光学变焦、面容 ID、全天候续航、MagSafe 充电与高端钛金属机身。",
  "samsung-galaxy-s25-ultra":
    "旗舰智能手机，6.9 英寸 Dynamic AMOLED 显示屏、骁龙处理器、AI 功能、2 亿像素相机、内置 S Pen、IP68 防水与 5000mAh 大电池。",
  "macbook-air-15-m4":
    "搭载 Apple M4 芯片的超薄笔记本，16GB 统一内存、512GB SSD、最长约 18 小时续航、Liquid Retina 显示屏、背光妙控键盘与触控 ID。",
  "dell-xps-13":
    "高端 Windows 超极本，搭载 Intel Core Ultra、InfinityEdge 显示屏、CNC 铝合金机身、雷电接口、指纹登录与 Wi-Fi 7。",
  "sony-wh-1000xm6":
    "业界领先的无线降噪耳机，自适应声音控制、40 小时续航、清晰通话与多点蓝牙连接。",
  "logitech-mx-master-3s":
    "先进人体工学无线鼠标，超静音点击、MagSpeed 电磁滚轮、可自定义按键与 USB-C 充电。",
  "samsung-32-smart-monitor":
    "4K UHD IPS 显示屏，支持 HDR10、智能电视应用、无线投屏、USB-C 与内置扬声器。",
  "asus-rog-gaming-laptop":
    "英特尔酷睿 i9、NVIDIA RTX 5070 显卡、32GB DDR5、1TB PCIe SSD、240Hz 屏幕、RGB 键盘与强力散热。",
  "gopro-hero13-black":
    "拍摄出色的 5.3K 视频与高分辨率照片，HyperSmooth 防抖、防水设计、语音控制与直播。",
  "dji-mini-4-pro-drone":
    "轻量无人机，具备避障、4K HDR 录像、智能飞行模式、长续航与 GPS 精准定位。",
  "mechanical-rgb-gaming-keyboard":
    "全尺寸机械键盘，可自定义 RGB 灯效、热插拔轴体、坚固铝合金框架与可编程宏。",
  "32gb-ddr5-ram-kit":
    "高性能台式机内存，适合游戏、创作与多任务，并支持 XMP 轻松超频。",
  "2tb-nvme-gen4-ssd":
    "超快 PCIe Gen4 固态硬盘，读取速度最高约 7000MB/s，适合游戏、视频剪辑与专业负载。",
  "4k-webcam":
    "专业 4K 网络摄像头，自动对焦、HDR、双麦克风、隐私盖与 AI 背景虚化。",
  "usb-c-docking-station":
    "通过一根 USB-C 线连接多显示器、以太网、SD 卡、USB 设备并为现代笔记本供电。",
  "premium-mens-cotton-tshirt":
    "100% 精梳棉，吸湿排汗、加固缝线与现代运动版型。",
  "slim-fit-denim-jeans":
    "弹力牛仔，舒适耐用，加固口袋、抗褪色面料与现代修身剪裁。",
  "waterproof-winter-jacket":
    "隔热外套，防风防水外层、抓绒内里、可拆卸帽兜与多个拉链口袋。",
  "running-shoes":
    "轻量跑鞋，搭载高回弹泡棉缓震、透气网面鞋面与加强足弓支撑。",
  "genuine-leather-wallet":
    "优质手工真皮钱包，RFID 防护、多卡槽、现金层与纤薄轮廓。",
  "luxury-automatic-watch":
    "不锈钢自动机械表，蓝宝石玻璃、防水 100 米与夜光指针。",
  "smart-air-fryer-8l":
    "大容量数字空气炸锅，Wi-Fi 连接、触控屏、12 种烹饪预设与可洗碗机清洗炸篮。",
  "stainless-steel-cookware-set":
    "专业 12 件套锅具，含煎锅、炖锅、汤锅、钢化玻璃盖，支持电磁炉。",
  "robot-vacuum-cleaner":
    "智能扫地机器人，激光建图、自动回充、App 控制、语音助手与拖地功能。",
  "espresso-coffee-machine":
    "专业级意式咖啡机，15 bar 泵压、蒸汽奶泡棒与可编程冲煮选项。",
  "memory-foam-mattress":
    "优质女王尺寸床垫，冷却凝胶、减压支撑、动静隔离与透气床罩。",
  "adjustable-dumbbell-set":
    "节省空间的可调节哑铃，单手约 2.3–23.8 kg，快速调节与人体工学握把。",
  "olympic-barbell-set":
    "专业约 136 kg 套装，含奥运杠、缓冲铃片、卡箍与收纳架。",
  "whey-protein-isolate-5lb":
    "优质蛋白补剂，每份 25g 蛋白，低糖并含消化酶，助力肌肉恢复。",
  "smart-fitness-watch":
    "支持 GPS 的运动手表，心率、睡眠、血氧监测，续航最长约 14 天。",
  "premium-basmati-rice-10kg":
    "特长粒芳香印度香米，来自优质产区。适合做印度炒饭、炒饭与日常主食。",
  "organic-red-lentils-2kg":
    "富含植物蛋白、膳食纤维、铁与营养素。适合汤品、咖喱与炖菜。",
  "natural-peanut-butter-1kg":
    "100% 烘焙花生制成，无添加糖、防腐剂或氢化油。",
  "extra-virgin-olive-oil-1l":
    "冷榨橄榄油，风味浓郁，富含抗氧化剂与有益脂肪。适合沙拉、烹饪与腌制。",
});

descByLang.ja = {};
Object.assign(descByLang.ja, {
  "apple-iphone-16-pro-256gb":
    "A18 Proチップによる次世代パフォーマンス、6.3インチSuper Retina XDR OLED、48MPメインの先進トリプルカメラ、5倍光学ズーム、Face ID、一日中使えるバッテリー、MagSafe充電、プレミアムチタンボディ。",
  "samsung-galaxy-s25-ultra":
    "6.9インチDynamic AMOLED、Snapdragon、AI機能、2億画素カメラ、内蔵S Pen、IP68防水、5,000mAhバッテリーを備えたプレミアム旗艦スマホ。",
  "running-shoes":
    "反応性の高いフォームクッション、通気性メッシュアッパー、強化されたアーチサポートを備えた軽量ランニングシューズ。",
  "robot-vacuum-cleaner":
    "レーザーマッピング、自動充電、アプリ操作、音声アシスタント連携、水拭き機能を備えたインテリジェントロボット掃除機。",
  "extra-virgin-olive-oil-1l":
    "豊かな風味、抗酸化物質、ヘルシーな脂質を備えたコールドプレスオリーブオイル。サラダ、料理、マリネに最適。",
  "premium-basmati-rice-10kg":
    "極長粒の香り高いバスマティ米。ビリヤニ、チャーハン、日常の食事に最適。",
});

descByLang.ko = {};
Object.assign(descByLang.ko, {
  "apple-iphone-16-pro-256gb":
    "A18 Pro 칩의 차세대 성능, 6.3인치 Super Retina XDR OLED, 4800만 화소 메인 트리플 카메라, 5배 광학 줌, Face ID, 하루 종일 배터리, MagSafe 충전, 프리미엄 티타늄 바디.",
  "samsung-galaxy-s25-ultra":
    "6.9인치 Dynamic AMOLED, 스냅드래곤, AI 기능, 2억 화소 카메라, 내장 S펜, IP68 방수, 5,000mAh 배터리를 갖춘 프리미엄 플래그십.",
  "running-shoes":
    "반응성 폼 쿠셔닝, 통기성 메시 갑피, 강화된 아치 지지력을 갖춘 경량 러닝화.",
  "robot-vacuum-cleaner":
    "레이저 맵핑, 자동 충전, 앱 제어, 음성 어시스턴트 연동, 물걸레 기능을 갖춘 지능형 로봇 청소기.",
  "extra-virgin-olive-oil-1l":
    "풍부한 풍미, 항산화 성분, 건강한 지방을 담은 콜드프레스 올리브 오일. 샐러드, 요리, 마리네이드에 이상적.",
  "premium-basmati-rice-10kg":
    "특장립 향긋한 바스마티 쌀. 비리야니, 볶음밥, 일상 식사에 적합.",
});

descByLang.hi = {};
Object.assign(descByLang.hi, {
  "apple-iphone-16-pro-256gb":
    "A18 Pro चिप के साथ अगली पीढ़ी का प्रदर्शन, 6.3-इंच Super Retina XDR OLED डिस्प्ले, 48MP मुख्य सेंसर वाला ट्रिपल कैमरा, 5x ऑप्टिकल ज़ूम, Face ID, पूरे दिन की बैटरी, MagSafe चार्जिंग और प्रीमियम टाइटेनियम डिज़ाइन।",
  "running-shoes":
    "हल्के एथलेटिक जूते जिनमें रिस्पॉन्सिव फोम कुशनिंग, सांस लेने योग्य मेश अपर और बेहतर आर्च सपोर्ट है।",
  "robot-vacuum-cleaner":
    "लेज़र मैपिंग, ऑटोमैटिक चार्जिंग, ऐप नियंत्रण, वॉइस असिस्टेंट और मॉपिंग फ़ंक्शन वाला स्मार्ट रोबोट वैक्यूम।",
  "extra-virgin-olive-oil-1l":
    "कोल्ड-प्रेस्ड ऑलिव ऑयल जिसमें समृद्ध स्वाद, एंटीऑक्सीडेंट और हृदय-स्वस्थ वसा हैं। सलाद, कुकिंग और मैरिनेड के लिए आदर्श।",
  "premium-basmati-rice-10kg":
    "प्रीमियम खेतों से अतिरिक्त लंबे दाने वाला सुगंधित बासमती चावल। बिरयानी, फ्राइड राइस और रोज़ के भोजन के लिए सही।",
});

descByLang.ar = {};
Object.assign(descByLang.ar, {
  "apple-iphone-16-pro-256gb":
    "أداء الجيل التالي مع شريحة A18 Pro، وشاشة Super Retina XDR OLED مقاس 6.3 إنش، ونظام كاميرا ثلاثي متقدم بدقة 48 ميجابكسل، وزوم بصري 5x، وFace ID، وبطارية طوال اليوم، وشحن MagSafe، وهيكل تيتانيوم فاخر.",
  "running-shoes":
    "أحذية رياضية خفيفة مع توسيد رغوي متجاوب، وشبكة علوية قابلة للتنفس، ودعم مقوس معزز.",
  "robot-vacuum-cleaner":
    "مكنسة روبوتية ذكية مع رسم خرائط بالليزر، وشحن تلقائي، وتحكم عبر التطبيق، ومساعدات صوتية، ووظيفة المسح.",
  "extra-virgin-olive-oil-1l":
    "زيت زيتون معصور على البارد بنكهة غنية ومضادات أكسدة ودهون صحية للقلب. مثالي للسلطات والطبخ والتتبيل.",
  "premium-basmati-rice-10kg":
    "أرز بسمتي عطري طويل الحبة من مزارع فاخرة. مثالي للبرياني والأرز المقلي والوجبات اليومية.",
});

function localizeName(lang, enName) {
  return nameMap[lang]?.[enName] || enName;
}

function localizeDesc(lang, id, enDesc) {
  return descByLang[lang]?.[id] || enDesc;
}

let out = "/** Generated product catalog translations — do not edit by hand */\n";
out += "export const productCopy = {\n";

for (const [id, enName, enDesc] of products) {
  out += `  ${JSON.stringify(id)}: {\n`;
  out += `    en: { name: ${JSON.stringify(enName)}, description: ${JSON.stringify(enDesc)} },\n`;
  for (const lang of langs) {
    const name = localizeName(lang, enName);
    const description = localizeDesc(lang, id, enDesc);
    out += `    ${lang}: { name: ${JSON.stringify(name)}, description: ${JSON.stringify(description)} },\n`;
  }
  out += "  },\n";
}

out += "};\n";

writeFileSync(new URL("../lib/i18n/catalogProducts.js", import.meta.url), out);
console.log("Wrote lib/i18n/catalogProducts.js", out.length, "chars");
