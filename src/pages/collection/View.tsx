import type { LoaderFunctionArgs } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'
import { CollectionDB } from '@/db/collection.ts'
import { StickerDB } from '@/db/sticker.ts'
import type { ISticker } from '@/_types/sticker.ts'
import { DeferView } from '@/components/Loading.tsx'

type CollectionViewLoaderData = {
    collection: Promise<number>
    sticker: Promise<ISticker[]>
}

const CollectionViewPage = () => {
    const loader = useLoaderData() as CollectionViewLoaderData

    return (
        <div>
            <h1>Collection View</h1>
            <DeferView source={loader.collection} builder={(n) => <p>{n}</p>}/>
        </div>
    )
}

CollectionViewPage.loader = async ({ params }: LoaderFunctionArgs) => {
    const collectionId = params.collectionId!

    return {
        collection: CollectionDB.count(collectionId),
        sticker: StickerDB.list(collectionId),
    } satisfies CollectionViewLoaderData
}

export default CollectionViewPage