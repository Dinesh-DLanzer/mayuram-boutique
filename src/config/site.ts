// Real business details from the Mayuram Boutique visiting card.
// Social links stay empty until the client confirms their official handles;
// empty links are hidden automatically.

export const site = {
  name: 'Mayuram Boutique',
  tamilName: 'மயூரம்',
  owner: 'Vijayalakshmi',
  tagline: 'Timeless Elegance. Beautifully Yours.',
  services: ['Stitching', 'Aari Work', 'Clothes'],
  phones: [
    { label: 'Phone / WhatsApp', display: '90034 67515', tel: '+919003467515' },
    { label: 'Alternate', display: '87786 67724', tel: '+918778667724' },
  ],
  whatsappNumber: '919003467515',
  addressLines: [
    'No.73, G-5, Ground Floor,',
    'Sampoorna Apartment,',
    'L.B. Road, Thiruvanmiyur,',
    'Chennai – 600 041, Tamil Nadu, India.',
  ],
  social: {
    instagram: '',
    facebook: '',
    youtube: '',
  },
}

// Street address only: searching with the name "Mayuram" matches a Google listing at
// 35/18 3rd E St, Kamaraj Nagar instead of the visiting-card address.
const mapQuery = 'Sampoorna Apartment, L.B. Road, Thiruvanmiyur, Chennai 600041, Tamil Nadu, India'

export const links = {
  call: `tel:${site.phones[0].tel}`,
  callAlt: `tel:${site.phones[1].tel}`,
  whatsapp: `https://wa.me/${site.whatsappNumber}`,
  directions: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`,
  // keyless embed of the same search
  mapEmbed: `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=17&output=embed`,
}

export function waLink(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export const img = (name: string) => `${import.meta.env.BASE_URL}images/${name}.webp`

/** srcSet for generated images: every image has a 360px "-sm" version. */
export const srcSet = (name: string, full = 720) =>
  `${img(name + '-sm')} 360w, ${img(name)} ${full}w`

export const inr = (n: number) =>
  '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 0 })
