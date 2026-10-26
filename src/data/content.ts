export const heroSlides = [
  {
    image: 'hero-sarees',
    label: 'Sarees',
    title: ['Every saree deserves', 'a blouse that fits.'],
    tag: 'Peacock silk, temple border',
    text: 'Silk and cotton sarees, designer blouses and custom boutique creations, chosen and finished in Thiruvanmiyur.',
    primary: { label: 'Explore Sarees', filter: 'silk' },
    secondary: { label: 'Custom Stitching', section: 'services' },
  },
  {
    image: 'hero-boutique',
    label: 'Blouses',
    title: ['Your saree, your design.', 'Our needle.'],
    tag: 'Hand-embroidered sleeve',
    text: 'Bring your saree, share your idea, and leave with a blouse that fits beautifully and is finished by hand.',
    primary: { label: 'Shop Blouses', filter: 'blouses' },
    secondary: { label: 'How stitching works', section: 'services' },
  },
  {
    image: 'hero-bridal',
    label: 'Bridal',
    title: ['Wedding silks,', 'finished by hand.'],
    tag: 'Bridal silk, brocade blouse',
    text: 'Bridal silks, coordinated blouses and finishing touches, planned together for the wedding and every function around it.',
    primary: { label: 'Explore Bridal', filter: 'bridal' },
    secondary: { label: 'Explore Sarees', filter: 'silk' },
  },
] as const

/** The first five lead the collections mosaic; the rest appear as round shortcuts below it. */
export const categories = [
  { label: 'Silk Sarees', image: 'cat-silk', filter: 'silk', text: 'Kanchipuram, soft silk and zari borders' },
  { label: 'Designer Blouses', image: 'cat-blouses', filter: 'blouses', text: 'Statement backs and made-to-measure fits' },
  { label: 'Aari Work', image: 'cat-aari', filter: 'aari', text: 'Beads, pearls and zardosi, worked by hand' },
  { label: 'Bridal Sarees', image: 'cat-bridal', filter: 'bridal', text: 'Heirloom silks for the wedding day' },
  { label: 'Custom Stitching', image: 'cat-stitching', section: 'services', text: 'Your saree, your design, our needle' },
  { label: 'Cotton Sarees', image: 'cat-cotton', filter: 'cotton' },
  { label: 'Designer Sarees', image: 'cat-designer', filter: 'designer' },
  { label: 'Festive Sarees', image: 'cat-festive', filter: 'festive' },
  { label: 'Chiffon Sarees', image: 'cat-chiffon', filter: 'chiffon' },
  { label: 'Boutique Collections', image: 'cat-boutique', filter: 'all' },
]

export const services: { title: string; text: string; image: string }[] = [
  {
    title: 'Custom Blouse Stitching',
    text: 'Stitched to your measurements, with lining, padding and hooks chosen for your saree.',
    image: 'cat-stitching',
  },
  {
    title: 'Designer Blouses',
    text: 'Neck patterns, sleeve styles and back details designed around the occasion.',
    image: 'lb-blouse-back',
  },
  {
    title: 'Bridal Blouse Design',
    text: 'Heavier handwork, coordinated to the bridal saree and planned across fittings.',
    image: 'cat-bridal',
  },
  {
    title: 'Aari Work',
    text: 'Hand aari and maggam embroidery with beads, pearls, stones and zardosi.',
    image: 'cat-aari',
  },
  {
    title: 'Alterations & Fittings',
    text: 'Resizing, re-fitting and finishing for blouses you already own.',
    image: 'svc-alterations',
  },
  {
    title: 'Custom Ethnic Creations',
    text: 'Half-saree sets, kids’ ethnic wear and coordinated family outfits on request.',
    image: 'cat-boutique',
  },
]

/** How a made-to-measure blouse comes together (from the FAQ answers below). */
export const stitchSteps = [
  { title: 'Share your saree', text: 'Bring it to the boutique, or send a photo on WhatsApp to talk through ideas first.' },
  { title: 'Measurements', text: 'Taken at the boutique. A well-fitting blouse of yours works as a reference too.' },
  { title: 'Design the details', text: 'Neckline, sleeve and how dense the aari or maggam work should be.' },
  { title: 'Fitting & finish', text: 'Fit checked at every fitting, then lined, hooked and finished by hand.' },
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
    title: 'Bridal silks, planned with you.',
    cta: 'Explore Bridal Collection',
    filter: 'bridal',
  },
  {
    image: 'promo-blouse',
    title: 'Blouses cut to your measure.',
    cta: 'Explore Designs',
    filter: 'blouses',
  },
  {
    image: 'promo-festive',
    title: 'Colour for Pongal and Deepavali.',
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
  { image: 'lb-cotton', label: 'Everyday elegance' },
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
