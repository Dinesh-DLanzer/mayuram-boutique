import { motion } from 'framer-motion'
import { Crown, Flower2, Ruler, Scissors, Shirt, Sparkles, MoveHorizontal } from 'lucide-react'
import { useRef, useState } from 'react'
import { img, waLink } from '../config/site'
import { services, type ServiceIcon } from '../data/content'
import { Feather, Img, Reveal, SectionHeading, WhatsAppIcon } from './ui'

const icons: Record<ServiceIcon, typeof Scissors> = {
  scissors: Scissors,
  sparkles: Sparkles,
  crown: Crown,
  flower: Flower2,
  ruler: Ruler,
  shirt: Shirt,
}

function BeforeAfter() {
  const [pos, setPos] = useState(52)
  const box = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const update = (clientX: number) => {
    const r = box.current?.getBoundingClientRect()
    if (!r) return
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }
  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr]">
      <div className="flex flex-col gap-4">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-gold">Design preview</p>
        <h3 className="text-balance font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-semibold leading-tight text-white">
          From a clean stitch to a statement back.
        </h3>
        <p className="max-w-md leading-relaxed text-white/70">
          Drag the handle to compare a well-fitted plain blouse with the same piece after aari border work, a pearl
          neckline and a centre mandala. Your design is planned with you before any handwork begins.
        </p>
        <p className="text-xs text-white/45">Illustrative example.</p>
      </div>
      <div
        ref={box}
        className="relative aspect-square w-full touch-none select-none overflow-hidden rounded-[28px] border border-gold/40 shadow-gold"
        onPointerDown={(e) => {
          dragging.current = true
          e.currentTarget.setPointerCapture(e.pointerId)
          update(e.clientX)
        }}
        onPointerMove={(e) => dragging.current && update(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <img src={img('ba-after')} alt="After: blouse with aari work border, pearls and centre motif" loading="lazy" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <img src={img('ba-before')} alt="Before: plain stitched blouse with tacking lines" loading="lazy" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-midnight/80 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur">Before</span>
        <span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-midnight">After</span>
        <div className="pointer-events-none absolute inset-y-0 w-[2px] bg-gold shadow-[0_0_20px_rgba(219,160,28,.9)]" style={{ left: `calc(${pos}% - 1px)` }}>
          <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-gold bg-midnight text-gold">
            <MoveHorizontal className="h-5 w-5" />
          </span>
        </div>
        <input
          id="before-after"
          type="range"
          min={0}
          max={100}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Compare before and after"
          className="absolute inset-x-0 bottom-0 h-10 w-full cursor-ew-resize opacity-0 focus-visible:opacity-0"
        />
      </div>
    </div>
  )
}

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-28 overflow-hidden bg-[radial-gradient(ellipse_at_top_left,#5A254E_0%,#2A0D30_40%,#16061B_80%)] py-20 md:py-28">
      <Feather className="pointer-events-none absolute right-[4%] top-16 h-72 w-32 animate-float opacity-[0.14]" style={{ ['--r' as string]: '14deg' }} />
      <div className="relative mx-auto flex max-w-[1320px] flex-col gap-16 px-[max(16px,env(safe-area-inset-left,0px))] md:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <Reveal className="relative">
            <div className="lg:sticky lg:top-40">
              <div className="relative">
                <div className="arch overflow-hidden border border-gold/50 p-1.5">
                  <div className="arch overflow-hidden">
                    <Img name="story-embroidery" alt="Close-up of gold bead and pearl vine embroidery on plum silk" sizes="(max-width: 1024px) 90vw, 560px" full={900} className="aspect-[4/4.6] w-full object-cover" />
                  </div>
                </div>
                <div className="absolute -bottom-8 -right-2 w-[44%] overflow-hidden rounded-3xl border-4 border-midnight shadow-card sm:-right-6">
                  <Img name="p-aari-blouse" alt="Aari work blouse back on a dress form" sizes="260px" className="aspect-[4/5] w-full object-cover" />
                </div>
                <div className="absolute -left-2 top-8 rounded-2xl border border-gold/40 bg-midnight/80 px-4 py-3 backdrop-blur-md sm:-left-6">
                  <p className="font-display text-2xl font-semibold text-gold">Stitching · Aari · Clothes</p>
                  <p className="text-xs text-white/60">All under one roof in Thiruvanmiyur</p>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow="Boutique services"
              title="Crafted Especially for You."
              subtitle="From elegant blouse designs to intricate traditional handwork, explore personalized boutique creations that reflect your style."
              align="left"
            />
            <ul className="grid gap-4 sm:grid-cols-2">
              {services.map((s, i) => {
                const Icon = icons[s.icon]
                return (
                  <motion.li
                    key={s.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                    transition={{ duration: 0.6, delay: (i % 2) * 0.08 }}
                    className="group relative flex h-full gap-4 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur transition duration-500 hover:border-gold/60 hover:bg-white/[0.07]">
                      <div className="flex flex-1 flex-col gap-2">
                        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-gold to-bronze text-midnight shadow-[0_8px_24px_-10px_rgba(219,160,28,.9)]">
                          <Icon className="h-5 w-5" />
                        </span>
                        <h3 className="mt-1 font-display text-[1.35rem] font-semibold leading-tight text-white">{s.title}</h3>
                        <p className="text-sm leading-relaxed text-white/65">{s.text}</p>
                      </div>
                      <Img name={s.image} alt="" sizes="88px" className="h-24 w-[4.5rem] shrink-0 self-end rounded-2xl border border-gold/30 object-cover transition duration-500 group-hover:scale-105" />
                  </motion.li>
                )
              })}
            </ul>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={waLink("Hello Mayuram Boutique, I'd like to discuss a design for a custom blouse.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-wider"
              >
                <WhatsAppIcon className="h-4 w-4" /> Discuss Your Design
              </a>
              <p className="text-sm text-white/60">Share a photo of your saree or a design you love.</p>
            </div>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <Reveal>
          <BeforeAfter />
        </Reveal>
      </div>
    </section>
  )
}
