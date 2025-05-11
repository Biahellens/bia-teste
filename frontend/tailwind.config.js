import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px"
      }
    },
    colors: {
      white: {
        0: "#FFFFFF",
      },
      black: {
        0: "#000000",
        600: "rgba(0,0,0, 0.3)",
        900: "rgba(0, 0, 0, 0.09)"
      },
      neutral: {
        50: "#F5F5F5",
        100: "#F8F8F8",
        200: "#EAEAEA",
        300: "#B3B3B3",
        400: "#E8E8E8",
        500: "#808080",
        600: "#666666",
        700: "#4D4D4D",
        800: "#303030",
        900: "#1B1B1B",
      },
      primary: {
        100: "rgba(0,0,139, 0.5)",
        200: "#98AEFF",
        350: "rgba(199, 205, 255, 0.07)",
        400: "#0000CD",
        700: "#001CF2",
      },
      secondary: {
        100: "#FFFCF5",
        200: "rgba(144, 133, 107, 0.11)",
        300: "rgba(144, 133, 107, 0.19)",
        700: "#90856B",
      },
      success: {
        100: "#10B673",
        400: "#2AA400",
        700: "#07643F",
      },
      warning: {
        100: "#F11919",
        300: "#F33636",
        500: "#E30000",
      },
      error: {
        100: "#FFE4E4",
        500: "#FF3333",
      },
      shadow: {
        0: "#FFFFFF",
        100: "#0000000",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        mulish: ["Mulish", 'sans-serif'],
      },
    },
  },
  corePlugins: {
    ringWidth: false,
    ringOffsetWidth: false,
    ringColor: false,
  },
  plugins: [],
};