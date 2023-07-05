/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        jetbrains: ['var(--font-jetbrains-mono)'],
      },
      colors: {
        'ub-purple': {
          100: '#F5E0F6',
          200: '#EBC0EC',
          300: '#E2A0E3',
          400: '#D981DA',
          500: '#CF61D1',
          600: '#C641C8',
          700: '#AC32AE',
          800: '#8D298F',
        },
        'ub-yellow': {
          50: '#FFFAEB',
          100: '#FFF4D6',
          200: '#FFE9AE',
          300: '#FEDE85',
          400: '#FED35D',
          500: '#FEC72D',
        },
      },
      boxShadow: {
        base: '-4px 4px black',
      },
    },
  },
  plugins: [],
};
