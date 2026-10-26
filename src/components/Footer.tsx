import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, Check, Facebook, Instagram, MapPin, Phone, Plus, Youtube } from 'lucide-react'
import { useState } from 'react'
import { links, site } from '../config/site'
import { faqs } from '../data/content'
import { scrollToId, useShop } from '../store/shop'
import { Ornament, SectionHeading, WhatsAppIcon } from './ui'

const logo = `${import.meta.env.BASE_URL}logo.webp`

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="scroll-mt-28 bg-ivory py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-[max(16px,env(safe-area-inset-left,0px))] md:px-6">
        <SectionHeading eyebrow="Help" title="Frequently Asked Questions" tone="light" />
        <ul className="mt-10 divide-y divide-midnight/10 rounded-[28px] border border-midnight/10 bg-white px-5 sm:px-8">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <li key={f.q}>
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-[1.25rem] font-semibold text-midnight"
                  >
                    {f.q}
                    <Plus className={`h-5 w-5 shrink-0 text-bronze transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`} />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-a-${i}`}
                      role="region"
                      aria-labelledby={`faq-q-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 leading-relaxed text-midnight/70">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

function Newsletter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        if (!/^\S+@\S+\.\S+$/.test(email)) {
          setError('Enter an email address like name@example.com')
          return
        }
        setError('')
        setDone(true)
      }}
      className="flex flex-col gap-3"
    >
      <AnimatePresence mode="wait">
        {done ? (
          <motion.p key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2 rounded-2xl border border-gold/40 bg-gold/10 p-4 text-sm text-gold-light" role="status">
            <Check className="mt-0.5 h-4 w-4 shrink-0" />
            Thank you! {email} is on the list for new arrivals and festive edits. (Demo: no email is sent.)
          </motion.p>
        ) : (
          <motion.div key="form" className="flex flex-col gap-2" exit={{ opacity: 0 }}>
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <div className="flex overflow-hidden rounded-full border border-white/15 bg-white/[0.05] focus-within:border-gold">
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                aria-invalid={!!error}
                aria-describedby={error ? 'newsletter-error' : undefined}
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none"
              />
              <button type="submit" className="m-1 rounded-full bg-gold px-4 text-xs font-bold uppercase tracking-wider text-midnight transition hover:bg-gold-light">
                Subscribe
              </button>
            </div>
            {error && (
              <p id="newsletter-error" className="text-xs text-[#f3a6a6]">
                {error}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}

export function Footer() {
  const { goTo } = useShop()
  const quick = [
    { label: 'Home', t: { section: 'top' } },
    { label: 'Sarees', t: { filter: 'silk' } },
    { label: 'Boutique Products', t: { filter: 'blouses' } },
    { label: 'Custom Stitching', t: { section: 'services' } },
    { label: 'New Arrivals', t: { filter: 'new' } },
    { label: 'Testimonials', t: { section: 'testimonials' } },
  ]
  const social = [
    { href: site.social.instagram, label: 'Instagram', Icon: Instagram },
    { href: site.social.facebook, label: 'Facebook', Icon: Facebook },
    { href: site.social.youtube, label: 'YouTube', Icon: Youtube },
  ].filter((s) => s.href)
  const linkCls = 'text-sm text-white/65 transition hover:text-gold'

  return (
    <footer className="relative bg-midnight pb-[max(28px,env(safe-area-inset-bottom,0px))] pt-16 text-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      <div className="mx-auto grid max-w-[1320px] gap-10 px-[max(16px,env(safe-area-inset-left,0px))] sm:grid-cols-2 md:px-6 lg:grid-cols-[1.4fr_0.9fr_1fr_1.3fr_1.2fr]">
        <div className="flex flex-col gap-4">
          <img src={logo} alt="Mayuram Boutique" width={640} height={243} loading="lazy" className="h-20 w-auto self-start" />
          <p className="font-display text-xl italic text-gold-light">{site.tagline}</p>
          <p className="text-sm text-white/55">{site.services.join(' · ')}</p>
          {social.length > 0 && (
            <div className="flex gap-2">
              {social.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-midnight">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </div>
        <nav aria-label="Quick links" className="flex flex-col gap-3">
          <p className="font-display text-lg font-semibold text-gold">Quick Links</p>
          {quick.map((q) => (
            <button key={q.label} type="button" onClick={() => goTo(q.t)} className={`${linkCls} text-left`}>
              {q.label}
            </button>
          ))}
        </nav>
        <div className="flex flex-col gap-3">
          <p className="font-display text-lg font-semibold text-gold">Customer Assistance</p>
          <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className={linkCls}>
            WhatsApp Enquiry
          </a>
          <a href={links.call} className={linkCls}>
            Call Boutique
          </a>
          <a href={links.directions} target="_blank" rel="noopener noreferrer" className={linkCls}>
            Visit Our Store
          </a>
          <button type="button" onClick={() => scrollToId('faq')} className={`${linkCls} text-left`}>
            Frequently Asked Questions
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-display text-lg font-semibold text-gold">Newsletter</p>
          <p className="text-sm text-white/60">New arrivals, festive edits and bridal previews.</p>
          <Newsletter />
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-display text-lg font-semibold text-gold">Contact</p>
          {site.phones.map((p, i) => (
            <a key={p.tel} href={i ? links.callAlt : links.call} className={`${linkCls} flex items-center gap-2 tabular-nums`}>
              <Phone className="h-4 w-4 text-gold" /> {p.display}
            </a>
          ))}
          <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className={`${linkCls} flex items-center gap-2`}>
            <WhatsAppIcon className="h-4 w-4 text-gold" /> WhatsApp {site.phones[0].display}
          </a>
          <p className="flex gap-2 text-sm leading-relaxed text-white/65">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
            <span>{site.addressLines.join(' ')}</span>
          </p>
          <a href={links.directions} target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex w-fit items-center gap-2 rounded-full border border-gold/50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-gold transition hover:bg-gold hover:text-midnight">
            Directions
          </a>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-[1320px] flex-col items-center gap-4 px-[max(16px,env(safe-area-inset-left,0px))] md:px-6">
        <Ornament className="h-3.5 w-52 text-gold/60" />
        <div className="flex w-full flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row">
          <p>© 2026 Mayuram Boutique. All Rights Reserved.</p>
          <p>Product images, prices and reviews on this page are demonstration content.</p>
          <button type="button" onClick={() => scrollToId('top')} className="inline-flex items-center gap-1.5 text-white/60 hover:text-gold">
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
