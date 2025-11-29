/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#1A428A',
          DEFAULT: '#1A428A',
          light: '#2d5aa0',
          lighter: '#3f6db5',
        },
        accent: {
          DEFAULT: '#dc2626',
          light: '#ff8c5a',
          dark: '#e55a2b',
        },
        mpesa: {
          DEFAULT: '#00A651',
          dark: '#007A3D',
          light: '#00C853',
        },
        google: {
          blue: '#4285F4',
          red: '#EA4335',
          yellow: '#FBBC05',
          green: '#34A853',
        },
        gold: {
          DEFAULT: '#dc2626',
          light: '#e5c158',
        },
        islamic: {
          green: '#006b3c',
          blue: '#1A428A',
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

