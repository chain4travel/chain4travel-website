const colors = require('tailwindcss/colors')

module.exports = {
    content: ['_site/**/*.html'],
    safelist: [],
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/line-clamp'),
        require('@tailwindcss/forms'),
    ],
    theme: {
        colors: {
            dark: "#141A18",
            primary: "#FF8235",
            secondary: "#30E8BF",
            muted: "#9CA3AF",
            green: colors.lime,
            gray: colors.neutral,
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '2rem',
                lg: '4rem',
                xl: '4rem',
                '2xl': '4rem',
                },
        }
      },
  }