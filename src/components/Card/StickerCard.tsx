import type { ISticker } from '@/_types/sticker.ts'

type StickerCardProps = {
    sticker: ISticker,
    onClick?: VoidFunction
    onModify?: VoidFunction
    onDelete?: VoidFunction
}

const StickerCard = ({ sticker, onClick, onModify, onDelete }: StickerCardProps) => {
    return (
        <div className={'relative w-44 h-56 bg-white shadow-card hover:shadow-card_hover'}>
            <div className={'w-full h-8 px-2 bg-[#F7F8FA] text-primary font-primary leading-[32px] line-clamp-1'}>
                {sticker.title}
            </div>

            <div className={
                'w-full h-[calc(100%-48px)] my-2 px-2 ' +
                'text-secondary text-[14px] font-secondary leading-[22px] text-justify line-clamp-[8]'
            }>
                {sticker.content}
            </div>

            {/* TODO: hover时弹出操作按钮 */}
        </div>
    )
}

export {
    StickerCard
}