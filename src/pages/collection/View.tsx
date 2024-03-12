import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router-dom'
import { useLoaderData, useNavigate, useParams, useSubmit } from 'react-router-dom'
import { CollectionDB } from '@/db/collection.ts'
import { StickerDB } from '@/db/sticker.ts'
import type { ISticker } from '@/_types/sticker.ts'
import { DeferView } from '@/components/Loading.tsx'
import type { ICollection } from '@/_types/collection.ts'
import { ExceptionView } from '@/components/ExceptionView.tsx'
import { ActionButton } from '@/components/Button.tsx'
import { IconCreate, IconEdit } from '@/components/Icons.tsx'
import type { StickerAction } from '@/components/Card/StickerCard.tsx'
import { StickerCard } from '@/components/Card/StickerCard.tsx'
import { AwesomeScrollbar } from '@/components/AwesomeScrollbar.tsx'
import { ModalImpl } from '@/modal/modal_impl.ts'
import { formatToN } from '@/misc/helper.ts'

type CollectionViewLoaderData = {
    task: Promise<[ICollection | null, ISticker[]]>
}

type CollectionViewActionConfig = {
    stickerId: string
}

const Inner = ({ collection, stickers }: {
    collection: ICollection,
    stickers: ISticker[]
}) => {
    const params = useParams()
    const navigate = useNavigate()
    const submit = useSubmit()

    const handleCollectionNav = (to: 'create' | 'modify') => {
        navigate(`/collection/${params.collectionId}/${to}`)
    }

    const handleDelete = async (sticker: ISticker) => {
        const ok = await ModalImpl.confirm({ content: `Are you sure to delete sticker "${formatToN(sticker.title, 10)}"?` })
        if (!ok) return

        submit({ stickerId: sticker.id } satisfies  CollectionViewActionConfig, {
            method: 'DELETE',
            encType: 'application/json'
        })
    }

    const handleStickerAction = (sticker: ISticker, action: StickerAction) => {
        const stickerId = sticker.id

        switch (action) {
            case 'transfer':
                // TODO: navigate to transfer page
                console.log('TODO: navigate to transfer page')
                break
            case 'view':
                navigate(`/sticker/${stickerId}/view`)
                break
            case 'modify':
                navigate(`/sticker/${stickerId}/modify`)
                break
            case 'delete':
                handleDelete(sticker)
                break
            default:
                break
        }
    }

    return (
        <div className={'w-full h-full p-4 flex flex-col items-start justify-start'}>
            <div className={'w-full mb-2 flex'}>
                <div className={'flex-1 space-y-2'}>
                    <div
                        className={'w-fit border-b-[1px] border-b-primary text-primary text-[18px] leading-[24px] font-primary'}>
                        {collection.name}
                    </div>
                    <div
                        className={'w-fit border-b-[1px] border-b-secondary text-secondary text-[14px] leading-[20px] font-secondary'}>
                        {collection.desc}
                    </div>
                </div>
                <ActionButton
                    className={'ml-2 text-primary'} Icon={IconCreate}
                    onClick={() => handleCollectionNav('create')}/>
                <ActionButton
                    className={'ml-2 text-primary'} Icon={IconEdit}
                    onClick={() => handleCollectionNav('modify')}/>
            </div>
            <AwesomeScrollbar className={'w-full flex-1 pb-4'}>
                <div className={'sticker-card-wrapper w-full'}>
                    {
                        stickers.map(sticker => {
                            return <StickerCard
                                key={sticker.id} sticker={sticker}
                                onAction={action => handleStickerAction(sticker, action)}/>
                        })
                    }
                </div>
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
                    return <Inner collection={collection} stickers={stickers}/>
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

CollectionViewPage.action = async ({ params, request }: ActionFunctionArgs) => {
    const collectionId = params.collectionId!
    const { stickerId } = await request.json() as CollectionViewActionConfig

    await StickerDB.remove(collectionId, stickerId)
    return null
}

export default CollectionViewPage