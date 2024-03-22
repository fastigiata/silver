import { ModalWrapper } from '@/modal/base.tsx'
import type { DragEvent } from 'react'
import { IOImpl } from '@/utils/io.ts'
import { IconAbout, IconImport } from '@/components/Icons.tsx'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useModal } from '@ebay/nice-modal-react'
import { PrimaryButton, SecondaryButton } from '@/components/Button.tsx'
import dayjs from 'dayjs'
import type { ICollection } from '@/_types/collection.ts'
import type { ISticker } from '@/_types/sticker.ts'
import { getArchiveFile } from '@/misc/helper.ts'

const SUPPORT_SUFFIX = new Set<string>([ 'json', 'yaml', 'toml' ])

type ResultSummary = {
    format: string
    collection: number
    sticker: number
    datetime: string
}

type BatchImportResult = {
    /**
     * skip exist collection, or update it
     */
    skipExist: boolean
    collections: ICollection[]
    stickers: ISticker[]
} | null

const BatchImport = () => {
    const { remove, resolve } = useModal('batch_import')
    const [ active, setActive ] = useState(false)
    const result = useRef<BatchImportResult>(null)
    const [ summary, setSummary ] = useState<null | ResultSummary>(null)
    const [ skipExist, _setSkipExist ] = useState(true)
    const setSkipExist = (v: boolean) => {
        result.current!.skipExist = v
        _setSkipExist(v)
    }

    const done = (re: boolean) => {
        resolve(re ? result.current : null)
        remove()
    }

    const resolveFile = async (file: File) => {
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

        result.current = { skipExist, collections: parsed!.collections, stickers: parsed!.stickers }
        setSummary({
            format: format,
            datetime: dayjs(parsed!.datetime).format('YYYY-MM-DD HH:mm:ss'),
            collection: parsed!.collections.length,
            sticker: parsed!.stickers.length
        })
    }

    const handleFilePick = async () => {
        const file = await getArchiveFile()
        if (!file) {
            toast.error('Cancelled')
            return
        }
        await resolveFile(file)
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
        await resolveFile(file)
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
                                    'cursor-pointer flex flex-col items-center justify-center'
                                }
                                onDragEnter={() => setActive(true)}
                                onDragLeave={() => setActive(false)}
                                onDragOver={ev => ev.preventDefault()}
                                onDrop={handleFileDrop}
                                onClick={handleFilePick}>
                                <IconImport className={
                                    `text-[72px] ${active ? 'text-[#AAA]' : 'text-[#CCC]'} pointer-events-none`
                                }/>
                                <span className={'mt-2 text-secondary text-[14px] font-secondary pointer-events-none'}>
                                    Drop File Here
                                </span>
                            </div>
                        )
                        : (
                            <div className={'w-full flex-1 flex flex-col justify-between'}>
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
                                <div>
                                    <IconAbout
                                        className={'mr-1 text-secondary text-[13px]'}
                                        data-tooltip-id={'base-tooltip'}
                                        data-tooltip-content={'Action to take when the imported entry\'s primary key already exists'}/>
                                    <span className={'text-secondary font-secondary'}>Strategy:&nbsp;</span>
                                    <button
                                        className={'as-button text-tertiary font-tertiary'}
                                        data-tooltip-id={'base-tooltip'}
                                        data-tooltip-html={'<u>Skip</u> the entry to be imported if its primary key already exists'}
                                        onClick={() => setSkipExist(true)}>
                                        <span>[</span>
                                        <span className={'w-3 inline-block'}>{skipExist ? '✔' : ''}</span>
                                        <span>]</span>
                                        <span
                                            className={`ml-1 ${skipExist ? 'underline' : ''} underline-offset-4`}>
                                            Skip
                                        </span>
                                    </button>
                                    <button
                                        className={'as-button ml-2 text-tertiary font-tertiary'}
                                        data-tooltip-id={'base-tooltip'}
                                        data-tooltip-html={'<u>Overwrite</u> the entry to be imported if its primary key already exists'}
                                        onClick={() => setSkipExist(false)}>
                                        <span>[</span>
                                        <span className={'w-3 inline-block'}>{!skipExist ? '✔' : ''}</span>
                                        <span>]</span>
                                        <span
                                            className={`ml-1 ${!skipExist ? 'underline' : ''} underline-offset-4`}>
                                            Overwrite
                                        </span>
                                    </button>
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