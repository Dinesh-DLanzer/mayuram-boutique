import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, MapPin, Phone, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { links, site } from '../config/site'
import { megaMenus, navItems, type NavItem } from '../data/menus'
import { useShop } from '../store/shop'
import { Img, Ornament, WhatsAppIcon } from './ui'

const logo = `${import.meta.env.BASE_URL}logo.webp`

export function MobileDrawer({
  open,
  onClose,
  onPick,
}: {
  open: boolean
  onClose: () => void
  onPick: (t: { filter?: string; section?: string; whatsapp?: string }) => void
}) {
  const [expanded, setExpanded] = useState<string | null>('sarees')
  const closeRef = useRef<HTMLButtonElement>(null)
  const { setPanel, wishlist } = useShop()

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const go = (t: NavItem | { filter?: string; section?: string; whatsapp?: string }) => {
    onClose()
    window.setTimeout(() => onPick(t), 260)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex flex-col overflow-y-auto bg-[radial-gradient(circle_at_80%_0%,#5A254E_0%,#16061B_55%)] pb-[max(24px,env(safe-area-inset-bottom,0px))] pt-[env(safe-area-inset-top,0px)]"
          >
            <div className="flex items-center justify-between px-4 py-3">
              <img src={logo} alt="Mayuram Boutique" className="h-12 w-auto" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="grid h-11 w-11 place-items-center rounded-full border border-gold/30 text-gold"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <Ornament className="mx-auto my-2 h-3 w-40 text-gold/70" />
            <nav aria-label="Mobile" className="px-4">
              <ul className="divide-y divide-white/[0.07]">
                {navItems.map((item) => {
                  const menu = item.menu ? megaMenus.find((m) => m.id === item.menu) : undefined
                  if (!menu)
                    return (
                      <li key={item.label}>
                        <button
                          type="button"
                          onClick={() => go(item)}
                          className="w-full py-4 text-left font-display text-2xl font-semibold text-white"
                        >
                          {item.label}
                        </button>
                      </li>
                    )
                  const isOpen = expanded === menu.id
                  return (
                    <li key={item.label}>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setExpanded(isOpen ? null : menu.id)}
                        className="flex w-full items-center justify-between py-4 text-left font-display text-2xl font-semibold text-white"
                      >
                        {item.label}
                        <ChevronDown className={`h-5 w-5 text-gold transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.28 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-5 pb-5">
                              {menu.columns.map((c) => (
                                <div key={c.title}>
                                  <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold">{c.title}</p>
                                  <div className="flex flex-wrap gap-2">
                                    {c.links.map((l) => (
                                      <button
                                        key={l.label}
                                        type="button"
                                        onClick={() => go(l)}
                                        className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] py-1.5 pl-1.5 pr-3.5 text-sm text-white/85 active:border-gold"
                                      >
                                        {l.thumb ? (
                                          <Img name={l.thumb} alt="" sizes="28px" className="h-7 w-7 rounded-full object-cover" />
                                        ) : (
                                          <span className="ml-1.5 h-1 w-1 rounded-full bg-gold" />
                                        )}
                                        {l.label}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => go(menu.banner.action)}
                                className="relative h-36 overflow-hidden rounded-2xl border border-gold/40 text-left"
                              >
                                <Img name={menu.banner.image} alt="" sizes="100vw" className="absolute inset-0 h-full w-full object-cover" />
                                <span className="absolute inset-0 bg-gradient-to-r from-midnight/95 to-midnight/20" />
                                <span className="absolute inset-y-0 left-0 flex max-w-[75%] flex-col justify-center gap-1 p-5">
                                  <span className="font-display text-xl font-semibold uppercase leading-tight text-white">{menu.banner.title}</span>
                                  <span className="text-xs font-bold uppercase tracking-wider text-gold">{menu.banner.cta} →</span>
                                </span>
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  )
                })}
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      onClose()
                      setPanel('wishlist')
                    }}
                    className="w-full py-4 text-left font-display text-2xl font-semibold text-white"
                  >
                    Wishlist {wishlist.length > 0 && <span className="text-gold">({wishlist.length})</span>}
                  </button>
                </li>
              </ul>
            </nav>
            <div className="mt-6 flex flex-col gap-3 px-4">
              <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-gold py-3.5 font-semibold text-midnight">
                <WhatsAppIcon className="h-5 w-5" /> WhatsApp {site.phones[0].display}
              </a>
              <a href={links.call} className="flex items-center justify-center gap-2 rounded-full border border-gold/50 py-3.5 font-semibold text-gold">
                <Phone className="h-4 w-4" /> Call {site.phones[0].display}
              </a>
              <p className="mt-2 flex gap-2 text-sm leading-relaxed text-white/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                {site.addressLines.join(' ')}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
