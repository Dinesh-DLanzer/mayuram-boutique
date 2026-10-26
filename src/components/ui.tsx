import { motion } from 'framer-motion'
import type { CSSProperties, ReactNode, SVGProps } from 'react'
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

/** Gold scroll-work divider, after the ornaments on the boutique's poster. */
export function Ornament({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 18" className={className} aria-hidden="true" fill="none">
      <path d="M0 9h78M142 9h78" stroke="currentColor" strokeWidth="1" />
      <path
        d="M80 9c6-6 12-6 16 0-4 6-10 6-16 0Zm60 0c-6-6-12-6-16 0 4 6 10 6 16 0Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M110 1.5 116 9l-6 7.5L104 9z" fill="currentColor" />
      <circle cx="98" cy="9" r="1.6" fill="currentColor" />
      <circle cx="122" cy="9" r="1.6" fill="currentColor" />
    </svg>
  )
}

/** Stylised peacock-feather eye used as a quiet background motif. */
export function Feather({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 260" className={className} style={style} aria-hidden="true">
      <path d="M60 255C58 180 57 120 60 30" stroke="#DBA01C" strokeWidth="1.4" fill="none" opacity=".8" />
      {Array.from({ length: 22 }).map((_, i) => {
        const y = 60 + i * 8.5
        const w = 46 - Math.abs(i - 6) * 1.6
        return (
          <g key={i} opacity={0.55 - i * 0.018}>
            <path d={`M60 ${y}c-${w * 0.5} -6 -${w} -2 -${w} 6`} stroke="#2a8a6a" strokeWidth=".8" fill="none" />
            <path d={`M60 ${y}c${w * 0.5} -6 ${w} -2 ${w} 6`} stroke="#2a8a6a" strokeWidth=".8" fill="none" />
          </g>
        )
      })}
      <ellipse cx="60" cy="62" rx="30" ry="40" fill="#1d6b4f" opacity=".55" />
      <ellipse cx="60" cy="64" rx="22" ry="30" fill="#DBA01C" opacity=".75" />
      <ellipse cx="60" cy="66" rx="15" ry="21" fill="#0e7088" />
      <ellipse cx="60" cy="69" rx="9" ry="13" fill="#0b2a5a" />
      <ellipse cx="57" cy="64" rx="3" ry="4" fill="#5fd0d8" opacity=".6" />
    </svg>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  tone = 'dark',
  align = 'center',
  children,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
  tone?: 'dark' | 'light'
  align?: 'center' | 'left'
  children?: ReactNode
}) {
  const light = tone === 'light'
  return (
    <div className={`flex flex-col gap-3 ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
      {eyebrow && (
        <p className={`text-[0.72rem] font-semibold uppercase tracking-[0.28em] ${light ? 'text-bronze' : 'text-gold'}`}>
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-balance font-display text-[clamp(2rem,4.2vw,3.4rem)] font-semibold leading-[1.05] ${
          light ? 'text-midnight' : 'text-white'
        }`}
      >
        {title}
      </h2>
      <Ornament className={`h-3.5 w-44 ${light ? 'text-bronze' : 'text-gold'}`} />
      {subtitle && (
        <p className={`max-w-xl text-pretty text-base leading-relaxed ${light ? 'text-midnight/70' : 'text-white/70'}`}>
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
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
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
