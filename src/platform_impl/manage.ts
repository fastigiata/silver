import { exit } from '@tauri-apps/plugin-process'
import { getCurrent } from '@tauri-apps/api/window'
import { isEmbed } from '@/utils/env.ts'

interface AppManager {
    hideToTray(): Promise<void>

    close(): Promise<void>

}

class WebManager implements AppManager {
    async hideToTray(): Promise<void> {
        alert('Not Supported on Web')
    }

    async close(): Promise<void> {
        alert('Not Supported on Web')
    }

}

class EmbedManager {
    hideToTray() {
        // TODO: Implement
        console.debug('TODO')
        return getCurrent().minimize()
    }

    close() {
        return exit()
    }
}

const manageImpl: AppManager = isEmbed ? new EmbedManager() : new WebManager()

export {
    manageImpl
}