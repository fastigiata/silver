import { MacScrollbar } from 'mac-scrollbar'
import type { CSSProperties, ReactNode } from 'react'

type AwesomeScrollbarProps = {
    className?: string
    style?: CSSProperties
    children: ReactNode
}

const AwesomeScrollbar = ({ className, style, children }: AwesomeScrollbarProps) => {
    return (
        <MacScrollbar
            className={className} style={style}
            trackStyle={(horizontal) => ({ [horizontal ? 'height' : 'width']: 0 })}
            thumbStyle={(horizontal) => ({ [horizontal ? 'height' : 'width']: 6 })}>
            {children}
        </MacScrollbar>
    )
}

export {
    AwesomeScrollbar
}