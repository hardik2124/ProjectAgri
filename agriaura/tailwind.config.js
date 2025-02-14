/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // "./node_modules/flyonui/dist/js/*.js"
  ],
  theme: {
    extend: {
      colors: {
        richblack: {
          400:"#4A4A4A",
          500:"#3A3A3A",
          800: "#2B2B2B",
          900: "#1A1A1A",
          5: "#FFFFFF",
          200: "#D1D1D1",
        },
      },
    },
    flyonui: {
      themes: ["soft"]
    }
  },
  plugins: [
    // require("flyonui"),
    // require("flyonui/plugin") // Require only if you want to use FlyonUI JS component
  ]
}

