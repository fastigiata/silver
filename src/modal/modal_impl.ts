import { register, show } from '@ebay/nice-modal-react'
import type { ConfirmModalProps } from '@/modal/confirm.tsx'
import ConfirmModal from '@/modal/confirm.tsx'
import type { TransferModalProps } from '@/modal/transfer.tsx'
import TransferModal from '@/modal/transfer.tsx'

abstract class ModalImpl {
    public static prepare() {
        register('confirm', ConfirmModal)
        register('transfer', TransferModal)
    }

    /**
     * 显示确认框
     *
     * - true: 确认
     * - false: 取消 或 关闭
     */
    public static confirm(props: ConfirmModalProps): Promise<boolean> {
        return show<boolean>('confirm', props)
    }

    /**
     * 显示collection选择框
     *
     * - 返回选中的collection id
     */
    public static transfer(props: TransferModalProps): Promise<string | null> {
        return show<string>('transfer', props)
    }
}

export {
    ModalImpl
}