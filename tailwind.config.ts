import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neu: {
          base: "var(--neu-base)",
          card: "var(--neu-base)",
          text: "var(--foreground)",
          muted: "var(--neu-muted)",
          accent: "#10b981", // Emerald yield
          stellar: "#6366f1", // Indigo/Stellar
          bolivia: "#f97316", // Andes terracotta / amber
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        neu: "8px 8px 18px var(--neu-shadow-dark), -8px -8px 18px var(--neu-shadow-light)",
        "neu-sm": "4px 4px 10px var(--neu-shadow-dark), -4px -4px 10px var(--neu-shadow-light)",
        "neu-lg": "14px 14px 28px var(--neu-shadow-dark), -14px -14px 28px var(--neu-shadow-light)",
        "neu-inset": "inset 4px 4px 8px var(--neu-inset-dark), inset -4px -4px 8px var(--neu-inset-light)",
        "neu-inset-sm": "inset 2px 2px 5px var(--neu-inset-dark), inset -2px -2px 5px var(--neu-inset-light)",
        "neu-inset-deep": "inset 6px 6px 12px var(--neu-inset-dark), inset -6px -6px 12px var(--neu-inset-light)",
        "neu-glow": "0 0 20px rgba(16, 185, 129, 0.35), 6px 6px 14px var(--neu-shadow-dark), -6px -6px 14px var(--neu-shadow-light)",
        "neu-amber": "0 0 16px rgba(234, 88, 12, 0.25), 6px 6px 14px var(--neu-shadow-dark), -6px -6px 14px var(--neu-shadow-light)",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
        "4xl": "2.25rem",
      },
    },
  },
  plugins: [],
};
export default config;
