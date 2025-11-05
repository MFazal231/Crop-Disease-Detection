/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'agri-green': '#2e7d32',
        'agri-green-light': '#43a047',
      },
    },
  },
  plugins: [],
}

