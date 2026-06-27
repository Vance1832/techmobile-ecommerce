/* ============================================================
   data.js — TechMobile catalogue
   Genuine Apple & Samsung devices · prices in Thai Baht (THB)
   Categories: phones | laptops | tablets | audio | wearables
   ============================================================ */

const products = [
  /* ---------------- PHONES ---------------- */
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    category: "phones",
    price: 48900,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 1264,
    stock: 14,
    badge: "Best Seller",
    description: "The most advanced iPhone yet. A titanium design, the A17 Pro chip, a 5x Telephoto camera and the customisable Action button — built for those who want it all.",
    specs: {
      "Display": "6.7-inch Super Retina XDR",
      "Chip": "A17 Pro",
      "Camera": "48MP Main · 12MP Ultra Wide · 5x Tele",
      "Material": "Titanium",
      "Storage": "256GB"
    },
    images: [
      "assets/images/p1-0.jpg",
      "assets/images/p1-1.jpg",
      "assets/images/p1-2.jpg"
    ]
  },
  {
    id: 2,
    name: "iPhone 15",
    brand: "Apple",
    category: "phones",
    price: 32900,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 982,
    stock: 25,
    badge: null,
    description: "A 48MP main camera, Dynamic Island and USB-C — all in a durable, colour-infused glass design. The everyday iPhone, refined.",
    specs: {
      "Display": "6.1-inch Super Retina XDR",
      "Chip": "A16 Bionic",
      "Camera": "48MP Main · 12MP Ultra Wide",
      "Port": "USB-C",
      "Storage": "128GB"
    },
    images: [
      "assets/images/p2-0.jpg",
      "assets/images/p2-1.jpg",
      "assets/images/p2-2.jpg"
    ]
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "phones",
    price: 45900,
    originalPrice: 49900,
    rating: 4.8,
    reviewCount: 814,
    stock: 11,
    badge: "Sale",
    description: "Galaxy AI is here. A built-in S Pen, a 200MP camera and a flat titanium frame with the brightest Galaxy display ever — engineered for serious productivity.",
    specs: {
      "Display": "6.8-inch Dynamic AMOLED 2X",
      "Processor": "Snapdragon 8 Gen 3 for Galaxy",
      "Camera": "200MP Wide · 50MP Periscope · 12MP",
      "S Pen": "Built-in",
      "Storage": "256GB"
    },
    images: [
      "assets/images/p3-0.jpg",
      "assets/images/p3-1.jpg",
      "assets/images/p3-2.jpg"
    ]
  },
  {
    id: 4,
    name: "Samsung Galaxy Z Flip5",
    brand: "Samsung",
    category: "phones",
    price: 37900,
    originalPrice: 43900,
    rating: 4.5,
    reviewCount: 472,
    stock: 9,
    badge: "Sale",
    description: "Iconic, pocketable and now with a larger Flex Window. Fold it, flip it, snap hands-free photos — the foldable that fits your life.",
    specs: {
      "Main Display": "6.7-inch Dynamic AMOLED 2X",
      "Cover Display": "3.4-inch Super AMOLED",
      "Processor": "Snapdragon 8 Gen 2 for Galaxy",
      "Camera": "12MP Wide · 12MP Ultra Wide",
      "Storage": "256GB"
    },
    images: [
      "assets/images/p4-0.jpg",
      "assets/images/p4-1.jpg",
      "assets/images/p4-2.jpg"
    ]
  },

  /* ---------------- LAPTOPS ---------------- */
  {
    id: 5,
    name: "MacBook Pro 14-inch M3",
    brand: "Apple",
    category: "laptops",
    price: 69900,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 638,
    stock: 8,
    badge: "Best Seller",
    description: "Supercharged by the M3 chip. A stunning Liquid Retina XDR display, up to 22 hours of battery and pro-level performance in a compact, all-day machine.",
    specs: {
      "Display": "14.2-inch Liquid Retina XDR",
      "Chip": "Apple M3 (8-core CPU)",
      "Memory": "8GB Unified",
      "Storage": "512GB SSD",
      "Battery": "Up to 22 hours"
    },
    images: [
      "assets/images/p5-0.jpg",
      "assets/images/p5-1.jpg",
      "assets/images/p5-2.jpg"
    ]
  },
  {
    id: 6,
    name: "MacBook Air 13-inch M2",
    brand: "Apple",
    category: "laptops",
    price: 39900,
    originalPrice: 42900,
    rating: 4.8,
    reviewCount: 1190,
    stock: 20,
    badge: "Sale",
    description: "Strikingly thin and fanless, with the M2 chip and up to 18 hours of battery. The most popular Mac, now lighter and faster than ever.",
    specs: {
      "Display": "13.6-inch Liquid Retina",
      "Chip": "Apple M2 (8-core CPU)",
      "Memory": "8GB Unified",
      "Storage": "256GB SSD",
      "Weight": "1.24 kg"
    },
    images: [
      "assets/images/p6-0.jpg",
      "assets/images/p6-1.jpg",
      "assets/images/p6-2.jpg"
    ]
  },
  {
    id: 7,
    name: "Samsung Galaxy Book4 Pro",
    brand: "Samsung",
    category: "laptops",
    price: 54900,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 286,
    stock: 7,
    badge: "New",
    description: "Featherlight and brilliant. A 3K Dynamic AMOLED 2X touchscreen, Intel Core Ultra performance and seamless connection across your Galaxy devices.",
    specs: {
      "Display": "14-inch 3K Dynamic AMOLED 2X",
      "Processor": "Intel Core Ultra 7",
      "Memory": "16GB LPDDR5X",
      "Storage": "512GB SSD",
      "Weight": "1.23 kg"
    },
    images: [
      "assets/images/p7-0.jpg",
      "assets/images/p7-1.jpg",
      "assets/images/p7-2.jpg"
    ]
  },
  {
    id: 8,
    name: "MacBook Pro 16-inch M3 Max",
    brand: "Apple",
    category: "laptops",
    price: 99900,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 204,
    stock: 5,
    badge: null,
    description: "The most powerful MacBook Pro ever. The M3 Max chip drives demanding workflows — 3D rendering, film editing, code compiling — without breaking a sweat.",
    specs: {
      "Display": "16.2-inch Liquid Retina XDR",
      "Chip": "Apple M3 Max (14-core CPU)",
      "Memory": "36GB Unified",
      "Storage": "1TB SSD",
      "Battery": "Up to 22 hours"
    },
    images: [
      "assets/images/p8-0.jpg",
      "assets/images/p8-1.jpg",
      "assets/images/p8-2.jpg"
    ]
  },

  /* ---------------- TABLETS ---------------- */
  {
    id: 9,
    name: "iPad Pro 12.9-inch M2",
    brand: "Apple",
    category: "tablets",
    price: 37900,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 528,
    stock: 12,
    badge: "Best Seller",
    description: "The ultimate iPad experience. The M2 chip, a breathtaking Liquid Retina XDR display and support for Apple Pencil hover make creating and working effortless.",
    specs: {
      "Display": "12.9-inch Liquid Retina XDR",
      "Chip": "Apple M2",
      "Camera": "12MP Wide · 10MP Ultra Wide",
      "Connector": "USB-C (Thunderbolt)",
      "Storage": "128GB"
    },
    images: [
      "assets/images/p9-0.jpg",
      "assets/images/p9-1.jpg",
      "assets/images/p9-2.jpg"
    ]
  },
  {
    id: 10,
    name: "iPad Air 11-inch",
    brand: "Apple",
    category: "tablets",
    price: 22900,
    originalPrice: 24900,
    rating: 4.7,
    reviewCount: 711,
    stock: 22,
    badge: "Sale",
    description: "Serious performance in a thin, light design. Powered by the M1 chip and available in four fresh colours — the versatile iPad for work and play.",
    specs: {
      "Display": "10.9-inch Liquid Retina",
      "Chip": "Apple M1",
      "Camera": "12MP Wide",
      "Connector": "USB-C",
      "Storage": "128GB"
    },
    images: [
      "assets/images/p10-0.jpg",
      "assets/images/p10-1.jpg",
      "assets/images/p10-2.jpg"
    ]
  },
  {
    id: 11,
    name: "Samsung Galaxy Tab S9 Ultra",
    brand: "Samsung",
    category: "tablets",
    price: 41900,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 233,
    stock: 6,
    badge: "New",
    description: "A massive 14.6-inch AMOLED canvas with an IP68 water-resistant body and an included S Pen. The Galaxy tablet built for big ideas.",
    specs: {
      "Display": "14.6-inch Dynamic AMOLED 2X",
      "Processor": "Snapdragon 8 Gen 2 for Galaxy",
      "S Pen": "Included",
      "Durability": "IP68",
      "Storage": "256GB"
    },
    images: [
      "assets/images/p11-0.jpg",
      "assets/images/p11-1.jpg",
      "assets/images/p11-2.jpg"
    ]
  },
  {
    id: 12,
    name: "iPad mini",
    brand: "Apple",
    category: "tablets",
    price: 17900,
    originalPrice: null,
    rating: 4.7,
    reviewCount: 489,
    stock: 18,
    badge: null,
    description: "Full-size capability in an ultra-portable design. The A15 Bionic chip and an 8.3-inch Liquid Retina display make it the go-anywhere iPad.",
    specs: {
      "Display": "8.3-inch Liquid Retina",
      "Chip": "A15 Bionic",
      "Camera": "12MP Wide",
      "Connector": "USB-C",
      "Storage": "64GB"
    },
    images: [
      "assets/images/p12-0.jpg",
      "assets/images/p12-1.jpg",
      "assets/images/p12-2.jpg"
    ]
  },

  /* ---------------- AUDIO ---------------- */
  {
    id: 13,
    name: "AirPods Pro (2nd generation)",
    brand: "Apple",
    category: "audio",
    price: 8990,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 2043,
    stock: 40,
    badge: "Best Seller",
    description: "Up to 2x more Active Noise Cancellation, Adaptive Audio and a USB-C charging case. Rich, immersive sound that adapts to the world around you.",
    specs: {
      "Noise Control": "Active Noise Cancellation",
      "Chip": "Apple H2",
      "Charging Case": "USB-C, MagSafe",
      "Battery": "Up to 6h (30h with case)",
      "Resistance": "IP54"
    },
    images: [
      "assets/images/p13-0.jpg",
      "assets/images/p13-1.jpg",
      "assets/images/p13-2.jpg"
    ]
  },
  {
    id: 14,
    name: "AirPods Max",
    brand: "Apple",
    category: "audio",
    price: 19900,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 376,
    stock: 10,
    badge: null,
    description: "High-fidelity audio meets the comfort of a knit-mesh canopy. Computational audio, spatial sound and active noise cancellation in a refined design.",
    specs: {
      "Driver": "Apple-designed dynamic driver",
      "Audio": "Personalised Spatial Audio",
      "Noise Control": "Active Noise Cancellation",
      "Battery": "Up to 20 hours",
      "Connectivity": "Bluetooth 5.0"
    },
    images: [
      "assets/images/p14-0.jpg",
      "assets/images/p14-1.jpg",
      "assets/images/p14-2.jpg"
    ]
  },
  {
    id: 15,
    name: "Samsung Galaxy Buds2 Pro",
    brand: "Samsung",
    category: "audio",
    price: 7490,
    originalPrice: 8990,
    rating: 4.5,
    reviewCount: 624,
    stock: 30,
    badge: "Sale",
    description: "Hi-Fi 24-bit audio, intelligent ANC and a compact, comfortable fit. 360 Audio brings concert-like sound that moves with you.",
    specs: {
      "Audio": "24-bit Hi-Fi",
      "Noise Control": "Intelligent ANC",
      "Battery": "Up to 5h (18h with case)",
      "Resistance": "IPX7",
      "Weight": "5.5g per bud"
    },
    images: [
      "assets/images/p15-0.jpg",
      "assets/images/p15-1.jpg",
      "assets/images/p15-2.jpg"
    ]
  },
  {
    id: 16,
    name: "AirPods (3rd generation)",
    brand: "Apple",
    category: "audio",
    price: 6490,
    originalPrice: null,
    rating: 4.5,
    reviewCount: 858,
    stock: 35,
    badge: null,
    description: "Personalised Spatial Audio, a contoured design and sweat resistance. All-day comfort with up to 30 hours of listening time.",
    specs: {
      "Audio": "Personalised Spatial Audio",
      "Chip": "Apple H1",
      "Battery": "Up to 6h (30h with case)",
      "Resistance": "IPX4",
      "Charging": "Lightning / MagSafe"
    },
    images: [
      "assets/images/p16-0.jpg",
      "assets/images/p16-1.jpg",
      "assets/images/p16-2.jpg"
    ]
  },

  /* ---------------- WEARABLES ---------------- */
  {
    id: 17,
    name: "Apple Watch Series 9",
    brand: "Apple",
    category: "wearables",
    price: 13900,
    originalPrice: null,
    rating: 4.8,
    reviewCount: 967,
    stock: 24,
    badge: "Best Seller",
    description: "The brightest Apple Watch display yet, the new double-tap gesture and powerful health and safety features — all on the S9 chip.",
    specs: {
      "Display": "Always-On Retina, up to 2000 nits",
      "Chip": "S9 SiP",
      "Health": "ECG · Blood Oxygen · Temperature",
      "Durability": "WR50, IP6X",
      "Case": "45mm Aluminium"
    },
    images: [
      "assets/images/p17-0.jpg",
      "assets/images/p17-1.jpg",
      "assets/images/p17-2.jpg"
    ]
  },
  {
    id: 18,
    name: "Apple Watch Ultra 2",
    brand: "Apple",
    category: "wearables",
    price: 29900,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 312,
    stock: 6,
    badge: "New",
    description: "The most rugged and capable Apple Watch. A 49mm titanium case, the brightest display ever and precision dual-frequency GPS for the most extreme adventures.",
    specs: {
      "Display": "49mm, up to 3000 nits",
      "Chip": "S9 SiP",
      "Case": "Titanium",
      "GPS": "Precision dual-frequency",
      "Battery": "Up to 36 hours"
    },
    images: [
      "assets/images/p18-0.jpg",
      "assets/images/p18-1.jpg",
      "assets/images/p18-2.jpg"
    ]
  },
  {
    id: 19,
    name: "Samsung Galaxy Watch6",
    brand: "Samsung",
    category: "wearables",
    price: 10900,
    originalPrice: 12900,
    rating: 4.5,
    reviewCount: 418,
    stock: 16,
    badge: "Sale",
    description: "A slimmer design with a larger, sharper display. Advanced sleep coaching and comprehensive health tracking, powered by Wear OS.",
    specs: {
      "Display": "1.5-inch Super AMOLED",
      "Processor": "Exynos W930",
      "Health": "BioActive Sensor",
      "OS": "Wear OS powered by Samsung",
      "Case": "44mm Aluminium"
    },
    images: [
      "assets/images/p19-0.jpg",
      "assets/images/p19-1.jpg",
      "assets/images/p19-2.jpg"
    ]
  },
  {
    id: 20,
    name: "Apple Watch SE",
    brand: "Apple",
    category: "wearables",
    price: 8900,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 1054,
    stock: 28,
    badge: null,
    description: "The essential Apple Watch experience at a great value. Fitness and sleep tracking, Crash Detection and the features that matter most.",
    specs: {
      "Display": "Retina display",
      "Chip": "S8 SiP",
      "Health": "Heart Rate · Crash Detection",
      "Durability": "WR50",
      "Case": "44mm Aluminium"
    },
    images: [
      "assets/images/p20-0.jpg",
      "assets/images/p20-1.jpg",
      "assets/images/p20-2.jpg"
    ]
  }
];

