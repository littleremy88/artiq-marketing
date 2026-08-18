/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#1C1C1A",
        ivory: "#F3EBDD",
        gold: "#B89A5A",
        "gold-soft": "#C9B07A",
        "charcoal-deep": "#121211",
        "charcoal-lift": "#2A2A27",
      },
      fontFamily: {
        // Bodoni Moda — Vogue-style Didone used for the Artiq wordmark
        brand: ['"Bodoni Moda"', "Didot", "Georgia", "serif"],
        display: ['"Bodoni Moda"', "Didot", "Georgia", "serif"],
        sans: ['"Bodoni Moda"', "Didot", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
