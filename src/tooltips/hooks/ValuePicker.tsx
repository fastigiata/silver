import { atom, useAtom } from 'jotai'
import type { CloseCallback } from '@/tooltips/shared.ts'

type ValuePickerConfig = [ defaultValue: number, min: number, max: number, step?: number ]

/**
 * Internal use only.
 */
const ctx = atom<{
    anchorId: string | null
    config: ValuePickerConfig,
    closeCallback: CloseCallback<string | null> | null
}>({
    anchorId: null,
    config: [ 0, 0, 0, 1 ],
    closeCallback: null
})

const useValuePicker = () => {
    const [ v, setV ] = useAtom(ctx)

    const open = (anchorId: string, config: ValuePickerConfig, closeCallback?: CloseCallback<string | null> | null) => {
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
    ctx,
    useValuePicker
}