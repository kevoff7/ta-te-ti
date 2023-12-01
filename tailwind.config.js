/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        body: "#222222",
        "gray-12": "#EEEEEE",
      },
    },
  },
  plugins: [],
};
