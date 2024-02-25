import * as Icons from '@/components/Icons.tsx'
import { AwesomeScrollbar } from '@/components/AwesomeScrollbar.tsx'
import { useRef } from 'react'
import { CollectionCard } from '@/components/Card/CollectionCard.tsx'
import type { ICollection } from '@/_types/collection.ts'
import { CollectionDB } from '@/db/collection.ts'
import { StickerDB } from '@/db/sticker.ts'

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


    return (
        <AwesomeScrollbar className={'w-full h-full p-4'}>
            <div className={'w-full h-[1px] my-8 bg-primary-button'}/>
            <p>collection</p>
            <button className={'as-button'} onClick={async () => {
                const cid = await CollectionDB.add('test', 'test collection')
                console.log(cid)
            }}>新建
            </button>
            <button className={'as-button'} onClick={async () => {
                const re = await CollectionDB.update('1Kgmnc0LmBc-E79bjhlZK', {
                    name: 'test2',
                    desc: '这些都是古秦语传到南方之后演化的（ln不分，平翘和带有口音的懒音）。\n' +
                        '日龙包：也弄攴（古汉语读卜声）。也（说文解字为女阴的象形字。）也声母由/s/又浊化为/z/,就变成日了，弄（做，搞。“昨晚弄到四更天”《红楼梦》原句。弄小：取妾），攴（“从手，卜声，形声字，义为小击，轻敲）。也弄攴：男对女的x行为敷衍了事，只用手。延伸为胡搞、糊弄事儿、老把事搞砸的人。'
                })
                console.log(re)
            }}>更新
            </button>
            <button className={'as-button'} onClick={async () => {
                await CollectionDB.remove('kfk82clL8BdPi-z_waWGd')
            }}>删除
            </button>
            <button className={'as-button'} onClick={async () => {
                const collections = await CollectionDB.list()
                console.log(collections)
            }}>查询
            </button>

            <p>sticker</p>
            <button className={'as-button'} onClick={async () => {
                // const sid = await StickerDB.add('FGK0Fw9VwX4uEhA6SCYhz', 'test', 'test sticker')
                const sid = await StickerDB.add('wZDfdXAXMyd3cZoHvaoxM', 'test', 'test sticker')
                console.log('sid', sid)
            }}>新建
            </button>
            <button className={'as-button'} onClick={async () => {
                StickerDB.update('PH0SRvkcLWoamMcOxXgwM', {
                    cid: 'FGK0Fw9VwX4uEhA6SCYhz'
                })
            }}>更新
            </button>
            <button className={'as-button'} onClick={async () => {
                await StickerDB.remove('NrpDt7zt5fsJ26UesVR93')
            }}>删除
            </button>
            <button className={'as-button'} onClick={async () => {
                const stickers = await StickerDB.list('FGK0Fw9VwX4uEhA6SCYhz')
                console.log(stickers)
            }}>查询
            </button>

            <div className={'w-full h-[1px] my-8 bg-primary-button'}/>
            <p>Sortable</p>
            <div ref={ref} className={
                'w-full h-[400px] p-4 border-[1px] border-[#CCC] space-y-2 overflow-y-auto'
            }>
                {
                    mockCollection
                        .map((config, i) => <CollectionCard key={i} {...config}/>)
                }
            </div>

            <div className={'w-full h-[1px] my-8 bg-primary-button'}/>
            <p>图标</p>
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