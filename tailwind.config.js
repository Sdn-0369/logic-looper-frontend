/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
  extend: {
    fontFamily: {
      primary: ["Poppins", "sans-serif"],
      secondary: ["Open Sans", "sans-serif"]
    },
    colors: {
      brand: {
        dark: "#222222",
        primary: "#414BEA",
        light: "#D9E2FF",
        accent: "#7752FE",
        gray: "#F6F5F5"
      }
    }
  }
},
  plugins: [],
}