import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { story } from '../data/content'
import { Img, Ornament, Reveal } from './ui'

const layout = [
  'col-span-2 lg:col-span-5 lg:row-span-2 aspect-[4/3] lg:aspect-auto',
  'lg:col-span-4 aspect-[4/5] lg:aspect-auto',
  'lg:col-span-3 aspect-[4/5] lg:aspect-auto',
  'lg:col-span-3 aspect-[4/5] lg:aspect-auto',
  'lg:col-span-4 aspect-[4/5] lg:aspect-auto',
]

export function Story() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const drift = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40])

  return (
    <section id="story" ref={ref} className="relative scroll-mt-28 overflow-hidden bg-ivory-deep py-20 md:py-28">
      <div className="paisley-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-[1320px] px-[max(16px,env(safe-area-inset-left,0px))] md:px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-bronze">Craftsmanship</p>
            <h2 className="mt-3 text-balance font-display text-[clamp(2.3rem,5vw,4.4rem)] font-semibold leading-[1.02] text-midnight">
              Rooted in Tradition.
              <br />
              <em className="text-plum">Styled for Today.</em>
            </h2>
            <Ornament className="mt-4 h-3.5 w-44 text-bronze" />
          </Reveal>
          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            <p className="text-pretty text-[1.05rem] leading-relaxed text-midnight/75">
              A saree is chosen for how it falls and how it catches the light. A blouse is judged by how it fits. At
              Mayuram we look after both: choosing fabrics with care, and stitching and finishing every blouse with
              the same attention, from the first measurement to the last bead.
            </p>
          </Reveal>
        </div>

        <motion.div style={{ y: drift }} className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12 lg:grid-rows-[repeat(2,minmax(0,280px))]">
          {story.map((s, i) => (
            <Reveal key={s.image} delay={i * 0.06} className={`${layout[i]} relative overflow-hidden rounded-[26px]`}>
              <figure className="group relative h-full w-full">
                <Img name={s.image} alt={s.title} full={900} sizes="(max-width: 1024px) 50vw, 520px" className="h-full w-full object-cover transition duration-[1200ms] group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 bg-gradient-to-t from-midnight/85 via-midnight/30 to-transparent p-4 pt-16 sm:p-5 sm:pt-20">
                  <span className="font-display text-xl font-semibold text-white sm:text-2xl">{s.title}</span>
                  <span className="hidden text-sm text-white/75 sm:block">{s.text}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
