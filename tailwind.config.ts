import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f1f8f6",
          100: "#dcefeb",
          500: "#3ca58e",
          700: "#237765",
          900: "#174b41"
        }
      },
      boxShadow: {
        soft: "0 20px 60px -25px rgba(15, 23, 42, 0.35)"
      }
    },
  },
  plugins: [],
};
export default config;
