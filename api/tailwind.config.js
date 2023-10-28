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
        'sp-red': '#ff6f61',
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

