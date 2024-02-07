import type { RecordMeta } from '@/_types/shared.ts'

/**
 * definition of a collection
 */
interface ICollection extends RecordMeta {
    /**
     * name of the collection
     */
    name: string
    /**
     * description of the collection
     */
    desc: string
}

export type {
    ICollection
}