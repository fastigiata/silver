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

export {
    ActionButton
}