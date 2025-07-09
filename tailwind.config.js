/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/styles/**/*.{css}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#FFFFFF',
      },
      fontFamily: {
        alien: ['"Star"', 'sans-serif'],
        alienBold: ['"StarBold"', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};