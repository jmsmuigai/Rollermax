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
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'],
      },
      colors: {
        'roller-blue': '#0D47A1',
        'roller-red': '#E53935',
        'roller-dark': '#0b1220',
        dark: '#1a1a1a',
        light: '#fbfbfb',
        primary: '#0D47A1', // roller-blue
        secondary: '#1a1a1a', // dark
        accent: '#fbfbfb', // light
        'mpesa-green': '#005940',
        'islamic-border': '#c5b358' // Gold-like color for borders
      },
      gradientColorStops: theme => ({
        ...theme('colors'),
        'roller-gradient-start': '#0D47A1',
        'roller-gradient-end': '#E53935',
      }),
      boxShadow: {
        '3d': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'float': '0 10px 40px -10px rgba(0, 74, 153, 0.2)',
      },
      backgroundImage: {
        'islamic-pattern':
          "url(\"data:image/svg+xml,%3Csvg width='84' height='48' viewBox='0 0 84 48' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h12v6H0V0zm24 0h12v6H24V0zm48 0h12v6H72V0zm-48 24h12v6H24v-6zm24 0h12v6H48v-6zm24 0h12v6H72v-6zM12 12h12v6H12v-6zm24 0h12v6H36v-6zm24 0h12v6H60v-6zm-36 24h12v6H24v-6zm24 0h12v6H48v-6z' fill='%230D47A1' fill-opacity='0.04' fill-rule='evenodd'/%3E%3C/svg%3E\")",
        'islamic-pattern-2':
          "url(\"data:image/svg+xml,%3Csvg width='52' height='52' viewBox='0 0 52 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230D47A1' fill-opacity='0.05'%3E%3Cpath d='M10 10h32v32H10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}