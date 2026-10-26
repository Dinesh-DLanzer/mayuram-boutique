// Mega menu structure. Each link either filters the product grid (`filter`,
// a tag or "tag+tag") or scrolls to a section (`section`). These are proposed
// categories: delete any line the boutique does not offer.

export interface MenuLink {
  label: string
  filter?: string
  section?: string
  thumb?: string
}

export interface MenuColumn {
  title: string
  links: MenuLink[]
}

export interface MegaMenu {
  id: string
  label: string
  columns: MenuColumn[]
  banner: {
    image: string
    eyebrow: string
    title: string
    text: string
    cta: string
    action: { filter?: string; section?: string; whatsapp?: string }
  }
}

export const megaMenus: MegaMenu[] = [
  {
    id: 'sarees',
    label: 'Sarees',
    columns: [
      {
        title: 'Shop by Fabric',
        links: [
          { label: 'Kanchipuram Silk Sarees', filter: 'kanchipuram', thumb: 'p-kanchipuram' },
          { label: 'Soft Silk Sarees', filter: 'soft-silk', thumb: 'p-softsilk' },
          { label: 'Cotton Sarees', filter: 'cotton', thumb: 'p-cotton' },
          { label: 'Chiffon Sarees', filter: 'chiffon' },
          { label: 'Georgette Sarees', filter: 'georgette' },
          { label: 'Organza Sarees', filter: 'organza' },
          { label: 'Linen Sarees', filter: 'linen' },
          { label: 'Banarasi Sarees', filter: 'banarasi' },
        ],
      },
      {
        title: 'Shop by Occasion',
        links: [
          { label: 'Bridal Sarees', filter: 'bridal', thumb: 'p-bridal' },
          { label: 'Wedding Collections', filter: 'wedding' },
          { label: 'Festive Sarees', filter: 'festive', thumb: 'p-festive' },
          { label: 'Party Wear Sarees', filter: 'party' },
          { label: 'Traditional Sarees', filter: 'traditional' },
          { label: 'Daily Wear Sarees', filter: 'daily' },
          { label: 'Designer Sarees', filter: 'designer' },
        ],
      },
      {
        title: 'Shop by Style',
        links: [
          { label: 'Handloom Sarees', filter: 'handloom' },
          { label: 'Embroidered Sarees', filter: 'embroidered' },
          { label: 'Zari Border Sarees', filter: 'zari' },
          { label: 'Printed Sarees', filter: 'printed' },
          { label: 'Lightweight Sarees', filter: 'lightweight' },
          { label: 'Premium Collections', filter: 'premium' },
          { label: 'New Arrivals', filter: 'new' },
        ],
      },
      {
        title: 'Featured',
        links: [
          { label: 'Trending Sarees', filter: 'trending', thumb: 'p-green-silk' },
          { label: 'Best Sellers', filter: 'bestseller' },
          { label: 'New Collections', filter: 'new' },
          { label: 'Festive Edit', filter: 'festive' },
          { label: 'Wedding Edit', filter: 'wedding' },
        ],
      },
    ],
    banner: {
      image: 'mega-sarees',
      eyebrow: 'Silk edit',
      title: 'The silk edit',
      text: 'Kanchipuram, soft silk and zari borders, with a blouse stitched to match.',
      cta: 'Explore Collection',
      action: { filter: 'silk' },
    },
  },
  {
    id: 'boutique',
    label: 'Boutique Products',
    columns: [
      {
        title: 'Blouses',
        links: [
          { label: 'Readymade Blouses', filter: 'blouses+readymade', thumb: 'p-designer-blouse' },
          { label: 'Designer Blouses', filter: 'blouses+designer' },
          { label: 'Bridal Blouses', filter: 'blouses+bridal', thumb: 'p-bridal-blouse' },
          { label: 'Aari Work Blouses', filter: 'blouses+aari', thumb: 'p-aari-blouse' },
          { label: 'Embroidered Blouses', filter: 'blouses+embroidered' },
          { label: 'Traditional Blouses', filter: 'blouses+traditional' },
        ],
      },
      {
        title: 'Ethnic Wear',
        links: [
          { label: 'Kurtis', filter: 'kurtis' },
          { label: 'Designer Kurtis', filter: 'kurtis+designer' },
          { label: 'Lehengas', filter: 'lehenga' },
          { label: 'Half Sarees', filter: 'half-saree' },
          { label: 'Kids Ethnic Wear', filter: 'kids' },
        ],
      },
      {
        title: 'Finishing Touches',
        links: [
          { label: 'Dupattas', filter: 'dupatta' },
          { label: 'Boutique Accessories', filter: 'accessories' },
          { label: 'Aari Work Close-ups', section: 'lookbook', thumb: 'lb-aari' },
        ],
      },
    ],
    banner: {
      image: 'mega-boutique',
      eyebrow: 'Boutique collection',
      title: 'Hand-finished Detail',
      text: 'Bead, pearl and zardosi work, finished by hand in our studio.',
      cta: 'Shop Blouses',
      action: { filter: 'blouses' },
    },
  },
  {
    id: 'stitching',
    label: 'Custom Stitching',
    columns: [
      {
        title: 'Blouse Tailoring',
        links: [
          { label: 'Custom Blouse Stitching', section: 'services', thumb: 'cat-stitching' },
          { label: 'Bridal Blouse Designing', section: 'services', thumb: 'p-bridal-blouse' },
          { label: 'Blouse Alterations', section: 'services' },
          { label: 'Custom Measurements', section: 'services' },
        ],
      },
      {
        title: 'Design & Handwork',
        links: [
          { label: 'Aari Embroidery Work', section: 'services', thumb: 'cat-aari' },
          { label: 'Maggam Work', section: 'services' },
          { label: 'Designer Neck Patterns', section: 'services' },
          { label: 'Custom Sleeve Designs', section: 'services' },
          { label: 'Designer Embroidery', section: 'services' },
        ],
      },
    ],
    banner: {
      image: 'mega-stitching',
      eyebrow: 'Made to measure',
      title: 'Your saree, our needle.',
      text: 'Share a photo of your saree or a design you love, and we will plan the blouse with you.',
      cta: 'Enquire on WhatsApp',
      action: { whatsapp: "Hello Mayuram Boutique, I'd like to enquire about custom blouse stitching." },
    },
  },
]

export interface NavItem {
  label: string
  menu?: string
  filter?: string
  section?: string
}

// The logo links home and Best Sellers lives in the Sarees menu, so the bar stays on one line.
export const navItems: NavItem[] = [
  { label: 'Sarees', menu: 'sarees' },
  { label: 'Boutique', menu: 'boutique' },
  { label: 'Stitching', menu: 'stitching' },
  { label: 'Bridal', filter: 'bridal' },
  { label: 'New Arrivals', filter: 'new' },
  { label: 'Offers', section: 'offers' },
  { label: 'Contact', section: 'contact' },
]
