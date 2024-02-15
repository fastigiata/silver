import type { RecordMeta } from '@/_types/shared.ts'

/**
 * definition of a sticker
 */
interface ISticker extends RecordMeta {
    /**
     * id of the collection that the sticker belongs to
     */
    cid: string
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