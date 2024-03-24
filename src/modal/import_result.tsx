import { PrimaryButton } from '@/components/Button.tsx'
import { create, useModal } from '@ebay/nice-modal-react'
import { ModalWrapper } from '@/modal/base.tsx'

export type ImportResultProps = {
    collection: [ success: number, fail: number ]
    sticker: [ success: number, fail: number ]
}

const ImportResult = create(({ collection, sticker }: ImportResultProps) => {
    const { remove, resolve } = useModal('import_result')
    const close = () => {
        resolve(null)
        remove()
    }

    return (
        <ModalWrapper onBgClick={close}>
            <div className={
                'scale-in w-[400px] p-5 bg-white rounded-[4px] shadow-card ' +
                'flex flex-col space-y-4'
            }>
                <p className={'w-full h-6 text-primary text-[18px] font-primary text-center'}>
                    Batch Import
                </p>

                <div>
                    <span className={'text-secondary font-secondary'}>Collection:&nbsp;</span>
                    <span className={'text-tertiary font-tertiary'}>success {collection[0]}, fail {collection[1]}</span>
                </div>

                <div>
                    <span className={'text-secondary font-secondary'}>Sticker:&nbsp;</span>
                    <span className={'text-tertiary font-tertiary'}>success {sticker[0]}, fail {sticker[1]}</span>
                </div>

                <div className={'w-full h-9'}>
                    <PrimaryButton className={'w-full'} text={'Got it!'} onClick={close}/>
                </div>
            </div>
        </ModalWrapper>
    )
})

export {
    ImportResult
}