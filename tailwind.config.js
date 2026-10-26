/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: { DEFAULT: '#16061B', 900: '#0F0413', 800: '#1E0A25', 700: '#2A0D30' },
        plum: { DEFAULT: '#5A254E', light: '#7A3A6A' },
        gold: { DEFAULT: '#DBA01C', light: '#F0C75E', pale: '#F6E2A8' },
        bronze: '#8A5418',
        cocoa: '#562A23',
        // peacock from the logo: the one secondary colour
        peacock: { DEFAULT: '#0E5E66', light: '#3E9AA0' },
        ivory: { DEFAULT: '#F7F3EA', deep: '#EFE6D4', paper: '#FFFDF8' },
      },
      fontFamily: {
        display: ['"Brygada 1918"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        card: '0 18px 50px -24px rgba(22,6,27,.55)',
        lift: '0 30px 60px -30px rgba(22,6,27,.75)',
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        sway: { '0%,100%': { transform: 'rotate(-3deg)' }, '50%': { transform: 'rotate(2deg)' } },
      },
      animation: {
        marquee: 'marquee 48s linear infinite',
        sway: 'sway 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
