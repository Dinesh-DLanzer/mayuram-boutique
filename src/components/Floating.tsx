import { motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { links } from '../config/site'
import { WhatsAppIcon } from './ui'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[90] h-[3px] origin-left bg-gradient-to-r from-bronze via-gold to-gold-light"
    />
  )
}

export function FloatingWhatsApp() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const on = () => setShow(window.scrollY > 400)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return (
    <motion.a
      href={links.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Mayuram Boutique on WhatsApp"
      initial={false}
      animate={{ scale: show ? 1 : 0.6, opacity: show ? 1 : 0, y: show ? 0 : 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      style={{ pointerEvents: show ? 'auto' : 'none' }}
      className="group fixed bottom-[calc(20px+env(safe-area-inset-bottom,0px))] right-[max(16px,env(safe-area-inset-right,0px))] z-[65] flex items-center gap-2 rounded-full bg-[#1f8f4e] p-3.5 text-white shadow-[0_14px_40px_-10px_rgba(31,143,78,.8)] ring-2 ring-gold/60 transition-colors hover:bg-[#23a359]"
      tabIndex={show ? 0 : -1}
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#1f8f4e]/40 motion-reduce:hidden [animation-duration:2.6s]" />
      <WhatsAppIcon className="h-6 w-6" />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-500 group-hover:max-w-[160px] sm:inline">
        Chat with us
      </span>
    </motion.a>
  )
}
