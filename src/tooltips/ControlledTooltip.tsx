import type { ReactNode } from 'react'
import type { TooltipRefProps } from 'react-tooltip'
import { Tooltip } from 'react-tooltip'
import { forwardRef } from 'react'

type ControlledTooltipProps = {
    id: string
    anchorId?: string | null
    children: ReactNode
    isOpen: boolean
    setIsOpen?: (isOpen: boolean) => void
}

const ControlledTooltip = forwardRef<TooltipRefProps, ControlledTooltipProps>(({
    id,
    anchorId,
    children,
    isOpen,
    setIsOpen
}, ref) => {
    return (
        <Tooltip
            id={id} ref={ref}
            anchorSelect={anchorId ? `#${anchorId}` : undefined}
            isOpen={isOpen} setIsOpen={setIsOpen}
            clickable openOnClick place={'bottom'}
            style={{ zIndex: 10, padding: 0, backgroundColor: 'transparent', }}
            opacity={1}>
            {children}
        </Tooltip>
    )
})

export {
    ControlledTooltip
}