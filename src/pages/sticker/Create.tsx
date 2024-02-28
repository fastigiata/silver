import type { ActionFunctionArgs } from 'react-router-dom'
import { useNavigate, useSubmit } from 'react-router-dom'
import { useState } from 'react'
import { InputMultiLine, InputSingleLine } from '@/components/Input.tsx'
import { PrimaryButton, SecondaryButton } from '@/components/Button.tsx'
import { StickerDB } from '@/db/sticker.ts'

type StickerCreateActionConfig = {
    title: string
    content?: string
}

const StickerCreatePage = () => {
    const submit = useSubmit()
    const navigate = useNavigate()
    const [ title, setTitle ] = useState('')
    const [ content, setContent ] = useState('')

    const handleSubmit = () => {
        submit(
            { title, content } as StickerCreateActionConfig,
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
                    New sticker
                </p>

                <InputSingleLine
                    className={'w-full h-12 px-3 bg-[#f7f7f7] rounded-[4px] focus:bg-[#f0f0f0] text-[14px]'}
                    placeholder={'Sticker Title'}
                    value={title} onChange={setTitle}/>

                <InputMultiLine
                    className={'w-full flex-1 p-3 bg-[#f7f7f7] rounded-[4px] focus:bg-[#f0f0f0] text-[14px]'}
                    placeholder={'Content (optional)'}
                    value={content} onChange={setContent}/>

                <div className={'w-full h-9 flex items-center justify-between space-x-2'}>
                    <SecondaryButton
                        className={'flex-1'} text={'Cancel'}
                        onClick={() => navigate('..', { replace: true })}/>
                    <PrimaryButton
                        className={'flex-1'} text={'Confirm'}
                        disabled={title.length === 0}
                        onClick={handleSubmit}/>
                </div>
            </div>
        </div>
    )
}

StickerCreatePage.action = async ({ request, params }: ActionFunctionArgs) => {
    const collectionId = params.collectionId as string
    const form: StickerCreateActionConfig = await request.json()

    await StickerDB.add(collectionId, form.title, form.content)

    // since we can't use `navigate(-1)` here, we have to use `history.back()` to go back
    history.back()

    // anyway, we have to return something even it makes no sense
    return null
}

export default StickerCreatePage