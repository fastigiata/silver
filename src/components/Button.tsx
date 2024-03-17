import type { ExtendedIcon } from '@/components/Icons.tsx'

const IconTextButton = ({ className = '', Icon, text, onClick }: {
    className?: string
    Icon: ExtendedIcon
    text: string
    onClick?: VoidFunction
}) => {
    return (
        <button className={
            `${className} ` +
            'as-button hover-underline h-6 text-[14px] leading-[24px] flex items-center'
        } onClick={!!onClick ? (ev) => {
            ev.preventDefault()
            ev.stopPropagation()
            onClick()
        } : undefined}>
            <Icon className={'mr-1'}/>
            <span>{text}</span>
        </button>
    )
}

const ActionButton = ({ className = '', Icon, onClick }: {
    className?: string
    Icon: ExtendedIcon
    onClick?: VoidFunction
}) => {
    return (
        <button className={
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
        </button>
    )
}

type ButtonProps = {
    /**
     * @default false
     */
    disabled?: boolean
    className?: string,
    text: string,
    onClick: VoidFunction
}

const PrimaryButton = ({ disabled = false, className = '', text, onClick }: ButtonProps) => {
    return (
        <button className={
            `${className} as-button h-full rounded-[4px] bg-primary-button text-white text-[14px]`
        } onClick={onClick} disabled={disabled}>
            {text}
        </button>
    )
}

const SecondaryButton = ({ disabled, className = '', text, onClick }: ButtonProps) => {
    return (
        <button className={
            `${className} as-button h-full border-[1px] border-[#DDD] rounded-[4px] bg-secondary-button text-black text-[14px]`
        } onClick={onClick} disabled={disabled}>
            {text}
        </button>
    )
}

export {
    IconTextButton,
    ActionButton,
    PrimaryButton,
    SecondaryButton,
}