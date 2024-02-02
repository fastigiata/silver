import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import { ControlledTooltip } from '@/tooltips/shared.tsx'
import { HexAlphaColorPicker, HexColorPicker } from 'react-colorful'
import { useColorPicker } from '@/tooltips/hooks/ColorPicker'
import { IconCheck, IconCross } from '@/components/Icons.tsx'
import { useValuePicker } from '@/tooltips/hooks/ValuePicker'
import { Interactive } from '@/components/Interactive.tsx'
import { logger } from '@/utils/log.ts'
import { useEnumPicker } from '@/tooltips/hooks/EnumPicker.ts'

const ColorPicker = () => {
    const { isOpen, open, close, details } = useColorPicker()

    const Picker = details.config[1] ? HexAlphaColorPicker : HexColorPicker
    const [ color, setColor ] = useState<string>(details.config[0])

    useEffect(() => {
        // update color when config changed
        setColor(details.config[0])
    }, [ details.config ])

    return (
        <ControlledTooltip
            id={'color-picker'}
            anchorId={details.anchorId}
            isOpen={isOpen}
            setIsOpen={(to) => {
                // TODO: 是否存在问题?
                if (to) {
                    open(details.anchorId!, details.config, details.closeCallback)
                } else {
                    close(null)
                }
            }}>
            <div className={
                'w-[216px] h-64 p-2 rounded-[16px] bg-white shadow-tooltip flex flex-col items-center justify-between'
            }>
                <Picker color={color} onChange={setColor}/>

                <div className={'w-full h-7 flex items-center'}>
                    <div
                        className={'w-4 h-4 border-[1px] border-[#0000000F] rounded-[2px]'}
                        style={{ backgroundColor: color }}/>
                    <span className={'flex-1 mx-1 text-primary font-primary text-[12px]'}>{color}</span>
                    <IconCross className={'as-button text-green text-[14px]'} onClick={() => close(null)}/>
                    <IconCheck className={'as-button ml-2 text-red text-[16px]'} onClick={() => close(color)}/>
                </div>
            </div>
        </ControlledTooltip>
    )
}

const ValuePicker = () => {
    const { isOpen, open, close, details } = useValuePicker()

    const [ defaultValue, min, max, step = 1 ] = details.config
    const [ v, _setV ] = useState({ rate: (defaultValue - min) / (max - min), mapped: defaultValue })
    const setV = (to: number) => {
        const range = max - min
        const mapped = Math.round(to * range / step) * step + min
        _setV({ rate: (mapped - min) / range, mapped })
    }

    useEffect(() => {
        // update value when config changed
        const [ defaultValue, min, max ] = details.config
        const rate = (defaultValue - min) / (max - min)
        _setV({ rate, mapped: defaultValue })
    }, [ details.config ])

    return (
        <ControlledTooltip
            id={'value-picker'}
            anchorId={details.anchorId}
            isOpen={isOpen}
            setIsOpen={(to) => {
                if (to) {
                    open(details.anchorId!, details.config, details.closeCallback)
                } else {
                    close(null)
                }
            }}>
            <div
                className={'w-[216px] h-8 p-2 rounded-[16px] bg-white shadow-tooltip text-[12px] flex items-center justify-between'}>
                <span className={'w-4 text-primary font-primary text-center'}>{v.mapped}</span>
                <Interactive
                    className={
                        'relative flex-1 h-full border-[1px] border-[#DDD] rounded-[8px] ' +
                        'bg-transparent cursor-pointer overflow-hidden'
                    } onMove={(pos) => setV(pos.left)}>
                    <div className={
                        'absolute top-0 left-0 h-full bg-[#EEE] leading-[16px] text-center'
                    } style={{ width: `${100 * v.rate}%` }}>
                        {/* {v.mapped} */}
                    </div>
                </Interactive>
                <IconCross className={'as-button ml-1 text-green text-[14px]'} onClick={() => close(null)}/>
                <IconCheck className={'as-button ml-1 text-red text-[16px]'} onClick={() => close(`${v.mapped}px`)}/>
            </div>
        </ControlledTooltip>
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
const _EnumPickerInner = ({ initial, items, onPick, onCancel }: {
    initial: number,
    items: string[],
    onPick: (v: string) => void,
    onCancel: VoidFunction
}) => {
    const ref = useRef<HTMLDivElement>(null)
    const [ pick, _setPick ] = useState(initial)
    const setPick = (offset: number) => {
        if (offset > 1) {
            _setPick(v => Math.min(v + 1, items.length - 1))
        } else if (offset < -1) {
            _setPick(v => Math.max(v - 1, 0))
        }
        // silently ignore 'offset === 0'
    }

    // TODO: add keyboard interaction
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
            <div className={'w-full h-[72px] text-primary font-primary overflow-hidden '}>
                {
                    items.map((item, idx) => {
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
                <IconCross className={'as-button text-green text-[14px]'} onClick={onCancel}/>
                <IconCheck className={'as-button text-red text-[16px]'} onClick={() => onPick(items[pick])}/>
            </div>
        </div>
    )
}
const EnumPicker = () => {
    const { isOpen, open, close, details } = useEnumPicker()

    const [ defaultPick, candidates ] = details.config

    return (
        <ControlledTooltip
            id={'color-picker'}
            anchorId={details.anchorId}
            isOpen={isOpen}
            setIsOpen={(to) => {
                if (to) {
                    open(details.anchorId!, details.config, details.closeCallback)
                } else {
                    close(null)
                }
            }}>
            <_EnumPickerInner
                initial={candidates.indexOf(defaultPick)}
                items={candidates}
                onPick={close}
                onCancel={() => close(null)}
            />
        </ControlledTooltip>
    )
}

/**
 * Contains all the tooltips used in the app.
 */
const Tooltips = () => {
    return <>
        <ColorPicker/>
        <ValuePicker/>
        <EnumPicker/>
    </>
}

export {
    Tooltips
}