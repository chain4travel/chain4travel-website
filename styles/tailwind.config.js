const colors = require('tailwindcss/colors')

module.exports = {
    content: ['_site/**/*.html'],
    safelist: [],
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/forms'),
    ],
    theme: {
        extend: {
            animation: {
                'spin-slow': 'spin 24s linear infinite',
                'spin-slower': 'spin 48s linear reverse infinite',
            }
        },
        colors: {
            dark: "#141A18",
            primary: "#FA6400",
            secondary: "#30E8BF",
            white: "#fff",
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