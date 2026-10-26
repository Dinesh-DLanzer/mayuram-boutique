import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { testimonials } from '../data/content'
import { prefersReducedMotion } from '../store/shop'
import { SectionHeading, Stars } from './ui'

export function Testimonials() {
  const track = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = track.current
    if (!el) return
    const onScroll = () => {
      const card = el.children[0] as HTMLElement | undefined
      if (!card) return
      setActive(Math.round(el.scrollLeft / (card.offsetWidth + 20)))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  const goto = (i: number) => {
    const el = track.current
    const card = el?.children[Math.max(0, Math.min(i, testimonials.length - 1))] as HTMLElement | undefined
    if (!el || !card) return
    el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  return (
    <section id="testimonials" className="relative scroll-mt-28 overflow-hidden bg-ivory py-20 md:py-28">
      <div className="relative mx-auto max-w-[1320px] px-[max(16px,env(safe-area-inset-left,0px))] md:px-6">
        <SectionHeading eyebrow="Kind words" title="Loved by Our Customers" tone="light">
          <p className="rounded-full border border-bronze/30 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-bronze">
            Placeholder reviews · for layout only
          </p>
        </SectionHeading>

        <ul ref={track} className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
          {testimonials.map((t) => (
            <li key={t.name} className="w-[88%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
              <figure className="relative flex h-full flex-col gap-5 rounded-[28px] border border-midnight/10 bg-white p-7 shadow-[0_30px_60px_-40px_rgba(90,37,78,.5)] sm:p-8">
                <span aria-hidden="true" className="absolute right-6 top-2 font-display text-[7rem] leading-none text-gold/25">
                  ”
                </span>
                <Stars value={t.rating} />
                <blockquote className="relative flex-1 font-display text-[1.35rem] leading-snug text-midnight">“{t.text}”</blockquote>
                <figcaption className="flex items-center gap-3 border-t border-midnight/10 pt-5">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-plum to-midnight font-display text-lg font-semibold text-gold-light ring-2 ring-gold/50 ring-offset-2">
                    {t.name.split(' ').pop()}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-midnight">{t.name}</span>
                    <span className="block text-xs text-midnight/55">{t.place} · sample review</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button type="button" onClick={() => goto(active - 1)} aria-label="Previous review" className="grid h-11 w-11 place-items-center rounded-full border border-midnight/15 text-midnight transition hover:border-plum hover:bg-plum hover:text-white">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => goto(i)}
                aria-label={`Go to review ${i + 1}`}
                aria-current={i === active}
                className={`h-2 rounded-full transition-all duration-300 ${i === active ? 'w-8 bg-plum' : 'w-2 bg-midnight/20'}`}
              />
            ))}
          </div>
          <button type="button" onClick={() => goto(active + 1)} aria-label="Next review" className="grid h-11 w-11 place-items-center rounded-full border border-midnight/15 text-midnight transition hover:border-plum hover:bg-plum hover:text-white">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
