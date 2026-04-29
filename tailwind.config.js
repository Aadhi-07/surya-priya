/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#000000',
        ink: '#fdfaf6',
        gold: '#d4af37',
        'gold-dim': '#a88920',
        champagne: '#f7e7ce',
        vellum: '#f5efe6',
      },
      fontFamily: {
        bodoni: ['var(--font-bodoni)', 'serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
        inter: ['var(--font-inter)', 'sans-serif'],
        'great-vibes': ['var(--font-great-vibes)', 'cursive'],
      },
      animation: {
        'grain': 'grain 8s steps(10) infinite',
        'bob': 'bob 7s ease-in-out infinite',
        'bob-slow': 'bob 9s ease-in-out infinite',
        'bob-slower': 'bob 11s ease-in-out infinite',
        'ping-soft': 'ping 2s cubic-bezier(0,0,0.2,1) infinite',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
