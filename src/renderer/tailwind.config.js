const plugins = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Poppins, sans-serif'
      },
      keyframes: {
        slideIn: {
          from: { width: 0 },
          to: { width: '--radix-collapsible-content-width' }
        },
        slideOut: {
          from: { width: '--radix-collapsible-content-width' },
          to: { width: 0 }
        }
      },
      animation: {
        slideIn: 'slideIn 300ms ease-out',
        slideOut: 'slideOut 300ms ease-out'
      }
    }
  },
  plugins: [
    plugins(({ addUtilities }) => {
      addUtilities({
        '.region-drag': {
          '-webkit-app-region': 'drag'
        },
        '.region-no-drag': {
          '-webkit-app-region': 'no-drag'
        }
      })
    })
  ]
}
