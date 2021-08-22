module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      smw: { max: '640px' },
      // => @media (max-width: 639px) { ... }
    },

    extend: {
      minWidth: {
        '3rem': '3rem',
      },
      zIndex: {
        '-10': '-10',
        negative: '- 1',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    // ...
  ],
};
