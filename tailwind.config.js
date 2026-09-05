/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'racing-red': '#e10600',
        'racing-red-glow': '#ff1801',
        'carbon': '#08080a',
      },
      fontFamily: {
        'racing': ['Rajdhani', 'sans-serif'],
        'orbitron': ['Orbitron', 'sans-serif'],
        'chakra': ['Chakra Petch', 'sans-serif'],
        'mono-tech': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'spin-fast': 'spin 0.6s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
    },
  },
  plugins: [],
}
