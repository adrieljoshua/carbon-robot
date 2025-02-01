import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        archivo: ['var(--font-archivo)', 'sans-serif'],
        vt323: ['var(--font-vt323)', 'monospace'],
        syne: ['var(--font-syne)', 'sans-serif'],
        tactical: ['var(--font-tactical-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
