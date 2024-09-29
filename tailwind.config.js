/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: '#FFD700', // Custom gold color
        darkBlue: '#003366', // Dark blue color
        darkerBlue: '#002244' // Slightly darker blue color
      },
    },
  },
  plugins: [
    require('daisyui')
  ],
}
