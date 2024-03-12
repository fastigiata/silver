import { register, show } from '@ebay/nice-modal-react'
import type { ConfirmModalProps } from '@/modal/confirm.tsx'
import ConfirmModal from '@/modal/confirm.tsx'

abstract class ModalImpl {
    public static prepare() {
        register('confirm', ConfirmModal)
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
}

export {
    ModalImpl
}