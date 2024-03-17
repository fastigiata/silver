import type { LoaderFunctionArgs } from 'react-router-dom'
import type { StickerPatch } from '@/db/sticker.ts'
import { StickerDB } from '@/db/sticker.ts'
import { useLoaderData, useNavigate, useSubmit } from 'react-router-dom'
import { DeferView } from '@/components/Loading.tsx'
import { ExceptionView } from '@/components/ExceptionView.tsx'
import type { ISticker } from '@/_types/sticker.ts'
import { useState } from 'react'
import { InputMultiLine, InputSingleLine } from '@/components/Input.tsx'
import { DateTimePicker } from '@/components/DateTimePicker.tsx'
import { IconCheck } from '@/components/Icons.tsx'
import { PrimaryButton, SecondaryButton } from '@/components/Button.tsx'

type StickerModifyLoaderData = {
    sticker: Promise<ISticker | null>
}

const ModifyView = ({ sticker }: { sticker: ISticker }) => {
    const submit = useSubmit()
    const navigate = useNavigate()
    const [ title, setTitle ] = useState(sticker.title)
    const [ content, setContent ] = useState(sticker.content)
    const [ alarm, setAlarm ] = useState<Date | null>(!!sticker.alarm ? new Date(sticker.alarm) : null)
    const [ theme, setTheme ] = useState(sticker.theme)

    const handleSubmit = () => {
        submit(
            { title, content, alarm: alarm?.getTime() ?? null, theme } satisfies StickerPatch,
            { method: 'PUT', encType: 'application/json' }
        )
    }

    return (
        <div className={
            'w-[400px] h-[400px] p-5 bg-white rounded-[4px] shadow-card ' +
            'flex flex-col items-center space-y-4'
        }>
            <p className={'h-6 text-primary text-[18px] font-primary'}>
                Modify sticker
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
                initialDate={alarm}
                onSelected={setAlarm}/>

            <div className={'w-full h-12 flex items-center justify-between'}>
                <div className={'text-secondary font-secondary'}>Theme</div>
                {
                    [ 0, 1, 2, 3, 4, 5 ].map(i => {
                        return <button key={`theme-${i}`} className={
                            `bg-ps${i} w-6 h-6 rounded-full flex items-center justify-center`
                        } onClick={() => setTheme(i)}>
                            {theme === i ? <IconCheck className={'text-white text-[14px]'}/> : null}
                        </button>
                    })
                }
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
    )
}

const StickerModifyPage = () => {
    const loader = useLoaderData() as StickerModifyLoaderData

    return (
        <div className={'w-full h-full flex items-center justify-center'}>
            <DeferView
                source={loader.sticker}
                builder={sticker => {
                    if (!sticker) {
                        return <ExceptionView text={
                            'Failed to load sticker data, or it does not exist.'
                        }/>
                    }
                    return <ModifyView sticker={sticker}/>
                }}/>
        </div>
    )
}

StickerModifyPage.loader = ({ params }: LoaderFunctionArgs) => {
    return { sticker: StickerDB.getById(params.stickerId!) }
}

StickerModifyPage.action = async ({ request, params }: LoaderFunctionArgs) => {
    const patch = await request.json() as StickerPatch
    const ok = await StickerDB.update(params.stickerId!, patch)

    // if success, go back to previous page
    if (ok) history.back()

    return null
}

export default StickerModifyPage