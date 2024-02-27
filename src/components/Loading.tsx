import type { ReactNode } from 'react'
import { Suspense } from 'react'
import { Await } from 'react-router-dom'

const Loading = () => {
    return (
        <div className={'w-full h-full flex items-center justify-center'}>
            loading...
        </div>
    )
}

type DeferViewProps<Source> = {
    source: Promise<Source>
    builder: ((source: Source) => ReactNode) | ReactNode
    slotBefore?: ReactNode
    slotAfter?: ReactNode
}
const DeferView = <T = unknown>({ source, builder, slotBefore, slotAfter }: DeferViewProps<T>) => {
    return (
        <Suspense fallback={<Loading/>}>
            {slotBefore}
            <Await resolve={source}>
                {builder}
            </Await>
            {slotAfter}
        </Suspense>
    )
}

export {
    Loading,
    DeferView
}