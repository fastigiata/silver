import { useState } from 'react'

// ========== Helper ==========

const getBindValue = (bind: string) => {
    return window.getComputedStyle(document.documentElement).getPropertyValue(bind)
}
const useBindValue = (bind: string) => {
    const [ value, _setValue ] = useState<string>(getBindValue(bind))
    const setValue = (value: string) => {
        document.documentElement.style.setProperty(bind, value)
        _setValue(value)
    }
    return [ value, setValue ] as const
}

// ========== Component ==========

const PaletteTitle = ({ title }: { title: string }) => {
    return (
        <div className={'text-primary font-primary'}>{title}</div>
    )
}

type PaletteItemProps = {
    name: string
    bind: string
    reset: string
}

const PaletteItem = ({ name, bind, reset }: PaletteItemProps) => {
    const [ value, setValue ] = useBindValue(bind)

    return (
        <div className={'shrink-0 w-full h-10 px-4 rounded-[4px] bg-white shadow-card flex items-center'}>
            <span className={'w-60 text-secondary'}>{name}</span>
            <span className={'w-24 text-tertiary'}>{value}</span>

            {/* TODO: selector */}
            <i className="flex-1"></i>

            <button className={
                'as-button h-7 px-2 rounded-[4px] bg-primary-button text-white'
            } onClick={() => setValue(reset)}>
                Reset
            </button>
        </div>
    )
}

// ========== Page ==========

const PaletteItemList = [
    { name: 'separator', title: 'Application' },
    {
        name: 'Corner Radius',
        bind: '--app-border-radius',
        reset: '8px'
    },
    { name: 'separator', title: 'Header' },
    {
        name: 'Height',
        bind: '--header-height',
        reset: '40px'
    },
    {
        name: 'Background Color',
        bind: '--header-bg',
        reset: '#FFFFFF'
    },
    {
        name: 'Font Size',
        bind: '--header-font-size',
        reset: '16px'
    },
    {
        name: 'Shadow Color',
        bind: '--header-shadow-color',
        reset: '#0000001A'
    },
    {
        name: 'Text Color',
        bind: '--header-text-color',
        reset: '#515767'
    },
    { name: 'separator', title: 'Body' },
    {
        name: 'Background Color',
        bind: '--body-bg',
        reset: '#F2F3F5'
    },
    { name: 'separator', title: 'Text' },
    {
        name: 'Color (Primary)',
        bind: '--primary-text-color',
        reset: '#252933'
    },
    {
        name: 'Color (Secondary)',
        bind: '--secondary-text-color',
        reset: '#515767'
    },
    {
        name: 'Color (Tertiary)',
        bind: '--tertiary-text-color',
        reset: '#8A919F'
    },
    {
        name: 'Font Weight (Primary)',
        bind: '--primary-font-weight',
        reset: '700'
    },
    {
        name: 'Font Weight (Secondary)',
        bind: '--secondary-font-weight',
        reset: '400'
    },
    {
        name: 'Font Weight (Tertiary)',
        bind: '--tertiary-font-weight',
        reset: '300'
    },
    { name: 'separator', title: 'Button' },
    {
        name: 'Background Color (Primary)',
        bind: '--primary-button-bg',
        reset: '#0F172A'
    },
    // TODO: the rest
] as const

const PalettePage = () => {
    return (
        <div className={
            'w-full h-full px-8 py-4 space-y-4 ' +
            'flex flex-col items-center overflow-y-auto'
        }>
            {
                PaletteItemList.map((item, index) => {
                    if (item.name === 'separator') {
                        return <PaletteTitle key={index} title={item.title}/>
                    } else {
                        return <PaletteItem key={index} {...item}/>
                    }
                })
            }
        </div>
    )
}

export default PalettePage