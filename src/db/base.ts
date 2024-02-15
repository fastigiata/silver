import type { Table } from 'dexie'
import { Dexie } from 'dexie'
import type { ICollection } from '@/_types/collection.ts'
import type { ISticker } from '@/_types/sticker.ts'

class DBImpl extends Dexie {
    public collections!: Table<ICollection, string>
    public stickers!: Table<ISticker, string>

    constructor() {
        super('sticker.db')
        this.version(1)
            .stores({
                collections: 'id,ctime,mtime,name,desc',
                stickers: 'id,ctime,mtime,cid,name,desc'
            })
    }
}

const dbImpl = new DBImpl()

export {
    dbImpl
}