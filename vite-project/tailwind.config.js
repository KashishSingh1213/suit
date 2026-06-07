/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#111111',
          mid: '#111111',
          soft: '#111111',
        },
        ivory: {
          DEFAULT: '#FAF9F6',
          soft: '#E8DDD0',
          dim: '#E8DDD0',
        },
        gold: {
          DEFAULT: '#BCA58A',
          light: '#BCA58A',
          dark: '#BCA58A',
        },
        crimson: '#BCA58A',
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", 'serif'],
        body: ["'DM Sans'", 'sans-serif'],
        script: ["'Great Vibes'", 'cursive'],
      },
      boxShadow: {
        premium: '0 20px 60px rgba(0,0,0,0.25)',
        'premium-lg': '0 40px 100px rgba(0,0,0,0.35)',
        gold: '0 0 40px rgba(201,169,110,0.15)',
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-in-out',
        slideUp: 'slideUp 0.8s ease-out',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(30px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        float: { '0%, 100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-20px)' } },
      },
    },
  },
  plugins: [],
}
