import { useEffect, useRef, useState } from 'react'
import type { TooltipRefProps } from 'react-tooltip'
import { ControlledTooltip } from '@/tooltips/ControlledTooltip.tsx'
import { HexAlphaColorPicker, HexColorPicker } from 'react-colorful'
import { useColorPicker } from '@/tooltips/ColorPicker.tsx'

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

                <div className={'w-full flex items-center justify-between'}>
                    <button className={
                        'as-button w-20 h-7 px-2 mr-2 rounded-[4px] border-[1px] border-primary bg-white text-primary'
                    } onClick={() => close(null)}>
                        Cancel
                    </button>

                    <button className={
                        'as-button w-20 h-7 px-2 rounded-[4px] bg-primary-button text-white'
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