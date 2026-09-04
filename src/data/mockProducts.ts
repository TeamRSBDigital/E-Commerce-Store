import { Product, Category, Brand, Coupon, Review } from '../types';

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Smartphones & Gadgets',
    slug: 'smartphones-gadgets',
    iconName: 'Smartphone',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    itemCount: 42,
    subcategories: ['Android Phones', 'iPhones', 'Smartwatches', 'Power Banks', 'Chargers & Cables']
  },
  {
    id: 'cat-2',
    name: 'Audio & Headphones',
    slug: 'audio-headphones',
    iconName: 'Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    itemCount: 28,
    subcategories: ['TWS Earbuds', 'Wireless Headphones', 'Bluetooth Speakers', 'Neckbands']
  },
  {
    id: 'cat-3',
    name: 'Men\'s Fashion',
    slug: 'mens-fashion',
    iconName: 'Shirt',
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80',
    itemCount: 56,
    subcategories: ['Panjabi & Kurta', 'Casual Shirts', 'Polo T-Shirts', 'Denim Jeans', 'Footwear']
  },
  {
    id: 'cat-4',
    name: 'Women\'s Fashion',
    slug: 'womens-fashion',
    iconName: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80',
    itemCount: 49,
    subcategories: ['Sarees', 'Salwar Kameez', 'Kurtis & Tunics', 'Handbags', 'Jewelry']
  },
  {
    id: 'cat-5',
    name: 'Home & Kitchen Appliances',
    slug: 'home-kitchen',
    iconName: 'Home',
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=600&q=80',
    itemCount: 34,
    subcategories: ['Blenders & Grinders', 'Air Fryers', 'Electric Kettles', 'Rice Cookers', 'Cookware']
  },
  {
    id: 'cat-6',
    name: 'Laptops & Computing',
    slug: 'laptops-computing',
    iconName: 'Laptop',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80',
    itemCount: 23,
    subcategories: ['Ultrabooks', 'Gaming Laptops', 'Keyboards & Mice', 'Monitors', 'Storage Drives']
  }
];

export const MOCK_BRANDS: Brand[] = [
  { id: 'b-1', name: 'Walton', slug: 'walton', productCount: 18 },
  { id: 'b-2', name: 'Samsung', slug: 'samsung', productCount: 24 },
  { id: 'b-3', name: 'Xiaomi', slug: 'xiaomi', productCount: 29 },
  { id: 'b-4', name: 'Apple', slug: 'apple', productCount: 16 },
  { id: 'b-5', name: 'Apex', slug: 'apex', productCount: 14 },
  { id: 'b-6', name: 'Aarong', slug: 'aarong', productCount: 21 },
  { id: 'b-7', name: 'Anker', slug: 'anker', productCount: 15 },
  { id: 'b-8', name: 'Miyako', slug: 'miyako', productCount: 12 },
  { id: 'b-9', name: 'Realme', slug: 'realme', productCount: 17 }
];

