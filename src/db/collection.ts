import { nanoid } from 'nanoid'
import { dbImpl } from '@/db/base.ts'

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
            ctime: _now,
            mtime: _now
        })
        return _id
    }

    /**
     * update the collection with the given id
     */
    static async update(id: string, name?: string | null, desc?: string | null): Promise<boolean> {
        // filter out null or undefined (which represent no change)
        // use '!=' instead of '!==' to allow both null and undefined to pass

        const _tobe: { name?: string, desc?: string, mtime: number } = { mtime: Date.now() }
        // eslint-disable-next-line eqeqeq
        if (name != null) _tobe.name = name
        // eslint-disable-next-line eqeqeq
        if (desc != null) _tobe.desc = desc

        const _re = await dbImpl.collections.update(id, _tobe)
        return _re === 1
    }

    /**
     * remove the collection with the given id
     */
    static async remove(id: string): Promise<void> {
        await dbImpl.collections.delete(id)
    }
}

export {
    CollectionDB
}