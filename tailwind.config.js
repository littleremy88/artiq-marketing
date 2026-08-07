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
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
