// DEMO CATALOGUE — names, prices, discounts and stock are sample data for the
// proposal, not Mayuram Boutique's real inventory. Replace with the client's
// products; images live in public/images/<image>.webp (+ -sm.webp thumbnail).

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
      'A deep plum body scattered with gold buttas, finished with a rani-pink border woven in the classic temple pattern.',
    colors: [
      { name: 'Plum', hex: '#3f1250' },
      { name: 'Rani pink', hex: '#b0286a' },
    ],
    featured: true,
  },
  {
    id: 'soft-silk-peacock',
    name: 'Traditional Soft Silk Saree',
    category: 'silk',
    tags: ['silk', 'soft-silk', 'festive', 'traditional', 'zari', 'lightweight'],
    price: 7850,
    image: 'p-softsilk',
    fabric: 'Soft silk with rudraksha-motif zari border',
    description: 'Peacock-blue soft silk that drapes easily and is light enough to wear through a long function.',
    colors: [
      { name: 'Peacock blue', hex: '#0b3a66' },
      { name: 'Teal', hex: '#0e7088' },
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
    fabric: 'Handloom cotton with maroon thread border',
    description: 'Off-white cotton with a woven maroon border for everyday elegance.',
    colors: [
      { name: 'Off-white', hex: '#ede2c8' },
      { name: 'Maroon', hex: '#7a1424' },
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
    fabric: 'Chiffon with soft floral print and sheer finish',
    description: 'Lavender chiffon with a delicate floral print. Light, flowing and easy to carry for evening events.',
    colors: [{ name: 'Lavender', hex: '#9c84c4' }],
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
    description: 'Deep maroon bridal silk with a bottle-green contrast border and rich gold zari.',
    colors: [
      { name: 'Maroon', hex: '#6e0c1a' },
      { name: 'Bottle green', hex: '#2c5a2a' },
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
    fabric: 'Silk blouse with hand aari work: gold beads, pearls and kundan stones',
    description: 'Deep U back with layered bead borders, a centre mandala and latkan tassels.',
    colors: [{ name: 'Maroon', hex: '#6e0c1a' }],
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
    colors: [{ name: 'Bottle green', hex: '#0c3a2a' }],
    featured: true,
  },
  {
    id: 'festive-mustard',
    name: 'Elegant Festive Saree',
    category: 'festive',
    tags: ['silk', 'festive', 'zari', 'traditional', 'new'],
    price: 9650,
    mrp: 10800,
    image: 'p-festive',
    fabric: 'Art silk with mango buttas and maroon zari border',
    description: 'Mustard gold with a maroon border. A bright choice for Pongal, Deepavali and family functions.',
    colors: [
      { name: 'Mustard', hex: '#b8800f' },
      { name: 'Maroon', hex: '#6e0f2a' },
    ],
    featured: true,
  },
  {
    id: 'emerald-silk',
    name: 'Emerald Pink-Border Silk Saree',
    category: 'silk',
    tags: ['silk', 'kanchipuram', 'wedding', 'zari', 'festive', 'trending'],
    price: 15200,
    image: 'p-green-silk',
    fabric: 'Silk with pink korvai border',
    description: 'A classic green-and-pink pairing with gold flower buttas.',
    colors: [
      { name: 'Emerald', hex: '#0e4a36' },
      { name: 'Pink', hex: '#c02a5a' },
    ],
  },
  {
    id: 'mint-linen',
    name: 'Mint Linen Saree',
    category: 'cotton',
    tags: ['linen', 'cotton', 'daily', 'lightweight', 'printed', 'new'],
    price: 3250,
    image: 'p-linen',
    fabric: 'Linen-cotton blend with dotted weave',
    description: 'Cool mint linen for warm Chennai days, office wear and daytime events.',
    colors: [{ name: 'Mint', hex: '#b8d4c0' }],
  },
  {
    id: 'purple-designer-blouse',
    name: 'Readymade Designer Blouse',
    category: 'blouses',
    tags: ['blouses', 'designer', 'readymade', 'traditional'],
    price: 2850,
    image: 'p-designer-blouse',
    fabric: 'Silk blouse with bead-line neckline',
    description: 'Ready to wear in standard sizes, with an elegant beaded back neck.',
    colors: [{ name: 'Purple', hex: '#3f1250' }],
  },
  {
    id: 'wine-georgette',
    name: 'Wine Georgette Saree',
    category: 'designer',
    tags: ['georgette', 'designer', 'party', 'embroidered', 'trending'],
    price: 5600,
    mrp: 6200,
    image: 'p-georgette',
    fabric: 'Georgette with sequin dots and zari border',
    description: 'Fluid wine georgette with a fine sparkle for receptions and parties.',
    colors: [{ name: 'Wine', hex: '#4a0c24' }],
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
