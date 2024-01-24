import { atom, useAtom } from 'jotai'
import type { CloseCallback } from '@/tooltips/shared.ts'

type ColorPickerConfig = [ defaultColor: string, withAlpha: boolean ]

/**
 * Internal use only.
 */
const ctx = atom<{
    isOpen: boolean,
    config: ColorPickerConfig,
    closeCallback: CloseCallback<string | null> | null
}>({
    isOpen: false,
    config: [ '', false ],
    closeCallback: null
})

const useColorPicker = () => {
    const [ v, setV ] = useAtom(ctx)

    const open = (config: ColorPickerConfig, closeCallback?: CloseCallback<string | null>) => {
        setV({ isOpen: true, config, closeCallback: closeCallback ?? null })
    }

    return {
        isOpen: v.isOpen,
        open,
    }
}


export {
    ctx,
    useColorPicker
}