import { atom, useAtom } from 'jotai'
import type { CloseCallback } from '@/tooltips/shared.ts'

type EnumPickerConfig = [ defaultPick: string, values: string[] ]

/**
 * Internal use only.
 */
const ctx = atom<{
    anchorId: string | null
    config: EnumPickerConfig,
    closeCallback: CloseCallback<string | null> | null
}>({
    anchorId: null,
    config: [ '', [] ],
    closeCallback: null
})

const useEnumPicker = () => {
    const [ v, setV ] = useAtom(ctx)

    const open = (anchorId: string, config: EnumPickerConfig, closeCallback?: CloseCallback<string | null> | null) => {
        setV({ anchorId, config, closeCallback: closeCallback ?? null })
    }
    const close = (pick: string | null) => {
        setV(prev => ({ ...prev, anchorId: null }))
        v.closeCallback?.(pick)
    }

    return {
        isOpen: v.anchorId !== null,
        open,
        close,
        details: v
    }
}

export {
    useEnumPicker
}