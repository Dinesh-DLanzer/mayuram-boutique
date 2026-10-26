import { Instagram } from 'lucide-react'
import { site, waLink } from '../config/site'
import { lookbook } from '../data/content'
import { Img, Reveal, SectionHeading, WhatsAppIcon } from './ui'

export function Lookbook() {
  return (
    <section id="lookbook" className="scroll-mt-28 bg-ivory py-20 text-midnight md:py-28">
      <div className="shell">
        <SectionHeading title="Style inspirations" subtitle="Saree looks and boutique details we love. Tap one to ask for something similar." tone="light" />
        <ul className="mt-14 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
          {lookbook.map((l, i) => (
            <li key={l.image}>
              <Reveal delay={i * 0.05}>
                <a
                  href={waLink(`Hello Mayuram Boutique, I love the “${l.label}” look on your website. Can you help me with something similar?`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block aspect-square overflow-hidden"
                >
                  <Img name={l.image} alt={l.label} full={800} sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 230px" className="h-full w-full object-cover transition duration-1000 ease-silk group-hover:scale-110" />
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-midnight/70 p-3 text-center opacity-0 transition duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="font-display text-lg leading-tight text-white">{l.label}</span>
                    <span className="label text-gold-light">Ask for this look</span>
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-center text-xs text-midnight/55">Curated preview images, not the boutique's own work.</p>
        <div className="mt-8 flex justify-center">
          {site.social.instagram ? (
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
              <Instagram className="h-4 w-4" /> Follow on Instagram
            </a>
          ) : (
            <a href={waLink('Hello Mayuram Boutique, here is a look I would like to recreate:')} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
              <WhatsAppIcon className="h-4 w-4" /> Send us a look you love
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
