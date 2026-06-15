import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: "#D63C6B",
        teal: "#14B8A6",
        indigo: "#6366F1",
        amber: "#F59E0B",
        surface: "#111827",
        card: "#1E293B",
        success: "#22C55E",
        muted: "#CBD5E1",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #D63C6B, #6366F1)",
        "teal-gradient": "linear-gradient(135deg, #14B8A6, #6366F1)",
        "dark-radial":
          "radial-gradient(ellipse at 50% 0%, rgba(214,60,107,0.08) 0%, transparent 70%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "count-up": "countUp 2s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        countUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
