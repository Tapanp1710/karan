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
        peach: "#DFA287",
        jspeach: "#DFA287",
        sage: "#98A06A",
        taupe: "#B7A995",
        cream: "#F3EEE4",
        blush: "#EFC7B2",
        deep: "#5F5149",
        offwhite: "#FAF6EF",
      },
    },
  },
  plugins: [],
};
export default config;
