import type { Config } from 'tailwindcss'

export default <Config>{
    content: [
        './src/**/*.tsx'
    ],
    theme: {
        backgroundColor: {
            'header': 'var(--header-bg)',
            'body': 'var(--body-bg)',
        },
        boxShadow: {
            'nav': '0px 2px 8px var(--header-shadow-color)',
        },
        colors: {
            'header': 'var(--header-text-color)',
            'primary': 'var(--primary-text-color)',
            'secondary': 'var(--secondary-text-color)',
            'tertiary': 'var(--tertiary-text-color)',
        },
        fontFamily: {},
        fontSize: {
            'header': 'var(--header-font-size)',
        },
    },
    plugins: [],
}