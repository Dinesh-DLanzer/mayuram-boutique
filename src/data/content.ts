export const heroSlides = [
  {
    image: 'hero-sarees',
    eyebrow: 'Premium Saree Collection',
    title: 'Where Tradition Meets Timeless Elegance.',
    accent: 'Elegance Woven into Every Thread.',
    text: 'Discover exquisite sarees, designer blouses, and custom boutique creations made to celebrate your unique style.',
    primary: { label: 'Explore Sarees', filter: 'silk' },
    secondary: { label: 'Discover Boutique Collections', filter: 'blouses' },
  },
  {
    image: 'hero-boutique',
    eyebrow: 'Designer Boutique Collection',
    title: 'Designed for You. Crafted with Love.',
    accent: 'Aari work, maggam and made-to-measure blouses.',
    text: 'Bring your saree, share your idea, and leave with a blouse that fits beautifully and is finished by hand.',
    primary: { label: 'Discover Boutique Collections', filter: 'blouses' },
    secondary: { label: 'Custom Stitching', section: 'services' },
  },
  {
    image: 'hero-bridal',
    eyebrow: 'Bridal & Wedding Collection',
    title: 'Make Every Celebration Unforgettable.',
    accent: 'Rich silks and heirloom zari for your big day.',
    text: 'Bridal silks, coordinated blouses and finishing touches, planned together for the wedding and every function around it.',
    primary: { label: 'Explore Bridal Collection', filter: 'bridal' },
    secondary: { label: 'Explore Sarees', filter: 'silk' },
  },
] as const

export const categories = [
  { label: 'Silk Sarees', image: 'cat-silk', filter: 'silk' },
  { label: 'Cotton Sarees', image: 'cat-cotton', filter: 'cotton' },
  { label: 'Designer Sarees', image: 'cat-designer', filter: 'designer' },
  { label: 'Bridal Sarees', image: 'cat-bridal', filter: 'bridal' },
  { label: 'Festive Sarees', image: 'cat-festive', filter: 'festive' },
  { label: 'Chiffon Sarees', image: 'cat-chiffon', filter: 'chiffon' },
  { label: 'Designer Blouses', image: 'cat-blouses', filter: 'blouses' },
  { label: 'Aari Work', image: 'cat-aari', filter: 'aari' },
  { label: 'Custom Stitching', image: 'cat-stitching', section: 'services' },
  { label: 'Boutique Collections', image: 'cat-boutique', filter: 'all' },
]

export type ServiceIcon = 'scissors' | 'sparkles' | 'crown' | 'flower' | 'ruler' | 'shirt'

export const services: { title: string; text: string; image: string; icon: ServiceIcon }[] = [
  {
    title: 'Custom Blouse Stitching',
    text: 'Stitched to your measurements, with lining, padding and hooks chosen for your saree.',
    image: 'cat-stitching',
    icon: 'scissors',
  },
  {
    title: 'Designer Blouses',
    text: 'Neck patterns, sleeve styles and back details designed around the occasion.',
    image: 'p-designer-blouse',
    icon: 'sparkles',
  },
  {
    title: 'Bridal Blouse Design',
    text: 'Heavier handwork, coordinated to the bridal saree and planned across fittings.',
    image: 'p-bridal-blouse',
    icon: 'crown',
  },
  {
    title: 'Aari Work',
    text: 'Hand aari and maggam embroidery with beads, pearls, stones and zardosi.',
    image: 'cat-aari',
    icon: 'flower',
  },
  {
    title: 'Alterations & Fittings',
    text: 'Resizing, re-fitting and finishing for blouses you already own.',
    image: 'ba-before',
    icon: 'ruler',
  },
  {
    title: 'Custom Ethnic Creations',
    text: 'Half-saree sets, kids’ ethnic wear and coordinated family outfits on request.',
    image: 'cat-boutique',
    icon: 'shirt',
  },
]

export const story = [
  { image: 'story-silk', title: 'Silk that moves', text: 'The weight, fall and sheen of a good silk is the first thing we look for.' },
  { image: 'story-zari', title: 'Zari borders', text: 'Temple, rudraksha and korvai borders in gold zari.' },
  { image: 'story-embroidery', title: 'Hand embroidery', text: 'Bead vines and floral trails, worked by hand on the aari frame.' },
  { image: 'story-blouse', title: 'Blouse finishing', text: 'Clean seams, neat linings and a fit checked at every fitting.' },
  { image: 'story-pattern', title: 'Traditional motifs, modern finish', text: 'Mandalas, mango buttas and vines, placed with a contemporary eye.' },
]

export const promos = [
  {
    image: 'promo-bridal',
    eyebrow: 'Bridal Elegance',
    title: 'Made for Your Most Beautiful Moments.',
    cta: 'Explore Bridal Collection',
    filter: 'bridal',
  },
  {
    image: 'promo-blouse',
    eyebrow: 'Designer Blouses',
    title: 'Perfect Fit. Exceptional Detail.',
    cta: 'Explore Designs',
    filter: 'blouses',
  },
  {
    image: 'promo-festive',
    eyebrow: 'Festive Collections',
    title: 'Celebrate Every Occasion in Style.',
    cta: 'Shop Festive Edit',
    filter: 'festive',
  },
]

// PLACEHOLDER reviews for layout only. Replace with real, consented customer
// feedback before launch.
export const testimonials = [
  {
    name: 'Sample Customer A',
    place: 'Thiruvanmiyur',
    rating: 5,
    text: 'The aari work on my blouse came out exactly like the sketch we discussed, and the fit was perfect at the first trial.',
  },
  {
    name: 'Sample Customer B',
    place: 'Adyar',
    rating: 5,
    text: 'Helped me pick a silk saree for my sister’s wedding and matched the blouse design to the border beautifully.',
  },
  {
    name: 'Sample Customer C',
    place: 'Besant Nagar',
    rating: 4,
    text: 'Quick alterations on three blouses before a function. Neat finishing and very friendly service.',
  },
  {
    name: 'Sample Customer D',
    place: 'Velachery',
    rating: 5,
    text: 'My bridal blouse had so much detail. Every fitting was patient and they listened to what I wanted.',
  },
]

export const lookbook = [
  { image: 'lb-bridal', label: 'Bridal saree styling' },
  { image: 'lb-draping', label: 'Silk saree draping' },
  { image: 'lb-blouse-back', label: 'Designer blouse back' },
  { image: 'lb-aari', label: 'Aari work close-up' },
  { image: 'lb-festive', label: 'Festive looks' },
  { image: 'lb-cotton', label: 'Elegant cotton saree' },
]

export const faqs = [
  {
    q: 'How do I order a saree or blouse from this website?',
    a: 'Add pieces to your bag and tap “Send enquiry on WhatsApp”. The boutique will confirm availability, final price and delivery or pickup with you directly.',
  },
  {
    q: 'Can I bring my own fabric for blouse stitching?',
    a: 'Yes. Bring your saree or blouse material to the boutique in Thiruvanmiyur, or message a photo on WhatsApp first to discuss the design.',
  },
  {
    q: 'How are measurements taken for custom stitching?',
    a: 'Measurements are taken at the boutique. You can also bring a well-fitting blouse for reference.',
  },
  {
    q: 'Do you take aari work on blouses bought elsewhere?',
    a: 'Aari and maggam work can be planned on most blouse fabrics. Share a photo on WhatsApp so the team can advise.',
  },
  {
    q: 'Are the prices on this page final?',
    a: 'This page is a design demonstration. Products, prices and offers shown are samples; please confirm current pricing with the boutique.',
  },
]
