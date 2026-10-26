import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ChevronLeft, ChevronRight, MapPin, Ruler, Scissors, Sparkles } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { img, site, srcSet } from '../config/site'
import { heroSlides } from '../data/content'
import { useShop } from '../store/shop'
import { ArchStitch, WhatsAppIcon } from './ui'

const DURATION = 7000
const silk = [0.22, 1, 0.36, 1] as const

/** A tailor's paper swing tag hanging off the frame, naming the piece in the photo. */
function SwingTag({ text }: { text: string }) {
  return (
    <div className="absolute -right-3 top-[66%] z-10 origin-top animate-sway sm:-right-8 sm:top-[46%]" aria-hidden="true">
      <span className="mx-auto block h-6 w-px bg-gold/70 sm:h-9" />
      <div className="relative w-32 bg-ivory px-3.5 pb-3.5 pt-6 text-midnight shadow-lift [clip-path:polygon(16%_0,84%_0,100%_13%,100%_100%,0_100%,0_13%)] sm:w-44 sm:px-4 sm:pb-4 sm:pt-7">
        <span className="absolute left-1/2 top-2.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-midnight" />
        <AnimatePresence mode="wait">
          <motion.p
            key={text}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.4 }}
            className="font-display text-[1.05rem] italic leading-snug sm:text-lg"
          >
            {text}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  )
}

export function Hero() {
  const { goTo } = useShop()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const lift = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60])
  const slide = heroSlides[index]

  const go = useCallback((d: number) => setIndex((i) => (i + d + heroSlides.length) % heroSlides.length), [])

  useEffect(() => {
    if (paused || reduce) return
    const t = window.setTimeout(() => go(1), DURATION)
    return () => window.clearTimeout(t)
  }, [index, paused, reduce, go])

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
      className="relative isolate overflow-hidden bg-midnight"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_75%_at_72%_42%,#5A254E_0%,#2A0D30_48%,#16061B_78%)]" />
      <h1 className="sr-only">Mayuram Boutique: sarees, designer blouses, aari work and custom stitching in Thiruvanmiyur, Chennai</h1>

      <div className="shell grid items-center gap-x-16 gap-y-10 pb-6 pt-8 lg:min-h-[min(calc(100svh-190px),760px)] lg:grid-cols-[1.12fr_1fr] lg:py-12">
        {/* arched photograph */}
        <motion.div style={{ y: lift }} className="relative mx-auto w-[min(100%,calc(46svh*0.8))] lg:order-last lg:w-full lg:max-w-[470px]">
          <div className="relative aspect-[4/5]">
            <div className="absolute -inset-[14px] text-gold/80">
              <ArchStitch drawKey={index} />
            </div>
            <div className="arch-top absolute inset-0 overflow-hidden bg-midnight-700 shadow-lift">
              <AnimatePresence initial={false}>
                <motion.picture
                  key={slide.image}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ opacity: { duration: 1.2 }, scale: { duration: reduce ? 0 : 7, ease: 'easeOut' } }}
                >
                  <source media="(max-width: 960px)" srcSet={img(slide.image + '-md')} />
                  <img
                    src={img(slide.image)}
                    srcSet={srcSet(slide.image, 1100)}
                    sizes="470px"
                    alt=""
                    className="h-full w-full object-cover"
                    // React 18 only passes the lowercase HTML attribute through
                    {...({ fetchpriority: index === 0 ? 'high' : 'auto' } as object)}
                  />
                </motion.picture>
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-midnight/50 to-transparent" />
            </div>
            <SwingTag text={slide.tag} />
          </div>
        </motion.div>

        {/* copy */}
        <div className="min-h-[300px] sm:min-h-[340px] lg:min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div key={index} className="flex max-w-[600px] flex-col gap-6" exit={{ opacity: 0, transition: { duration: 0.3 } }}>
              <h2 className="font-display text-[2.1rem] font-normal leading-[1.06] text-white sm:text-[clamp(2.4rem,3.4vw,3.6rem)] sm:leading-[1.04]">
                {slide.title.map((line, i) => (
                  <span key={line} className="block overflow-hidden pb-[0.08em]">
                    <motion.span
                      className={`block ${i === 1 ? 'italic text-gold-light' : ''}`}
                      initial={{ y: reduce ? 0 : '105%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, delay: 0.1 + i * 0.12, ease: silk }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h2>
              <motion.div
                className="flex flex-col gap-7"
                initial={{ opacity: 0, y: reduce ? 0 : 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45, ease: silk }}
              >
                <p className="max-w-[46ch] text-pretty text-[1.04rem] leading-relaxed text-white/75">{slide.text}</p>
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={() => goTo(slide.primary)} className="btn btn-gold">
                    {slide.primary.label}
                  </button>
                  <button type="button" onClick={() => goTo(slide.secondary)} className="btn btn-line">
                    {slide.secondary.label}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* slide controls */}
      <div className="shell flex items-center justify-between gap-4 pb-8">
        <div className="flex gap-6 sm:gap-8" role="tablist" aria-label="Choose collection">
          {heroSlides.map((s, i) => (
            <button
              key={s.image}
              type="button"
              role="tab"
              aria-selected={i === index}
              onClick={() => setIndex(i)}
              className={`group flex flex-col gap-2.5 py-2 text-left label transition ${i === index ? 'text-gold-light' : 'text-white/45 hover:text-white/80'}`}
            >
              {s.label}
              <span className="relative block h-px w-14 overflow-hidden bg-white/20 sm:w-20">
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
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(-1)} aria-label="Previous slide" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition hover:border-gold hover:text-gold">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next slide" className="grid h-11 w-11 place-items-center rounded-full border border-white/25 text-white transition hover:border-gold hover:text-gold">
            <ChevronRight className="h-5 w-5" />
          </button>
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
    { icon: WhatsAppIcon, title: 'Order on WhatsApp', text: site.phones[0].display },
    { icon: MapPin, title: 'Visit the Boutique', text: 'L.B. Road, Thiruvanmiyur' },
  ]
  return (
    <div className="border-t border-gold/15 bg-midnight-900/60">
      <ul className="shell no-scrollbar flex snap-x gap-8 overflow-x-auto py-5 lg:justify-between">
        {items.map(({ icon: Icon, title, text }) => (
          <li key={title} className="flex min-w-max snap-start items-center gap-3">
            <Icon className="h-5 w-5 shrink-0 text-gold" />
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
