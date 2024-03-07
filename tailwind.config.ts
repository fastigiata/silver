import type { Config } from 'tailwindcss'

export default <Config>{
    content: [
        './src/**/*.tsx'
    ],
    theme: {
        backgroundColor: {
            'transparent': 'transparent',
            'white': '#FFFFFF',
            'header': 'var(--header-bg)',
            'body': 'var(--body-bg)',
            'primary-button': 'var(--primary-button-bg)',
            'secondary-button': 'var(--secondary-button-bg)',
            'psbg0': 'var(--ps-bg0)',
            'psbg1': 'var(--ps-bg1)',
            'psbg2': 'var(--ps-bg2)',
            'psbg3': 'var(--ps-bg3)',
            'psbg4': 'var(--ps-bg4)',
            'psbg5': 'var(--ps-bg5)',
        },
        boxShadow: {
            'nav': '0px 2px 8px var(--header-shadow-color)',
            'tooltip': '0px 4px 4px var(--tooltip-shadow-color)',
            'card': '1px 1px 4px var(--card-shadow-color)',
            'card_hover': '3px 3px 4px var(--card-shadow-color)',
        },
        colors: {
            'white': '#FFFFFF',
            'black': '#000000',
            'red': '#F5222D',
            'green': '#52C41A',
            'header': 'var(--header-text-color)',
            'primary': 'var(--primary-text-color)',
            'secondary': 'var(--secondary-text-color)',
            'tertiary': 'var(--tertiary-text-color)',
            'ps0': 'var(--ps-color0)',
            'ps1': 'var(--ps-color1)',
            'ps2': 'var(--ps-color2)',
            'ps3': 'var(--ps-color3)',
            'ps4': 'var(--ps-color4)',
            'ps5': 'var(--ps-color5)',
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
                2: '2',
                3: '3',
            },
            height: {
                'header': 'var(--header-height)',
                'body': 'calc(100% - var(--header-height))',
            },
            borderWidth: {
                'app': '1px',
            },
            borderColor: {
                'app': 'var(--app-border-color)',
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