export const MOCK_COUPONS: Coupon[] = [
  {
    code: 'EID2026',
    discountType: 'percentage',
    value: 15,
    minSpend: 1500,
    description: '15% Off on orders above ৳1,500 (Max discount ৳600)'
  },
  {
    code: 'DHAKA60',
    discountType: 'fixed',
    value: 60,
    minSpend: 1000,
    description: '৳60 Off on delivery fee'
  },
  {
    code: 'WELCOME500',
    discountType: 'fixed',
    value: 500,
    minSpend: 4000,
    description: 'Flat ৳500 Off on orders above ৳4,000'
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p-1',
    slug: 'soundcore-space-one-anc-headphones',
    title: 'Anker Soundcore Space One Active Noise Cancelling Headphones',
    category: 'Audio & Headphones',
    categorySlug: 'audio-headphones',
    brand: 'Anker',
    price: 9450,
    originalPrice: 11990,
    discountPercentage: 21,
    rating: 4.8,
    reviewCount: 128,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 34,
    isHot: true,
    isBestSeller: true,
    description: '2X stronger voice reduction with upgraded noise cancelling system. Hear every detail with 40mm dynamic drivers supporting LDAC wireless Hi-Res audio. 55 hours playtime with ANC off and 40 hours with ANC turned on.',
    shortDescription: 'Hi-Res Wireless Audio with 2X stronger noise cancelling & 55-hour battery life.',
    specifications: {
      'Driver Size': '40mm Custom Dynamic Drivers',
      'Playtime': 'Up to 55 Hours (ANC Off), 40 Hours (ANC On)',
      'Connectivity': 'Bluetooth 5.3, AUX 3.5mm',
      'Fast Charging': '5 mins = 4 hours playback',
      'Weight': '265g',
      'Warranty': '18 Months Official Brand Warranty'
    },
    variants: [
      { type: 'color', name: 'Color', options: ['Jet Black', 'Sky Blue', 'Latte Cream'] }
    ],
    tags: ['Headphones', 'ANC', 'Wireless', 'Hi-Res Audio'],
    sku: 'ANK-SPO-BLK-01'
  },
  {
    id: 'p-2',
    slug: 'samsung-galaxy-s24-ultra-5g',
    title: 'Samsung Galaxy S24 Ultra 5G (12GB RAM / 256GB ROM)',
    category: 'Smartphones & Gadgets',
    categorySlug: 'smartphones-gadgets',
    brand: 'Samsung',
    price: 142000,
    originalPrice: 154999,
    discountPercentage: 8,
    rating: 4.9,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 15,
    isHot: true,
    isNew: true,
    description: 'Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, unleash whole new levels of creativity, productivity and possibility. Features titanium exterior shield, 200MP camera system, and Snapdragon 8 Gen 3.',
    shortDescription: 'Titanium frame, Galaxy AI suite, 200MP camera with built-in S Pen.',
    specifications: {
      'Display': '6.8" Dynamic AMOLED 2X, 120Hz, 2600 nits',
      'Processor': 'Snapdragon 8 Gen 3 for Galaxy (4nm)',
      'RAM & Storage': '12GB RAM, 256GB UFS 4.0',
      'Rear Camera': '200MP + 50MP + 12MP + 10MP Quad Camera',
      'Battery': '5000 mAh with 45W Fast Charging',
      'Warranty': '1 Year Official Samsung Bangladesh Warranty'
    },
    variants: [
      { type: 'color', name: 'Color', options: ['Titanium Gray', 'Titanium Black', 'Titanium Violet'] },
      { type: 'storage', name: 'Storage', options: ['256GB', '512GB'] }
    ],
    tags: ['Smartphone', 'Samsung', '5G', 'Flagship', 'Galaxy AI'],
    sku: 'SAM-S24U-256-GRY'
  },
  {
    id: 'p-3',
    slug: 'walton-primo-s8-pro',
    title: 'Walton Primo S8 Pro (8GB RAM / 128GB ROM)',
    category: 'Smartphones & Gadgets',
    categorySlug: 'smartphones-gadgets',
    brand: 'Walton',
    price: 19999,
    originalPrice: 23999,
    discountPercentage: 17,
    rating: 4.6,
    reviewCount: 94,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 42,
    isBestSeller: true,
    description: 'Crafted proudly in Bangladesh. Walton Primo S8 Pro packs a punch with 6.78" FHD+ display, MediaTek Helio G95 gaming chipset, 64MP AI Quad camera, and 5000mAh battery with 30W Dart Fast Charging.',
    shortDescription: 'Made in Bangladesh flagship value with 64MP Quad Camera and 8GB RAM.',
    specifications: {
      'Display': '6.78" FHD+ 90Hz LTPS Display',
      'Processor': 'Helio G95 Octa-Core Gaming Processor',
      'Camera': '64MP AI Quad Camera + 16MP Selfie',
      'Battery': '5000 mAh Li-Polymer, 30W Fast Charge',
      'OS': 'Android 13',
      'Warranty': '1 Year Walton Official Warranty'
    },
    variants: [
      { type: 'color', name: 'Color', options: ['Ocean Blue', 'Midnight Black'] }
    ],
    tags: ['Walton', 'Budget Phone', 'Made in Bangladesh', 'Gaming'],
    sku: 'WLT-S8P-128-BLU'
  },
  {
    id: 'p-4',
    slug: 'aarong-pure-cotton-embroidered-panjabi',
    title: 'Aarong Premium Pure Cotton Embroidered Festive Panjabi',
    category: 'Men\'s Fashion',
    categorySlug: 'mens-fashion',
    brand: 'Aarong',
    price: 3850,
    originalPrice: 4500,
    discountPercentage: 14,
    rating: 4.9,
    reviewCount: 88,
    image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 22,
    isHot: true,
    description: 'Celebrate special occasions with timeless craftsmanship. Tailored from 100% breathable organic combed cotton with delicate tonal Kantha-inspired thread embroidery along the placket and mandarin collar.',
    shortDescription: '100% fine cotton with hand-crafted neck embroidery for festivities and Eid.',
    specifications: {
      'Fabric': '100% Organic Combed Cotton',
      'Weave': 'Fine Jacquard Texture',
      'Fit': 'Regular Comfort Fit',
      'Collar': 'Mandarin Band Collar with Buttons',
      'Care': 'Gentle Hand Wash in Cold Water'
    },
    variants: [
      { type: 'size', name: 'Size', options: ['38 (S)', '40 (M)', '42 (L)', '44 (XL)'] },
      { type: 'color', name: 'Color', options: ['Pearl White', 'Royal Navy', 'Olive Green'] }
    ],
    tags: ['Panjabi', 'Aarong', 'Eid Collection', 'Festive', 'Traditional'],
    sku: 'ARG-PNJ-2026-WHT'
  },
  {
    id: 'p-5',
    slug: 'xiaomi-redmi-buds-5-pro',
    title: 'Xiaomi Redmi Buds 5 Pro Hi-Res Wireless Earbuds',
    category: 'Audio & Headphones',
    categorySlug: 'audio-headphones',
    brand: 'Xiaomi',
    price: 6490,
    originalPrice: 7990,
    discountPercentage: 19,
    rating: 4.7,
    reviewCount: 215,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 50,
    isBestSeller: true,
    description: 'Up to 52dB deep active noise cancellation with 4kHz ultra-wide frequency noise reduction. Equipped with coaxial dual drivers (11mm titanium bass driver + 10mm piezoelectric ceramic tweeter) certified by Hi-Res Audio Wireless.',
    shortDescription: '52dB Active Noise Cancellation with Coaxial Dual Drivers and 38-hour battery.',
    specifications: {
      'ANC Level': 'Up to 52dB Ultra-wide Band ANC',
      'Drivers': '11mm Titanium Woofer + 10mm Ceramic Tweeter',
      'Battery Life': 'Up to 38 Hours with charging case',
      'Bluetooth': 'v5.3 with LHDC 5.0 support',
      'Water Resistance': 'IP54 Dust and Splash Resistant',
      'Warranty': '6 Months Brand Warranty'
    },
    variants: [
      { type: 'color', name: 'Color', options: ['Midnight Black', 'Moonlight White', 'Aurora Purple'] }
    ],
    tags: ['Earbuds', 'TWS', 'ANC', 'Xiaomi'],
    sku: 'XIA-RDB5P-BLK'
  },
  {
    id: 'p-6',
    slug: 'miyako-electric-air-fryer-af-600',
    title: 'Miyako AF-600 Digital Touchscreen Air Fryer (6.5 Litre)',
    category: 'Home & Kitchen Appliances',
    categorySlug: 'home-kitchen',
    brand: 'Miyako',
    price: 7950,
    originalPrice: 9950,
    discountPercentage: 20,
    rating: 4.8,
    reviewCount: 167,
    image: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 18,
    isHot: true,
    description: 'Cook delicious crispy snacks, samosas, chicken roast, and french fries with 85% less oil. Featuring Rapid 360° Air Circulation technology, 8 preset cooking programs, and non-stick dishwasher safe basket.',
    shortDescription: '6.5L Large Family Capacity with 8 Preset Cooking Menus and 85% Oil Reduction.',
    specifications: {
      'Capacity': '6.5 Liters (Whole Chicken Fits)',
      'Power': '1800W High Efficiency Heating',
      'Control': 'Digital LED Touch Screen',
      'Temperature Range': '80°C - 200°C',
      'Safety': 'Auto shut-off & Overheat Protection',
      'Warranty': '1 Year Miyako Service Warranty'
    },
    variants: [
      { type: 'color', name: 'Color', options: ['Piano Black', 'Brushed Inox'] }
    ],
    tags: ['Kitchen', 'Air Fryer', 'Healthy Cooking', 'Miyako'],
    sku: 'MYK-AF600-BLK'
  },
  {
    id: 'p-7',
    slug: 'apex-venturini-genuine-leather-oxford-shoes',
    title: 'Apex Venturini Premium Handcrafted Genuine Leather Formal Shoes',
    category: 'Men\'s Fashion',
    categorySlug: 'mens-fashion',
    brand: 'Apex',
    price: 5290,
    originalPrice: 6290,
    discountPercentage: 16,
    rating: 4.7,
    reviewCount: 73,
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 26,
    isNew: false,
    description: 'Step with confidence into boardrooms and formal events. Crafted from top-grain imported cowhide leather with a cushioned memory foam insole and slip-resistant durable rubber outsole.',
    shortDescription: 'Top-grain cow leather with orthopedic memory foam insole for all-day elegance.',
    specifications: {
      'Upper Material': '100% Genuine Full Grain Cow Leather',
      'Insole': 'Orthopedic High-Density Memory Cushion',
      'Sole': 'Anti-Skid Flexible Rubber Outsole',
      'Toe Shape': 'Classic Almond Cap Toe',
      'Origin': 'Made in Bangladesh by Apex Footwear Ltd.'
    },
    variants: [
      { type: 'size', name: 'Size (EU)', options: ['39', '40', '41', '42', '43', '44'] },
      { type: 'color', name: 'Color', options: ['Classic Black', 'Cognac Tan Brown'] }
    ],
    tags: ['Formal Shoes', 'Leather', 'Apex', 'Footwear'],
    sku: 'APX-VTN-902-BLK'
  },
  {
    id: 'p-8',
    slug: 'dhakai-jamdani-handloom-saree',
    title: 'Authentic Traditional Dhakai Jamdani Handloom Saree (84 Count)',
    category: 'Women\'s Fashion',
    categorySlug: 'womens-fashion',
    brand: 'Aarong',
    price: 12500,
    originalPrice: 15000,
    discountPercentage: 17,
    rating: 4.95,
    reviewCount: 62,
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 11,
    isHot: true,
    description: 'UNESCO Intangible Cultural Heritage woven by master artisans in Rupganj, Narayanganj. Features geometric floral motifs woven directly on pure cotton-silk yarn using the authentic centuries-old pit-loom technique.',
    shortDescription: 'Heritage 84 count Dhakai Jamdani with intricate floral Zari weave.',
    specifications: {
      'Weave Count': '84 Count Superfine Cotton Silk',
      'Length': '5.5 Meters Saree + Matching Unstitched Blouse Piece',
      'Zari Work': 'High Quality Anti-Tarnish Gold Foil Zari',
      'Origin': 'Handmade in Rupganj, Narayanganj, Bangladesh',
      'Care': 'Strictly Dry Clean Only'
    },
    variants: [
      { type: 'color', name: 'Color', options: ['Crimson Red & Gold', 'Midnight Black & Silver', 'Teal Blue'] }
    ],
    tags: ['Jamdani', 'Saree', 'Handloom', 'Dhakai', 'Wedding'],
    sku: 'JMD-RUP-84C-RED'
  },
  {
    id: 'p-9',
    slug: 'apple-macbook-air-m3-13-inch',
    title: 'Apple MacBook Air 13-inch M3 Chip (16GB RAM / 512GB SSD)',
    category: 'Laptops & Computing',
    categorySlug: 'laptops-computing',
    brand: 'Apple',
    price: 178000,
    originalPrice: 189000,
    discountPercentage: 6,
    rating: 4.9,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 8,
    isNew: true,
    description: 'Supercharged by the next-generation M3 chip, MacBook Air blends blazing performance with up to 18 hours of battery life inside a razor-thin unibody aluminum enclosure. Supports up to two external displays.',
    shortDescription: 'Apple M3 Chip, 13.6-inch Liquid Retina Display, 18-Hour Battery Life.',
    specifications: {
      'Processor': 'Apple M3 chip (8-core CPU, 10-core GPU)',
      'Memory': '16GB Unified Memory',
      'Storage': '512GB High Speed SSD',
      'Display': '13.6" Liquid Retina Display with True Tone',
      'Weight': '1.24 kg Ultra-portable',
      'Warranty': '1 Year Apple Official International Warranty'
    },
    variants: [
      { type: 'color', name: 'Color', options: ['Midnight', 'Starlight', 'Space Gray', 'Silver'] }
    ],
    tags: ['Apple', 'MacBook', 'M3', 'Laptop', 'Ultrabook'],
    sku: 'APL-MBA-M3-16-512'
  },
  {
    id: 'p-10',
    slug: 'anker-powercore-20000mah-power-bank',
    title: 'Anker 335 PowerCore 20,000mAh 22.5W Fast Charging Power Bank',
    category: 'Smartphones & Gadgets',
    categorySlug: 'smartphones-gadgets',
    brand: 'Anker',
    price: 3450,
    originalPrice: 4200,
    discountPercentage: 18,
    rating: 4.85,
    reviewCount: 420,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 65,
    isBestSeller: true,
    description: 'Massive 20,000mAh capacity provides over 4 full charges for iPhone 15 or 3 charges for Samsung Galaxy S24. High-speed 22.5W PowerIQ 3.0 output powers your device to 50% in just 30 minutes.',
    shortDescription: '20,000mAh Battery with 22.5W USB-C PowerIQ 3.0 and MultiProtect Safety.',
    specifications: {
      'Capacity': '20,000 mAh / 74Wh',
      'Outputs': '2x USB-A (22.5W Max) + 1x USB-C (20W PD)',
      'Input': 'USB-C Fast Recharging',
      'Protection': 'MultiProtect 11-point safety system',
      'Warranty': '18 Months Anker Official Replacement Warranty'
    },
    variants: [
      { type: 'color', name: 'Color', options: ['Matte Black', 'Glacier White'] }
    ],
    tags: ['PowerBank', 'Anker', 'FastCharge', 'TravelEssential'],
    sku: 'ANK-PWR-20K-BLK'
  },
  {
    id: 'p-11',
    slug: 'realme-watch-s2-amoled-smartwatch',
    title: 'Realme Watch S2 Stainless Steel Smartwatch with Bluetooth Calling',
    category: 'Smartphones & Gadgets',
    categorySlug: 'smartphones-gadgets',
    brand: 'Realme',
    price: 7290,
    originalPrice: 8990,
    discountPercentage: 19,
    rating: 4.6,
    reviewCount: 110,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 29,
    isNew: true,
    description: 'Featuring a crisp 1.43" AMOLED display with 600 nits brightness and Always-On Display. Stainless steel bezel, AI-powered heart rate and SpO2 tracking, 110+ sports modes, and AI voice assistance.',
    shortDescription: '1.43" AMOLED Display, AI Noise Cancelling Calls & 14-day Battery.',
    specifications: {
      'Display': '1.43" HD AMOLED 466x466 pixels, 60fps',
      'Body': 'Surgical Grade Stainless Steel Frame',
      'Battery': 'Up to 14 Days on single charge',
      'Waterproof': 'IP68 Water & Dust Resistant (5ATM)',
      'Sensors': 'Optical Heart Rate, SpO2, Sleep, Accelerometer',
      'Warranty': '1 Year Realme Official Warranty'
    },
    variants: [
      { type: 'color', name: 'Color', options: ['Midnight Black', 'Metallic Silver', 'Ocean Blue'] }
    ],
    tags: ['Smartwatch', 'Realme', 'AMOLED', 'Fitness'],
    sku: 'RLM-WTS2-SLV'
  },
  {
    id: 'p-12',
    slug: 'walton-rice-cooker-wrc-g28',
    title: 'Walton Double Pot Automatic Rice Cooker (2.8 Litre)',
    category: 'Home & Kitchen Appliances',
    categorySlug: 'home-kitchen',
    brand: 'Walton',
    price: 3150,
    originalPrice: 3800,
    discountPercentage: 17,
    rating: 4.75,
    reviewCount: 184,
    image: 'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&w=800&q=80'
    ],
    inStock: true,
    stockCount: 40,
    isBestSeller: true,
    description: 'Effortless cooking for the entire family. Features dual inner pots (one food-grade stainless steel pot and one non-stick coated pot). Auto keep-warm function keeps rice steaming hot for up to 12 hours.',
    shortDescription: 'Dual Pots (Stainless Steel + Non-Stick) with Auto Warm & Steamer Basket.',
    specifications: {
      'Capacity': '2.8 Liters (Serves 6-8 people)',
      'Pots Included': '1x Stainless Steel Pot + 1x Honeycomb Non-Stick Pot',
      'Power': '1000W Energy Saving Coil',
      'Accessories': 'Steamer Tray, Measuring Cup, Serving Ladle',
      'Warranty': '1 Year Walton Service Warranty'
    },
    variants: [
      { type: 'color', name: 'Color', options: ['Metallic Rose Gold', 'Silver Gray'] }
    ],
    tags: ['RiceCooker', 'Walton', 'HomeAppliances', 'Kitchen'],
    sku: 'WLT-RC-28G-RSG'
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Tanvir Hossain',
    location: 'Dhanmondi, Dhaka',
    rating: 5,
    date: '3 days ago',
    comment: 'Sound quality is unmatched! The ANC cancels out all the Dhaka city street traffic noise. Delivered within 24 hours via Pathao Courier. Highly recommend this store!',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    author: 'Nusrat Jahan',
    location: 'Agrabad, Chattogram',
    rating: 5,
    date: '1 week ago',
    comment: 'The packaging was top notch with bubble wrap. 100% authentic product with genuine brand warranty card inside. Paid via bKash smoothly.',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    author: 'Farhan Ahmed',
    location: 'Sylhet City',
    rating: 4,
    date: '2 weeks ago',
    comment: 'Very pleased with the fast dispatch. Outside Dhaka delivery took just 48 hours to arrive. Product matches the description accurately.',
    verifiedPurchase: true
  }
];
