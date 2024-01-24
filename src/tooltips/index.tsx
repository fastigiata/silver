import { useRef, useState } from 'react'
import type { TooltipRefProps } from 'react-tooltip'
import { ControlledTooltip } from '@/tooltips/ControlledTooltip.tsx'
import { HexAlphaColorPicker, HexColorPicker } from 'react-colorful'
import { useColorPicker } from '@/tooltips/ColorPicker.tsx'

const ColorPicker = () => {
    const ref = useRef<TooltipRefProps>(null)
    const { isOpen, open, close, details } = useColorPicker()

    const Picker = details.config[1] ? HexAlphaColorPicker : HexColorPicker
    const [ color, setColor ] = useState<string>(details.config[0])

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