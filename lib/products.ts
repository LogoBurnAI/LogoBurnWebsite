import { Product } from '@/types'

// ============================================
// B2SIGN PRODUCT CATALOG
// Wholesale prices from b2sign.com
// Your retail price = wholesale * (1 + MARKUP)
// ============================================

export const PRODUCTS: Product[] = [
  // ─── VINYL BANNERS ───────────────────────────────────────
  {
    id: 'vinyl-banner',
    name: 'Vinyl Banner',
    category: 'Banners',
    description: 'Full-color vinyl banners perfect for outdoor events, promotions, grand openings, and more. Durable 13oz vinyl with vibrant UV-resistant inks.',
    thumbnail: '/mockups/vinyl-banner-thumb.jpg',
    mockupTemplate: '/mockups/vinyl-banner.png',
    material: '13oz Scrim Vinyl',
    turnaround: 'Next Day',
    tags: ['outdoor', 'event', 'promotion', 'sale'],
    b2signCategory: 'Banners',
    sizes: [
      { id: 'vb-2x4', label: '2ft x 4ft', width: 24, height: 48, b2signSku: 'VB-2x4', b2signPrice: 18 },
      { id: 'vb-2x6', label: '2ft x 6ft', width: 24, height: 72, b2signSku: 'VB-2x6', b2signPrice: 22 },
      { id: 'vb-2x8', label: '2ft x 8ft', width: 24, height: 96, b2signSku: 'VB-2x8', b2signPrice: 28 },
      { id: 'vb-3x6', label: '3ft x 6ft', width: 36, height: 72, b2signSku: 'VB-3x6', b2signPrice: 32 },
      { id: 'vb-3x8', label: '3ft x 8ft', width: 36, height: 96, b2signSku: 'SBM38', b2signPrice: 45 },
      { id: 'vb-4x8', label: '4ft x 8ft', width: 48, height: 96, b2signSku: 'VB-4x8', b2signPrice: 52 },
      { id: 'vb-4x10', label: '4ft x 10ft', width: 48, height: 120, b2signSku: 'VB-4x10', b2signPrice: 65 },
      { id: 'vb-4x12', label: '4ft x 12ft', width: 48, height: 144, b2signSku: 'VB-4x12', b2signPrice: 78 },
      { id: 'vb-5x10', label: '5ft x 10ft', width: 60, height: 120, b2signSku: 'VB-5x10', b2signPrice: 82 },
      { id: 'vb-10x3', label: '10ft x 3ft', width: 120, height: 36, b2signSku: '10x3', b2signPrice: 75 },
      { id: 'vb-10x4', label: '10ft x 4ft', width: 120, height: 48, b2signSku: '10x4', b2signPrice: 95 },
      { id: 'vb-12x5', label: '12ft x 5ft', width: 144, height: 60, b2signSku: '12x5', b2signPrice: 125 },
    ],
    finishes: [
      { id: 'grommets', label: 'Grommets', description: 'Metal grommets every 2ft for hanging', priceAdder: 0 },
      { id: 'pole-pockets', label: 'Pole Pockets', description: 'Top & bottom pole pockets', priceAdder: 8 },
      { id: 'hemmed', label: 'Hemmed Only', description: 'Reinforced hemmed edges, no grommets', priceAdder: 0 },
    ],
  },

  // ─── RETRACTABLE BANNERS ──────────────────────────────────
  {
    id: 'retractable-banner',
    name: 'Retractable Banner Stand',
    category: 'Displays',
    description: 'Professional retractable banner stands for trade shows, retail, and events. Includes stand hardware and carrying case.',
    thumbnail: '/mockups/retractable-banner-thumb.jpg',
    mockupTemplate: '/mockups/retractable-banner.png',
    material: 'Premium Poly Film',
    turnaround: 'Next Day',
    tags: ['trade show', 'display', 'indoor', 'professional'],
    b2signCategory: 'Retractable Banners',
    sizes: [
      { id: 'rb-24x63', label: '24" x 63"', width: 24, height: 63, b2signSku: 'RB-24x63', b2signPrice: 65 },
      { id: 'rb-33x78', label: '33" x 78"', width: 33, height: 78, b2signSku: 'RB-33x78', b2signPrice: 89 },
      { id: 'rb-36x84', label: '36" x 84"', width: 36, height: 84, b2signSku: 'RB-36x84', b2signPrice: 105 },
      { id: 'rb-mini', label: 'Mini 11.5" x 17.5"', width: 11.5, height: 17.5, b2signSku: 'TTBS', b2signPrice: 35 },
    ],
    finishes: [
      { id: 'standard', label: 'Standard', description: 'Standard finish', priceAdder: 0 },
      { id: 'matte', label: 'Matte Laminate', description: 'Anti-glare matte finish', priceAdder: 15 },
    ],
  },

  // ─── TABLE COVERS ─────────────────────────────────────────
  {
    id: 'table-cover',
    name: 'Table Cover',
    category: 'Table Covers',
    description: 'Dye-sublimated full-color table covers for trade shows, conferences, and events. Machine washable.',
    thumbnail: '/mockups/table-cover-thumb.jpg',
    mockupTemplate: '/mockups/table-cover.png',
    material: 'Polyester Dye-Sublimation',
    turnaround: 'Next Day',
    tags: ['trade show', 'table', 'event', 'professional'],
    b2signCategory: 'Table Covers',
    sizes: [
      { id: 'tc-4ft-throw', label: '4ft Throw', width: 48, height: 30, b2signSku: 'TC-4FTTHROW', b2signPrice: 89 },
      { id: 'tc-6ft-throw', label: '6ft Throw', width: 72, height: 30, b2signSku: '6FTDSTC', b2signPrice: 129 },
      { id: 'tc-8ft-throw', label: '8ft Throw', width: 96, height: 30, b2signSku: 'TC-8FTTHROW', b2signPrice: 149 },
      { id: 'tc-6ft-stretch-3side', label: '6ft Stretch (3-Sided)', width: 72, height: 30, b2signSku: '24HR6FTSTC', b2signPrice: 189 },
      { id: 'tc-8ft-stretch-3side', label: '8ft Stretch (3-Sided)', width: 96, height: 30, b2signSku: '24HR8FTSTC', b2signPrice: 219 },
    ],
    finishes: [
      { id: 'open-back', label: 'Open Back', description: 'Open back for easy access', priceAdder: 0 },
      { id: 'closed-back', label: 'Closed Back', description: 'Fully enclosed table cover', priceAdder: 20 },
    ],
  },

  // ─── EVENT TENTS ──────────────────────────────────────────
  {
    id: 'event-tent',
    name: 'Custom Event Tent',
    category: 'Canopies',
    description: 'Custom branded event tents with full-color canopy printing. Perfect for outdoor events, festivals, and promotions.',
    thumbnail: '/mockups/event-tent-thumb.jpg',
    mockupTemplate: '/mockups/event-tent.png',
    material: '600D Polyester Canopy',
    turnaround: '3-5 Business Days',
    tags: ['outdoor', 'event', 'festival', 'canopy'],
    b2signCategory: 'Canopies',
    sizes: [
      { id: 'tent-10x10', label: '10ft x 10ft', width: 120, height: 120, b2signSku: 'ET-10x10', b2signPrice: 695 },
      { id: 'tent-10x15', label: '10ft x 15ft', width: 120, height: 180, b2signSku: 'ET-10x15', b2signPrice: 895 },
      { id: 'tent-10x20', label: '10ft x 20ft', width: 120, height: 240, b2signSku: 'ET-10x20', b2signPrice: 1195 },
    ],
    finishes: [
      { id: 'canopy-only', label: 'Canopy Only', description: 'Canopy print only, no frame', priceAdder: 0 },
      { id: 'with-walls', label: '+ Side Walls', description: 'Add full-print side walls', priceAdder: 295 },
      { id: 'with-backwall', label: '+ Back Wall Only', description: 'Branded back wall panel', priceAdder: 145 },
    ],
  },

  // ─── STEP & REPEAT BACKDROP ───────────────────────────────
  {
    id: 'step-repeat',
    name: 'Step & Repeat Backdrop',
    category: 'Displays',
    description: 'Professional step and repeat backdrops for events, photo ops, red carpets, and brand activations.',
    thumbnail: '/mockups/step-repeat-thumb.jpg',
    mockupTemplate: '/mockups/step-repeat.png',
    material: '13oz Scrim Vinyl',
    turnaround: 'Next Day',
    tags: ['event', 'photo', 'backdrop', 'red carpet'],
    b2signCategory: 'Banners',
    sizes: [
      { id: 'sr-8x8', label: '8ft x 8ft', width: 96, height: 96, b2signSku: 'SRB-8x8', b2signPrice: 89 },
      { id: 'sr-10x8', label: '10ft x 8ft', width: 120, height: 96, b2signSku: 'SRB-10x8', b2signPrice: 129 },
      { id: 'sr-12x8', label: '12ft x 8ft', width: 144, height: 96, b2signSku: 'SRB-12x8', b2signPrice: 149 },
      { id: 'sr-10x10', label: '10ft x 10ft', width: 120, height: 120, b2signSku: 'SRB-10x10', b2signPrice: 159 },
      { id: 'sr-20x8', label: '20ft x 8ft', width: 240, height: 96, b2signSku: 'SRB-20x8', b2signPrice: 249 },
    ],
    finishes: [
      { id: 'grommets', label: 'Grommets', description: 'Metal grommets for hanging', priceAdder: 0 },
      { id: 'stand-bundle', label: '+ Adjustable Stand', description: 'Includes X-frame stand', priceAdder: 145 },
    ],
  },

  // ─── FEATHER FLAGS ────────────────────────────────────────
  {
    id: 'feather-flag',
    name: 'Feather Flag',
    category: 'Flags',
    description: 'Eye-catching feather flags to attract attention to your business or event. Includes ground stake hardware.',
    thumbnail: '/mockups/feather-flag-thumb.jpg',
    mockupTemplate: '/mockups/feather-flag.png',
    material: 'Dye-Sublimated Polyester',
    turnaround: 'Next Day',
    tags: ['outdoor', 'flag', 'attention', 'sale'],
    b2signCategory: 'Flags',
    sizes: [
      { id: 'ff-small', label: 'Small (8.2ft)', width: 18, height: 98, b2signSku: 'FF-SM', b2signPrice: 49 },
      { id: 'ff-medium', label: 'Medium (11.5ft)', width: 22, height: 138, b2signSku: 'FF-MD', b2signPrice: 59 },
      { id: 'ff-large', label: 'Large (14ft)', width: 26, height: 168, b2signSku: 'FF-LG', b2signPrice: 69 },
      { id: 'ff-xlarge', label: 'XL (16.4ft)', width: 28, height: 197, b2signSku: 'FF-XL', b2signPrice: 79 },
    ],
    finishes: [
      { id: 'single-sided', label: 'Single Sided', description: 'Print on one side (mirror shows through)', priceAdder: 0 },
      { id: 'double-sided', label: 'Double Sided', description: 'Unique print on each side', priceAdder: 35 },
    ],
  },

  // ─── WALL GRAPHICS ────────────────────────────────────────
  {
    id: 'wall-graphic',
    name: 'Wall Graphic / Mural',
    category: 'Wall Art',
    description: 'Transform any wall with custom printed wall graphics and murals. Removable or permanent adhesive options.',
    thumbnail: '/mockups/wall-graphic-thumb.jpg',
    mockupTemplate: '/mockups/wall-graphic.png',
    material: 'Vinyl Wall Film',
    turnaround: '2-3 Business Days',
    tags: ['interior', 'mural', 'decor', 'retail'],
    b2signCategory: 'Wall Art',
    sizes: [
      { id: 'wg-4x4', label: '4ft x 4ft', width: 48, height: 48, b2signSku: 'WG-4x4', b2signPrice: 79 },
      { id: 'wg-4x8', label: '4ft x 8ft', width: 48, height: 96, b2signSku: 'WG-4x8', b2signPrice: 129 },
      { id: 'wg-8x8', label: '8ft x 8ft', width: 96, height: 96, b2signSku: 'WG-8x8', b2signPrice: 219 },
      { id: 'wg-8x12', label: '8ft x 12ft', width: 96, height: 144, b2signSku: 'WG-8x12', b2signPrice: 299 },
    ],
    finishes: [
      { id: 'removable', label: 'Removable', description: 'Peel & restick, no damage', priceAdder: 0 },
      { id: 'permanent', label: 'Permanent', description: 'Permanent adhesive', priceAdder: 0 },
      { id: 'textured', label: 'Textured Fabric', description: 'Woven fabric material', priceAdder: 45 },
    ],
  },

  // ─── FLOOR GRAPHICS ───────────────────────────────────────
  {
    id: 'floor-graphic',
    name: 'Floor Graphic',
    category: 'Specialty',
    description: 'Non-slip floor graphics for retail stores, events, and wayfinding. DOT-certified anti-slip laminate.',
    thumbnail: '/mockups/floor-graphic-thumb.jpg',
    mockupTemplate: '/mockups/floor-graphic.png',
    material: 'Anti-Slip Floor Vinyl',
    turnaround: '2-3 Business Days',
    tags: ['floor', 'retail', 'wayfinding', 'interior'],
    b2signCategory: 'Specialty',
    sizes: [
      { id: 'fg-12x12', label: '12" x 12"', width: 12, height: 12, b2signSku: 'FG-12x12', b2signPrice: 25 },
      { id: 'fg-24x24', label: '24" x 24"', width: 24, height: 24, b2signSku: 'FG-24x24', b2signPrice: 45 },
      { id: 'fg-24x36', label: '24" x 36"', width: 24, height: 36, b2signSku: 'FG-24x36', b2signPrice: 65 },
      { id: 'fg-36x48', label: '36" x 48"', width: 36, height: 48, b2signSku: 'FG-36x48', b2signPrice: 95 },
    ],
    finishes: [
      { id: 'anti-slip', label: 'Anti-Slip Laminate', description: 'Standard DOT-approved finish', priceAdder: 0 },
      { id: 'high-tack', label: 'High-Tack Adhesive', description: 'For textured/rough floors', priceAdder: 15 },
    ],
  },
]

export const CATEGORIES = [...new Set(PRODUCTS.map(p => p.category))]

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find(p => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return PRODUCTS.filter(p => p.category === category)
}

// Calculate retail price with markup
export function getRetailPrice(wholesalePrice: number, markupPercent = 40): number {
  return Math.ceil(wholesalePrice * (1 + markupPercent / 100))
}
