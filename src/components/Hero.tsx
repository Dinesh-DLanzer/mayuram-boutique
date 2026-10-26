import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin, Ruler, Scissors, Sparkles } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { img } from '../config/site'
import { heroSlides } from '../data/content'
import { useShop } from '../store/shop'
import { Feather, WhatsAppIcon } from './ui'

const DURATION = 7000

export function Hero() {
  const { goTo } = useShop()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '12%'])
  const slide = heroSlides[index]

  const go = useCallback((d: number) => setIndex((i) => (i + d + heroSlides.length) % heroSlides.length), [])

  useEffect(() => {
    if (paused || reduce) return
    const t = window.setTimeout(() => go(1), DURATION)
    return () => window.clearTimeout(t)
  }, [index, paused, reduce, go])

  const onPointer = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <section
      id="top"
      ref={ref}
      aria-roledescription="carousel"
      aria-label="Featured collections"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onPointerMove={onPointer}
      className="hero-glow relative isolate overflow-hidden bg-midnight"
    >
      <div className="relative h-[min(86vh,820px)] min-h-[600px] w-full">
        <motion.div style={{ y }} className="absolute inset-0">
          <AnimatePresence initial={false}>
            <motion.picture
              key={slide.image}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 1.1 }, scale: { duration: reduce ? 0 : 8, ease: 'linear' } }}
            >
              <source media="(max-width: 960px)" srcSet={img(slide.image + '-md')} />
              <img
                src={img(slide.image)}
                alt=""
                className="h-full w-full object-cover object-[72%_center]"
                fetchPriority={index === 0 ? 'high' : 'auto'}
              />
            </motion.picture>
          </AnimatePresence>
        </motion.div>

        {/* readability gradients */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,6,27,.94)_0%,rgba(22,6,27,.78)_34%,rgba(22,6,27,.15)_62%,transparent_80%)] max-md:bg-[linear-gradient(0deg,rgba(22,6,27,.97)_8%,rgba(22,6,27,.75)_48%,rgba(22,6,27,.1)_80%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-midnight to-transparent" />
        {/* light sweep */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-soft-light">
          <div className="absolute -inset-y-10 left-0 w-1/4 animate-sweep bg-gradient-to-r from-transparent via-gold-pale/40 to-transparent motion-reduce:hidden" />
        </div>
        {/* cursor glow */}
        <div className="cursor-glow pointer-events-none absolute inset-0" />
        <Feather className="pointer-events-none absolute -left-6 top-10 h-64 w-28 animate-float opacity-[0.18] max-md:hidden" style={{ ['--r' as string]: '-18deg' }} />

        <div className="relative z-10 mx-auto flex h-full max-w-[1320px] items-end px-[max(16px,env(safe-area-inset-left,0px))] pb-24 md:items-center md:px-6 md:pb-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              className="flex max-w-[620px] flex-col gap-5"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
                exit: { opacity: 0, transition: { duration: 0.3 } },
              }}
            >
              {[
                <p key="e" className="flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-gold">
                  <span className="h-px w-10 bg-gold" />
                  {slide.eyebrow}
                </p>,
                index === 0 ? (
                  <h1 key="t" className="text-balance font-display text-[clamp(2.6rem,6.2vw,5.4rem)] font-semibold leading-[0.98] text-white">
                    Where Tradition Meets <em className="gold-text font-semibold">Timeless Elegance.</em>
                  </h1>
                ) : (
                  <p key="t" role="heading" aria-level={2} className="text-balance font-display text-[clamp(2.6rem,6.2vw,5.4rem)] font-semibold leading-[0.98] text-white">
                    {slide.title}
                  </p>
                ),
                <p key="a" className="font-display text-[clamp(1.2rem,2vw,1.6rem)] italic text-gold-light">
                  {slide.accent}
                </p>,
                <p key="x" className="max-w-[520px] text-pretty text-[1.02rem] leading-relaxed text-white/75">
                  {slide.text}
                </p>,
                <div key="c" className="mt-2 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => goTo(slide.primary)}
                    className="btn-gold group relative overflow-hidden rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-wider"
                  >
                    {slide.primary.label}
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(slide.secondary)}
                    className="rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold uppercase tracking-wider text-white backdrop-blur transition hover:border-gold hover:text-gold"
                  >
                    {slide.secondary.label}
                  </button>
                </div>,
              ].map((el) => (
                <motion.div
                  key={el.key}
                  variants={{
                    hidden: { opacity: 0, y: reduce ? 0 : 28, filter: reduce ? 'none' : 'blur(6px)' },
                    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  {el}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* controls */}
        <div className="absolute bottom-7 left-0 right-0 z-10 mx-auto flex max-w-[1320px] items-center justify-between px-[max(16px,env(safe-area-inset-left,0px))] md:px-6">
          <div className="flex items-center gap-3" role="tablist" aria-label="Choose slide">
            {heroSlides.map((s, i) => (
              <button
                key={s.image}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Slide ${i + 1}: ${s.eyebrow}`}
                onClick={() => setIndex(i)}
                className="group flex flex-col gap-2 py-2 text-left"
              >
                <span className="relative block h-[3px] w-12 overflow-hidden rounded-full bg-white/20 sm:w-20">
                  {i === index && (
                    <motion.span
                      key={`${index}-${paused}`}
                      className="absolute inset-y-0 left-0 bg-gold"
                      initial={{ width: paused || reduce ? '100%' : '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: paused || reduce ? 0 : DURATION / 1000, ease: 'linear' }}
                    />
                  )}
                </span>
                <span className={`hidden text-[0.66rem] font-semibold uppercase tracking-[0.18em] sm:block ${i === index ? 'text-gold' : 'text-white/45 group-hover:text-white/80'}`}>
                  0{i + 1} · {s.eyebrow.split(' ')[0]}
                </span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => go(-1)} aria-label="Previous slide" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white backdrop-blur transition hover:border-gold hover:text-gold">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next slide" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white backdrop-blur transition hover:border-gold hover:text-gold">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <HighlightsBar />
    </section>
  )
}

function HighlightsBar() {
  const items = [
    { icon: Scissors, title: 'Blouse Stitching', text: 'Made to your measurements' },
    { icon: Sparkles, title: 'Aari Work', text: 'Hand embroidery & beadwork' },
    { icon: Ruler, title: 'Alterations', text: 'Fittings and finishing' },
    { icon: WhatsAppIcon, title: 'Order on WhatsApp', text: '90034 67515' },
    { icon: MapPin, title: 'Visit the Boutique', text: 'L.B. Road, Thiruvanmiyur' },
  ]
  return (
    <div className="relative z-10 border-y border-gold/15 bg-midnight-800/80 backdrop-blur">
      <ul className="no-scrollbar mx-auto flex max-w-[1320px] snap-x gap-2 overflow-x-auto px-[max(16px,env(safe-area-inset-left,0px))] py-4 md:px-6 lg:justify-between">
        {items.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex min-w-[210px] snap-start items-center gap-3 lg:min-w-0">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/40 bg-gold/10 text-gold">
              <Icon className="h-5 w-5" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-white">{title}</span>
              <span className="block text-xs text-white/55">{text}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
