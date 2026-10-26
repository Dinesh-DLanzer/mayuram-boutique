import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { inr, waLink } from '../config/site'
import { discount, products } from '../data/products'
import { productById, useShop } from '../store/shop'
import { Img, Ornament, WhatsAppIcon } from './ui'

/** Traps focus inside `ref`, closes on Escape and restores focus on unmount. */
function useDialog(open: boolean, onClose: () => void) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const prevFocus = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = window.setTimeout(() => ref.current?.querySelector<HTMLElement>('[data-autofocus], button')?.focus(), 40)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab' || !ref.current) return
      const f = ref.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])')
      if (!f.length) return
      const first = f[0]
      const last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      prevFocus?.focus?.()
    }
  }, [open, onClose])
  return ref
}

function Backdrop({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      className="absolute inset-0 bg-midnight/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
      aria-hidden="true"
    />
  )
}

export function QuickView() {
  const { quickView: p, openQuickView, addToCart, toggleWishlist, wishlist } = useShop()
  const [qty, setQty] = useState(1)
  const [color, setColor] = useState(0)
  const close = () => openQuickView(null)
  const ref = useDialog(!!p, close)

  useEffect(() => {
    setQty(1)
    setColor(0)
  }, [p])

  return (
    <AnimatePresence>
      {p && (
        <div className="fixed inset-0 z-[70] grid place-items-center p-3 sm:p-6" key="qv">
          <Backdrop onClick={close} />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby="qv-title"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="relative grid max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[28px] border border-gold/40 bg-ivory shadow-2xl md:grid-cols-2 md:overflow-hidden"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close quick view"
              className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/85 text-midnight backdrop-blur hover:bg-white"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-[4/5] bg-ivory-deep md:aspect-auto">
              <Img name={p.image} alt={p.name} eager sizes="(max-width: 768px) 100vw, 520px" className="h-full w-full object-cover" />
              {discount(p) > 0 && (
                <span className="absolute left-4 top-4 rounded-full bg-plum px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">{discount(p)}% off</span>
              )}
            </div>
            <div className="flex flex-col gap-4 p-6 sm:p-8 md:max-h-[92vh] md:overflow-y-auto">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-bronze">{p.badge ?? 'Mayuram Boutique'}</p>
              <h2 id="qv-title" className="font-display text-[2.1rem] font-semibold leading-tight text-midnight">{p.name}</h2>
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold tabular-nums text-plum">{inr(p.price)}</span>
                {p.mrp && <span className="tabular-nums text-midnight/40 line-through">{inr(p.mrp)}</span>}
              </div>
              {p.priceNote && <p className="-mt-2 text-sm text-midnight/60">{p.priceNote}</p>}
              <Ornament className="h-3 w-36 text-bronze" />
              <p className="leading-relaxed text-midnight/75">{p.description}</p>
              <dl className="grid gap-2 rounded-2xl border border-midnight/10 bg-white/70 p-4 text-sm">
                <div className="flex gap-3">
                  <dt className="w-16 shrink-0 font-semibold text-midnight">Fabric</dt>
                  <dd className="text-midnight/70">{p.fabric}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="w-16 shrink-0 font-semibold text-midnight">Blouse</dt>
                  <dd className="text-midnight/70">{p.category === 'blouses' ? 'Fitting can be adjusted at the boutique' : 'Running blouse piece · stitching available'}</dd>
                </div>
              </dl>
              {p.colors.length > 0 && (
                <div>
                  <p className="mb-2 text-sm font-semibold text-midnight">
                    Colour: <span className="font-normal text-midnight/65">{p.colors[color]?.name}</span>
                  </p>
                  <div className="flex gap-2">
                    {p.colors.map((c, i) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setColor(i)}
                        aria-label={c.name}
                        aria-pressed={i === color}
                        className={`h-9 w-9 rounded-full border-2 p-0.5 transition ${i === color ? 'border-gold' : 'border-transparent'}`}
                      >
                        <span className="block h-full w-full rounded-full ring-1 ring-black/10" style={{ background: c.hex }} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center rounded-full border border-midnight/15 bg-white">
                  <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-11 w-11 place-items-center text-midnight" aria-label="Decrease quantity">
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-semibold tabular-nums" aria-live="polite">{qty}</span>
                  <button type="button" onClick={() => setQty((q) => q + 1)} className="grid h-11 w-11 place-items-center text-midnight" aria-label="Increase quantity">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => {
                    addToCart(p, qty)
                    close()
                  }}
                  className="btn-gold flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-wider"
                >
                  <ShoppingBag className="h-4 w-4" /> Add to bag
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(p)}
                  aria-pressed={wishlist.includes(p.id)}
                  aria-label="Save to wishlist"
                  className={`grid h-11 w-11 place-items-center rounded-full border transition ${
                    wishlist.includes(p.id) ? 'border-plum bg-plum text-gold-light' : 'border-midnight/15 text-midnight hover:border-plum'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${wishlist.includes(p.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
              <a
                href={waLink(`Hello Mayuram Boutique, I'm interested in the ${p.name} (${p.colors[color]?.name ?? ''}) I saw on your website. Is it available?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full border border-[#1f8f4e]/40 py-3 text-sm font-semibold text-[#17763f] transition hover:bg-[#1f8f4e] hover:text-white"
              >
                <WhatsAppIcon className="h-4 w-4" /> Ask about this piece on WhatsApp
              </a>
              <p className="text-xs text-midnight/50">Demo product. Final availability, price and colours are confirmed by the boutique.</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

function Drawer({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  const ref = useDialog(open, onClose)
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70]" key="drawer">
          <Backdrop onClick={onClose} />
          <motion.aside
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 right-0 top-0 flex w-full max-w-md flex-col border-l border-gold/30 bg-ivory pb-[env(safe-area-inset-bottom,0px)] pt-[env(safe-area-inset-top,0px)]"
          >
            {children}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}

export function BagDrawer() {
  const { panel, setPanel, cart, setQty, wishlist, toggleWishlist, addToCart, openQuickView } = useShop()
  const close = () => setPanel(null)
  const lines = Object.entries(cart)
    .map(([id, qty]) => ({ p: productById(id)!, qty }))
    .filter((l) => l.p)
  const total = lines.reduce((s, l) => s + l.p.price * l.qty, 0)
  const saved = products.filter((p) => wishlist.includes(p.id))
  const message =
    'Hello Mayuram Boutique, I would like to order:\n' +
    lines.map((l) => `• ${l.p.name} × ${l.qty} (${inr(l.p.price * l.qty)})`).join('\n') +
    `\nEstimated total: ${inr(total)}`

  return (
    <Drawer open={panel !== null} onClose={close} title={panel === 'wishlist' ? 'Wishlist' : 'Shopping bag'}>
      <div className="flex items-center justify-between border-b border-midnight/10 px-5 py-4">
        <div role="tablist" className="flex gap-1 rounded-full bg-midnight/5 p-1">
          {(['bag', 'wishlist'] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={panel === t}
              onClick={() => setPanel(t)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold capitalize transition ${panel === t ? 'bg-midnight text-gold-light' : 'text-midnight/65'}`}
            >
              {t === 'bag' ? `Bag (${lines.reduce((s, l) => s + l.qty, 0)})` : `Wishlist (${saved.length})`}
            </button>
          ))}
        </div>
        <button type="button" onClick={close} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full text-midnight hover:bg-midnight/5">
          <X className="h-5 w-5" />
        </button>
      </div>

      {panel === 'bag' ? (
        lines.length === 0 ? (
          <EmptyState title="Your bag is empty" text="Add sarees and blouses you love, then send the list to the boutique on WhatsApp." onBrowse={close} />
        ) : (
          <>
            <ul className="flex-1 divide-y divide-midnight/10 overflow-y-auto px-5">
              {lines.map(({ p, qty }) => (
                <li key={p.id} className="flex gap-4 py-4">
                  <button type="button" onClick={() => openQuickView(p)} className="shrink-0">
                    <Img name={p.image} alt={p.name} sizes="80px" className="h-24 w-20 rounded-xl object-cover" />
                  </button>
                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <p className="font-display text-lg font-semibold leading-tight text-midnight">{p.name}</p>
                    <p className="text-sm font-semibold tabular-nums text-plum">{inr(p.price)}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-midnight/15 bg-white">
                        <button type="button" onClick={() => setQty(p.id, qty - 1)} aria-label={`Decrease ${p.name}`} className="grid h-8 w-8 place-items-center"><Minus className="h-3.5 w-3.5" /></button>
                        <span className="w-6 text-center text-sm font-semibold tabular-nums">{qty}</span>
                        <button type="button" onClick={() => setQty(p.id, qty + 1)} aria-label={`Increase ${p.name}`} className="grid h-8 w-8 place-items-center"><Plus className="h-3.5 w-3.5" /></button>
                      </div>
                      <button type="button" onClick={() => setQty(p.id, 0)} aria-label={`Remove ${p.name}`} className="grid h-8 w-8 place-items-center rounded-full text-midnight/50 hover:text-plum">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 border-t border-midnight/10 bg-white/70 p-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-midnight/70">Estimated total</span>
                <span className="text-xl font-bold tabular-nums text-midnight">{inr(total)}</span>
              </div>
              <a
                href={waLink(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold uppercase tracking-wider"
              >
                <WhatsAppIcon className="h-4 w-4" /> Send enquiry on WhatsApp
              </a>
              <p className="text-center text-xs text-midnight/50">Demo store: no payment is taken. The boutique confirms your order on WhatsApp.</p>
            </div>
          </>
        )
      ) : saved.length === 0 ? (
        <EmptyState title="No saved pieces yet" text="Tap the heart on any product to keep it here." onBrowse={close} />
      ) : (
        <ul className="flex-1 divide-y divide-midnight/10 overflow-y-auto px-5">
          {saved.map((p) => (
            <li key={p.id} className="flex gap-4 py-4">
              <Img name={p.image} alt={p.name} sizes="80px" className="h-24 w-20 shrink-0 rounded-xl object-cover" />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <p className="font-display text-lg font-semibold leading-tight text-midnight">{p.name}</p>
                <p className="text-sm font-semibold tabular-nums text-plum">{inr(p.price)}</p>
                <div className="mt-auto flex gap-2">
                  <button type="button" onClick={() => addToCart(p)} className="rounded-full bg-midnight px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gold-light">
                    Add to bag
                  </button>
                  <button type="button" onClick={() => toggleWishlist(p)} className="rounded-full border border-midnight/15 px-3 py-1.5 text-xs font-semibold text-midnight/70">
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  )
}

function EmptyState({ title, text, onBrowse }: { title: string; text: string; onBrowse: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 p-10 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full border border-gold/50 text-bronze">
        <ShoppingBag className="h-7 w-7" />
      </span>
      <p className="font-display text-2xl font-semibold text-midnight">{title}</p>
      <p className="max-w-xs text-sm text-midnight/60">{text}</p>
      <button type="button" onClick={onBrowse} className="mt-2 rounded-full bg-midnight px-6 py-2.5 text-sm font-semibold text-gold-light">
        Continue browsing
      </button>
    </div>
  )
}

export function Toasts() {
  const { toasts } = useShop()
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-24 z-[80] flex flex-col items-center gap-2 px-4" aria-live="polite" role="status">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            className="max-w-md rounded-full border border-gold/40 bg-midnight/95 px-5 py-3 text-center text-sm text-white shadow-card backdrop-blur"
          >
            {t.text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
