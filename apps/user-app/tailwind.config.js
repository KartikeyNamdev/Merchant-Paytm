/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark backgrounds
        "bg-primary": "#0D0B10", // Darkest
        "bg-secondary": "#131016", // Lighter
        "bg-card": "#1A171F", // For cards

        // Borders & Dividers
        "border-primary": "rgba(255, 255, 255, 0.1)",
        "border-secondary": "rgba(255, 255, 255, 0.05)",

        // Primary Accent (Purples)
        "accent-primary": "#8A69FF",
        "accent-secondary": "#B39DFF",
        "accent-dark": "#2E225D",

        // Text
        "text-primary": "#FFFFFF",
        "text-secondary": "#A9A4B3", // Muted
        "text-tertiary": "#6E6A78", // Muted-darker

        // Gradients
        "gradient-start": "#8A69FF",
        "gradient-end": "#4D22D1",
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(circle at center, rgba(138, 105, 255, 0.1), transparent 70%)",
        "linear-glow":
          "linear-gradient(90deg, rgba(138, 105, 255, 0.1), transparent 50%, rgba(138, 105, 255, 0.1))",
      },
      animation: {
        "fade-in-down": "fadeInDown 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
      },
      keyframes: {
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
