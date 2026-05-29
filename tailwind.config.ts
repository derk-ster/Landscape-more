import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sage: {
          50: "#f4f7f4",
          100: "#e8efe8",
          200: "#d4e4d4",
          300: "#b5d0b5",
          400: "#8fb58f",
          500: "#6d9a6d",
          600: "#557d55",
          700: "#456445",
          800: "#3a513a",
          900: "#314431",
        },
        cream: {
          50: "#fdfcf9",
          100: "#f9f6f0",
          200: "#f3ede3",
        },
        terracotta: {
          400: "#c4846a",
          500: "#b06f54",
        },
        gold: {
          400: "#c9a962",
          500: "#b8944d",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        soft: "0 4px 24px -4px rgba(69, 100, 69, 0.12)",
        glow: "0 0 40px rgba(109, 154, 109, 0.25)",
        card: "0 8px 32px -8px rgba(55, 81, 55, 0.1)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "float-slow": "float 8s ease-in-out 1s infinite",
        shimmer: "shimmer 2.5s ease-in-out infinite",
        glow: "glow 4s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        glow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.7" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
