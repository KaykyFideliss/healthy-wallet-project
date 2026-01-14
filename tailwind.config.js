/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/react/**/*.{js,ts,jsx,tsx}"
  ],
   theme: {
    extend: {
      fontFamily: {
        zalando: ['"Zalando Sans Expanded"', 'sans-serif'],
        space:['"Special Gothic Expanded One"','sans-serif'],
        number: ['"Chivo"', 'sans-serif'],
      },
      colors: {
        "primaria": "#ffbb00", 
        "secundaria": "#03664E", // nome customizado
        "terciaria": "#030303", // nome customizado
        "vermelho": "#fb0c06", // nome customizado
        
      },
  },
  plugins: [],
   }
  }