export default products;

/* Category metadata — line-icon SVGs (no emoji) */
export const categories = [
  {
    key: "phones", label: "Phones",
    icon: `<svg class="ic-svg" viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><line x1="10.5" y1="18.5" x2="13.5" y2="18.5"/></svg>`
  },
  {
    key: "laptops", label: "Laptops",
    icon: `<svg class="ic-svg" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="10" rx="1.5"/><path d="M2.5 18.5h19l-1-2H3.5l-1 2z"/></svg>`
  },
  {
    key: "tablets", label: "Tablets",
    icon: `<svg class="ic-svg" viewBox="0 0 24 24" aria-hidden="true"><rect x="4.5" y="3" width="15" height="18" rx="2"/><line x1="10.5" y1="18" x2="13.5" y2="18"/></svg>`
  },
  {
    key: "audio", label: "Audio",
    icon: `<svg class="ic-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13v-1a8 8 0 0 1 16 0v1"/><rect x="3" y="13" width="4" height="6" rx="1.5"/><rect x="17" y="13" width="4" height="6" rx="1.5"/></svg>`
  },
  {
    key: "wearables", label: "Wearables",
    icon: `<svg class="ic-svg" viewBox="0 0 24 24" aria-hidden="true"><rect x="7" y="7" width="10" height="10" rx="3"/><path d="M9 7l.5-3h5l.5 3M9 17l.5 3h5l.5-3"/></svg>`
  }
];

export function getProductById(id) {
  return products.find(p => p.id === Number(id));
}
