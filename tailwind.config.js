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
        primary: {
          dark: '#0d1b2a',
          DEFAULT: '#1a1a2e',
          light: '#16213e',
        },
        accent: {
          DEFAULT: '#ff6b35',
          light: '#ff8c5a',
          dark: '#e55a2b',
        },
        gold: {
          DEFAULT: '#d4af37',
          light: '#e5c158',
        },
        islamic: {
          green: '#006b3c',
          blue: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'geometric-pattern': 'radial-gradient(circle at 20% 50%, rgba(255, 107, 53, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(29, 78, 216, 0.1) 0%, transparent 50%)',
        'islamic-pattern': 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 107, 53, 0.03) 10px, rgba(255, 107, 53, 0.03) 20px)',
      },
    },
  },
  plugins: [],
}

