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
          black: '#0a0a0a',
          dark: '#111111',
          gray: '#1a1a1a',
          border: '#2a2a2a',
          text: '#ffffff',
          muted: '#888888',
          accent: '#00ff88',
        }
      },
      fontFamily: {
        mono: ['Geist Mono', 'SF Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
