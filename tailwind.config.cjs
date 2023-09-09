/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ["./src/**/*.{js, ts, jsx, tsx, html}"],
  content: ["./src/**/*.{jsx,js,ts,tsx,html,css}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
