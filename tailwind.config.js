/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        '0g': {
          white: '#ffffff',
          light: '#f8f8f8',
          gray: '#e5e5e5',
          border: '#e0e0e0',
          text: '#1a1a1a',
          muted: '#666666',
          purple: '#8b5cf6',
          violet: '#a855f7',
          pink: '#f0e6fa',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      }
    },
  },
  plugins: [],
}
