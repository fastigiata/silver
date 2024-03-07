import type { ISticker } from '@/_types/sticker.ts'

type StickerCardProps = {
    sticker: ISticker,
    onClick?: VoidFunction
    onModify?: VoidFunction
    onDelete?: VoidFunction
}

const StickerCard = ({ sticker, onClick, onModify, onDelete }: StickerCardProps) => {
    const themeId = sticker.theme ?? 0

    return (
        <div className={
            'group relative w-44 h-56 rounded-[4px] bg-white shadow-card hover:shadow-card_hover overflow-hidden '
        }>
            <div className={
                `bg-ps${themeId} ` +
                'w-full h-8 px-2 text-white font-primary leading-[32px] line-clamp-1'
            }>
                {sticker.title}
            </div>

            <div className={
                'w-full h-[calc(100%-48px)] my-2 px-2 ' +
                'text-secondary text-[14px] font-secondary leading-[22px] text-justify line-clamp-[8]'
            }>
                {sticker.content}
            </div>

            {/* TODO: hover时弹出操作按钮 */}
            <div
                className={
                    `bg-ps${themeId}-light ` +
                    'absolute z-1 w-full -bottom-full group-hover:bottom-0 h-8 border-t-2 transition-[bottom]'
                }>
                hello
            </div>
        </div>
    )
}

export {
    StickerCard
}