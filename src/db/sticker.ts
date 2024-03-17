import { nanoid } from 'nanoid'
import { dbImpl } from '@/db/base.ts'
import type { ISticker } from '@/_types/sticker.ts'

export type StickerPatch = {
    title?: string | null
    content?: string | null
    alarm?: number | null
    theme?: number | null
}

abstract class StickerDB {
    /**
     * create a new sticker, return the id of the new sticker
     */
    static async add(sticker: {
        cid: string,
        title: string,
        content?: string,
        alarm?: number | null,
        theme: number
    }): Promise<string> {
        return dbImpl.transaction(
            'rw',
            [ dbImpl.collections, dbImpl.stickers ],
            async () => {
                const _id = nanoid()
                const _now = Date.now()

                // 1. create the sticker
                await dbImpl.stickers.add({
                    id: _id,
                    cid: sticker.cid,
                    title: sticker.title,
                    content: sticker.content ?? '',
                    alarm: sticker.alarm,
                    theme: sticker.theme,
                    ctime: _now,
                    mtime: _now
                })

                // 2. update the count of the collection
                const _count = await dbImpl.stickers.where('cid').equals(sticker.cid).count()
                await dbImpl.collections.update(sticker.cid, { count: _count })

                return _id
            }
        )
    }

    /**
     * remove the sticker with the given id
     */
    static async remove(cid: string, id: string): Promise<void> {
        return dbImpl.transaction(
            'rw',
            [ dbImpl.collections, dbImpl.stickers ],
            async () => {
                // 1. delete the target sticker
                await dbImpl.stickers.delete(id)
                // 2. update the collection's count
                const _count = await dbImpl.stickers.where('cid').equals(cid).count()
                await dbImpl.collections.update(cid, { count: _count })
            }
        )
    }

    /**
     * list all stickers in the collection with the given id
     */
    static async getByCid(cid: string): Promise<ISticker[]> {
        return dbImpl.stickers
            .where('cid').equals(cid)
            .toArray(arr => arr.sort((a, b) => b.mtime - a.mtime))
    }

    /**
     * update the sticker with the given id
     *
     * this does not change the 'cid' field, see {@link StickerDB.transfer} for that
     */
    static async update(id: string, tobe: StickerPatch): Promise<boolean> {
        // eslint-disable-next-line eqeqeq
        if (tobe.title == null) delete tobe.title
        // eslint-disable-next-line eqeqeq
        if (tobe.content == null) delete tobe.content
        // eslint-disable-next-line eqeqeq
        if (tobe.alarm == null) delete tobe.alarm
        // eslint-disable-next-line eqeqeq
        if (tobe.theme == null) delete tobe.theme

        const _re = await dbImpl.stickers.update(id, { ...tobe, mtime: Date.now() })
        return _re === 1
    }

    /**
     * transfer the sticker with the given id
     * from the collection now to the collection with the given id `to`
     */
    static async transfer(id: string, to: string): Promise<boolean> {
        return dbImpl.transaction(
            'rw',
            [ dbImpl.collections, dbImpl.stickers ],
            async () => {
                const _old = await dbImpl.stickers.get(id)
                if (!_old) return false

                // 1. update the sticker
                const _re = await dbImpl.stickers.update(id, { cid: to, mtime: Date.now() })

                // 2. update the count of the old collection and the new collection
                const _count1 = await dbImpl.stickers.where('cid').equals(_old.cid).count()
                await dbImpl.collections.update(_old.cid, { count: _count1 })
                const _count2 = await dbImpl.stickers.where('cid').equals(to).count()
                await dbImpl.collections.update(to, { count: _count2 })

                // return true if the update is successful
                return _re === 1
            }
        )
    }

    /**
     * get the sticker with the given id
     */
    static async getById(id: string): Promise<ISticker | null> {
        const sticker = await dbImpl.stickers.get(id)
        return sticker ?? null
    }

    /**
     * get the stickers with the given ids
     */
    static async getByIds(ids: string[]): Promise<ISticker[]> {
        return dbImpl.stickers.where('id').anyOf(ids).toArray()
    }

    /**
     * get the stickers with the given cids
     */
    static async getByCids(cids: string[]): Promise<ISticker[]> {
        return dbImpl.stickers.where('cid').anyOf(cids).toArray()
    }
}

export {
    StickerDB
}