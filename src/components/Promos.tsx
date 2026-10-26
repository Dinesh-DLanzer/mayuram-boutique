import { promos } from '../data/content'
import { useShop } from '../store/shop'
import { Img, Reveal, SectionHeading } from './ui'

export function Promos() {
  const { goTo } = useShop()
  return (
    <section id="offers" className="scroll-mt-28 border-t border-bronze/15 bg-ivory py-20 text-midnight md:py-28">
      <div className="shell">
        <SectionHeading title="Festive & bridal edits" subtitle="Seasonal collections, styled for the occasions that matter most." tone="light" />
        <div className="mt-14 grid gap-4 md:gap-5 lg:grid-cols-[1.1fr_1fr] lg:grid-rows-2">
          {promos.map((p, i) => (
            <Reveal key={p.image} delay={i * 0.08} className={i === 0 ? 'lg:row-span-2' : ''}>
              <button
                type="button"
                onClick={() => goTo({ filter: p.filter })}
                className={`group frame relative block w-full overflow-hidden text-left ${
                  i === 0 ? 'aspect-[4/5] sm:aspect-[3/2] lg:aspect-auto lg:h-full lg:min-h-[640px]' : 'aspect-[4/3] sm:aspect-[2/1] lg:aspect-[1.75/1]'
                }`}
              >
                <picture>
                  <source media="(max-width: 960px)" srcSet={`${import.meta.env.BASE_URL}images/${p.image}-md.webp`} />
                  <Img
                    name={p.image}
                    alt=""
                    full={1400}
                    sizes="(max-width: 1024px) 100vw, 680px"
                    className="absolute inset-0 h-full w-full object-cover transition duration-[1600ms] ease-silk group-hover:scale-[1.05]"
                  />
                </picture>
                <span className={`absolute inset-0 ${i === 0 ? 'bg-gradient-to-t from-midnight/90 via-midnight/25 to-transparent' : 'bg-gradient-to-t from-midnight/90 via-midnight/30 to-transparent sm:bg-[linear-gradient(100deg,rgba(22,6,27,.9)_0%,rgba(22,6,27,.5)_45%,transparent_75%)]'}`} />
                <span className={`absolute flex flex-col gap-4 ${i === 0 ? 'inset-x-0 bottom-0 p-8 sm:p-12' : 'inset-x-0 bottom-0 p-7 sm:inset-y-0 sm:right-auto sm:max-w-[55%] sm:justify-center sm:p-10'}`}>
                  <span className={`font-display leading-[1.05] text-white ${i === 0 ? 'text-[clamp(2.1rem,3.9vw,3.4rem)]' : 'text-[clamp(1.5rem,2.5vw,2.2rem)]'}`}>
                    {p.title}
                  </span>
                  <span className="btn btn-line mt-1 min-h-[44px] w-fit whitespace-nowrap px-5">{p.cta}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
