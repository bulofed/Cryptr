const plugin = require('tailwindcss/plugin')

module.exports = {
    content: [],
    theme: {
      fontFamily: {
        sans: ['Barlow', 'sans-serif'],
      }
    },
    plugins: [
      plugin(function({ addVariant}){
        addVariant('not-last', '&:not(:last-child)')
      })
    ],
  }