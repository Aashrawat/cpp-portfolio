import { getProductImage } from "./productImages";
import { extraCatalog } from "./catalogMore";
import { extraCatalog2 } from "./catalogNewCategories";

export const categories = [
  {
    id: "electronics",
    label: "Electronics",
    blurb: "Phones, audio, and everyday tech built for modern life.",
  },
  {
    id: "computers-accessories",
    label: "Computers & Accessories",
    blurb: "Laptops, peripherals, and tools for focused work.",
  },
  {
    id: "fashion",
    label: "Fashion",
    blurb: "Essentials and statement pieces with clean style.",
  },
  {
    id: "home-kitchen",
    label: "Home & Kitchen",
    blurb: "Comfort, cooking, and living spaces that feel intentional.",
  },
  {
    id: "fitness",
    label: "Fitness",
    blurb: "Gear that keeps movement simple and consistent.",
  },
  {
    id: "grocery",
    label: "Grocery",
    blurb: "Pantry staples and everyday goods, ready when you are.",
  },
  {
    id: "beauty",
    label: "Beauty & Personal Care",
    blurb: "Skincare, fragrance, and daily routines that feel considered.",
  },
  {
    id: "books-media",
    label: "Books & Media",
    blurb: "Reads, vinyl, and living-room audio for slower evenings.",
  },
  {
    id: "toys-games",
    label: "Toys & Games",
    blurb: "Play, puzzles, and gifts built for kids and family nights.",
  },
  {
    id: "pet-supplies",
    label: "Pet Supplies",
    blurb: "Food, comfort, and care for the animals at home.",
  },
  {
    id: "sports-outdoors",
    label: "Sports & Outdoors",
    blurb: "Field, trail, and weekend gear for moving outside.",
  },
  {
    id: "automotive",
    label: "Automotive",
    blurb: "In-car essentials that keep drives safer and tidier.",
  },
  {
    id: "baby",
    label: "Baby & Kids",
    blurb: "Strollers, feeding, and play for the earliest years.",
  },
  {
    id: "office",
    label: "Office & Stationery",
    blurb: "Desks, chairs, and tools for getting work done.",
  },
  {
    id: "garden",
    label: "Garden & Outdoor",
    blurb: "Hose, planters, and lights for yards and balconies.",
  },
  {
    id: "travel",
    label: "Travel & Luggage",
    blurb: "Bags, packing, and adapters for getting out the door.",
  },
];

