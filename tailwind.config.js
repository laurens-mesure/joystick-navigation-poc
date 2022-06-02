/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "media",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ["Raleway", ...defaultTheme.fontFamily.sans],
        cormorant: ["Cormorant Garamond", ...defaultTheme.fontFamily.sans],
        luxurious: ["Luxurious Script", ...defaultTheme.fontFamily.sans],
        zen: ["Zen Kurenaido", ...defaultTheme.fontFamily.sans],
        nycd: ["Nothing You Could Do", ...defaultTheme.fontFamily.sans],
      },
      backgroundColor: {
        primary: "#007AFF",
      },
      textColor: {
        primary: "#007AFF",
      },
    },
  },
  plugins: [],
};
