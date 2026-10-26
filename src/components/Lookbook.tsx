import { Camera, Instagram } from 'lucide-react'
import { site, waLink } from '../config/site'
import { lookbook } from '../data/content'
import { Img, Reveal, SectionHeading, WhatsAppIcon } from './ui'

export function Lookbook() {
  return (
    <section id="lookbook" className="relative scroll-mt-28 overflow-hidden bg-midnight py-20 md:py-28">
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[480px] w-[480px] rounded-full bg-plum/40 blur-[120px]" />
      <div className="relative mx-auto max-w-[1320px] px-[max(16px,env(safe-area-inset-left,0px))] md:px-6">
        <SectionHeading eyebrow="Lookbook" title="Style Inspirations" subtitle="Explore Beautiful Saree Looks & Boutique Creations." />
      </div>
      <Reveal>
        <ul className="no-scrollbar mt-12 flex snap-x gap-4 overflow-x-auto px-[max(16px,env(safe-area-inset-left,0px))] pb-4 md:px-6 xl:justify-center">
          {lookbook.map((l, i) => (
            <li key={l.image} className={`shrink-0 snap-center ${i % 2 ? 'xl:mt-10' : ''}`}>
              <a
                href={waLink(`Hello Mayuram Boutique, I love the “${l.label}” look on your website. Can you help me with something similar?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block h-[300px] w-[240px] overflow-hidden rounded-[24px] border border-gold/25 sm:h-[340px] sm:w-[270px]"
              >
                <Img name={l.image} alt={l.label} full={800} sizes="270px" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-midnight/65 text-center opacity-0 backdrop-blur-[2px] transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="grid h-14 w-14 scale-75 place-items-center rounded-full border border-gold text-gold transition duration-500 group-hover:scale-100">
                    <Camera className="h-6 w-6" />
                  </span>
                  <span className="px-4 font-display text-xl font-semibold text-white">{l.label}</span>
                  <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold-light">Ask for this look</span>
                </span>
                <span className="absolute bottom-3 left-3 rounded-full bg-midnight/70 px-3 py-1 text-xs text-white/85 backdrop-blur transition group-hover:opacity-0">
                  {l.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
      <div className="mt-10 flex justify-center px-4">
        {site.social.instagram ? (
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-6 py-3 text-sm font-semibold text-gold transition hover:bg-gold hover:text-midnight">
            <Instagram className="h-4 w-4" /> Follow us on Instagram
          </a>
        ) : (
          <a
            href={waLink('Hello Mayuram Boutique, here is a look I would like to recreate:')}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-6 py-3 text-sm font-semibold text-gold transition hover:bg-gold hover:text-midnight"
          >
            <WhatsAppIcon className="h-4 w-4" /> Send us a look you love
          </a>
        )}
      </div>
    </section>
  )
}
