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
        fontFamily: {
            'sans': ['Inter, system-ui, sans-serif'],
            'mono': ['ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace']
        },
        colors: {
            dark: "#141A18",
            primary: "#FA6400",
            primaryDark: "#D95600",
            secondary: "#30E8BF",
            white: "#fff",
            muted: "#9CA3AF",
            green: colors.lime,
            gray: colors.neutral,
        }
    },
}