import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neu: {
          base: "#e9edf3",
          light: "#ffffff",
          dark: "#b8c3d0",
          pressed: "#d9e1eb",
          accent: "#10b981", // Emerald yield
          stellar: "#4f46e5", // Indigo/Stellar
          bolivia: "#ea580c", // Andes terracotta / amber
          text: "#1e293b",
          muted: "#64748b",
          card: "#e9edf3",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        neu: "8px 8px 18px #c8d1dc, -8px -8px 18px #ffffff",
        "neu-sm": "4px 4px 10px #c8d1dc, -4px -4px 10px #ffffff",
        "neu-lg": "14px 14px 28px #c4cdd8, -14px -14px 28px #ffffff",
        "neu-inset": "inset 4px 4px 8px #c8d1dc, inset -4px -4px 8px #ffffff",
        "neu-inset-sm": "inset 2px 2px 5px #c8d1dc, inset -2px -2px 5px #ffffff",
        "neu-inset-deep": "inset 6px 6px 12px #b4becb, inset -6px -6px 12px #ffffff",
        "neu-glow": "0 0 20px rgba(16, 185, 129, 0.35), 6px 6px 14px #c8d1dc, -6px -6px 14px #ffffff",
        "neu-amber": "0 0 16px rgba(234, 88, 12, 0.25), 6px 6px 14px #c8d1dc, -6px -6px 14px #ffffff",
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
