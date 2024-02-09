import type { ICollection } from '@/_types/collection.ts'

const CollectionCard = ({ id, ctime, mtime, name, desc }: ICollection) => {
    return (
        <div
            data-id={id}
            className={
                'w-full h-20 px-4 rounded-[4px] bg-white ' +
                'shadow-card hover:shadow-card_hover select-none ' +
                'flex flex-col items-start justify-center'
            }>
            <div className={
                'w-full text-primary text-[18px] font-primary leading-[24px] overflow-hidden overflow-ellipsis'
            }>
                {name}
            </div>
            <div className={
                'w-full text-secondary text-[14px] font-secondary leading-[20px] overflow-hidden overflow-ellipsis'
            }>
                {desc}
            </div>
            <div className={'w-full text-tertiary text-[10px] font-tertiary leading-[16px]'}>
                <span>Create {new Date(ctime).toLocaleString()}</span>
                <span>Modify {new Date(mtime).toLocaleString()}</span>
            </div>
        </div>
    )
}

export {
    CollectionCard
}