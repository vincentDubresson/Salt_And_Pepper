const plugin = require('tailwindcss/plugin');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/**/*.js",
    "./templates/**/*.html.twig",
  ],
  theme: {
    extend: {
      colors: {
        'sp-primary-50': '#fefcfd',
        'sp-primary-300': '#e59fbf',
        'sp-primary-400': '#d871a1',
        'sp-primary-600': '#cb4382',
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
    },
  },
    plugins: [
      plugin(function({ addUtilities, addComponents, e, config }) {
        // Add your custom styles here
      }),
      require('@tailwindcss/forms'),
    ],
  },
}

