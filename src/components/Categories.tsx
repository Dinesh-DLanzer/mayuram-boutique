import { ArrowRight } from 'lucide-react'
import { categories } from '../data/content'
import { useShop } from '../store/shop'
import { Img, Reveal, SectionHeading } from './ui'

// Mosaic placement for the five lead collections (12 columns x 2 rows on desktop)
const tiles = [
  'col-span-2 aspect-[4/3] sm:aspect-[16/10] lg:col-span-5 lg:row-span-2 lg:aspect-auto',
  'aspect-[3/4] lg:col-span-4 lg:aspect-auto',
  'aspect-[3/4] lg:col-span-3 lg:aspect-auto',
  'aspect-[3/4] lg:col-span-3 lg:aspect-auto',
  'aspect-[3/4] lg:col-span-4 lg:aspect-auto',
]

export function Categories() {
  const { goTo } = useShop()
  const lead = categories.slice(0, 5)
  const more = categories.slice(5)

  return (
    <section id="collections" className="scroll-mt-28 bg-ivory py-20 text-midnight md:py-28">
      <div className="shell">
        <SectionHeading title="Explore our collections" subtitle="Silks for the big days, cottons for every day, and blouses made to go with both." tone="light" />

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12 lg:grid-rows-[repeat(2,minmax(0,300px))]">
          {lead.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.06} className={`${tiles[i]} relative`}>
              <button type="button" onClick={() => goTo(c)} className="group frame absolute inset-0 overflow-hidden text-left">
                <Img
                  name={c.image}
                  alt=""
                  full={900}
                  sizes={i === 0 ? '(max-width: 1024px) 100vw, 560px' : '(max-width: 1024px) 50vw, 420px'}
                  className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] ease-silk group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-midnight/85 via-midnight/20 to-transparent" />
                <span className={`absolute inset-x-0 bottom-0 flex flex-col gap-1.5 ${i === 0 ? 'p-7 sm:p-10' : 'p-5 sm:p-7'}`}>
                  <span className={`font-display leading-[1.05] text-white ${i === 0 ? 'text-[clamp(1.9rem,3.4vw,2.9rem)]' : 'text-[clamp(1.25rem,2vw,1.75rem)]'}`}>
                    {c.label}
                  </span>
                  <span className="hidden max-w-[30ch] text-sm text-white/75 sm:block">{c.text}</span>
                  <span className="mt-2 flex items-center gap-3 label text-gold-light">
                    Explore
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-gold-light/60 transition duration-500 group-hover:translate-x-1 group-hover:bg-gold group-hover:text-midnight">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <ul className="no-scrollbar -mx-4 mt-12 flex snap-x gap-6 overflow-x-auto px-4 sm:justify-center sm:gap-10">
          {more.map((c) => (
            <li key={c.label} className="shrink-0 snap-start">
              <button type="button" onClick={() => goTo(c)} className="group flex w-24 flex-col items-center gap-3 text-center sm:w-28">
                <span className="block rounded-full p-1 ring-1 ring-bronze/30 transition duration-500 group-hover:ring-bronze">
                  <Img name={c.image} alt="" sizes="104px" className="aspect-square w-full rounded-full object-cover transition duration-700 group-hover:scale-105" />
                </span>
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-midnight/75 transition group-hover:text-midnight">{c.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
