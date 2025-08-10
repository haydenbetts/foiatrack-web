import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0B0C10",
          soft: "#0F1117",
          card: "#11131A",
          ring: "#5B8CFF"
        },
        text: {
          DEFAULT: "#E6E8EF",
          soft: "#B7BCCD",
          muted: "#8C93A7"
        },
        brand: {
          DEFAULT: "#7C5CFF",
          hover: "#6B4BEB",
          subtle: "#E9E5FF"
        },
        success: "#22C55E",
        warn: "#F59E0B",
        danger: "#EF4444"
      },
      borderRadius: {
        xl: "16px",
        "2xl": "24px"
      },
      boxShadow: {
        card: "0 6px 30px rgba(0,0,0,0.22)"
      }
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
} satisfies Config;
