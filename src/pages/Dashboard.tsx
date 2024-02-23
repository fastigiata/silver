import { Suspense } from 'react'
import { Await, defer, useAsyncValue, useLoaderData } from 'react-router-dom'
import { Loading } from '@/components/Loading.tsx'
import { CollectionDB } from '@/db/collection.ts'
import type { ICollection } from '@/_types/collection.ts'
import { CollectionCard } from '@/components/Card/CollectionCard.tsx'

type Loader = {
    collection: Promise<ICollection[]>
}

const CollectionList = () => {
    const collections = useAsyncValue() as ICollection[]

    return collections.map(collection => {
        return <CollectionCard key={collection.id} {...collection}/>
    })
}

/**
 * dashboard to manage all stickers
 */
const DashboardPage = () => {
    const loader = useLoaderData() as Loader

    return (
        <div className={'w-full h-full p-4'}>
            <Suspense fallback={<Loading/>}>
                <Await resolve={loader.collection}>
                    <CollectionList/>
                </Await>
            </Suspense>
        </div>
    )
}

DashboardPage.loader = async () => {
    return defer({ collection: CollectionDB.list() } satisfies Loader)
}

export default DashboardPage