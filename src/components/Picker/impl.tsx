import type { ColorPickerConfig, EnumPickerConfig, ValuePickerConfig } from '@/components/Picker/state.ts'
import { pickerState } from '@/components/Picker/state.ts'
import { type CSSProperties, forwardRef, type ReactNode, useEffect, useRef, useState } from 'react'
import { HexAlphaColorPicker, HexColorPicker } from 'react-colorful'
import { IconCheck, IconCross } from '@/components/Icons.tsx'
import { useAtom } from 'jotai'
import type { TooltipRefProps } from 'react-tooltip'
import { Tooltip } from 'react-tooltip'
import { Interactive } from '@/components/Interactive.tsx'
import { logger } from '@/utils/log.ts'

type ControlledTooltipProps = {
    id: string
    anchorId?: string | null
    children: ReactNode
    isOpen: boolean
    setIsOpen?: (isOpen: boolean) => void
}

const ControlledTooltip = forwardRef<TooltipRefProps, ControlledTooltipProps>(({
    id,
    anchorId,
    children,
    isOpen,
    setIsOpen
}, ref) => {
    return (
        <Tooltip
            id={id} ref={ref}
            anchorSelect={anchorId ? `#${anchorId}` : undefined}
            isOpen={isOpen} setIsOpen={setIsOpen}
            clickable openOnClick place={'bottom'}
            style={{ zIndex: 10, padding: 0, backgroundColor: 'transparent', }}
            opacity={1}>
            {children}
        </Tooltip>
    )
})

// region picker implementations

type PickerProps<Config> = {
    details: Config,
    confirm: (v: string) => void,
    cancel: () => void
}

const _ColorPickerImpl = ({ details, confirm, cancel }: PickerProps<ColorPickerConfig>) => {
    const [ color, setColor ] = useState(details[0])
    const _ColorPicker = details[1] ? HexAlphaColorPicker : HexColorPicker

    return (
        <div className={
            'w-[216px] h-64 p-2 rounded-[16px] bg-white shadow-tooltip flex flex-col items-center justify-between'
        }>
            <_ColorPicker color={color} onChange={setColor}/>

            <div className={'w-full h-7 flex items-center'}>
                <div
                    className={'w-4 h-4 border-[1px] border-[#0000000F] rounded-[2px]'}
                    style={{ backgroundColor: color }}/>
                <span className={'flex-1 mx-1 text-secondary font-secondary text-[12px]'}>{color}</span>
                <IconCross className={'as-button text-green text-[14px]'} onClick={() => cancel()}/>
                <IconCheck className={'as-button ml-2 text-red text-[16px]'} onClick={() => confirm(color)}/>
            </div>
        </div>
    )
}

const _ValuePickerImpl = ({ details, confirm, cancel }: PickerProps<ValuePickerConfig>) => {
    const [ defaultValue, min, max, step = 1 ] = details
    const [ v, _setV ] = useState({ rate: (defaultValue - min) / (max - min), mapped: defaultValue })
    const setV = (to: number) => {
        const range = max - min
        const mapped = Math.round(to * range / step) * step + min
        _setV({ rate: (mapped - min) / range, mapped })
    }

    return (
        <div
            className={'w-[216px] h-8 p-2 rounded-[16px] bg-white shadow-tooltip text-[12px] flex items-center justify-between'}>
            <span className={'w-4 text-secondary font-secondary text-center'}>{v.mapped}</span>
            <Interactive
                className={
                    'relative flex-1 h-full border-[1px] border-[#DDD] rounded-[8px] ' +
                    'bg-transparent cursor-pointer overflow-hidden'
                } onMove={(pos) => setV(pos.left)}>
                <div className={
                    'absolute top-0 left-0 h-full bg-[#EEE] leading-[16px] text-center'
                } style={{ width: `${100 * v.rate}%` }}/>
            </Interactive>
            <IconCross className={'as-button ml-1 text-green text-[14px]'} onClick={() => cancel()}/>
            <IconCheck className={'as-button ml-1 text-red text-[16px]'} onClick={() => confirm(`${v.mapped}px`)}/>
        </div>
    )
}

const getVariants = (num: number, pick: number): CSSProperties => {
    if (num === pick) {
        return {
            transform: `translateY(${(1 - pick) * 100}%) scale(1.4)`
        }
    } else if (num - pick === 1 || num - pick === -1) {
        return {
            transform: `translateY(${(1 - pick) * 100}%) scale(1.2)`,
            opacity: 0.8,
        }
    } else {
        return {
            transform: `translateY(${(1 - pick) * 100}%)`
        }
    }
}
const _EnumPickerImpl = ({ details, confirm, cancel }: PickerProps<EnumPickerConfig>) => {
    const ref = useRef<HTMLDivElement>(null)
    const [ defaultPick, candidates ] = details
    const [ pick, _setPick ] = useState(candidates.indexOf(defaultPick))
    const setPick = (offset: number) => {
        if (offset > 1) {
            _setPick(v => Math.min(v + 1, candidates.length - 1))
        } else if (offset < -1) {
            _setPick(v => Math.max(v - 1, 0))
        }
        // silently ignore 'offset === 0'
    }

    useEffect(() => {
        const container = ref.current
        if (!container) logger.warn('[EnumPicker] no target container')

        const wheelHandler = (ev: WheelEvent) => {
            // prevent scroll
            ev.preventDefault()

            // update pick
            setPick(ev.deltaY)
        }

        container?.addEventListener('wheel', wheelHandler, { passive: false })

        return () => {
            container?.removeEventListener('wheel', wheelHandler)
        }
    }, [])

    return (
        <div ref={ref} className={'w-[56px] h-[108px] p-2 rounded-[16px] bg-white shadow-tooltip'}>
            <div className={'w-full h-[72px] text-secondary font-secondary overflow-hidden '}>
                {
                    candidates.map((item, idx) => {
                        return (
                            <div
                                key={idx}
                                className={'w-full h-6 text-[12px] text-center leading-[24px] cursor-pointer'}
                                style={{ transition: 'transform .3s linear', ...getVariants(idx, pick) }}
                                onClick={() => _setPick(idx)}>
                                {item}
                            </div>
                        )
                    })
                }
            </div>
            <div className={'w-full h-5 flex items-center justify-between'}>
                <IconCross className={'as-button text-green text-[14px]'} onClick={() => cancel()}/>
                <IconCheck className={'as-button text-red text-[16px]'} onClick={() => confirm(candidates[pick])}/>
            </div>
        </div>
    )
}
// endregion

const Picker = () => {
    const [ { anchorId, config, closeCallback }, setPickerState ] = useAtom(pickerState)

    const done = (val?: string | null) => {
        setPickerState({ anchorId: null, config: null, closeCallback: null })
        closeCallback?.(val ?? null)
    }

    return (
        <ControlledTooltip
            id={'tooltip-picker'}
            anchorId={anchorId}
            isOpen={anchorId !== null}
            setIsOpen={to => {
                if (to) {
                    setPickerState({ anchorId, config, closeCallback })
                } else {
                    setPickerState({ anchorId: null, config: null, closeCallback: null })
                }
            }}>
            {
                config?.type === 'color'
                    ? <_ColorPickerImpl details={config.config} confirm={done} cancel={done}/>
                    : null
            }
            {
                config?.type === 'value'
                    ? <_ValuePickerImpl details={config.config} confirm={done} cancel={done}/>
                    : null
            }
            {
                config?.type === 'enum'
                    ? <_EnumPickerImpl details={config.config} confirm={done} cancel={done}/>
                    : null
            }
        </ControlledTooltip>
    )
}

export {
    Picker
}
