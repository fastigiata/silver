import type { StickerRecord } from '../declaration'
import { createStickerWindow, resetToDefaultById } from './window.ts'

/**
 * Sticker manager
 */
abstract class StickerManager {
    /**
     * Show the sticker in separate window
     *
     * @returns `false` if the sticker-window is already existed, `true` otherwise
     */
    static async showExternal(sticker: StickerRecord) {
        if (sticker.pin) return false

        createStickerWindow(sticker)
        return true
    }

    /**
     * Reset the sticker-window to default size and position
     */
    static async resetToDefault(sticker: StickerRecord) {
        if (!sticker.pin) return false

        return await resetToDefaultById(sticker.id)
    }
}

export {
    StickerManager
}