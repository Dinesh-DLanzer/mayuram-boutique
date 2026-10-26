import { Check, Copy, MapPin, Navigation, Phone } from 'lucide-react'
import { useState } from 'react'
import { links, site } from '../config/site'
import { Reveal, StitchLine, WhatsAppIcon } from './ui'

function CopyButton({ text, label }: { text: string; label: string }) {
  const [done, setDone] = useState(false)
  return (
    <button
      type="button"
      aria-label={`Copy ${label}`}
      onClick={() => {
        navigator.clipboard
          ?.writeText(text)
          .then(() => {
            setDone(true)
            window.setTimeout(() => setDone(false), 1800)
          })
          .catch(() => undefined)
      }}
      className="grid h-9 w-9 place-items-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-gold"
    >
      {done ? <Check className="h-4 w-4 text-gold" /> : <Copy className="h-4 w-4" />}
    </button>
  )
}

/** Live Google map of the boutique, loaded only when scrolled near. */
function MapCard() {
  return (
    <div className="flex h-full flex-col border border-gold/40 bg-midnight-800">
      <div className="relative min-h-[340px] flex-1">
        <iframe
          title="Map showing Mayuram Boutique on L.B. Road, Thiruvanmiyur"
          src={links.mapEmbed}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gold/30 p-5">
        <span>
          <span className="block font-display text-xl text-white">Mayuram Boutique</span>
          <span className="block text-xs text-white/60">Sampoorna Apartment · Thiruvanmiyur</span>
        </span>
        <a href={links.directions} target="_blank" rel="noopener noreferrer" className="btn btn-gold min-h-[42px] px-4">
          <Navigation className="h-4 w-4" /> Get Directions
        </a>
      </div>
    </div>
  )
}

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-28 overflow-hidden bg-midnight py-20 md:py-28">
      <div className="shell grid gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-[clamp(2.2rem,4.6vw,3.7rem)] font-normal leading-[1.04] text-white">
              Come and see the collection <em className="text-gold-light">in person.</em>
            </h2>
            <StitchLine className="w-24" />
          </div>

          <div className="grid border-y border-white/10 sm:grid-cols-2">
            {site.phones.map((p, i) => (
              <div key={p.tel} className={`flex flex-col gap-3 py-6 ${i ? 'sm:border-l sm:border-white/10 sm:pl-8' : 'border-b border-white/10 sm:border-b-0'}`}>
                <p className="label text-white/55">{p.label}</p>
                <div className="flex items-center gap-2">
                  <p className="select-all font-display text-3xl tabular-nums text-white">{p.display}</p>
                  <CopyButton text={p.display.replace(/\s/g, '')} label={p.display} />
                </div>
                <a href={i === 0 ? links.call : links.callAlt} className="flex w-fit items-center gap-2 label text-gold-light underline-offset-4 hover:underline">
                  <Phone className="h-3.5 w-3.5" /> Call now
                </a>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" />
            <address className="not-italic">
              <p className="label text-white/55">Store address</p>
              <p className="mt-2 select-all leading-relaxed text-white/85">
                {site.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </p>
              <p className="mt-2 text-sm text-white/60">Contact: {site.owner}</p>
            </address>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp Enquiry
            </a>
            <a href={links.call} className="btn btn-line">
              <Phone className="h-4 w-4" /> Call Now
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <MapCard />
        </Reveal>
      </div>
    </section>
  )
}
