import type { LoaderFunctionArgs } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'
import { StickerDB } from '@/db/sticker.ts'
import { DeferView } from '@/components/Loading.tsx'
import type { ISticker } from '@/_types/sticker.ts'
import { ExceptionView } from '@/components/ExceptionView.tsx'

type StickerViewLoaderData = {
    sticker: Promise<ISticker>
}

const Inner = ({ sticker }: { sticker: ISticker }) => {
    // TODO: implement sticker view
    console.log(sticker)

    return (
        <div>
            <h1>Sticker View</h1>
        </div>
    )
}

const StickerViewPage = () => {
    const loader = useLoaderData() as StickerViewLoaderData
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
                    return <Inner sticker={sticker}/>
                }}/>
        </div>
    )
}

StickerViewPage.loader = ({ params }: LoaderFunctionArgs) => {
    return { sticker: StickerDB.getById(params.stickerId!) }
}

export default StickerViewPage