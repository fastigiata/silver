import type { Config } from 'tailwindcss'

export default <Config>{
    content: [
        './src/**/*.tsx'
    ],
    theme: {
        borderWidth: {
            'app': '1px',
        },
        borderColor: {
            'app': 'var(--app-border-color)',
        },
        backgroundColor: {
            'transparent': 'transparent',
            'white': '#FFFFFF',
            'header': 'var(--header-bg)',
            'body': 'var(--body-bg)',
            'primary-button': 'var(--primary-button-bg)',
        },
        boxShadow: {
            'nav': '0px 2px 8px var(--header-shadow-color)',
            'tooltip': '0px 4px 4px var(--tooltip-shadow-color)',
            'card': '1px 1px 4px var(--card-shadow-color)',
            'card_hover': '3px 3px 4px var(--card-shadow-color)',
        },
        colors: {
            'white': '#FFFFFF',
            'red': '#F5222D',
            'green': '#52C41A',
            'header': 'var(--header-text-color)',
            'primary': 'var(--primary-text-color)',
            'secondary': 'var(--secondary-text-color)',
            'tertiary': 'var(--tertiary-text-color)',
        },
        fontSize: {
            'header': 'var(--header-font-size)',
        },
        fontWeight: {
            'primary': 'var(--primary-font-weight)',
            'secondary': 'var(--secondary-font-weight)',
            'tertiary': 'var(--tertiary-font-weight)',
        },
        extend: {
            zIndex: {
                1: '1',
            },
            height: {
                'header': 'var(--header-height)',
                'body': 'calc(100% - var(--header-height))',
            },
            borderRadius: {
                'app': 'var(--app-border-radius)',
            },
            fontFamily: {
                'JBMono': 'JetBrains Mono'
            }
        },
    },
    plugins: [],
}