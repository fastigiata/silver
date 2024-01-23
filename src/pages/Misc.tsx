import * as Icons from '@/components/Icons.tsx'
import { Interactive } from '@/components/Interactive.tsx'
import { useState } from 'react'

const MiscPage = () => {
    const [ pos, setPos ] = useState({ left: 0, top: 0 })

    return (
        <div className={'w-full h-full p-4'}>
            <Interactive
                className={'relative h-24 bg-[#ccc]'}
                onMove={(pos) => {
                    console.log('pos', pos)
                    setPos(pos)
                }}>
                <div
                    className="absolute w-4 h-4 bg-[red]"
                    style={{
                        left: `${100 * pos.left}%`,
                        top: `${100 * pos.top}%`,
                    }}/>
            </Interactive>

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
        </div>
    )
}

export default MiscPage