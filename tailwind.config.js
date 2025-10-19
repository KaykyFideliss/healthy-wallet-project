/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
   theme: {
    extend: {
      fontFamily: {
        zalando: ['"Zalando Sans Expanded"', 'sans-serif'],
        space:['"Special Gothic Expanded One"','sans-serif'],
      },
      colors: {
        "primaria": "#ffbb00", 
        "secundaria": "#03664E", // nome customizado
        "terciaria": "#151515", // nome customizado
        "vermelho": "#fb0c06", // nome customizado
        
      },
  },
  plugins: [],
   }
  }
