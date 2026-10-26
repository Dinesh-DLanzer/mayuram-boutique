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
| Hero slides, categories, services, stitching steps, testimonials, lookbook, FAQ | `src/data/content.ts` |
| Colours and fonts | `tailwind.config.js`, `src/index.css` |

Mega-menu links either filter the product grid (`filter: 'tag'`, or `'tag+tag'` to require both)
or scroll to a section (`section: 'services'`). Delete any line the boutique doesn't offer.
A filter with no matching products shows a WhatsApp enquiry card instead of an empty grid.

Social links are empty on purpose; icons appear in the footer and lookbook once a URL is set.

## Images

Everything in `public/images/` is free stock photography from Unsplash (Unsplash License), chosen to
stand in for the boutique's own photos. Sources and photographers are listed in
`public/images/CREDITS.md`; `npm run images` re-downloads the set (`scripts/fetch_photos.sh`).
Each image has a `-sm` (360 px) version, hero and banner images a `-md` version, and product images a
`-detail` close-up shown on hover.

To use the boutique's own photography, save a file under the same name (and its `-sm` / `-detail`
versions) or point the `image` fields in `src/data/*.ts` at new names. Real photos of Mayuram's own
blouses and aari work will do far more than any stock image.

## Demo content

Products, prices, discounts, testimonials and the newsletter are demonstration content and are labelled
on the page. Ordering hands the bag over to WhatsApp; there is no payment, login or backend.
