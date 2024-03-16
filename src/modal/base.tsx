import type { ReactNode, MouseEvent } from 'react'
import { useRef } from 'react'

const ModalWrapper = ({ children, onBgClick }: { children: ReactNode, onBgClick?: VoidFunction }) => {
    const ref = useRef<HTMLDivElement | null>(null)

    const handleClick = (ev: MouseEvent<HTMLDivElement>) => {
        if (ev.target === ref.current) {
            ev.stopPropagation()
            ev.preventDefault()
            onBgClick?.()
        }
    }

    return (
        <div ref={ref} className={
            'fixed z-10 w-full h-full top-0 left-0 bg-[#8F959E66] flex flex-col items-center justify-center'
        } onClick={handleClick}>
            {children}
        </div>
    )
}

export {
    ModalWrapper
}