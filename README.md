# Mayuram Boutique: homepage

A single-page e-commerce homepage proposal for Mayuram Boutique, Thiruvanmiyur, Chennai.
Built with React, TypeScript, Vite, Tailwind CSS, Framer Motion and Lucide icons.

```bash
npm install
npm run dev       # local development
npm run build     # static build in dist/ (relative paths, so any static host works)
```

## Where to edit things

| What | File |
|---|---|
| Phone numbers, WhatsApp, address, social links | `src/config/site.ts` |
| Products, prices, tags, filter tabs | `src/data/products.ts` |
| Mega menu columns and links | `src/data/menus.ts` |
| Hero slides, categories, services, testimonials, lookbook, FAQ | `src/data/content.ts` |
| Colours and fonts | `tailwind.config.js`, `src/index.css` |

Mega-menu links either filter the product grid (`filter: 'tag'`, or `'tag+tag'` to require both)
or scroll to a section (`section: 'services'`). Delete any line the boutique doesn't offer.
A filter with no matching products shows a WhatsApp enquiry card instead of an empty grid.

Social links are empty on purpose; icons appear in the footer and lookbook once a URL is set.

## Images

Everything in `public/images/` was rendered by `scripts/generate_images.py` (Python, numpy, Pillow),
because no stock-photo source was reachable when this was built. Each image has a `-sm` (360 px)
version, and wide ones also have a `-md` (960 px) version.

To use real photography, save a file under the same name (and its `-sm` version) or point the
`image` fields in `src/data/*.ts` at new names. Run `npm run images` to regenerate the renders.

## Demo content

Products, prices, discounts, testimonials and the newsletter are demonstration content and are labelled
on the page. Ordering hands the bag over to WhatsApp; there is no payment, login or backend.
