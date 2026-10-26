import { motion, useReducedMotion } from 'framer-motion'
import { useId, useLayoutEffect, useRef, useState, type ReactNode, type SVGProps } from 'react'
import { img, srcSet } from '../config/site'

export function Img({
  name,
  alt,
  sizes = '(max-width: 640px) 50vw, 360px',
  className = '',
  eager = false,
  full = 720,
}: {
  name: string
  alt: string
  sizes?: string
  className?: string
  eager?: boolean
  full?: number
}) {
  return (
    <img
      src={img(name)}
      srcSet={srcSet(name, full)}
      sizes={sizes}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
    />
  )
}

const silk = [0.22, 1, 0.36, 1] as const

/** A gold running stitch that sews itself in, left to right, when it scrolls into view. */
export function StitchLine({ className = '', tone = 'gold', delay = 0 }: { className?: string; tone?: 'gold' | 'bronze'; delay?: number }) {
  return (
    <motion.svg
      aria-hidden="true"
      className={`block h-[2px] overflow-visible ${tone === 'gold' ? 'text-gold' : 'text-bronze'} ${className}`}
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 1.2, delay, ease: silk }}
    >
      <line x1="0" y1="1" x2="100%" y2="1" stroke="currentColor" strokeWidth="1.5" strokeDasharray="7 5" strokeLinecap="round" />
    </motion.svg>
  )
}

/** Dashed arch outline that is stitched from bottom-left, over the top, down the right. `drawKey` re-stitches it. */
export function ArchStitch({ drawKey, className = '' }: { drawKey?: string | number; className?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const id = useId().replace(/:/g, '')
  const reduce = useReducedMotion()

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const { w, h } = size
  const p = 1
  // same proportions as .arch-top: horizontal radius 50%, vertical radius 40%
  const rx = w / 2 - p
  const ry = h * 0.4 - p
  const d = w ? `M${p} ${h - p}V${ry + p}A${rx} ${ry} 0 0 1 ${w - p} ${ry + p}V${h - p}` : ''

  return (
    <svg ref={ref} aria-hidden="true" className={`pointer-events-none overflow-visible ${className}`} width="100%" height="100%" fill="none">
      {d && (
        <>
          <mask id={id} maskUnits="userSpaceOnUse">
            <motion.path
              key={drawKey}
              d={d}
              stroke="#fff"
              strokeWidth="8"
              initial={{ pathLength: reduce ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.4, ease: [0.65, 0, 0.35, 1] }}
            />
          </mask>
          <path d={d} mask={`url(#${id})`} stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 6" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}

export function SectionHeading({
  title,
  subtitle,
  tone = 'dark',
  align = 'center',
  children,
}: {
  title: ReactNode
  subtitle?: string
  tone?: 'dark' | 'light'
  align?: 'center' | 'left'
  children?: ReactNode
}) {
  const light = tone === 'light'
  return (
    <div className={`flex flex-col gap-4 ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
      <h2
        className={`max-w-[18ch] font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-normal leading-[1.04] ${
          light ? 'text-midnight' : 'text-white'
        }`}
      >
        {title}
      </h2>
      <StitchLine className="w-24" tone={light ? 'bronze' : 'gold'} />
      {subtitle && (
        <p className={`max-w-xl text-pretty text-[1.02rem] leading-relaxed ${light ? 'text-midnight/70' : 'text-white/70'}`}>
          {subtitle}
        </p>
      )}
      {children}
    </div>
  )
}

export function Reveal({
  children,
  delay = 0,
  className = '',
  y = 26,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.8, delay, ease: silk }}
    >
      {children}
    </motion.div>
  )
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.58-.09 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.23 9.43-9.44 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.6l6.01-1.58a11.3 11.3 0 0 0 5.43 1.38h.01c6.25 0 11.34-5.08 11.35-11.34 0-3.03-1.18-5.88-3.32-8.02" />
    </svg>
  )
}

export function Stars({ value, className = '' }: { value: number; className?: string }) {
  return (
    <div className={`flex gap-0.5 ${className}`} aria-label={`${value} out of 5 stars`} role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
          <path
            d="m10 1.6 2.6 5.4 5.9.8-4.3 4.1 1 5.9L10 15l-5.2 2.8 1-5.9L1.5 7.8l5.9-.8z"
            fill={i < value ? '#DBA01C' : 'none'}
            stroke="#DBA01C"
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  )
}
