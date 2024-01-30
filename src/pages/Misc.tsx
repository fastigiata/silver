import * as Icons from '@/components/Icons.tsx'
import { Interactive } from '@/components/Interactive.tsx'
import { useEffect, useState } from 'react'
import { MacScrollbar } from 'mac-scrollbar'
import { AwesomeScrollbar } from '@/components/AwesomeScrollbar.tsx'

const str = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const MiscPage = () => {
    const [ pos, setPos ] = useState({ left: 0, top: 0 })

    const [ pick, setPick ] = useState(0)
    useEffect(() => {
        const cb = (ev: WheelEvent) => {
            ev.preventDefault()

            if (ev.deltaY > 0) {
                setPick(v => Math.min(v + 1, 5))
            } else if (ev.deltaY < 0) {
                setPick(v => Math.max(v - 1, 0))
            }
        }

        window.addEventListener('wheel', cb, { passive: false })
        return () => window.removeEventListener('wheel', cb)
    }, [])

    return (
        <AwesomeScrollbar className={'w-full h-full p-4'}>
            <div className={'w-60 h-6 bg-[#CCC]'}>
                {
                    [ 0, 1, 2, 3, 4, 5 ].map(v => {
                        return (
                            <div key={v}
                                style={{
                                    transform: `translateY(-${pick * 100}%)`,
                                }}>
                                item {v}
                            </div>
                        )
                    })
                }
            </div>

            <div className="h-[200px]"></div>

            <p>Click and/or Drag</p>
            <Interactive
                className={'relative h-24 bg-[#ccc]'}
                onMove={(pos) => {
                    console.log('pos', pos)
                    setPos(pos)
                }}>
                <div
                    className="absolute w-4 h-4 bg-[green]"
                    style={{
                        left: `${100 * pos.left}%`,
                        top: `${100 * pos.top}%`,
                    }}/>
            </Interactive>

            <div className={'w-full h-[1px] my-8 bg-primary-button'}/>

            <MacScrollbar
                className={'relative awesome-scrollbar-y overflow-y-scroll w-60 h-60'}
                trackStyle={(horizontal) => ({ [horizontal ? 'height' : 'width']: 0 })}
                thumbStyle={(horizontal) => ({ [horizontal ? 'height' : 'width']: 6 })}>
                Lorem Ipsum
                {str}
            </MacScrollbar>

            <div className={'w-full h-[1px] my-8 bg-primary-button'}/>
            <ul className={'space-y-2'}>
                {
                    Object.entries(Icons)
                        .map(([ name, Icon ]) => <li key={name} className={
                            'flex items-center space-x-4'
                        }>
                            <span>{name}: </span>
                            <Icon className={'text-[24px] text-[#ccc]'}/>
                        </li>)
                }
            </ul>
        </AwesomeScrollbar>
    )
}

export default MiscPage