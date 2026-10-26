import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { story } from '../data/content'
import { Img, Reveal, StitchLine } from './ui'

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
    <section id="story" ref={ref} className="relative scroll-mt-28 overflow-hidden bg-ivory py-20 text-midnight md:py-28">
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="flex flex-col gap-5 lg:col-span-6">
            <h2 className="font-display text-[clamp(2.3rem,5vw,4.2rem)] font-normal leading-[1.02]">
              Rooted in tradition.
              <br />
              <em className="text-plum">Styled for today.</em>
            </h2>
            <StitchLine className="w-24" tone="bronze" />
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
            <Reveal key={s.image} delay={i * 0.06} className={`${layout[i]} relative overflow-hidden`}>
              <figure className="group relative h-full w-full">
                <Img name={s.image} alt={s.title} full={i === 0 ? 1000 : 800} sizes="(max-width: 1024px) 50vw, 520px" className="h-full w-full object-cover transition duration-[1400ms] ease-silk group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-0.5 bg-gradient-to-t from-midnight/85 via-midnight/30 to-transparent p-4 pt-16 sm:p-6 sm:pt-20">
                  <span className="font-display text-xl text-white sm:text-2xl">{s.title}</span>
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
