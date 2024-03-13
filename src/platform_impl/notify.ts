import { runEmbed } from '@/utils/env.ts'
import { isPermissionGranted, requestPermission, sendNotification } from '@tauri-apps/plugin-notification'

interface Notifier {
    notify(title: string, body?: string): Promise<void>
}

class EmbedNotifier implements Notifier {
    public async notify(title: string, body?: string) {
        if (!(await isPermissionGranted())) {
            const v = await requestPermission()
            if (v !== 'granted') return
        }

        sendNotification({ title, body })
    }
}

class WebNotifier implements Notifier {
    public async notify(title: string, body?: string) {
        if (!('Notification' in window)) {
            alert('This browser does not support desktop notification')
            return
        }

        if (Notification.permission !== 'granted') {
            const v = await Notification.requestPermission()
            if (v !== 'granted') return
        }

        new Notification(title, { body })
    }
}

const notifyImpl: Notifier = runEmbed ? new EmbedNotifier() : new WebNotifier()

export {
    notifyImpl
}