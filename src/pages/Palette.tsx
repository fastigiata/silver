import type { MouseEvent } from 'react'
import { useState } from 'react'
import { Spacer } from '@/components/Spacer.tsx'
import { useColorPicker } from '@/tooltips/ColorPicker.tsx'

// ========== Data ==========

type EditConfig = { type: 'color', withAlpha: boolean }
    | { type: 'enum', values: string[] }
    | { type: 'length', min: number, max: number, step?: number }
type PaletteItem = {
    name: string
    bind: string
    reset: string
    editConfig: EditConfig
} | { separator: true, title: string }

const PaletteItemList: PaletteItem[] = [
    { separator: true, title: 'Application' },
    {
        name: 'Corner Radius',
        bind: '--app-border-radius',
        reset: '8px',
        editConfig: { type: 'length', min: 0, max: 16 }
    },
    { separator: true, title: 'Header' },
    {
        name: 'Height',
        bind: '--header-height',
        reset: '40px',
        editConfig: { type: 'length', min: 32, max: 64 }
    },
    {
        name: 'Background Color',
        bind: '--header-bg',
        reset: '#FFFFFF',
        editConfig: { type: 'color', withAlpha: false }
    },
    {
        name: 'Font Size',
        bind: '--header-font-size',
        reset: '16px',
        editConfig: { type: 'length', min: 12, max: 24 }
    },
    {
        name: 'Shadow Color',
        bind: '--header-shadow-color',
        reset: '#0000001A',
        editConfig: { type: 'color', withAlpha: true }
    },
    {
        name: 'Text Color',
        bind: '--header-text-color',
        reset: '#515767',
        editConfig: { type: 'color', withAlpha: false }
    },
    { separator: true, title: 'Body' },
    {
        name: 'Background Color',
        bind: '--body-bg',
        reset: '#F2F3F5',
        editConfig: { type: 'color', withAlpha: false }
    },
    { separator: true, title: 'Text' },
    {
        name: 'Color (Primary)',
        bind: '--primary-text-color',
        reset: '#252933',
        editConfig: { type: 'color', withAlpha: false }
    },
    {
        name: 'Color (Secondary)',
        bind: '--secondary-text-color',
        reset: '#515767',
        editConfig: { type: 'color', withAlpha: false }
    },
    {
        name: 'Color (Tertiary)',
        bind: '--tertiary-text-color',
        reset: '#8A919F',
        editConfig: { type: 'color', withAlpha: false }
    },
    {
        name: 'Font Weight (Primary)',
        bind: '--primary-font-weight',
        reset: '700',
        editConfig: { type: 'enum', values: [ '100', '200', '300', '400', '500', '600', '700', '800', '900' ] }
    },
    {
        name: 'Font Weight (Secondary)',
        bind: '--secondary-font-weight',
        reset: '400',
        editConfig: { type: 'enum', values: [ '100', '200', '300', '400', '500', '600', '700', '800', '900' ] }
    },
    {
        name: 'Font Weight (Tertiary)',
        bind: '--tertiary-font-weight',
        reset: '300',
        editConfig: { type: 'enum', values: [ '100', '200', '300', '400', '500', '600', '700', '800', '900' ] }
    },
    { separator: true, title: 'Button' },
    {
        name: 'Background Color (Primary)',
        bind: '--primary-button-bg',
        reset: '#0F172A',
        editConfig: { type: 'color', withAlpha: false }
    },
    { separator: true, title: 'Card' },
    {
        name: 'Shadow Color',
        bind: '--card-shadow-color',
        reset: '#0000001A',
        editConfig: { type: 'color', withAlpha: true }
    },
]

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
    editConfig: EditConfig
}

const PaletteItem = ({ name, bind, reset, editConfig }: PaletteItemProps) => {
    const { open: openColorPicker } = useColorPicker()
    const [ value, setValue ] = useBindValue(bind)

    const handleEdit = (ev: MouseEvent<HTMLButtonElement>) => {
        // 此处需要阻止冒泡, 否则会触发Tooltip的关闭 (如果Tooltip是打开状态)
        // 在此情况下, 会先触发点击事件, 再触发关闭事件, 导致弹窗闪烁后关闭 (非预期)
        ev.preventDefault()
        ev.stopPropagation()

        if (editConfig.type === 'color') {
            openColorPicker(
                `edit-${bind}`,
                [ reset, editConfig.withAlpha ],
                (newColor) => {
                    console.log('newColor', newColor)
                }
            )
        }
        // TODO: 其他类型的编辑
    }

    return (
        <div className={'shrink-0 w-full h-10 px-4 rounded-[4px] bg-white shadow-card flex items-center'}>
            <span className={'w-60 text-secondary'}>{name}</span>
            <span className={'w-24 text-tertiary'}>{value}</span>

            <Spacer/>

            <button
                id={`edit-${bind}`}
                className={
                    'as-button h-7 px-2 mr-2 rounded-[4px] border-[1px] border-primary bg-white text-primary'
                } onClick={handleEdit}>
                Edit
            </button>

            <button className={
                'as-button h-7 px-2 rounded-[4px] bg-primary-button text-white'
            } onClick={() => setValue(reset)}>
                Reset
            </button>
        </div>
    )
}

// ========== Page ==========

const PalettePage = () => {
    return (
        <div className={
            'w-full h-full px-8 py-4 space-y-4 ' +
            'flex flex-col items-center overflow-y-auto'
        }>
            {
                PaletteItemList.map((item, index) => {
                    if ('separator' in item) {
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