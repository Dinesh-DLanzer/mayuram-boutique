import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Heart, Menu, Search, ShoppingBag, UserRound } from 'lucide-react'
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
    'Discover Timeless Elegance at Mayuram Boutique',
    'Premium Sarees • Custom Blouse Stitching • Designer Collections',
    'Thiruvanmiyur, Chennai · WhatsApp 90034 67515',
  ]
  const row = (key: string, hidden = false) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {msgs.map((m) => (
        <span key={m} className="flex items-center gap-6 px-6">
          <span>{m}</span>
          <span className="text-gold/50">✦</span>
        </span>
      ))}
    </div>
  )
  return (
    <div className="relative overflow-hidden border-b border-gold/15 bg-[linear-gradient(90deg,#16061B,#3a1238_50%,#16061B)] py-2 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-gold-light">
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
  href,
  children,
  className = '',
}: {
  label: string
  count?: number
  onClick?: () => void
  href?: string
  children: React.ReactNode
  className?: string
}) {
  const cls = `group relative grid h-11 w-11 place-items-center rounded-full text-white/85 transition hover:bg-white/[0.07] hover:text-gold ${className}`
  const badge =
    count !== undefined && count > 0 ? (
      <motion.span
        key={count}
        initial={{ scale: 0.4 }}
        animate={{ scale: 1 }}
        className="absolute right-0.5 top-0.5 grid h-[1.15rem] min-w-[1.15rem] place-items-center rounded-full bg-gold px-1 text-[0.65rem] font-bold text-midnight"
      >
        {count}
      </motion.span>
    ) : null
  if (href)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className={cls}>
        {children}
        {badge}
      </a>
    )
  return (
    <button type="button" onClick={onClick} aria-label={count ? `${label} (${count})` : label} className={cls}>
      {children}
      {badge}
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
      className="absolute left-0 right-0 top-full z-40 pt-px"
    >
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="relative max-h-[calc(100vh-190px)] overflow-y-auto rounded-b-3xl border border-t-0 border-gold/25 bg-[linear-gradient(160deg,rgba(42,13,48,.97),rgba(22,6,27,.98))] shadow-[0_40px_80px_-30px_rgba(0,0,0,.8)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          <div className="grid gap-8 p-8" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr)) minmax(260px, 1.15fr)` }}>
            {menu.columns.map((c) => (
              <div key={c.title} className="min-w-0">
                <p className="mb-4 font-display text-xl font-semibold text-gold">{c.title}</p>
                <ul className="flex flex-col gap-1">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <button
                        type="button"
                        onClick={() => onPick(l)}
                        className="group/link flex w-full items-center gap-3 rounded-lg py-1.5 text-left text-[0.9rem] text-white/75 transition hover:text-white focus-visible:text-white"
                      >
                        {l.thumb ? (
                          <Img
                            name={l.thumb}
                            alt=""
                            sizes="36px"
                            className="h-9 w-9 shrink-0 rounded-full border border-gold/40 object-cover transition group-hover/link:border-gold"
                          />
                        ) : (
                          <span className="h-1 w-1 shrink-0 rounded-full bg-gold/50 transition group-hover/link:bg-gold" />
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
            <button
              type="button"
              onClick={() => onPick(menu.banner.action)}
              className="group/banner relative min-h-[300px] overflow-hidden rounded-2xl border border-gold/40 text-left"
            >
              <Img
                name={menu.banner.image}
                alt=""
                sizes="320px"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover/banner:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/50 to-transparent" />
              <span className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6">
                <span className="text-[0.66rem] font-semibold uppercase tracking-[0.26em] text-gold-light">{menu.banner.eyebrow}</span>
                <span className="font-display text-[1.7rem] font-semibold uppercase leading-[1.05] tracking-wide text-white">
                  {menu.banner.title}
                </span>
                <span className="text-sm text-white/75">{menu.banner.text}</span>
                <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-bold uppercase tracking-wider text-midnight transition group-hover/banner:bg-gold-light">
                  {menu.banner.cta} →
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Header() {
  const { wishlist, cartCount, setPanel, goTo, toast } = useShop()
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [drawer, setDrawer] = useState(false)
  const [mobileSearch, setMobileSearch] = useState(false)
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
    if (!openMenu) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        triggers.current[openMenu]?.focus()
        setOpenMenu(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openMenu])

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
          scrolled
            ? 'border-gold/20 bg-midnight/90 shadow-[0_10px_40px_-20px_rgba(0,0,0,.9)] backdrop-blur-xl'
            : 'border-gold/10 bg-midnight/75 backdrop-blur-md'
        }`}
        style={{ top: 'env(safe-area-inset-top, 0px)' }}
        onMouseLeave={scheduleClose}
      >
        <div className="mx-auto flex max-w-[1320px] items-center gap-3 px-[max(16px,env(safe-area-inset-left,0px))] py-2.5 lg:gap-8 lg:px-6">
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full text-white hover:text-gold lg:hidden"
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
              className={`w-auto transition-all duration-500 ${scrolled ? 'h-11 lg:h-14' : 'h-12 lg:h-[4.4rem]'}`}
            />
          </a>
          <div className="mx-auto hidden w-full max-w-xl lg:block">
            <SearchBox />
          </div>
          <div className="ml-auto flex items-center gap-0.5 lg:ml-0">
            <IconButton label="Search" onClick={() => setMobileSearch((s) => !s)} className="lg:hidden">
              <Search className="h-5 w-5" />
            </IconButton>
            <IconButton label="Wishlist" count={wishlist.length} onClick={() => setPanel('wishlist')} className="hidden sm:grid">
              <Heart className="h-5 w-5" />
            </IconButton>
            <IconButton
              label="Account"
              onClick={() => toast('Customer accounts come with the full online store. Orders are taken on WhatsApp for now.')}
              className="hidden sm:grid"
            >
              <UserRound className="h-5 w-5" />
            </IconButton>
            <IconButton label="Shopping bag" count={cartCount} onClick={() => setPanel('bag')}>
              <ShoppingBag className="h-5 w-5" />
            </IconButton>
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 hidden items-center gap-2 rounded-full border border-gold/50 px-4 py-2.5 text-[0.8rem] font-semibold text-gold transition hover:bg-gold hover:text-midnight xl:inline-flex"
            >
              <WhatsAppIcon className="h-4 w-4" />
              90034 67515
            </a>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {mobileSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 pb-3 lg:hidden"
            >
              <SearchBox autoFocus onDone={() => setMobileSearch(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        <nav aria-label="Main" className="relative hidden border-t border-white/[0.06] lg:block">
          <ul className="mx-auto flex max-w-[1320px] items-center justify-center gap-1 px-6">
            {navItems.map((item) => {
              const menu = item.menu ? megaMenus.find((m) => m.id === item.menu) : undefined
              const isOpen = !!menu && openMenu === menu.id
              return (
                <li
                  key={item.label}
                  className="static"
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
                    className={`group relative flex items-center gap-1 px-3.5 py-3.5 text-[0.82rem] font-semibold tracking-wide transition xl:px-4 ${
                      isOpen ? 'text-gold' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {item.label}
                    {menu && <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />}
                    <span
                      className={`absolute inset-x-3 bottom-1.5 h-[2px] origin-center rounded-full bg-gold transition-transform duration-300 ${
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
      </header>

      <AnimatePresence>
        {openMenu && (
          <motion.div
            className="fixed inset-0 z-30 hidden bg-midnight/60 backdrop-blur-[2px] lg:block"
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
