/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/react/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      /* =======================
         FONTES
      ======================= */
      fontFamily: {
        zalando: ['"Zalando Sans Expanded"', "sans-serif"],
        space: ['"Special Gothic Expanded One"', "sans-serif"],
        number: ['"Chivo"', "sans-serif"],
      },

      /* =======================
         CORES
      ======================= */
      colors: {
        primaria: "#ffbb00",
        secundaria: "#03664E",
        terciaria: "#030303",
        vermelho: "#fb0c06",
      },

      /* =======================
         ANIMAÇÃO NEON
      ======================= */
      animation: {
        neonMove: "neonMove 6s ease infinite",
      },

      keyframes: {
        neonMove: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },

  plugins: [],
};
