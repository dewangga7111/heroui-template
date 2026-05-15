/** @type {import('tailwindcss').Config} */
const config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      screens: {
        '3xl': '1920px',
        '4xl': '2560px',
        '5xl': '3840px'
      }
    },
  },
  darkMode: "class",
}

module.exports = config
