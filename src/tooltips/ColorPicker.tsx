import type { TooltipRefProps } from 'react-tooltip'
import { Tooltip } from 'react-tooltip'
import { useRef, useState } from 'react'
import { HexAlphaColorPicker, HexColorPicker } from 'react-colorful'

const Picker = ({ defaultColor, withAlpha, onCancel, onConfirm }: {
    defaultColor: string
    withAlpha: boolean
    onCancel: VoidFunction
    onConfirm: (color: string) => void
}) => {
    const ColorPicker = withAlpha ? HexAlphaColorPicker : HexColorPicker
    const [ color, setColor ] = useState<string>(defaultColor)

    return (
        <div className={
            'p-4 rounded-[16px] shadow-card flex flex-col items-center'
        }>
            <ColorPicker color={color} onChange={setColor}/>

            <div>
                <button className={
                    'as-button h-7 px-2 mr-2 rounded-[4px] border-[1px] border-primary bg-white text-primary'
                } onClick={() => onCancel()}>
                    Cancel
                </button>

                <button className={
                    'as-button h-7 px-2 rounded-[4px] bg-primary-button text-white'
                } onClick={() => onConfirm(color)}>
                    Confirm
                </button>
            </div>
        </div>
    )
}

const ColorPicker = () => {
    const ref = useRef<TooltipRefProps>(null)

    return (
        <Tooltip
            ref={ref}
            id={'tooltip-color-picker'}
            clickable openOnClick
            style={{
                zIndex: 10,
                padding: 0,
                backgroundColor: '#FFFFFF',
            }}
            opacity={1}
            render={({ content }) => {
                if (!content) return null

                const { reset, alpha } = JSON.parse(content)
                console.log(reset)
                return (
                    <Picker
                        defaultColor={reset} withAlpha={alpha}
                        onCancel={() => ref.current?.close}
                        onConfirm={(color) => {
                            console.log('color', color)
                        }}/>
                )
            }}/>
    )
}

export {
    ColorPicker
}