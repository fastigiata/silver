export type EditConfig = { type: 'color', withAlpha: boolean }
    | { type: 'enum', values: string[] }
    | { type: 'length', min: number, max: number, step?: number }

export type AppearanceSeparator = { separator: true, title: string }
export type AppearanceConfigurable = {
    /**
     * display name
     */
    name: string
    /**
     * css variable name
     */
    bind: string
    /**
     * default value
     */
    reset: string
    /**
     * current applied value
     */
    value: string
    /**
     * edit config for this item
     */
    editConfig: EditConfig
}
export type AppearanceItem = AppearanceConfigurable | AppearanceSeparator

const _DEFAULT: AppearanceItem[] = [
    { separator: true, title: 'Application' },
    {
        name: 'Corner Radius',
        bind: '--app-border-radius',
        reset: '8px',
        value: '8px',
        editConfig: { type: 'length', min: 0, max: 16 }
    },
    { separator: true, title: 'Header' },
    {
        name: 'Height',
        bind: '--header-height',
        reset: '40px',
        value: '40px',
        editConfig: { type: 'length', min: 32, max: 64 }
    },
    {
        name: 'Background Color',
        bind: '--header-bg',
        reset: '#FFFFFF',
        value: '#FFFFFF',
        editConfig: { type: 'color', withAlpha: false }
    },
    {
        name: 'Font Size',
        bind: '--header-font-size',
        reset: '16px',
        value: '16px',
        editConfig: { type: 'length', min: 12, max: 24 }
    },
    {
        name: 'Shadow Color',
        bind: '--header-shadow-color',
        reset: '#0000001A',
        value: '#0000001A',
        editConfig: { type: 'color', withAlpha: true }
    },
    {
        name: 'Text Color',
        bind: '--header-text-color',
        reset: '#515767',
        value: '#515767',
        editConfig: { type: 'color', withAlpha: false }
    },
    { separator: true, title: 'Body' },
    {
        name: 'Background Color',
        bind: '--body-bg',
        reset: '#F2F3F5',
        value: '#F2F3F5',
        editConfig: { type: 'color', withAlpha: false }
    },
    { separator: true, title: 'Text' },
    {
        name: 'Color (Primary)',
        bind: '--primary-text-color',
        reset: '#252933',
        value: '#252933',
        editConfig: { type: 'color', withAlpha: false }
    },
    {
        name: 'Color (Secondary)',
        bind: '--secondary-text-color',
        reset: '#515767',
        value: '#515767',
        editConfig: { type: 'color', withAlpha: false }
    },
    {
        name: 'Color (Tertiary)',
        bind: '--tertiary-text-color',
        reset: '#8A919F',
        value: '#8A919F',
        editConfig: { type: 'color', withAlpha: false }
    },
    {
        name: 'Font Weight (Primary)',
        bind: '--primary-font-weight',
        reset: '700',
        value: '700',
        editConfig: { type: 'enum', values: [ '100', '200', '300', '400', '500', '600', '700', '800', '900' ] }
    },
    {
        name: 'Font Weight (Secondary)',
        bind: '--secondary-font-weight',
        reset: '400',
        value: '400',
        editConfig: { type: 'enum', values: [ '100', '200', '300', '400', '500', '600', '700', '800', '900' ] }
    },
    {
        name: 'Font Weight (Tertiary)',
        bind: '--tertiary-font-weight',
        reset: '300',
        value: '300',
        editConfig: { type: 'enum', values: [ '100', '200', '300', '400', '500', '600', '700', '800', '900' ] }
    },
    { separator: true, title: 'Button' },
    {
        name: 'Background Color (Primary)',
        bind: '--primary-button-bg',
        reset: '#0F172A',
        value: '#0F172A',
        editConfig: { type: 'color', withAlpha: false }
    },
    { separator: true, title: 'Card' },
    {
        name: 'Shadow Color',
        bind: '--card-shadow-color',
        reset: '#0000001A',
        value: '#0000001A',
        editConfig: { type: 'color', withAlpha: true }
    },
    { separator: true, title: 'Tooltip' },
    {
        name: 'Shadow Color',
        bind: '--tooltip-shadow-color',
        reset: '#8F959E3D',
        value: '#8F959E3D',
        editConfig: { type: 'color', withAlpha: true }
    },
]

class Appearance {
    #inner: AppearanceItem[] = _DEFAULT

    /**
     * load the appearance config from storage
     */
    load() {
        // TODO
    }

    constructor() {
        this.load()
    }

    modify(bind: string, to: string) {
        // TODO: use map instead forEach
        this.#inner.forEach((item => {
            if ('bind' in item && item.bind === bind) {
                item.value = to
            }
        }))
    }

    reset() {
        this.#inner = _DEFAULT
    }

    /**
     * save the current appearance config to storage
     */
    save() {

    }
}

const appearance = new Appearance()

export {
    appearance
}