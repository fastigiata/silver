import { Env } from '@/utils/env.ts'
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification'

interface Notifier {
    notify(message: string): Promise<void>
}

class EmbedNotifier implements Notifier {
    public async notify(message: string) {
        if (!(await isPermissionGranted())) {
            const v = await requestPermission()
            if (v !== 'granted') return
        }

        // TODO: with 'sendNotification'
        // sendNotification()
    }
}

class WebNotifier implements Notifier {
    public async notify(message: string) {
        if (!('Notification' in window)) {
            alert('This browser does not support desktop notification')
            return
        }

        if (Notification.permission !== 'granted') {
            const v = await Notification.requestPermission()
            if (v !== 'granted') return
        }

        new Notification(message)
    }
}

const notifier = Env.isEmbed ? new EmbedNotifier() : new WebNotifier()

export {
    notifier
}