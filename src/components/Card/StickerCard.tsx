import type { ISticker } from '@/_types/sticker.ts'
import { IconBell, IconDelete, IconEdit } from '@/components/Icons.tsx'
import dayjs from 'dayjs'

type StickerCardProps = {
    sticker: ISticker,
    onModify?: VoidFunction
    onDelete?: VoidFunction
}

const AlarmBanner = ({ alarm }: { alarm?: number | null }) => {
    if (!alarm) return null

    const done = alarm < Date.now()
    const text = dayjs(alarm).format('YYYY-MM-DD HH:mm')

    return (
        <div className={'w-full h-8 px-2 flex items-center'}>
            <IconBell className={'mr-1 text-tertiary text-[14px]'}/>
            <span className={`text-tertiary text-[12px] font-tertiary ${done ? 'line-through' : ''}`}>
                {text}
            </span>
        </div>
    )
}

const StickerCard = ({ sticker, onModify, onDelete }: StickerCardProps) => {
    const themeId = sticker.theme ?? 0

    return (
        <div className={
            'sticker-card group relative rounded-[4px] bg-white ' +
            'shadow-card hover:shadow-card_hover overflow-hidden flex flex-col'
        }>
            <div className={
                `bg-ps${themeId} ` +
                'w-full h-8 px-2 text-white font-primary leading-[32px] line-clamp-1'
            }>
                {sticker.title}
            </div>

            <div className={
                // `bg-ps${themeId}-light ` +
                'w-full flex-1 my-2 px-2 ' +
                'text-secondary text-[14px] font-secondary leading-[22px] text-justify line-clamp-[8]'
            }>
                {sticker.content}
            </div>

            <AlarmBanner alarm={sticker.alarm}/>

            <div className={
                'absolute z-1 w-full h-8 -bottom-full group-hover:bottom-0 border-t-2 bg-white transition-[bottom]'
            }>
                <div className={
                    `bg-ps${themeId}-light text-ps${themeId} ` +
                    'w-full h-full px-2 flex items-center space-x-1'}>
                    <IconEdit className={'as-button w-6 h-6'} onClick={onModify}/>
                    <IconDelete className={'as-button w-6 h-6'} onClick={onDelete}/>
                </div>
            </div>
        </div>
    )
}

export {
    StickerCard
}