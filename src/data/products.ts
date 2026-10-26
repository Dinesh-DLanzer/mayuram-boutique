// DEMO CATALOGUE — names, prices, discounts and stock are sample data for the
// proposal, not Mayuram Boutique's real inventory. Replace with the client's
// products; images live in public/images/<image>.webp (+ -sm thumbnail, -detail hover crop).

export type Category = 'silk' | 'cotton' | 'designer' | 'bridal' | 'blouses' | 'festive'

export interface Product {
  id: string
  name: string
  category: Category
  /** Lowercase tags used by the mega menu and search. */
  tags: string[]
  price: number
  mrp?: number
  badge?: string
  priceNote?: string
  image: string
  fabric: string
  description: string
  colors: { name: string; hex: string }[]
  featured?: boolean
}

export const products: Product[] = [
  {
    id: 'royal-kanchipuram',
    name: 'Royal Kanchipuram Silk Saree',
    category: 'silk',
    tags: ['silk', 'kanchipuram', 'wedding', 'zari', 'traditional', 'premium', 'handloom', 'bestseller'],
    price: 18500,
    mrp: 21000,
    badge: 'Bestseller',
    image: 'p-kanchipuram',
    fabric: 'Pure silk with a contrast korvai border and gold zari temple motifs',
    description:
      'A peacock-blue body with a purple korvai border and a broad gold zari band, worn here with temple jewellery.',
    colors: [
      { name: 'Peacock blue', hex: '#1d4f6e' },
      { name: 'Purple', hex: '#5b1f7a' },
    ],
    featured: true,
  },
  {
    id: 'soft-silk-peacock',
    name: 'Royal Blue Soft Silk Saree',
    category: 'silk',
    tags: ['silk', 'soft-silk', 'festive', 'traditional', 'zari', 'lightweight'],
    price: 7850,
    image: 'p-softsilk',
    fabric: 'Soft silk with silver zari pallu and a striped border',
    description: 'Royal-blue soft silk with a red-and-yellow border. Drapes easily and is light enough for a long function.',
    colors: [
      { name: 'Royal blue', hex: '#2b3a8f' },
      { name: 'Silver zari', hex: '#c9c6c0' },
    ],
    featured: true,
  },
  {
    id: 'premium-cotton',
    name: 'Premium Cotton Saree',
    category: 'cotton',
    tags: ['cotton', 'daily', 'handloom', 'lightweight', 'traditional'],
    price: 2450,
    mrp: 2890,
    image: 'p-cotton',
    fabric: 'Handloom cotton with a broad woven border',
    description: 'Mint and ivory cotton finished with a sunshine-yellow border. Breezy enough for all-day wear.',
    colors: [
      { name: 'Mint ivory', hex: '#e4ecd0' },
      { name: 'Sunshine yellow', hex: '#f0b429' },
    ],
    featured: true,
  },
  {
    id: 'designer-chiffon',
    name: 'Designer Chiffon Saree',
    category: 'designer',
    tags: ['chiffon', 'designer', 'party', 'printed', 'lightweight', 'new'],
    price: 4950,
    badge: 'New',
    image: 'p-chiffon',
    fabric: 'Chiffon with a soft sheen and woven buttas',
    description: 'Pastel mint chiffon with a fluid fall. Light, flowing and easy to carry for evening events.',
    colors: [{ name: 'Pastel mint', hex: '#cfe3d4' }],
    featured: true,
  },
  {
    id: 'bridal-wedding',
    name: 'Bridal Wedding Saree',
    category: 'bridal',
    tags: ['silk', 'bridal', 'wedding', 'kanchipuram', 'zari', 'premium', 'bestseller'],
    price: 24900,
    mrp: 27500,
    badge: 'Bridal',
    image: 'p-bridal',
    fabric: 'Heavy silk with full zari border and pallu',
    description: 'Vermilion bridal silk with a rani-pink blouse, gold zari border and a richly woven pallu.',
    colors: [
      { name: 'Vermilion', hex: '#c8352b' },
      { name: 'Rani pink', hex: '#c2185b' },
    ],
    featured: true,
  },
  {
    id: 'aari-designer-blouse',
    name: 'Aari Work Designer Blouse',
    category: 'blouses',
    tags: ['blouses', 'aari', 'designer', 'embroidered', 'bridal', 'trending'],
    price: 6500,
    image: 'p-aari-blouse',
    fabric: 'Velvet blouse with hand aari work in gold thread and sequins',
    description: 'An open keyhole back framed by gold aari borders, with matching work down the sleeves.',
    colors: [{ name: 'Crimson', hex: '#8e0f1c' }],
    featured: true,
  },
  {
    id: 'custom-bridal-blouse',
    name: 'Custom Bridal Blouse',
    category: 'blouses',
    tags: ['blouses', 'bridal', 'maggam', 'custom', 'embroidered'],
    price: 8900,
    priceNote: 'Starting price · made to measure',
    image: 'p-bridal-blouse',
    fabric: 'Made to your measurements with maggam and aari embellishment',
    description: 'Designed around your saree. Choose the neckline, sleeve and embroidery density at a fitting.',
    colors: [{ name: 'Vermilion', hex: '#c9341f' }],
    featured: true,
  },
  {
    id: 'festive-mustard',
    name: 'Sunset Festive Saree',
    category: 'festive',
    tags: ['silk', 'festive', 'zari', 'traditional', 'new'],
    price: 9650,
    mrp: 10800,
    image: 'p-festive',
    fabric: 'Art silk with woven buttas and a contrast pallu',
    description: 'Red with a mustard-yellow pallu. A bright choice for Pongal, Deepavali and family functions.',
    colors: [
      { name: 'Red', hex: '#d0222f' },
      { name: 'Mustard', hex: '#e2a21b' },
    ],
    featured: true,
  },
  {
    id: 'emerald-silk',
    name: 'Emerald Soft Silk Saree',
    category: 'silk',
    tags: ['silk', 'kanchipuram', 'wedding', 'zari', 'festive', 'trending'],
    price: 15200,
    image: 'p-green-silk',
    fabric: 'Soft silk with a woven navy border',
    description: 'Deep emerald silk with silver buttas and a fine navy border.',
    colors: [
      { name: 'Emerald', hex: '#0f4a3a' },
      { name: 'Navy', hex: '#1d2a5a' },
    ],
  },
  {
    id: 'mint-linen',
    name: 'Cobalt Handloom Cotton Saree',
    category: 'cotton',
    tags: ['cotton', 'handloom', 'daily', 'lightweight', 'printed', 'new'],
    price: 3250,
    image: 'p-linen',
    fabric: 'Handloom cotton with a striped pallu',
    description: 'Cobalt cotton with a rainbow-striped pallu: cool for warm Chennai days and easy to drape.',
    colors: [{ name: 'Cobalt', hex: '#1f5fae' }],
  },
  {
    id: 'purple-designer-blouse',
    name: 'Readymade Designer Blouse',
    category: 'blouses',
    tags: ['blouses', 'designer', 'readymade', 'traditional'],
    price: 2850,
    image: 'p-designer-blouse',
    fabric: 'Sheer lilac blouse with a broad gold sleeve border',
    description: 'Ready to wear in standard sizes. The gold-bordered sleeves lift a plain pastel saree.',
    colors: [{ name: 'Lilac', hex: '#c9b6e4' }],
  },
  {
    id: 'wine-georgette',
    name: 'Plum Floral Georgette Saree',
    category: 'designer',
    tags: ['georgette', 'designer', 'party', 'embroidered', 'trending'],
    price: 5600,
    mrp: 6200,
    image: 'p-georgette',
    fabric: 'Georgette with an all-over floral weave',
    description: 'Fluid plum georgette with lilac florals, light enough for receptions and parties.',
    colors: [{ name: 'Plum', hex: '#4b1f6e' }],
  },
]

export const filterTabs: { key: string; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'silk', label: 'Silk Sarees' },
  { key: 'cotton', label: 'Cotton & Linen' },
  { key: 'designer', label: 'Designer' },
  { key: 'bridal', label: 'Bridal' },
  { key: 'blouses', label: 'Blouses' },
]

/** A filter key is a tag, a category, or several joined with "+" (all must match). */
export function matchProducts(key: string): Product[] {
  if (key === 'all') return products.filter((p) => p.featured)
  if (key.startsWith('q:')) return searchProducts(key.slice(2))
  const parts = key.split('+')
  return products.filter((p) => parts.every((t) => p.category === t || p.tags.includes(t)))
}

export const discount = (p: Product) =>
  p.mrp ? Math.round(((p.mrp - p.price) / p.mrp) * 100) : 0

export function searchProducts(q: string): Product[] {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean)
  if (!words.length) return []
  return products.filter((p) => {
    const hay = `${p.name} ${p.category} ${p.tags.join(' ')} ${p.fabric}`.toLowerCase()
    return words.every((w) => hay.includes(w.replace(/s$/, '')))
  })
}
