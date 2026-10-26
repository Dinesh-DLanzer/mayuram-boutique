import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { waLink } from '../config/site'
import { services, stitchSteps } from '../data/content'
import { Img, Reveal, SectionHeading, WhatsAppIcon } from './ui'

/** The four steps of a made-to-measure blouse, joined by a stitch that sews itself as you scroll. */
function StitchPath() {
  const ref = useRef<HTMLOListElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 55%'] })
  const across = useTransform(scrollYProgress, (v) => `inset(0 ${(1 - v) * 100}% 0 0)`)
  const down = useTransform(scrollYProgress, (v) => `inset(0 0 ${(1 - v) * 100}% 0)`)

  return (
    <ol ref={ref} className="relative grid gap-10 pl-10 lg:grid-cols-4 lg:gap-8 lg:pl-0 lg:pt-12">
      <motion.svg style={reduce ? undefined : { clipPath: across }} aria-hidden="true" className="absolute left-0 right-0 top-[7px] hidden h-[2px] w-full text-gold lg:block">
        <line x1="0" y1="1" x2="100%" y2="1" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 6" />
      </motion.svg>
      <motion.svg style={reduce ? undefined : { clipPath: down }} aria-hidden="true" className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-[2px] text-gold lg:hidden">
        <line x1="1" y1="0" x2="1" y2="100%" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 6" />
      </motion.svg>
      {stitchSteps.map((s, i) => (
        <li key={s.title} className="relative flex flex-col gap-2">
          <span className="absolute -left-10 top-1 h-4 w-4 rotate-45 border border-gold bg-midnight lg:-top-12 lg:left-0" aria-hidden="true" />
          <span className="sr-only">Step {i + 1}: </span>
          <h4 className="font-display text-[1.45rem] leading-tight text-white">{s.title}</h4>
          <p className="max-w-[32ch] text-sm leading-relaxed text-white/65">{s.text}</p>
        </li>
      ))}
    </ol>
  )
}

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-28 overflow-hidden bg-[linear-gradient(160deg,#3a1238_0%,#2A0D30_38%,#16061B_100%)] py-20 md:py-28">
      <div className="shell flex flex-col gap-20">
        <div className="grid items-start gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div className="flex flex-col gap-10">
            <SectionHeading
              title={
                <>
                  Crafted especially <em className="text-gold-light">for you.</em>
                </>
              }
              subtitle="From an everyday blouse stitched to fit, to bridal handwork planned across fittings: all under one roof in Thiruvanmiyur."
              align="left"
            />
            <ul className="grid gap-x-10 sm:grid-cols-2">
              {services.map((s, i) => (
                <motion.li
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -40px 0px' }}
                  transition={{ duration: 0.6, delay: (i % 2) * 0.08 }}
                  className="group flex gap-4 border-t border-white/10 py-5"
                >
                  <Img name={s.image} alt="" sizes="64px" className="h-20 w-16 shrink-0 object-cover opacity-90 transition duration-500 group-hover:opacity-100" />
                  <span className="flex flex-col gap-1">
                    <span className="font-display text-xl leading-tight text-white">{s.title}</span>
                    <span className="text-sm leading-relaxed text-white/65">{s.text}</span>
                  </span>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-5">
              <a
                href={waLink("Hello Mayuram Boutique, I'd like to discuss a design for a custom blouse.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-gold"
              >
                <WhatsAppIcon className="h-4 w-4" /> Discuss your design
              </a>
              <p className="text-sm text-white/60">Share a photo of your saree or a design you love.</p>
            </div>
          </div>

          <Reveal className="relative mx-auto w-full max-w-[460px] lg:sticky lg:top-32">
            <div className="relative aspect-[4/5]">
              <div className="arch-top absolute -inset-3 border border-gold/40" aria-hidden="true" />
              <div className="arch-top absolute inset-0 overflow-hidden">
                <Img
                  name="svc-arch"
                  alt="Woman in a red embroidered blouse and ivory sari, standing by a green wall"
                  full={900}
                  sizes="(max-width: 1024px) 90vw, 460px"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="frame absolute -bottom-10 -left-4 w-[46%] shadow-lift sm:-left-14">
                <Img name="story-blouse" alt="Hands sewing a hem with needle and thread" sizes="220px" full={800} className="aspect-[4/5] w-full object-cover" />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-12 border-t border-gold/20 pt-16">
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-[clamp(1.7rem,3vw,2.5rem)] leading-tight text-white">How a made-to-measure blouse comes together</h3>
            <p className="max-w-xl text-white/65">No pattern books to wade through. Bring the saree, and the design is planned with you before any handwork begins.</p>
          </div>
          <StitchPath />
        </div>
      </div>
    </section>
  )
}
