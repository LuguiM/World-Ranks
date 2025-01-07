/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color1': '#1B1D1F',
        'color2': '#282B30',
        'color3': '#4E80EE',
        'color4': '#6C727F',
        'color5': '#D2D5DA'
      },
    },
  },
  plugins: [],
}