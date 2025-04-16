/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customColor1: "#081F21",
        customColor2: "#071721"
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(calc(-50%))' },
        },
      },
      animation: {
        marqueeSongName: 'marquee 10s linear alternate infinite',
        marqueeArtistName: 'marquee 10s linear alternate infinite',
      },
    },
  },
  plugins: [],
}

