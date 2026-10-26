import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Heart, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { links, waLink } from '../config/site'
import { megaMenus, navItems, type MegaMenu, type MenuLink, type NavItem } from '../data/menus'
import { useShop } from '../store/shop'
import { MobileDrawer } from './MobileDrawer'
import { SearchBox } from './SearchBox'
import { Img, WhatsAppIcon } from './ui'

const logo = `${import.meta.env.BASE_URL}logo.webp`

function AnnouncementBar() {
  const msgs = [
    'Sarees · Designer Blouses · Aari Work · Custom Stitching',
    'Thiruvanmiyur, Chennai',
    'Order on WhatsApp 90034 67515',
  ]
  const row = (key: string, hidden = false) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {msgs.map((m) => (
        <span key={m} className="flex items-center gap-8 px-8">
          <span>{m}</span>
          <span className="h-1 w-1 rotate-45 bg-gold/60" />
        </span>
      ))}
    </div>
  )
  return (
    <div className="relative overflow-hidden bg-plum py-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-gold-pale">
      <div className="marquee flex w-max animate-marquee">
        {row('a')}
        {row('b', true)}
        {row('c', true)}
        {row('d', true)}
      </div>
    </div>
  )
}

function IconButton({
  label,
  count,
  onClick,
  expanded,
  children,
  className = '',
}: {
  label: string
  count?: number
  onClick?: () => void
  expanded?: boolean
  children: React.ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={expanded}
      aria-label={count ? `${label} (${count})` : label}
      className={`group relative grid h-11 w-11 place-items-center rounded-full text-white/85 transition hover:bg-white/[0.07] hover:text-gold ${className}`}
    >
      {children}
      {count !== undefined && count > 0 && (
        <motion.span
          key={count}
          initial={{ scale: 0.4 }}
          animate={{ scale: 1 }}
          className="absolute right-0.5 top-0.5 grid h-[1.15rem] min-w-[1.15rem] place-items-center rounded-full bg-gold px-1 text-[0.65rem] font-bold text-midnight"
        >
          {count}
        </motion.span>
      )}
    </button>
  )
}

