import type { ActionFunctionArgs } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useFetcher } from 'react-router-dom'
import { InputMultiLine, InputSingleLine } from '@/components/Input.tsx'
import { useState } from 'react'
import { PrimaryButton, SecondaryButton } from '@/components/Button.tsx'

type CollectionCreateActionConfig = {
    name: string
    desc: string
}

const CollectionCreatePage = () => {
    const navigate = useNavigate()
    const fetcher = useFetcher()
    const [ name, setName ] = useState('')
    const [ desc, setDesc ] = useState('')

    const handleSubmit = () => {
        fetcher.submit(
            { name, desc } satisfies CollectionCreateActionConfig,
            { method: 'POST', encType: 'application/json' }
        )
    }

    return (
        <div className={'w-full h-full flex items-center justify-center'}>
            <div className={
                'w-[400px] h-[400px] p-5 bg-white rounded-[4px] shadow-card ' +
                'flex flex-col items-center space-y-4'
            }>
                <p className={'h-[24px] text-primary text-[18px] font-primary'}>
                    Create Collection
                </p>

                <InputSingleLine
                    className={'w-full h-12 px-3 bg-[#f7f7f7] rounded-[4px] focus:bg-[#f0f0f0]'}
                    placeholder={'Collection Name'}
                    value={name} onChange={setName}/>

                <InputMultiLine
                    className={'w-full flex-1 p-3 bg-[#f7f7f7] rounded-[4px] focus:bg-[#f0f0f0]'}
                    placeholder={'Description'}
                    value={desc} onChange={setDesc}/>

                <div className={'w-full h-9 flex items-center justify-between space-x-2'}>
                    <SecondaryButton className={'flex-1'} text={'Cancel'} onClick={() => navigate(-1)}/>
                    <PrimaryButton className={'flex-1'} text={'Confirm'} onClick={handleSubmit}/>
                </div>
            </div>
        </div>
    )
}

CollectionCreatePage.action = async ({ request }: ActionFunctionArgs) => {
    const form: CollectionCreateActionConfig = await request.json()

    // TODO: to be implemented
    console.log('CollectionCreatePage.action', form)
    return null
}

export default CollectionCreatePage