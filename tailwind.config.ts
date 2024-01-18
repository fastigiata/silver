import type { Config } from 'tailwindcss'

export default <Config>{
    content: [
        './src/**/*.tsx'
    ],
    theme: {
        borderRadius: {
            'app': 'var(--app-border-radius)',
        },
        backgroundColor: {
            'transparent': 'transparent',
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
        extend: {
            zIndex: {
                1: '1',
            },
            height: {
                'header': 'var(--header-height)',
            },
        },
    },
    plugins: [],
}