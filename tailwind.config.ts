import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#1a1a2e',
          accent: '#e94560',
          secondary: '#16213e',
          highlight: '#f5a623',
        },
        success: '#27ae60',
        warning: '#f39c12',
        danger: '#e74c3c',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Syne', 'sans-serif'],
        body: ['var(--font-body)', 'DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
