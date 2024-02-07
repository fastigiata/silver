import { atom, useAtom } from 'jotai/index'

// region picker configs

export type ColorPickerConfig = [defaultColor: string, withAlpha: boolean]
export type EnumPickerConfig = [defaultPick: string, values: string[]]
export type ValuePickerConfig = [defaultValue: number, min: number, max: number, step?: number]

export type PickerConfig = { type: 'color', config: ColorPickerConfig }
    | { type: 'enum', config: EnumPickerConfig }
    | { type: 'value', config: ValuePickerConfig }
type SupportedPickerType = PickerConfig['type']
type SpecificPickerConfig<Type> = Extract<PickerConfig, { type: Type }>['config']
// endregion

// region picker state manage
type CloseCallback = (arg: string | null) => void
type PickerState = {
    anchorId: string | null
    config: PickerConfig | null
    closeCallback: CloseCallback | null
}

const pickerState = atom<PickerState>({
    anchorId: null,
    config: null,
    closeCallback: null
})
// endregion

// region picker hooks
const usePicker = <T extends SupportedPickerType>(type: T) => {
    const [ v, setV ] = useAtom(pickerState)

    const open = (anchorId: string, config: SpecificPickerConfig<T>, closeCallback?: CloseCallback | null) => {
        setV({ anchorId, config: { type, config } as PickerConfig, closeCallback: closeCallback ?? null })
    }
    const close = (value: string | null) => {
        setV(prev => ({ ...prev, anchorId: null }))
        v.closeCallback?.(value)
    }

    return {
        isOpen: v.anchorId !== null,
        open,
        close,
        details: v
    }
}
// endregion

export {
    pickerState,
    usePicker
}