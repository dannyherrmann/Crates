

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'crate-yellow': '#F6EB80',
        'crate-blue': '#000AFF',
        'hover-blue': '#4048FD',
      },
      fontFamily: {
        'Space-Mono': ['Space Mono', 'mono'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

