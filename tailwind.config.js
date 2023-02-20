/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
    './public/index.html'
  ],
  theme: {
    fontFamily: {
      title: ["Alegreya", "serif"],
      body: ["PT\\ Sans", "sans-serif"]
    },
    extend: {},
  },
  plugins: [],
}
