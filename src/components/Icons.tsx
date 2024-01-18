import type { CSSProperties, ReactNode } from 'react'
import { forwardRef } from 'react'

export type IconProps = {
    className?: string;
    style?: CSSProperties;
    svg: ReactNode;
    onClick?: VoidFunction
};

const Icon = forwardRef<HTMLSpanElement, IconProps>(
    ({ className = '', style = {}, svg, onClick }, ref) => {
        return (
            <span
                ref={ref} className={className}
                style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', ...style }}
                onClick={onClick}>
                {svg}
            </span>
        )
    }
)

const buildIcon = (svg: IconProps['svg']) => {
    return forwardRef<HTMLSpanElement, Omit<IconProps, 'svg'>>((props, ref) => (
        <Icon ref={ref} svg={svg} {...props}></Icon>
    ))
}

const Check = buildIcon(
    <svg width="1em" height="1em" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M942.49093499 263.24981077L379.43928098 826.30146478l-297.93021597-297.93021598 65.61755591-65.61755591L379.43928098 695.06635296l497.4340981-497.4340981 65.61755591 65.61755591z"
            fill="currentColor"/>
    </svg>
)

const Cross = buildIcon(
    <svg width="1em" height="1em" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M512 577.61755591l-342.13921577 342.13921577-65.61755591-65.61755591L446.38244409 512 104.24322832 169.86078423l65.61755591-65.61755591L512 446.38244409l342.13921577-342.13921577 65.61755591 65.61755591L577.61755591 512l342.13921577 342.13921577-65.61755591 65.61755591L512 577.61755591z"
            fill="currentColor"/>
    </svg>
)

export {
    Check,
    Cross
}