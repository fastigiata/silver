import type { ReactNode } from 'react'
import type { TooltipRefProps } from 'react-tooltip'
import { Tooltip } from 'react-tooltip'
import { forwardRef } from 'react'

type ControlledTooltipProps = {
    id: string
    children: ReactNode
    isOpen: boolean
    setIsOpen?: (isOpen: boolean) => void
}

const ControlledTooltip = forwardRef<TooltipRefProps, ControlledTooltipProps>(({
    id,
    children,
    isOpen,
    setIsOpen
}, ref) => {
    return (
        <Tooltip
            id={id} ref={ref}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            clickable
            style={{ zIndex: 10, padding: 0, backgroundColor: '#FFFFFF', }}
            opacity={1}>
            {children}
        </Tooltip>
    )
})

export {
    ControlledTooltip
}