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
            },
			backgroundImage: {
				'decode-gradient-hackerz-b': 'radial-gradient(100% 100% at 50% 125%, rgba(0, 243, 177, 0.80) 0%, rgba(0, 243, 177, 0.00) 60%);',
				'gradient-unchained': 'radial-gradient(100% 100% at 50% 125%, rgba(250, 100, 0, 0.80) 0%, rgba(250, 100, 0,  0.00) 60%);',
			},
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