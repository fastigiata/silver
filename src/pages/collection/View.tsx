import type { LoaderFunctionArgs } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'
import { CollectionDB } from '@/db/collection.ts'
import { StickerDB } from '@/db/sticker.ts'
import type { ISticker } from '@/_types/sticker.ts'
import { DeferView } from '@/components/Loading.tsx'
import { AwesomeScrollbar } from '@/components/AwesomeScrollbar'
import type { ICollection } from '@/_types/collection.ts'
import { ExceptionView } from '@/components/ExceptionView.tsx'
import { CollectionCard } from '@/components/Card/CollectionCard.tsx'

type CollectionViewLoaderData = {
    task: Promise<[ ICollection | null, ISticker[] ]>
}

const ViewView = ({ collection, stickers }: {
    collection: ICollection,
    stickers: ISticker[]
}) => {
    // TODO: implement the view of a collection
    return (
        <div className={'w-full h-full'}>
            <CollectionCard collection={collection}/>
            <AwesomeScrollbar>
                // TODO: sticker list
            </AwesomeScrollbar>
        </div>
    )
}

const CollectionViewPage = () => {
    const loader = useLoaderData() as CollectionViewLoaderData

    return (
        <div className={'w-full h-full flex items-center justify-center'}>
            <DeferView
                source={loader.task}
                builder={([ collection, stickers ]) => {
                    if (!collection) {
                        return <ExceptionView text={
                            'Failed to load collection data, or it does not exist.'
                        }/>
                    }
                    return <ViewView collection={collection} stickers={stickers}/>
                }}/>
        </div>
    )
}

CollectionViewPage.loader = async ({ params }: LoaderFunctionArgs) => {
    const collectionId = params.collectionId!

    const task = Promise.all([
        CollectionDB.get(collectionId),
        StickerDB.list(collectionId)
    ])

    return { task } satisfies CollectionViewLoaderData
}

export default CollectionViewPage