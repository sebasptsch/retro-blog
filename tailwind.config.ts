import type { Config } from "tailwindcss";
import tailwindtypography from "@tailwindcss/typography";
import daisyUI from "daisyui";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/posts/*.mdx",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        inter: ["var(--font-inter)"],
        mono: ["var(--font-fira-code)"],
        comic: ["var(--font-comic-sans)"],
      },
    },
  },
  plugins: [daisyUI, tailwindtypography],
  daisyui: {
    themes: ["dark"],
  },
};
export default config;
