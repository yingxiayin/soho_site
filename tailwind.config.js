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
          50: '#faf8f5',
          100: '#f5ede3',
          200: '#e8d5c4',
          300: '#d4b896',
          400: '#c19a6b',
          500: '#8b6f47',
          600: '#6b5438',
          700: '#5a4630',
          800: '#4a3a28',
          900: '#3a2e20',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
