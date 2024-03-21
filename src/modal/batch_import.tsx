import { ModalWrapper } from '@/modal/base.tsx'
import type { DragEvent } from 'react'
import { IOImpl } from '@/utils/io.ts'
import { IconImport } from '@/components/Icons.tsx'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useModal } from '@ebay/nice-modal-react'
import { PrimaryButton, SecondaryButton } from '@/components/Button.tsx'
import dayjs from 'dayjs'
import type { ICollection } from '@/_types/collection.ts'
import type { ISticker } from '@/_types/sticker.ts'

const SUPPORT_SUFFIX = new Set<string>([ 'json', 'yaml', 'toml' ])

type ResultSummary = {
    format: string
    collection: number
    sticker: number
    datetime: string
}

type BatchImportResult = {
    collections: ICollection[]
    stickers: ISticker[]
} | null

const BatchImport = () => {
    const { remove, resolve } = useModal('batch_import')
    const [ active, setActive ] = useState(false)
    const result = useRef<BatchImportResult>(null)
    const [ summary, setSummary ] = useState<null | ResultSummary>(null)

    const done = (re: boolean) => {
        resolve(re ? result.current : null)
        remove()
    }

    const handleFileDrop = async (ev: DragEvent<HTMLDivElement>) => {
        ev.stopPropagation()
        ev.preventDefault()
        setActive(false)

        const file = ev.dataTransfer.files.item(0)
        if (!file) {
            toast.error('Not File')
            return
        }

        const suffix = file.name.split('.')[1]
        if (!SUPPORT_SUFFIX.has(suffix)) {
            toast.error('Not Support File Type')
            return
        }

        const text = await file.text()
        const { valid, format, hash, checksum, parsed } = IOImpl.batchImport(text)
        if (!valid) {
            toast.error('Invalid File')
            return
        } else if (hash !== checksum) {
            toast.error('File Corrupted')
            return
        }

        result.current = { collections: parsed!.collections, stickers: parsed!.stickers }
        setSummary({
            format: format,
            datetime: dayjs(parsed!.datetime).format('YYYY-MM-DD HH:mm:ss'),
            collection: parsed!.collections.length,
            sticker: parsed!.stickers.length
        })
    }

    return (
        <ModalWrapper onBgClick={() => done(false)}>
            <div
                className={
                    'scale-in w-[400px] h-[300px] p-5 bg-white rounded-[4px] shadow-card ' +
                    'flex flex-col items-center space-y-4'
                }>
                {
                    summary === null
                        ? (
                            <div
                                className={
                                    'w-full flex-1 rounded-[4px] outline-dashed outline-1 ' +
                                    `${active ? 'outline-[#AAA]' : 'outline-[#CCC]'} ` +
                                    'flex flex-col items-center justify-center'
                                }
                                onDragEnter={() => setActive(true)}
                                onDragLeave={() => setActive(false)}
                                onDragOver={ev => ev.preventDefault()}
                                onDrop={handleFileDrop}>
                                <IconImport className={
                                    `text-[72px] ${active ? 'text-[#AAA]' : 'text-[#CCC]'} pointer-events-none`
                                }/>
                                <span className={'mt-2 text-secondary text-[14px] font-secondary pointer-events-none'}>
                                    Drop File Here
                                </span>
                            </div>
                        )
                        : (
                            <div className={'w-full flex-1 flex flex-col space-y-4'}>
                                <p className={'w-full h-6 text-primary text-[18px] font-primary text-center'}>
                                    Batch Import
                                </p>

                                <div>
                                    <span className={'text-secondary font-secondary'}>Format:&nbsp;</span>
                                    <span className={'text-tertiary font-tertiary'}>{summary.format}</span>
                                </div>
                                <div>
                                    <span className={'text-secondary font-secondary'}>Collection:&nbsp;</span>
                                    <span className={'text-tertiary font-tertiary'}>{summary.collection}</span>
                                </div>
                                <div>
                                    <span className={'text-secondary font-secondary'}>Sticker:&nbsp;</span>
                                    <span className={'text-tertiary font-tertiary'}>{summary.sticker}</span>
                                </div>
                                <div>
                                    <span className={'text-secondary font-secondary'}>Export At:&nbsp;</span>
                                    <span className={'text-tertiary font-tertiary'}>{summary.datetime}</span>
                                </div>
                            </div>
                        )
                }

                <div className={'w-full h-9 flex items-center justify-between space-x-2'}>
                    <SecondaryButton
                        className={'flex-1'} text={'Cancel'}
                        onClick={() => done(false)}/>
                    {
                        summary === null ? null : (
                            <PrimaryButton className={'flex-1'} text={'Confirm'} onClick={() => done(true)}/>
                        )
                    }
                </div>
            </div>
        </ModalWrapper>
    )
}

export type { BatchImportResult }
export { BatchImport }