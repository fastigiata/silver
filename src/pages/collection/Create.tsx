import type { ActionFunctionArgs } from 'react-router-dom'
import { useNavigate, useSubmit } from 'react-router-dom'
import { InputMultiLine, InputSingleLine } from '@/components/Input.tsx'
import { useState } from 'react'
import { PrimaryButton, SecondaryButton } from '@/components/Button.tsx'
import { CollectionDB } from '@/db/collection.ts'

type CollectionCreateActionConfig = {
    name: string
    desc: string
}

const CollectionCreatePage = () => {
    const submit = useSubmit()
    const navigate = useNavigate()
    const [ name, setName ] = useState('')
    const [ desc, setDesc ] = useState('')

    const handleSubmit = () => {
        submit(
            { name, desc } satisfies CollectionCreateActionConfig,
            { method: 'POST', encType: 'application/json' }
        )
    }

    return (
        <div className={'w-full h-full flex items-center justify-center'}>
            <div className={
                'scale-in w-[400px] h-[400px] p-5 bg-white rounded-[4px] shadow-card ' +
                'flex flex-col items-center space-y-4'
            }>
                <p className={'h-6 text-primary text-[18px] font-primary'}>
                    New collection
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
        </div>
    )
}

CollectionCreatePage.action = async ({ request }: ActionFunctionArgs) => {
    const form: CollectionCreateActionConfig = await request.json()

    await CollectionDB.add(form.name, form.desc)

    // since we can't use `navigate(-1)` here, we have to use `history.back()` to go back
    history.back()

    // anyway, we have to return something even it makes no sense
    return null
}

export default CollectionCreatePage