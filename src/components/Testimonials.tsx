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
    <section id="testimonials" className="relative scroll-mt-28 overflow-hidden bg-[radial-gradient(ellipse_80%_90%_at_50%_0%,#167580_0%,#0E5E66_38%,#08363C_100%)] py-20 md:py-28">
      <div className="shell relative">
        <SectionHeading title="Loved by our customers" subtitle="Placeholder reviews for layout only. Real, consented customer feedback goes here before launch." />

        <ul ref={track} className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
          {testimonials.map((t) => (
            <li key={t.name} className="w-[88%] shrink-0 snap-start sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
              <figure className="flex h-full flex-col gap-6 border border-gold/30 bg-[#072e33]/40 p-7 sm:p-9">
                <div className="flex items-center justify-between gap-3">
                  <Stars value={t.rating} />
                  <span className="border border-gold/30 px-2 py-0.5 label text-gold-pale/80">Sample review</span>
                </div>
                <blockquote className="flex-1 font-display text-xl italic leading-snug text-white/90">“{t.text}”</blockquote>
                <figcaption className="flex items-center gap-3 border-t border-white/10 pt-5">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-gold/50 font-display text-lg text-gold-light">
                    {t.name.split(' ').pop()}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">{t.name}</span>
                    <span className="block text-xs text-white/60">{t.place}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button type="button" onClick={() => goto(active - 1)} aria-label="Previous review" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition hover:border-gold hover:text-gold">
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
                className={`h-[3px] transition-all duration-300 ${i === active ? 'w-10 bg-gold' : 'w-5 bg-white/25 hover:bg-white/50'}`}
              />
            ))}
          </div>
          <button type="button" onClick={() => goto(active + 1)} aria-label="Next review" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition hover:border-gold hover:text-gold">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
