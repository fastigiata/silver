import type { ICollection } from '@/_types/collection.ts'
import type { ExtendedIcon } from '@/components/Icons.tsx'
import { IconDelete } from '@/components/Icons.tsx'

const ActionButton = ({ className = '', Icon, onClick }: {
    className?: string,
    Icon: ExtendedIcon,
    onClick?: VoidFunction
}) => {
    return (
        <div className={
            `${className} ` +
            'as-button w-8 h-8 rounded-full bg-white ' +
            'shadow-card hover:shadow-card_hover ' +
            'text-[18px] flex items-center justify-center'
        } onClick={onClick}>
            <Icon/>
        </div>
    )
}

const CollectionCard = ({ collection, className = '', onDelete }: {
    collection: ICollection,
    className?: string,
    onDelete?: VoidFunction
}) => {
    const { id, name, desc, ctime, mtime } = collection
    return (
        <div
            data-id={id}
            className={
                `${className} ` +
                'group relative w-full h-20 px-4 rounded-[4px] bg-white ' +
                'shadow-card hover:shadow-card_hover select-none ' +
                'flex flex-col items-start justify-center'
            }>
            <div className={
                'w-full text-primary text-[18px] font-primary leading-[24px] overflow-hidden overflow-ellipsis'
            }>
                {name}
            </div>
            <div className={
                'w-full text-secondary text-[16px] font-secondary leading-[20px] overflow-hidden line-clamp-1'
            }>
                {desc}
            </div>
            <div className={'w-full text-tertiary text-[10px] font-tertiary font-JBMono leading-[16px] space-x-2'}>
                <span>Created: {new Date(ctime).toLocaleString()}</span>
                <span>Modified: {new Date(mtime).toLocaleString()}</span>
            </div>

            <div className={'absolute z-1 right-4 hidden group-hover:flex items-center space-x-2'}>
                <ActionButton className={'text-red'} Icon={IconDelete} onClick={onDelete}/>
            </div>
        </div>
    )
}

export {
    CollectionCard
}