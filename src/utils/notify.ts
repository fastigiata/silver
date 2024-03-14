import { runEmbed } from '@/utils/env.ts'
import { isPermissionGranted, requestPermission } from '@tauri-apps/plugin-notification'

/**
 * prepare for notification
 *
 * @return {Promise<boolean>} - if the permission is granted
 */
type NotifyPrepare = () => Promise<boolean>

/**
 * configuration for notification
 */
type NotifyOption<T = unknown> = {
    title: string
    body?: string
    /**
     * relative path to the icon
     */
    icon?: string
    /**
     * data to be passed to the callback
     */
    data?: T
    /**
     * callback when the notification is clicked
     */
    onClick?: (data?: T) => void
}

const prepareEmbed: NotifyPrepare = async () => {
    const allow = await isPermissionGranted()
    if (allow) return true

    return (await requestPermission()) === 'granted'
}
const prepareWeb: NotifyPrepare = async () => {
    if (!('Notification' in window)) return false
    if (Notification.permission === 'granted') return true

    return (await Notification.requestPermission()) === 'granted'
}

abstract class NotifyImpl {
    static #allow = false

    public static async prepare(): Promise<void> {
        NotifyImpl.#allow = await (runEmbed ? prepareEmbed : prepareWeb)()
    }

    public static notify<T = unknown>(option: NotifyOption<T>): void {
        if (!NotifyImpl.#allow) return

        const { title, body, icon, data, onClick } = option
        const notification = new Notification(title, { body, icon, data })
        if (!!onClick) notification.onclick = () => onClick(data)
    }
}

export type { NotifyOption }
export { NotifyImpl }