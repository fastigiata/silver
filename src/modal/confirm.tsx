import { ModalWrapper } from '@/modal/base.tsx'
import { useModal, create } from '@ebay/nice-modal-react'
import { PrimaryButton, SecondaryButton } from '@/components/Button.tsx'
import { useEffect } from 'react'

export type ConfirmModalProps = {
    content: string
}

const ConfirmModal = create(({ content }: ConfirmModalProps) => {
    const { remove, resolve } = useModal('confirm')

    const done = (re: boolean) => {
        resolve(re)
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
        <ModalWrapper onBgClick={() => done(false)}>
            <div className={'dialog-in w-[400px] p-5 bg-white rounded-[4px] shadow-card space-y-4'}>
                <p className={'text-secondary text-[16px] leading-[24px] font-secondary'}>
                    {content}
                </p>

                <div className={'w-full h-9 flex items-center justify-between space-x-4'}>
                    <SecondaryButton
                        className={'flex-1'} text={'Cancel'}
                        onClick={() => done(false)}/>
                    <PrimaryButton
                        className={'flex-1'} text={'Confirm'}
                        onClick={() => done(true)}/>
                </div>
            </div>
        </ModalWrapper>
    )
})

export default ConfirmModal