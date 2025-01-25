import { Sanchez } from 'next/font/google'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        productsans: ["productsans", "sans-serif"]
      },
      animation: {
        float1: 'float1 4s ease-in-out infinite',
        float2: 'float2 3s ease-in-out infinite',
      },
      keyframes: {
        float1: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-30px)' },
          '100%': { transform: 'translateY(0)' },
        },
        float2: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(30px)' },
          '100%': { transform: 'translateY(0)' },
        },
      },

    },
  },
  plugins: [],
};
