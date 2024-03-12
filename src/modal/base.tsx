import type { ReactNode } from 'react'

const ModalWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className={'fixed z-10 w-full h-full top-0 left-0 bg-[#8F959E66] flex flex-col items-center justify-center'}>
            {children}
        </div>
    )
}

export {
    ModalWrapper
}