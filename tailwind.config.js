/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#070A12",
        panel: "#0B1020",
        neonCyan: "#2EEBFF",
        neonViolet: "#A78BFA",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(34,211,238,.25), 0 0 35px rgba(34,211,238,.18)",
        glow2: "0 0 0 1px rgba(167,139,250,.22), 0 0 40px rgba(167,139,250,.16)",
      },
    },
  },
  plugins: [],
};

