import type { LoaderFunctionArgs } from 'react-router-dom'
import type { StickerPatch } from '@/db/sticker.ts'
import { StickerDB } from '@/db/sticker.ts'
import { useLoaderData } from 'react-router-dom'
import { DeferView } from '@/components/Loading.tsx'
import { ExceptionView } from '@/components/ExceptionView.tsx'
import type { ISticker } from '@/_types/sticker.ts'

type StickerModifyLoaderData = {
    sticker: Promise<ISticker | null>
}

const ModifyView = ({ sticker }: { sticker: ISticker }) => {
    // TODO: Implement sticker modification view
    console.log(sticker)

    return (
        <div>

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
    return { sticker: StickerDB.get(params.stickerId!) }
}

StickerModifyPage.action = async ({ request, params }: LoaderFunctionArgs) => {
    const patch = await request.json() as StickerPatch
    const ok = await StickerDB.update(params.stickerId!, patch)

    // if success, go back to previous page
    if (ok) history.back()

    return null
}

export default StickerModifyPage