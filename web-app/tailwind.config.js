const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'sp-primary-50': '#FEFCFDff',
        'sp-primary-100': '#F9EBF2ff',
        'sp-primary-150': '#F5DAE7ff',
        'sp-primary-200': '#F0CADBff',
        'sp-primary-250': '#EBB9D0ff',
        'sp-primary-300': '#E7A8C5ff',
        'sp-primary-350': '#E297BAff',
        'sp-primary-400': '#DE86AFff',
        'sp-primary-450': '#D975A4ff',
        'sp-primary-500': '#D46598ff',
        'sp-primary-550': '#D0548Dff',
        'sp-primary-600': '#CB4382ff',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
    plugins: [],
  },
}
