import { Env } from '@/utils/env.ts'
import { exit } from '@tauri-apps/plugin-process'
import { getCurrent } from '@tauri-apps/api/window'

interface AppController {
    hideToTray(): Promise<void>

    close(): Promise<void>

}

class WebController implements AppController {
    async hideToTray(): Promise<void> {
        alert('Not Supported on Web')
    }

    async close(): Promise<void> {
        alert('Not Supported on Web')
    }

}

class EmbedController {
    hideToTray() {
        // TODO: Implement
        console.debug('TODO')
        return getCurrent().minimize()
    }

    close() {
        return exit()
    }
}

const appController = Env.isEmbed ? new EmbedController() : new WebController()

export {
    appController
}