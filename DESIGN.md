---
name: Mayuram Boutique
description: A Chennai saree-and-blouse atelier in midnight, plum and gold, sewn together by a running gold stitch.
colors:
  midnight: "#16061B"
  midnight-900: "#0F0413"
  midnight-800: "#1E0A25"
  midnight-700: "#2A0D30"
  plum: "#5A254E"
  gold: "#DBA01C"
  gold-light: "#F0C75E"
  gold-pale: "#F6E2A8"
  bronze: "#8A5418"
  peacock: "#0E5E66"
  peacock-deep: "#08363C"
  ivory: "#F7F3EA"
  ivory-deep: "#EFE6D4"
typography:
  display:
    fontFamily: "Brygada 1918, Georgia, serif"
    fontSize: "clamp(2.4rem, 3.4vw, 3.6rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.01em"
    fontFeature: "lnum"
  headline:
    fontFamily: "Brygada 1918, Georgia, serif"
    fontSize: "clamp(2.1rem, 4.4vw, 3.6rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Brygada 1918, Georgia, serif"
    fontSize: "1.45rem"
    fontWeight: 400
    lineHeight: 1.25
  body:
    fontFamily: "Manrope, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.04rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Manrope, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.68rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.24em"
  button:
    fontFamily: "Manrope, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.74rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.2em"
rounded:
  none: "0px"
  full: "9999px"
  arch: "50% 50% 0 0 / 40% 40% 0 0"
spacing:
  gutter-sm: "16px"
  gutter-md: "32px"
  gutter-xl: "48px"
  tile-gap: "16px"
  heading-to-content: "56px"
  section-y: "80px"
  section-y-md: "112px"
  container: "1560px"
components:
  button-gold:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.midnight}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 28px"
    height: "50px"
  button-gold-hover:
    backgroundColor: "{colors.gold-light}"
    textColor: "{colors.midnight}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.gold-light}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 28px"
    height: "50px"
  button-ink:
    backgroundColor: "{colors.midnight}"
    textColor: "{colors.gold-light}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 28px"
    height: "50px"
  button-ink-hover:
    backgroundColor: "{colors.plum}"
    textColor: "{colors.gold-light}"
  button-outline-ink:
    backgroundColor: "transparent"
    textColor: "{colors.midnight}"
    typography: "{typography.button}"
    rounded: "{rounded.none}"
    padding: "0 28px"
    height: "50px"
  button-outline-ink-hover:
    backgroundColor: "{colors.midnight}"
    textColor: "{colors.gold-light}"
  icon-button:
    backgroundColor: "transparent"
    textColor: "#FFFFFF"
    rounded: "{rounded.full}"
    size: "44px"
  product-badge:
    backgroundColor: "{colors.midnight}"
    textColor: "{colors.gold-light}"
    rounded: "{rounded.none}"
    padding: "4px 10px"
  testimonial-card:
    backgroundColor: "rgba(7, 46, 51, 0.4)"
    textColor: "#FFFFFF"
    rounded: "{rounded.none}"
    padding: "36px"
  input-line:
    backgroundColor: "transparent"
    textColor: "#FFFFFF"
    rounded: "{rounded.none}"
    padding: "12px 16px"
---

# Design System: Mayuram Boutique

## Overview

**Creative North Star: "The Atelier Doorway"**

The site is a Chennai saree-and-blouse atelier seen through its own arched doorway: deep midnight and plum poster bands, warm ivory rooms where the cloth is laid out, and a single gold running stitch that ties every section together. Photography carries the product; the system's job is to frame it. Real silk on real women sits in square-cornered frames with a gold hairline inset, while the hero and feature portraits rise into an arch.

Density is generous and editorial. Sections alternate between dark grounds (midnight, plum gradients, one peacock band) and the ivory ground, each opening on a centred or left-aligned Brygada headline with a short dashed gold or bronze stitch beneath it. Motion is slow and tailored: a silk ease, crossfades with a gentle zoom, headlines rising from a mask, single fade-ups, and stitches that sew themselves in.

The world refuses procedural product art, pill-shaped SaaS cards and generic gradient blobs. Its gradients are lighting on cloth (a plum glow inside midnight), never decorative blobs.

