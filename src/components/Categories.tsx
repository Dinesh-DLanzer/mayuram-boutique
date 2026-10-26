import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import { categories } from '../data/content'
import { prefersReducedMotion, useShop } from '../store/shop'
import { Img, Reveal, SectionHeading } from './ui'

export function Categories() {
  const { goTo } = useShop()
  const track = useRef<HTMLUListElement>(null)
  const scroll = (d: number) => {
    const el = track.current
    if (!el) return
    el.scrollBy({ left: d * el.clientWidth * 0.8, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  return (
    <section id="collections" className="relative scroll-mt-32 overflow-hidden bg-midnight py-20 md:py-28">
      <div className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-plum/40 blur-[120px]" />
      <div className="relative mx-auto max-w-[1320px] px-[max(16px,env(safe-area-inset-left,0px))] md:px-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Shop by category" title="Explore Our Collections" subtitle="Curated Elegance for Every Occasion." align="left" />
          <div className="hidden gap-2 md:flex">
            <button type="button" onClick={() => scroll(-1)} aria-label="Scroll collections left" className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 text-gold transition hover:bg-gold hover:text-midnight">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="Scroll collections right" className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 text-gold transition hover:bg-gold hover:text-midnight">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <Reveal>
        <ul
          ref={track}
          className="no-scrollbar mx-auto mt-12 flex max-w-[1320px] snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-[max(16px,env(safe-area-inset-left,0px))] pb-4 md:scroll-px-6 md:px-6"
        >
          {categories.map((c) => (
            <li key={c.label} className="w-[46%] shrink-0 snap-start sm:w-[31%] md:w-[23%] lg:w-[18.2%]">
              <button
                type="button"
                onClick={() => goTo(c)}
                className="group flex w-full flex-col items-center gap-4 text-center"
              >
                <span className="arch relative block aspect-[4/5.4] w-full overflow-hidden border border-gold/45 bg-midnight-700 p-[5px] transition duration-500 group-hover:border-gold group-hover:shadow-gold">
                  <span className="arch relative block h-full w-full overflow-hidden">
                    <Img
                      name={c.image}
                      alt={c.label}
                      sizes="(max-width: 640px) 46vw, 260px"
                      className="h-full w-full object-cover transition duration-[900ms] ease-out group-hover:scale-110"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-midnight/70 via-transparent to-transparent opacity-70 transition group-hover:opacity-40" />
                  </span>
                </span>
                <span className="font-display text-[1.25rem] font-semibold leading-tight text-white transition group-hover:text-gold">
                  {c.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
