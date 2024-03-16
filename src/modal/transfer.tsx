import { create, useModal } from '@ebay/nice-modal-react'
import { ModalWrapper } from '@/modal/base.tsx'
import { useEffect, useState } from 'react'
import { CollectionDB } from '@/db/collection.ts'
import { DeferView } from '@/components/Loading.tsx'
import type { ICollection } from '@/_types/collection.ts'
import { PrimaryButton, SecondaryButton } from '@/components/Button.tsx'
import { AwesomeScrollbar } from '@/components/AwesomeScrollbar.tsx'
import { IconAbout } from '@/components/Icons.tsx'

export type TransferModalProps = {
    initial: string
}

const Inner = ({ initial, collections }: { initial: string, collections: ICollection[] }) => {
    const { remove, resolve } = useModal('transfer')
    const [ selected, setSelected ] = useState(initial)

    const done = (cancel: boolean) => {
        resolve(cancel ? null : selected)
        remove()
    }

    useEffect(() => {
        const cb = (ev: KeyboardEvent) => {
            if (ev.key === 'Escape') done(false)
        }

        window.addEventListener('keydown', cb)
        return () => window.removeEventListener('keydown', cb)
    }, [])

    return (
        <div className={
            'dialog-in w-[400px] max-h-[400px] p-5 bg-white rounded-[4px] shadow-card ' +
            'flex flex-col items-center space-y-4'
        }>
            <p className={'h-6 text-primary text-[18px] font-primary'}>
                Transfer to
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
                                onClick={() => setSelected(collection.id)}>
                                <div className={'w-7 mr-1 inline-flex items-center justify-between'}>
                                    <span>[</span>
                                    <span>{selected === collection.id ? '✔' : ''}</span>
                                    <span>]</span>
                                </div>
                                <div className={'flex-1 h-full line-clamp-1'}>{collection.name}</div>
                                {
                                    collection.id === initial
                                        ? <IconAbout
                                            data-tooltip-id={'base-tooltip'}
                                            data-tooltip-content={'NOW'}/>
                                        : null
                                }
                            </div>
                        )
                    })
                }
            </AwesomeScrollbar>

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

const TransferModal = create(({ initial }: TransferModalProps) => {
    return (
        <ModalWrapper>
            <DeferView
                source={CollectionDB.list()}
                builder={collections => <Inner initial={initial} collections={collections}/>}/>
        </ModalWrapper>
    )
})

export default TransferModal