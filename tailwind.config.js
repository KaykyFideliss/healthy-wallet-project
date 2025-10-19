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
        "terciaria": "#0a0310", // nome customizado
        "vermelho": "#fb0c06", // nome customizado
        
      },
       animation: {
        marquee: 'marquee 10s linear infinite',
      },
       keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
    },
  },
  plugins: [],
   }
  }
