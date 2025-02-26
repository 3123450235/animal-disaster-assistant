/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBlue: {
          100: "#E6F3FF",
          200: "#BFDEFF",
          300: "#99C9FF",
          400: "#73B4FF",
          500: "#4D9FFF",
          600: "#268AFF",
          700: "#0075FF",
          800: "#0060D1",
          900: "#004BA3",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
