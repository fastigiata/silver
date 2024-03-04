import { nanoid } from 'nanoid'
import { dbImpl } from '@/db/base.ts'
import type { ISticker } from '@/_types/sticker.ts'

type StickerPatch = {
    cid?: string | null
    title?: string | null
    content?: string | null
    alarm?: number | null
}

abstract class StickerDB {
    /**
     * create a new sticker, return the id of the new sticker
     */
    static async add(cid: string, title: string, content?: string, alarm?: number): Promise<string> {
        const _id = nanoid()
        const _now = Date.now()
        await dbImpl.stickers.add({
            id: _id,
            cid: cid,
            title: title,
            content: content ?? '',
            alarm: alarm,
            ctime: _now,
            mtime: _now
        })
        return _id
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
                dbImpl.collections.update(cid, { count: _count })
            }
        )
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
        // eslint-disable-next-line eqeqeq
        if (tobe.alarm == null) delete tobe.alarm

        // if the 'cid' field is updated,
        // we need to update the 'count' field of the collection as well
        if (!!tobe.cid) {
            return dbImpl.transaction(
                'rw',
                [ dbImpl.collections, dbImpl.stickers ],
                async () => {
                    const _old = await dbImpl.stickers.get(id)
                    if (!_old) return false

                    // 1. update the sticker
                    const _re = await dbImpl.stickers.update(id, { ...tobe, mtime: Date.now() })

                    // 2. update the count of the old collection and the new collection
                    const _count1 = await dbImpl.stickers.where('cid').equals(_old.cid).count()
                    await dbImpl.collections.update(_old.cid, { count: _count1 })
                    const _count2 = await dbImpl.stickers.where('cid').equals(tobe.cid!).count()
                    await dbImpl.collections.update(tobe.cid!, { count: _count2 })

                    // return true if the update is successful
                    return _re === 1
                }
            )
        } else {
            const _re = await dbImpl.stickers.update(id, { ...tobe, mtime: Date.now() })
            return _re === 1
        }
    }
}

export {
    StickerDB
}