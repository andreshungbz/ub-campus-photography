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
        'ub-purple': '#8D298F',
        'ub-yellow': '#FEC72D',
      },
    },
  },
  plugins: [],
};
