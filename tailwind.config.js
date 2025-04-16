/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Helvetica", "sans-serif"],
        secondary: ["Helvetica Oblique", "sans-serif"],
        tertiary: ["Helvetica Compressed", "sans-serif"],
        quaternary: ["Helvetica Rounded Bold", "sans-serif"],
        quinary: ["Helvetica Bold Oblique", "sans-serif"],
        senary: ["Helvetica Light", "sans-serif"],
      },
    },
  },
  plugins: [],
};
