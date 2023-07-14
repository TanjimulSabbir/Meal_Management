/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Bitter:"Bitter, serif",
        Lora:"Lora, serif",
        Lato:"Lato, sans-serif",
        Roboto:"Roboto, sans-serif"
      },
      colors:{
        Primary:"#1B4D3E"
      }
    },
  },
  plugins: [require("daisyui")]
}
