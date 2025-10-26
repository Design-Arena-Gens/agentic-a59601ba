import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}", "./src/lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 0 4px rgba(0, 170, 255, 0.15)"
      },
      colors: {
        "agent-blue": "#2C6CFF",
        "agent-purple": "#7C3AED",
        "agent-dark": "#0F172A"
      },
      backgroundImage: {
        "grid": "radial-gradient(circle at center, rgba(44,108,255,0.2) 0, transparent 60%)",
        "card-gradient": "linear-gradient(135deg, rgba(124,58,237,0.18), rgba(44,108,255,0.18))"
      }
    }
  },
  plugins: []
};

export default config;
