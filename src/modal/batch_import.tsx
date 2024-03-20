import { ModalWrapper } from '@/modal/base.tsx'
import type { DragEvent } from 'react'
import { IOImpl } from '@/utils/io.ts'
import { IconImport } from '@/components/Icons.tsx'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useModal } from '@ebay/nice-modal-react'
import { PrimaryButton, SecondaryButton } from '@/components/Button.tsx'
import dayjs from 'dayjs'

const SUPPORT_SUFFIX = new Set<string>([ 'json', 'yaml', 'toml' ])

type ResultSummary = {
    format: string
    collection: number
    sticker: number
    datetime: string
}

const BatchImport = () => {
    const { remove, resolve } = useModal('batch_import')
    const [ active, setActive ] = useState(false)
    const [ result, setResult ] = useState<null | ResultSummary>(null)

    const close = () => {
        resolve(null)
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
        const result = IOImpl.batchImport(text)
        if (!result.valid) {
            toast.error('Invalid File')
            return
        } else if (result.hash !== result.checksum) {
            toast.error('File Corrupted')
            return
        }

        setResult({
            format: result.format,
            datetime: dayjs(result.parsed!.datetime).format('YYYY-MM-DD HH:mm:ss'),
            collection: result.parsed!.collections.length,
            sticker: result.parsed!.stickers.length
        })
    }

    const handleImport = () => {
        // TODO: 导入

        close()
    }

    return (
        <ModalWrapper onBgClick={close}>
            <div
                className={
                    'dialog-in w-[400px] h-[300px] p-5 bg-white rounded-[4px] shadow-card ' +
                    'flex flex-col items-center space-y-4'
                }>
                {
                    result === null
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
                                    <span className={'text-tertiary font-tertiary'}>{result.format}</span>
                                </div>
                                <div>
                                    <span className={'text-secondary font-secondary'}>Collection:&nbsp;</span>
                                    <span className={'text-tertiary font-tertiary'}>{result.collection}</span>
                                </div>
                                <div>
                                    <span className={'text-secondary font-secondary'}>Sticker:&nbsp;</span>
                                    <span className={'text-tertiary font-tertiary'}>{result.sticker}</span>
                                </div>
                                <div>
                                    <span className={'text-secondary font-secondary'}>Export At:&nbsp;</span>
                                    <span className={'text-tertiary font-tertiary'}>{result.datetime}</span>
                                </div>
                            </div>
                        )
                }

                <div className={'w-full h-9 flex items-center justify-between space-x-2'}>
                    <SecondaryButton
                        className={'flex-1'} text={'Cancel'}
                        onClick={close}/>
                    {
                        result === null ? null : (
                            <PrimaryButton className={'flex-1'} text={'Confirm'} onClick={handleImport}/>
                        )
                    }
                </div>
            </div>
        </ModalWrapper>
    )
}

export { BatchImport }