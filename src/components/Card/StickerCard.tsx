import type { ISticker } from '@/_types/sticker.ts'
import { IconAbout, IconBell, IconDelete, IconEdit, IconMax, IconTransfer } from '@/components/Icons.tsx'
import dayjs from 'dayjs'
import { AwesomeScrollbar } from '@/components/AwesomeScrollbar.tsx'
import { Placeholder } from '@/components/Placeholder.tsx'

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

export type StickerAction = 'transfer' | 'view' | 'modify' | 'delete'

type StickerCardProps = {
    sticker: ISticker,
    onAction: (action: StickerAction) => void
}

const StickerCard = ({ sticker, onAction }: StickerCardProps) => {
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

            <AwesomeScrollbar className={
                'w-full flex-1 my-2 px-2 text-secondary text-[14px] font-secondary leading-[22px] text-justify break-words whitespace-pre-wrap line-clamp-[8]'
            }>
                {sticker.content || <Placeholder placeholder={'No Content'}/>}
            </AwesomeScrollbar>

            <AlarmBanner alarm={sticker.alarm}/>

            <div className={
                'absolute z-1 w-full h-8 -bottom-full group-hover:bottom-0 border-t-2 bg-white transition-[bottom]'
            }>
                <div className={
                    `bg-ps${themeId}-light text-ps${themeId} ` +
                    'w-full h-full px-2 flex items-center space-x-1'}>
                    <IconAbout
                        className={'as-button w-6 h-6'}
                        data-tooltip-id={'base-tooltip'}
                        data-tooltip-html={`Created ${dayjs(sticker.ctime).format('YYYY-MM-DD HH:mm')}<br/>Modified ${dayjs(sticker.mtime).format('YYYY-MM-DD HH:mm')}`}/>
                    <IconTransfer
                        className={'as-button w-6 h-6'}
                        data-tooltip-id={'base-tooltip'}
                        data-tooltip-content={'Transfer'}
                        onClick={() => onAction('transfer')}/>
                    <IconMax
                        className={'as-button w-6 h-6'}
                        data-tooltip-id={'base-tooltip'}
                        data-tooltip-content={'View'}
                        onClick={() => onAction('view')}/>
                    <IconEdit
                        className={'as-button w-6 h-6'}
                        data-tooltip-id={'base-tooltip'}
                        data-tooltip-content={'Modify'}
                        onClick={() => onAction('modify')}/>
                    <i className="flex-1"/>
                    <IconDelete
                        className={'as-button w-6 h-6 text-red'}
                        data-tooltip-id={'base-tooltip'}
                        data-tooltip-content={'Delete'}
                        onClick={() => onAction('delete')}/>
                </div>
            </div>
        </div>
    )
}

export {
    StickerCard
}