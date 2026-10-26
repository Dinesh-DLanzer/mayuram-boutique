import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'
import { products, type Product } from '../data/products'
import { filterTabs } from '../data/products'
import { megaMenus } from '../data/menus'

// Demo shopping state: cart, wishlist, the product grid's active filter, the
// quick-view modal and toasts. Nothing is sent anywhere; ordering is handed
// over to WhatsApp from the bag.

export interface Toast {
  id: number
  text: string
}

export type Panel = null | 'bag' | 'wishlist'

export interface Target {
  filter?: string
  section?: string
}

interface ShopState {
  cart: Record<string, number>
  wishlist: string[]
  cartCount: number
  addToCart: (p: Product, qty?: number) => void
  setQty: (id: string, qty: number) => void
  toggleWishlist: (p: Product) => void
  filter: { key: string; label: string }
  quickView: Product | null
  openQuickView: (p: Product | null) => void
  panel: Panel
  setPanel: (p: Panel) => void
  toasts: Toast[]
  toast: (text: string) => void
  goTo: (t: Target) => void
}

const Ctx = createContext<ShopState | null>(null)

function labelFor(key: string): string {
  if (key.startsWith('q:')) return `Results for “${key.slice(2)}”`
  const tab = filterTabs.find((t) => t.key === key)
  if (tab) return tab.label
  for (const m of megaMenus)
    for (const c of m.columns)
      for (const l of c.links) if (l.filter === key) return l.label
  return key.replace(/[+-]/g, ' ')
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function scrollToId(id: string) {
  const el = id === 'top' ? document.body : document.getElementById(id)
  if (!el) return
  const behavior = prefersReducedMotion() ? 'auto' : 'smooth'
  if (id === 'top') window.scrollTo({ top: 0, behavior })
  else el.scrollIntoView({ behavior, block: 'start' })
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Record<string, number>>({})
  const [wishlist, setWishlist] = useState<string[]>([])
  const [filter, setFilter] = useState({ key: 'all', label: 'All' })
  const [quickView, openQuickView] = useState<Product | null>(null)
  const [panel, setPanel] = useState<Panel>(null)
  const [toasts, setToasts] = useState<Toast[]>([])
  const nextId = useRef(1)

  const toast = useCallback((text: string) => {
    const id = nextId.current++
    setToasts((t) => [...t.slice(-2), { id, text }])
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800)
  }, [])

  const addToCart = useCallback(
    (p: Product, qty = 1) => {
      setCart((c) => ({ ...c, [p.id]: (c[p.id] ?? 0) + qty }))
      toast(`Added “${p.name}” to your bag`)
    },
    [toast],
  )

  const setQty = useCallback((id: string, qty: number) => {
    setCart((c) => {
      const next = { ...c }
      if (qty <= 0) delete next[id]
      else next[id] = qty
      return next
    })
  }, [])

  const toggleWishlist = useCallback(
    (p: Product) => {
      setWishlist((w) => {
        const has = w.includes(p.id)
        toast(has ? `Removed “${p.name}” from wishlist` : `Saved “${p.name}” to wishlist`)
        return has ? w.filter((x) => x !== p.id) : [...w, p.id]
      })
    },
    [toast],
  )

  const goTo = useCallback((t: Target) => {
    if (t.filter) {
      setFilter({ key: t.filter, label: labelFor(t.filter) })
      window.setTimeout(() => scrollToId('shop'), 30)
    } else if (t.section) {
      scrollToId(t.section)
    }
  }, [])

  const value = useMemo<ShopState>(
    () => ({
      cart,
      wishlist,
      cartCount: Object.values(cart).reduce((a, b) => a + b, 0),
      addToCart,
      setQty,
      toggleWishlist,
      filter,
      quickView,
      openQuickView,
      panel,
      setPanel,
      toasts,
      toast,
      goTo,
    }),
    [cart, wishlist, addToCart, setQty, toggleWishlist, filter, quickView, panel, toasts, toast, goTo],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useShop() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useShop must be used inside ShopProvider')
  return v
}

export const productById = (id: string) => products.find((p) => p.id === id)
