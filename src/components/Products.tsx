import { AnimatePresence, motion } from 'framer-motion'
import { Heart, ShoppingBag, X } from 'lucide-react'
import { img, inr, waLink } from '../config/site'
import { discount, filterTabs, matchProducts, type Product } from '../data/products'
import { useShop } from '../store/shop'
import { Img, Reveal, StitchLine, WhatsAppIcon } from './ui'

export function ProductCard({ p }: { p: Product }) {
  const { addToCart, toggleWishlist, wishlist, openQuickView } = useShop()
  const saved = wishlist.includes(p.id)
  const off = discount(p)
  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-[3/4] overflow-hidden bg-ivory-deep">
        <button type="button" onClick={() => openQuickView(p)} className="absolute inset-0" aria-label={`Quick view: ${p.name}`}>
          <Img
            name={p.image}
            alt={p.name}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 320px"
            className="absolute inset-0 h-full w-full object-cover transition duration-[1200ms] ease-silk group-hover:scale-[1.04]"
          />
          {/* close-up of the weave, shown on hover */}
          <img
            src={img(p.image + '-detail')}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full scale-[1.04] object-cover opacity-0 transition duration-700 ease-silk [@media(hover:hover)]:group-hover:scale-100 [@media(hover:hover)]:group-hover:opacity-100"
          />
        </button>
        <div className="pointer-events-none absolute left-0 top-3 flex flex-col items-start gap-1.5">
          {off > 0 && <span className="bg-plum px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white">{off}% off</span>}
          {p.badge && <span className="bg-midnight px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-gold-light">{p.badge}</span>}
        </div>
        <motion.button
          type="button"
          whileTap={{ scale: 0.8 }}
          onClick={() => toggleWishlist(p)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${p.name} from wishlist` : `Save ${p.name} to wishlist`}
          className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full transition ${
            saved ? 'bg-plum text-gold-light' : 'bg-white/90 text-midnight hover:bg-white hover:text-plum'
          }`}
        >
          <Heart className={`h-[1.05rem] w-[1.05rem] ${saved ? 'fill-current' : ''}`} />
        </motion.button>
        <button
          type="button"
          onClick={() => openQuickView(p)}
          tabIndex={-1}
          className="absolute inset-x-0 bottom-0 hidden translate-y-full bg-midnight/90 py-3.5 label text-gold-light transition duration-500 ease-silk group-hover:translate-y-0 md:block"
        >
          Quick view
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 pt-4">
        <h3 className="font-display text-lg leading-snug text-midnight sm:text-xl">{p.name}</h3>
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <p className="flex flex-wrap items-baseline gap-x-2">
            <span className="font-semibold tabular-nums text-midnight">{inr(p.price)}</span>
            {p.mrp && <span className="text-sm tabular-nums text-midnight/45 line-through">{inr(p.mrp)}</span>}
          </p>
          <button
            type="button"
            onClick={() => addToCart(p)}
            aria-label={`Add ${p.name} to bag`}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-midnight/15 text-midnight transition hover:border-midnight hover:bg-midnight hover:text-gold-light active:scale-95"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
        {p.priceNote && <p className="text-xs text-midnight/60">{p.priceNote}</p>}
      </div>
    </article>
  )
}

export function Products() {
  const { filter, goTo } = useShop()
  const items = matchProducts(filter.key)
  const isTab = filterTabs.some((t) => t.key === filter.key)

  return (
    <section id="shop" className="scroll-mt-28 border-t border-bronze/15 bg-ivory py-20 text-midnight md:py-28">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-normal leading-[1.04]">Handpicked for you</h2>
            <StitchLine className="w-24" tone="bronze" />
            <p className="max-w-md text-midnight/70">
              Silks, cottons and blouses from the boutique. <span className="text-midnight/50">Demo catalogue: sample products and prices.</span>
            </p>
          </div>

          <div className="no-scrollbar -mx-4 overflow-x-auto px-4">
            <div role="tablist" aria-label="Filter products" className="flex w-max gap-1 border-b border-midnight/10">
              {filterTabs.map((t) => {
                const active = filter.key === t.key
                return (
                  <button
                    key={t.key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => goTo({ filter: t.key })}
                    className={`relative whitespace-nowrap px-3.5 pb-3 pt-2 text-sm font-semibold tracking-wide transition sm:px-4 ${
                      active ? 'text-midnight' : 'text-midnight/55 hover:text-midnight'
                    }`}
                  >
                    {t.label}
                    {active && <motion.span layoutId="tab-line" className="absolute inset-x-2 -bottom-px h-[2px] bg-gold" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {!isTab && (
          <div className="mt-6">
            <span className="inline-flex items-center gap-2 bg-midnight px-4 py-2 text-sm text-white">
              Showing <strong className="font-semibold text-gold-light">{filter.label}</strong>
              <button type="button" onClick={() => goTo({ filter: 'all' })} className="ml-1 p-0.5 hover:text-gold-light" aria-label="Clear filter">
                <X className="h-4 w-4" />
              </button>
            </span>
          </div>
        )}

        <div aria-live="polite" className="mt-12">
          {items.length === 0 ? (
            <Reveal>
              <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 border border-bronze/30 bg-ivory p-10 text-center">
                <p className="font-display text-3xl text-midnight">This edit is being curated</p>
                <p className="max-w-md text-midnight/70">
                  {filter.label} aren’t in this demo catalogue yet. Message the boutique to ask what’s in store right now.
                </p>
                <a
                  href={waLink(`Hello Mayuram Boutique, I'm looking for ${filter.label}. What do you have available?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ink mt-2"
                >
                  <WhatsAppIcon className="h-4 w-4" /> Ask about {filter.label}
                </a>
                <button type="button" onClick={() => goTo({ filter: 'all' })} className="text-sm font-semibold text-plum underline">
                  View featured pieces
                </button>
              </div>
            </Reveal>
          ) : (
            <motion.ul layout className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {items.map((p, i) => (
                  <motion.li
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: Math.min(i, 8) * 0.05, duration: 0.5 } }}
                    exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                  >
                    <ProductCard p={p} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          )}
        </div>
      </div>
    </section>
  )
}
