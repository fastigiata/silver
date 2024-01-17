import type { StickerRecord } from '@/declaration'
import { LogicalSize, Window } from '@tauri-apps/api/window'

/**
 * Create a window according to the sticker record
 */
const createStickerWindow = (sticker: StickerRecord, hidden: boolean = false) => {
    return new Window(sticker.id, {
        title: sticker.title,
        width: sticker.pin?.size[0] || 300,
        height: sticker.pin?.size[1] || 200,
        decorations: false,
        transparent: true,
        resizable: true,
        skipTaskbar: true,
        center: true,
        visible: hidden,
        url: `/#/sticker/${sticker.id}`,
    })
}

/**
 * Reset the window to default size and position
 */
const resetToDefault = async (win: Window) => {
    await win.setSize(new LogicalSize(300, 200))
    await win.center()
}

/**
 * Reset the window to default size and position by sticker's id (which is also the window's label)
 *
 * @returns `true` if the window is found and reset, `false` otherwise
 */
const resetToDefaultById = async (id: string) => {
    const win = Window.getByLabel(id)
    if (!win) return false
    await resetToDefault(win)
    return true
}

export {
    createStickerWindow,
    resetToDefault,
    resetToDefaultById,
}