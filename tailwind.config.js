/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        prison: {
          950: '#07090b',
          900: '#0e1317',
          850: '#131920',
          800: '#1b232c',
          700: '#283340',
          600: '#3d4c5e',
          500: '#64748b',
          400: '#94a3b8',
          100: '#f1f5f9',
          gold: {
            DEFAULT: '#f59e0b',
            light: '#fbbf24',
            dark: '#d97706',
            hover: '#b45309'
          },
          orange: {
            DEFAULT: '#ea580c',
            light: '#f97316',
            dark: '#c2410c'
          },
          red: {
            DEFAULT: '#e11d48',
            light: '#f43f5e',
            dark: '#be123c'
          }
        }
      },
      fontFamily: {
        display: ['"Oswald"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        stencil: ['"Impact"', '"Oswald"', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 25px -5px rgba(245, 158, 11, 0.35)',
        'glow-orange': '0 0 25px -5px rgba(234, 88, 12, 0.4)',
        'glow-neon': '0 0 35px -5px rgba(56, 189, 248, 0.35)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.8)',
      },
      backgroundImage: {
        'hazard-stripes': 'repeating-linear-gradient(45deg, #f59e0b, #f59e0b 15px, #11161b 15px, #11161b 30px)',
        'prison-bars': 'repeating-linear-gradient(90deg, rgba(255,255,255,0.03), rgba(255,255,255,0.03) 2px, transparent 2px, transparent 40px)',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: 1 },
          '41.99%': { opacity: 1 },
          '42%': { opacity: 0.3 },
          '43%': { opacity: 1 },
          '45%': { opacity: 0.2 },
          '46%': { opacity: 1 },
        }
      },
      animation: {
        'neon-flicker': 'flicker 5s infinite',
      }
    },
  },
  plugins: [],
}
