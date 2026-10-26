import { promos } from '../data/content'
import { useShop } from '../store/shop'
import { Img, Reveal, SectionHeading } from './ui'

export function Promos() {
  const { goTo } = useShop()
  return (
    <section id="offers" className="relative scroll-mt-28 bg-midnight py-20 md:py-28">
      <div className="mx-auto max-w-[1320px] px-[max(16px,env(safe-area-inset-left,0px))] md:px-6">
        <SectionHeading eyebrow="Offers & edits" title="Festive & Bridal Edits" subtitle="Seasonal collections, styled for the occasions that matter most." />
        <div className="mt-12 grid gap-4 md:gap-5 lg:grid-cols-2 lg:grid-rows-2">
          {promos.map((p, i) => (
            <Reveal key={p.image} delay={i * 0.08} className={i === 0 ? 'lg:row-span-2' : ''}>
              <button
                type="button"
                onClick={() => goTo({ filter: p.filter })}
                className={`group relative block w-full overflow-hidden rounded-[28px] border border-gold/30 text-left transition duration-500 hover:border-gold hover:shadow-gold ${
                  i === 0 ? 'aspect-[4/5] sm:aspect-[3/2] lg:aspect-auto lg:h-full' : 'aspect-[3/2] sm:aspect-[2/1] lg:aspect-[1.9/1]'
                }`}
              >
                <Img name={p.image} alt="" full={1200} sizes="(max-width: 1024px) 100vw, 650px" className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] ease-out group-hover:scale-[1.06]" />
                <span className="absolute inset-0 bg-[linear-gradient(100deg,rgba(22,6,27,.92)_0%,rgba(90,37,78,.55)_45%,transparent_75%)]" />
                <span className="absolute inset-3 rounded-[22px] border border-gold/30 transition group-hover:inset-4 group-hover:border-gold/60" />
                <span className={`absolute inset-y-0 left-0 flex flex-col justify-end gap-3 p-7 sm:p-10 ${i === 0 ? 'max-w-[85%] sm:max-w-[60%] lg:justify-center' : 'max-w-[62%] sm:max-w-[52%]'}`}>
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-gold-light">{p.eyebrow}</span>
                  <span className={`text-balance font-display font-semibold leading-[1.02] text-white ${i === 0 ? 'text-[clamp(2rem,4.4vw,3.6rem)]' : 'text-[clamp(1.6rem,3vw,2.4rem)]'}`}>
                    {p.title}
                  </span>
                  <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-midnight transition group-hover:gap-3 group-hover:bg-gold-light">
                    {p.cta} <span aria-hidden="true">→</span>
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