function MegaPanel({ menu, onPick }: { menu: MegaMenu; onPick: (l: MenuLink | MegaMenu['banner']['action']) => void }) {
  const cols = menu.columns.length
  return (
    <motion.div
      id={`mega-${menu.id}`}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-0 right-0 top-full z-40"
    >
      <div className="shell">
        <div className="relative max-h-[calc(100vh-170px)] overflow-y-auto border border-t-0 border-gold/25 bg-midnight-800 shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gold/60" />
          <div className="grid gap-10 p-9" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr)) minmax(260px, 1.1fr)` }}>
            {menu.columns.map((c) => (
              <div key={c.title} className="min-w-0">
                <p className="mb-5 font-display text-xl text-gold-light">{c.title}</p>
                <ul className="flex flex-col gap-1">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <button
                        type="button"
                        onClick={() => onPick(l)}
                        className="group/link flex w-full items-center gap-3 py-1.5 text-left text-sm text-white/70 transition hover:text-white focus-visible:text-white"
                      >
                        {l.thumb && (
                          <Img name={l.thumb} alt="" sizes="36px" className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-gold/40 transition group-hover/link:ring-gold" />
                        )}
                        <span className="relative">
                          {l.label}
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover/link:w-full" />
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <button type="button" onClick={() => onPick(menu.banner.action)} className="group frame relative min-h-[320px] overflow-hidden text-left">
              <Img
                name={menu.banner.image}
                alt=""
                sizes="340px"
                className="absolute inset-0 h-full w-full object-cover transition duration-[1200ms] ease-silk group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/40 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-7">
                <span className="font-display text-[1.45rem] leading-[1.1] text-white">{menu.banner.title}</span>
                <span className="text-sm text-white/75">{menu.banner.text}</span>
                <span className="mt-2 flex items-center gap-2 label text-gold-light">{menu.banner.cta} <ArrowRight className="h-3.5 w-3.5" /></span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Header() {
  const { wishlist, cartCount, setPanel, goTo } = useShop()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [drawer, setDrawer] = useState(false)
  const [search, setSearch] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const closeTimer = useRef<number>()
  const openTimer = useRef<number>()
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({})

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!openMenu && !search) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (openMenu) triggers.current[openMenu]?.focus()
      setOpenMenu(null)
      setSearch(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openMenu, search])

  const scheduleClose = () => {
    window.clearTimeout(openTimer.current)
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 220)
  }
  const scheduleOpen = (id: string) => {
    window.clearTimeout(closeTimer.current)
    window.clearTimeout(openTimer.current)
    // open instantly when moving between menus, with a short intent delay otherwise
    openTimer.current = window.setTimeout(() => setOpenMenu(id), openMenu ? 0 : 90)
  }

  const pick = (t: { filter?: string; section?: string; whatsapp?: string }) => {
    setOpenMenu(null)
    if (t.whatsapp) window.open(waLink(t.whatsapp), '_blank', 'noopener')
    else goTo(t)
  }

  const onNav = (item: NavItem) => {
    if (item.menu) setOpenMenu((m) => (m === item.menu ? null : item.menu!))
    else pick(item)
  }

  return (
    <>
      <AnnouncementBar />
      <header
        className={`sticky z-40 border-b transition-[background-color,box-shadow,border-color] duration-500 ${
          scrolled || openMenu || search
            ? 'border-gold/20 bg-midnight/95 shadow-[0_10px_40px_-20px_rgba(0,0,0,.9)] backdrop-blur-xl'
            : 'border-gold/10 bg-midnight'
        }`}
        style={{ top: 'env(safe-area-inset-top, 0px)' }}
        onMouseLeave={scheduleClose}
      >
        <div className="shell flex items-center gap-2 py-2.5 xl:gap-8">
          <button
            type="button"
            className="-ml-2 grid h-11 w-11 place-items-center rounded-full text-white hover:text-gold xl:hidden"
            aria-label="Open menu"
            aria-expanded={drawer}
            onClick={() => setDrawer(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
          <a href="#top" onClick={(e) => { e.preventDefault(); goTo({ section: 'top' }) }} className="shrink-0" aria-label="Mayuram Boutique home">
            <img
              src={logo}
              alt="Mayuram Boutique"
              width={640}
              height={243}
              className={`w-auto transition-all duration-500 ${scrolled ? 'h-10 xl:h-12' : 'h-12 xl:h-[3.6rem]'}`}
            />
          </a>

          <nav aria-label="Main" className="mx-auto hidden xl:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const menu = item.menu ? megaMenus.find((m) => m.id === item.menu) : undefined
                const isOpen = !!menu && openMenu === menu.id
                return (
                  <li
                    key={item.label}
                    onMouseEnter={() => (menu ? scheduleOpen(menu.id) : scheduleClose())}
                    onBlur={(e) => {
                      if (menu && isOpen && !e.currentTarget.contains(e.relatedTarget as Node)) setOpenMenu(null)
                    }}
                  >
                    <button
                      ref={(el) => {
                        if (menu) triggers.current[menu.id] = el
                      }}
                      type="button"
                      onClick={() => onNav(item)}
                      onKeyDown={(e) => {
                        if (menu && e.key === 'ArrowDown') {
                          e.preventDefault()
                          setOpenMenu(menu.id)
                          window.setTimeout(() => document.querySelector<HTMLButtonElement>(`#mega-${menu.id} button`)?.focus(), 60)
                        }
                      }}
                      aria-expanded={menu ? isOpen : undefined}
                      aria-controls={menu ? `mega-${menu.id}` : undefined}
                      className={`group relative whitespace-nowrap px-4 py-5 text-[0.74rem] font-semibold uppercase tracking-[0.2em] transition ${
                        isOpen ? 'text-gold-light' : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {item.label}
                      <span
                        className={`absolute inset-x-4 bottom-3.5 h-px origin-left bg-gold transition-transform duration-300 ${
                          isOpen ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </button>
                    <AnimatePresence>{isOpen && menu && <MegaPanel menu={menu} onPick={pick} />}</AnimatePresence>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-0.5 xl:ml-0">
            <IconButton label={search ? 'Close search' : 'Search'} expanded={search} onClick={() => setSearch((s) => !s)}>
              {search ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </IconButton>
            <IconButton label="Wishlist" count={wishlist.length} onClick={() => setPanel('wishlist')} className="hidden sm:grid">
              <Heart className="h-5 w-5" />
            </IconButton>
            <IconButton label="Shopping bag" count={cartCount} onClick={() => setPanel('bag')}>
              <ShoppingBag className="h-5 w-5" />
            </IconButton>
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 hidden items-center gap-2 whitespace-nowrap border border-gold/50 px-4 py-2.5 text-[0.74rem] font-semibold tracking-wider text-gold-light transition hover:bg-gold hover:text-midnight 2xl:inline-flex"
            >
              <WhatsAppIcon className="h-4 w-4" />
              90034 67515
            </a>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {search && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-white/[0.06]"
            >
              <div className="mx-auto max-w-2xl px-4 py-4">
                <SearchBox autoFocus onDone={() => setSearch(false)} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {openMenu && (
          <motion.div
            className="fixed inset-0 z-30 hidden bg-midnight/60 xl:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpenMenu(null)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} onPick={pick} />
    </>
  )
}
