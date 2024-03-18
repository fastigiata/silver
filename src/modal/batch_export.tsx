import { useModal } from '@ebay/nice-modal-react'
import { ModalWrapper } from '@/modal/base.tsx'
import { DeferView } from '@/components/Loading.tsx'
import { CollectionDB } from '@/db/collection.ts'
import type { ICollection } from '@/_types/collection.ts'
import { useReducer, useState } from 'react'
import { AwesomeScrollbar } from '@/components/AwesomeScrollbar.tsx'
import { PrimaryButton, SecondaryButton } from '@/components/Button.tsx'
import { FileType } from '@/utils/io.ts'

type BatchExportResult = {
    format: FileType
    cids: string[]
} | null

const Inner = ({ collections }: { collections: ICollection[] }) => {
    const { remove, resolve } = useModal('batch_export')
    const [ selected, toggle ] = useReducer((prev: Set<string>, action: string) => {
        if (prev.has(action)) {
            prev.delete(action)
        } else {
            prev.add(action)
        }
        return new Set(prev)
    }, new Set([]))
    const [ format, setFormat ] = useState<FileType>(FileType.toml)

    const done = (cancel: boolean) => {
        resolve(cancel ? null : { format, cids: [ ...selected ] } satisfies BatchExportResult)
        remove()
    }

    return (
        <div className={
            'dialog-in w-[400px] max-h-[400px] p-5 bg-white rounded-[4px] shadow-card ' +
            'flex flex-col items-center space-y-4'
        }>
            <p className={'h-6 text-primary text-[18px] font-primary'}>
                Batch Export
            </p>

            <AwesomeScrollbar className={'w-full flex-1 p-2 bg-[#f7f7f7] rounded-[4px]'}>
                {
                    collections.map(collection => {
                        return (
                            <div
                                key={collection.id}
                                className={
                                    'w-full h-6 px-2 hover:bg-[#f0f0f0] ' +
                                    'text-secondary text-[14px] font-secondary leading-[24px] ' +
                                    'cursor-pointer flex items-center'
                                }
                                onClick={() => toggle(collection.id)}>
                                <div className={'w-7 inline-flex items-center justify-between'}>
                                    <span>[</span>
                                    <span>{selected.has(collection.id) ? '✔' : ''}</span>
                                    <span>]</span>
                                </div>
                                <div className={'flex-1 h-full mx-1 line-clamp-1'}>{collection.name}</div>
                                <span>{collection.count}</span>
                            </div>
                        )
                    })
                }
            </AwesomeScrollbar>

            <div className={'w-full h-5 text-[12px] flex items-center justify-start space-x-2'}>
                <span>Format:</span>
                <button className={'as-button'} onClick={() => setFormat(FileType.toml)}>
                    <span>[</span>
                    <span className={'w-3 inline-block'}>{format === FileType.toml ? '✔' : ''}</span>
                    <span>]</span>
                    <span className={`ml-1 ${format === FileType.toml ? 'underline' : ''} underline-offset-4`}>
                        Toml
                    </span>
                </button>
                <button className={'as-button'} onClick={() => setFormat(FileType.json)}>
                    <span>[</span>
                    <span className={'w-3 inline-block'}>{format === FileType.json ? '✔' : ''}</span>
                    <span>]</span>
                    <span className={`ml-1 ${format === FileType.json ? 'underline' : ''} underline-offset-4`}>
                        Json
                    </span>
                </button>
                <button className={'as-button'} onClick={() => setFormat(FileType.yaml)}>
                    <span>[</span>
                    <span className={'w-3 inline-block'}>{format === FileType.yaml ? '✔' : ''}</span>
                    <span>]</span>
                    <span className={`ml-1 ${format === FileType.yaml ? 'underline' : ''} underline-offset-4`}>
                        Yaml
                    </span>
                </button>
            </div>

            <div className={'w-full h-9 flex items-center justify-between space-x-2'}>
                <SecondaryButton
                    className={'flex-1'} text={'Cancel'}
                    onClick={() => done(true)}/>
                <PrimaryButton
                    className={'flex-1'} text={'Confirm'}
                    onClick={() => done(false)}/>
            </div>
        </div>
    )
}

const BatchExport = () => {
    const { remove, resolve } = useModal('batch_export')
    return (
        <ModalWrapper onBgClick={() => {
            resolve(null)
            remove()
        }}>
            <DeferView
                source={CollectionDB.getAll()}
                builder={collections => <Inner collections={collections}/>}/>
        </ModalWrapper>
    )
}

export type { BatchExportResult }
export { BatchExport }
