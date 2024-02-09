import * as Icons from '@/components/Icons.tsx'
import { AwesomeScrollbar } from '@/components/AwesomeScrollbar.tsx'
import { useEffect, useRef } from 'react'
import Sortable from 'sortablejs'
import { CollectionCard } from '@/components/Card/CollectionCard.tsx'
import type { ICollection } from '@/_types/collection.ts'

const mockCollection: ICollection[] = [
    {
        id: 'a',
        ctime: 1707494924442,
        mtime: 1707494924442,
        name: 'name a',
        desc: '@/components/Card/CollectionCard.tsx@/components/Card/CollectionCard.tsx@/components/Card/CollectionCard.tsx@/components/Card/CollectionCard.tsx'
    },
    {
        id: 'b',
        ctime: 1707494924442,
        mtime: 1707494924442,
        name: 'name b',
        desc: 'desc b'
    },
    {
        id: 'c',
        ctime: 1707494924442,
        mtime: 1707494924442,
        name: 'name c',
        desc: 'desc c'
    },
    {
        id: 'd',
        ctime: 1707494924442,
        mtime: 1707494924442,
        name: 'name d',
        desc: 'desc d'
    },
    {
        id: 'e',
        ctime: 1707494924442,
        mtime: 1707494924442,
        name: 'name e',
        desc: 'desc e'
    }
]

const MiscPage = () => {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const ctr = new Sortable(ref.current as HTMLDivElement, {
            animation: 150,
            onChange: (evt) => {
                console.log(evt)
                console.log(ctr.toArray())
            }
        })
    }, [])

    return (
        <AwesomeScrollbar className={'w-full h-full p-4'}>
            <div ref={ref} className={
                'w-full h-[400px] p-4 border-[1px] border-[#CCC] space-y-2 overflow-y-auto'
            }>
                {
                    mockCollection
                        .map((config, i) => <CollectionCard key={i} {...config}/>)
                }
            </div>

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