import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useId, useMemo, useRef, useState } from 'react'
import { inr } from '../config/site'
import { categories } from '../data/content'
import { megaMenus } from '../data/menus'
import { searchProducts, type Product } from '../data/products'
import { useShop, type Target } from '../store/shop'
import { Img } from './ui'

type Suggestion =
  | { kind: 'product'; product: Product }
  | { kind: 'category'; label: string; target: Target }

const categoryIndex: { label: string; target: Target }[] = [
  ...categories.map((c) => ({ label: c.label, target: { filter: c.filter, section: c.section } })),
  ...megaMenus.flatMap((m) =>
    m.columns.flatMap((c) => c.links.map((l) => ({ label: l.label, target: { filter: l.filter, section: l.section } }))),
  ),
].filter((v, i, a) => a.findIndex((x) => x.label === v.label) === i)

const popular = ['Kanchipuram silk', 'Aari work blouse', 'Bridal', 'Cotton saree', 'Chiffon']

export function SearchBox({ autoFocus = false, onDone }: { autoFocus?: boolean; onDone?: () => void }) {
  const { openQuickView, goTo } = useShop()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listId = useId()

  const results = useMemo<Suggestion[]>(() => {
    const t = q.trim().toLowerCase()
    if (!t) return []
    const prods = searchProducts(t)
      .slice(0, 5)
      .map((product) => ({ kind: 'product' as const, product }))
    const cats = categoryIndex
      .filter((c) => c.label.toLowerCase().includes(t) || t.split(/\s+/).every((w) => c.label.toLowerCase().includes(w)))
      .slice(0, 4)
      .map((c) => ({ kind: 'category' as const, ...c }))
    return [...cats, ...prods]
  }, [q])

  const choose = (s: Suggestion) => {
    if (s.kind === 'product') openQuickView(s.product)
    else goTo(s.target)
    setOpen(false)
    setQ('')
    inputRef.current?.blur()
    onDone?.()
  }

  const submit = (text: string) => {
    const t = text.trim()
    if (!t) return
    goTo({ filter: `q:${t}` })
    setOpen(false)
    inputRef.current?.blur()
    onDone?.()
  }

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, -1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (active >= 0 && results[active]) choose(results[active])
      else submit(q)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  const showPanel = open

  return (
    <div
      className="relative w-full"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false)
      }}
    >
      <div className="group relative flex items-center">
        <motion.span
          className="pointer-events-none absolute left-4 text-gold"
          animate={open ? { scale: 1.12, rotate: -12 } : { scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
        >
          <Search className="h-[1.1rem] w-[1.1rem]" aria-hidden="true" />
        </motion.span>
        <input
          id={autoFocus ? 'search-mobile' : 'search-desktop'}
          ref={inputRef}
          autoFocus={autoFocus}
          type="search"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
          aria-label="Search sarees, blouses, designs and collections"
          placeholder="Search sarees, blouses, designs and collections..."
          value={q}
          onChange={(e) => {
            setQ(e.target.value)
            setActive(-1)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          className="h-12 w-full rounded-full border border-gold/30 bg-white/[0.06] pl-11 pr-10 text-[0.92rem] text-white placeholder:text-white/45 outline-none backdrop-blur transition focus:border-gold/80 focus:bg-white/[0.09] focus:shadow-[0_0_0_4px_rgba(219,160,28,.15)]"
        />
        {q && (
          <button
            type="button"
            onClick={() => {
              setQ('')
              inputRef.current?.focus()
            }}
            className="absolute right-3 rounded-full p-1 text-white/60 hover:text-white"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {showPanel && (
          <motion.div
            id={listId}
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-gold/25 bg-midnight-800 p-2 shadow-card"
          >
            {!q.trim() ? (
              <div className="p-3">
                <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold/80">Popular searches</p>
                <div className="flex flex-wrap gap-2">
                  {popular.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        setQ(p)
                        inputRef.current?.focus()
                      }}
                      className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/80 transition hover:border-gold hover:text-gold"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="p-4 text-sm text-white/70">
                No matches for “{q}”. Try “silk”, “blouse” or “bridal”, or{' '}
                <button type="button" className="text-gold underline underline-offset-4" onClick={() => submit(q)}>
                  see all results
                </button>
                .
              </div>
            ) : (
              <ul className="max-h-[60vh] overflow-y-auto">
                {results.map((s, i) => (
                  <li key={s.kind === 'product' ? s.product.id : s.label} id={`${listId}-${i}`} role="option" aria-selected={i === active}>
                    <button
                      type="button"
                      tabIndex={-1}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => choose(s)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition ${
                        i === active ? 'bg-gold/15' : 'hover:bg-white/5'
                      }`}
                    >
                      {s.kind === 'product' ? (
                        <>
                          <Img name={s.product.image} alt="" sizes="44px" className="h-11 w-11 shrink-0 rounded-lg object-cover" />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm text-white">{s.product.name}</span>
                            <span className="text-xs text-gold">{inr(s.product.price)}</span>
                          </span>
                          <span className="text-[0.65rem] uppercase tracking-widest text-white/40">Quick view</span>
                        </>
                      ) : (
                        <>
                          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-gold/30 text-gold">
                            <Search className="h-4 w-4" />
                          </span>
                          <span className="flex-1 text-sm text-white">{s.label}</span>
                          <span className="text-[0.65rem] uppercase tracking-widest text-white/40">Collection</span>
                        </>
                      )}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => submit(q)}
                    className="mt-1 w-full rounded-xl px-3 py-2.5 text-left text-sm text-gold hover:bg-white/5"
                  >
                    See all results for “{q}” →
                  </button>
                </li>
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
