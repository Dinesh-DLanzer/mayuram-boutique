/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: { DEFAULT: '#16061B', 800: '#1E0A25', 700: '#2A0D30' },
        plum: { DEFAULT: '#5A254E', light: '#7A3A6A' },
        gold: { DEFAULT: '#DBA01C', light: '#F0C75E', pale: '#F6E2A8' },
        bronze: '#965C22',
        cocoa: '#562A23',
        ivory: { DEFAULT: '#F7F3EA', deep: '#EFE6D4' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 0 0 1px rgba(219,160,28,.55), 0 10px 40px -12px rgba(219,160,28,.45)',
        card: '0 18px 50px -24px rgba(22,6,27,.55)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        sweep: { '0%': { transform: 'translateX(-120%) skewX(-18deg)' }, '60%,100%': { transform: 'translateX(320%) skewX(-18deg)' } },
        float: { '0%,100%': { transform: 'translateY(0) rotate(var(--r,0deg))' }, '50%': { transform: 'translateY(-14px) rotate(var(--r,0deg))' } },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        sweep: 'sweep 6s ease-in-out infinite',
        float: 'float 9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