const catalog = [
  // Electronics
  {
    id: "apple-iphone-16-pro-256gb",
    name: "Apple iPhone 16 Pro 256GB",
    description:
      "Experience next-generation performance with the A18 Pro chip, a stunning 6.3-inch Super Retina XDR OLED display, advanced triple-camera system with 48MP main sensor, 5x optical zoom, Face ID, all-day battery life, MagSafe charging, and premium titanium construction.",
    price: "1099.99",
    category: "electronics",
    categoryLabel: "Electronics",
  },
  {
    id: "samsung-galaxy-s25-ultra",
    name: "Samsung Galaxy S25 Ultra",
    description:
      "Premium flagship smartphone featuring a 6.9-inch Dynamic AMOLED display, Snapdragon processor, AI-powered features, 200MP camera, integrated S Pen, IP68 water resistance, and a large 5,000mAh battery.",
    price: "1299.99",
    category: "electronics",
    categoryLabel: "Electronics",
  },
  {
    id: "macbook-air-15-m4",
    name: "MacBook Air 15-inch M4",
    description:
      "Ultra-thin laptop powered by Apple's M4 chip with 16GB unified memory, 512GB SSD, up to 18 hours of battery life, Liquid Retina display, backlit Magic Keyboard, and Touch ID.",
    price: "1499.99",
    category: "electronics",
    categoryLabel: "Electronics",
  },
  {
    id: "dell-xps-13",
    name: "Dell XPS 13",
    description:
      "Premium Windows ultrabook featuring Intel Core Ultra processor, InfinityEdge display, CNC-machined aluminum chassis, Thunderbolt ports, fingerprint login, and Wi-Fi 7 support.",
    price: "1249.99",
    category: "electronics",
    categoryLabel: "Electronics",
  },
  {
    id: "sony-wh-1000xm6",
    name: "Sony WH-1000XM6",
    description:
      "Industry-leading wireless noise-canceling headphones with adaptive sound control, 40-hour battery life, crystal-clear call quality, and multipoint Bluetooth connection.",
    price: "449.99",
    category: "electronics",
    categoryLabel: "Electronics",
  },
  {
    id: "logitech-mx-master-3s",
    name: "Logitech MX Master 3S",
    description:
      "Advanced ergonomic wireless mouse featuring ultra-quiet clicks, MagSpeed electromagnetic scrolling, customizable buttons, and USB-C charging.",
    price: "99.99",
    category: "electronics",
    categoryLabel: "Electronics",
  },
  {
    id: "samsung-32-smart-monitor",
    name: 'Samsung 32" Smart Monitor',
    description:
      "4K UHD IPS display with HDR10 support, Smart TV apps, wireless screen sharing, USB-C connectivity, and built-in speakers.",
    price: "329.99",
    category: "electronics",
    categoryLabel: "Electronics",
  },
  {
    id: "asus-rog-gaming-laptop",
    name: "ASUS ROG Gaming Laptop",
    description:
      "Intel Core i9 processor, NVIDIA RTX 5070 graphics, 32GB DDR5 RAM, 1TB PCIe SSD, 240Hz display, RGB keyboard, and advanced cooling.",
    price: "2199.99",
    category: "electronics",
    categoryLabel: "Electronics",
  },
  {
    id: "gopro-hero13-black",
    name: "GoPro HERO13 Black",
    description:
      "Capture stunning 5.3K videos and high-resolution photos with HyperSmooth stabilization, waterproof design, voice control, and live streaming.",
    price: "499.99",
    category: "electronics",
    categoryLabel: "Electronics",
  },
  {
    id: "dji-mini-4-pro-drone",
    name: "DJI Mini 4 Pro Drone",
    description:
      "Lightweight drone featuring obstacle avoidance, 4K HDR video recording, intelligent flight modes, long battery life, and GPS precision.",
    price: "899.99",
    category: "electronics",
    categoryLabel: "Electronics",
  },

  // Computers & Accessories
  {
    id: "mechanical-rgb-gaming-keyboard",
    name: "Razer Mechanical RGB Keyboard",
    description:
      "Full-size mechanical keyboard with customizable RGB lighting, hot-swappable switches, durable aluminum frame, and programmable macros.",
    price: "109.99",
    category: "computers-accessories",
    categoryLabel: "Computers & Accessories",
  },
  {
    id: "32gb-ddr5-ram-kit",
    name: "32GB DDR5 RAM Kit",
    description:
      "High-performance desktop memory optimized for gaming, content creation, and multitasking with XMP profiles for easy overclocking.",
    price: "159.99",
    category: "computers-accessories",
    categoryLabel: "Computers & Accessories",
  },
  {
    id: "2tb-nvme-gen4-ssd",
    name: "Samsung 2TB NVMe SSD",
    description:
      "Ultra-fast PCIe Gen4 solid-state drive delivering read speeds up to 7,000MB/s, ideal for gaming, video editing, and professional workloads.",
    price: "189.99",
    category: "computers-accessories",
    categoryLabel: "Computers & Accessories",
  },
  {
    id: "4k-webcam",
    name: "Logitech 4K Webcam",
    description:
      "Professional webcam with 4K recording, autofocus, HDR support, dual microphones, privacy shutter, and AI-powered background blur.",
    price: "149.99",
    category: "computers-accessories",
    categoryLabel: "Computers & Accessories",
  },
  {
    id: "usb-c-docking-station",
    name: "Plugable USB Docking Station",
    description:
      "Connect multiple monitors, Ethernet, SD cards, USB devices, and charging through a single USB-C cable for modern laptops.",
    price: "129.99",
    category: "computers-accessories",
    categoryLabel: "Computers & Accessories",
  },

  // Fashion
  {
    id: "premium-mens-cotton-tshirt",
    name: "Premium Men's Cotton T-Shirt",
    description:
      "Made from 100% combed cotton with moisture-wicking technology, reinforced stitching, and a modern athletic fit.",
    price: "24.99",
    category: "fashion",
    categoryLabel: "Fashion",
  },
  {
    id: "slim-fit-denim-jeans",
    name: "Slim Fit Denim Jeans",
    description:
      "Stretch denim jeans designed for comfort and durability with reinforced pockets, fade-resistant fabric, and a modern slim silhouette.",
    price: "54.99",
    category: "fashion",
    categoryLabel: "Fashion",
  },
  {
    id: "waterproof-winter-jacket",
    name: "Waterproof Winter Jacket",
    description:
      "Insulated jacket with windproof and waterproof outer shell, fleece-lined interior, detachable hood, and multiple zippered pockets.",
    price: "149.99",
    category: "fashion",
    categoryLabel: "Fashion",
  },
  {
    id: "running-shoes",
    name: "Running Shoes",
    description:
      "Lightweight athletic shoes featuring responsive foam cushioning, breathable mesh upper, and enhanced arch support.",
    price: "119.99",
    category: "fashion",
    categoryLabel: "Fashion",
  },
  {
    id: "genuine-leather-wallet",
    name: "Genuine Leather Wallet",
    description:
      "Premium handcrafted leather wallet with RFID protection, multiple card slots, cash compartment, and slim minimalist profile.",
    price: "39.99",
    category: "fashion",
    categoryLabel: "Fashion",
  },
  {
    id: "luxury-automatic-watch",
    name: "Luxury Automatic Watch",
    description:
      "Stainless steel automatic movement watch with sapphire crystal glass, water resistance up to 100 meters, and luminous hands.",
    price: "299.99",
    category: "fashion",
    categoryLabel: "Fashion",
  },

  // Home & Kitchen
  {
    id: "smart-air-fryer-8l",
    name: "Smart Air Fryer 8L",
    description:
      "Large-capacity digital air fryer with Wi-Fi connectivity, touchscreen controls, 12 cooking presets, and dishwasher-safe basket.",
    price: "139.99",
    category: "home-kitchen",
    categoryLabel: "Home & Kitchen",
  },
  {
    id: "stainless-steel-cookware-set",
    name: "Stainless Steel Cookware Set",
    description:
      "Professional 12-piece cookware collection including frying pans, saucepans, stockpot, tempered glass lids, and induction compatibility.",
    price: "249.99",
    category: "home-kitchen",
    categoryLabel: "Home & Kitchen",
  },
  {
    id: "robot-vacuum-cleaner",
    name: "Robot Vacuum Cleaner",
    description:
      "Intelligent robotic vacuum with laser mapping, automatic charging, app control, voice assistant integration, and mopping functionality.",
    price: "499.99",
    category: "home-kitchen",
    categoryLabel: "Home & Kitchen",
  },
  {
    id: "espresso-coffee-machine",
    name: "Espresso Coffee Machine",
    description:
      "Professional-grade espresso machine with 15-bar pressure pump, steam wand for milk frothing, and programmable brewing options.",
    price: "399.99",
    category: "home-kitchen",
    categoryLabel: "Home & Kitchen",
  },
  {
    id: "memory-foam-mattress",
    name: "Memory Foam Mattress",
    description:
      "Premium queen-size mattress with cooling gel technology, pressure relief support, motion isolation, and breathable cover.",
    price: "699.99",
    category: "home-kitchen",
    categoryLabel: "Home & Kitchen",
  },

  // Fitness
  {
    id: "adjustable-dumbbell-set",
    name: "Adjustable Dumbbell Set",
    description:
      "Space-saving dumbbells adjustable from 5 to 52.5 lbs per hand with quick-change mechanism and ergonomic grip.",
    price: "399.99",
    category: "fitness",
    categoryLabel: "Fitness",
  },
  {
    id: "olympic-barbell-set",
    name: "Olympic Barbell Set",
    description:
      "Professional 300-pound weight set including Olympic bar, bumper plates, collars, and storage rack for strength training.",
    price: "699.99",
    category: "fitness",
    categoryLabel: "Fitness",
  },
  {
    id: "whey-protein-isolate-5lb",
    name: "Whey Protein Isolate 5 lb",
    description:
      "High-quality protein supplement delivering 25g protein per serving with low sugar and digestive enzymes for muscle recovery.",
    price: "74.99",
    category: "fitness",
    categoryLabel: "Fitness",
  },
  {
    id: "smart-fitness-watch",
    name: "Smart Fitness Watch",
    description:
      "GPS-enabled fitness tracker with heart-rate monitoring, sleep tracking, blood oxygen measurement, and up to 14-day battery life.",
    price: "249.99",
    category: "fitness",
    categoryLabel: "Fitness",
  },

  // Grocery
  {
    id: "premium-basmati-rice-10kg",
    name: "Premium Basmati Rice 10kg",
    description:
      "Extra-long grain aromatic basmati rice sourced from premium farms. Perfect for biryani, fried rice, and everyday meals.",
    price: "26.99",
    category: "grocery",
    categoryLabel: "Grocery",
  },
  {
    id: "organic-red-lentils-2kg",
    name: "Organic Red Lentils 2kg",
    description:
      "Rich in plant protein, dietary fiber, iron, and essential nutrients. Ideal for soups, curries, and stews.",
    price: "9.99",
    category: "grocery",
    categoryLabel: "Grocery",
  },
  {
    id: "natural-peanut-butter-1kg",
    name: "Natural Peanut Butter 1kg",
    description:
      "Made from 100% roasted peanuts with no added sugar, preservatives, or hydrogenated oils.",
    price: "12.99",
    category: "grocery",
    categoryLabel: "Grocery",
  },
  {
    id: "extra-virgin-olive-oil-1l",
    name: "Extra Virgin Olive Oil 1L",
    description:
      "Cold-pressed olive oil with rich flavor, antioxidants, and heart-healthy fats. Ideal for salads, cooking, and marinades.",
    price: "18.99",
    category: "grocery",
    categoryLabel: "Grocery",
  },

  // Beauty & Personal Care
  {
    id: "vitamin-c-face-serum",
    name: "Vitamin C Face Serum 30ml",
    description:
      "Brightening serum with 15% vitamin C, hyaluronic acid, and vitamin E to even tone, fade dark spots, and add a dewy finish.",
    price: "34.99",
    category: "beauty",
    categoryLabel: "Beauty & Personal Care",
  },
  {
    id: "sonic-electric-toothbrush",
    name: "Sonic Electric Toothbrush",
    description:
      "Rechargeable sonic brush with 5 cleaning modes, a 2-minute timer, pressure sensor, and up to 3 weeks of battery life.",
    price: "79.99",
    category: "beauty",
    categoryLabel: "Beauty & Personal Care",
  },
  {
    id: "ionic-hair-dryer",
    name: "Ionic Hair Dryer",
    description:
      "Lightweight ionic dryer with concentrator and diffuser, cool-shot button, and 3 heat settings for faster drying with less frizz.",
    price: "89.99",
    category: "beauty",
    categoryLabel: "Beauty & Personal Care",
  },
  {
    id: "luxury-eau-de-parfum",
    name: "Luxury Eau de Parfum 50ml",
    description:
      "Long-lasting unisex fragrance with notes of bergamot, cedar, and amber. Comes in a glass bottle with a magnetic cap.",
    price: "119.99",
    category: "beauty",
    categoryLabel: "Beauty & Personal Care",
  },
  {
    id: "organic-body-lotion",
    name: "Organic Shea Body Lotion 400ml",
    description:
      "Rich daily moisturizer with organic shea butter, jojoba oil, and aloe. Absorbs quickly without a greasy finish.",
    price: "22.99",
    category: "beauty",
    categoryLabel: "Beauty & Personal Care",
  },

  // Books & Media
  {
    id: "hardcover-bestseller-novel",
    name: "Hardcover Bestseller Novel",
    description:
      "Award-winning contemporary novel in a cloth-bound hardcover edition with ribbon bookmark and deckle-edge pages.",
    price: "28.99",
    category: "books-media",
    categoryLabel: "Books & Media",
  },
  {
    id: "leather-journal-notebook",
    name: "Leather Journal Notebook",
    description:
      "A5 refillable journal with genuine leather cover, 120 gsm lined paper, elastic closure, and an inner pocket.",
    price: "32.99",
    category: "books-media",
    categoryLabel: "Books & Media",
  },
  {
    id: "vinyl-record-player",
    name: "Bluetooth Vinyl Record Player",
    description:
      "3-speed belt-drive turntable with built-in speakers, Bluetooth output, USB recording, and a dust cover for everyday listening.",
    price: "179.99",
    category: "books-media",
    categoryLabel: "Books & Media",
  },
  {
    id: "bluetooth-bookshelf-speakers",
    name: "Bluetooth Bookshelf Speakers",
    description:
      "Pair of 50W bookshelf speakers with Bluetooth 5.3, optical input, wooden cabinets, and room-filling stereo sound.",
    price: "249.99",
    category: "books-media",
    categoryLabel: "Books & Media",
  },
  {
    id: "led-desk-reading-lamp",
    name: "LED Desk Reading Lamp",
    description:
      "Adjustable LED lamp with 5 brightness levels, 3 color temperatures, USB charging port, and a stable weighted base.",
    price: "44.99",
    category: "books-media",
    categoryLabel: "Books & Media",
  },

  // Toys & Games
  {
    id: "wooden-building-blocks",
    name: "Wooden Building Blocks 100-Piece",
    description:
      "Natural wood block set with 100 pieces in mixed shapes and colors. Smooth edges, non-toxic finish, ages 3+.",
    price: "39.99",
    category: "toys-games",
    categoryLabel: "Toys & Games",
  },
  {
    id: "strategy-board-game",
    name: "Strategy Board Game",
    description:
      "Award-winning family strategy game for 2–4 players. 45-minute sessions with quality components and a compact box.",
    price: "49.99",
    category: "toys-games",
    categoryLabel: "Toys & Games",
  },
  {
    id: "remote-control-car",
    name: "Remote Control Off-Road Car",
    description:
      "2.4GHz off-road RC car with 20 km/h top speed, rechargeable battery, all-terrain tires, and a 100-meter range.",
    price: "64.99",
    category: "toys-games",
    categoryLabel: "Toys & Games",
  },
  {
    id: "plush-teddy-bear",
    name: "Plush Teddy Bear 45cm",
    description:
      "Super-soft teddy with embroidered features, weighted paws, and a hug-ready 45 cm size. Machine-washable outer.",
    price: "29.99",
    category: "toys-games",
    categoryLabel: "Toys & Games",
  },
  {
    id: "1000-piece-jigsaw-puzzle",
    name: "1000-Piece Landscape Puzzle",
    description:
      "Premium 1000-piece jigsaw with a linen finish, poster guide, and sturdy pieces that snap together cleanly.",
    price: "24.99",
    category: "toys-games",
    categoryLabel: "Toys & Games",
  },

  // Pet Supplies
  {
    id: "premium-dog-food-10kg",
    name: "Premium Dog Food 10kg",
    description:
      "Grain-inclusive adult kibble with real chicken as the first ingredient, omega fatty acids, and no artificial colors.",
    price: "54.99",
    category: "pet-supplies",
    categoryLabel: "Pet Supplies",
  },
  {
    id: "cat-scratching-tower",
    name: "Cat Scratching Tower",
    description:
      "Multi-level sisal tower with perches, hanging toy, and a hideaway cave. Fits most apartments and large cats.",
    price: "89.99",
    category: "pet-supplies",
    categoryLabel: "Pet Supplies",
  },
  {
    id: "pet-grooming-kit",
    name: "Pet Grooming Kit",
    description:
      "5-piece grooming set with slicker brush, deshedding tool, nail clippers, comb, and a storage pouch for dogs and cats.",
    price: "27.99",
    category: "pet-supplies",
    categoryLabel: "Pet Supplies",
  },
  {
    id: "automatic-pet-feeder",
    name: "Automatic Pet Feeder 4L",
    description:
      "Programmable 4L feeder with timed meals, portion control, voice recording, and a backup battery for power outages.",
    price: "79.99",
    category: "pet-supplies",
    categoryLabel: "Pet Supplies",
  },
  {
    id: "orthopedic-dog-bed",
    name: "Orthopedic Dog Bed Large",
    description:
      "Memory-foam dog bed with a washable cover, non-slip base, and bolstered edges for joint support and restful sleep.",
    price: "69.99",
    category: "pet-supplies",
    categoryLabel: "Pet Supplies",
  },
];

export const products = [...catalog, ...extraCatalog, ...extraCatalog2].map((product) => ({
  ...product,
  image: getProductImage(product.id),
}));

export function getCategoryLabel(categoryId) {
  return categories.find((c) => c.id === categoryId)?.label || categoryId;
}

export function getCategory(categoryId) {
  return categories.find((c) => c.id === categoryId) || null;
}

export function getProductById(productId) {
  return products.find((p) => p.id === productId) || null;
}

export function getProductsByCategory(categoryId) {
  return products.filter((p) => p.category === categoryId);
}

export function searchProducts(query, category = "all") {
  let results = products;

  if (category !== "all") {
    results = results.filter((p) => p.category === category);
  }

  if (query) {
    const q = query.toLowerCase();
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q)
    );
  }

  return results;
}
