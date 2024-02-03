import type { MouseEvent } from 'react'
import { useEffect, useState } from 'react'
import { Spacer } from '@/components/Spacer.tsx'
import { AwesomeScrollbar } from '@/components/AwesomeScrollbar'
import { useColorPicker } from '@/tooltips/hooks/ColorPicker'
import { useValuePicker } from '@/tooltips/hooks/ValuePicker'
import { useEnumPicker } from '@/tooltips/hooks/EnumPicker'
import type { EditConfig } from '@/utils/appearance.ts'
import { appearance } from '@/utils/appearance.ts'

// ========== Helper ==========

const getBindValue = (bind: string) => {
    return window.getComputedStyle(document.documentElement).getPropertyValue(bind)
}
const useBindValue = (bind: string) => {
    const [ value, _setValue ] = useState<string>(getBindValue(bind))
    const setValue = (value: string) => {
        appearance.modify(bind, value)
        _setValue(value)
    }
    return [ value, setValue ] as const
}

// ========== Component ==========

const ConfigTitle = ({ title }: { title: string }) => {
    return (
        <div className={'text-primary font-primary'}>{title}</div>
    )
}

type ConfigItemProps = {
    name: string
    bind: string
    reset: string
    editConfig: EditConfig
}

const ConfigItem = ({ name, bind, reset, editConfig }: ConfigItemProps) => {
    const { open: openColorPicker } = useColorPicker()
    const { open: openValuePicker } = useValuePicker()
    const { open: openEnumPicker } = useEnumPicker()
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
                    if (!!newColor) setValue(newColor)
                }
            )
        } else if (editConfig.type === 'length') {
            openValuePicker(
                `edit-${bind}`,
                [ parseInt(reset, 10), editConfig.min, editConfig.max, editConfig.step ],
                (newValue) => {
                    if (!!newValue) setValue(newValue)
                }
            )
        } else if (editConfig.type === 'enum') {
            openEnumPicker(
                `edit-${bind}`,
                [ reset, editConfig.values ],
                (newValue) => {
                    if (!!newValue) setValue(newValue)
                }
            )
        }
    }

    return (
        <div className={'shrink-0 w-full h-10 px-4 rounded-[4px] bg-white shadow-card flex items-center'}>
            <span className={'w-60 text-secondary font-secondary'}>{name}</span>
            <span className={'w-24 text-tertiary font-tertiary'}>{value}</span>

            <Spacer/>

            <button
                id={`edit-${bind}`}
                className={
                    'as-button h-7 px-2 mr-2 rounded-[4px] border-[1px] border-primary bg-white text-primary font-primary'
                } onClick={handleEdit}>
                Edit
            </button>

            {/* TODO: disable when eq default */}
            <button className={
                'as-button h-7 px-2 rounded-[4px] bg-primary-button text-white font-primary'
            } onClick={() => setValue(reset)}>
                Reset
            </button>
        </div>
    )
}

// ========== Page ==========

const AppearancePage = () => {
    const [ configItems, setConfigItems ] = useState(appearance.config)

    useEffect(() => {
        appearance.subscribe(setConfigItems)
        return () => appearance.unSubscribe(setConfigItems)
    }, [])

    return (
        <AwesomeScrollbar className={
            'w-full h-full px-8 py-4 space-y-4 ' +
            'flex flex-col items-center overflow-y-auto'
        }>
            {
                configItems.map((item, index) => {
                    if ('separator' in item) {
                        return <ConfigTitle key={index} title={item.title}/>
                    } else {
                        return <ConfigItem key={index} {...item}/>
                    }
                })
            }

            <div className={'w-full'}>
                <button className={
                    'as-button text-red text-[14px] underline underline-offset-2'
                } onClick={() => appearance.reset()}>
                    Reset All to Default
                </button>
            </div>
        </AwesomeScrollbar>
    )
}

export default AppearancePage