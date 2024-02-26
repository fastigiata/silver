import { nanoid } from 'nanoid'
import { dbImpl } from '@/db/base.ts'
import type { ISticker } from '@/_types/sticker.ts'

type StickerPatch = {
    cid?: string | null
    title?: string | null
    content?: string | null
}

abstract class StickerDB {
    /**
     * create a new sticker, return the id of the new sticker
     * @param cid id of the collection that the sticker belongs to
     * @param title title of the sticker
     * @param content content of the sticker
     */
    static async add(cid: string, title: string, content?: string): Promise<string> {
        const _id = nanoid()
        const _now = Date.now()
        await dbImpl.stickers.add({
            id: _id,
            cid: cid,
            title: title,
            content: content ?? '',
            ctime: _now,
            mtime: _now
        })
        return _id
    }

    /**
     * remove the sticker with the given id
     */
    static async remove(id: string): Promise<void> {
        return dbImpl.stickers.delete(id)
    }

    /**
     * list all stickers in the collection with the given id
     */
    static async list(cid: string): Promise<ISticker[]> {
        return dbImpl.stickers
            .where('cid').equals(cid)
            .toArray(arr => arr.sort((a, b) => b.mtime - a.mtime))
    }

    /**
     * update the sticker with the given id
     */
    static async update(id: string, tobe: StickerPatch): Promise<boolean> {
        // eslint-disable-next-line eqeqeq
        if (tobe.title == null) delete tobe.title
        // eslint-disable-next-line eqeqeq
        if (tobe.content == null) delete tobe.content
        // eslint-disable-next-line eqeqeq
        if (tobe.cid == null) delete tobe.cid

        const _re = await dbImpl.stickers.update(id, { ...tobe, mtime: Date.now() })
        return _re === 1
    }
}

export {
    StickerDB
}