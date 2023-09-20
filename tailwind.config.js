/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily : {
        "space" : ["space","sans"],
        "space1" : ["space1","sans"]

      },
      screens : {
        "xs" : "440px",
        "ms" : "950px"
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    base: false,
    darkTheme: "light"
  }
}