**Key Characteristics:**
- Poster-band rhythm: midnight/plum dark bands alternating with ivory product and craft bands; peacock teal appears once.
- The gold running stitch (dashed 7/5 or 8/6, 1.5px) as the signature line and motion.
- Arch-topped portrait frames for hero and feature imagery; square frames with an inset gold hairline for linked tiles.
- Brygada 1918 roman headlines with one italic accent phrase; Manrope for everything readable.
- Square text buttons; circles only for icon-only controls and small thumbnails.

## Colors

A poster palette: inky violet-black and plum for night, saffron gold for thread, warm ivory for cloth, peacock teal borrowed from the logo.

### Primary
- **Zari Gold** (#DBA01C): the thread. Primary button fill, stitch lines, active tab underlines, slide progress hairlines, focus outlines, star ratings, highlight icons. Never a background band.
- **Light Zari** (#F0C75E): gold on dark grounds where text must read: the italic accent phrase in dark-band headlines, `btn-line` and `btn-ink` text, active slide tab, hover fill of the gold button, inset frame hairline (at 55%, 90% on hover), text selection.
- **Pale Zari** (#F6E2A8): quiet gold for the announcement marquee text and sample-review tag.

### Secondary
- **Peacock Teal** (#0E5E66, deepening to **Peacock Shadow** #08363C): the single secondary. It owns the testimonials band as a top-lit radial gradient and appears nowhere else.

### Tertiary
- **Temple Plum** (#5A254E): the warm light inside the dark bands (hero and drawer radial glow, services gradient), the announcement bar, the discount badge, the saved-wishlist state, `btn-ink` hover, and the italic accent phrase on ivory headlines.
- **Bronze** (#8A5418): gold's ivory-ground counterpart. Stitch lines under ivory headings, hairline borders between ivory bands (at 15%), empty-state border and thumbnail rings (at 30%), outline button border (at 60%).

### Neutral
- **Midnight** (#16061B): the page ground and every dark band; also the text colour on ivory and on gold fills.
- **Midnight Depths** (#0F0413, #1E0A25, #2A0D30): the highlights strip under the hero, the mega menu panel, and the mid-stop of the hero and services gradients.
- **Ivory** (#F7F3EA): the one light ground, for collections, shop, story, edits, lookbook and FAQ.
- **Ivory Deep** (#EFE6D4): the placeholder ground behind product photographs while they load.
- White is used for text on dark grounds at stepped opacities (90, 75, 65, 55, 45%) rather than additional greys; on ivory, Midnight steps the same way (75, 70, 55, 45%).

### Named Rules
**The Thread Rule.** Gold is thread, not cloth: it draws lines, fills buttons and marks states, but never floods a section background.

**The One Peacock Rule.** Peacock teal is the only secondary and owns one band. A second teal surface dilutes it.

**The Ground Pairing Rule.** Gold and white belong on dark grounds; bronze and midnight belong on ivory. A gold stitch on ivory or a bronze stitch on midnight is off-system.

## Typography

**Display Font:** Brygada 1918 (with Georgia)
**Body Font:** Manrope (with system-ui)

**Character:** A sturdy, warm transitional serif set at regular weight, roman with italic accents, against a clean geometric sans. It replaced Bodoni Moda, whose hairlines disappeared at display sizes on the dark grounds and made headings hard to read. The serif speaks like a fashion house; the sans handles prices, captions and controls without fuss.

### Hierarchy
- **Display** (400, clamp(2.4rem, 3.85vw, 4rem), 1.04): the two-line hero headline only; second line italic in Light Zari. Lines rise from an overflow mask.
- **Headline** (400, clamp(2.1rem, 4.4vw, 3.6rem), 1.04, max 18ch): every section heading, balanced wrap, followed by a 96px stitch. Story stretches to clamp(2.3rem, 5vw, 4.2rem).
- **Title** (400, 1.2 to 1.45rem, tight): stitch-path steps, service names, product names (1.12 to 1.22rem), tile captions (scaling to clamp(1.9rem, 3.4vw, 2.9rem) on the lead tile). Testimonial quotes are Title-scale italic (1.3rem).
- **Body** (400, 1.02 to 1.05rem, 1.625): section subtitles and story copy, max about 46ch to xl width; secondary copy 0.875rem at 65 to 75% opacity.
- **Label** (600, 0.68rem, 0.24em, uppercase): slide tabs, footer column titles, contact captions, "Explore" and "Quick view" cues, announcement marquee.
- **Button** (700, 0.74rem, 0.2em, uppercase): all text buttons and the desktop nav.

### Named Rules
**The Italic Accent Rule.** A headline may carry one italic phrase, coloured Light Zari on dark grounds and Temple Plum on ivory. Never italicise a whole heading, and never colour roman text gold.

**The No-Eyebrow Rule.** Tracked uppercase is for controls and small captions only. Nothing tracked sits above a section headline; the stitch goes below it instead.

## Layout

A centred container (max 1560px) with gutters of 16px (respecting safe-area insets), 32px from md, 48px from xl. Sections are full-bleed colour bands with 80px vertical padding, 112px from md. Headings sit 56px above their content.

Grids are editorial mosaics rather than uniform cards: collections and story use a 12-column, two-row mosaic on desktop (5 / 4 / 3 / 3 / 4 columns) with tile gaps of 12 to 16px, collapsing to two columns with a full-width lead tile on phones. The product grid runs 2 / 3 / 4 columns with 40px row gaps. Split sections use slightly uneven ratios (1.12fr : 1fr in the hero, 1.05fr : 0.95fr in services), and feature imagery can stick while copy scrolls.

On phones, horizontal snap-scrolling strips with hidden scrollbars replace wrapping rows (highlights, secondary collections, filter tabs, testimonials). The hero puts the arch photograph first at about 46svh, with copy beneath.

## Elevation & Depth

Depth comes from light and layering, not stacked cards. Dark bands are lit from inside with a plum radial or linear gradient over midnight; photographs get a bottom-up midnight scrim so captions read. Shadows are soft, long and negative-spread, tinted midnight, and reserved for objects that sit physically above the page: the arched hero portrait, the swing tag, the inset feature photograph, and floating panels.

### Shadow Vocabulary
- **Lift** (`box-shadow: 0 30px 60px -30px rgba(22,6,27,.75)`): arched portraits, the swing tag, overlapping inset photographs.
- **Card** (`box-shadow: 0 18px 50px -24px rgba(22,6,27,.55)`): search suggestions and overlay panels.
- **Gold Glow** (`box-shadow: 0 14px 30px -14px rgba(219,160,28,.75)`): the gold button only.

### Named Rules
**The Cloth-Lit Rule.** Dark bands are lit by a plum glow inside midnight; a flat midnight band is acceptable, a decorative multi-colour blob is not.

## Shapes

Three forms only. **Square** (0px) for photographs, buttons, badges, cards, inputs and panels. **The arch** (border-radius 50% 50% 0 0 / 40% 40% 0 0) for the hero portrait and the services feature portrait, echoed by a gold stitched or hairline arch offset 12 to 14px outside it. **The circle** for icon-only controls (44px), the wishlist and add-to-bag buttons (40px), avatars, and small collection thumbnails.

Photographs that act as links carry an inset 1px Light Zari hairline 12px inside the edge that eases out to 18px and brightens on hover. The swing tag is the one cut shape: a paper tag with clipped shoulders and a punched hole.

## Components

### Buttons
Tailored and square; a soft white light sweeps across on hover.
- **Shape:** square corners (0px), 50px minimum height, 28px horizontal padding, uppercase button type.
- **Gold (primary):** Zari Gold fill, Midnight text, Gold Glow shadow; hovers to Light Zari.
- **Line (secondary on dark):** 1px gold border at 70%, Light Zari text; hover firms the border, adds a 10% gold wash, text turns white.
- **Ink (primary on ivory):** Midnight fill, Light Zari text; hovers to Temple Plum.
- **Outline Ink (secondary on ivory):** bronze border at 60%, Midnight text; hover fills Midnight with Light Zari text.
- **Hover / Focus:** a 110deg white gradient sweeps across in 0.8s on the silk ease; press scales to 0.98. Focus is a 2px gold outline, offset 3px, everywhere.

### Icon Controls
- Circular, 40 to 44px, a 1px white border at 25% on dark (Midnight at 15% on ivory). Hover turns border and icon gold (or fills Midnight with Light Zari icon on ivory). Icons are Lucide line icons at 16 to 20px.

### Tabs
- **Slide tabs:** Label type with a hairline track below (white at 20%); the active tab's track fills gold over the slide's 7s duration.
- **Filter tabs:** 0.8rem semibold sentence-case text on a Midnight 10% baseline; the active tab gets a 2px gold underline that slides between tabs.

### Product Card
- Square photograph at 3:4 on Ivory Deep, no frame; hover zooms slightly and crossfades to a close-up detail crop. A Quick View bar slides up from the bottom (Midnight 90%, Label in Light Zari) on desktop.
- Square badges at top-left (0.64rem bold, 0.14em tracking): Temple Plum for discounts, Midnight with Light Zari for named badges.
- Name in Title type, tabular price in Manrope semibold, struck MRP at 45%.

### Collection and Edit Tiles
- Square, framed photographs with a bottom midnight scrim, a Brygada caption and a "Explore" Label with a circular arrow that nudges right and fills gold on hover. Image zooms over 1.4 to 1.6s on the silk ease.

### Testimonial Card
- Square, 1px gold border at 30% on a translucent deep-teal fill, 28 to 36px padding; italic Brygada quote, gold stars, a hairline above the attribution and a circular gold-ringed monogram.

### Inputs / Fields
- **Style:** square, 1px white border at 20% on transparent; white text, placeholder at 40%; gold caret. Search adds a gold leading icon.
- **Focus:** the border turns Zari Gold (focus-within) on top of the global gold outline.
- **Error:** soft rose text (#f3a6a6) below the field.

### Navigation
- Sticky midnight header beneath a plum announcement marquee (Label type, Pale Zari, diamond separators, pauses on hover). Desktop nav items in button type with a gold hover; mega menus open as a midnight-800 panel with a gold top hairline, Brygada column titles, circular thumbnails and a framed feature tile. Phones use a drawer lit by the plum radial gradient.

### The Running Stitch (signature)
- A gold dashed line (1.5px stroke, 7/5 dash, round caps) that sews itself left to right over 1.2s when scrolled into view; 96px wide under every section headline, bronze on ivory.
- **Arch stitch:** the same stitch (8/6) traced around the hero arch from bottom-left over the top, re-sewing on every slide over 2.4s.
- **Stitch path:** the made-to-measure steps are joined by a stitch tied to scroll progress, horizontal on desktop and vertical on phones, with gold-outlined diamond knots at each step.
- Reduced motion shows every stitch complete.

## Do's and Don'ts

### Do:
- **Do** close every section headline with a stitch: gold (#DBA01C) on dark grounds, bronze (#8A5418) on ivory.
- **Do** frame linked photographs with the inset 1px Light Zari hairline 12px inside the edge, easing to 18px on hover.
- **Do** use the arch (50% 50% 0 0 / 40% 40% 0 0) for portrait feature imagery, with an offset gold stitch or hairline arch outside it.
- **Do** keep text buttons square, 50px tall, uppercase at 0.74rem with 0.2em tracking.
- **Do** move on the silk ease (cubic-bezier(0.22, 1, 0.36, 1)) with long durations: 0.8s reveals, 1.2s stitches, 1.2 to 1.6s image zooms.
- **Do** alternate dark and ivory bands, and keep peacock teal to a single band.
- **Do** keep demo content visibly labelled (sample-review tags, demo catalogue notes) in the system's own caption styles.

### Don't:
- **Don't** put tracked uppercase eyebrows or kickers above headlines.
- **Don't** round text buttons, cards or photographs; circles are for icon-only controls, avatars and small thumbnails.
- **Don't** use pill-shaped SaaS cards, procedural product art or generic gradient blobs.
- **Don't** flood a section with gold, or introduce a second secondary colour beside peacock teal.
- **Don't** use hard offset shadows; elevation is soft, long and midnight-tinted.
- **Don't** set display type in a system or sans face; headings are Brygada 1918.
