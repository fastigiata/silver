import { useRef, useState } from 'react'
import type { TooltipRefProps } from 'react-tooltip'
import { useAtom } from 'jotai/index'
import { ControlledTooltip } from '@/tooltips/ControlledTooltip.tsx'
import { HexAlphaColorPicker, HexColorPicker } from 'react-colorful'
import { ctx as colorPickerCtx } from '@/tooltips/ColorPicker.tsx'

const ColorPicker = () => {
    const ref = useRef<TooltipRefProps>(null)
    const [ v, setV ] = useAtom(colorPickerCtx)

    const close = (color: string | null) => {
        setV(prev => ({ ...prev, isOpen: false }))
        v.closeCallback?.(color)
    }
    const Picker = v.config[1] ? HexAlphaColorPicker : HexColorPicker
    const [ color, setColor ] = useState<string>(v.config[0])

    return (
        <ControlledTooltip id={'color-picker'} ref={ref} isOpen={v.isOpen}>
            <div className={
                'p-4 rounded-[16px] shadow-card flex flex-col items-center'
            }>
                <Picker color={color} onChange={setColor}/>

                <div>
                    <button className={
                        'as-button h-7 px-2 mr-2 rounded-[4px] border-[1px] border-primary bg-white text-primary'
                    } onClick={() => close(null)}>
                        Cancel
                    </button>

                    <button className={
                        'as-button h-7 px-2 rounded-[4px] bg-primary-button text-white'
                    } onClick={() => close(color)}>
                        Confirm
                    </button>
                </div>
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
    </>
}

export {
    Tooltips
}