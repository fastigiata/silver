import type { LoaderFunctionArgs } from 'react-router-dom'
import { useLoaderData, useNavigate, useSubmit } from 'react-router-dom'
import type { CollectionPatch } from '@/db/collection.ts'
import { CollectionDB } from '@/db/collection.ts'
import type { ICollection } from '@/_types/collection.ts'
import { InputMultiLine, InputSingleLine } from '@/components/Input.tsx'
import { PrimaryButton, SecondaryButton } from '@/components/Button.tsx'
import { DeferView } from '@/components/Loading.tsx'
import { useState } from 'react'
import { ExceptionView } from '@/components/ExceptionView.tsx'

type CollectionModifyLoaderData = {
    collection: Promise<ICollection | null>
}

const ModifyView = ({ collection }: { collection: ICollection }) => {
    const submit = useSubmit()
    const navigate = useNavigate()

    const [ name, setName ] = useState(collection.name)
    const [ desc, setDesc ] = useState(collection.desc)

    const handleSubmit = () => {
        submit(
            { name, desc } satisfies CollectionPatch,
            { method: 'PUT', encType: 'application/json' }
        )
    }

    return (
        <div className={
            'w-[400px] h-[400px] p-5 bg-white rounded-[4px] shadow-card ' +
            'flex flex-col items-center space-y-4'
        }>
            <p className={'h-6 text-primary text-[18px] font-primary'}>
                Modify collection
            </p>

            <InputSingleLine
                autoFocus={true}
                className={'w-full h-12 px-3 bg-[#f7f7f7] rounded-[4px] focus:bg-[#f0f0f0] text-[14px]'}
                placeholder={'Collection Name'}
                value={name} onChange={setName}/>

            <InputMultiLine
                className={'w-full flex-1 p-3 bg-[#f7f7f7] rounded-[4px] focus:bg-[#f0f0f0] text-[14px]'}
                placeholder={'Description (optional)'}
                value={desc} onChange={setDesc}/>

            <div className={'w-full h-9 flex items-center justify-between space-x-2'}>
                <SecondaryButton
                    className={'flex-1'} text={'Cancel'}
                    onClick={() => navigate(-1)}/>
                <PrimaryButton
                    className={'flex-1'} text={'Confirm'}
                    disabled={name.length === 0}
                    onClick={handleSubmit}/>
            </div>
        </div>
    )
}

const CollectionModifyPage = () => {
    const loader = useLoaderData() as CollectionModifyLoaderData

    return (
        <div className={'w-full h-full flex items-center justify-center'}>
            <DeferView
                source={loader.collection}
                builder={collection => {
                    if (!collection) {
                        return <ExceptionView text={
                            'Failed to load collection data, or it does not exist.'
                        }/>
                    }
                    return <ModifyView collection={collection}/>
                }}/>
        </div>
    )
}

CollectionModifyPage.loader = ({ params }: LoaderFunctionArgs) => {
    return { collection: CollectionDB.getById(params.collectionId!) }
}

CollectionModifyPage.action = async ({ request, params }: LoaderFunctionArgs) => {
    const patch = await request.json() as CollectionPatch
    const ok = await CollectionDB.update(params.collectionId!, patch)

    // if success, go back to previous page
    if (ok) history.back()

    return null
}

export default CollectionModifyPage