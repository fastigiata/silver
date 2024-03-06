import type { ISticker } from '@/_types/sticker.ts'

type StickerCardProps = {
    sticker: ISticker,
    onClick?: VoidFunction
    onModify?: VoidFunction
    onDelete?: VoidFunction
}

const StickerCard = ({ sticker, onClick, onModify, onDelete }: StickerCardProps) => {
    return (
        <div>
            xx
        </div>
    )
}

export {
    StickerCard
}