/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#1a191f',
        },
        text: {
          DEFAULT: '#121214',
        },
        primary: {
          DEFAULT: '#FFC408',
          extend: '#fff6d8',
          light: '#ffcf39',
          dark: '#b28905',
        },
        secondary: {
          DEFAULT: '#306F7D',
          light: '#e4f2f5',
          dark: '#214d57',
        },
        tertiary: {
          DEFAULT: '#14BDBD',
        },
        up: {
          DEFAULT: '#0ecb81',
          extend: '#D0F2F2',
        },
        down: {
          DEFAULT: '#FF6E6E',
          extend: '#FFE2E2',
        },
        gray: {
          bg: '#2a2932',
          hover: '#fafafa',
          border: '#efefef',
          1: '#4c4c4c',
          card: '#2c2c2e',
          secondary: '#9b9696',
        },
      }
    },
  },
  plugins: [],
}

