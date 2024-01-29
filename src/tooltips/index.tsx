import { useEffect, useRef, useState } from 'react'
import type { TooltipRefProps } from 'react-tooltip'
import { ControlledTooltip } from '@/tooltips/shared.tsx'
import { HexAlphaColorPicker, HexColorPicker } from 'react-colorful'
import { useColorPicker } from '@/tooltips/hooks/ColorPicker'
import { IconCheck, IconCross } from '@/components/Icons.tsx'
import { useValuePicker } from '@/tooltips/hooks/ValuePicker.tsx'
import { Interactive } from '@/components/Interactive.tsx'

const ColorPicker = () => {
    const ref = useRef<TooltipRefProps>(null)
    const { isOpen, open, close, details } = useColorPicker()

    const Picker = details.config[1] ? HexAlphaColorPicker : HexColorPicker
    const [ color, setColor ] = useState<string>(details.config[0])

    useEffect(() => {
        // update color when config changed
        setColor(details.config[0])
    }, [ details.config ])

    return (
        <ControlledTooltip
            id={'color-picker'} ref={ref}
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
                    <span className={'flex-1 mx-1 text-primary text-[12px]'}>{color}</span>
                    <IconCross className={'as-button text-green text-[16px]'} onClick={() => close(null)}/>
                    <IconCheck className={'as-button ml-2 text-red text-[18px]'} onClick={() => close(color)}/>
                </div>
            </div>
        </ControlledTooltip>
    )
}

const ValuePicker = () => {
    const ref = useRef<TooltipRefProps>(null)
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
            id={'value-picker'} ref={ref}
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
                <span className={'w-4 text-primary text-center'}>{v.mapped}</span>
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
                <IconCheck className={
                    'as-button ml-1 text-red text-[16px]'
                } onClick={() => close(`${v.mapped}px`)}/>
            </div>
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
    </>
}

export {
    Tooltips
}