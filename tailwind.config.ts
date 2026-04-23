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
        peach: "#D4A35D",
        jspeach: "#D4A35D",
        sage: "#7FB2B8",
        taupe: "#9CAF88",
        cream: "#F9F7F1",
        blush: "#C68E8E",
        deep: "#2C5272",
        offwhite: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
export default config;
