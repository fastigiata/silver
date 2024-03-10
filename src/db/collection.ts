import { nanoid } from 'nanoid'
import { dbImpl } from '@/db/base.ts'
import type { ICollection } from '@/_types/collection.ts'

export type CollectionPatch = {
    name?: string | null
    desc?: string | null
}

abstract class CollectionDB {
    /**
     * create a new collection, return the id of the new collection
     * @param name name of the collection (required)
     * @param desc description of the collection (optional)
     */
    static async add(name: string, desc?: string): Promise<string> {
        const _id = nanoid()
        const _now = Date.now()
        await dbImpl.collections.add({
            id: _id,
            name: name,
            desc: desc ?? '',
            count: 0,
            ctime: _now,
            mtime: _now
        })
        return _id
    }

    /**
     * remove the collection with the given id
     * @return {number} the number of stickers removed
     */
    static async remove(id: string): Promise<number> {
        return dbImpl.transaction(
            'rw',
            [ dbImpl.stickers, dbImpl.collections ],
            async () => {
                await dbImpl.collections.delete(id)
                return dbImpl.stickers.where('cid').equals(id).delete()
            }
        )
    }

    /**
     * list all collections in the database
     */
    static async list(): Promise<ICollection[]> {
        return dbImpl.collections
            .toArray(arr => arr.sort((a, b) => b.mtime - a.mtime))
    }

    /**
     * update the collection with the given id
     * @return {boolean} true if the collection is updated, false otherwise
     */
    static async update(id: string, tobe: CollectionPatch): Promise<boolean> {
        // eslint-disable-next-line eqeqeq
        if (tobe.name == null) delete tobe.name
        // eslint-disable-next-line eqeqeq
        if (tobe.desc == null) delete tobe.desc

        const _re = await dbImpl.collections.update(id, { ...tobe, mtime: Date.now() })
        return _re === 1
    }

    /**
     * get the collection with the given id
     */
    static async get(id: string): Promise<ICollection | null> {
        const collection = await dbImpl.collections.get(id)
        return collection ?? null
    }

    /**
     * count the number of stickers in the collection
     * @return {number} the number of stickers in the collection
     */
    static async recount(id: string): Promise<number> {
        return dbImpl.transaction(
            'rw',
            [ dbImpl.stickers, dbImpl.collections ],
            async () => {
                const _count = await dbImpl.stickers.where('cid').equals(id).count()
                await dbImpl.collections.update(id, { count: _count, mtime: Date.now() })
                return _count
            }
        )
    }
}

export {
    CollectionDB
}