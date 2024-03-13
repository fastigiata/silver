import type { ActionFunctionArgs } from 'react-router-dom'
import { useNavigate, useSubmit } from 'react-router-dom'
import { useAsyncValue, useLoaderData } from 'react-router-dom'
import { DeferView } from '@/components/Loading.tsx'
import { CollectionDB } from '@/db/collection.ts'
import type { ICollection } from '@/_types/collection.ts'
import { CollectionCard } from '@/components/Card/CollectionCard.tsx'
import { AwesomeScrollbar } from '@/components/AwesomeScrollbar.tsx'
import { ModalImpl } from '@/utils/modal.ts'
import { formatToN } from '@/misc/helper.ts'

type DashboardLoaderData = {
    collection: Promise<ICollection[]>
}

type DashboardActionConfig = {
    id: string
}

const CollectionList = () => {
    const collections = useAsyncValue() as ICollection[]
    const navigate = useNavigate()
    const submit = useSubmit()

    const handleDelete = async (collection: ICollection) => {
        const ok = await ModalImpl.confirm({ content: `Are you sure to delete collection "${formatToN(collection.name, 10)}"?` })
        if (!ok) return

        submit(
            { id: collection.id } satisfies DashboardActionConfig,
            { method: 'DELETE', encType: 'application/json' }
        )
    }

    return collections.map(collection => {
        return <CollectionCard
            key={collection.id}
            collection={collection}
            onClick={() => navigate(`/collection/${collection.id}/view`)}
            onModify={() => navigate(`/collection/${collection.id}/modify`)}
            onDelete={() => handleDelete(collection)}/>
    })
}

/**
 * dashboard to manage all stickers
 */
const DashboardPage = () => {
    const loader = useLoaderData() as DashboardLoaderData
    const navigate = useNavigate()

    return (
        <AwesomeScrollbar className={'w-full h-full p-4 overflow-y-auto space-y-4 space-y-reverse'}>
            <DeferView
                source={loader.collection}
                builder={<CollectionList/>}
                slotBefore={
                    <div className={'w-full h-6 flex items-center'}>
                        <button className={
                            'as-button text-secondary text-[14px] font-secondary underline underline-offset-4'
                        } onClick={() => navigate('/collection/create')}>
                            New Collection
                        </button>
                    </div>
                }/>
        </AwesomeScrollbar>
    )
}

DashboardPage.loader = async () => {
    return { collection: CollectionDB.list() } satisfies DashboardLoaderData
}

DashboardPage.action = async ({ request }: ActionFunctionArgs) => {
    // currently only support DELETE, that is, remove collection by id
    if (request.method !== 'DELETE') return null

    const config: DashboardActionConfig = await request.json()
    await CollectionDB.remove(config.id)

    return null
}

export default DashboardPage