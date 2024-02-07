import type { RecordMeta } from '@/_types/shared.ts'

/**
 * definition of a sticker
 */
interface ISticker extends RecordMeta {
    /**
     * title of the sticker
     */
    title: string
    /**
     * content of the sticker
     */
    content: string
}

export type {
    ISticker
}