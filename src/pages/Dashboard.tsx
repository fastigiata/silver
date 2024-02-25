import { Suspense } from 'react'
import type { ActionFunctionArgs } from 'react-router-dom'
import { Await, useAsyncValue, useFetcher, useLoaderData } from 'react-router-dom'
import { Loading } from '@/components/Loading.tsx'
import { CollectionDB } from '@/db/collection.ts'
import type { ICollection } from '@/_types/collection.ts'
import { CollectionCard } from '@/components/Card/CollectionCard.tsx'
import { AwesomeScrollbar } from '@/components/AwesomeScrollbar.tsx'
import { logImpl } from '@/platform_impl/log.ts'

type LoaderData = {
    collection: Promise<ICollection[]>
}

type ActionConfig = {
    op: 'add',
    name: string,
    desc?: string
} | { op: 'remove', id: string }

const CollectionList = () => {
    const collections = useAsyncValue() as ICollection[]
    const fetcher = useFetcher()

    return collections.map(collection => {
        return <CollectionCard
            key={collection.id}
            className={'my-4'}
            collection={collection}
            onDelete={() => {
                fetcher.submit(
                    { op: 'remove', id: collection.id } satisfies ActionConfig,
                    { method: 'POST', encType: 'application/json' }
                )
            }}/>
    })
}

/**
 * dashboard to manage all stickers
 */
const DashboardPage = () => {
    const loader = useLoaderData() as LoaderData
    const fetcher = useFetcher()

    const handleCreate = () => {
        // TODO: create new collection with name and desc
        fetcher.submit(
            {
                op: 'add',
                name: 'New Collection',
                desc: 'new template collection with default name and desc'
            } satisfies ActionConfig,
            { method: 'POST', encType: 'application/json' }
        )
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
    return {
        collection: CollectionDB.list()
    } satisfies LoaderData
}

DashboardPage.action = async ({ request }: ActionFunctionArgs) => {
    const config: ActionConfig = await request.json()

    switch (config.op) {
        case 'add':
            await CollectionDB.add(config.name, config.desc)
            break
        case 'remove':
            await CollectionDB.remove(config.id)
            break
        default:
            logImpl.fatal(`DashboardPage.action invalid action: ${JSON.stringify(config)}`)
            break
    }

    return null
}

export default DashboardPage