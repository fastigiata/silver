import { atom, useAtom } from 'jotai'
import type { CloseCallback } from '@/tooltips/shared.ts'

type ColorPickerConfig = [ defaultColor: string, withAlpha: boolean ]

/**
 * Internal use only.
 */
const ctx = atom<{
    anchorId: string | null
    config: ColorPickerConfig,
    closeCallback: CloseCallback<string | null> | null
}>({
    anchorId: null,
    config: [ '', false ],
    closeCallback: null
})

const useColorPicker = () => {
    const [ v, setV ] = useAtom(ctx)

    const open = (anchorId: string, config: ColorPickerConfig, closeCallback?: CloseCallback<string | null> | null) => {
        setV({ anchorId, config, closeCallback: closeCallback ?? null })
    }
    const close = (color: string | null) => {
        setV(prev => ({ ...prev, anchorId: null }))
        v.closeCallback?.(color)
    }

    return {
        isOpen: v.anchorId !== null,
        open,
        close,
        details: v
    }
}

export {
    useColorPicker
}