import type { ExtendedIcon } from '@/components/Icons.tsx'

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
        } onClick={!!onClick ? (ev) => {
            ev.preventDefault()
            ev.stopPropagation()
            onClick()
        } : undefined}>
            <Icon/>
        </div>
    )
}

const PrimaryButton = ({ className = '', text, onClick }: {
    className?: string,
    text: string,
    onClick: VoidFunction
}) => {
    return (
        <button className={
            `${className} as-button h-full rounded-[4px] bg-primary-button text-white text-[14px]`
        } onClick={onClick}>
            {text}
        </button>
    )
}

const SecondaryButton = ({ className = '', text, onClick }: {
    className?: string,
    text: string,
    onClick: VoidFunction
}) => {
    return (
        <button className={
            `${className} as-button h-full border-[1px] border-[#DDD] rounded-[4px] bg-secondary-button text-black text-[14px]`
        } onClick={onClick}>
            {text}
        </button>
    )
}

export {
    ActionButton,
    PrimaryButton,
    SecondaryButton,
}