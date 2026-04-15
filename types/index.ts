// ============================================
// PRINTFORGE - Core Types
// ============================================

export interface ProductSize {
  id: string
  label: string
  width: number  // inches
  height: number // inches
  b2signSku: string
  b2signPrice: number // wholesale cost from B2Sign
}

export interface FinishOption {
  id: string
  label: string
  description: string
  priceAdder: number // additional cost
}

export interface Product {
  id: string
  name: string
  category: string
  description: string
  thumbnail: string
  mockupTemplate: string // path to mockup PNG
  sizes: ProductSize[]
  finishes: FinishOption[]
  material: string
  turnaround: string
  tags: string[]
  b2signCategory: string
}

export interface CartItem {
  id: string
  product: Product
  selectedSize: ProductSize
  selectedFinish: FinishOption
  quantity: number
  designDataUrl: string | null  // base64 PNG of the design
  designPrompt: string | null   // AI prompt used
  retailPrice: number
  notes: string
}

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: ShippingAddress
  items: OrderItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  stripePaymentIntentId: string
  status: 'pending' | 'paid' | 'sent_to_b2sign' | 'in_production' | 'shipped' | 'delivered'
  createdAt: string
  b2signOrderNumber?: string
}

export interface OrderItem {
  productName: string
  productId: string
  size: string
  finish: string
  quantity: number
  b2signSku: string
  b2signWholesalePrice: number
  retailPrice: number
  designFileUrl: string
  designPrompt?: string
  notes?: string
}

export interface ShippingAddress {
  name: string
  line1: string
  line2?: string
  city: string
  state: string
  zip: string
  country: string
}

export interface DesignerState {
  canvasWidth: number
  canvasHeight: number
  elements: DesignerElement[]
  backgroundColor: string
  backgroundImage: string | null
}

export interface DesignerElement {
  id: string
  type: 'text' | 'image' | 'shape'
  x: number
  y: number
  width?: number
  height?: number
  rotation: number
  // text
  text?: string
  fontSize?: number
  fontFamily?: string
  fill?: string
  // image
  src?: string
}
