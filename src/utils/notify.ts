import { Env } from '@/utils/env.ts'

interface Notifier {
    notify(message: string, onClick?: VoidFunction): Promise<void>
}

class EmbedNotifier implements Notifier {
    public async notify(_message: string, _onClick?: VoidFunction) {
        // no-op
    }
}

const DEFAULT_CLICK_ACTION = () => {
    window.focus()
}

class WebNotifier implements Notifier {
    public async notify(message: string, onClick: VoidFunction = DEFAULT_CLICK_ACTION) {
        if (!('Notification' in window)) {
            alert('This browser does not support desktop notification')
            return
        }

        if (Notification.permission !== 'granted') {
            const v = await Notification.requestPermission()
            if (v !== 'granted') {
                return
            }
        }

        const notification = new Notification(message)
        notification.onclick = onClick
    }
}

const notifier = Env.isEmbed ? new EmbedNotifier() : new WebNotifier()

export {
    notifier
}