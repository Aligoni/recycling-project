module.exports = {
  important: true,
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        '100': '40rem'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
