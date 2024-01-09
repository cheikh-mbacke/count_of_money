/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        neon: '#32cd32', // Ajoutez votre couleur néon ici
      },
      boxShadow: {
        'neon': '0 0 10px #32cd32, 0 0 20px #32cd32, 0 0 30px #32cd32', // Ombre portée néon
      },
    },
  },
  plugins: [],
}
