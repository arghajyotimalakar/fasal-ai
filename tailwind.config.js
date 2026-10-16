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
        'fasal-green': '#16a34a',
        'fasal-dark': '#14532d',
        'fasal-light': '#f0fdf4',
        'fasal-amber': '#d97706',
        'fasal-red': '#dc2626',
      },
    },
  },
  plugins: [],
};
