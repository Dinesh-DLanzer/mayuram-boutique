#!/bin/bash
# Downloads the stock photography used by the site from Unsplash (free Unsplash License)
# into public/images as WebP, plus a 360px "-sm" version of each.
# Replace any file with the boutique's own photo of the same name; credits in public/images/CREDITS.md.
#
# Usage: bash scripts/fetch_photos.sh
set -euo pipefail
cd "$(dirname "$0")/../public/images"

U='https://images.unsplash.com/photo-'

# get <slot> <unsplash id> <width> <height> [extra imgix params]
get() {
  local slot=$1 id=$2 w=$3 h=$4 extra=${5:-'crop=faces,entropy'}
  local q="fit=crop&fm=webp&q=78&$extra"
  curl -fsS --retry 4 --retry-all-errors -m 60 -o "$slot.webp" "$U$id?w=$w&h=$h&$q"
  curl -fsS --retry 4 --retry-all-errors -m 60 -o "$slot-sm.webp" "$U$id?w=360&h=$((h * 360 / w))&$q"
}

# Hero (arched portrait frame, 4:5) also gets -md for mid-size screens
hero() { get "$1" "$2" 1100 1375 "${3:-crop=faces,entropy}"; curl -fsS --retry 4 --retry-all-errors -m 60 -o "$1-md.webp" "$U$2?w=760&h=950&fit=crop&fm=webp&q=78&${3:-crop=faces,entropy}"; }
hero hero-sarees  1614855918624-d184f79a112a
hero hero-boutique 1787753650893-1324e0f6ac91
hero hero-bridal  1641699862936-be9f49b1c38d

# Collections (3:4)
get cat-silk      1776005395798-9fc7c1c50e95 900 1200
get cat-cotton    1610030469069-cb6620bea733 900 1200
get cat-designer  1742287724816-4a8a1cc7ad5c 900 1200
get cat-bridal    1769500802040-528612c67eed 900 1200
get cat-festive   1692992193981-d3d92fabd9cb 900 1200
get cat-chiffon   1769275061202-cf3ef67d7279 900 1200
get cat-blouses   1756483496916-5ebab85028df 900 1200
get cat-aari      1779167327071-963220d85043 900 1200 'crop=entropy'
get cat-stitching 1578353022142-09264fd64295 900 1200 'crop=entropy'
get cat-boutique  1787220272461-2c53528c9349 900 1200 'crop=entropy'

# Products (3:4) and a zoomed "-detail" crop shown on hover
product() {
  local slot=$1 id=$2 fp=$3
  get "$slot" "$id" 720 960
  curl -fsS --retry 4 --retry-all-errors -m 60 -o "$slot-detail.webp" "$U$id?w=720&h=960&fit=crop&fm=webp&q=78&crop=focalpoint&$fp"
}
product p-kanchipuram     1614880886886-9314ce0323c5 'fp-x=0.55&fp-y=0.72&fp-z=2.2'
product p-softsilk        1610189013429-a703f4b245cf 'fp-x=0.5&fp-y=0.7&fp-z=2.2'
product p-cotton          1609748341932-f0206c09412b 'fp-x=0.5&fp-y=0.74&fp-z=2.2'
product p-chiffon         1609748340041-f5d61e061ebc 'fp-x=0.5&fp-y=0.72&fp-z=2.2'
product p-bridal          1617627143750-d86bc21e42bb 'fp-x=0.5&fp-y=0.62&fp-z=2.2'
product p-aari-blouse     1756483496916-5ebab85028df 'fp-x=0.47&fp-y=0.46&fp-z=2.6'
product p-bridal-blouse   1787753650893-1324e0f6ac91 'fp-x=0.33&fp-y=0.74&fp-z=2.4'
product p-festive         1610189337543-1c5d8e64f574 'fp-x=0.55&fp-y=0.6&fp-z=2'
product p-green-silk      1610030469245-ab65c4583802 'fp-x=0.5&fp-y=0.7&fp-z=2.2'
product p-linen           1610276580899-53d1af1a1359 'fp-x=0.6&fp-y=0.6&fp-z=2.2'
product p-designer-blouse 1762320562013-45bd4f133fba 'fp-x=0.3&fp-y=0.42&fp-z=2.2'
product p-georgette       1610189026297-df356264479c 'fp-x=0.5&fp-y=0.66&fp-z=2.2'

# Craft story mosaic
get story-silk      1676696706907-0e04665b80bd 1000 750 'crop=entropy'
get story-zari      1717585679395-bbe39b5fb6bc 800 1000 'crop=entropy'
get story-embroidery 1745091951316-f7af4f4f07ef 800 1000 'crop=entropy'
get story-blouse    1568288796918-03e7d93306bd 800 1000 'crop=entropy'
get story-pattern   1680034976848-d9fe95466aba 800 1000 'crop=entropy'

# Editorial banners, with a -md for tablets
promo() { get "$1" "$2" 1400 1050 "${3:-crop=faces,entropy}"; curl -fsS --retry 4 --retry-all-errors -m 60 -o "$1-md.webp" "$U$2?w=960&h=720&fit=crop&fm=webp&q=78&${3:-crop=faces,entropy}"; }
promo promo-bridal  1727430228383-aa1fb59db8bf
promo promo-blouse  1497997092403-f091fcf5b6c4 'crop=entropy'
promo promo-festive 1778148046680-cd802a2199ea

# Lookbook squares
get lb-bridal      1783495679231-bf9dc5d4a90f 800 800
get lb-draping     1688382654723-a7366006519b 800 800
get lb-blouse-back 1771654104106-c20ee8e209d7 800 800 'crop=focalpoint&fp-x=0.5&fp-y=0.42&fp-z=1'
get lb-aari        1671535108620-d169ce916f09 800 800 'crop=entropy'
get lb-festive     1770747874434-cc144a039cc2 800 800
get lb-cotton      1739429945610-95901c2baf18 800 800

# Mega-menu banners and the services panel
get mega-sarees    1619516388835-2b60acc4049e 640 800
get mega-boutique  1779167327071-963220d85043 640 800 'crop=entropy'
get mega-stitching 1457972657980-4c9fddebec8d 640 800 'crop=entropy'
get svc-alterations 1644530186995-27e46f340fb1 720 900 'crop=entropy'
get svc-arch       1787753650891-c6e2625071df 900 1125 'crop=focalpoint&fp-x=0.7&fp-y=0.56&fp-z=2.1'

echo "done: $(ls | wc -l) files"
