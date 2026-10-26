import { AnimatePresence, motion } from 'framer-motion'
import { Eye, Heart, ShoppingBag, X } from 'lucide-react'
import { inr, waLink } from '../config/site'
import { discount, filterTabs, matchProducts, type Product } from '../data/products'
import { useShop } from '../store/shop'
import { Img, Reveal, SectionHeading, WhatsAppIcon } from './ui'

export function ProductCard({ p }: { p: Product }) {
  const { addToCart, toggleWishlist, wishlist, openQuickView } = useShop()
  const saved = wishlist.includes(p.id)
  const off = discount(p)
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-midnight/[0.08] bg-white shadow-[0_1px_0_rgba(22,6,27,.04)] transition duration-500 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_24px_50px_-28px_rgba(90,37,78,.55)]">
      <div className="relative aspect-[4/5] overflow-hidden bg-ivory-deep">
        <button type="button" onClick={() => openQuickView(p)} className="block h-full w-full" aria-label={`Quick view: ${p.name}`}>
          <Img
            name={p.image}
            alt={p.name}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
            className="h-full w-full object-cover transition duration-[900ms] ease-out group-hover:scale-[1.07]"
          />
        </button>
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1.5">
          {off > 0 && <span className="rounded-full bg-plum px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-wider text-white">{off}% off</span>}
          {p.badge && <span className="rounded-full bg-midnight/85 px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-wider text-gold-light backdrop-blur">{p.badge}</span>}
        </div>
        <motion.button
          type="button"
          whileTap={{ scale: 0.8 }}
          onClick={() => toggleWishlist(p)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${p.name} from wishlist` : `Save ${p.name} to wishlist`}
          className={`absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full backdrop-blur transition ${
            saved ? 'bg-plum text-gold-light' : 'bg-white/80 text-midnight hover:bg-white hover:text-plum'
          }`}
        >
          <Heart className={`h-[1.1rem] w-[1.1rem] ${saved ? 'fill-current' : ''}`} />
        </motion.button>
        <button
          type="button"
          onClick={() => openQuickView(p)}
          className="absolute inset-x-3 bottom-3 hidden translate-y-0 items-center justify-center gap-2 rounded-full bg-midnight/80 py-2.5 text-xs font-bold uppercase tracking-wider text-white opacity-100 backdrop-blur transition duration-300 hover:bg-midnight focus-visible:opacity-100 md:flex md:translate-y-3 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
        >
          <Eye className="h-4 w-4" /> Quick view
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
        <p className="text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-bronze">{filterTabs.find((t) => t.key === p.category)?.label ?? 'Festive'}</p>
        <h3 className="font-display text-[1.2rem] font-semibold leading-snug text-midnight sm:text-[1.3rem]">{p.name}</h3>
        <div className="mt-auto flex flex-wrap items-baseline gap-x-2">
          <span className="text-lg font-bold tabular-nums text-plum">{inr(p.price)}</span>
          {p.mrp && <span className="text-sm tabular-nums text-midnight/40 line-through">{inr(p.mrp)}</span>}
        </div>
        {p.priceNote && <p className="-mt-1 text-xs text-midnight/55">{p.priceNote}</p>}
        <button
          type="button"
          onClick={() => addToCart(p)}
          className="mt-2 flex items-center justify-center gap-2 rounded-full border border-midnight/15 py-2.5 text-[0.78rem] font-bold uppercase tracking-wider text-midnight transition hover:border-plum hover:bg-plum hover:text-white active:scale-[0.98]"
        >
          <ShoppingBag className="h-4 w-4" /> Add to bag
        </button>
      </div>
    </article>
  )
}

export function Products() {
  const { filter, goTo } = useShop()
  const items = matchProducts(filter.key)
  const isTab = filterTabs.some((t) => t.key === filter.key)

  return (
    <section id="shop" className="relative scroll-mt-28 bg-ivory py-20 md:py-28">
      <div className="paisley-bg pointer-events-none absolute inset-0 opacity-[0.5]" />
      <div className="relative mx-auto max-w-[1320px] px-[max(16px,env(safe-area-inset-left,0px))] md:px-6">
        <SectionHeading
          eyebrow="Featured collection"
          title="Handpicked for Your Elegance"
          subtitle="Discover Designs You'll Fall in Love With."
          tone="light"
        >
          <p className="rounded-full border border-bronze/30 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-bronze">
            Demo catalogue · sample products &amp; prices
          </p>
        </SectionHeading>

        <div className="no-scrollbar -mx-4 mt-10 overflow-x-auto px-4">
          <div role="tablist" aria-label="Filter products" className="mx-auto flex w-max gap-2 rounded-full border border-midnight/10 bg-white/70 p-1.5 backdrop-blur">
            {filterTabs.map((t) => {
              const active = filter.key === t.key
              return (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => goTo({ filter: t.key })}
                  className={`relative whitespace-nowrap rounded-full px-4 py-2 text-[0.82rem] font-semibold transition sm:px-5 ${
                    active ? 'text-gold-light' : 'text-midnight/70 hover:text-midnight'
                  }`}
                >
                  {active && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-midnight" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  <span className="relative">{t.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {!isTab && (
          <div className="mt-5 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-plum px-4 py-2 text-sm text-white">
              Showing: <strong className="font-semibold text-gold-light">{filter.label}</strong>
              <button type="button" onClick={() => goTo({ filter: 'all' })} className="ml-1 rounded-full p-0.5 hover:bg-white/15" aria-label="Clear filter">
                <X className="h-4 w-4" />
              </button>
            </span>
          </div>
        )}

        <div aria-live="polite" className="mt-10">
          {items.length === 0 ? (
            <Reveal>
              <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 rounded-[28px] border border-gold/40 bg-white p-10 text-center">
                <p className="font-display text-3xl font-semibold text-midnight">This edit is being curated</p>
                <p className="max-w-md text-midnight/65">
                  {filter.label} aren’t in this demo catalogue yet. Message the boutique to ask what’s in store right now.
                </p>
                <a
                  href={waLink(`Hello Mayuram Boutique, I'm looking for ${filter.label}. What do you have available?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold mt-2 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider"
                >
                  <WhatsAppIcon className="h-4 w-4" /> Ask about {filter.label}
                </a>
                <button type="button" onClick={() => goTo({ filter: 'all' })} className="text-sm font-semibold text-plum underline underline-offset-4">
                  View featured pieces
                </button>
              </div>
            </Reveal>
          ) : (
            <motion.ul layout className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
              <AnimatePresence mode="popLayout">
                {items.map((p, i) => (
                  <motion.li
                    key={p.id}
                    layout
                    initial={{ opacity: 0, y: 24, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1, transition: { delay: Math.min(i, 8) * 0.04, duration: 0.45 } }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
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
