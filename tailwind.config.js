/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        rotateRight: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(90deg)' },
        },
        rotateLeft: {
          '0%': { transform: 'rotate(90deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        rotateRight: 'rotateRight .2s ease-in-out',
        rotateLeft: 'rotateLeft .2s ease-in-out',
      },
    },
    fontFamily: {
      sans: ['Neue Montreal'],
      serif: ['Neue Montreal'],
      mono: ['Neue Montreal'],
      display: ['Neue Montreal'],
      body: ['Neue Montreal'],
  
    }
  },
  plugins: [],
}

