import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f1f8f6",
          100: "#dcefeb",
          200: "#b8ddd6",
          500: "#3ca58e",
          700: "#237765",
          900: "#174b41",
        },
        pet: "#FF6B6B",
        success: "#51CF66",
        warning: "#FFA94D",
        info: "#4ECDC4",
      },
      boxShadow: {
        soft: "0 20px 60px -25px rgba(15, 23, 42, 0.35)",
        elevated: "0 30px 60px rgba(35, 119, 101, 0.2)",
      },
      animation: {
        slideInUp: "slideInUp 0.5s ease-out",
        slideInDown: "slideInDown 0.4s ease-out",
        slideInRight: "slideInRight 0.4s ease-out",
        fadeIn: "fadeIn 0.4s ease-out",
        fadeOut: "fadeOut 0.3s ease-in",
        pulseSoft: "pulseSoft 2s ease-in-out infinite",
        bounce: "bounce 1s ease-in-out infinite",
      },
      keyframes: {
        slideInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      transitionDuration: {
        "350": "350ms",
      },
    },
  },
  plugins: [],
};

export default config;