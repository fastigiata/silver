import { Suspense } from 'react'
import { Await, defer, useAsyncValue, useLoaderData } from 'react-router-dom'
import { Loading } from '@/components/Loading.tsx'
import { CollectionDB } from '@/db/collection.ts'
import type { ICollection } from '@/_types/collection.ts'
import { CollectionCard } from '@/components/Card/CollectionCard.tsx'
import { AwesomeScrollbar } from '@/components/AwesomeScrollbar.tsx'

type Loader = {
    collection: Promise<ICollection[]>
}

const CollectionList = () => {
    const collections = useAsyncValue() as ICollection[]

    return collections.map(collection => {
        return <CollectionCard key={collection.id} className={'my-4'} {...collection}/>
    })
}

/**
 * dashboard to manage all stickers
 */
const DashboardPage = () => {
    const loader = useLoaderData() as Loader

    const handleCreate = () => {
        // TODO: create new collection
        console.log('TODO')
    }

    return (
        <AwesomeScrollbar className={'w-full h-full p-4 overflow-y-auto'}>
            <Suspense fallback={<Loading/>}>
                <div className={'w-full h-6 flex items-center'}>
                    <button className={
                        'as-button text-secondary text-[14px] font-secondary underline underline-offset-4'
                    } onClick={handleCreate}>
                        New Collection
                    </button>
                </div>
                <Await resolve={loader.collection}>
                    <CollectionList/>
                </Await>
            </Suspense>
        </AwesomeScrollbar>
    )
}

DashboardPage.loader = async () => {
    return defer({ collection: CollectionDB.list() } satisfies Loader)
}

export default DashboardPage