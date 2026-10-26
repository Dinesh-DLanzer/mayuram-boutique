import { Check, Copy, MapPin, Navigation, Phone } from 'lucide-react'
import { useState } from 'react'
import { links, site } from '../config/site'
import { Ornament, Reveal, WhatsAppIcon } from './ui'

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

/** Decorative street sketch of the L.B. Road area; directions open Google Maps. */
function MapCard() {
  return (
    <a
      href={links.directions}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block h-full min-h-[340px] overflow-hidden rounded-[28px] border border-gold/40 bg-midnight-700"
      aria-label="Open directions to Mayuram Boutique in Google Maps"
    >
      <svg viewBox="0 0 600 460" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id="mapglow" cx="58%" cy="46%" r="60%">
            <stop offset="0" stopColor="#5A254E" />
            <stop offset="1" stopColor="#16061B" />
          </radialGradient>
          <pattern id="blocks" width="46" height="46" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
            <rect width="46" height="46" fill="none" />
            <rect x="5" y="5" width="36" height="36" rx="4" fill="#ffffff" opacity=".035" />
          </pattern>
        </defs>
        <rect width="600" height="460" fill="url(#mapglow)" />
        <rect width="600" height="460" fill="url(#blocks)" />
        {/* coastline to the east */}
        <path d="M520 0C500 120 540 220 515 330 500 400 530 440 525 460H600V0Z" fill="#0e3a5a" opacity=".55" />
        <path d="M520 0C500 120 540 220 515 330 500 400 530 440 525 460" stroke="#DBA01C" strokeOpacity=".25" fill="none" />
        {/* L.B. Road */}
        <path d="M0 250C140 236 260 222 350 212S520 196 600 190" stroke="#DBA01C" strokeOpacity=".55" strokeWidth="10" fill="none" strokeLinecap="round" />
        <path d="M0 250C140 236 260 222 350 212S520 196 600 190" stroke="#16061B" strokeWidth="1.5" strokeDasharray="10 10" fill="none" />
        {/* cross streets */}
        {[90, 190, 300, 420].map((x, i) => (
          <path key={x} d={`M${x} 0C${x + 10} 120 ${x - 14} 300 ${x + 6} 460`} stroke="#fff" strokeOpacity={i === 2 ? 0.22 : 0.1} strokeWidth={i === 2 ? 5 : 3} fill="none" />
        ))}
        <path d="M0 120C200 110 380 100 600 70" stroke="#fff" strokeOpacity=".08" strokeWidth="3" fill="none" />
        <path d="M0 380C200 360 380 350 600 330" stroke="#fff" strokeOpacity=".08" strokeWidth="3" fill="none" />
        <text x="150" y="226" fill="#F0C75E" fillOpacity=".7" fontSize="13" fontFamily="Manrope, sans-serif" letterSpacing="3" transform="rotate(-3 150 226)">
          L.B. ROAD
        </text>
        <text x="535" y="250" fill="#9fd3e6" fillOpacity=".5" fontSize="11" fontFamily="Manrope, sans-serif" letterSpacing="2" transform="rotate(90 535 250)">
          BAY OF BENGAL
        </text>
      </svg>
      <span className="absolute left-[56%] top-[44%] -translate-x-1/2 -translate-y-full">
        <span className="absolute left-1/2 top-full h-6 w-6 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-gold/40 motion-reduce:hidden" />
        <span className="relative grid h-14 w-14 place-items-center rounded-full rounded-br-none border-2 border-gold bg-midnight shadow-gold [transform:rotate(45deg)]">
          <MapPin className="h-6 w-6 -rotate-45 text-gold" />
        </span>
      </span>
      <span className="absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-midnight/80 p-4 backdrop-blur-md">
        <span>
          <span className="block font-display text-xl font-semibold text-white">Mayuram Boutique</span>
          <span className="block text-xs text-white/60">Sampoorna Apartment · Thiruvanmiyur</span>
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-bold uppercase tracking-wider text-midnight transition group-hover:bg-gold-light">
          <Navigation className="h-4 w-4" /> Get Directions
        </span>
      </span>
    </a>
  )
}

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-28 overflow-hidden bg-[linear-gradient(160deg,#2A0D30_0%,#16061B_55%,#2a0f1e_100%)] py-20 md:py-28">
      <div className="relative mx-auto grid max-w-[1320px] gap-10 px-[max(16px,env(safe-area-inset-left,0px))] md:px-6 lg:grid-cols-2 lg:gap-14">
        <Reveal className="flex flex-col gap-6">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-gold">Visit · Call · WhatsApp</p>
            <h2 className="mt-3 text-balance font-display text-[clamp(2.2rem,4.6vw,3.8rem)] font-semibold leading-[1.02] text-white">
              Come and see the collection in person.
            </h2>
            <Ornament className="mt-4 h-3.5 w-44 text-gold" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {site.phones.map((p, i) => (
              <div key={p.tel} className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/50">{p.label}</p>
                <div className="flex items-center justify-between gap-2">
                  <p className="select-all font-display text-[1.75rem] font-semibold tabular-nums text-white">{p.display}</p>
                  <CopyButton text={p.display.replace(/\s/g, '')} label={p.display} />
                </div>
                <a
                  href={i === 0 ? links.call : links.callAlt}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gold transition hover:bg-gold hover:text-midnight"
                >
                  <Phone className="h-3.5 w-3.5" /> Call now
                </a>
              </div>
            ))}
          </div>

          <div className="flex gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-gold to-bronze text-midnight">
              <MapPin className="h-5 w-5" />
            </span>
            <address className="not-italic">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/50">Store address</p>
              <p className="mt-1.5 select-all leading-relaxed text-white/85">
                {site.addressLines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </p>
              <p className="mt-2 text-sm text-white/55">Contact: {site.owner}</p>
            </address>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href={links.call} className="btn-gold inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold uppercase tracking-wider">
              <Phone className="h-4 w-4" /> Call Now
            </a>
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#1f8f4e] px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[#23a359]"
            >
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp Enquiry
            </a>
            <a
              href={links.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:border-gold hover:text-gold"
            >
              <Navigation className="h-4 w-4" /> Get Directions
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
