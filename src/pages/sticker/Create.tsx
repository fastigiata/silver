import type { ActionFunctionArgs } from 'react-router-dom'
import { useNavigate, useSubmit } from 'react-router-dom'
import { useState } from 'react'
import { InputMultiLine, InputSingleLine } from '@/components/Input.tsx'
import { PrimaryButton, SecondaryButton } from '@/components/Button.tsx'
import { StickerDB } from '@/db/sticker.ts'
import { DateTimePicker } from '@/components/DateTimePicker.tsx'
import { IconCheck } from '@/components/Icons.tsx'

type StickerCreateActionConfig = {
    title: string
    content?: string
    alarm?: number | null
    theme: number
}

const StickerCreatePage = () => {
    const submit = useSubmit()
    const navigate = useNavigate()
    const [ title, setTitle ] = useState('')
    const [ content, setContent ] = useState('')
    const [ alarm, setAlarm ] = useState<Date | null>(null)
    const [ theme, setTheme ] = useState(0)

    const handleSubmit = () => {
        submit(
            { title, content, alarm: alarm?.getTime() ?? null, theme } satisfies StickerCreateActionConfig,
            { method: 'POST', encType: 'application/json' }
        )
    }

    return (
        <div className={'w-full h-full flex items-center justify-center'}>
            <div className={
                'w-[400px] h-[400px] p-5 bg-white rounded-[4px] shadow-card ' +
                'flex flex-col items-center space-y-2'
            }>
                <p className={'h-6 text-primary text-[18px] font-primary'}>
                    New sticker
                </p>

                <InputSingleLine
                    autoFocus={true}
                    className={'w-full h-12 px-3 bg-[#f7f7f7] rounded-[4px] focus:bg-[#f0f0f0] text-[14px]'}
                    placeholder={'Sticker Title'}
                    value={title} onChange={setTitle}/>

                <InputMultiLine
                    className={'w-full flex-1 p-3 bg-[#f7f7f7] rounded-[4px] focus:bg-[#f0f0f0] text-[14px]'}
                    placeholder={'Content (optional)'}
                    value={content} onChange={setContent}/>

                <DateTimePicker
                    className={'w-full h-12 px-3 bg-[#f7f7f7] rounded-[4px] text-[14px]'}
                    placeholder={'Alarm (optional)'}
                    onSelected={setAlarm}/>

                <div className={'w-full h-12 flex items-center justify-between'}>
                    <div className={'text-secondary font-secondary'}>Theme</div>
                    <button className={
                        'w-6 h-6 rounded-full bg-psbg0 flex items-center justify-center'
                    } onClick={() => setTheme(0)}>
                        {theme === 0 ? <IconCheck className={'text-ps0 text-[14px]'}/> : null}
                    </button>
                    <button className={
                        'w-6 h-6 rounded-full bg-psbg1 flex items-center justify-center'
                    } onClick={() => setTheme(1)}>
                        {theme === 1 ? <IconCheck className={'text-ps1 text-[14px]'}/> : null}
                    </button>
                    <button className={
                        'w-6 h-6 rounded-full bg-psbg2 flex items-center justify-center'
                    } onClick={() => setTheme(2)}>
                        {theme === 2 ? <IconCheck className={'text-ps2 text-[14px]'}/> : null}
                    </button>
                    <button className={
                        'w-6 h-6 rounded-full bg-psbg3 flex items-center justify-center'
                    } onClick={() => setTheme(3)}>
                        {theme === 3 ? <IconCheck className={'text-ps3 text-[14px]'}/> : null}
                    </button>
                    <button className={
                        'w-6 h-6 rounded-full bg-psbg4 flex items-center justify-center'
                    } onClick={() => setTheme(4)}>
                        {theme === 4 ? <IconCheck className={'text-ps4 text-[14px]'}/> : null}
                    </button>
                    <button className={
                        'w-6 h-6 rounded-full bg-psbg5 flex items-center justify-center'
                    } onClick={() => setTheme(5)}>
                        {theme === 5 ? <IconCheck className={'text-ps5 text-[14px]'}/> : null}
                    </button>
                </div>

                <div className={'w-full h-9 flex items-center justify-between space-x-2'}>
                    <SecondaryButton
                        className={'flex-1'} text={'Cancel'}
                        onClick={() => navigate(-1)}/>
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

    await StickerDB.add({ cid: collectionId, ...form })

    // since we can't use `navigate(-1)` here, we have to use `history.back()` to go back
    history.back()

    // anyway, we have to return something even it makes no sense
    return null
}

export default StickerCreatePage